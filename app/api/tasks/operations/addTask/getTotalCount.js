export function getTotalCount(dataset, totalCount) {
    if (dataset.questionType == 0) {
        totalCount = dataset.ChoiceQuestions.length;
    }
    else {
        totalCount = dataset.ShortAnswerQuestions.length;
    }
    return totalCount;
}
