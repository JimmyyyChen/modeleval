const { Clerk } = require('@clerk/clerk-sdk-node');
import { NextResponse } from "next/server";
export async function GET() {
    // 初始化 Clerk
    const clerk = new Clerk({
        secretKey: 'sk_test_aifaxODoPybY4i9vTslZtXBlP7xvz4JYpRNWbVyceu',
    });
    // 获取用户信息
    async function getUserInfo(userId) {
        try {
            const user = await clerk.users.getUser(userId);
            console.log(user.privateMetadata.stars);
            return user;
        } catch (error) {
            console.error('Error fetching user info:', error);
            return null;
        }
    }
    // 使用 auth() 获取用户 ID
    //const { userId } = auth(); // 假设这里是你从 auth() 中获取的用户 ID
    // 获取用户信息
    let userId = "user_2YYm4PPqCJvDTh8umSpl6r1N6dZ";
    getUserInfo(userId);
    return new NextResponse(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}
