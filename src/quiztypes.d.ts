interface QuestionInfo {
    questionName: string | null,
    questionNumber: number,
    answer1: string | null,
    answer2: string | null,
    answer3: string | null,
    answer4: string | null,
    correctAnswer: number
}

interface QuizDBSnapshot {
    numQuestions: number,
    questions: QuestionInfo[]
}

type QuizInfo = QuizDBSnapshot | firebase.firestore.DocumentData;