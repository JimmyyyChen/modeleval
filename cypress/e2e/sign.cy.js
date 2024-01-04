describe("Signed out", () => {
  // beforeEach(() => {
  //   cy.signOut();
  // });

  it("should show login and register buttons in a signed out state", () => {
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

  it("should navigate to sign in page when user trying to access other pages in a signed out state", () => {
    // open dashboard page
    let start;
    cy.visit("/datasets", {
      failOnStatusCode: false,
    }).then(() => {
      start = new Date();
    });

    // check url
    cy.url().should("include", "/sign-in").then(() => {
      const duration = new Date() - start;
      cy.writeFile('testlog.txt', `time for loading sign in page: ${duration}\n`, { flag: 'a+' });
      start = new Date();
    });

    // open dashboard page
    cy.visit("/tasks", {
      failOnStatusCode: false,
    });

    // check url
    cy.url().should("include", "/sign-in");

    // open dashboard page
    cy.visit("/llm", {
      failOnStatusCode: false,
    });

    // check url
    cy.url().should("include", "/sign-in");
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

  it("should navigate to other pages in a signed in state", () => {
    // open dashboard page
    let start;
    cy.visit("/", {
      failOnStatusCode: false,
    }).then(() => {
      start = new Date();
    });
    cy.visit("/datasets", {
      failOnStatusCode: false,
    }).then(() => {
      const duration = new Date() - start;
      cy.writeFile('testlog.txt', `time for loading datasets page: ${duration}\n`, { flag: 'a+' });
      start = new Date();
    });

    // check url
    cy.url().should("include", "/datasets");

    // open dashboard page
    cy.visit("/tasks", {
      failOnStatusCode: false,
    }).then(() => {
      const duration = new Date() - start;
      cy.writeFile('testlog.txt', `time for loading tasks page: ${duration}\n`, { flag: 'a+' });
      start = new Date();
    });

    // check url
    cy.url().should("include", "/tasks");

    // open dashboard page
    cy.visit("/llm", {
      failOnStatusCode: false,
    }).then(() => {
      const duration = new Date() - start;
      cy.writeFile('testlog.txt', `time for loading model page: ${duration}\n`, { flag: 'a+' });
      start = new Date();
    });

    // check url
    cy.url().should("include", "/llm");
  });
});
