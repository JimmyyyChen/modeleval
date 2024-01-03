const { handleDataset } = require('./handleDataset');

describe('handleDataset Function', () => {
    test('correctly processes ChoiceQuestions', () => {
        const dataset = {
            questionType: 0,
            ChoiceQuestions: [
                {
                    question: 'What is "test"?',
                    choices: [{content: 'Option 1'}, {content: 'Option "2"'}],
                    correctAnswer: 'A'
                }
            ]
        };
        const result = handleDataset(dataset);
        expect(result).toContain('What is ""test""?');
        expect(result).toContain('Option 1');
        expect(result).toContain('Option ""2""');
        expect(result).toContain('A');
    });

    test('correctly processes ShortAnswerQuestions', () => {
        const dataset = {
            questionType: 1,
            ShortAnswerQuestions: [
                {
                    question: 'Define "AI".',
                    sampleAnswer: 'AI stands for "Artificial Intelligence".'
                }
            ]
        };
        const result = handleDataset(dataset);
        expect(result).toContain('Define ""AI"".');
        expect(result).toContain('AI stands for ""Artificial Intelligence"".');
    });

    // Add more tests for different scenarios and edge cases
});
