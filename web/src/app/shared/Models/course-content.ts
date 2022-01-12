import { Assignment } from "./assignment";
import { Forum } from "./forum";
import { Quiz } from "./quiz";

export class CourseContent {
    Id: number = 0;
    CourseId: number = 0;
    SubjectName: string = '';
    Details: string = '';
    LstFile: FileModel[];
    LstAssignment: Assignment[]
    LstForum: Forum[];
    LstVideo: Video[];
    LstQuiz: Quiz[];
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

export class VideoModel {
    id: number = 0;
    subjectId: number = 0;
    youtubeLink: string = '';
    title: string = '';
    tags: string = '';
 }



