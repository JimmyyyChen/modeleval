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
  - `state` (int): 任务目前的状态（0: not start, 1: running, 2: paused, 3: finished）
  - `progress` (float): 任务目前的进度
  - `answerjson` (Json): 该任务下所有模型的回复
  - `scorejson` (Json): 模型们目前的得分
- 失败 (`500`): 返回错误信息。


### 添加新的评测任务 `POST /api/tasks/operations/addTask`

**Request Body:**

- `userId` (string): 用户ID
- `taskName` (string): 新建测试任务的名称
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
  - `state` (int): 任务目前的状态（0: not start, 1: running, 2: paused, 3: finished）
  - `progress` (float): 任务目前的进度
  - `answerjson` (Json): 该任务下所有模型的回复
  - `scoresjson` (Json): 模型们的得分,初始值为空
- 失败 (`500`): 返回错误信息。


### 启动/继续运行一个评测任务 `POST /api/tasks/operations/startTask/{id}`

**Request Body:** 无

**Response:**

- 成功 (`201`): 返回刚刚启动/运行的评测任务对象信息：
  - `symbol`(int): 是否正常启动
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


### 更新模型的全局得分(仅限客观题和主观题) `POST /api/tasks/scores/updateGlobalScore`

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


### 更新一次用户对主观评测的判断 `POST /api/tasks/scores/updateOnceSub`

**Request Body** 

- `id`(int): 主观评测的taskid
- `index`(int): 对第几条数据的判断
- `judge`(Json): 用户认为正确与否
> Json的键为模型Id, 值为模型回答的正确与否 

**Response Body**
- 成功(`201`): 返回当前评测进度
  - `totalCount`(int): 一共有多少道题
  - `progress`(int): 目前已经评测了多少道题
  - `score`(Json, 可能): 主观评测的得分，只在全部评测完成后返回(也就是totalCount-progress=1的下一次调用)
> Json的键为模型Id, 值为模型的主观评测得分

### 更新一次用户对对抗性评测的判断 `POST /api/tasks/scores/updateOnceAd`

**Request Body** 

- `id`(int): 对抗性评测的taskid
- `index`(int): 对第几条数据的判断
- `rank`(List): 用户对模型回答的排名
> 例如，有三个模型（Id分别为1，2，3），第一条数据回答质量排名为：2、3、1，则传给后端的rank应该是：
> [2,3,1]

**Response Body**
- 成功(`201`): 返回当前评测进度
  - `totalCount`(int): 一共有多少道题
  - `progress`(int): 目前已经评测了多少道题
  - `score`(Json, 可能): 对抗性评测的得分，只在全部评测完成后返回(也就是totalCount-progress=1的下一次调用)

