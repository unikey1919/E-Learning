import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { MessageService } from 'primeng/api';
import { Question, QuestionAnswer, QuestionExcel, QuestionModel } from 'src/app/shared/Models/question';
import { Quiz, QuizModel, QuizModelShowScore } from 'src/app/shared/Models/quiz';
import { ContentService } from 'src/app/shared/Services/content.service';
import { MatRadioModule } from '@angular/material/radio';
import { Result } from 'src/app/shared/Models/result';
import { StudentResult } from 'src/app/shared/Models/student.model';
import * as XLSX from 'xlsx';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { CountdownConfig, CountdownEvent } from 'ngx-countdown';

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
  showMe4: boolean = false;
  countQuestion: number = 0;
  clonedItem: { [s: string]: QuestionModel } = {};
  quizId: number = 0;
  addQuestion: Question = new Question();
  listAnswer: string[] = [];
  question: QuestionAnswer = new QuestionAnswer();
  listQuestion: QuestionAnswer[] = [];
  seconds: number;
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
  listExcel: QuestionExcel[] = [];
  checkFile: boolean;
  today: number = Date.now();
  opened: number;
  due: number;
  checkDate1: boolean
  checkDate2: boolean
  updateQuizShowScore: QuizModelShowScore = new QuizModelShowScore();
  checkShowScore: boolean
  second: number = 100
  config: CountdownConfig = {
    // leftTime: 15,
    // demand: true
  }
  demTimer: number = 0


  constructor(private router: Router,
    private contentService: ContentService,
    private activatedRoute: ActivatedRoute, private modalService: BsModalService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.checkFile = true
    this.seconds = 0;
    this.formData.quizId = this.activatedRoute.snapshot.params.id;
    this.quizId = this.formData.quizId
    this.courseId = this.activatedRoute.snapshot.params.courseId
    this.getQuizBySubject(this.formData.quizId);
    console.log(this.today)
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

  public toggle(event: MatSlideToggleChange) {
    console.log(event.checked);
    this.updateQuizShowScore.quizId = this.quizId
    this.updateQuizShowScore.showScore = event.checked
    this.contentService.UpdateQuizShowScore(this.updateQuizShowScore).subscribe(
      (res: any) => {
        if (res.isError == true) {
          this.messageService.add({
            severity: 'error',
            summary: 'error',
            detail: 'Fail to update quiz',
          });
        }
        else {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Quiz is updated',
          });
        }
      },
      (error) => { }
    );
    // this.useDefault = event.checked;
  }

  chooseFile(evt) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
    reader.onload = (e: any) => {
      /* create workbook */
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });

      /* selected the first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      const data = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
      this.listExcel = XLSX.utils.sheet_to_json(ws);
    };
    this.checkFile = false
  }

  upload() {
    for (let i = 0; i < this.listExcel.length; i++) {
      this.listExcel[i].QuizId = this.quizId
      this.listExcel[i].ImageName = ''
      this.listExcel[i].Qn = this.listExcel[i].Qn.toString()
      this.listExcel[i].Option1 = this.listExcel[i].Option1.toString()
      this.listExcel[i].Option2 = this.listExcel[i].Option2.toString()
      this.listExcel[i].Option3 = this.listExcel[i].Option3.toString()
      this.listExcel[i].Option4 = this.listExcel[i].Option4.toString()
      this.listExcel[i].Answer = this.listExcel[i].Answer.toString()
    }

    // console.log(this.listExcel)
    this.contentService.AddQuestionByExcel(this.listExcel).subscribe(
      (res: any) => {
        if (res.isError == true) {
          this.messageService.add({
            severity: 'error',
            summary: 'error',
            detail: 'Fail to upload file',
          });
        } else {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Nạp file thành công',
          });
          location.reload()
        }
        this.getListQuestionByQuiz(this.quizId);
      },
      (err) => { }
    );
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
          if (this.checkShowScore == true) {
            this.score1 = res[0].score
            this.hide = false
            this.showMe3 = true
            this.showMe4 = false
          }
          else {
            this.showMe2 = false
            this.showMe3 = false
            this.hide = false
            this.showMe4 = true
          }
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
    if (confirm("Are you sure to submit this quiz?")) {
      if (this.checkShowScore == false) {
        this.showMe1 = false
        this.showMe2 = false
        this.hide1 = false
        this.showMe4 = true
      }
      else {
        this.showMe1 = false
        this.showMe2 = true
        this.hide1 = false
      }
      this.listCheck = listFinish
      // console.log(this.listCheck)

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
  }

  finish1(listFinish: QuestionAnswer[]) {
    if (this.checkShowScore == false) {
      this.showMe1 = false
      this.showMe2 = false
      this.hide1 = false
      this.showMe4 = true
    }
    else {
      this.showMe1 = false
      this.showMe2 = true
      this.hide1 = false
    }
    this.listCheck = listFinish
    // console.log(this.listCheck)

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

  //Xử lý khi hết giờ
  onTimerFinished(e: CountdownEvent, listFinish: QuestionAnswer[]) {
    console.log(e)
    if (e.action == 'done') {
      this.demTimer = this.demTimer + 1
    }
    if (this.demTimer == 2){
      console.log("hết giờ")
      this.finish1(listFinish)
    }
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
        this.checkShowScore = this.formData.showScore
        this.config  = {
          leftTime: this.formData.time,
          demand: true
        }
        console.log(this.config)
        // console.log(this.checkShowScore)

        // chuyển ngày opened thành number
        this.opened = Date.parse(this.formData.opened.toString())

        // chuyển ngày due thành number
        this.due = Date.parse(this.formData.due.toString())

        this.compareTwoDate()
      },
      (error) => { }
    )

  }

  compareTwoDate() {
    if (this.due < this.today) {
      this.checkDate1 = false
      this.checkDate2 = true
      this.hide = false
    }
    else {
      this.checkDate1 = true
      this.checkDate2 = false
    }
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


