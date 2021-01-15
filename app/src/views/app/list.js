import React, { Component } from "react";
import { connect } from "react-redux";
import Breadcrumbs from "../../components/@vuexy/breadCrumbs/BreadCrumb";
import AgGridTable from "../../components/custom/table/AgGridTable";

import { default as config } from "../../data/config";
import translate from "../../i18n/translate";

import {
  requestForm,
  requestDropodowns,
} from "../../redux/actions/app/actions";
class List extends Component {
  state = {
    pageTitle: "Pages",
    pageParent: translate("Lists & Forms"),
    activePage: translate("Lists"),
    items: [],
    columnDefs: [],
    show: false,
    data: [],
    page: "lvform",
  };

  // componentDidUpdate(){
  //   console.log("Props: ", this.props.title)
  // }

  componentDidMount() {

    // console.log("")
    this.formatFields();
    this.props.requestDropodowns();
    this.props.requestForm(this.props.url).then(() => {
      this.setState({
        data: this.props.app_reducer.list,
        page: this.props.path,
        pageTitle: `${this.props.title}`,
      });
    });
  }

  formatFields = () => {
    const { form } = config.pages[this.props.path];

    const columnDefs = form.map((item) => {
      if (item.type === "select one" || item.type === "string") {
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
