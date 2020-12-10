import React from "react";
import { Row, Col } from "reactstrap";
import { Phone, PhoneForwarded } from "react-feather";
import * as Icons from "react-feather";
import Breadcrumbs from "../../components/@vuexy/breadCrumbs/BreadCrumb";
import SimpleAnalipticCard from "../../components/custom/statisticCards/Card";
import StatisticsCard from "../../components/@vuexy/statisticsCard/StatisticsCard";

class Home extends React.Component {
  state = {
    pageTitle: "Home",
    pageParent: "Dashboard & Analyptics",
    activePage: "Dashboard",
    items: [],
    columnDefs: [],
    show: false,
    data: [],
    page: "lvform",
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

        {/* Operador  */}
        <Row>
          <Col lg="3" md="3" className="text-center align-middle">
            <SimpleAnalipticCard
              icon={<Phone className="text-primary" size={15} />}
              stat="0"
              statTitle="Daily cases"
              type="area"
            />
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

        {/* Manager UI */}
        <Row>
          <Col lg="3" md="3" className="text-center align-middle">
            <SimpleAnalipticCard
              icon={<Icons.Phone className="text-primary" size={15} />}
              stat="0"
              statTitle="New Cases"
              type="area"
            />
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

        {/* Manager UI */}
        <Row>
          <Col xl="2" lg="4" sm="6">
            <StatisticsCard
              hideChart
              iconBg="primary"
              icon={<Icons.ThumbsUp className="text-success" size={15} />}
              stat="0"
              statTitle="With Feedback Linha Verde"
            />
          </Col>
          <Col xl="2" lg="4" sm="6">
            <StatisticsCard
              hideChart
              iconBg="success"
              icon={<Icons.ThumbsDown className="text-danger" size={15} />}
              stat="0"
              statTitle="Without Feedback Linha Verde"
            />
          </Col>
          <Col xl="2" lg="4" sm="6">
            <StatisticsCard
              hideChart
              iconBg="success"
              icon={<Icons.ThumbsDown className="text-danger" size={15} />}
              stat="0"
              statTitle="Total Linha Verde Cases"
            />
          </Col>
          <Col xl="2" lg="4" sm="6">
            <StatisticsCard
              hideChart
              iconBg="warning"
              icon={<Icons.Send className="text-warning" size={15} />}
              stat="0"
              statTitle="Cases Without Feedback Partner"
            />
          </Col>
          <Col xl="2" lg="4" sm="6">
            <StatisticsCard
              hideChart
              iconBg="danger"
              icon={<Icons.ThumbsUp className="text-success" size={15} />}
              stat="0"
              statTitle="With Feedback Partner"
            />
          </Col>
          <Col xl="2" lg="4" sm="6">
            <StatisticsCard
              hideChart
              iconBg="success"
              icon={<Icons.Smile className="success" size={22} />}
              stat="689"
              statTitle="Total Cases sent Partner"
            />
          </Col>

          {/* TODO: Show diference between closed and opened cases */}
        </Row>
      </div>
    );
  }
}

export default Home;
