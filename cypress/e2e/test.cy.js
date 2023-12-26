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
        cy.contains('主观测试').parents().eq(1).click();
        cy.url().should('include', '/tasks/');
        cy.contains('等待人工主观评测');
        cy.contains('进行主观评测').parents().first().children().first().click();
        cy.url().should('include', '/tasks/human-evaluation/');
        cy.contains('问题 1').parents().eq(1).children().eq(1).get("button").contains('正确').click();
        cy.contains('问题 2').parents().eq(1).children().eq(2).get("button").contains('正确').click();
        cy.contains('问题 3').parents().eq(1).children().eq(3).get("button").contains('错误').click();
    });
});