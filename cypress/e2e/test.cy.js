describe("Testing", () => {
    beforeEach(() => {
        cy.visit("/", {
            failOnStatusCode: false,
        });
        cy.session("signed-in", () => {
            cy.signIn();
        });
    });
    it("should show testing page", () => {
        cy.visit("/", {
            failOnStatusCode: false,
        });
        cy.visit("/tasks", {
            failOnStatusCode: false,
        });
        cy.get("a").contains("创建新测试");
        cy.get("h1").contains("我创建的测试");
        cy.get("h1").contains("他人创建的测试");
        //cy.get(".cl-userButton-root").should("not.exist");
    });

    it("should available to create subjective new testing", () => {
        // open dashboard page
        cy.visit("/tasks", {
            failOnStatusCode: false,
        });
        cy.get("a").contains("创建新测试").click();
        cy.url().should('include', '/tasks/new-task');
        cy.contains('333.csv').parents().first().children().first().click();
        cy.contains('主观测试').parents().first().find('input').eq(1).check({ force: true });
        cy.contains('vicuna_7b').parents().first().children().first().click();
        cy.get('button').contains('创建新测试').click();
        cy.url().should('include', '/tasks');
        cy.url().should('not.include', '/tasks/new-task');
    });

    it("should show task after creating", () => {
        cy.visit("/tasks", {
            failOnStatusCode: false,
        });
        cy.contains('等待主观评测', { timeout: 30000 }).should('be.visible');
    });
    it("should be available for evaluating subjective testing", () => {
        cy.visit("/tasks", {
            failOnStatusCode: false,
        });
        cy.contains('主观测试').click();
        cy.url().should('include', '/tasks/');
        cy.contains('等待人工主观评测');
        cy.contains('进行主观评测').parents().first().children().first().click();
        cy.url().should('include', '/tasks/human-evaluation/');
        cy.contains('问题 1').parents().eq(1).children().eq(1).find("button").contains('正确').click();
        cy.contains('问题 2').parents().eq(1).children().eq(2).find("button").contains('正确').click();
        cy.contains('问题 3').parents().eq(1).children().eq(3).find("button").contains('正确').click();
        cy.contains('问题 4').parents().eq(1).children().eq(4).find("button").contains('正确').click();
        cy.contains('问题 5').parents().eq(1).children().eq(5).find("button").contains('正确').click();
        cy.contains('问题 6').parents().eq(1).children().eq(6).find("button").contains('正确').click();
        cy.contains('问题 7').parents().eq(1).children().eq(7).find("button").contains('正确').click();
        cy.contains('问题 8').parents().eq(1).children().eq(8).find("button").contains('正确').click();
        cy.contains('主观测试').parents().first().children().first().click();
        cy.url().should('not.include', '/tasks/human-evaluation/');
        cy.url().should('include', '/tasks/');
        cy.contains('已完成评测').should('be.visible');
    });
    it("should be available for changing subjective testing result", () => {
        cy.visit("/tasks", {
            failOnStatusCode: false,
        });
        cy.contains('主观测试').click();
        cy.contains('修改主观评测').parents().first().children().first().click();
        cy.contains('问题 1').parents().eq(1).children().eq(1).find("button").contains('错误').click();
        cy.contains('问题 2').parents().eq(1).children().eq(2).find("button").contains('错误').click();
        cy.contains('主观测试').parents().first().children().first().click();
        cy.url().should('not.include', '/tasks/human-evaluation/');
        cy.contains('已完成评测, 获得 100.00 分').should('not.exist');
        cy.contains('已完成评测, 获得 75.00 分').should('be.visible');
    });
    it("should correctly show the result of subjective testing and delete it", () => {
        cy.visit("/tasks", {
            failOnStatusCode: false,
        });
        cy.contains('测试完成').should('be.visible');
        cy.get('nav').find('img').first().click();
        cy.contains('75.00').should('exist');
        cy.get('nav').contains('测试').click();
        cy.contains('主观测试').find('button').click();
        cy.contains('主观测试').should('not.exist');
    });
    it("should be available for creating objective testing", () => {
        // open dashboard page
        cy.visit("/tasks", {
            failOnStatusCode: false,
        });
        cy.get("a").contains("创建新测试").click();
        cy.url().should('include', '/tasks/new-task');
        cy.contains('777.csv').parents().first().children().first().click();
        cy.contains('客观测试').parents().first().find('input').eq(0).check({ force: true });
        cy.contains('vicuna_7b').parents().first().children().first().click();
        cy.get('button').contains('创建新测试').click();
        cy.url().should('include', '/tasks');
        cy.url().should('not.include', '/tasks/new-task');
    });
    it("should be available to see the result of objective testing", () => {
        cy.visit("/tasks", {
            failOnStatusCode: false,
        });
        cy.contains('测试完成', { timeout: 30000 }).should('be.visible');
        cy.contains('客观测试').click();
        cy.contains('已完成评测').parent().click();
        cy.contains('是否正确').should('be.visible');
        cy.contains('生成答案').should('be.visible');
    });
    it("should let others see the result of testing", () => {
        cy.visit("/", {
            failOnStatusCode: false,
        });
        cy.session("signed-out", () => {
            cy.signOut();
            cy.signIn2();
        });
        cy.visit("/tasks", {
            failOnStatusCode: false,
        });
        cy.get('h1').contains('他人创建的测试').next().should('contain', '77777.csv');
    });
});