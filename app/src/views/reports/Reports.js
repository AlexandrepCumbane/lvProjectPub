import React, { Component } from "react";
import BarChart from "./charts/Bar";
import PieChart from "./charts/Pie";
import DountChart from "./charts/Dounts";
import ColumnChart from "./charts/Column";
import DistributedChart from "./charts/Distributed";

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
import DistributedCharts from "./charts/Distributed";

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
          <Col md="4">
            <BarChart />
          </Col>
          <Col md="4">
            <h5 className="">KOWLEDGE ABOUT LV</h5>
            <PieChart />
          </Col>

          <Col md="4">
            <h5>SATISFATION</h5>
            <DountChart />
          </Col>
        </Row>

        <Row>
          <Col md="6">
            <ColumnChart
              options={{
                color: "#d9eb55",
                title: "CASES BY PROVINCES",
                categories: [
                  "Gaza",
                  "Cabo Delgado",
                  "Tete",
                  "Manica",
                  "Zambezia",
                  "Sofala",
                ],
                data: [1, 2, 1, 5, 4, 86],
              }}
            />
          </Col>

          <Col md="6">
            <ColumnChart
              options={{
                color: "#d9eb55",
                title: "CASE TYPE",
                categories: [
                  "Complaints",
                  "Request for Information",
                  "Request for Assistance",
                  "Positive Feedback",
                ],
                data: [40, 18, 12, 27],
              }}
            />
          </Col>
        </Row>

        <Row>
          <Col md="6">
            <ColumnChart
              options={{
                color: "#d9eb55",
                title: "Cases Per Sector - May 2019 February 2020",
                categories: [
                  "INGC",
                  "WASH",
                  "Education",
                  "Health",
                  "CCCM",
                  "Other",
                  "Shelter",
                  "Food Security",
                ],
                data: [2, 1, 1, 1, 1, 17, 5, 71],
              }}
            />
          </Col>
          <Col md="6">
            <DountChart
             //title ="CALLER PROFILE"
              series={[78, 22]}
              labels={["Male", "Female"]} 
            />
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
