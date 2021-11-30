import * as moment from 'moment';
export class Assignment {
    Id: number = 0;
    SubjectId: number = 0;
    AssignmentName: string = '';
    Details: string = '';
    Opened: Date = new Date();
    Due: Date =  new Date();
}
