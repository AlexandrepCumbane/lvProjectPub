import React from "react";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import Breadcrumbs from "../../components/@vuexy/breadCrumbs/BreadCrumb";
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
import { FeedbackFocalPointManager } from "../dashboard/roles/query/FeedbackFocalpointManager";
import { NoFeedbackFocalPointManager } from "../dashboard/roles/query/NoFeedbackFocalpointManager";
import { TotalFocalPointManager } from "../dashboard/roles/query/TotalFocalpointManager";
import { FeedbackFocalPointPartner } from "../dashboard/roles/query/FeedbackFocalpointPartner";
import { TotalFocalPointPartner } from "../dashboard/roles/query/TotalFocalpointPartner";
import { NoFeedbackFocalPointPartner } from "../dashboard/roles/query/NoFeedbackFocalpointPartner";
import { NoFeedbackPartner } from "../dashboard/roles/query/FeedbackPartner";
import { TotalPartner } from "../dashboard/roles/query/TotalPartner";
import { ApprovedPartner } from "../dashboard/roles/query/ApprovedPartner";
import { NotApprovedPartner } from "../dashboard/roles/query/NotApprovedPartner";
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
        <Col md="4">
          <TotalFocalPointManager userInfo={this.props.userInfo} />
        </Col>
        <Col md="4">
          <FeedbackFocalPointManager userInfo={this.props.userInfo} />
        </Col>
        <Col md="4">
          <NoFeedbackFocalPointManager userInfo={this.props.userInfo} />
        </Col>
        <Col md="4">
          <TotalFocalPointPartner userInfo={this.props.userInfo} />
        </Col>
        <Col md="4">
          <FeedbackFocalPointPartner userInfo={this.props.userInfo} />
        </Col>
        <Col md="4">
          <NoFeedbackFocalPointPartner userInfo={this.props.userInfo} />
        </Col>
      </Row>
    );
  };

  renderPartnerCards = () => {
    return (
      <Row>
        <Col md="3">
          <TotalPartner userInfo={this.props.userInfo} />
        </Col>
        <Col md="3">
          <NoFeedbackPartner userInfo={this.props.userInfo} />
        </Col>
        <Col md="3">
          <ApprovedPartner userInfo={this.props.userInfo} />
        </Col>
        <Col md="3">
          <NotApprovedPartner userInfo={this.props.userInfo} />
        </Col>

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
    userInfo: state.auth.login.userOauth.profile.sub,
  };
}

export default connect(mapStateToProps, {})(Home);
