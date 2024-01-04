function recoverFrom(task, progress) {
    const modelsLength = Object.keys(task.modelIds).length;
    let datasetLength;
    if (task.dataset.questionType == 0) {
        datasetLength = task.dataset.ChoiceQuestions.length;
    }
    else {
        datasetLength = task.dataset.ShortAnswerQuestions.length;
    }
    const totalLength = modelsLength * datasetLength;
    const currentLength = parseInt(progress * totalLength);
    const currentModelId = currentLength % modelsLength;
    const currentQuestionId = currentLength / modelsLength;
    return [currentModelId, currentQuestionId];
}

module.exports = recoverFrom;
