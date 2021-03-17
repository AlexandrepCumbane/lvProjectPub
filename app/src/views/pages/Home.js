import React from "react";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import { Phone } from "react-feather";
import * as Icons from "react-feather";
import Breadcrumbs from "../../components/@vuexy/breadCrumbs/BreadCrumb";
import SimpleAnalipticCard from "../../components/custom/statisticCards/Card";
import StatisticsCard from "../../components/@vuexy/statisticsCard/StatisticsCard";
import { LOCALES } from "../../i18n/index";
import { IntlContext } from "../../i18n/provider";
import { AllCases } from "../dashboard/roles/query/TotalCases";
import { DailyCases } from "../dashboard/roles/query/DailyCases";
import { WeeklyCases } from "../dashboard/roles/query/WeeklyCases";
import { MonthlyCases } from "../dashboard/roles/query/MonthlyCases";
import { AnnualCases } from "../dashboard/roles/query/AnnualCases";
import { ReferallCases } from "../dashboard/roles/query/TotalReferall";
import { FeedbackCases } from "../dashboard/roles/query/TotalReferallFeedback";
import { NotReferallCases } from "../dashboard/roles/query/TotalNotReferall";
class Home extends React.Component {
  static contextType = IntlContext;
  translate = this.context.translate;

  state = {
    pageTitle: this.translate("Home"),
    pageParent: this.translate("Dashboard & Analytics"),
    activePage: this.translate("Dashboard"),
    items: [],
    columnDefs: [],
    show: false,
    data: [],
    page: "lvform",
    currentUserRole: "admin",
    locale: LOCALES.PORTUGUESE,
  };

  componentDidMount() {
    console.log(this.props.state);
  }

  render() {
    return (
      <div>
        <Breadcrumbs
          breadCrumbItems={[]}
          breadCrumbTitle={this.state.pageTitle}
          breadCrumbParent={this.state.pageParent}
          breadCrumbActive={this.state.activePage}
        />

        {this.renderSwitchCard()}
        {/* {ExchangeRates()} */}
        {/* <ExchangeRates /> */}
      </div>
    );
  }

  renderSwitchCard = () => {
    const { userRole } = this.props;

    let element = <></>;

    switch (userRole) {
      case "operator":
        element = this.renderOperatorCards();
        break;

      case "focalpoint":
        element = this.renderFocalPointCards();
        break;

      case "partner":
        element = this.renderPartnerCards();
        break;

      case "manager":
        element = this.renderManagerCards();
        break;

      default:
        element = <p>{this.translate("User role not provided")}</p>;
        break;
    }

    return element;
  };

  renderOperatorCards = () => {
    return (
      <Row>
        <Col lg="3" md="3" className="text-center align-middle">
          <DailyCases userInfo={this.props.userInfo} />
        </Col>
        <Col lg="3" md="3" className="text-center align-middle">
          <WeeklyCases userInfo={this.props.userInfo} />
        </Col>
        <Col lg="3" md="3" className="text-center align-middle">
          <MonthlyCases userInfo={this.props.userInfo} />
        </Col>
        <Col lg="3" md="3" className="text-center align-middle">
          <AnnualCases userInfo={this.props.userInfo} />
        </Col>
        
      </Row>
    );
  };

  renderManagerCards = () => {
    return (
      <Row>
        <Col lg="3" md="3" className="text-center align-middle">
          <AllCases />
        </Col>
        <Col lg="3" md="3" className="text-center align-middle">
          <ReferallCases />
        </Col>
        <Col lg="3" md="3" className="text-center align-middle">
          <NotReferallCases />
        </Col>

        <Col lg="3" md="3" className="text-center align-middle">
          <FeedbackCases />
        </Col>

        {/* TODO: Show diference between closed and opened cases */}
      </Row>
    );
  };

  renderFocalPointCards = () => {
    return (
      <Row>
        <Col xl="2" lg="4" sm="6">
          <StatisticsCard
            hideChart
            iconBg="success"
            icon={<Icons.ThumbsUp className="text-success" size={15} />}
            stat="0"
            statTitle={this.translate("With Feedback Linha Verde")}
          />
        </Col>
        <Col xl="2" lg="4" sm="6">
          <StatisticsCard
            hideChart
            iconBg="danger"
            icon={<Icons.ThumbsDown className="text-danger" size={15} />}
            stat="0"
            statTitle={this.translate("Without Feedback Linha Verde")}
          />
        </Col>
        <Col xl="2" lg="4" sm="6">
          <StatisticsCard
            hideChart
            iconBg="primary"
            icon={<Icons.Archive className="text-primary" size={15} />}
            stat="0"
            statTitle={this.translate("Total Linha Verde Cases")}
          />
        </Col>
        <Col xl="2" lg="4" sm="6">
          <StatisticsCard
            hideChart
            iconBg="danger"
            icon={<Icons.ThumbsDown className="text-danger" size={15} />}
            stat="0"
            statTitle={this.translate("Cases Without Feedback Partner")}
          />
        </Col>
        <Col xl="2" lg="4" sm="6">
          <StatisticsCard
            hideChart
            iconBg="success"
            icon={<Icons.Smile className="text-success" size={15} />}
            stat="0"
            statTitle={this.translate("With Feedback Partner")}
          />
        </Col>
        <Col xl="2" lg="4" sm="6">
          <StatisticsCard
            hideChart
            iconBg="primary"
            icon={<Icons.Archive className="primary" size={22} />}
            stat="689"
            statTitle={this.translate("Total Cases sent Partner")}
          />
        </Col>

        {/* TODO: Show diference between closed and opened cases */}
      </Row>
    );
  };

  renderPartnerCards = () => {
    return (
      <Row>
        <Col md="3">
          <StatisticsCard
            hideChart
            iconBg="primary"
            icon={<Icons.ThumbsUp className="text-primary" size={15} />}
            stat="0"
            statTitle={this.translate("Referred Cases")}
          />
        </Col>
        <Col md="3">
          <StatisticsCard
            hideChart
            iconBg="warning"
            icon={<Icons.PhoneMissed className="text-warning" size={15} />}
            stat="0"
            statTitle={this.translate("Without Feedback")}
          />
        </Col>
        <Col md="3">
          <StatisticsCard
            hideChart
            iconBg="success"
            icon={<Icons.ThumbsUp className="text-success" size={15} />}
            stat="0"
            statTitle={this.translate("Approved Cases")}
          />
        </Col>
        <Col md="3">
          <StatisticsCard
            hideChart
            iconBg="danger"
            icon={<Icons.ThumbsDown className="text-danger" size={15} />}
            stat="0"
            statTitle={this.translate("Rejected Cases")}
          />
        </Col>

        {/* TODO: Show diference between closed and opened cases */}
      </Row>
    );
  };
}

function mapStateToProps(state) {
  return {
    state: state,
    config: state.auth.login.config,
    userRole: state.auth.login.userRole,
    app_reducer: state.app.app_reducer,
    userInfo: state.auth.login.userInfo,
  };
}

export default connect(mapStateToProps, {})(Home);
