import React, { Component } from "react";
// import StatisticsCard from "../../components/@vuexy/statisticsCard/StatisticsCard";
import { connect } from "react-redux";
import { IntlContext, LOCALES } from "../../i18n/index";

// import translate from "../../i18n/translate";

import { Col, Row } from "reactstrap";

import Breadcrumbs from "../../components/@vuexy/breadCrumbs/BreadCrumb";
import { CasesByCategory } from "./queries/CaseType";
import { CasesByProvince } from "./queries/CasesProvince";
import { CasesBySector } from "./queries/CasesPerSector";
import { CasesByAge } from "./queries/CaseAge";
import { CasesByKnowLedge } from "./queries/CaseKnowledgeLV";
import { CasesByCallFeedback } from "./queries/CaseCallFeedback";
import { CasesByGender } from "./queries/CaseGender";
class Information extends Component {
  static contextType = IntlContext;
  translate = this.context.translate;

  state = {
    pageTitle: this.translate("Reports"),
    pageParent: this.translate("Analysis and Reporting"),
    activePage: this.translate("Reports"),
    items: [],
    columnDefs: [],
    show: false,
    data: [],
    page: "lvform",
    locale: LOCALES.PORTUGUESE,
  };

  render() {
    return (
      <div>
        <Breadcrumbs
          breadCrumbItems={[]}
          breadCrumbTitle={this.state.pageTitle}
          breadCrumbParent={this.state.pageParent}
          breadCrumbActive={this.state.activePage}
        />
        {/* <Row>
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
        </Row> */}
        <Row>
          <Col md="6">
            <h5>{this.translate("CALLER PROFILE BY AGE")}</h5>
            <CasesByAge translate={this.translate} />
          </Col>
          <Col md="6">
            <h5> {this.translate("CALLER PROFILE BY GENDER")}</h5>

            <CasesByGender translate={this.translate} />
          </Col>
          <Col md="6">
            <h5 className=""> {this.translate("KOWLEDGE ABOUT LV")}</h5>
            <CasesByKnowLedge translate={this.translate} />
          </Col>

          <Col md="6">
            <h5>{this.translate("SATISFATION")}</h5>
            <CasesByCallFeedback translate={this.translate} />
          </Col>
        </Row>

        <Row>
          <Col md="12">
            <h5>{this.translate("CASES BY PROVINCES")}</h5>
            <CasesByProvince translate={this.translate} />
          </Col>

          <Col md="12">
            <h5> {this.translate("CASE TYPE")}</h5>
            <CasesByCategory translate={this.translate} />
          </Col>
        </Row>

        <Row>
          <Col md="12">
            <h5>{this.translate("CASES PER SECTOR")}</h5>
            <CasesBySector translate={this.translate} />
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
