describe("Testing", () => {
    beforeEach(() => {
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

    it("should available to create new testing", () => {
        // open dashboard page
        cy.get("a").contains("创建新测试").click();
        cy.url().should('include', '/tasks/new-task');
    });
});