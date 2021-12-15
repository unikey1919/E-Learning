export class Forum {
    Id: number = 0;
    SubjectId: number = 0;
    ForumName: string = '';
    Details: string = '';
    CreateDate: Date = new Date();
}
export class ForumModel {
    id: number = 0;
    subjectId: number = 0;
    forumName: string = '';
    details: string = '';
    createDate: Date = new Date();
}
export class Discussion {
    id: number = 0;
    forumId: number = 0;
    discussName: string = '';
    details: string = '';
    createDate: Date = new Date();
}

export class DiscussionModel {
    Id: number = 0;
    ForumId: number = 0;
    DiscussName: string = '';
    Details: string = '';
    CreateDate: Date = new Date();
    UserId: string = '';
    FullName: string = '';
    Email: string = '';
}
