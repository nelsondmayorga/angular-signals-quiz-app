import { computed, inject, Injectable, signal } from '@angular/core';

import { IQuestion } from '../types/question.interface';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IQuestionResponse } from '../types/questionResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class QuizData {

  url = 'https://opentdb.com/api.php?amount=10&difficulty=easy';
  httpClient = inject(HttpClient);

  questions = signal<IQuestion[]>([]);
  error = signal<string | null>(null);
  currentQuestionIndex = signal<number>(0);
  answerSelected = signal<string | null>(null);
  correctAnswersCount = signal<number>(0);
  currentQuestion = computed(() => this.questions()[this.currentQuestionIndex()]);
  currentQuestionAnswers = computed(() => this.shuffleAnswers(this.currentQuestion()));
  showResults = computed(() => this.currentQuestionIndex() === this.questions().length);
  isCorrectAnswer = computed(() => this.currentQuestion().correctAnswer === this.answerSelected());

  getQuestions(): Observable<IQuestion[]> {
    return this.httpClient.get<{ results: IQuestionResponse[] }>(this.url)
      .pipe(
        map((response) => {
          return this.normalizeQuestions(response.results)
        })
      );
  }

  normalizeQuestions(responseQuestions: IQuestionResponse[]): IQuestion[] {
    return responseQuestions.map((question) => {
      const incorrectAnswers = question.incorrect_answers.map(this.decodeHtmlEntities);
      return {
        question: this.decodeHtmlEntities(question.question),
        correctAnswer: this.decodeHtmlEntities(question.correct_answer),
        incorrectAnswers
      }
    })
  }

  decodeHtmlEntities(str: string) {
    const doc = new DOMParser().parseFromString(str, 'text/html');
    return doc.documentElement.textContent ?? str;
  }

  selectAnswer(answer: string): void {
    this.answerSelected.set(answer);

    if (this.isCorrectAnswer()) {
      this.correctAnswersCount.update((count) => count + 1);
    }
  }

  goToNextQuestion(): void {
    const questionIndex = this.showResults() ? this.currentQuestionIndex() : this.currentQuestionIndex() + 1;
    this.currentQuestionIndex.set(questionIndex);
    this.answerSelected.set(null);
  }

  shuffleAnswers(question: IQuestion): string[] {
    const unshuffleAnswers = [
      question.correctAnswer,
      ...question.incorrectAnswers
    ]

    return unshuffleAnswers
      .map((answer) => ({ sort: Math.random(), value: answer }))
      .sort((a, b) => a.sort - b.sort)
      .map((answer) => answer.value)
  }

  restart(): void {
    this.currentQuestionIndex.set(0);
    this.correctAnswersCount.set(0);
  }

}
