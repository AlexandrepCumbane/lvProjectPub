import React, { Component } from "react";
import { connect } from "react-redux";
import Breadcrumbs from "../../components/@vuexy/breadCrumbs/BreadCrumb";
import AgGridTable from "../../components/custom/table/AgGridTable";

import {
  requestForm,
  requestDropodowns,
} from "../../redux/actions/app/actions";
class List extends Component {
  state = {
    pageTitle: "Pages",
    pageParent: "Lists & Forms",
    activePage: "Lists",
    items: [],
    columnDefs: [],
    show: false,
    data: [],
  };

  componentDidMount() {
    this.formatFields();
    this.props.requestDropodowns();
    this.props.requestForm();
  }

  formatFields = () => {
    const { form } = this.props.config.pages["lvform"];

    const columnDefs = form.map((item) => {
      if (item.type == "select one") {
        return {
          headerName: item.label,
          field: `${item.name}_label`,
          width: 250,
          filter: true,
          headerCheckboxSelectionFilteredOnly: true,
          headerCheckboxSelection: true,
        };
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
              name: "Add New",
              link: "lvforms/new",
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
            tableType={"calls"}
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
