import axios from 'axios';

// Define the base URL and API key
const baseURL = "http://111.202.73.146:10510/v1";
const apiKey = "any_non-empty_string";

// Function to get models list
async function getModels() {
    try {
        const response = await axios.get(`${baseURL}/models`);
        return response.data.data;
    } catch (error) {
        console.error(error);
    }
}

// Function to create a completion
async function createCompletion(model, prompt, maxTokens) {
    try {
        const response = await axios.post(`${baseURL}/completions`, {
            model: model.id,
            prompt: prompt,
            max_tokens: maxTokens,
            stop: ["\n\n"]
        }, {
            headers: { 'Authorization': `Bearer ${apiKey}` }
        });
        return response.data.choices[0].text;
    } catch (error) {
        console.error(error);
    }
}

// Function to create a chat completion
async function createChatCompletion(model, maxTokens) {
    try {
        const response = await axios.post(`${baseURL}/chat/completions`, {
            model: model.id,
            messages: [
                { "role": "user", "content": "Hello! What is your name?" }
            ],
            max_tokens: maxTokens
        }, {
            headers: { 'Authorization': `Bearer ${apiKey}` }
        });
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error(error);
    }
}

// Main function to execute the conversions
async function main() {
    const prompt = "Once upon a time";
    const maxTokens = 512;

    const models = await getModels();
    for (const model of models) {
        console.log(`Model: ${model.id}`);
        
        const completionText = await createCompletion(model, prompt, maxTokens);
        console.log(prompt + completionText);

        const chatCompletionText = await createChatCompletion(model, maxTokens);
        console.log(chatCompletionText, "\n");
    }
}

// Run the main function
main();
