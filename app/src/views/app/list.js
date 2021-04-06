import React, { Component } from "react";
import { connect } from "react-redux";
import { toast, Bounce } from "react-toastify";

import { Badge, Button } from "reactstrap";
import { axios } from "../../redux/api";

import { Circle, Octagon, ArrowUp } from "react-feather";

import Breadcrumbs from "../../components/@vuexy/breadCrumbs/BreadCrumb";
import AgGridTable from "../../components/custom/table/AgGridTable";
import Prompt from "../../components/custom/dialog/Prompt";

import { default as config } from "../../data/config";
import {
  operator as operatorColumns,
  partner as partnerColumns,
  sent_to_focalpoint,
  sent_to_partner,
} from "../../data/lvform.config";
import { IntlContext } from "../../i18n/provider";
import {
  requestForm,
  requestDropodowns,
} from "../../redux/actions/app/actions";

class List extends Component {
  static contextType = IntlContext;
  translate = this.context.translate;

  notifySuccessBounce = () =>
    toast.success(this.translate(`Transaction completed successfuly!`), {
      transition: Bounce,
    });

  notifyErrorBounce = (error) =>
    toast.error(this.translate(error), {
      transition: Bounce,
    });

  state = {
    pageTitle: this.translate("Pages"),
    pageParent: this.translate("Lists & Forms"),
    activePage: this.translate("Lists"),
    items: [],
    columnDefs: [],
    show: false,
    data: [],
    page: "lvform",
    isLoading: false,
    hidden: true,

    showModal: false,
    recordId: 0,
    message: "Do you want to delete that record?",
  };

  componentDidMount() {
    this.formatFields();
    this.requestMore(false);
  }

  requestMore = (next = true) => {
    this.setState({
      data: this.props.app_reducer[this.props.path]?.list ?? [],
      show: true,
      isLoading: true,
    });
    return this.props
      .requestForm({
        url: this.props.url,
        name: this.props.name ?? this.props.path,
        next,
      })
      .then(() => {
        this.setState({
          data:
            this.props.app_reducer[this.props.name ?? this.props.path]?.list ??
            [],
          page: this.props.path,
          pageTitle: `${this.props.title}`,
          isLoading: false,
        });

        if (this.props.app_reducer.error === "session") {
          this.notifyErrorBounce(
            "Your session has expired, please login again!"
          );

          this.setState({ data: [] });
        }

        if (this.props.app_reducer[this.props.name ?? this.props.path]?.next)
          return true;
        else return false;
      });
  };

