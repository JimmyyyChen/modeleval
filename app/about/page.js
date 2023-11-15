// TODO: Add AboutPage and beautify it
export default function AboutPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold">关于 ModelEval</h1>
            <p className="text-lg">ModelEval 是一个用于评估机器学习模型性能的网站。</p>
            <h2 className="text-xl font-bold">我们的使命</h2>
            <p className="text-lg">我们的使命是帮助机器学习从业者更好地评估他们的模型性能，提高模型的准确性和可靠性。</p>
            <h2 className="text-xl font-bold">我们的团队</h2>
            <ul>
                <li className="text-lg">张三 - 前端开发工程师</li>
                <li className="text-lg">李四 - 后端开发工程师</li>
                <li className="text-lg">王五 - 产品经理</li>
            </ul>
            <h2 className="text-xl font-bold">联系我们</h2>
            <p className="text-lg">如果您有任何问题或建议，请发送电子邮件至 contact@modeleval.com。</p>
        </div>
    );
};
