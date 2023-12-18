# API-TASK

## 模型测评部分

### 获取当前用户的所有任务 `GET /api/tasks/info/userId/{userId}`

**Request Body:** 无

**Response:**

- 成功 (`201`): 返回userId创建的全部评测对象：
  - `Tasks` (Task[ ]): Task表中所有由userId用户创建的条目组成的json对象
- 失败 (`500`): 返回错误信息。


### 获取指定taskId的任务 `GET /api/tasks/info/taskId/{taskId}`

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
  - `scorejson` (Json): 模型们目前的得分
- 失败 (`500`): 返回错误信息。


### 添加新的评测任务 `POST /api/tasks/operations/addTask`

**Request Body:**

- `userId` (string): 用户ID
- `taskName` (string): 新建测试任务的名称
- `startTime` (Datetime): 测试开始时间
- `questionType` (int): 测试类型，客观评测(0)还是主观评测(1)还是对抗性评测(2) 
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
  - `scoresjson` (Json): 模型们的得分,初始值为空
- 失败 (`500`): 返回错误信息。


### 启动/继续运行一个评测任务 `POST /api/tasks/operations/startTask/{id}`

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
  - `scoresjson` (Json): 模型们的得分
- 失败 (`500`): 返回错误信息。


### (#TODO) 暂停一个评测任务 `POST /api/tasks/operations/pauseTask/{id}` 

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


### 删除评测任务 `DELETE /api/tasks/operations/deleteTask/{id}`

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
  - `scoresjson` (Json): 模型们的得分
- 失败 (`500`): 返回错误信息。


### 添加新的对抗性评测任务 `POST /api/tasks/adversarial/addAd`

**Request Body**

- `userId` (string): 用户ID
- `taskName` (string): 新建测试任务的名称
- `modelIds` (Json): 选择的评测模型Id组成的列表(允许传入多个模型)
- `datasetId` (int): 选择的评测数据集Id

**Response Body**
- 成功 (`201`): 返回新建的对抗性评测任务信息：
  - `id`(int): 对抗性评测任务的ID
  - `userId` (string): 发起测试的用户ID
  - `taskName` (string): 测试任务的名称
  - `startTime` (date): 测试开始时间
  - `endTime` (date, 新创建的测试任务endTime=null): 测试结束时间 
  - `taskJson` (Json, key为模型Id，值为该模型在选取的数据集上的评测任务Id)
- 失败 (`500`): 返回错误信息。


### 开始对抗性评测任务（逐条生成，会自动记录当前进度）`POST /api/tasks/adversarial/startAd/{id}`

**Request Body** 无

**Response Body**
- 成功 (`201`): 返回两个模型在数据集中下一条数据上的输出结果：
  - `answers`: (json) 模型们对单条数据的回答,json的键是模型的Id,值是模型的回答
- 失败 (`500`): 返回错误信息。


### 更新模型的全局得分(仅限客观题和主观题) `POST /api/tasks/scores/updateScore`

**Request Body** 

- `modelIds`(Json): 想要更新的模型Id组成的Json对象（模型Id是Json的值）

**Response Body**
- 成功 (`201`): 返回被更新的模型的全局得分：
  - `ScoreObj`(Json): 模型客观题的全局得分，Json的键是模型Id，Json的值是模型的全局客观得分
  - `ScoreSub`(Json): 模型主观题的全局得分，Json的键是模型Id，Json的值是模型的全局主观题得分
- 失败 (`500`): 返回错误信息。


### 获取某个模型在某个数据集上的最高得分(仅限客观题和主观题) `POST /api/tasks/scores/getHighestScore`

**Request Body** 

- `modelId`(int): 想要获取最高得分的模型Id
- `datasetId`(int): 想要获取最高得分对应的数据集Id

**Response Body**
- 成功 (`201`): 返回所寻找的模型-数据集最高得分：
  - `highestScore`(Float)
- 失败 (`500`): 返回错误信息。


### 获得对抗性评测的得分结果 `POST /api/tasks/scores/adScoreUpdate`

**Request Body** 

- `adId`(int): 对抗性评测的Id
- `adResult`(Json): 截至目前的所有对抗性题目的排名结果
> 例如，有三个模型（Id分别为1，2，3）在两条对抗性数据上进行了评测，第一条数据回答质量排名为：2、3、1.第二条数据回答质量排名为：1、3、2，则传给后端的body应该是：
>
>{
> "0": [2,3,1]
> "1": [1,3,2]
>}

**Response Body**
- 成功 (`201`): 返回该轮对抗性评测中所有模型的相对得分：(键为模型Id,值为相对得分)
  - `adScores`(Json)
- 失败 (`500`): 返回错误信息。 