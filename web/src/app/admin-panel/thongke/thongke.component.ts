import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ChartConfiguration, ChartData, ChartType, ChartOptions, LegendElement, LegendItem } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MessageService } from 'primeng/api';
import { Course, CourseStatistic } from 'src/app/shared/Models/course.model';
import { StudentAvgScore } from 'src/app/shared/Models/student.model';
import { CourseService } from 'src/app/shared/Services/course.service';

@Component({
  selector: 'app-thongke',
  templateUrl: './thongke.component.html',
  styleUrls: ['./thongke.component.css'],
  providers: [MessageService]
})
export class ThongkeComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  // Pie
  // public pieChartOptions: ChartConfiguration['options'] = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       display: true,
  //       position: 'bottom',
  //       title: {
  //         display: true,
  //         position: 'center',
  //         color: 'red',
  //         padding: 10,
  //         text: 'Thiện đại ca'
  //       }
  //     }
  //   }
  // };

  public pieChartOptions: ChartOptions = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        title: {
          display: true,
          position: 'center',
          color: 'red',
          padding: 10,
          text: 'Biểu đồ phân loại học sinh'
        }
      }
    }
  }
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['Xuất sắc', 'Giỏi', 'Khá', 'Trung bình', 'Yếu', 'Kém'],
    datasets: [{
      data: []
    }]
  };

  public pieChartType: ChartType = 'pie';

  listAvgScore: StudentAvgScore[] = []
  listCourse: CourseStatistic[] = []
  slxuatsac: number = 0;
  slgioi: number = 0;
  slkha: number = 0;
  sltrungbinh: number = 0;
  slyeu: number = 0;
  slkem: number = 0;
  courseStatistic: CourseStatistic = new CourseStatistic()
  lstCourse: number[] = []

  show: boolean = false

  constructor(private router: Router,
    private courseService: CourseService,
    private messageService: MessageService) { }

  //Lớp ---->  Số lượng học sinh ở 6 loại  {}
  ngOnInit(): void {
    this.lstCourse.push(1)
  }

  showStatisticByCourse() {
    if (this.lstCourse.length != 0) {
      this.courseService.GetStatisticByCourse(1).subscribe(
        (res) => {
          // console.log(res)
          // console.log(JSON.parse(res.message))
          this.listAvgScore = JSON.parse(res.message) as StudentAvgScore[]
          console.log(this.listAvgScore)
          for (let i = 0; i < this.listAvgScore.length; i++) {
            if (this.listAvgScore[i].avgscore >= 9) {
              this.slxuatsac = this.slxuatsac + 1
            }
            else if (this.listAvgScore[i].avgscore >= 8) {
              this.slgioi = this.slgioi + 1
            }
            else if (this.listAvgScore[i].avgscore >= 6.5) {
              this.slkha = this.slkha + 1
            }
            else if (this.listAvgScore[i].avgscore >= 5) {
              this.sltrungbinh = this.sltrungbinh + 1
            }
            else if (this.listAvgScore[i].avgscore >= 4) {
              this.slyeu = this.slyeu + 1
            }
            else {
              this.slkem = this.slkem + 1
            }
          }

          this.courseStatistic.id = 1
          this.courseStatistic.slgioi = this.slgioi
          this.courseStatistic.slxuatsac = this.slxuatsac
          this.courseStatistic.slkha = this.slkha
          this.courseStatistic.sltrungbinh = this.sltrungbinh
          this.courseStatistic.slyeu = this.slyeu
          this.courseStatistic.slkem = this.slkem
          this.listCourse.push(this.courseStatistic)

          this.show = true

          this.pieChartData.datasets[0].data.push(this.listCourse[0].slxuatsac)
          this.pieChartData.datasets[0].data.push(this.listCourse[0].slgioi)
          this.pieChartData.datasets[0].data.push(this.listCourse[0].slkha)
          this.pieChartData.datasets[0].data.push(this.listCourse[0].sltrungbinh)
          this.pieChartData.datasets[0].data.push(this.listCourse[0].slyeu)
          this.pieChartData.datasets[0].data.push(this.listCourse[0].slkem)
          console.log(this.pieChartData.datasets[0].data)

          this.chart?.update();
        },
        (error) => { }
      );
      this.lstCourse = []
    }
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }


  // addSlice(): void {
  //   if (this.pieChartData.labels) {
  //     this.pieChartData.labels.push(['Line 1']);
  //   }

  //   this.pieChartData.datasets[0].data.push(10);
  //   console.log(this.pieChartOptions.plugins)
  //   this.chart?.update();
  // }
}
