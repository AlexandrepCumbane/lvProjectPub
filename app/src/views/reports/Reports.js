import React, { Component } from "react";
import PieChart from "./charts/Pie";
import DountChart from "./charts/Dounts";
import ColumnChart from "./charts/Column";
import { Activity } from "react-feather";
import StatisticsCard from "../../components/@vuexy/statisticsCard/StatisticsCard";
import { connect } from "react-redux";
import { LOCALES } from "../../i18n/index";

import translate from "../../i18n/translate";

import { Col, Row } from "reactstrap";

import Breadcrumbs from "../../components/@vuexy/breadCrumbs/BreadCrumb";
import { CasesByCategory } from "./queries/CaseType";
import { CasesByProvince } from "./queries/CasesProvince";
import { CasesBySector } from "./queries/CasesPerSector";
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
    locale: LOCALES.PORTUGUESE,
  };
  componentDidMount() {
    console.log(LOCALES);
  }

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
              statTitle={translate("Total Feedback Provided")}
            />
          </Col>
          <Col lg="3" sm="6">
            <StatisticsCard
              hideChart
              iconRight
              iconBg="primary"
              icon={<Activity className="primary" size={22} />}
              stat="9899"
              statTitle={translate("Total Cases Registered")}
            />
          </Col>
        </Row>
        <Row>
          <Col md="4">
            <h5>{translate("CLIENTE PROFILE BY AGE")}</h5>
            <DountChart
              //title ="CALLER PROFILE"
              series={[3, 90, 4]}
              labels={["Under 17", "18-59", "60 and above"]}
            />
          </Col>
          <Col md="4">
            <h5 className=""> {translate("KOWLEDGE ABOUT LV")}</h5>
            <PieChart />
          </Col>

          <Col md="4">
            <h5>{translate("SATISFATION")}</h5>
            <DountChart
              series={[95, 5]}
              labels={["Satisfied", "Dissatisfied"]}
            />
          </Col>
        </Row>

        <Row>
          <Col md="12">
            <h5>{translate("CASES BY PROVINCES")}</h5>
            <CasesByProvince />
          </Col>

          <Col md="12">
            <h5> {translate("CASE TYPE")}</h5>
            <CasesByCategory />
          </Col>
        </Row>

        <Row>
          <Col md="12">
            <h5>{translate("CASES PER SECTOR")}</h5>
            <CasesBySector />
          </Col>
          <Col md="6">
            <h5> {translate("CLIENTE PROFILE BY GENDER")}</h5>
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
