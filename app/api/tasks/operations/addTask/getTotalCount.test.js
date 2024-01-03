import { getTotalCount } from "./getTotalCount";

describe("getTotalCount Function", () => {
  test("should return the length of ChoiceQuestions when questionType is 0", () => {
    const dataset = {
      questionType: 0,
      ChoiceQuestions: [1, 2, 3, 4, 5],
      ShortAnswerQuestions: [6, 7, 8, 9, 10],
    };
    expect(getTotalCount(dataset)).toBe(5);
  });

  test("should return the length of ShortAnswerQuestions when questionType is not 0", () => {
    const dataset = {
      questionType: 1,
      ChoiceQuestions: [1, 2, 3, 4, 5],
      ShortAnswerQuestions: [6, 7, 8, 9, 10],
    };
    expect(getTotalCount(dataset)).toBe(5);
  });
});