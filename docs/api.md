# API

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

### 

## 数据集部分

### 上传新数据集 `POST /api/myaccount/upload`

**Request Body:** 

- `userId` (string): 用户ID
- `name` (string): 数据集的名称
- `filePath` (string): 数据集在用户机器上的路径
- `label_list` ([string]): 数据集的标签列表
- `type` (number): 主观题(0)还是客观题(1)

**Response:**

- 成功 (`201`): 返回上传的数据集对象的信息：

  - `userId` (string): 用户ID
  - `datasetId`(number): 用户个人数据集的ID
  - `name` (string): 数据集的名称
  - `label_list` ([string]): 数据集的标签列表 
  - `downloadN` (number): 数据集的下载次数
  - `likeN` (number): 数据集的收藏次数
  - `contents` ({'index':{'content':'', 'answer':''}}): 数据集的具体条目内容

- 失败 (`500`): 返回错误信息。


### 获取数据集信息 `GET /api/datasets/info`

**Request Body**

- `name` (string): 数据集的名称

**Response:**

- 成功 (`201`): 返回数据集对象的信息：

  - `userId` (string): 用户ID
  - `datasetId`(number): 用户个人数据集的ID
  - `name` (string): 数据集的名称
  - `label_list` ([`string`]): 数据集的标签列表 
  - `downloadN` (number): 数据集的下载次数
  - `likeN` (number): 数据集的收藏次数
  - `contents` ({'index':{'content':'', 'answer':''}}): 数据集的具体条目内容

- 失败 (`500`): 返回错误信息。


### 删除数据集 `DELETE api/datasets/delete`

**Request Body**

- `name` (string): 数据集的名称

**Response:**

- 成功 (`201`): 返回要删除的数据集对象的信息：

  - `userId` (string): 用户ID
  - `datasetId`(number): 用户个人数据集的ID
  - `name` (string): 数据集的名称
  - `label_list` ([`string`]): 数据集的标签列表 
  - `downloadN` (number): 数据集的下载次数
  - `likeN` (number): 数据集的收藏次数

- 失败 (`500`): 返回错误信息。


### 上传条目 `POST api/datasets/addItems`

**Request Body**

- `userId` (string): 用户ID
- `name` (string): 数据集的名称
- `type` (number): 主观题(0)还是客观题(1)
- `numbers` (number): 要上传的条目数量
- `contents` ({'index':{'content':'', 'answer':''}}): 要上传的条目内容

**Response:**

- 成功 (`201`): 返回成功上传条目后的数据集对象的信息：

  - `userId` (string): 用户ID
  - `datasetId`(number): 用户个人数据集的ID
  - `name` (string): 数据集的名称
  - `label_list` ([`string`]): 数据集的标签列表 
  - `downloadN` (number): 数据集的下载次数
  - `likeN` (number): 数据集的收藏次数
  - `contents` ({'index':{'content':'', 'answer':''}}): 数据集的具体条目内容

- 失败 (`500`): 返回错误信息。


### 改动条目 `PUT api/datasets/changeItems`

**Request Body**

- `userId` (string): 用户ID
- `name` (string): 数据集的名称
- `numbers` (number): 要修改的条目数量
- `indexList` ([`index`]): 要修改的条目的列表
- `contents` ({'index':{'content':'', 'answer':''}}): 要修改的条目在修改后的内容

**Response:**

- 成功 (`201`): 返回成功上传条目后的数据集对象的信息：

  - `userId` (string): 用户ID
  - `datasetId`(number): 用户个人数据集的ID
  - `name` (string): 数据集的名称
  - `label_list` ([`string`]): 数据集的标签列表 
  - `downloadN` (number): 数据集的下载次数
  - `likeN` (number): 数据集的收藏次数
  - `contents` ({'index':{'content':'', 'answer':''}}): 数据集的具体条目内容

- 失败 (`500`): 返回错误信息。


### 删除条目 `DELETE api/datasets/deleteItems`

**Request Body**

- `userId` (string): 用户ID
- `name` (string): 数据集的名称
- `numbers` (number): 要删除的条目数量
- `indexList` ([`index`]): 要删除的条目的列表

**Response:**

- 成功 (`201`): 返回成功上传条目后的数据集对象的信息：

  - `userId` (string): 用户ID
  - `datasetId`(number): 用户个人数据集的ID
  - `name` (string): 数据集的名称
  - `label_list` ([`string`]): 数据集的标签列表 
  - `downloadN` (number): 数据集的下载次数
  - `likeN` (number): 数据集的收藏次数
  - `contents` ({'index':{'content':'', 'answer':''}}): 数据集的具体条目内容

