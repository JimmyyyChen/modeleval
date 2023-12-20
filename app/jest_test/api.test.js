import axios from "axios";

describe("API Tests", () => {
    test("getDataset should return the correct data", async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/datasets', {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = response.data;
            console.log(data);
            // 在这里写你的断言
            expect(data).toEqual(1);
        } catch (error) {
            console.error(error);
        }
    });
});