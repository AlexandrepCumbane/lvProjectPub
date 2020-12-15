import React, { Component } from "react";
import BarChart from "./charts/Bar";
import { connect } from "react-redux";

import {
  Col,
  Row,
  Input,
  FormGroup,
  Button,
  CustomInput,
  Label,
} from "reactstrap";

import Breadcrumbs from "../../components/@vuexy/breadCrumbs/BreadCrumb";
import AgGridTable from "../../components/custom/table/AgGridTable";

class Information extends Component {
  state = {
    pageTitle: "Reports",
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

        <Row>
          <Col md="6">
            <BarChart />
          </Col>
        </Row>
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
