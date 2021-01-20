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
  };

  componentDidMount() {
    this.formatFields();
    this.props.requestDropodowns();
    this.setState({
      data: this.props.app_reducer[this.props.path] ?? [],
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
        <span>{label}</span>
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

          {` ${label}`}
        </span>
      </div>
    );
  };

  renderPriority = (props) => {
    let color = "white";

    switch (props[`case_priority_label`]) {
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
      if (item.type === "select one" || item.type === "string") {
        if (index === 0) {
          return {
            headerName: item.label,
            field: `${item.name}_label`,
            width: 250,
            filter: true,
            cellRendererFramework: ({ data }) => {
              return this.renderStatus(data, data[`${item.name}_label`]);
            },
          };
        } else {
          if (`${item.name}_label` === `${this.props.path}_status_label`)
            return {
              headerName: item.label,
              field: `${item.name}_label`,
              width: 250,
              filter: true,
              cellRendererFramework: ({ data }) => {
                return this.renderStatusLabel(data, data[`${item.name}_label`]);
              },
            };
          else
            return {
              headerName: item.label,
              field: `${item.name}_label`,
              width: 250,
              filter: true,
              headerCheckboxSelectionFilteredOnly: true,
              headerCheckboxSelection: true,
            };
        }
      } else
        return {
          headerName: item.label,
          field: `${item.name}`,
          width: 250,
          filter: true,
          headerCheckboxSelectionFilteredOnly: true,
          headerCheckboxSelection: true,
        };
    });
    this.setState({ columnDefs, show: true });
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
            data={this.state.data}
            columnDefs={this.state.columnDefs}
            tableType={this.state.page}
            dropdowns={[]}
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
