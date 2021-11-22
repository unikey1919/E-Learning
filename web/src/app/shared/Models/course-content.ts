export class CourseContent {
    Id: number = 0;
    CourseId: number = 0;
    SubjectName: string = '';
    Details: string = '';
    LstFile: FileModel[];
}

export class FileModel {
   FileName: string = '';
}
