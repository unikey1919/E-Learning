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

