import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap"
import Breadcrumbs from "../../components/@vuexy/breadCrumbs/BreadCrumb";
import KnowledgeBadeMain from "./KnowledgeBaseMain";
import "../../assets/scss/pages/knowledge-base.scss";

class Information extends Component {
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
  };
}

export default connect(mapStateToProps, {})(Information);
