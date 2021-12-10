export class Forum {
    Id: number = 0;
    SubjectId: number = 0;
    ForumName: string = '';
    Details: string = '';
    CreateDate: Date = new Date();
}
export class Discussion {
    Id: number = 0;
    ForumId: number = 0;
    DiscussName: string = '';
    Details: string = '';
    CreateDate: Date = new Date();
}
