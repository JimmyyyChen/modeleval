# API-USER

## 用户部分

### 获取用户信息  `GET /api/user/[userId]`

**Path info**

- `userId`:clerk定义的一个用户的auth()

**Request Body**

- 无

**Response:**

- 成功 (`200`): 返回：

  - `username` (string): 用户名称
  - `email` (string): 用户邮箱
  - `organization` (string): 用户公司,默认为Individual
  - `stars`(Int):用户的数据集被收藏的次数
- 用户未找到 (`404`): 返回：

  - `error` (string): User not found
- 失败 (`500`): 返回错误信息。
