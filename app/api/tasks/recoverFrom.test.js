const recoverFrom = require("./recoverFrom");

describe("recoverFrom Function", () => {
  test("correctly calculates model and question IDs for initial progress", () => {
    const task = {
      modelIds: { 1: "model1", 2: "model2" },
      dataset: {
        questionType: 0,
        ChoiceQuestions: new Array(5), // Mock 5 choice questions
      },
    };
    const progress = 0; // Start
    expect(recoverFrom(task, progress)).toEqual([0, 0]);
  });

  test("correctly calculates model and question IDs for midway progress", () => {
    const task = {
      modelIds: { 1: "model1", 2: "model2" },
      dataset: {
        questionType: 1,
        ShortAnswerQuestions: new Array(10), // Mock 10 short answer questions
      },
    };
    const progress = 0.5; // Midway
    const modelsLength = Object.keys(task.modelIds).length;
    const datasetLength = task.dataset.ShortAnswerQuestions.length;
    const expectedModelId = parseInt(
      (progress * modelsLength * datasetLength) % modelsLength,
    );
    const expectedQuestionId = parseInt(
      (progress * modelsLength * datasetLength) / modelsLength,
    );
    expect(recoverFrom(task, progress)).toEqual([
      expectedModelId,
      expectedQuestionId,
    ]);
  });

  test("handles complete progress", () => {
    const task = {
      modelIds: { 1: "model1", 2: "model2" },
      dataset: {
        questionType: 0,
        ChoiceQuestions: new Array(5), // Mock 5 choice questions
      },
    };
    const progress = 1; // Complete

    const modelsLength = Object.keys(task.modelIds).length;
    const datasetLength = task.dataset.ChoiceQuestions.length;
    const expectedModelId = parseInt(
      (progress * modelsLength * datasetLength) % modelsLength,
    );
    const expectedQuestionId = parseInt(
      (progress * modelsLength * datasetLength) / modelsLength,
    );
    expect(recoverFrom(task, progress)).toEqual([
      expectedModelId,
      expectedQuestionId,
    ]);
  });
});
