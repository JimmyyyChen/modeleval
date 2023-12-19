const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const model_mistral_7b = await prisma.model.upsert({
    where: { modelName: "mistral_7b" },
    update: {},
    create: {
      modelName: "mistral_7b",
      description:
        "Mistral-7B-v0.1大型语言模型(LLM)是一种具有70亿个参数的预训练生成文本模型。Mistral-7B-v0.1在我们测试的所有基准测试中都优于Llama213b",
    },
  });
  const qwen_7b_chat = await prisma.model.upsert({
    where: { modelName: "qwen_7b_chat" },
    update: {},
    create: {
      modelName: "qwen_7b_chat",
      description:
        "通义千问-7B（Qwen-7B）是阿里云研发的通义千问大模型系列的70亿参数规模的模型。Qwen-7B是基于Transformer的大语言模型, 在超大规模的预训练数据上进行训练得到。",
    },
  });
  const vicuna_7b = await prisma.model.upsert({
    where: { modelName: "vicuna_7b" },
    update: {},
    create: {
      modelName: "vicuna_7b",
      description:
        "Vicuna is a chat assistant trained by fine-tuning Llama 2 on user-shared conversations collected from ShareGPT.",
    },
  });
  const zephyr_7b = await prisma.model.upsert({
    where: { modelName: "zephyr_7b" },
    update: {},
    create: {
      modelName: "zephyr_7b",
      description:
        "Zephyr is a series of language models that are trained to act as helpful assistants. ",
    },
  });

  console.log({ model_mistral_7b, qwen_7b_chat, vicuna_7b, zephyr_7b });
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