- 失败 (`500`): 返回错误信息。


### 在数据集页面添加新标签 `POST api/datasets/addNewLabel`

**Request Body**

- `userId` (string): 用户ID
- `name` (string): 数据集的名称
- `label_list` ([`string`]): 该数据集要新添加的标签列表

**Response:**

- 成功 (`201`): 返回成功上传条目后的数据集对象的信息：

  - `userId` (string): 用户ID
  - `datasetId`(number): 用户个人数据集的ID
  - `name` (string): 数据集的名称
  - `label_list` ([`string`]): 数据集的标签列表 
  - `downloadN` (number): 数据集的下载次数
  - `likeN` (number): 数据集的收藏次数
  - `contents` ({'index':{'content':'', 'answer':''}}): 数据集的具体条目内容

- 失败 (`500`): 返回错误信息。

## 留言部分

> 留言规定如下格式：
- `placeId` (number): 留言的位置是在数据集页面(0)还是个人页面(1)还是模型页面(2)还是训练页面(3)
- `option` (string): 根据placeId，选择填入的内容
  - `datasetName` (string, 可选): 数据集的名称
  - `modelName` (string, 可选): 模型的名称
  - `personName` (string, 可选): 如果是在个人页面留言，被留言的用户的名字
  - `trainName` (string, 可选): 如果是在训练页面留言，被留言的任务名字
- `userId` (number): 留言用户ID
- `userName` (string): 留言用户名字
- `time` (string): 留言时间
- `content` (string): 留言内容
- `reply` (dict): 回复内容

![MessagesExample](./MessagesExample.png)



### 获取留言信息 `GET api/messages/info`

**Request Body**

- `placeId` (number): 留言的位置是在数据集页面(0)还是个人页面(1)还是模型页面(2)还是训练页面(3)
- `datasetName` (string, 可选): 数据集的名称
- `modelName` (string, 可选): 模型的名称
- `personName` (string, 可选): 如果是在个人页面留言，被留言的用户的名字
- `trainName` (string, 可选): 如果是在训练页面留言，被留言的任务名字

**Response:**

- 成功 (`201`): 返回成功增加留言的信息

  - `messages` (dict): 如上格式的留言信息

- 失败 (`500`): 返回错误信息。


### 新增留言 `POST api/messages/create`

**Request Body**

- `placeId` (number): 留言的位置是在数据集页面(0)还是个人页面(1)还是模型页面(2)还是训练页面(3)
- `datasetName` (string, 可选): 数据集的名称
- `modelName` (string, 可选): 模型的名称
- `personName` (string, 可选): 如果是在个人页面留言，被留言的用户的名字
- `trainName` (string, 可选): 如果是在训练页面留言，被留言的任务名字
- `userId` (number): 用户ID
- `useraName` (string): 用户名称
- `time` (string): 留言时间
- `content` (string): 留言内容

**Response:**

- 成功 (`201`): 返回成功增加留言的信息。

  - `messages` (dict): 如上格式的留言信息

- 失败 (`500`): 返回错误信息。


### 新增留言回复 `POST api/messages/response`

**Request Body**

- `placeId` (number): 的位置是在数据集页面(0)还是个人页面(1)还是模型页面(2)还是训练页面(3)
- `datasetName` (string, 可选): 数据集的名称
- `modelName` (string, 可选): 模型的名称
- `personName` (string, 可选): 如果是在个人页面留言，被留言的用户的名字
- `trainName` (string, 可选): 如果是在训练页面留言，被留言的任务名字
- `messageId` ([number]): 被回复的留言序号（我们默认每个页面上的留言是顺序的，列表是因为回复可能嵌套）
- `userId` (number): 用户ID
- `useraName` (string): 用户名称
- `time` (string): 留言时间
- `content` (string): 留言内容

**Response:**

- 成功 (`201`): 返回成功上传条目后的数据集对象的信息：

  - `messages` (dict): 如上格式的留言信息

- 失败 (`500`): 返回错误信息。


## 模型部分


### 获取模型信息 `GET /api/models/info`

**Request Body**

- `modelName` (string): 模型的名称

**Response:**

- 成功 (`201`): 返回模型对象的信息：

  - `modelId` (number): 模型ID
  - `modelName`(string): 用户个人数据集的ID
  - `label_list` ([`string`]): 模型的标签列表 
  - `downloadN` (number): 模型的下载次数
  - `likeN` (number): 模型的收藏次数
  - `contents` (dict): 模型的其他展示信息（#TODO）

- 失败 (`500`): 返回错误信息。 