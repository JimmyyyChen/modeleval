# API-USER

## 用户部分

### 获取用户名称  `GET /api/user/[userId]`

**Request Body**

- userId:clerk定义的一个用户的auth()

**Response:**

- 成功 (`200`): 返回：

  - `username` (string): 用户名称
- 用户未找到 (`404`): 返回：

  - `error` (string): User not found
- 失败 (`500`): 返回错误信息。
