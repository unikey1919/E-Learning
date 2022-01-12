import { Component, Input, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Course, CourseExcel } from 'src/app/shared/Models/course.model';
import { CourseService } from 'src/app/shared/Services/course.service';
import { SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { AddEnrollment, Enrollment } from 'src/app/shared/Models/enrollment.model';
import { Student } from 'src/app/shared/Models/student.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as XLSX from 'xlsx';


const lstCourse: Course[] = [];
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  styles: [],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})
export class CourseComponent implements OnInit {
  model1: NgbDateStruct;
  model2: NgbDateStruct;
  showMe: boolean = false;
  formData: Course = new Course();
  courseid: number;
  lstCourse: Course[];
  listCode: string[];
  listStudentByCourse: Student[];
  listStudentNotInCourse: Student[];
  statuses: SelectItem[];
  clonedItem: { [s: string]: Course } = {};
  modalRef: BsModalRef;
  modalReff: BsModalRef;
  list1 = new FormArray([]);
  list2 = new FormArray([]);
  checkList: boolean;
  checkFile: boolean;
  addEnrollment: AddEnrollment = new AddEnrollment();
  listStudent: number[] = [];
  selectedFile: File;
  listExcel: CourseExcel[] = [];
  dem: number = 0;

  config = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: true,
    class: "my-modal"
  };

  constructor(
    private router: Router,
    private courseService: CourseService,
    private toastr: ToastrService,
    private messageService: MessageService,
    private dialog: MatDialog,
    private modalService: BsModalService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getListCourse();
    this.getAllCode()
    this.checkFile = true;
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
      console.log(this.listExcel)
    };
    this.checkFile = false
  }

  upload() {
    // console.log(this.selectedFile.name);
    // console.log(this.selectedFile);
    this.courseService.AddCourseByExcel(this.listExcel).subscribe(
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
        }
        this.getListCourse();
      },
      (err) => { }
    );
  }

  onCheckboxChange(e) {
    if (e.target.checked) {
      this.list1.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      this.list1.controls.forEach((item: AbstractControl) => {
        if (item.value == e.target.value) {
          this.list1.removeAt(i);
          return;
        }
        i++;
      });
    }
    this.checkCheckBox();
  }

  onCheckboxChange1(e) {
    if (e.target.checked) {
      this.list2.push(new FormControl(e.target.value));
      this.listStudent.push(+e.target.value);
    } else {
      let i: number = 0;
      this.list2.controls.forEach((item: AbstractControl) => {
        if (item.value == e.target.value) {
          this.list2.removeAt(i);
          this.listStudent.splice(i, 1)
          return;
        }
        i++;
      });
    }
  }

  modalRef1() {
    this.list1.clear()
    this.modalRef.hide()
  }

  modalRef2() {
    this.listStudent = []
    location.reload()
    this.modalReff.hide()
  }
  submitForm() {
    // console.log(this.list2.value)
    // console.log(this.model1)
    // console.log(this.model2)
    // console.log(this.courseid)
    // console.log(this.listStudent)
    // this.addEnrollment.listStudent = this.list2.value
    // console.log(this.addEnrollment.listStudent)

    this.addEnrollment.listStudent = this.listStudent;
    this.addEnrollment.courseid = this.courseid;
    this.addEnrollment.dateenrollment = String(this.model1.year) + "-" + String(this.model1.month) + "-" + String(this.model1.day)
    this.addEnrollment.datecompletion = String(this.model2.year) + "-" + String(this.model2.month) + "-" + String(this.model2.day)
    console.log(this.listStudent.length)
    if (this.listStudent.length == 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'error',
        detail: 'Vui lòng chọn học sinh cần thêm',
      });
      this.modalReff.hide()
    }
    else {
      this.courseService.AddStudentToCourse(this.addEnrollment).subscribe(
        (res: any) => {
          if (res.isError == true) {
            this.messageService.add({
              severity: 'error',
              summary: 'error',
              detail: 'Fail to add student to course',
            });
          } else {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Add student to course success',
            });
          }
          this.listStudent = [];
          location.reload()
          this.modalReff.hide();
        },
        (err) => { }
      );
    }
  }

  openModalWithClass(template: TemplateRef<any>, courseid: number) {
    this.modalRef = this.modalService.show(template, this.config);
    this.courseid = courseid;
    this.getStudentByCourse();
    this.checkList = true;
  }

  openModalWithClass1(template1: TemplateRef<any>) {
    this.modalReff = this.modalService.show(
      template1,
      Object.assign({}, { class: 'gray modal-lg', ignoreBackdropClick: true })
    );
    this.getStudentNotInCourse();
    this.modalRef.hide();
  }

  checkCheckBox() {
    if (this.list1.value.length == 0) {
      this.checkList = true;
    }
    else this.checkList = false;
  }

  getStudentByCourse() {
    this.courseService.GetStudentByCourse(this.courseid).subscribe(
      (res) => {
        this.listStudentByCourse = JSON.parse(res.message) as Enrollment[];
      },
      (error) => { }
    );
  }

  getStudentNotInCourse() {
    this.courseService.GetStudentNotInCourse(this.courseid).subscribe(
      (res) => {
        this.listStudentNotInCourse = JSON.parse(res.message) as Enrollment[];
      },
      (error) => { }
    );
  }

  onDeleteStudentFromCourse(enrollment: Enrollment) {
    if (confirm("Are you sure to delete this student from the course?")) {
      this.courseService.DeleteStudentFromCourse(enrollment).subscribe(
        (res: any) => {
          if (res.isError == true) {
            this.messageService.add({
              severity: 'error',
              summary: 'error',
              detail: 'Fail to delete student from course',
            });
          }
          else {
            this.getListCourse();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Student is deleted from course',
            });
          }
        },
        (error) => { }
      );
      this.modalRef.hide();
    }
  }

  onDeleteListStudentFromCourse() {
    if (confirm("Are you sure to delete this student list from the course?")) {
      if (this.list1.value.length == 0) {
        this.messageService.add({
          severity: 'error',
          summary: 'error',
          detail: 'Vui lòng chọn học sinh cần xóa',
        });
        this.modalRef.hide()
      }
      else {
        // console.log(this.list1.value)
        this.courseService.DeleteListStudentFromCourse(this.list1.value).subscribe(
          (res: any) => {
            if (res.isError == true) {
              this.messageService.add({
                severity: 'error',
                summary: 'error',
                detail: 'Fail to delete student',
              });
            } else {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Delete success',
              });
            }
            this.list1.clear();
            this.modalRef.hide();
          },
          (err) => { }
        );

      }
    }

  }

  getListCourse() {
    this.courseService.GetAllCourse().subscribe(
      (res) => {
        this.lstCourse = JSON.parse(res.message) as Course[];
      },
      (error) => { }
    );
  }

  getAllCode() {
    this.courseService.GetAllCode().subscribe(
      (res) => {
        this.listCode = JSON.parse(res.message) as string[];
      },
      (error) => { }
    );
  }

  onSubmit() {
    console.log(this.listCode)
    this.dem = 0
    for (let i = 0; i < this.listCode.length; i++) {
      if (this.listCode[i] == this.formData.code) {
        this.dem = this.dem + 1;
      }
    }
    if (this.dem == 0) {
      this.courseService.AddCourse(this.formData).subscribe(
        (res: any) => {
          if (res.isError == true) {
            this.messageService.add({
              severity: 'error',
              summary: 'error',
              detail: 'Fail to create course',
            });
          } else {
            this.showHide();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Course is created',
            });
          }
          this.getListCourse();
        },
        (err) => { }
      );
    }
    else {
      this.messageService.add({
        severity: 'error',
        summary: 'error',
        detail: 'Mã khóa học bị trùng',
      });
    }

  }

  showHide() {
    this.showMe = !this.showMe;
  }

  onRowEditInit(course: Course) {
    this.clonedItem[course.id] = { ...course };
  }

  onRowEditCancel(course: Course, index: number) {
    this.lstCourse[index] = this.clonedItem[course.id];
    delete this.clonedItem[course.id];

  }

  onRowEditSave(course: Course) {
    this.courseService.UpdateCourse(course).subscribe(
      (res: any) => {
        if (res.isError == true) {
          this.messageService.add({
            severity: 'error',
            summary: 'error',
            detail: 'Fail to update course',
          });
        }
        else {
          delete this.clonedItem[course.id];
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Course is updated',
          });
        }
      },
      (error) => { }
    );
  }

  onDelete(course: Course) {
    if (confirm("Are you sure to delete this course?")) {
      this.courseService.DelCourse(course).subscribe(
        (res: any) => {
          if (res.isError == true) {
            this.messageService.add({
              severity: 'error',
              summary: 'error',
              detail: 'Fail to delete course',
            });
          }
          else {
            this.getListCourse();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Course is deleted',
            });
          }
        },
        (error) => { }
      );
    }
  }

}
