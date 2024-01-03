export function updateAnswer(task, modelId, json, scoreItem) {
    // 如果该模型的该条目还没有被判定过
    if (task.answerjson[modelId]["answers"][json.index]["isCorrect"] == undefined) {
        if (json.judge[modelId] == true) {
            scoreItem.correctCount += 1;
            task.answerjson[modelId]["answers"][json.index]["isCorrect"] = true;
        }
        else {
            task.answerjson[modelId]["answers"][json.index]["isCorrect"] = false;
        }
        scoreItem.progress += 1;
    }


    // 若已经判定过，需要修改
    else if (task.answerjson[modelId]["answers"][json.index]["isCorrect"] == true) {
        if (json.judge[modelId] == false) {
            scoreItem.correctCount -= 1;
            task.answerjson[modelId]["answers"][json.index]["isCorrect"] = false;
        }
    }
    else if (task.answerjson[modelId]["answers"][json.index]["isCorrect"] == false) {
        if (json.judge[modelId] == true) {
            scoreItem.correctCount += 1;
            task.answerjson[modelId]["answers"][json.index]["isCorrect"] = true;
        }
    }
}
