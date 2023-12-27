describe("Testing", () => {
    beforeEach(() => {
        cy.visit("/sign-in", {
            failOnStatusCode: false,
        });
        cy.session("signed-in", () => {
            cy.signIn();
        });
    });
    it("should be ok to update self dataset", () => {
        cy.visit("/profile/self", {
            failOnStatusCode: false,
        });
        cy.contains('我的数据集').should('be.visible');
        cy.contains('77777.csv').parent().click();
        cy.url().should('include', '/datasets/details/');
        cy.get('button[aria-label="Add"]').click();
        cy.wait(500);
        cy.contains("请提交需要新增的条目").should('be.visible');
        cy.get('#question').type('this is a very new question');
        cy.get('#choices').type('["Choice 1", "Choice 2", "Choice 3", "Choice 4"]');
        cy.get('#correct_answer').type('0A');
        cy.get('button.MuiButtonBase-root.MuiButton-root').contains('提交').click();
        cy.on('window:alert', (str) => {
            expect(str).to.equal('条目添加成功！');
        });

        // cy.get('a').contains('上传').click();
        // cy.url().should('include', '/upload');
        // cy.contains('文件上传指南').should('be.visible');
        // cy.fixture('88888.csv', 'binary') // 从 fixtures 文件夹中读取文件
        //     .then(Cypress.Blob.binaryStringToBlob) // 将二进制字符串转换为 Blob
        //     .then(fileContent => {
        //         // 使用 attachFile 方法上传文件
        //         cy.get('input[type=file]').attachFile({
        //             fileContent,
        //             fileName: 'yourFile.csv',
        //             mimeType: 'text/csv',
        //             encoding: 'utf-8'
        //         });
        //     });
        // cy.wait(500);
        // cy.contains('88888.csv').should('be.visible');
        //cy.get(".cl-userButton-root").should("not.exist");
    });
});