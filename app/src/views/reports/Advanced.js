import React, { Component } from "react";
import { connect } from "react-redux";
import Breadcrumbs from "../../components/@vuexy/breadCrumbs/BreadCrumb";
import { I18nProvider, LOCALES } from "../../i18n";

import translate from "../../i18n/translate";
import {
  Input,
  Label,
  FormGroup,
  Col,
  Row,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { ChevronDown } from "react-feather";
import DistributedCharts from "./charts/Distributed";
class Information extends Component {
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
  // const [lacale, setLocale] = useState[LOCALES.ENGLISH];
  componentDidMount() {}
  render() {
    return (
      <I18nProvider locale={this.state.locale}>
        <div>
          <Breadcrumbs
            breadCrumbItems={[]}
            breadCrumbTitle={this.state.pageTitle}
            breadCrumbParent={this.state.pageParent}
            breadCrumbActive={this.state.activePage}
          />
          <button onClick={() => this.setState({ locale: LOCALES.ENGLISH })}>
            English
          </button>
          <button onClick={() => this.setState({ locale: LOCALES.PORTUGUESE })}>
            Portuguese
          </button>
          <Row>
            <Col lg="3" md="6" sm="12">
              <FormGroup className="mb-0">
                <Label for="role">{translate("provincia")}</Label>
                <Input type="select" name="role" id="role">
                  <option value="All">Maputo</option>
                  <option value="User">Tete</option>
                  <option value="Staff">Sofala</option>
                  <option value="Admin">Nampula</option>
                </Input>
              </FormGroup>
            </Col>
            <Col lg="3" md="6" sm="12">
              <FormGroup className="mb-0">
                <Label for="status">{translate("distrito")}</Label>
                <Input type="select" name="status" id="status">
                  <option value="All">Boane</option>
                  <option value="Active">Marracuene</option>
                  <option value="Blocked">Matola</option>
                  <option value="Deactivated">Manhica</option>
                </Input>
              </FormGroup>
            </Col>
            <Col lg="3" md="6" sm="12">
              <FormGroup className="mb-0">
                <Label for="verified">{translate("Localidade")}</Label>
                <Input type="select" name="verified" id="verified">
                  <option value="All">All</option>
                  <option value="True">True</option>
                  <option value="False">False</option>
                </Input>
              </FormGroup>
            </Col>
            <Col lg="3" md="6" sm="12">
              <FormGroup className="mb-0">
                <Label for="department">
                  {translate("Casos por provincia")}
                </Label>
                <Input type="select" name="department" id="department">
                  <option value="All">All</option>
                  <option value="Sales">Sales</option>
                  <option value="Development">Development</option>
                  <option value="Management">Management</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <br></br>
          <br></br>
          <Row>
            <Col md="auto" mr="auto">
              <h5>CLIENTE PROFILE BY AGE</h5>
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
      </I18nProvider>
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
