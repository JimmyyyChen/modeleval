# API-MODEL

## 模型部分

### 获取模型列表 `GET /api/models`

**Request Body**

- None

**Response:**

- 成功 (`201`): 返回模型对象的**列表**：

  - `modelId` (number): 模型ID
  - `modelName`(string): 模型的名称
  - `label_list` (string[]): 模型的标签列表
  - `downloadN` (number): 模型的下载次数
  - `description` (string): 模型的说明
  - `likeN` (number): 模型的收藏次数
  - `contents` (dict): 模型的其他展示信息（#TODO）
- 失败 (`500`): 返回错误信息。

### 获取模型信息 `GET /api/models/info/[modelName]`

**Request Body**

- `modelName` (string?): 模型的名称,可选参数,不输入则返回所有模型信息

**Response:**

- 成功 (`201`): 返回模型对象的信息：

  - `modelId` (number): 模型ID
  - `modelName`(string): 模型的名称
  - `label_list` (string[]): 模型的标签列表
  - `downloadN` (number): 模型的下载次数
  - `description` (string): 模型的说明
  - `likeN` (number): 模型的收藏次数
  - `contents` (dict): 模型的其他展示信息（#TODO）
- 失败 (`500`): 返回错误信息。
