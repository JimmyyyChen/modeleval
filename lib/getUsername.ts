const { Clerk } = require('@clerk/clerk-sdk-node');
const clerk = new Clerk({
    secretKey: 'sk_test_aifaxODoPybY4i9vTslZtXBlP7xvz4JYpRNWbVyceu',
});
export async function getUsername(userId: string) {
    try {
        const user = await clerk.users.getUser(userId);
        return user.username;
    } catch (error) {
        console.error('Error fetching user info:', error);
        return null;
    }
    //let userId = "user_2YYm4PPqCJvDTh8umSpl6r1N6dZ";
}
export async function getUser(userId: string) {
    try {
        const user = await clerk.users.getUser(userId);
        console.log(user);
        return user;
    } catch (error) {
        console.error('Error fetching user info:', error);
        return null;
    }
    //let userId = "user_2YYm4PPqCJvDTh8umSpl6r1N6dZ";
}