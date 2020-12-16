import React from "react";
import { Card, CardBody } from "reactstrap";
import Chart from "react-apexcharts";

class DonutCharts extends React.Component {
  state = {
    series: [],
    options: {},
    isLoaded: false,
  };
  componentDidMount() {
    // console.log(this.props);
    this.setState({
      series: this.props.series, //[44, 55, 13, 43, 22],
      options: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: this.props.labels, //["Team A", "Team B", "Team C", "Team D", "Team E"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
        title: {
          text: this.props.title,
          floating: true,
          offsetY: 330,
          align: "center",
          style: {
            color: "brown",
          },
        },
      },
    });
  }

  render() {
    return (
      <Card className="square rounde-0">
        <CardBody>
          <Chart
            options={this.state.options}
            series={this.state.series ?? []}
            type="donut"
            height={350}
          />
        </CardBody>
      </Card>
    );
  }
}
export default DonutCharts;
