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

  renderCards = () => {
    const { data } = this.state;

    let result = data.map((item) => {
      console.log(item.title.includes(this.props.value));
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
