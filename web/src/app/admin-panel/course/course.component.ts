import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Course } from 'src/app/shared/Models/course.model';
import { CourseService } from 'src/app/shared/Services/course.service';
import { SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/api';

const lstCourse: Course[] = [];
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  styles: [],
  providers: [MessageService],
})
export class CourseComponent implements OnInit {
  showMe: boolean = false;
  formData: Course = new Course();
  lstCourse: Course[];
  statuses: SelectItem[];
  clonedItem: { [s: string]: Course } = {};

  constructor(
    private router: Router,
    private courseService: CourseService,
    private toastr: ToastrService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getListCourse();
  }

  getListCourse() {
    this.courseService.GetAllCourse().subscribe(
      (res) => {
        this.lstCourse = JSON.parse(res.message) as Course[];
      },
      (error) => {}
    );
  }

  onSubmit() {
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
  }

}