  requestParams = (start, end) => {
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
      })
      .then(() => {
        this.setState({
          data:
            this.props.app_reducer[this.props.name ?? this.props.path]?.list ??
            [],
          page: this.props.path,
          pageTitle: `${this.props.title}`,
          isLoading: false,
        });

        if (this.props.app_reducer[this.props.name ?? this.props.path]?.next)
          return true;
        else return false;
      });
  };

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
        this.notifyErrorBounce("Unable to complete transaction.");
      });
  };

  getSpecificields = () => {
    let form = [];

    const { userRole } = this.props;
    if (this.props.path === "lvform") {
      switch (userRole) {
        case "manager":
          form = operatorColumns.form;
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
  renderStatusLabel = (props, label) => {
    let color = "white";

    switch (props[`${this.props.path}_status_label`]) {
      case "Not started":
        color = "danger";
        break;
      case "In Progress":
        color = "primary";
        break;
      case "Completed":
        color = "success";
        break;

      case "Closed":
        color = "success";
        break;
      default:
        color = "white";
        break;
    }

    return (
      <Badge color={color} className="mr-1 mb-1 badge-square">
        <Octagon size={12} />
        <span>{this.translate(label)}</span>
      </Badge>
    );
  };

  renderStatus = (props, label) => {
    let color = "white";

    let status = props[`${this.props.path}_status_label`];

    if (this.props.path === "customuser") {
      if (props.is_active) {
        color = "success";
      } else {
        color = "danger";
      }
    } else {
      if (props.callcase) {
        if (props["callcase"].is_closed) {
          color = "success";
        } else {
          color = "danger";
        }
      } else {
        if (this.props.path === "lvform") {
          if (props.is_closed) {
            color = "success";
          } else {
            color = "danger";
          }
        } else {
          if (this.props.path === "article") {
            const today = new Date();
            const current = new Date(`${props.expiration_date} 23:59:59`);

            console.log(
              `${props.title}: `,
              today <= current || props.expiration_date === null
            );
            if (
              props.published &&
              (today <= current || props.expiration_date === null)
            ) {
              color = "success";
            } else {
              color = "danger";
            }
          } else
            switch (status) {
              case "Not started":
                color = "danger";
                break;
              case "In Progress":
                color = "primary";
                break;
              case "Completed":
                color = "success";
                break;
              case "Closed":
                color = "success";
                break;
              default:
                color = "white";
                break;
            }
        }
      }
    }
    return (
      <div
        style={{
          flexDirection: "row",
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span>
          {this.renderPriority(props)}
          <Circle
            className={`text-${color} text-center bg-${color} rounded m-1`}
            size={12}
          />

          {` ${this.translate(label)}`}
        </span>
      </div>
    );
  };

  renderPriority = (props) => {
    let color = "white";
    let model = this.props.path === "lvform" ? "case" : this.props.path;

    let status = props[`${model}_priority_label`];

    if (props.callcase) {
      status = props["callcase"][`case_priority_label`];
    }

    if (this.props.path === "customuser") {
      switch (props["groups_label"][0]) {
        case "partner":
          color = "danger";
          break;
        case "focalpoint":
          color = "secondary";
          break;
        case "operator":
          color = "warning";
          break;
        case "manager":
          color = "info";
          break;
        default:
          color = "white";
          break;
      }
    } else {
      switch (status) {
        case "High":
          color = "danger";
          break;
        case "Medium":
          color = "warning";
          break;
        case "Low":
          color = "info";
          break;
        default:
          color = "white";
          break;
      }
    }

    return (
      <ArrowUp className={`text-${color} text-center mb-1 mt-1`} size={14} />
    );
  };

  formatFields = () => {
    let colm = this.getSpecificields();

    const form = colm.length > 0 ? colm : config.pages[this.props.path].form;

    const columnDefs = form.map((item, index) => {
      if (
        item.name === "fullname" ||
        item.name === "contact" ||
        item.name === "other_contact"
      ) {
        return {
          headerName: this.translate(item.label),
          field: `${item.name}_label`,
          minWidth: 250,
          resizable: true,
          hide: true,
        };
      }

      if (
        item.type === "select one" ||
        (item.type === "string" && item["wq:ForeignKey"])
      ) {
        if (index === 0) {
          return {
            headerName: this.translate(item.label),
            field: `${item.name}_label`,
            minWidth: 250,
            editable: false,
            resizable: true,
            checkboxSelection: true,
            headerCheckboxSelection: true,
            cellRendererFramework: ({ data }) => {
              return this.renderStatus(data, data[`${item.name}_label`]);
            },
          };
        } else {
          if (`${item.name}_label` === `${this.props.path}_status_label`)
            return {
              headerName: this.translate(item.label),
              field: this.translate(`${item.name}_label`),
              width: 250,
              editable: false,
              resizable: true,
              valueGetter: ({ data }) => {
                if (item.name === "groups")
                  return this.translate(data["groups_label"][0] ?? "None");

                return this.translate(data[`${item.name}_label`] ?? "None");
              },
              cellRendererFramework: ({ data }) => {
                return this.renderStatusLabel(data, data[`${item.name}_label`]);
              },
            };
          else
            return {
              headerName: this.translate(item.label),
              field: `${item.name}_label`,
              width: 250,
              editable: false,
              resizable: true,
              valueGetter: ({ data }) => {
                if (item.name === "groups")
                  return this.translate(data["groups_label"][0] ?? "None");
                return this.translate(
                  data[`${item.name}_label`] ?? data[`${item.name}`] ?? "None"
                );
              },
            };
        }
      } else {
        if (item.type === "select") {
          return {
            headerName: this.translate(item.label),
            field: `${item.name}_label`,
            minWidth: 250,
            editable: false,
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
            minWidth: 250,
            editable: false,
            resizable: true,
          };
        }
        if (item.type === "binary") {
          return {
            headerName: this.translate(item.label),
            field: `${item.name}_label`,
            minWidth: 250,
            editable: false,
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
            minWidth: 250,
            editable: false,
            resizable: true,
            checkboxSelection: true,
            headerCheckboxSelection: true,
            cellRendererFramework: ({ data }) => {
              return this.renderStatus(data, data[`${item.name}`]);
            },
          };
        }

        return {
          headerName: this.translate(item.label),
          field: this.translate(`${item.name}`),
          width: 250,
          resizable: true,
          editable: false,
          valueGetter: ({ data }) => {
            if (
              data[`${item.name}`] === "" ||
              data[`${item.name}`] === undefined ||
              data[`${item.name}`] === null
            ) {
              return this.translate("None");
            }

            return this.translate(data[`${item.name}`]);
          },
        };
      }
    });
    this.setState({ columnDefs });
  };

  render() {
    return (
      <div>
        <Breadcrumbs
          breadCrumbItems={
            this.props.hasNew
              ? [
                  {
                    name: this.translate("Add New"), // i18n.t('Add New'),
                    link: `${this.state.page}s/new`,
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
            requestData={this.requestMore}
            requestParams={this.requestParams}
            requestMore={this.requestMore}
            loading={this.state.isLoading}
            data={this.state.data}
            columnDefs={this.state.columnDefs}
            tableType={this.props.path}
            dropdowns={[]}
            onColumnMoved={this.onColumnMoved}
            userRole={this.props.userRole}
            deleteAction={(id) => {
              this.setState({ recordId: id, showModal: true });
            }}
          />
        ) : (
          <></>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state,
    config: state.auth.login.config,
    app_reducer: state.app.app_reducer,
    userRole: state.auth.login.userRole,
  };
}

export default connect(mapStateToProps, { requestForm, requestDropodowns })(
  List
);
