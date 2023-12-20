const OpenAI = require('openai');

// process.env.OPENAI_API_KEY = 'yaonm';

async function getModelAnswer(modelName, question) {
    try {
      const client = new OpenAI({baseURL:"http://111.202.73.146:10510/v1", apiKey: 'yaonm'});
  
      const completionResponse = await client.chat.completions.create({
        model: modelName,
        messages: [
            {"role": "user", "content": question},
        ],
        max_tokens: 50,
      });
  
      const modelAnswer= completionResponse.choices[0].message.content;
      return modelAnswer;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }
 
  module.exports = getModelAnswer;