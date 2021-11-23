export class CourseContent {
    Id: number = 0;
    CourseId: number = 0;
    SubjectName: string = '';
    Details: string = '';
    LstFile: FileModel[];
}

export class FileModel {
   Id: number = 0;
   SubjectId: number = 0;
   FileName: string = '';
   FileExtension: string = '';
   FilePath: string = '';
   FileType: string = '';
}
