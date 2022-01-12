import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ChartConfiguration, ChartData, ChartType, ChartOptions, LegendElement, LegendItem } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MessageService } from 'primeng/api';
import { Course, CourseStatistic, CourseStatisticType } from 'src/app/shared/Models/course.model';
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

  number: number = 0
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
  listCourse: CourseStatisticType[] = []
  slxuatsac: number = 0;
  slgioi: number = 0;
  slkha: number = 0;
  sltrungbinh: number = 0;
  slyeu: number = 0;
  slkem: number = 0;
  courseStatistic: CourseStatisticType = new CourseStatisticType()
  lstCourse: CourseStatistic[] = [];
  totalCourse: number = 0;
  totalStudent: number = 0;
  showBtn: boolean = true
  chart1: boolean = true
  chart2: boolean = false
  normal: boolean = true
  normal1: boolean = true

  constructor(private router: Router,
    private courseService: CourseService,
    private messageService: MessageService) { }

  //Lớp ---->  Số lượng học sinh ở 6 loại  {}
  ngOnInit(): void {
    this.lstCourse = []
    this.getListCourse();
    this.normal1 = false
    // this.showStatisticByCourse()
    // console.log(this.lstCourse)
  }

  getListCourse() {
    this.courseService.GetAllCourse().subscribe(
      (res) => {
        this.lstCourse = JSON.parse(res.message) as CourseStatistic[];
        this.totalCourse = this.lstCourse.length
        for (let i = 0; i < this.totalCourse; i++) {
          this.pieChartData.datasets[0].data = []
          this.courseService.GetTotalStudent(this.lstCourse[i].id).subscribe(
            (res) => {
              this.totalStudent = res as number
              console.log(this.totalStudent)
              this.lstCourse[i].totalstudent = this.totalStudent
              this.lstCourse[i].show = ''
              this.lstCourse[i].piechartdata = {
                labels: ['Xuất sắc', 'Giỏi', 'Khá', 'Trung bình', 'Yếu', 'Kém'],
                datasets: [{
                  data: []
                }]
              }
              this.lstCourse[i].slxuatsac = 0;
              this.lstCourse[i].slgioi = 0;
              this.lstCourse[i].slkha = 0;
              this.lstCourse[i].sltrungbinh = 0;
              this.lstCourse[i].slyeu = 0;
              this.lstCourse[i].slkem = 0;
            },
            (error) => { }
          )
        }
        console.log(this.lstCourse)
      },
      (error) => { }
    );

  }

  showNormal() {
    this.normal1 = true
    this.chart2 = false
  }
  showChart() {
    this.normal1 = false
    this.chart2 = true
  }
  showStatisticByCourse() {
    this.chart1 = false
    this.normal = false
    this.showBtn = false
    for (let i = 0; i < this.totalCourse; i++) {
      if (this.lstCourse[i].totalstudent > 0) {
        this.lstCourse[i].show = "show"
        this.courseService.GetStatisticByCourse(this.lstCourse[i].id).subscribe(
          (res) => {
            this.listAvgScore = JSON.parse(res.message) as StudentAvgScore[]
            // console.log(this.listAvgScore)
            console.log(this.listAvgScore.length)
            if (this.listAvgScore.length > 0) {
              for (let i = 0; i < this.listAvgScore.length; i++) {
                // console.log(this.listAvgScore[i].avgscore)
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

              this.lstCourse[i].slxuatsac = this.slxuatsac
              this.lstCourse[i].slgioi = this.slgioi
              this.lstCourse[i].slkha = this.slkha
              this.lstCourse[i].sltrungbinh = this.sltrungbinh
              this.lstCourse[i].slyeu = this.slyeu
              this.lstCourse[i].slkem = this.slkem

              this.lstCourse[i].piechartdata.datasets[0].data.push(this.slxuatsac)
              this.lstCourse[i].piechartdata.datasets[0].data.push(this.slgioi)
              this.lstCourse[i].piechartdata.datasets[0].data.push(this.slkha)
              this.lstCourse[i].piechartdata.datasets[0].data.push(this.sltrungbinh)
              this.lstCourse[i].piechartdata.datasets[0].data.push(this.slyeu)
              this.lstCourse[i].piechartdata.datasets[0].data.push(this.slkem)

              this.slxuatsac = 0
              this.slgioi = 0
              this.slkha = 0
              this.sltrungbinh = 0
              this.slyeu = 0
              this.slkem = 0
            }
            else if (this.listAvgScore.length == 0) {
              this.lstCourse[i].show = "showlittle"
            }
          },
          (error) => { }
        );
      }
      else {
        this.lstCourse[i].show = "notshow"
      }
    }
    console.log(this.lstCourse)
    this.normal1 = true
  }  
}
