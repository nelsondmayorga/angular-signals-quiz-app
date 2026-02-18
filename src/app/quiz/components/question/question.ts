import { Component, inject } from '@angular/core';
import { Answer } from "../answer/answer";
import { QuizData } from '../../services/quiz-data';

@Component({
  selector: 'app-question',
  imports: [Answer],
  templateUrl: './question.html',
  styleUrl: './question.css',
})
export class Question {
  quizService = inject(QuizData);
}
