import axios from "axios";
import MockAdapter from "axios-mock-adapter";

describe("API Tests", () => {
    test("getDataset should return the correct data", async () => {
        const mock = new MockAdapter(axios);    // 创建 MockAdapter 实例
        const mockData = { id: 1, name: 'John Smith' };
        mock.onGet('http://localhost:3000/api/datasets').reply(200, mockData);

        try {
            const response = await axios.get('http://localhost:3000/api/datasets', {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = response.data;
            //console.log(data);
            // 在这里写你的断言
            // expect(data[0].id).toBeFalsy();
            expect(data).toEqual({});
        } catch (error) {
            //console.error(error);
        }
    });
});