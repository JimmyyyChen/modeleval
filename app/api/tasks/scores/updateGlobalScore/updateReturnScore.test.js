import { updateReturnScoreSub, updateReturnScoreObj } from './updateReturnScore';

describe('updateReturnScoreSub', () => {
    test('should set score to 0 if scoreSubs is empty', () => {
        const ReturnScoreSub = {};
        const modelId = 'testModel1';
        const result = updateReturnScoreSub([], ReturnScoreSub, modelId);
        expect(ReturnScoreSub[modelId]).toBe(0);
        expect(result).toBe(undefined);
    });

    test('should calculate score_sub correctly for valid scoreSubs', () => {
        const ReturnScoreSub = {};
        const modelId = 'testModel2';
        const scoreSubs = [{ correctCount: 8, progress: 10 }, { correctCount: 6, progress: 10 }];
        const expectedScore = (8 + 6) / (10 + 10);
        const result = updateReturnScoreSub(scoreSubs, ReturnScoreSub, modelId);
        expect(ReturnScoreSub[modelId]).toBe(expectedScore);
        expect(result).toBe(expectedScore);
    });
});

describe('updateReturnScoreObj', () => {
    test('should set score to 0 if scoreObjs is empty', () => {
        const ReturnScoreObj = {};
        const modelId = 'testModel3';
        const result = updateReturnScoreObj([], ReturnScoreObj, modelId);
        expect(ReturnScoreObj[modelId]).toBe(0);
        expect(result).toBe(undefined);
    });

    test('should calculate score_obj correctly for valid scoreObjs', () => {
        const ReturnScoreObj = {};
        const modelId = 'testModel4';
        const scoreObjs = [{ correctCount: 5, progress: 10 }, { correctCount: 7, progress: 10 }];
        const expectedScore = (5 + 7) / (10 + 10);
        const result = updateReturnScoreObj(scoreObjs, ReturnScoreObj, modelId);
        expect(ReturnScoreObj[modelId]).toBe(expectedScore);
        expect(result).toBe(expectedScore);
    });
});
