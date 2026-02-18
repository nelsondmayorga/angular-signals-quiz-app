import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Question } from './question';
import { QuizData } from '../../services/quiz-data';

describe('Question', () => {
  let component: Question;
  let fixture: ComponentFixture<Question>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Question],
      providers: [{
        provide: QuizData,
        useValue: {
          currentQuestion: () => ({question: 'Mock question'}),
          currentQuestionAnswers: () => ['A', 'B', 'C', 'D'],
          answerSelected: () => {}
        }
      }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Question);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
