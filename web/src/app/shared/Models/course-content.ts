import { Assignment } from "./assignment";
import { Forum } from "./forum";

export class CourseContent {
    Id: number = 0;
    CourseId: number = 0;
    SubjectName: string = '';
    Details: string = '';
    LstFile: FileModel[];
    LstAssignment: Assignment[]
    LstForum: Forum[];

}

export class FileModel {
   Id: number = 0;
   SubjectId: number = 0;
   FileName: string = '';
   FileExtension: string = '';
   FilePath: string = '';
   FileType: string = '';
}

export class Video {
    Id: number = 0;
    SubjectId: number = 0;
    YoutubeLink: string = '';
    Title: string = '';
    Tags: string = '';
 }




