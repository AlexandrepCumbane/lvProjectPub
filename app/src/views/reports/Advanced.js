import React, { Component } from "react";
import { connect } from "react-redux";
import Breadcrumbs from "../../components/@vuexy/breadCrumbs/BreadCrumb";
import Radio from "../../components/@vuexy/radio/RadioVuexy";
import { IntlContext, LOCALES } from "../../i18n";

import translate from "../../i18n/translate";
import {
  Input,
  Label,
  FormGroup,
  Col,
  Row,
  CustomInput,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
} from "reactstrap";
import { ChevronDown } from "react-feather";
import DistributedCharts from "./charts/Distributed";

// const contx = useContext(I18nProvider);
class Advanced extends Component {
  state = {
    pageTitle: "Advanced Reports",
    pageParent: "Analyptics & Reports",
    activePage: "Reports",
    items: [],
    columnDefs: [],
    show: false,
    data: [],
    page: "lvform",
    dropdownOpen: false,
    locale: LOCALES.PORTUGUESE,
  };

  componentDidMount() {
    console.log(LOCALES);
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

        <IntlContext.Consumer>
          {(context) => {
            return (
              <Row>
                <div className="language-options">
                  <Radio
                    name="i18n-lang-radio"
                    onClick={() => {
                      context.switchLanguage(LOCALES.ENGLISH);
                    }}
                    label="English"
                    className="mb-1"
                    defaultChecked={
                      context.state.locale === LOCALES.ENGLISH ? true : false
                    }
                  />
                  <Radio
                    name="i18n-lang-radio"
                    onClick={() => {
                      context.switchLanguage(LOCALES.PORTUGUESE);
                    }}
                    label="Portuguese"
                    className="mb-1"
                    defaultChecked={
                      context.state.locale === LOCALES.PORTUGUESE ? true : false
                    }
                  />
                </div>
              </Row>
            );
          }}
        </IntlContext.Consumer>
        <Row>
          <Col>
            <Label> {translate("provincia")}</Label>
          </Col>
          <Col md="12">
            <Card className="rounded-0 mb-0 my-2">
              <CardHeader>
                <CardTitle>Advanced Report Filters</CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col lg="3" md="6" sm="12">
                    <FormGroup className="mb-0">
                      <Label for="role">Province</Label>
                      <CustomInput
                        className="square"
                        type="select"
                        name="role"
                        id="role"
                      >
                        <option value="All">Maputo</option>
                        <option value="User">Tete</option>
                        <option value="Staff">Sofala</option>
                        <option value="Admin">Nampula</option>
                      </CustomInput>
                    </FormGroup>
                  </Col>
                  <Col lg="3" md="6" sm="12">
                    <FormGroup className="mb-0">
                      <Label for="status">Distrit</Label>
                      <CustomInput
                        className="square"
                        type="select"
                        name="status"
                        id="status"
                      >
                        <option value="All">Boane</option>
                        <option value="Active">Marracuene</option>
                        <option value="Blocked">Matola</option>
                        <option value="Deactivated">Manhica</option>
                      </CustomInput>
                    </FormGroup>
                  </Col>
                  <Col lg="3" md="6" sm="12">
                    <FormGroup className="mb-0">
                      <Label for="verified">Locality</Label>
                      <CustomInput
                        className="square"
                        type="select"
                        name="verified"
                        id="verified"
                      >
                        <option value="All">All</option>
                        <option value="True">True</option>
                        <option value="False">False</option>
                      </CustomInput>
                    </FormGroup>
                  </Col>
                  <Col lg="3" md="6" sm="12">
                    <FormGroup className="mb-0">
                      <Label for="department">Cases per Province</Label>
                      <CustomInput
                        className="square"
                        type="select"
                        name="department"
                        id="department"
                      >
                        <option value="All">All</option>
                        <option value="Sales">Sales</option>
                        <option value="Development">Development</option>
                        <option value="Management">Management</option>
                      </CustomInput>
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={{ offset: "2", order: "2", size: "7" }}>
            <h5> {translate("CLIENTE PROFILE BY AGE")}</h5>
            <DistributedCharts
              categorie={[
                ["Gaza", "Doe"],
                ["Maputo", "Smith"],
                ["yes", "Williams"],
                "Amber",
                ["Peter", "Brown"],
                ["Mary", "Evans"],
                ["David", "Wilson"],
                ["Lily", "Roberts"],
              ]}
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

export default connect(mapStateToProps, {})(Advanced);
