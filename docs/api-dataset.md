# API-DATASET

## 数据集部分

### 上传新数据集 `POST /api/datasets/upload`

**Request Body:**
- 一个值为`file`类型的键值对,键名随意.传递过程不含其他参数.前端样例可以查看`upload_dataset_demo`文件夹.
- 目前仅允许上传csv文件,并做如下要求:
    - 客观数据集的csv第一行应该包含:
      - `question`:这一列的数据应满足:一个字符串,表示题目内容
      - `choices`:这一列的数据应满足:一个列表,以[]包裹,每一项之间需用空格隔开,每一个选项都是一个单独的字符串,例如`[ "AAA", "BBB", "CCC", "DDD" ]`
      - `answer`:这一列的数据应满足:一个字符串,表示正确答案
    - 主观数据集的csv第一行应该包含:
      - `prompt`:这一列的数据应满足:一个字符串,表示题目内容
      - `answer`:这一列的数据应满足:一个字符串,表示样例答案,这一项可以为空.
- 目前,csv文件可以包含其他任意的列,但是请保证每一个单元格内`不出现换行符`,csv-parser会因此而解析错误.(TODO).
**Response:**

- 成功 (`200`): 返回以下字段：
  - `success` (Boolean): true
  - `total_number`(Int): 上传的数据集的总条目数
- 部分成功 (`206`): 返回以下字段：
  - `success` (Boolean): true
  - `total_number`(Int): 上传的数据集的总条目数
  - `wrong_number`(Int): 上传的数据集中格式错误的条目数
  - `wrong_indexes`([Int]): 上传的数据集中格式错误的条目的索引(从1开始)
- 失败 (`500`): 返回错误信息。

### 获取数据集信息 `GET /api/datasets/info/[name]`

**Request Body**

- `name` (string): 数据集的名称

**Response:**

- 成功 (`201`): 返回数据集对象的信息：
  - `id` (Int): 数据集ID
  - `datasetName` (String): 数据集名称
  - `description`(String): 数据集简介
  - `lastUpdate` (DateTime): 最后更新时间
  - `starCount` (Int): 数据集收藏数
  - `downloadCount` (Int): 数据集的下载次数
  - `label_list` ([`Label`]): 数据集的标签列表
  - `questionType` (Boolean): 数据集的题型，客观题(0)还是主观题(1)
  - `ChoiceQuestions` ([`ChoiceQuestion`]): 客观题集合
  - `ShortAnswerQuestions` ([`ShortAnswerQuestion`]): 主观题集合
  - `userId` (userId): 数据集的作者
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
