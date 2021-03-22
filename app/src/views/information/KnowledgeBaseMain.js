import React from "react";
import { Card, CardBody, FormGroup, Input, Row, Col } from "reactstrap";
import { Search } from "react-feather";
import KnowledgeCards from "./KnowledgeCards";
import classnames from "classnames";

// import { ContextLayout } from "../../utility/context/Layout";
import ArticleView from "./ArticleView";
import "../../assets/scss/plugins/tables/_agGridStyleOverride.scss";
import "../../assets/scss/pages/users.scss";
import "../../assets/scss/pages/data-list.scss";
import { IntlContext } from "../../i18n/provider";

class KnowledgeBaseMain extends React.Component {
  static contextType = IntlContext;
  translate = this.context.translate;

  state = {
    value: "",
    edit: false,
    data: {},
    loadMore: false,
  };

  onChange = (event) => {
    let searchText = event.target.value.toLowerCase();
    this.setState({
      value: searchText,
    });
  };

  updateLoadMore = () => {
    this.setState({ loadMore: !this.state.loadMore });
  };

  handleSidebar = (value, prev) => {
    this.setState({ edit: value });
  };

  fillSidebar = (data, show) => {
    this.setState({ data, edit: true });
  };

  render() {
    const { edit, data } = this.state;
    return (
      <React.Fragment>
        <div className={`data-list thumb-view"`}>
          {this.state.edit ? (
            <ArticleView
              handleSidebar={this.handleSidebar}
              show={edit}
              data={data}
              updateLoadMore={this.updateLoadMore}
            />
          ) : (
            <div />
          )}
          <div
            className={classnames("data-list-overlay", {
              show: this.state.edit,
            })}
          ></div>
        </div>
        <Row className="overflow-hidden agGrid-card rounded-0">
          <Col sm="12">
            <Card className="knowledge-base-bg rounded-0">
              <CardBody>
                <h1 className="white">
                  {this.translate("Dedicated Source Used on Website")}
                </h1>
                <p className="mb-2 white">
                  {this.translate(
                    "You can find any content by searching for the keyword"
                  )}
                </p>
                <form>
                  <FormGroup className="position-relative has-icon-left mb-0">
                    <Input
                      className="rounded-0"
                      type="text"
                      placeholder={this.translate(
                        "Search a topic or a keyword"
                      )}
                      bsSize="lg"
                      value={this.state.value}
                      onChange={this.onChange}
                    />
                    <div className="form-control-position">
                      <Search size={14} />
                    </div>
                  </FormGroup>
                </form>
              </CardBody>
            </Card>
          </Col>
          <Col sm="12">
            <KnowledgeCards
              value={this.state.value}
              fillSidebar={this.fillSidebar}
              loadMore={this.state.loadMore}
              updateLoadMore={this.updateLoadMore}
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}
export default KnowledgeBaseMain;
