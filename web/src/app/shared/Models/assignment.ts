import * as moment from 'moment';
export class Assignment {
    Id: number = 0;
    SubjectId: number = 0;
    AssignmentName: string = '';
    Details: string = '';
    Opened: Date = new Date();
    Due: Date =  new Date();
}

export class AssignmentModel {
    id: number = 0;
    subjectId: number = 0;
    assignmentName: string = '';
    details: string = '';
    opened: Date = new Date();
    due: Date =  new Date();
}

export class SubmitStatus {
  ticks: number = 0;
  days: number = 0;
  hours: number = 0;
  milliseconds: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  totalDays: number = 0;
  totalHours: number = 0;
  totalMilliseconds: number = 0;
  totalMinutes: number = 0;
  totalSeconds: number = 0;
}

export class FileAssignment {
  id: number = 0;
  assignmentId: number = 0;
  fileName: string = '';
  fileExtension: string = '';
  filePath: string = '';
  fileType: string = '';
  userSubmit: string='';
  submitDate: Date = new Date();
}
export class StudentSubmit {
  id: string = '';
  userName: string = '';
  email: string = '';
  fullName: string = '';
  studentId: number = 0;
  status: number = 0;
  lstAssignmentSubmit: FileAssignment[];
}
