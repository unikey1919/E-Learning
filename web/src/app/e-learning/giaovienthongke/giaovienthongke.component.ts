import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { MessageService } from 'primeng/api';
import { Enrollment } from 'src/app/shared/Models/enrollment.model';
import { Student, StudentResult } from 'src/app/shared/Models/student.model';
import { ContentService } from 'src/app/shared/Services/content.service';
import { CourseService } from 'src/app/shared/Services/course.service';

@Component({
  selector: 'app-giaovienthongke',
  templateUrl: './giaovienthongke.component.html',
  styleUrls: ['./giaovienthongke.component.css'],
  providers: [MessageService]
})
export class GiaovienthongkeComponent implements OnInit {
  courseId: number = 0;
  listStudentNotDoQuiz: StudentResult[] = []
  listStudentDoQuiz: StudentResult[] = []
  listStudentResult: StudentResult[] = []
  listStudentByCourse: Student[];
  listResult

  constructor(private router: Router,
    private contentService: ContentService,
    private activatedRoute: ActivatedRoute, private modalService: BsModalService,
    private messageService: MessageService,
    private courseService: CourseService) { }

  ngOnInit(): void {
    this.courseId = this.activatedRoute.snapshot.params.courseId
    if (localStorage.getItem('userRole') == "Instructor") {
      this.getListStudentResult()
    }
    this.getStudentByCourse()
  }

  getStudentByCourse() {
    this.courseService.GetStudentByCourse(this.courseId).subscribe(
      (res) => {
        this.listStudentByCourse = JSON.parse(res.message) as Enrollment[];
        console.log(this.listStudentByCourse)
      },
      (error) => { }
    );
    
  }

  getListStudentResult() {
    this.contentService.GetStudentDoQuiz(this.courseId, 1).subscribe(
      (res: any) => {
        this.listStudentDoQuiz = JSON.parse(res.message) as StudentResult[];
        for (let i = 0; i < this.listStudentDoQuiz.length; i++) {
          if (parseFloat(this.listStudentDoQuiz[i].score) >= 5) {
            this.listStudentDoQuiz[i].score = parseFloat(this.listStudentDoQuiz[i].score).toString()
            this.listStudentDoQuiz[i].result = "Đạt"
          }
          else {
            this.listStudentDoQuiz[i].score = parseFloat(this.listStudentDoQuiz[i].score).toString()
            this.listStudentDoQuiz[i].result = "Chưa đạt"
          }
          this.listStudentResult.push(this.listStudentDoQuiz[i])
        }
        console.log(this.listStudentDoQuiz)
      },
      (error) => { }
    );
    this.contentService.GetStudentNotDoQuiz(this.courseId, 1).subscribe(
      (res: any) => {
        this.listStudentNotDoQuiz = JSON.parse(res.message) as StudentResult[];
        for (let i = 0; i < this.listStudentNotDoQuiz.length; i++) {
          this.listStudentNotDoQuiz[i].score = "Chưa làm bài"
          this.listStudentNotDoQuiz[i].result = "Chưa đạt"
          this.listStudentResult.push(this.listStudentNotDoQuiz[i])
        }
        // for (let i = 0; i < this.listStudentNotDoQuiz.length; i++) {
        //   this.listStudentResult.push(this.listStudentNotDoQuiz[i])
        // }
        console.log(this.listStudentNotDoQuiz)
      },
      (error) => { }
    );
    console.log(this.listStudentResult)
  }

}
