const { Clerk } = require('@clerk/clerk-sdk-node');
export async function getUsername(userId: string) {
    // 初始化 Clerk
    const clerk = new Clerk({
        secretKey: 'sk_test_aifaxODoPybY4i9vTslZtXBlP7xvz4JYpRNWbVyceu',
    });
    // 获取用户信息
    try {
        const user = await clerk.users.getUser(userId);
        return user.username;
    } catch (error) {
        console.error('Error fetching user info:', error);
        return null;
    }
    //let userId = "user_2YYm4PPqCJvDTh8umSpl6r1N6dZ";
}