import { Component } from '@angular/core';

import * as Highcharts from 'highcharts';
import { HttpClient } from '@angular/common/http';
// import * as Exporting from 'highcharts/modules/exporting';

// (<any>Exporting)(Highcharts);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  Highcharts = Highcharts; // required
  chartConstructor = 'chart'; // optional string, defaults to 'chart'
  chartOptions = null; // required
  chartCallback = null; // optional function, defaults to null
  updateFlag = false; // optional boolean
  oneToOneFlag = true; // optional boolean, defaults to false
  runOutsideAngular = false; // optional boolean, defaults to false
  title = 'admin';
  comments = null;
  stats = null;
  constructor(private http: HttpClient) {
    this.chartOptions = {
      chart: { type: 'bar' },
      title: { text: 'Averages of feedbacks' },
      // xAxis: {
      //     // categories: ['Customer Satisfaction', 'Chance to recommend', 'Impact on daily lives', 'Ease of Use'],
      //     title: { text: null }
      // },
      yAxis: {
          min: 0,
          title: {
              text: 'Average Rating',
              align: 'high'
          },
          labels: { overflow: 'justify' }
      },
      plotOptions: {
          bar: {
              dataLabels: {
                  enabled: true
              }
          }
      },
      legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'top',
          x: -10,
          y: 10,
          floating: true,
          borderWidth: 1,
          shadow: true
      },
      credits: {
          enabled: false
      },
      series: []
    };
    this.http.post('api/s3cReY/stats', {}).toPromise().then((res: any) => {
      this.stats = res;
    });
    this.http.post('api/s3cReY/comments', {}).toPromise().then((res: any) => {
      this.comments = res;
    });
  }
}
