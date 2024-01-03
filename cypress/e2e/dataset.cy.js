describe("Testing", () => {
    beforeEach(() => {
        cy.visit("/", {
            failOnStatusCode: false,
        });
        cy.session("signed-in", () => {
            cy.signIn();
        });
    });
    it("should be ok to update self dataset", () => {
        let start;
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
        cy.get('button.MuiButtonBase-root.MuiButton-root').contains('提交').click().then(() => {
            start = new Date();
        });
        cy.on('window:alert', (str) => {
            expect(str).to.equal('条目添加成功！');
        }).then(() => {
            const duration = new Date() - start;
            cy.writeFile('testlog.txt', `time for adding question: ${duration}\n`, { flag: 'a+' });
        });
    });
    it("should be ok to delete question", () => {
        let start;
        cy.visit("/profile/self", {
            failOnStatusCode: false,
        });
        cy.contains('77777.csv').parent().click();
        cy.get('button[aria-label="Go to next page"]').click();
        cy.contains("this is a very new question").parent().find('input').check();
        cy.wait(300);
        cy.get('button[aria-label="Delete"]').click().then(() => {
            start = new Date();
        });
        cy.on('window:alert', (str) => {
            expect(str).to.equal('条目删除成功！');
        }).then(() => {
            const duration = new Date() - start;
            cy.writeFile('testlog.txt', `time for deleting question: ${duration}\n`, { flag: 'a+' });
        });
        cy.get('button[aria-label="Go to next page"]').click();
        cy.contains("this is a very new question").should('not.exist');
    });
    it("should be ok to update dataset", () => {
        let start;
        cy.visit("/profile/self", {
            failOnStatusCode: false,
        });
        cy.contains('77777.csv').parent().click();
        cy.get('button').contains('修改数据集属性').click();
        cy.get('#name').clear().type('88888');
        cy.get('#description').clear().type('88888');
        cy.get('#new_labels').clear().type('["88888"]');
        cy.get('button.MuiButtonBase-root.MuiButton-root').contains('提交').click().then(() => {
            start = new Date();
        });
        cy.contains('88888').should('be.visible').then(() => {
            const duration = new Date() - start;
            cy.writeFile('testlog.txt', `time for updating dataset: ${duration}\n`, { flag: 'a+' });
        });
        cy.get('div').contains('88888').should('be.visible');
        cy.get('button').contains('88888').should('be.visible');
    });
    it("should be ok to delete dataset", () => {
        let start;
        cy.visit("/profile/self", {
            failOnStatusCode: false,
        });
        cy.contains('88888').parent().click();
        cy.get('button').contains('删除数据集').click().then(() => {
            start = new Date();
        });
        cy.on('window:alert', (str) => {
            expect(str).to.equal('数据集删除成功！');
        }).then(() => {
            const duration = new Date() - start;
            cy.writeFile('testlog.txt', `time for deleting dataset: ${duration}\n`, { flag: 'a+' });
        });
        cy.contains('88888').should('not.exist');
    });
    it("should be ok to visit,star,comment others dataset", () => {
        let start;
        cy.visit("/datasets", {
            failOnStatusCode: false,
        });
        cy.contains("subjective1.csv").click();
        cy.url().should('include', '/datasets/details/visitor');
        cy.wait(1000);
        cy.get('button').contains('收藏').click().then(() => {
            start = new Date();
        });

        cy.on('window:alert', (str) => {
            expect(str).to.equal('收藏成功');
        }).then(() => {
            const duration = new Date() - start;
            cy.writeFile('testlog.txt', `time for starring dataset: ${duration}\n`, { flag: 'a+' });
        });
        cy.wait(1000);
        cy.get('button').contains('留言').click();
        cy.get('textarea[name="comment-textarea"]').type('this is a comment');
        cy.get('button').contains('提交').click().then(() => {
            start = new Date();
        });
        cy.contains('this is a comment').should('be.visible').then(() => {
            const duration = new Date() - start;
            cy.writeFile('testlog.txt', `time for commenting dataset: ${duration}\n`, { flag: 'a+' });
        });
    });
    // it("should be ok to sort dataset", () => {
    //     let start;
    //     cy.visit("/datasets", {
    //         failOnStatusCode: false,
    //     });
    //     cy.get('label').contains('1K-10K').get('input[class="checkbox"]').check().then(() => {
    //         start = new Date();
    //     });
    //     cy.contains('无搜索结果').should('be.visible').then(() => {
    //         const duration = new Date() - start;
    //         cy.writeFile('testlog.txt', `time for sorting dataset in small range: ${duration}\n`, { flag: 'a+' });
    //     });
    // });
});