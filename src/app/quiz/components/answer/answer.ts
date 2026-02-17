import { Component, computed, inject, input,  } from '@angular/core';
import { QuizData } from '../../services/quiz-data';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-answer',
  imports: [NgClass],
  templateUrl: './answer.html',
  styleUrl: './answer.css',
})
export class Answer {
  text = input.required<string>();
  index = input.required<number>();

  correctAnswer = computed(() => !!this.quizService.answerSelected() && this.text() === this.quizService.currentQuestion().correctAnswer);
  wrongAnswer = computed(() => this.quizService.answerSelected() === this.text() && this.text() !== this.quizService.currentQuestion().correctAnswer);
  letterMapping = ['A', 'B', 'C', 'D'];

  quizService = inject(QuizData);
  
}
