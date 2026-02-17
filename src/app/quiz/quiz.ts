import { Component, inject, OnInit } from '@angular/core';
import { Question } from './components/question/question';
import { QuizData } from './services/quiz-data';

@Component({
  selector: 'app-quiz',
  imports: [Question],
  templateUrl: './quiz.html',
  styleUrl: './quiz.css'
})
export class Quiz implements OnInit {
  readonly quizService = inject(QuizData);

  ngOnInit(): void {
    this.getQuestions();
  }

  getQuestions(): void {
    this.quizService.getQuestions().subscribe({
      next: (questions) => {
        this.quizService.questions.set(questions);
        this.quizService.error.set(null);
      },
      error: (error) => {
        console.error(error);
        this.quizService.error.set('Error loading questions');
      }
    });
  }

  restart(): void {
    this.getQuestions();
    this.quizService.restart();

  }
}
