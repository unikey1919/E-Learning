export class Student {
    id: number = 0;
    studentname: string='';
    email: string='';
    phonenumber: string='';
    userid: string='';
}

export class User {
    id: string = '';
    fullname: string='';
    email: string='';
    phonenumber: string='';
}

export class StudentResult {
    id: number = 0;
    studentname: string='';
    score: string='';
    result: string='';
}

export class StudentResults {
    id: number = 0;
    studentname: string='';
    score: string[]= [];
}

export class StudentAvgScore {
   studentid: number = 0;
   avgscore: number = 0;
}
