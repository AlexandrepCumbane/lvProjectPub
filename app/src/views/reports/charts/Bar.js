import React from "react";
import { Card, CardBody } from "reactstrap";
import Chart from "react-apexcharts";

class BarCharts extends React.Component {
  state = {
    options: {
      colors: this.props.themeColors,
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: "70%",
          barHeight: "70%",
        },
      },
      dataLabels: {
        enabled: true,
        hideOverflowingLabels: true,
        orientation: horizontal,
      },
      xaxis: {
        categories: [],
        tickAmount: 5,
      },
    },
    series: [
      {
        data: [],
      },
    ],
  };

  render() {
    return (
      <Card className="square rounde-0">
        <CardBody>
          <Chart
            options={this.state.options}
            series={this.state.series}
            type="bar"
            height={350}
          />
        </CardBody>
      </Card>
    );
  }
}
export default BarCharts;
