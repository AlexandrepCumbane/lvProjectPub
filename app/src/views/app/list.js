import React, { Component } from "react";
import { connect } from "react-redux";

import { Badge } from "reactstrap";

import { Circle, Octagon, ArrowUp } from "react-feather";

import Breadcrumbs from "../../components/@vuexy/breadCrumbs/BreadCrumb";
import AgGridTable from "../../components/custom/table/AgGridTable";

import { default as config } from "../../data/config";
import { IntlContext } from "../../i18n/provider";
import {
  requestForm,
  requestDropodowns,
} from "../../redux/actions/app/actions";
class List extends Component {
  static contextType = IntlContext;
  translate = this.context.translate;

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
  };

  componentDidMount() {
    this.formatFields();
    this.props.requestDropodowns();
    this.setState({
      data: this.props.app_reducer[this.props.path] ?? [],
      isLoading: true,
      show: true,
    });

    this.props
      .requestForm({
        url: this.props.url,
        name: this.props.name ?? this.props.path,
      })
      .then(() => {
        this.setState({
          data: this.props.app_reducer[this.props.name ?? this.props.path],
          page: this.props.path,
          pageTitle: `${this.props.title}`,
          isLoading: false,
        });
      });
  }

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
    switch (props[`${model}_priority_label`]) {
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
    return (
      <ArrowUp className={`text-${color} text-center mb-1 mt-1`} size={14} />
    );
  };

  formatFields = () => {
    const { form } = config.pages[this.props.path];

    const columnDefs = form.map((item, index) => {
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
          breadCrumbItems={[
            {
              name: this.translate("Add New"), // i18n.t('Add New'),
              link: `${this.state.page}s/new`,
            },
          ]}
          breadCrumbTitle={this.state.pageTitle}
          breadCrumbParent={this.state.pageParent}
          breadCrumbActive={this.state.activePage}
        />

        {this.state.show ? (
          <AgGridTable
            loading={this.state.isLoading}
            data={this.state.data}
            columnDefs={this.state.columnDefs}
            tableType={this.props.path}
            dropdowns={[]}
            onColumnMoved={this.onColumnMoved}
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
  };
}

export default connect(mapStateToProps, { requestForm, requestDropodowns })(
  List
);
