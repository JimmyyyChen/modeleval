describe("Signed out", () => {
  // beforeEach(() => {
  //   cy.signOut();
  // });

  it("should navigate to the ssr page in a signed out state", () => {
    // open dashboard page
    cy.visit("/", {
      failOnStatusCode: false,
    });

    // check h1 says signed in
    cy.get("a").contains("登录");
    cy.get("a").contains("注册");
    // there should not be a element with classname cl-userButton-root
    cy.get(".cl-userButton-root").should("not.exist");
  });
});

describe("Signed in", () => {
  beforeEach(() => {
    cy.session("signed-in", () => {
      cy.signIn();
    });
  });

  it("should navigate to the ssr page in a signed in state", () => {
    // open dashboard page
    cy.visit("/", {
      failOnStatusCode: false,
    });

    cy.get("a").contains("新建测试");
    // there should be a element with classname cl-userButton-root
    cy.get(".cl-userButton-root");
  });
});
