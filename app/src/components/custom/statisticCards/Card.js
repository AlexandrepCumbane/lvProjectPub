import React from "react";
import { Card, CardBody } from "reactstrap";

class SimpleAnalipticCard extends React.Component {
  render() {
    return (
      <Card className="square">
        <CardBody
          className={`${
            this.props.className ? this.props.className : "stats-card-body"
          } d-flex ${
            !this.props.iconRight && !this.props.hideChart
              ? "flex-column align-items-start"
              : this.props.iconRight
              ? "justify-content-between flex-row-reverse align-items-center"
              : this.props.hideChart && !this.props.iconRight
              ? "justify-content-center flex-column text-center"
              : null
          } ${!this.props.hideChart ? "pb-0" : "pb-2"} pt-2`}
        >
          <div className="icon-section">
            <div
              className={`avatar avatar-stats p-50 m-0 ${
                this.props.iconBg
                  ? `bg-rgba-${this.props.iconBg}`
                  : "bg-rgba-primary"
              }`}
            >
              <div className="avatar-content">{this.props.icon}</div>
            </div>
          </div>
          <div className="title-section">
            <h2 className="text-bold-600 mt-1 mb-25">{this.props.stat}</h2>
            <p className="mb-2">{this.props.statTitle}</p>
          </div>
        </CardBody>
      </Card>
    );
  }
}
export default SimpleAnalipticCard;
