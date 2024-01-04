import { updateAnswer } from './updateAnswer';

describe('updateAnswer', () => {
    let task;
    let modelId;
    let json;
    let scoreItem;

    beforeEach(() => {
        task = {
            answerjson: {
                testModel1: {
                    answers: [
                        { isCorrect: undefined },
                        { isCorrect: undefined },
                        { isCorrect: undefined }
                    ]
                }
            }
        };
        modelId = 'testModel1';
        json = {
            index: 1,
            judge: {
                testModel1: true
            }
        };
        scoreItem = {
            correctCount: 0,
            progress: 0
        };
    });

    test('should update scoreItem and task.answerjson when isCorrect is undefined and judge is true', () => {
        updateAnswer(task, modelId, json, scoreItem);
        expect(scoreItem.correctCount).toBe(1);
        expect(task.answerjson[modelId].answers[json.index].isCorrect).toBe(true);
        expect(scoreItem.progress).toBe(1);
    });

    test('should update scoreItem and task.answerjson when isCorrect is undefined and judge is false', () => {
        json.judge[modelId] = false;
        updateAnswer(task, modelId, json, scoreItem);
        expect(scoreItem.correctCount).toBe(0);
        expect(task.answerjson[modelId].answers[json.index].isCorrect).toBe(false);
        expect(scoreItem.progress).toBe(1);
    });

    test('should update scoreItem and task.answerjson when isCorrect is true and judge is false', () => {
        task.answerjson[modelId].answers[json.index].isCorrect = true;
        json.judge[modelId] = false;
        updateAnswer(task, modelId, json, scoreItem);
        expect(scoreItem.correctCount).toBe(-1);
        expect(task.answerjson[modelId].answers[json.index].isCorrect).toBe(false);
    });

    test('should update scoreItem and task.answerjson when isCorrect is false and judge is true', () => {
        task.answerjson[modelId].answers[json.index].isCorrect = false;
        json.judge[modelId] = true;
        updateAnswer(task, modelId, json, scoreItem);
        expect(scoreItem.correctCount).toBe(1);
        expect(task.answerjson[modelId].answers[json.index].isCorrect).toBe(true);
    });
});