import { ChartData } from "chart.js";

export class Course {
    id: number = 0;
    instructorid: number = 0;
    code: string='';
    coursename: string='';
    instructionName: string='';
    description: string='';
    details: string='';
}

export class CourseStatistic {
    id: number = 0;
    instructorid: number = 0;
    code: string='';
    coursename: string='';
    instructionName: string='';
    description: string='';
    details: string='';
    totalstudent: number = 0;
    piechartdata: ChartData<'pie', number[], string | string[]> = {
        labels: ['Xuất sắc', 'Giỏi', 'Khá', 'Trung bình', 'Yếu', 'Kém'],
    datasets: [{
      data: []
    }]
    }
    show: string=''
    slxuatsac = 0;
    slgioi: number = 0;
    slkha: number = 0;
    sltrungbinh: number = 0;
    slyeu: number = 0;
    slkem: number = 0;
}

export class CourseExcel {
    Id: number = 0;
    InstructorId: number = 0;
    Code: string='';
    CourseName: string='';
    Description: string='';
    Details: string='';
}

export class CourseStatisticType {
    slxuatsac = 0;
    slgioi: number = 0;
    slkha: number = 0;
    sltrungbinh: number = 0;
    slyeu: number = 0;
    slkem: number = 0;
}
export class CourseModel {
    id: number = 0;
    instructorId: number = 0;
    code: string='';
    fullName: string='';
    instructionName: string='';
    description: string='';
    details: string='';
}
