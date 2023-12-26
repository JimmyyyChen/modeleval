describe("Testing", () => {
    beforeEach(() => {
        cy.visit("/", {
            failOnStatusCode: false,
        });
        cy.session("signed-in", () => {
            cy.signIn();
        });
    });
    it("should be ok to upload self dataset", () => {
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
});