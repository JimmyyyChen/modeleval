import OpenAI from "openai"; // Need to install

// process.env.OPENAI_API_KEY = 'yaonm';

export async function getModelAnswer(modelName, question) {
    try {
      const client = new OpenAI({baseURL:"http://111.202.73.146:10510/v1", apiKey: 'yaonm'});
  
      const completionResponse = await client.chat.completions.create({
        model: modelName,
        messages: [
            {"role": "user", "content": question},
        ],
        max_tokens: 20,
      });
  
      const modelAnswer= completionResponse.choices[0].message.content;
  
      return {modelAnswer: modelAnswer};
    } catch (error) {
      console.log(error);
      return {error: error.message};
    }
  }
  