# API-DATASET

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