import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Instructor, User } from 'src/app/shared/Models/instructor.model';
import { InstructorService } from 'src/app/shared/Services/instructor.service';
import { SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';  
import { FormBuilder, FormGroup, FormArray, FormControl,AbstractControl } from '@angular/forms';

const lstInstructor: Instructor[] = [];
@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.css'],
  styles: [],
  providers: [MessageService],
})
export class InstructorComponent implements OnInit {
  allComplete: boolean = false;
  modalRef: BsModalRef; 
  lstInstructor: Instructor[];
  listUser: User[];
  statuses: SelectItem[];
  clonedItem: { [s: string]: Instructor } = {};
  list1 = new FormArray([]);

  constructor(
    private router: Router,
    private instructorService: InstructorService,
    private toastr: ToastrService,
    private messageService: MessageService,
    private dialog: MatDialog,
    private modalService: BsModalService,
    private fb: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.getListInstructor();
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
      this.instructorService.AddInstructor(this.list1.value).subscribe(
        (res: any) => {
          if (res.isError == true) {
            this.messageService.add({
              severity: 'error',
              summary: 'error',
              detail: 'Fail to add instructor',
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
          this.getListInstructor();
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

  getListInstructor() {
    this.instructorService.GetAllInstructor().subscribe(
      (res) => {
        this.lstInstructor = JSON.parse(res.message) as Instructor[];
      },
      (error) => {}
    );
  }

  getListUser() {
    this.instructorService.GetListUser().subscribe(
      (res) => {
        this.listUser = JSON.parse(res.message) as User[];
      },
      (error) => {}
    );
  }

  onRowEditInit(instructor: Instructor) {
    this.clonedItem[instructor.id] = { ...instructor };
  }

  onRowEditCancel(instructor: Instructor, index: number) {
    this.lstInstructor[index] = this.clonedItem[instructor.id];
    delete this.clonedItem[instructor.id];
  }

  onRowEditSave(instructor: Instructor) {
    this.instructorService.UpdateInstructor(instructor).subscribe(
      (res: any) => {
        if (res.isError == true) {
          this.messageService.add({
            severity: 'error',
            summary: 'error',
            detail: 'Fail to update instructor',
          });
        }
        else{
          delete this.clonedItem[instructor.id];
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Instructor is updated',
          });
        }
      },
      (error) => {}
    );
  }

  onDelete(instructor: Instructor) {
    this.instructorService.DelInstructor(instructor).subscribe(
      (res: any) => {
        if (res.isError == true) {
          this.messageService.add({
            severity: 'error',
            summary: 'error',
            detail: 'Fail to delete instructor',
          });
        }
        else{
          this.getListInstructor();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Instructor is deleted',
          });
        }
      },
      (error) => {}
    );
  }
}

