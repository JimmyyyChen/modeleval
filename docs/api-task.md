# API-TASK

## 模型测评部分

### 获取当前的所有任务 `GET /api/testings/info/{userId}`

**Request Body:** 无

**Response:**

- 成功 (`201`): 返回userId创建的全部评测对象：
  - `Tasks` (Task[ ]): Task表中所有由userId用户创建的条目组成的json对象
- 失败 (`500`): 返回错误信息。


### 添加新的评测任务 `POST /api/testings/operations/addTask`

**Request Body:**

- `userId` (string): 用户ID
- `taskName` (string): 新建测试任务的名称
- `startTime` (Datetime): 测试开始时间
- `questionType` (number): 测试类型，客观评测(0)还是主观评测(1), 对抗性评测会有单独的处理API
- `modelIds` (Json): 选择的评测模型Id组成的列表
- `datasetId` (int): 选择的评测数据集Id

**Response:**

- 成功 (`201`): 返回新建的评测任务对象：
  - `id`(number): 测试任务的ID
  - `userId` (string): 发起测试的用户ID
  - `taskName` (string): 测试任务的名称
  - `startTime` (date): 测试开始时间
  - *`endTime` (date, 新创建的测试任务endTime=null): 测试结束时间 
  - `questionType` (string): 测试类型 // 0: ChoiceQuestion, 1: ShortAnswerQuestion
  - `modelIds` (String): 选择的评测模型Id组成的列表 
  // 由于prisma不支持int数组，考虑使用json或者string来实现类似int数组的效果
  - *`models` (Model[]): 测试任务使用的模型列表 
  - `datasetId` (Json): 数据集的ID
  - *`dataset` (Dataset): 测试任务使用的数据集
  - *`state` (int): 任务目前的状态（0: not start, 1: running, 2: paused, 3: finished）
  - *`progress` (float): 任务目前的进度
- 失败 (`500`): 返回错误信息。


### 启动/继续运行一个评测任务 `POST /api/testings/operations/startTask/{id}`

**Request Body:** 无

**Response:**

- 成功 (`201`): 返回删除的评测任务对象信息：
  - `id`(number): 测试任务的ID
  - `userId` (string): 发起测试的用户ID
  - `taskName` (string): 测试任务的名称
  - `startTime` (date): 测试开始时间
  - `endTime` (date, 新创建的测试任务endTime=null): 测试结束时间 
  - `questionType` (string): 测试类型 // 0: ChoiceQuestion, 1: ShortAnswerQuestion
  - `modelIds` (Json): 选择的评测模型Id组成的列表 
  - `models` (Model[]): 测试任务使用的模型列表 
  - `datasetId` (int): 数据集的ID
  - `dataset` (Dataset): 测试任务使用的数据集
  - `state` (int): 任务删除前的状态
  - `progress` (float): 任务目前的进度
- 失败 (`500`): 返回错误信息。


### 暂停一个评测任务 `POST /api/testings/operations/pauseTask/{id}` 

**Request Body:** 无

**Response:**

- 成功 (`201`): 返回删除的评测任务对象信息：
  - `id`(number): 测试任务的ID
  - `userId` (string): 发起测试的用户ID
  - `taskName` (string): 测试任务的名称
  - `startTime` (date): 测试开始时间
  - `endTime` (date, 新创建的测试任务endTime=null): 测试结束时间 
  - `questionType` (string): 测试类型 // 0: ChoiceQuestion, 1: ShortAnswerQuestion
  - `modelIds` (Json): 选择的评测模型Id组成的列表 
  - `models` (Model[]): 测试任务使用的模型列表 
  - `datasetId` (int): 数据集的ID
  - `dataset` (Dataset): 测试任务使用的数据集
  - `state` (int): 任务删除前的状态
  - `progress` (float): 任务目前的进度
- 失败 (`500`): 返回错误信息。


### 删除评测任务 `DELETE /api/testings/operations/deleteTask/{id}`

**Request Body:** 无

**Response:**

- 成功 (`201`): 返回删除的评测任务对象信息：
  - `id`(number): 测试任务的ID
  - `userId` (string): 发起测试的用户ID
  - `taskName` (string): 测试任务的名称
  - `startTime` (date): 测试开始时间
  - `endTime` (date, 新创建的测试任务endTime=null): 测试结束时间 
  - `questionType` (string): 测试类型 // 0: ChoiceQuestion, 1: ShortAnswerQuestion
  - `modelIds` (Json): 选择的评测模型Id组成的列表 
  - `models` (Model[]): 测试任务使用的模型列表 
  - `datasetId` (int): 数据集的ID
  - `dataset` (Dataset): 测试任务使用的数据集
  - `state` (int): 任务删除前的状态
  - `progress` (float): 任务目前的进度
- 失败 (`500`): 返回错误信息。