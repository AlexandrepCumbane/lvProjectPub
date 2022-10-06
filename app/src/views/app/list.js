import React, { Component } from "react";
import { connect } from "react-redux";
import { toast, Bounce } from "react-toastify";

// import socketIOClient, { protocol } from "socket.io-client";

import { Button } from "reactstrap";
import { axios } from "../../redux/api";

import Breadcrumbs from "../../components/@vuexy/breadCrumbs/BreadCrumb";
import AgGridTable from "../../components/custom/table/AgGridTable";
import Prompt from "../../components/custom/dialog/Prompt";

import { default as config } from "../../data/config";
import {
  operator as operatorColumns,
  manager as managerColumns,
  partner as partnerColumns,
} from "../../data/lvform.config";
import {
  sent_to_focalpoint,
  sent_to_partner,
} from "../../data/forwarding.lvform.config";
import { IntlContext } from "../../i18n/provider";
import {
  requestForm,
  requestDropodowns,
  updateListLoad,
  requestIndex,
  requestAddCase,
} from "../../redux/actions/app/actions";

import {
  renderStatusLabel,
  renderStatus,
  getFieldWith,
} from "../../utility/list/util";

import CaseEdit from "./edit";
import "../../assets/scss/pages/users.scss";
import "../../assets/scss/pages/data-list.scss";

class List extends Component {
  static contextType = IntlContext;
  translate; //= this.context.translate
  // child; // = React.createRef();

  constructor(props, context) {
    super(props, context);
    this.child = React.createRef();
    this.translate = context.translate;

    this.setChild = (ref) => {
      this.child = ref;
    };

    this.state = {
      pageTitle: this.translate("Pages"),
      pageParent: this.translate("Lists & Forms"),
      activePage: this.translate("Lists"),
      items: [],
      child: React.createRef(),
      columnDefs: [],
      show: false,
      data: [],
      page: "lvform",
      isLoading: false,
      hidden: true,
      showSidebar: false,
      sidebarData: {},
      showModal: false,
      socketIo: {},
      recordId: 0,
      message: "Do you want to delete that record?",
      requestMoreInterval: null,
      requestMoreWaiting: false,
    };
  }

  // socketIo = new WebSocket(SOCKET_SERVER_URL);

  componentDidMount() {
    this.formatFields();

    const updateList =
      this.props.location.state && this.props.location.state.updateList;

    if (
      !this.props.app_reducer[this.props.path]?.list.length ||
      !this.props.app_reducer[`updated_${this.props.url}`] ||
      updateList
    ) {
      this.requestMore(false);
      this.props.updateListLoad({ key: this.props.url, data: true });
    } else {
      this.setState({
        data: this.props.app_reducer[this.props.path]?.list ?? [],
        show: true,
        pageTitle: this.translate(this.props.title),
      });
    }
  }

  handleShowCaseSidebar = (data) => {
    this.setState({
      sidebarData: data,
      showSidebar: true,
    });
  };

  handleSidebar = (value, prev) => {
    let payload = value;
    payload["name"] = this.props.path;
    this.props.requestIndex(payload);

    this.child.updateRow(payload);
    this.setState({ showSidebar: this.props.showSidebar });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.showSidebar ? (
          <div className={`data-list thumb-view"`}>
            <CaseEdit
              show={this.state.showSidebar}
              data={this.state.sidebarData}
              handleSidebar={this.handleSidebar}
            />
          </div>
        ) : (
          <></>
        )}
        <div>
          <Breadcrumbs
            breadCrumbItems={
              this.props.hasNew
                ? [
                    {
                      name: this.translate("Add New"),
                      link: `${this.props.path}s/new`,
                    },
                  ]
                : []
            }
            breadCrumbTitle={this.state.pageTitle}
            breadCrumbParent={this.state.pageParent}
            breadCrumbActive={this.state.activePage}
          />

