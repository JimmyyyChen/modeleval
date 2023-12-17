# API-TASK

## 模型测评部分

### 获取当前用户的所有任务 `GET /api/testings/info/userId/{userId}`

**Request Body:** 无

**Response:**

- 成功 (`201`): 返回userId创建的全部评测对象：
  - `Tasks` (Task[ ]): Task表中所有由userId用户创建的条目组成的json对象
- 失败 (`500`): 返回错误信息。


### 获取指定taskId的任务 `GET /api/testings/info/taskId/{taskId}`

**Request Body:** 无

**Response:**

- 成功 (`201`): 返回与TaskId对应的评测任务对象：
  - `id`(int): 测试任务的ID
  - `userId` (string): 发起测试的用户ID
  - `taskName` (string): 测试任务的名称
  - `startTime` (date): 测试开始时间
  - `endTime` (date, 新创建的测试任务endTime=null): 测试结束时间 
  - `questionType` (string): 测试类型 // 0: ChoiceQuestion, 1: ShortAnswerQuestion
  - `modelIds` (Json): 选择的评测模型Id组成的列表 
  - `models` (Model[]): 测试任务使用的模型列表 
  - `datasetId` (Json): 数据集的ID
  - `dataset` (Dataset): 测试任务使用的数据集
  - `answerjson` (Json): 该任务下所有模型的回复
  - `state` (int): 任务目前的状态（0: not start, 1: running, 2: paused, 3: finished）
  - `progress` (float): 任务目前的进度
- 失败 (`500`): 返回错误信息。


### 添加新的评测任务 `POST /api/testings/operations/addTask`

**Request Body:**

- `userId` (string): 用户ID
- `taskName` (string): 新建测试任务的名称
- `startTime` (Datetime): 测试开始时间
- `questionType` (number): 测试类型，客观评测(0)还是主观评测(1)还是对抗性评测(2), 但对抗性评测有单独的API处理
- `modelIds` (Json): 选择的评测模型Id组成的列表
- `datasetId` (int): 选择的评测数据集Id

**Response:**

- 成功 (`201`): 返回新建的评测任务对象：
  - `id`(int): 测试任务的ID
  - `userId` (string): 发起测试的用户ID
  - `taskName` (string): 测试任务的名称
  - `startTime` (date): 测试开始时间
  - `endTime` (date, 新创建的测试任务endTime=null): 测试结束时间 
  - `questionType` (string): 测试类型 // 0: ChoiceQuestion, 1: ShortAnswerQuestion
  - `modelIds` (Json): 选择的评测模型Id组成的列表 
  - `models` (Model[]): 测试任务使用的模型列表 
  - `datasetId` (Json): 数据集的ID
  - `dataset` (Dataset): 测试任务使用的数据集
  - `answerjson` (Json): 该任务下所有模型的回复
  - `state` (int): 任务目前的状态（0: not start, 1: running, 2: paused, 3: finished）
  - `progress` (float): 任务目前的进度
- 失败 (`500`): 返回错误信息。


### 启动/继续运行一个评测任务 `POST /api/testings/operations/startTask/{id}`

**Request Body:** 无

**Response:**

- 成功 (`201`): 返回刚刚启动/运行的评测任务对象信息：
  - `id`(int): 测试任务的ID
  - `userId` (string): 发起测试的用户ID
  - `taskName` (string): 测试任务的名称
  - `startTime` (date): 测试开始时间
  - `endTime` (date, 新创建的测试任务endTime=null): 测试结束时间 
  - `questionType` (string): 测试类型 // 0: ChoiceQuestion, 1: ShortAnswerQuestion
  - `modelIds` (Json): 选择的评测模型Id组成的列表 
  - `models` (Model[]): 测试任务使用的模型列表 
  - `datasetId` (Json): 数据集的ID
  - `dataset` (Dataset): 测试任务使用的数据集
  - `answerjson` (Json): 该任务下所有模型的回复
  - `state` (int): 任务目前的状态（0: not start, 1: running, 2: paused, 3: finished）
  - `progress` (float): 任务目前的进度
- 失败 (`500`): 返回错误信息。


### (#TODO) 暂停一个评测任务 `POST /api/testings/operations/pauseTask/{id}` 

**Request Body:** 无

**Response:**

- 成功 (`201`): 返回暂停的评测任务对象：
  - `id`(int): 测试任务的ID
  - `userId` (string): 发起测试的用户ID
  - `taskName` (string): 测试任务的名称
  - `startTime` (date): 测试开始时间
  - `endTime` (date, 新创建的测试任务endTime=null): 测试结束时间 
  - `questionType` (string): 测试类型 // 0: ChoiceQuestion, 1: ShortAnswerQuestion
  - `modelIds` (Json): 选择的评测模型Id组成的列表 
  - `models` (Model[]): 测试任务使用的模型列表 
  - `datasetId` (Json): 数据集的ID
  - `dataset` (Dataset): 测试任务使用的数据集
  - `answerjson` (Json): 该任务下所有模型的回复
  - `state` (int): 任务目前的状态（0: not start, 1: running, 2: paused, 3: finished）
  - `progress` (float): 任务目前的进度
- 失败 (`500`): 返回错误信息。


### 删除评测任务 `DELETE /api/testings/operations/deleteTask/{id}`

**Request Body:** 无

**Response:**

- 成功 (`201`): 返回删除的评测任务对象：
  - `id`(int): 测试任务的ID
  - `userId` (string): 发起测试的用户ID
  - `taskName` (string): 测试任务的名称
  - `startTime` (date): 测试开始时间
  - `endTime` (date, 新创建的测试任务endTime=null): 测试结束时间 
  - `questionType` (string): 测试类型 // 0: ChoiceQuestion, 1: ShortAnswerQuestion
  - `modelIds` (Json): 选择的评测模型Id组成的列表 
  - `models` (Model[]): 测试任务使用的模型列表 
  - `datasetId` (Json): 数据集的ID
  - `dataset` (Dataset): 测试任务使用的数据集
  - `answerjson` (Json): 该任务下所有模型的回复
  - `state` (int): 任务目前的状态（0: not start, 1: running, 2: paused, 3: finished）
  - `progress` (float): 任务目前的进度
- 失败 (`500`): 返回错误信息。

### 添加新的对抗性评测任务 `POST /api/testings/adversarial/addAd`

**Request Body**

- `userId` (string): 用户ID
- `taskName` (string): 新建测试任务的名称
- `modelIds` (Json): 选择的评测模型Id组成的列表(只允许传入两个模型！否则会返回错误"error: 对抗性评测每次只接受两个模型!")
- `datasetId` (int): 选择的评测数据集Id

**Response Body**
- 成功 (`201`): 返回新建的对抗性评测任务信息：
  - `id`(int): 对抗性评测任务的ID
  - `userId` (string): 发起测试的用户ID
  - `taskName` (string): 测试任务的名称
  - `startTime` (date): 测试开始时间
  - `endTime` (date, 新创建的测试任务endTime=null): 测试结束时间 
  - `taskOneId`: (int)对抗性评测中的第一个模型所属任务
  - `taskTwoId`: (int)对抗性评测中的第二个模型所属任务
- 失败 (`500`): 返回错误信息。


### 开始对抗性评测任务（逐条生成，会自动记录当前进度）`POST /api/testings/adversarial/startAd/{id}`

**Request Body** 无

**Response Body**
- 成功 (`201`): 返回两个模型在数据集中下一条数据上的输出结果：
  - `answers`: (json) 两个模型对单条数据的回答,json的键是模型的Id,值是模型的回答
- 失败 (`500`): 返回错误信息。
