import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Student, User } from 'src/app/shared/Models/student.model';
import { StudentService } from 'src/app/shared/Services/student.service';
import { SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';  
import { FormBuilder, FormGroup, FormArray, FormControl,AbstractControl } from '@angular/forms';

const lstStudent: Student[] = [];
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
  styles: [],
  providers: [MessageService],
})
export class StudentComponent implements OnInit {
  allComplete: boolean = false;
  modalRef: BsModalRef; 
  lstStudent: Student[];
  listUser: User[];
  statuses: SelectItem[];
  clonedItem: { [s: string]: Student } = {};
  list1 = new FormArray([]);

  constructor(
    private router: Router,
    private studentService: StudentService,
    private toastr: ToastrService,
    private messageService: MessageService,
    private modalService: BsModalService,
    private fb: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.getListStudent();
    this.getListUser();
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
  }

  modalRef1(){
    this.list1.clear()
    this.modalRef.hide()
  }
  submitForm() {
    if (this.list1.value.length == 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'error',
        detail: 'Vui lòng chọn người dùng cần thêm',
      });
      this.modalRef.hide()
    }
    else {
      console.log(this.list1.value)
      this.studentService.AddStudent(this.list1.value).subscribe(
        (res: any) => {
          if (res.isError == true) {
            this.messageService.add({
              severity: 'error',
              summary: 'error',
              detail: 'Fail to add student',
            });
          } else {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Add success',
            });
          }
          this.list1.clear();
          this.modalRef.hide();
          this.getListStudent();
        },
        (err) => {}
      );
      
    }
    
  }

  openModalWithClass(template: TemplateRef<any>) {  
    this.modalRef = this.modalService.show(  
      template,  
      Object.assign({}, { class: 'gray modal-lg', ignoreBackdropClick: true })  
    );  
  }  

  getListStudent() {
    this.studentService.GetAllStudent1().subscribe(
      (res) => {
        this.lstStudent = JSON.parse(res.message) as Student[];
      },
      (error) => {}
    );
  }

  getListUser() {
    this.studentService.GetListUser().subscribe(
      (res) => {
        this.listUser = JSON.parse(res.message) as User[];
      },
      (error) => {}
    );
  }

  onRowEditInit(student: Student) {
    this.clonedItem[student.id] = { ...student };
  }

  onRowEditCancel(student: Student, index: number) {
    this.lstStudent[index] = this.clonedItem[student.id];
    delete this.clonedItem[student.id];
  }

  onRowEditSave(student: Student) {
    this.studentService.UpdateStudent(student).subscribe(
      (res: any) => {
        if (res.isError == true) {
          this.messageService.add({
            severity: 'error',
            summary: 'error',
            detail: 'Fail to update student',
          });
        }
        else{
          delete this.clonedItem[student.id];
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Student is updated',
          });
        }
      },
      (error) => {}
    );
  }

  onDelete(student: Student) {
    this.studentService.DelStudent(student).subscribe(
      (res: any) => {
        if (res.isError == true) {
          this.messageService.add({
            severity: 'error',
            summary: 'error',
            detail: 'Fail to delete student',
          });
        }
        else{
          this.getListStudent();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Student is deleted',
          });
        }
      },
      (error) => {}
    );
  }
}

