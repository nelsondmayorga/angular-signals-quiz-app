import { TestBed } from '@angular/core/testing';

import { QuizData } from './quiz-data';

describe('Quiz', () => {
  let service: QuizData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
