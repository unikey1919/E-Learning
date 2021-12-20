import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { MessageService } from 'primeng/api';
import { Question, QuestionAnswer, QuestionModel } from 'src/app/shared/Models/question';
import { Quiz, QuizModel } from 'src/app/shared/Models/quiz';
import { ContentService } from 'src/app/shared/Services/content.service';
import { MatRadioModule } from '@angular/material/radio';
import { Result } from 'src/app/shared/Models/result';
import { StudentResult } from 'src/app/shared/Models/student.model';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})
export class QuizComponent implements OnInit {
  formData: QuizModel = new QuizModel();
  formListQuestion: QuestionModel[] = [];
  Opened: Date = new Date();
  role: string = '';
  showMe: boolean = false;
  showMe1: boolean = false;
  showMe2: boolean = false;
  showMe3: boolean = false;
  countQuestion: number = 0;
  clonedItem: { [s: string]: QuestionModel } = {};
  quizId: number = 0;
  addQuestion: Question = new Question();
  listAnswer: string[] = [];
  question: QuestionAnswer = new QuestionAnswer();
  listQuestion: QuestionAnswer[] = [];
  seconds: number;
  timer;
  hide: boolean = true;
  hide1: boolean = false
  choose: string;
  listSelected: string[] = []
  listCheck: QuestionAnswer[] = []
  score: number
  dem: number
  countCorrectAnswer: number
  result: Result = new Result()
  courseId: number = 0;
  studentId: number = 0;
  checkResult: Result = new Result()
  score1: number = 0;
  showListQuiz: boolean = true
  showListResult: boolean = false
  listStudentNotDoQuiz: StudentResult[] = []
  listStudentDoQuiz: StudentResult[] = []
  listStudentResult: StudentResult[] = []


