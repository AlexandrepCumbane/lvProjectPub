import React, { Component } from "react";
import BarChart from "./charts/Bar";
import PieChart from "./charts/Pie";
import DountChart from "./charts/Dounts";
import ColumnChart from "./charts/Column";
import { Activity } from "react-feather";
import StatisticsCard from "../../components/@vuexy/statisticsCard/StatisticsCard";
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
          <Col lg="3" sm="6">
            <StatisticsCard
              hideChart
              iconRight
              iconBg="primary"
              icon={<Activity className="primary" size={22} />}
              stat="87%"
              statTitle="Total Feedback Provided"
            />
          </Col>
          <Col lg="3" sm="6">
            <StatisticsCard
              hideChart
              iconRight
              iconBg="primary"
              icon={<Activity className="primary" size={22} />}
              stat="9899"
              statTitle="Total Cases Registered"
            />
          </Col>
        </Row>
        <Row>
          <Col md="4">
            <h5>CLIENTE PROFILE BY AGE</h5>
            <DountChart
              //title ="CALLER PROFILE"
              series={[3, 90, 4]}
              labels={["Under 17", "18-59", "60 and above"]}
            />
          </Col>
          <Col md="4">
            <h5 className="">KOWLEDGE ABOUT LV</h5>
            <PieChart />
          </Col>

          <Col md="4">
            <h5>SATISFATION</h5>
            <DountChart
              series={[95, 5]}
              labels={["Satisfied", "Dissatisfied"]}
            />
          </Col>
        </Row>

        <Row>
          <Col md="6">
            <h5>CASES BY PROVINCES</h5>
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
            <h5>CASE TYPE</h5>
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
            <h5>
              Cases Per Sector 
            </h5>
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
            <h5>CLIENTE PROFILE BY GENDER</h5>
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
