import React from "react";
import { Card, CardBody } from "reactstrap";
import Chart from "react-apexcharts";

class ColumnCharts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [],
      options: {},
    };
  }

  componentDidMount() {
    this.setState({
      series: [
        {
          name: "Value",
          data: this.props.options.data, //[1, 2, 1, 5, 4, 86]
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "bar",
        },
        plotOptions: {
          bar: {
            dataLabels: {
              position: "top", // top, center, bottom
              columnWidth: "70%",
              barHeight: "70%",
            },
          },
        },
        dataLabels: {
          enabled: true,
          offsetY: -20,
          style: {
            fontSize: "12px",
            colors: ["brown"],
          },
        },

        xaxis: {
          //   categories: [
          //     "Gaza",
          //     "Cabo Delgado",
          //     "Tete",
          //     "Manica",
          //     "Zambezia",
          //     "Sofala",
          //   ],
          categories: this.props.options.categories,
          position: "top",
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          crosshairs: {
            fill: {
              type: "gradient",
              gradient: {
                colorFrom: "brown",
                colorTo: this.props.options.color, //colorTo: "#BED1E6",
                stops: [0, 100],
                opacityFrom: 0,
                opacityTo: 0.5,
              },
            },
          },
          tooltip: {
            enabled: true,
          },
        },
        yaxis: {
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
            // formatter: function (val) {
            //   return val + "%";
            // },
          },
        },
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
            series={this.state.series}
            type="bar"
            height={350}
          />
        </CardBody>
      </Card>
    );
  }
}
export default ColumnCharts;
