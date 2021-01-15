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
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [
          "South Korea",
          "Canada",
          "United Kingdom",
          "Netherlands",
          "Italy",
          "France",
          "Japan",
          "United States",
          "China",
          "Germany",
        ],
        tickAmount: 5,
      },
    },
    series: [
      {
        data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
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
