export function updateReturnScoreSub(scoreSubs, ReturnScoreSub, modelId, score_sub) {
    if (scoreSubs.length == 0) {
        ReturnScoreSub[modelId] = 0;
    }
    else {
        let correctCount = 0;
        let totalCount = 0;
        for (let j = 0; j < scoreSubs.length; j++) {
            const scoreSub = scoreSubs[j];
            correctCount += scoreSub.correctCount;
            totalCount += scoreSub.progress;
        }
        score_sub = correctCount / totalCount;
        ReturnScoreSub[modelId] = score_sub;
    }
    return score_sub;
}
export function updateReturnScoreObj(scoreObjs, ReturnScoreObj, modelId, score_obj) {
    if (scoreObjs.length == 0) { // 代表该模型没有已经完成的客观题评测
        ReturnScoreObj[modelId] = 0;
    }
    else {
        let correctCount = 0;
        let totalCount = 0;
        for (let j = 0; j < scoreObjs.length; j++) {
            const scoreObj = scoreObjs[j];
            correctCount += scoreObj.correctCount;
            totalCount += scoreObj.progress;
        }
        score_obj = correctCount / totalCount;
        ReturnScoreObj[modelId] = score_obj;
    }
    return score_obj;
}
