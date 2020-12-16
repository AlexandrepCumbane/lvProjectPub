import React, { Component } from "react";
import { connect } from "react-redux";
import Breadcrumbs from "../../components/@vuexy/breadCrumbs/BreadCrumb";

class Information extends Component {
  state = {
    pageTitle: "Advanced Reports",
    pageParent: "Analyptics & Reports",
    activePage: "Reports",
    items: [],
    columnDefs: [],
    show: false,
    data: [],
    page: "lvform",
  };

  componentDidMount() {}

  render() {
    return (
      <div>
        <Breadcrumbs
          breadCrumbItems={[]}
          breadCrumbTitle={this.state.pageTitle}
          breadCrumbParent={this.state.pageParent}
          breadCrumbActive={this.state.activePage}
        />
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

export default connect(mapStateToProps, {})(Information);
