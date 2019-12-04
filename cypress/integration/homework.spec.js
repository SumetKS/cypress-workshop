describe("AgencySMP/api", function(){
    before(function(){
        cy.prepareData(Cypress.env("HEADER_SETTING_FILE"), "headers")
        cy.prepareData(Cypress.env("LOGIN_SETTING_FILE"), "credential").then(function(){
                cy.log( this.headers)
                cy.request({
                    url:  "AgencySMP/api/Auth/GetToken",
                    method: "POST",
                    headers: this.headers,
                    body: this.credential,
                    failOnStatusCode: false
                }).as("tokenResponse")
         
                cy.get("@tokenResponse").then(function(tokenResponse){
                    cy.log(tokenResponse)
                })
        })
    });

    beforeEach(function(){
        cy.request({
            url: "AgencySMP/api/version",
            method: "GET"
        }).as("apiVersion")
       
    })

    
    
    it("Should LoadSettings success", function(){
        
            const { access_token } = this.tokenResponse.body

            cy.request({
                url: "AgencySMP/api/Setting/LoadSettings?agentCode=" + this.credential.userName,
                method: "GET",
                headers: this.headers,
                'auth': {
                    'bearer':  access_token
                  },
                failOnStatusCode: false
            })
            .its("status")
            .should("be.eq", 200)
    })
})