export class Enrollment {
    enrollmentid: number = 0;
    id: number = 0;
    studentname: string='';
    email: string='';
    phonenumber: string='';
    userid: string='';
    dateenrollment: Date = new Date();
    datecompletion: Date = new Date();
}

export class AddEnrollment {
    listStudent: number[]=[];
    courseid: number = 0;
    dateenrollment: string='';
    datecompletion: string='';
}
