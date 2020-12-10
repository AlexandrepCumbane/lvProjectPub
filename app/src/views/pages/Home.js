import React from "react";
import { Row, Col } from "reactstrap";
import { Phone, PhoneForwarded } from "react-feather";
import Breadcrumbs from "../../components/@vuexy/breadCrumbs/BreadCrumb";
import SimpleAnalipticCard from "../../components/custom/statisticCards/Card";

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
      </div>
    );
  }
}

export default Home;
