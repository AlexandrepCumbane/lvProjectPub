import React from "react";
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap";
import Chart from "react-apexcharts"


class PieCharts extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
      
        series: [3, 2, 4, 23,38,29],
        options: {
          chart: {
            width: 380,
            type: 'pie',
          },
          labels: ['Pamphlet', 'People', 'Posters','Radio','Suggestion Boxes', 'Unspecified'],
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
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
