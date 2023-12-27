const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// TODO: 添加 label_list 和描述
async function main() {
  const example_labels = [
    { labelName: "文字生成" },
    { labelName: "支持中文" },
    { labelName: "支持英文" },
    { labelName: "支持日文" },
  ];
  const example_labels2 = [
    { labelName: "文字生成" },
    { labelName: "支持中文" },
    { labelName: "支持英文" },
    { labelName: "支持德文" },
    { labelName: "医疗" },
  ];

  const example_labels3 = [
    { labelName: "文字生成" },
    { labelName: "支持中文" },
    { labelName: "支持英文" },
    { labelName: "金融" },
  ];

  

  const model_mistral_7b = await prisma.model.upsert({
    where: { modelName: "mistral_7b" },
    update: {},
    create: {
      modelName: "mistral_7b",
      description:
        "Mistral-7B-v0.1大型语言模型(LLM)是一种具有70亿个参数的预训练生成文本模型。Mistral-7B-v0.1在我们测试的所有基准测试中都优于Llama213b。",
      label_list: {
        create: example_labels,
      },
      Introduction:
        "Mistral-7B大型语言模型（LLM）是一种预训练的生成性稀疏专家混合体。在我们测试的大多数基准上，Mistral-7B的表现超过了Llama270B。",
      Usage: `文本生成：可以用于生成文章、故事、对话或任何其他文本内容。用户提供一个主题或开头，模型能基于其训练数据生成连贯且相关的文本。
      问答系统：可应用于自动回答问题，提供信息查询、客户支持等服务。用户问问题，Mixtral-8x7B根据其知识库生成答案。
      文本摘要：用于将长篇文章或文档压缩成关键点或摘要，帮助用户快速理解内容的主要信息。`,
      AdditionalInformation: `模型架构：Mixtral-8x7B是基于稀疏专家混合体（Sparse Mixture of Experts, MoE）的架构。这意味着它不仅利用了传统的深度学习技术，还整合了多个“专家”网络，每个都专门处理不同类型的信息。这种结构使得模型在处理复杂任务时更加高效和灵活。
      训练数据：了解模型是基于什么样的数据训练的非常重要。通常，这样的模型会使用大量的文本数据，包括书籍、文章、网站等。数据的多样性、时效性和质量直接影响模型的表现和适用范围。`,
    },
  });
  const qwen_7b_chat = await prisma.model.upsert({
    where: { modelName: "qwen_7b_chat" },
    update: {},
    create: {
      modelName: "qwen_7b_chat",
      description:
        "通义千问-7B（Qwen-7B）是阿里云研发的通义千问大模型系列的70亿参数规模的模型。Qwen-7B是基于Transformer的大语言模型, 在超大规模的预训练数据上进行训练得到。",
      label_list: {
        create: example_labels,
      },
    },
    Introduction: "qwen_7b_chat是一个基于先进自然语言处理技术的7亿参数的聊天机器人模型。它旨在理解和生成人类般的自然语言，提供流畅且贴近人类对话的体验。通过大规模数据训练，qwen_7b_chat能够进行复杂的对话，捕捉语境含义，并在多种话题上提供有见地的回答。",
    Usage: `实时聊天：qwen_7b_chat可以集成到聊天平台，提供即时的客服支持，解答用户咨询。
情感分析：利用其理解复杂语言的能力，分析用户情绪和意图，为市场研究或品牌监测提供数据。
教育辅导：在教育领域，可以用作学习助手，提供定制化的解释和练习。
内容创作：帮助用户生成文章、故事或任何文本内容，激发创意思维。
多语言交流：具备跨语言对话的能力，可以作为语言学习的工具或多语言服务平台。`,
    AdditionalInformation: `模型架构：qwen_7b_chat可能采用了像Transformer这样的现代神经网络架构，优化了长距离依赖和上下文理解。
训练和数据：详细了解其训练过程、使用的数据集种类和质量，有助于评估模型的可靠性和适用范围。
性能基准：研究其在各种语言任务上的表现，如对话生成、情感分析和语言理解。
实施要求：运行这样的模型可能需要相对较高的计算资源。了解硬件要求和优化技巧是必要的。`,
  });
  const vicuna_7b = await prisma.model.upsert({
    where: { modelName: "vicuna_7b" },
    update: {},
    create: {
      modelName: "vicuna_7b",
      description:
        "Vicuna is a chat assistant trained by fine-tuning Llama 2 on user-shared conversations collected from ShareGPT.",
      label_list: {
        create: example_labels,
      },
    },
    Introduction: "vicuna_7b是一个具有7亿参数的高效自然语言处理模型，旨在提供深入的文本分析和理解能力。它专注于提高语言理解的准确性和生成高质量的文本回应。",
    Usage: `文本生成：用于创作故事、文章或对话。
数据分析：进行情感分析和主题分类。
自动回答：作为问答系统回答用户查询。`,
    AdditionalInformation: `性能：优化了理解和回应复杂查询的能力。
训练数据：使用广泛的文本数据集进行训练，以理解多样的话题。`,
  });
  const zephyr_7b = await prisma.model.upsert({
    where: { modelName: "zephyr_7b" },
    update: {},
    create: {
      modelName: "zephyr_7b",
      description:
        "Zephyr is a series of language models that are trained to act as helpful assistants. ",
      label_list: {
        create: example_labels,
      },
    },
    Introduction: "zephyr_7b是一个7亿参数的先进自然语言处理模型，设计用于理解和生成自然语言，提供流畅且精确的对话和文本分析能力。",
    Usage: `对话系统：提供自然且智能的对话回复。
内容总结：快速生成文本摘要和概要。
语言翻译：辅助进行准确的跨语言翻译。`,
    AdditionalInformation: `架构：采用最新的深度学习技术，优化了长文本处理。
训练：使用大规模和多样化的数据集进行细致训练。
适用性：适合教育、商业分析、客户服务等多种应用场景。`,
  });
  const vicuna_13b_v15 = await prisma.model.upsert({
    where: { modelName: "vicuna_13b_v15" },
    update: {},
    create: {
      modelName: "vicuna_13b_v15",
      description:
        "Vicuna is a chat assistant trained by fine-tuning Llama 2 on user-shared conversations collected from ShareGPT.",
      label_list: {
        create: example_labels,
      },
    },
    Introduction:
      "vicuna_13b_v15是一个具有13亿参数的升级版自然语言处理模型。作为vicuna系列的新一代，此版本注重提高语言理解深度、生成质量以及处理更复杂任务的能力。它通过更大的模型尺寸和优化的算法来提供更高效和准确的语言服务。",
    Usage: `高级文本生成：能够产生更丰富、更复杂的文本内容。
深度语言分析：进行更深入的情感分析、文本分类和语义理解。
增强的问答系统：提供更准确、更详细的答案和解释。`,
    AdditionalInformation: `架构升级：采用改进的神经网络架构，提高处理速度和效率。
扩展训练数据：使用更广泛和多样化的数据集，提高模型的通用性和准确性。
多领域适用性：适用于高级研究、商业智能、创意写作等多个领域。`,
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
