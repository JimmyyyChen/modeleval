import { ChevronRightIcon } from "@heroicons/react/24/solid";

export default function HumanEvalDisplay() {
  return (
    <div className="flex w-full flex-col space-y-5">
      <h1 className=" font-mono text-4xl font-bold text-primary">
        zbench_common 对抗测试
      </h1>
      <div>
        <progress
          className="progress h-3 w-full"
          value="70"
          max="100"
        ></progress>
        <p className="text-gray-500">已完成x题, 剩余x题</p>
      </div>
      <p className=" self-center text-xl  font-bold">请点击选择较好的回答</p>

      <div className="flex flex-col space-y-5 sm:flex-row sm:space-x-5 sm:space-y-0">
        <ChatBox
          question="谁是蝙蝠侠?"
          answer="蝙蝠侠（Batman）是一个知名的漫画超级英雄，是DC漫画旗下的角色。他的真实身份是由布鲁斯·韦恩扮演的，是一位富有的商人，他在父母被枪杀后决定致力于消灭城市中的犯罪。蝙蝠侠是一个聪明、勇敢和有策略的超级英雄，以他的高科技装备和不懈的决心闻名于世。"
        />

        <ChatBox
          question="谁是蝙蝠侠?"
          answer="蝙蝠侠（Batman）是一位虚构的超级英雄，首次出现在美国DC漫画的《侦探漫画#27》（1939年5月）。蝙蝠侠是由艺术家鲍勃·凯恩和作家比尔·芬格创造的。蝙蝠侠的真实身份是布鲁斯·韦恩（Bruce
            Wayne），他是一个富有的企业家、慈善家和继承了庞大家产的亿万富翁。在经历了童年时期亲眼目睹父母被枪杀的悲剧后，他发誓要为正义而战，保护哥谭市（Gotham
            City）的市民免受犯罪分子的侵害。他通过智慧、技巧、武器和先进的技术手段来打击犯罪。虽然蝙蝠侠没有超能力，但他的力量、敏捷、智慧和意志力使他成为了一位出色的超级英雄"
        />
      </div>
      <div className="flex flex-col items-center space-y-5 ">
        <div className="flex justify-center space-x-10">
          <button className="w-ful btn btn-secondary">
            确认
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
function ChatBox({ question, answer }) {
  return (
    <div className="w-full  space-y-5 rounded-3xl border bg-base-100 p-6 hover:ring-4 hover:ring-gray-300">
      <div className="chat chat-end">
        <div className="chat-bubble chat-bubble-primary">{question}</div>
      </div>
      <div className="chat chat-start">
        <div className="chat-bubble chat-bubble-secondary">{answer}</div>
      </div>
    </div>
  );
}
