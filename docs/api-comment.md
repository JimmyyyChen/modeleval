# API-COMMENT

## Comment的数据结构

- id(int):留言的id
- content(string):留言内容
- commentTime(DateTime):留言时间
- type(int):0表示model,1表示dataset,2表示user,3表示task(TODO:2&&3)
- user(User):留言者的信息,包括userId,username与userImageUrl,分别是用户的auth与用户名与头像链接
- 

## 留言部分

### 上传新留言 `POST /api/comments/upload`

**Request Body:**

- 一个JSON文件,应包括:
- `type`(Int):0表示model,1表示dataset,2表示user,3表示task(TODO:2&&3)
- `id`(Int):对应的id,例如type为0时,表示model的id
- `content`(String):留言内容
- `reply`(Int):可选,指向回复的留言的id,默认为-1

**Response:**

- 成功 (`200`)
- 文本太长(`403`):content长度超过限制,目前限制500字符
- 找不到对象(`404`):指向的model/dataset等不存在
- 失败 (`500`): 系统错误(一般不出现)。

### 获取留言 `GET /api/comments/[type]/[id]`

获取指定对象的所有留言,按时间顺序排列,最新的在前面

**Path Info:**

- `type`(Int):0表示model,1表示dataset,2表示user,3表示task(TODO:2&&3)
- `id`(Int):对应的id,例如type为0时,表示model的id

**Request Body:**

- 无

**Response:**

- 成功 (`200`),返回一个对应对象的所有Comment数组.
- 失败 (`500`): 系统错误(一般不出现)。

### 修改/删除留言 `POST /api/comments/update/[id]`  //暂时弃用,但是该api仍然可用

**Path Info:**

- `id`(Int):留言的id(`与上面的id定义不同!`)

**Request Body:**

- `content`(String):留言内容,为空则删除该留言

**Response:**

- 成功 (`200`)
- 文本太长(`403`):content长度超过限制,目前限制500字符,返回message:`content too long`
- 禁止修改(`403`):不是留言者,返回message:`permission denied`
- 找不到对象(`404`):指向的comment不存在
- 失败 (`500`): 系统错误(一般不出现)。
