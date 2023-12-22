const OpenAI = require('openai');
const request = require('sync-request');
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

  function getModelAnswerBlock(modelName, question) {
    try {
        const response = request('POST', 'http://111.202.73.146:10510/v1/chat/completions', {
            json: {
                model: modelName,
                messages: [
                    {"role": "user", "content": question},
                ],
                max_tokens: 60,
            },
            headers: {
                'Authorization': `yaonm`
            }
        });

        const body = JSON.parse(response.getBody('utf8'));
        return body.choices[0].message.content;
    } catch (error) {
        console.log(error);
        return error.message;
    }
}

module.exports = getModelAnswer;
module.exports = getModelAnswerBlock;