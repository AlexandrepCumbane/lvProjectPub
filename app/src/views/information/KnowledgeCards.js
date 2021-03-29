import React from "react";
import { connect } from "react-redux";
import { Card, CardBody, Row, Col } from "reactstrap";
import img1 from "../../assets/img/pages/graphic-1.png";

import {
  requestDropodowns,
  requestForm,
} from "../../redux/actions/app/actions";

import { IntlContext } from "../../i18n/provider";
class KnowledgeCards extends React.Component {
  static contextType = IntlContext;
  translate = this.context.translate;
  state = {
    data: [],
  };
  componentDidMount() {
    this.requestMore(false);
  }

  requestMore = (next = true) => {
    return this.props
      .requestForm({
        url: "articles",
        name: "article",
        next,
      })
      .then(() => {
        const data = this.props.app_reducer["article"].list;
        this.setState({ data });
      });
  };

  componentDidUpdate() {
    if (this.props.loadMore) {
      this.requestMore();
      this.props.updateLoadMore();
    }
  }

  renderExpiration = (item) => {
    const today = new Date();
    const current = new Date(item.published_date);

    if (
      this.props.userRole === "manager" &&
      (today <= current || item.published_date === null)
    ) {
      return item.published ? (
        <small className="text-success">
          <strong>{this.translate("Published")}</strong>
        </small>
      ) : (
        <small className="text-warning">
          <strong> {this.translate("Not Published")}</strong>
        </small>
      );
    } else {
      if (this.props.userRole === "manager") {
        return (
          <small className="text-danger">
            <strong>{this.translate("Expired")}</strong>
          </small>
        );
      }
    }

    return (
      <small className="text-success">
        <strong>{this.translate("Published")}</strong>
      </small>
    );
  };

  renderCards = () => {
    const { data } = this.state;

    let result = data.map((item) => {
      if (this.props.value.length < 1) {
        return (
          <Col
            md="4"
            onClick={() => this.props.fillSidebar(item, true)}
            sm="6"
            className="search-content rounded-0"
            key={item.id}
          >
            <Card className="rounded-0">
              <CardBody className="text-center">
                <div>
                  <img
                    src={img1}
                    alt={item.title}
                    className="mx-auto mb-2"
                    width="180"
                  />
                  <h4>{item.title.toUpperCase()}</h4>
                  <small className="text-dark">
                    {this.translate(item.category_label)}
                  </small>
                  <br />
                  {this.renderExpiration(item)}
                </div>
              </CardBody>
            </Card>
          </Col>
        );
      } else if (
        item.title
          .toLocaleLowerCase()
          .includes(this.props.value.toLocaleLowerCase())
      ) {
        return (
          <Col
            md="4"
            onClick={() => this.props.fillSidebar(item, true)}
            sm="6"
            className="search-content rounded-0"
            key={item.id}
          >
            <Card className="rounded-0">
              <CardBody className="text-center">
                <div>
                  <img
                    src={img1}
                    alt={item.title}
                    className="mx-auto mb-2"
                    width="180"
                  />
                  <h4>{item.title.toUpperCase()}</h4>
                  <small className="text-dark">
                    {this.translate(item.category_label)}
                  </small>
                  <br />
                  {this.renderExpiration(item)}
                </div>
              </CardBody>
            </Card>
          </Col>
        );
      }
      return "";
    });
    return result;
  };
  render() {
    return <Row>{this.renderCards()}</Row>;
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

export default connect(mapStateToProps, { requestForm, requestDropodowns })(
  KnowledgeCards
);
