import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import Breadcrumbs from "../../components/@vuexy/breadCrumbs/BreadCrumb";
import KnowledgeBadeMain from "./KnowledgeBaseMain";
import "../../assets/scss/pages/knowledge-base.scss";
import { IntlContext } from "../../i18n/provider";
class Information extends Component {
  static contextType = IntlContext;
  translate = this.context.translate;

  state = {
    pageTitle: "Knowledge Base",
    pageParent: "Categories & Articles",
    activePage: "Categories",
    items: [],
    columnDefs: [],
    show: false,
    data: [],
    page: "lvform",
  };

  componentDidMount() {}

  hasNew = () => {
    let val = false;

    const { userRole } = this.props;
    switch (userRole) {
      case "manager":
        val = true;
        break;
      case "operator":
        val = false;
        break;
      case "focalpoint":
        val = false;
        break;
      case "partner":
        val = false;
        break;

      default:
        val = false;
        break;
    }

    return val;
  };

  render() {
    return (
      <div>
        <Breadcrumbs
          breadCrumbItems={
            this.hasNew()
              ? [
                  {
                    name: this.translate("Add New"),
                    link: `${this.props.path}s/new`,
                  },
                ]
              : []
          }
          breadCrumbTitle={this.translate(this.state.pageTitle)}
          breadCrumbParent={this.translate(this.state.pageParent)}
          breadCrumbActive={this.translate(this.state.activePage)}
        />

        <Row>
          <Col sm="12">
            <KnowledgeBadeMain />
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
    userRole: state.auth.login.userRole,
  };
}

export default connect(mapStateToProps, {})(Information);
