enum QuestionType {
  "BinaryQuestion",
  "MultiChoice",
}

export type Step = "intro" | "question" | "question2" | "answer";

export type State = {
  step: Step;
  answerOption?: number;
  answer?: UserAnswer;
};

export type QuestionOptions = {
  id: number;
  option: string;
  isLeft: boolean;
};

export type QuestionDeck = {
  id: number;
  durationMiliseconds: number;
  question: string;
  type: QuestionType;
  questionOptions: QuestionOptions[];
  questionTags: [];
  deckRevealAtDate: string;
};

export type UserAnswer = {
  username: string;
  inputText: string;
  buttonIndex: number;
};
