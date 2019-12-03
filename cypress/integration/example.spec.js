describe("api/user",  function(){
    // it("should success", function(){
    //     expect(1+1).to.be.eq(2)
    // })

    // it("should fail", function(){
    //     expect(1+1).to.be.not.eq(3)
    // })

    beforeEach(function(){
        // cy.fixture("header").as("headers")
        // cy.fixture("user/user_adam").as("user")
        cy.prepareData("users/user_adam", "user")
    });

    it("Should success", function(){
        cy.request({
            url: "/users/login",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:{
                user: {
                    email: "test@gmail.com",
                    password: "123213213213"
                }
            },
            failOnStatusCode: false
        })
        // .then(function(response){
        //     expect(response.status).to.be.eq(200)
        // })
        .its("header")
        .should("be.eq", 200)
    })

   

    it("Should sign me up successfully", function(){

       
            
            cy.request({
                url: "/users",
                method: "POST",
                // headers: {
                //     "Content-Type": "application/json"
                // },
                headers: headers,
                body:{
                    user,
                    // user: user

                    // user: {
                    //     email: "test@gmail.com",
                    //     password: "123213213213"
                    // }
                },
                failOnStatusCode: false
            }).as("signUpResponse")
            cy.request({
                url: "http://someip:3000/api/tag"
            }).as("tagsResponse")
                
            cy.wait("@signUpResponse", { timeout: 10000})
            cy.wait("@tagResponse")
    
            cy.get("@tagResponse").then(function(tagResponse){
                const { username } = this.signUpResponse.body
                const { tagName } = tagResponse.body
                expect(username).to.be.eq(tagName)
            })
        

        
    })
})