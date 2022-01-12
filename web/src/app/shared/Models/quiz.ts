export class Quiz {
    QuizId: number = 0;
    SubjectId: number = 0;
    Title: string = '';
    Time: number = 0;
    Details: string = '';
    Opened: Date = new Date();
    Due: Date =  new Date();
}

export class QuizModel {
    quizId: number = 0;
    subjectId: number = 0;
    title: string = '';
    details: string = '';
    opened: Date = new Date();
    due: Date =  new Date();
    showScore: boolean;
    time: number = 0;
}

export class QuizModelShowScore {
    quizId: number = 0;
    showScore: boolean;
}