import { XCircleIcon, CheckCircleIcon } from "@heroicons/react/24/solid";

export default function HumanEvalDisplay() {
  return (
    <div className="flex w-full flex-col space-y-5">
      <h1 className=" font-mono text-4xl font-bold text-primary">
        zbench_common 主观测试
      </h1>
      <div>
        <progress
          className="progress h-3 w-full"
          value="70"
          max="100"
        ></progress>
        <p className="text-gray-500">已完成x题, 剩余x题</p>
      </div>

      <div className="space-y-5 rounded-3xl border bg-base-100 p-6">
        <div className="chat chat-end">
          <div className="chat-bubble chat-bubble-primary">谁是蝙蝠侠?</div>
        </div>
        <div className="chat chat-start">
          <div className="chat-bubble chat-bubble-secondary">
            蝙蝠侠（Batman）是一个知名的漫画超级英雄，是DC漫画旗下的角色。他的真实身份是由布鲁斯·韦恩扮演的，是一位富有的商人，他在父母被枪杀后决定致力于消灭城市中的犯罪。蝙蝠侠是一个聪明、勇敢和有策略的超级英雄，以他的高科技装备和不懈的决心闻名于世。
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center space-y-5 ">
        <p className=" text-xl font-bold ">请评估以上回答</p>
        <div className="flex justify-center space-x-10">
          <button className="btn btn-success w-full text-white">
            <CheckCircleIcon className="h-5 w-5" />
            正确
          </button>
          <button className="btn btn-error w-full text-white">
            <XCircleIcon className="h-5 w-5" />
            错误
          </button>
        </div>
      </div>
    </div>
  );
}
