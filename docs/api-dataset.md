# API-DATASET

## 数据集部分

### 上传新数据集 `POST /api/datasets/upload`

**Request Body:**

- 一个值为 `file`类型的键值对,键名随意.传递过程不含其他参数.前端样例可以查看 `upload_dataset_demo`文件夹.
- 目前仅允许上传csv文件,并做如下要求:

  - 客观数据集的csv第一行应该包含:
    - `question`:这一列的数据应满足:一个字符串,表示题目内容
    - `choices`:这一列的数据应满足:一个列表,以[]包裹,每一项之间需用空格隔开,每一个选项都是一个单独的字符串,例如 `[ "AAA", "BBB", "CCC", "DDD" ]`
    - `answer`:这一列的数据应满足:一个字符串,表示正确答案
  - 主观数据集的csv第一行应该包含:
    - `prompt`:这一列的数据应满足:一个字符串,表示题目内容
    - `answer`:这一列的数据应满足:一个字符串,表示样例答案,这一项可以为空.
- 目前,csv文件可以包含其他任意的列,但是请保证每一个单元格内 `不出现换行符`,csv-parser会因此而解析错误.除此之外,目前csv文件仅支持英文与数字.(TODO).
- 如果csv文件内含有中文,请使用文本编辑器打开,以 `UTF-8`编码另存一份,以此文件上传.
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

- 成功 (`200`): 返回数据集对象的信息：
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
  - `userId` (userId): 数据集的作者auth
  - `username` (String): 数据集的作者用户名
- 失败 (`500`): 返回错误信息。

## 获取所有数据集信息 `GET /api/datasets`

**Request Body**

无

**Response:**

- 成功 (`200`): 返回数据集对象的**数组**，每个数据集对象的信息如下：
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
  - `userId` (userId): 数据集的作者auth
  - `username` (String): 数据集的作者用户名
- 失败 (`500`): 返回错误信息。

### 获取个人数据集信息 `GET /api/datasets/user/[userId]`

**Request Body**

- 用户登录后,后端会直接通过 `auth()`函数获取用户信息,因此不需要传递任何参数.如果传递了参数userId,那么会返回对应用户的所有数据集.
- 特别地,如果用户没有登录,那么会返回默认数据集.这些数据集是初始生成的,他们的UserId默认为 `Administrator`.
- 省略此处路由的user/[userId],将返回所有数据集

**Response:**

- 成功 (`200`): 返回数据集对象的信息：
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
  - `username` (String): 数据集的作者用户名
- 失败 (`500`): 返回错误信息。

### 删除数据集 `DELETE api/datasets/delete/[id]`

**Request Body**

- `id` (Int): 数据集id号,前端可以先通过其它接口获取,然后保存下这个号码.

**Response:**

- 成功 (`200`): 返回以下字段：
  - `success` (Boolean): true
- 没有权限 (`403`): 返回以下字段：
  - `success` (Boolean): false
  - `message`(String): "permission denied"
- 没有该数据集 (`404`): 返回以下字段：
  - `success` (Boolean): false
  - `message`(String): "dataset not found"
- 失败 (`500`): 返回错误信息。

### 修改数据集信息(不包含条目) `POST api/datasets/update/[id]`

**Request Body**

- `id` (Int): 数据集id号,前端可以先通过其它接口获取,然后保存下这个号码.
- 除了上述存在于访问路径的信息外,还应该以 `JSON`格式提供以下键值对:
  - `datasetName` (String): 数据集名称(可选,用户没提供就不传)
  - `description`(String): 数据集简介(可选,用户没提供就不传)
  - `label_list` ([String]): 数据集的标签列表(必选,传递的是结果(无论用户是否修改)所有标签名称的列表)

**Response:**

- 成功 (`200`): 表示改动成功：
- 失败 (`404`): 返回数据集不存在等错误信息。
- 失败 (`403`): 返回权限不允许等错误信息。
- 

### 改动条目 `POST api/datasets/update/[id]/questions/[id2]`

**Request Body**

- `id` (string): 数据集的id,获取方式见上
- `id2` (string): 数据集中的题目的id,获取方式见上,如果此项为 `-1`,则表示新增一条题目.
  除以上信息外,其余信息应该由 `JSON`格式提供,包括:

  - `question` (string): 题目内容,如果存在请一定提供此项,用户未更改可以不提供
  - `correctAnswer` (string): 客观题答案内容,用户未更改可以不提供
  - `choices` ([string]): 客观题选项内容,用户未更改可以不提供,若更改需要将改动后的所有选项一并提供
  - `sampleAnswer` (string): 主观题样例答案,用户未更改可以不提供
    **Response:**
- 成功 (`200`): 表示改动成功：
- 失败 (`404`): 返回条目不存在,创建条目信息不完全等错误信息。
- 失败 (`403`): 返回权限不允许等错误信息。
