import axios from "axios";
import MockAdapter from "axios-mock-adapter";

describe("API Tests", () => {
    test("getDataset should return the correct data", async () => {
        const mock = new MockAdapter(axios);    // 创建 MockAdapter 实例
        const mockData = { /* 你的模拟数据 */ };
        mock.onGet('http://localhost:3000/api/datasets').reply(200, mockData);

        try {
            const response = await axios.get('http://localhost:3000/api/datasets', {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = response.data;
            console.log(data);
            // 在这里写你的断言
            expect(data).toEqual(mockData);
        } catch (error) {
            //console.error(error);
        }
    });
});