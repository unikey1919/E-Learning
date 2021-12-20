export class Question {
    QnId: number = 0;
    QuizId: number = 0;
    Qn: string='';
    ImageName: string='';
    Option1: string='';
    Option2: string='';
    Option3: string='';
    Option4: string='';
    Answer: string='';
}

export class QuestionModel {
    qnID: number = 0;
    quizID: number = 0;
    qn: string='';
    imageName: string='';
    option1: string='';
    option2: string='';
    option3: string='';
    option4: string='';
    answer: string='';
}

export class QuestionAnswer {
    stt: number = 0;
    qnid: number = 0;
    quizid: number = 0;
    qn: string='';
    imagename: string='';
    options: string[]=[];
    answer: string='';
    selected: string='';
}

