describe("AgencySMP/api", function(){
    beforeEach(function(){
        cy.prepareData(Cypress.env("HEADER_SETTING_FILE"), "headers")
        cy.prepareData(Cypress.env("LOGIN_SETTING_FILE"), "credential")

        cy.request({
            url: "AgencySMP/api/version",
            method: "GET"
        }).as("apiVersion")

        cy.get("@headers").then(function(headers){
            headers = headers
        })
        cy.get("@credential").then(function(credential){
            credential = credential
        })
    });

    before(function(){
       // it("Should login success", function(){
        
            cy.request({
                url:  "AgencySMP/api/Auth/GetToken",
                method: "POST",
                headers: headers,
                body: credential,
                failOnStatusCode: false
            }).as("getTokenResponse")
            // .its("header")
            // .should("be.eq", 200)
    
            cy.get("@getTokenResponse").then(function(getTokenResponse){
                // const { access_token } = this.getTokenResponse.body
                
                // expect(username).to.be.eq(tagName)
                cy.log(getTokenResponse)
            })
       // })
       
    })

    
    
    it("Should LoadSettings success", function(){
        cy.get("@getTokenResponse").then(function(getTokenResponse){
            const { access_token } = this.getTokenResponse

            cy.request({
                url: "api/Setting/LoadSettings",
                method: "GET",
                headers: {
                   "Authorization" : "Bearer " + access_token
                },
                failOnStatusCode: false
            })
            .its("header")
            .should("be.eq", 200)
        })

        
    })

    
})