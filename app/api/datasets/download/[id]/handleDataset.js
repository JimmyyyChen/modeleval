export function handleDataset(dataset) {
    let content = "";
    if (dataset.questionType == 0) {
        content += "question,choices,correctAnswer\n";
        for (let i = 0; i < dataset.ChoiceQuestions.length; i++) {
            dataset.ChoiceQuestions[i].question = dataset.ChoiceQuestions[i].question.replace(/"/g, '""');
            content += ("\"" + dataset.ChoiceQuestions[i].question + "\",\"[ ");
            for (let j = 0; j < dataset.ChoiceQuestions[i].choices.length; j++) {
                dataset.ChoiceQuestions[i].choices[j].content = dataset.ChoiceQuestions[i].choices[j].content.replace(/"/g, '""');
                content += ("\"\"" + dataset.ChoiceQuestions[i].choices[j].content + "\"\"");
                if (j != dataset.ChoiceQuestions[i].choices.length - 1) {
                    content += ", ";
                }
                else content += " ]\"";
            }
            content += ",";
            content += dataset.ChoiceQuestions[i].correctAnswer + ",,,\n";
        }
    }
    else if (dataset.questionType == 1) {
        content += "prompt,answer\n";
        for (let i = 0; i < dataset.ShortAnswerQuestions.length; i++) {
            dataset.ShortAnswerQuestions[i].question = dataset.ShortAnswerQuestions[i].question.replace(/"/g, '""');
            content += ("\"" + dataset.ShortAnswerQuestions[i].question + "\",");
            dataset.ShortAnswerQuestions[i].sampleAnswer = dataset.ShortAnswerQuestions[i].sampleAnswer.replace(/"/g, '""');
            content += dataset.ShortAnswerQuestions[i].sampleAnswer + ",,,\n";
        }
    }
    return content;
}
