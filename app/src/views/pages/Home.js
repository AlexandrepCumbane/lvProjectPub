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
import { DailyCases } from "../dashboard/roles/query/TotalCases";
class Home extends React.Component {
  static contextType = IntlContext;
  translate = this.context.translate;

  state = {
    pageTitle: this.translate("Home"),
    pageParent: this.translate("Dashboard & Analyptics"),
    activePage: this.translate("Dashboard"),
    items: [],
    columnDefs: [],
    show: false,
    data: [],
    page: "lvform",
    currentUserRole: "admin",
    locale: LOCALES.PORTUGUESE,
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

        {this.renderSwitchCard()}
        {/* {ExchangeRates()} */}
        {/* <ExchangeRates /> */}
      </div>
    );
  }

  renderSwitchCard = () => {
    const { userRole } = this.props;

    let element = <></>;

    console.log(userRole);

    switch (userRole) {
      case "operator":
        element = this.renderOperatorCards();
        break;

      case "focalpoint":
        element = this.renderFocalPointCards();
        break;

      case "partner":
        element = <p>{this.translate("Role without cards")}</p>; //this.renderFocalPointCards();
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
          <DailyCases />
        </Col>
        <Col lg="3" md="3" className="text-center align-middle">
          <SimpleAnalipticCard
            icon={<Phone className="text-success" size={15} />}
            stat="0"
            statTitle="Week cases"
            type="area"
          />
        </Col>
        <Col lg="3" md="3" className="text-center align-middle">
          <SimpleAnalipticCard
            icon={<Phone className="text-danger" size={15} />}
            stat="0"
            statTitle="Month cases"
            type="area"
          />
        </Col>

        <Col lg="3" md="3" className="text-center align-middle">
          <SimpleAnalipticCard
            icon={<Phone className="text-warning" size={15} />}
            stat="0"
            statTitle="Year cases"
            type="area"
          />
        </Col>
      </Row>
    );
  };

  renderManagerCards = () => {
    return (
      <Row>
        <Col lg="3" md="3" className="text-center align-middle">
          <DailyCases />
        </Col>
        <Col lg="3" md="3" className="text-center align-middle">
          <SimpleAnalipticCard
            icon={<Icons.PhoneForwarded className="text-success" size={15} />}
            stat="0"
            statTitle="Referall cases"
            type="area"
          />
        </Col>
        <Col lg="3" md="3" className="text-center align-middle">
          <SimpleAnalipticCard
            icon={<Icons.PhoneMissed className="text-danger" size={15} />}
            stat="0"
            statTitle="Not referred cases"
            type="area"
          />
        </Col>

        <Col lg="3" md="3" className="text-center align-middle">
          <SimpleAnalipticCard
            icon={<Icons.PhoneCall className="text-warning" size={15} />}
            stat="0"
            statTitle="Cases with Feedback"
            type="area"
          />
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
            statTitle="With Feedback Linha Verde"
          />
        </Col>
        <Col xl="2" lg="4" sm="6">
          <StatisticsCard
            hideChart
            iconBg="danger"
            icon={<Icons.ThumbsDown className="text-danger" size={15} />}
            stat="0"
            statTitle="Without Feedback Linha Verde"
          />
        </Col>
        <Col xl="2" lg="4" sm="6">
          <StatisticsCard
            hideChart
            iconBg="primary"
            icon={<Icons.Archive className="text-primary" size={15} />}
            stat="0"
            statTitle="Total Linha Verde Cases"
          />
        </Col>
        <Col xl="2" lg="4" sm="6">
          <StatisticsCard
            hideChart
            iconBg="danger"
            icon={<Icons.ThumbsDown className="text-danger" size={15} />}
            stat="0"
            statTitle="Cases Without Feedback Partner"
          />
        </Col>
        <Col xl="2" lg="4" sm="6">
          <StatisticsCard
            hideChart
            iconBg="success"
            icon={<Icons.Smile className="text-success" size={15} />}
            stat="0"
            statTitle="With Feedback Partner"
          />
        </Col>
        <Col xl="2" lg="4" sm="6">
          <StatisticsCard
            hideChart
            iconBg="primary"
            icon={<Icons.Archive className="primary" size={22} />}
            stat="689"
            statTitle="Total Cases sent Partner"
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
  };
}

export default connect(mapStateToProps, {})(Home);
