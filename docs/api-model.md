# API-MODEL

## 模型部分

### 获取模型列表 `GET /api/models`

**Request Body**

- 无

**Response:**

- 成功 (`201`): 返回模型对象的**列表**：

  - `modelId` (number): 模型ID
  - `modelName`(string): 模型的名称
  - `label_list` (string[]): 模型的标签列表
  - `downloadN` (number): 模型的下载次数
  - `description` (string): 模型的说明
  - `starCount` (number): 模型的收藏次数
  - `starUser` ([User]): 收藏该模型的用户列表,含有两个属性userId与username,分别是用户的auth与用户名
  - `contents` (dict): 模型的其他展示信息（#TODO）
- 失败 (`500`): 返回错误信息。

### 获取模型信息 `GET /api/models/info/[modelName]`

**Path Info:**

- `modelName` (string?): 模型的名称,可选参数,不输入则返回所有模型信息

**Request Body**

- 无

**Response:**

- 成功 (`201`): 返回模型对象的信息：

  - `modelId` (number): 模型ID
  - `modelName`(string): 模型的名称
  - `label_list` (string[]): 模型的标签列表
  - `downloadN` (number): 模型的下载次数
  - `description` (string): 模型的说明
  - `starCount` (number): 模型的收藏次数
  - `starUser` ([User]): 收藏该模型的用户列表,含有两个属性userId与username,分别是用户的auth与用户名
  - `contents` (dict): 模型的其他展示信息（#TODO）
- 失败 (`500`): 返回错误信息。

### 收藏模型 `POST /api/models/star/[id]`
  修改当前登录用户对指定模型的收藏状态,1->0,0->1.
  
**Path Info:**

- `id` (Int): 模型的id

**Request Body**

- 无

**Response:**

- 成功 (`200`).
- 失败 (`404`): 找不到数据集或用户。
- 失败 (`500`): 返回错误信息。
