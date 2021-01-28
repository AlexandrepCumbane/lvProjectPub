import React from "react";
import { Card, CardBody } from "reactstrap";
import Chart from "react-apexcharts";

class PieCharts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: this.props.series,
      options: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: this.props.labels,
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {},
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
  }

  render() {
    return (
      <Card className="square rounde-0">
        <CardBody>
          <Chart
            options={this.state.options}
            series={this.state.series}
            type="pie"
            height={350}
          />
        </CardBody>
      </Card>
    );
  }
}
export default PieCharts;
