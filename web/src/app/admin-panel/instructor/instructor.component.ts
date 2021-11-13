import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Instructor } from 'src/app/shared/Models/instructor.model';
import { InstructorService } from 'src/app/shared/Services/instructor.service';
import { SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/api';

const lstInstructor: Instructor[] = [];
@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.css'],
  styles: [],
  providers: [MessageService],
})
export class InstructorComponent implements OnInit {
  showMe: boolean = false;
  formData: Instructor = new Instructor();
  lstInstructor: Instructor[];
  statuses: SelectItem[];
  clonedItem: { [s: string]: Instructor } = {};

  constructor(
    private router: Router,
    private instructorService: InstructorService,
    private toastr: ToastrService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getListInstructor();
  }

  getListInstructor() {
    this.instructorService.GetAllInstructor().subscribe(
      (res) => {
        this.lstInstructor = JSON.parse(res.message) as Instructor[];
      },
      (error) => {}
    );
  }

  /*onSubmit() {
    this.instructorService.AddCourse(this.formData).subscribe(
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
      (err) => {}
    );
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
        else{
          delete this.clonedItem[course.id];
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Course is updated',
          });
        }
      },
      (error) => {}
    );
  }

  onDelete(course: Course) {
    this.courseService.DelCourse(course).subscribe(
      (res: any) => {
        if (res.isError == true) {
          this.messageService.add({
            severity: 'error',
            summary: 'error',
            detail: 'Fail to delete course',
          });
        }
        else{
          this.getListCourse();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Course is deleted',
          });
        }
      },
      (error) => {}
    );
  }*/

}
