# API-MODEL

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