  constructor(private router: Router,
    private contentService: ContentService,
    private activatedRoute: ActivatedRoute, private modalService: BsModalService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.seconds = 0;
    this.formData.quizId = this.activatedRoute.snapshot.params.id;
    this.quizId = this.formData.quizId
    this.courseId = this.activatedRoute.snapshot.params.courseId
    this.getQuizBySubject(this.formData.quizId);
    this.getListQuestionByQuiz(this.formData.quizId)
    this.getCountQuestion(this.formData.quizId)
    // console.log(localStorage)
    if (localStorage.getItem('userRole') == "Student") {
      this.getStudentId(localStorage.getItem('username'))
    }
    else {
      this.getListStudentResult()
    }

    console.log(this.courseId)
    this.addQuestion.QuizId = this.quizId
    localStorage.getItem('userRole') == "Instructor" ? this.role = "instructor" : this.role = "student";
  }

  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userRole');
    this.router.navigate(['/user/login']);
  }

  getListStudentResult() {
    this.contentService.GetStudentDoQuiz(this.courseId, this.quizId).subscribe(
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
    this.contentService.GetStudentNotDoQuiz(this.courseId, this.quizId).subscribe(
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

  checkResultExist() {
    this.contentService.GetResult(this.checkResult.QuizId, this.checkResult.CourseId, this.checkResult.StudentId).subscribe(
      (res: any) => {
        console.log(res)
        if (res.length == 0) {
          console.log("Bắt đầu làm bài được")
        }
        else {
          this.score1 = res[0].score
          this.hide = false
          this.showMe3 = true
        }
      },
      (error) => { }
    )
  }

  getStudentId(username: string | null) {
    this.contentService.GetStudentId(username).subscribe(
      (res: any) => {
        // console.log(res)
        // console.log(JSON.parse(res.message)[0].Id)
        this.studentId = JSON.parse(res.message)[0].Id;
        this.checkResult.QuizId = this.quizId
        this.checkResult.CourseId = this.courseId
        this.checkResult.StudentId = this.studentId
        this.checkResultExist()
      },
      (error) => { }
    )

  }

  finish(listFinish: QuestionAnswer[]) {
    this.listCheck = listFinish
    // console.log(this.listCheck)
    this.showMe1 = false
    this.showMe2 = true
    this.hide1 = false
    for (let i = 0; i < this.countQuestion; i++) {
      this.listSelected.push(this.listCheck[i].selected)
      // console.log(listFinish[i].answer)
    }
    this.countCorrectAnswer = 0
    this.dem = 0
    for (let i = 0; i < this.countQuestion; i++) {
      if (this.listSelected[i] == this.listAnswer[i]) {
        this.dem = this.dem + 1
      }
    }
    this.score = Math.round((this.dem * 10) / this.countQuestion * 100) / 100
    this.countCorrectAnswer = this.dem
    console.log(this.listAnswer)
    console.log(this.listSelected)

    this.result.QuizId = this.quizId
    this.result.Score = this.score
    this.result.CourseId = this.courseId
    this.result.StudentId = this.studentId
    console.log(this.result)

    this.contentService.AddResult(this.result).subscribe(
      (res: any) => {
        if (res.isError == true) {
          this.messageService.add({
            severity: 'error',
            summary: 'error',
            detail: 'Fail to add result',
          });
        } else {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Add success',
          });
        }
      },
      (err) => { }
    );
  }


  start() {
    this.showMe1 = true
    this.hide = false;
    this.hide1 = true;
    // console.log(localStorage.getItem('username'))
  }


  startTimer() {
    this.timer = setInterval(() => {
      this.seconds++;
    }, 1000)
  }

  showAddQuestion() {
    this.showListQuiz = true
    // console.log(this.showListQuiz)
    this.showMe = !this.showMe;
    this.showListResult = false
  }

  ShowListResult() {
    this.showListQuiz = false
    this.showMe = false
    this.showListResult = true
  }

  getQuizBySubject(id: number) {
    this.contentService.GetQuizBySubject(id).subscribe(
      (res) => {
        this.formData = res as QuizModel;
        // this.Opened = new Date(this.formData.opened);
        console.log(this.formData);

      },
      (error) => { }
    )

  }

  getListQuestionByQuiz(id: number) {
    this.contentService.GetListQuestionByQuiz(id).subscribe(
      (res) => {
        this.formListQuestion = res as QuestionModel[];
        console.log(this.formListQuestion);
        for (let i = 0; i < this.countQuestion; i++) {
          this.question = new QuestionAnswer();
          this.listAnswer.push(this.formListQuestion[i].answer)
          this.question.qnid = this.formListQuestion[i].qnID
          this.question.quizid = this.formListQuestion[i].quizID
          this.question.qn = this.formListQuestion[i].qn
          this.question.imagename = this.formListQuestion[i].imageName
          this.question.options.push(this.formListQuestion[i].option1)
          this.question.options.push(this.formListQuestion[i].option2)
          this.question.options.push(this.formListQuestion[i].option3)
          this.question.options.push(this.formListQuestion[i].option4)
          this.question.answer = this.formListQuestion[i].answer
          this.question.stt = i + 1
          this.listQuestion.push(this.question)
          // console.log(this.listAnswer)
          // console.log("thiendaica")
        }
        // console.log(this.listQuestion)
      },
      (error) => { }
    )
  }

  getCountQuestion(id: number) {
    this.contentService.GetCountQuestion(id).subscribe(
      (res) => {
        this.countQuestion = res as number;
        // this.Opened = new Date(this.formData.opened);
        // console.log(this.countQuestion);
      },
      (error) => { }
    )
  }

  //Chỉnh sửa và xóa question
  onSubmit() {
    // console.log(this.addQuestion)
    if (this.addQuestion.Qn == "" || this.addQuestion.Option1 == "" || this.addQuestion.Option2 == "" || this.addQuestion.Option3 == "" || this.addQuestion.Option4 == "" || this.addQuestion.Answer.toString() == "") {
      this.messageService.add({
        severity: 'error',
        summary: 'error',
        detail: 'Vui lòng điền đầy đủ',
      });
    }
    else {
      this.contentService.AddQuestion(this.addQuestion).subscribe(
        (res: any) => {
          if (res.isError == true) {
            this.messageService.add({
              severity: 'error',
              summary: 'error',
              detail: 'Fail to create question',
            });
            this.showMe = false
          } else {
            // this.showHide();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Question is created',
            });
            location.reload()
          }
          this.getListQuestionByQuiz(this.quizId);
        },
        (err) => { }
      )
      this.showMe = false
    }
  }

  onRowEditInit(question: QuestionModel) {
    this.clonedItem[question.qnID] = { ...question };
  }

  onRowEditCancel(question: QuestionModel, index: number) {
    this.formListQuestion[index] = this.clonedItem[question.qn];
    delete this.clonedItem[question.qnID];
  }

  onRowEditSave(question: QuestionModel) {
    this.contentService.UpdateQuestion(question).subscribe(
      (res: any) => {
        if (res.isError == true) {
          this.messageService.add({
            severity: 'error',
            summary: 'error',
            detail: 'Fail to update question',
          });
        }
        else {
          delete this.clonedItem[question.qnID];
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Question is updated',
          });
        }
      },
      (error) => { }
    );
  }

  onDelete(question: QuestionModel) {
    if (confirm("Are you sure to delete this question?")) {
      this.contentService.DelQuestion(question).subscribe(
        (res: any) => {
          if (res.isError == true) {
            this.messageService.add({
              severity: 'error',
              summary: 'error',
              detail: 'Fail to delete question',
            });
          }
          else {
            this.getListQuestionByQuiz(this.quizId);
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Question is deleted',
            });
          }
        },
        (error) => { }
      );
      location.reload()
    }
  }
}


