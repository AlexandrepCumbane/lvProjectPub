import React from "react";
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap";
import Chart from "react-apexcharts"



class DistributedCharts extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
      
        series: [{
          data: [21, 22, 10, 28, 16, 21, 13, 30]
        }],
        options: {
          chart: {
            height: 350,
            type: 'bar',
            events: {
              click: function(chart, w, e) {
                // console.log(chart, w, e)
              }
            }
          },
          
          plotOptions: {
            bar: {
              columnWidth: '45%',
              distributed: true
            }
          },
          dataLabels: {
            enabled: false
          },
          legend: {
            show: false
          },
          xaxis: {
            categories: [
              ['John', 'Doe'],
              ['Joe', 'Smith'],
              ['Jake', 'Williams'],
              'Amber',
              ['Peter', 'Brown'],
              ['Mary', 'Evans'],
              ['David', 'Wilson'],
              ['Lily', 'Roberts'], 
            ],
            labels: {
              style: {
                
                fontSize: '12px'
              }
            }
          }
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
                type="bar"
                height={350}
              />
            </CardBody>
          </Card>
        );
      }
    }
    export default DistributedCharts;