# API-TASK

## 模型测评部分(TODO)

### 获取当前的所有任务(TODO) `GET /api/test/info`

**Request Body:**

- `userId` (number): 用户ID

**Response:**

- 成功 (`201`): 返回创建的测试数据对象：
  - `id`(number): 测试任务的ID
  - `userId` (string): 发起测试的用户ID
  - `name` (string): 测试任务的名称
  - `sizeInMB` (number): 测试大小，以MB为单位
  - `startTime` (date): 测试开始时间
  - `endTime` (date): 测试结束时间
  - `taskCount` (number): 总任务数量
  - `completedTaskCount` (number): 完成的任务数量
  - `type` (string): 测试类型
- 失败 (`500`): 返回错误信息。

### 添加新的测试数据(TODO) `POST /api/test/addNewTask`

**Request Body:**

- `userId` (number): 用户ID
- `name` (string): 新建测试任务的名称
- `startTime` (date): 测试开始时间
- `taskCount` (number): 总任务数量
- `type` (number): 测试类型，客观评测(0)还是主观评测(1)还是对抗评测(2)
- `modelName` (string): 选择的评测模型
- `datasetName` (string): 选择的评测数据集

**Response:**

- 成功 (`201`): 返回创建的测试数据对象：
  - `id`(number): 测试任务的ID
  - `userId` (string): 发起测试的用户ID
  - `name` (string): 测试任务的名称
  - `sizeInMB` (number): 测试大小，以MB为单位
  - `startTime` (date): 测试开始时间
  - `endTime` (date): 测试结束时间
  - `taskCount` (number): 总任务数量
  - `completedTaskCount` (number): 完成的任务数量
  - `type` (string): 测试类型
- 失败 (`500`): 返回错误信息。

**Example Request:**

```js
axios.post("/api/testings", {
  userId: "user_xxxxxxxxxxxxxxxxxxxxxxxxxxx", // 替换为实际的用户ID
  name: "THIS IS A DEMO TESTING",
  sizeInMB: 30,
  startTime: new Date(),
  endTime: null,
  taskCount: 100,
  completedTaskCount: 99,
  type: "客观评测",
});
```

**Example Response:**

- 成功 (`201`):

```json
{
  "id": 1, // 测试数据ID
  "userId": "user_xxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "name": "THIS IS A DEMO TESTING",
  "sizeInMB": 30,
  "startTime": "2023-01-01T00:00:00.000Z",
  "endTime": null,
  "taskCount": 100,
  "completedTaskCount": 99,
  "type": "客观评测"
}
```

- 失败 (`500`):

```js
{
  "error": "错误信息描述" // 具体错误信息
}
```

### 删除测试数据 `DELETE /api/test/remove/{id}`

**Request Body:** 无

**Response:**

- 成功 (`201`): 返回创建的测试数据对象：
  - `id`(number): 测试数据ID
  - `userId` (string): 用户ID
  - `name` (string): 测试的名称
  - `sizeInMB` (number): 测试大小，以MB为单位
  - `startTime` (date): 测试开始时间
  - `endTime` (date, 可选): 测试结束时间
  - `taskCount` (number): 总任务数量
  - `completedTaskCount` (number): 完成的任务数量
  - `type` (string): 测试类型
- 失败 (`500`): 返回错误信息。

**Example Request:**

```js
axios.delete(`/api/testings/remove/${id}`); // 将 ${id} 替换为实际的测试ID
```

**Example Response:**

- 成功 (`201`):

```json
{
  "id": 1, // 被删除的测试数据ID
  "userId": "user_xxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "name": "THIS IS A DEMO TESTING",
  "sizeInMB": 30,
  "startTime": "2023-01-01T00:00:00.000Z",
  "endTime": null,
  "taskCount": 100,
  "completedTaskCount": 99,
  "type": "客观评测"
}
```

- 失败 (`500`):

```js
{
  "error": "错误信息描述" // 具体错误信息
}
```