          {this.state.showModal ? (
            <Prompt
              translate={this.translate}
              showModal={this.state.showModal}
              action={() => this.handleDelete()}
              toggleModal={() => this.setState({ showModal: false })}
              message={this.state.message}
            />
          ) : (
            <></>
          )}
          {this.state.show ? (
            <AgGridTable
              // ref={this.child}
              ref={(instance) => {
                this.child = instance;
              }}
              // ref={this.setChild}
              requestData={this.requestMore}
              requestParams={this.requestParams}
              // requestParams={this.requestFilteredData}
              requestMoreFiltered={this.requestMoreFiltered}
              requestMore={this.requestMore}
              loading={this.state.isLoading}
              data={this.state.data}
              columnDefs={this.state.columnDefs}
              tableType={this.props.path}
              dropdowns={[this.props.app_reducer.dropdowns]}
              onColumnMoved={this.onColumnMoved}
              userRole={this.props.userRole}
              handleShowCaseSidebar={this.handleShowCaseSidebar}
              deleteAction={(id) => {
                this.setState({ recordId: id, showModal: true });
              }}
              searchCase={this.requestAddCase}
            />
          ) : (
            <></>
          )}
        </div>
      </React.Fragment>
    );
  }

  /**
   * Requests a list of data based on path props - requests new data if next is false and request next page e next is true
   *
   * @param {*} next
   * @returns
   */
  requestMore = (next = true) => {
    this.setState({
      data: this.props.app_reducer[this.props.path]?.list ?? [],
      show: true,
      isLoading: true,
      requestMoreWaiting: true,
      pageTitle: this.translate(this.props.title),
    });

    return this.props
      .requestForm({
        url: this.props.url,
        name: this.props.name ?? this.props.path,
        next,
        has_params: false,
      })
      .then(() => {
        this.setState({
          data:
            this.props.app_reducer[this.props.name ?? this.props.path]?.list ??
            [],
          page: this.props.path,
          pageTitle: `${this.props.title}`,
          isLoading: this.state.requestMoreInterval !== null,
          requestMoreWaiting: false,
        });

        if (this.props.app_reducer.error === "session") {
          this.notifyErrorBounce(
            this.translate(`Your session has expired, please login again!`)
          );
        }

        if (this.props.app_reducer[this.props.name ?? this.props.path]?.next)
          return true;
        else return false;
      });
  };

  /**
   * Requests a a data by search field
   *
   * @param {*} payload
   * @returns
   */
  requestAddCase = (payload) => {
    return this.props.requestAddCase(payload).then(() => {
      this.setState({
        data:
          this.props.app_reducer[this.props.name ?? this.props.path]?.list ??
          [],
        page: this.props.path,
        pageTitle: `${this.props.title}`,
        isLoading: false,
      });
    });
  };

  /**
   * Requests a list of data based on path props - uses the args to appens them as query_string
   *
   * @param {*} start
   * @param {*} end
   * @returns
   */
  requestParams = (start, end, timeLength) => {
    this.setState({
      data: this.props.app_reducer[this.props.path]?.list ?? [],
      show: true,
      isLoading: true,
    });

    return this.props
      .requestForm({
        url: `${this.props.url}/?start=${start}&end=${end}`,
        name: this.props.name ?? this.props.path,
        next: false,
        has_params: true,
        timeLength,
      })
      .then(() => {
        this.setState({
          data:
            this.props.app_reducer[this.props.name ?? this.props.path]?.list ??
            [],
          page: this.props.path,
          pageTitle: `${this.props.title}`,
          requestMoreWaiting: false,
        });

        const requestMoreInterval = setInterval(this.requestMoreFiltered, 1);

        this.setState({ requestMoreInterval });

        if (this.props.app_reducer[this.props.name ?? this.props.path]?.next)
          return true;
        else return false;
      });
  };

  requestMoreFiltered = async () => {
    let page = this.props.app_reducer[this.props.name ?? this.props.path]?.page;
    let pages =
      this.props.app_reducer[this.props.name ?? this.props.path]?.pages;

    if (this.state.requestMoreWaiting) {
      return;
    }

    if (pages === page) {
      clearInterval(this.state.requestMoreInterval);
      this.setState({ requestMoreInterval: null, isLoading: false });
      return;
    }

    await this.requestMore();
  };

  /**
   * Delete method - deletes the record based on the recordId state prop
   *
   */
  handleDelete = () => {
    const { userOauth } = this.props.state.auth.login;

    let formData = new FormData();

    formData.append("is_deleted", true);

    axios
      .patch(`${this.props.url}/${this.state.recordId}.json/`, formData, {
        headers: {
          "X-CSRFTOKEN": this.props.state.auth.login.csrftoken,
          Authorization: `Bearer ${userOauth.access_token}`,
        },
      })
      .then(({ data }) => {
        this.requestMore(false);

        this.setState({ showModal: false });
        this.notifySuccessBounce(data.id);
      })
      .catch((error) => {
        this.notifyErrorBounce(
          this.translate(`Unable to complete transaction.`)
        );
      });
  };

  /**
   * Filter specific fields for each userRole
   * @returns
   */
  getSpecificields = () => {
    let form = [];
    console.log(form);
    const { userRole } = this.props;
    if (this.props.path === "lvform") {
      switch (userRole) {
        case "manager":
          form = managerColumns.form;
          break;
        case "operator":
          form = operatorColumns.form;
          break;
        case "focalpoint":
          form = operatorColumns.form;
          break;
        case "partner":
          form = partnerColumns.form;
          break;

        default:
          form = [];
          break;
      }
    }
    if (this.props.path === "forwardcasetofocalpoint") {
      form = sent_to_focalpoint.form;
    }
    if (this.props.path === "forwardinginstitution") {
      form = sent_to_partner.form;
    }

    return form;
  };

  /**
   * Format fields form a form object in config file
   */
  formatFields = () => {
    let colm = this.getSpecificields();
    console.log("Colm: ", colm);
    const form = colm.length > 0 ? colm : config.pages[this.props.path].form;

    let columnDefs = form.map((item, index) => {
      if (
        item.name === "fullname" ||
        item.name === "contact" ||
        item.name === "file" ||
        item.name === "other_contact" //||
        // item.name === "casecomment_set"
        // TO-DO: Validate if we need to keep it in the list or simply the exported file
      ) {
        return {
          headerName: this.translate(item.label),
          field: `${item.name}`,
          filter: "customFilter",
          resizable: true,
          hide: true,
          width: getFieldWith(item.name),
        };
      }
      if (item.name === "casecomment_set") {
        return {
          headerName: this.translate(item.label),
          field: this.translate(`${item.name}_label`),
          width: getFieldWith(item.name),
          editable: false,
          resizable: true,
          filter: "customFilter",
          valueGetter: ({ data }) => {
            return this.translate(
              data[`${item.name}`]
                .map(
                  (comment, index) =>
                    `${comment.id} - ${comment.feedback} - ${comment.created_by_label}`
                )
                .join("; \n") ?? "Null"
            );
          },
        };
      }

      // if (
      //   // item.type === "datetime"
      //   // ||
      //   item.name === "datetime_created"
      // ) {
      //   console.log("Item: ", item.label);
      //   return {
      //     headerName: this.translate(item.label),
      //     field: `callcase.${item.name}_label`,
      //     width: getFieldWith(item.name),
      //     editable: false,
      //     filter: "customFilter",
      //     resizable: true,
      //   };
      // }

      if (
        item.type === "select one" ||
        (item.type === "string" && item["wq:ForeignKey"])
      ) {
        if (index === 0) {
          return {
            headerName: this.translate(item.label),
            field: `${item.name}_label`,
            width: getFieldWith(item.name),
            editable: false,
            resizable: true,
            filter: "customFilter",
            checkboxSelection: true,
            headerCheckboxSelection: true,
            cellRendererFramework: ({ data }) => {
              return renderStatus(
                this.props,
                data,
                this.translate(data[`${item.name}_label`])
              );
            },
          };
        } else {
          if (`${item.name}_label` === `${this.props.path}_status_label`)
            return {
              headerName: this.translate(item.label),
              field: this.translate(`${item.name}_label`),
              width: getFieldWith(item.name),
              editable: false,
              resizable: true,
              filter: "customFilter",
              valueGetter: ({ data }) => {
                if (item.name === "groups")
                  return this.translate(data["groups_label"][0] ?? "Null");

                return this.translate(data[`${item.name}_label`] ?? "Null");
              },
              cellRendererFramework: ({ data }) => {
                return renderStatusLabel(
                  this.props,
                  data,
                  this.translate(data[`${item.name}_label`])
                );
              },
            };
          else
            return {
              headerName: this.translate(item.label),
              field: `${item.name}_label`,
              width: getFieldWith(item.name),
              editable: false,
              filter: "customFilter",
              resizable: true,
              valueGetter: ({ data }) => {
                if (item.name === "groups")
                  return this.translate(data["groups_label"][0] ?? "Null");
                return this.translate(
                  data[`${item.name}_label`] ?? data[`${item.name}`] ?? "Null"
                );
              },
            };
        }
      } else {
        if (item.type === "select") {
          return {
            headerName: this.translate(item.label),
            field: `${item.name}_label`,
            width: getFieldWith(item.name),
            editable: false,
            filter: "customFilter",
            resizable: true,
            valueGetter: ({ data }) =>
              data[`${item.name}`]?.length ??
              data[`${item.name}_set`]?.length ??
              0,
          };
        }
        if (item.type === "datetime") {
          return {
            headerName: this.translate(item.label),
            field: `${item.name}_label`,
            width: getFieldWith(item.name),
            editable: false,
            filter: "customFilter",
            resizable: true,
          };
        }
        if (item.type === "binary") {
          return {
            headerName: this.translate(item.label),
            field: `${item.name}_label`,
            width: getFieldWith(item.name),
            editable: false,
            filter: "customFilter",
            resizable: true,
            cellRendererFramework: ({ data }) => {
              return (
                <Button.Ripple color="flat-primary">
                  <span className="align-middle">
                    {data[item.name]?.substring(
                      data[item.name]?.lastIndexOf("/") + 1
                    )}
                  </span>
                </Button.Ripple>
              );
            },
          };
        }
        if (index === 0) {
          return {
            headerName: this.translate(item.label),
            field: `${item.name}`,
            width: getFieldWith(item.name),
            editable: false,
            filter: "customFilter",
            resizable: true,
            checkboxSelection: true,
            headerCheckboxSelection: true,
            cellRendererFramework: ({ data }) => {
              return renderStatus(
                this.props,
                data,
                this.translate(data[`${item.name}`])
              );
            },
          };
        }

        return {
          headerName: this.translate(item.label),
          field: this.translate(`${item.name}`),
          width: getFieldWith(item.name),
          resizable: true,
          filter: "customFilter",
          editable: false,
          valueGetter: ({ data }) => {
            if (item.name === "text") {
              // Here we clean the html on article/Base de Conhecimentos view
              var htmlString = data[`${item.name}`];
              var plainString = htmlString.replace(/<[^>]+>/g, "");
              return this.translate(plainString);
            }
            if (
              data[`${item.name}`] === "" ||
              data[`${item.name}`] === undefined ||
              data[`${item.name}`] === null
            ) {
              return this.translate("Null");
            }
            // If it is a case Comment field, we handle it here
            if (item.label === "Comments") {
              return data[`${item.name}`]
                .map(
                  (comment, index) =>
                    `${comment.id} - ${comment.feedback} - ${comment.created_by_label}`
                )
                .join("; \n");
            }

            return this.translate(data[`${item.name}`]);
          },
        };
      }
    });

    if (
      this.props.path === "forwardcasetofocalpoint" ||
      this.props.path === "forwardinginstitution"
    ) {
      columnDefs = columnDefs.concat(
        config.pages.lvform_forwarding.form.map((item, index) => {
          if (
            item.name === "fullname" ||
            item.name === "contact" ||
            item.name === "file" ||
            item.name === "case_number" ||
            item.name === "other_contact"
          ) {
            return {
              headerName: this.translate(item.label),
              field: `callcase.${item.name}`,
              resizable: true,
              filter: "customFilter",
              hide: true,
              width: getFieldWith(item.name),
            };
          }

          if (
            item.type === "select one" ||
            (item.type === "string" && item["wq:ForeignKey"])
          ) {
            if (index === 0) {
              return {
                headerName: this.translate(item.label),
                field: `callcase.${item.name}_label`,
                width: getFieldWith(item.name),
                editable: false,
                resizable: true,
                filter: "customFilter",
                checkboxSelection: true,
                headerCheckboxSelection: true,
                cellRendererFramework: ({ data }) => {
                  return renderStatus(
                    this.props,
                    data,
                    this.translate(data["callcase"][`${item.name}_label`])
                  );
                },
              };
            } else {
              if (`${item.name}_label` === `${this.props.path}_status_label`)
                return {
                  headerName: this.translate(item.label),
                  field: this.translate(`${item.name}_label`),
                  width: getFieldWith(item.name),
                  editable: false,
                  resizable: true,
                  filter: "customFilter",
                  valueGetter: ({ data }) => {
                    return this.translate(
                      data["callcase"][`${item.name}_label`] ?? "Null"
                    );
                  },
                  cellRendererFramework: ({ data }) => {
                    return renderStatusLabel(
                      this.props,
                      data,
                      this.translate(data[`${item.name}_label`])
                    );
                  },
                };
              else
                return {
                  headerName: this.translate(item.label),
                  field: `${item.name}_label`,
                  width: getFieldWith(item.name),
                  editable: false,
                  filter: "customFilter",
                  resizable: true,
                  valueGetter: ({ data }) => {
                    // If it is a case Comment field, we handle it here
                    if (item.label === "Comments") {
                      return data["callcase"][`${item.name}`]
                        .map(
                          (comment, index) =>
                            `${comment.id} - ${comment.feedback} - ${comment.created_by_label}`
                        )
                        .join("; \n");
                    }
                    return this.translate(
                      data["callcase"][`${item.name}_label`] ??
                        data["callcase"][`${item.name}`] ??
                        "Null"
                    );
                  },
                };
            }
          } else {
            if (item.type === "datetime") {
              return {
                headerName: this.translate(item.label),
                field: `${item.name}_label`,
                width: getFieldWith(item.name),
                editable: false,
                filter: "customFilter",
                resizable: true,
              };
            }
            if (item.type === "binary") {
              return {
                headerName: this.translate(item.label),
                field: `callcase.${item.name}_label`,
                width: getFieldWith(item.name),
                editable: false,
                filter: "customFilter",
                resizable: true,
                cellRendererFramework: ({ data }) => {
                  return (
                    <Button.Ripple color="flat-primary">
                      <span className="align-middle">
                        {data["callcase"][item.name]?.substring(
                          data["callcase"][item.name]?.lastIndexOf("/") + 1
                        )}
                      </span>
                    </Button.Ripple>
                  );
                },
              };
            }
            if (index === 0) {
              return {
                headerName: this.translate(item.label),
                field: `callcase.${item.name}`,
                width: getFieldWith(item.name),
                editable: false,
                filter: "customFilter",
                resizable: true,
                checkboxSelection: true,
                headerCheckboxSelection: true,
                cellRendererFramework: ({ data }) => {
                  return renderStatus(
                    this.props,
                    data,
                    this.translate(data["callcase"][`${item.name}`])
                  );
                },
              };
            }

            return {
              headerName: this.translate(item.label),
              field: this.translate(`callcase.${item.name}`),
              width: getFieldWith(item.name),
              resizable: true,
              filter: "customFilter",
              editable: false,
              valueGetter: ({ data }) => {
                if (
                  data["callcase"][`${item.name}`] === "" ||
                  data["callcase"][`${item.name}`] === undefined ||
                  data["callcase"][`${item.name}`] === null
                ) {
                  return this.translate("Null");
                }

                return this.translate(data["callcase"][`${item.name}`]);
              },
            };
          }
        })
      );
    }

    this.setState({ columnDefs });
  };

  /**
   * Success alert function - shows an alert with success background
   * @returns
   */
  notifySuccessBounce = () =>
    toast.success(this.translate(`Transaction completed successfuly!`), {
      transition: Bounce,
    });

  /**
   * Error alert function - shows an alert with danger background
   * @param {*} error - string message
   * @returns
   */

  notifyErrorBounce = (error) =>
    toast.error(this.translate(error), {
      transition: Bounce,
    });
}

function mapStateToProps(state) {
  return {
    state: state,
    config: state.auth.login.config,
    app_reducer: state.app.app_reducer,
    userRole: state.auth.login.userRole,
  };
}

export default connect(mapStateToProps, {
  requestForm,
  requestDropodowns,
  updateListLoad,
  requestIndex,
  requestAddCase,
})(List);
