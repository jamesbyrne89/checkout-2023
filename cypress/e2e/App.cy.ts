describe("Happy path", () => {
  it("loads feedback page", () => {
    cy.clearAllLocalStorage();
    cy.visit("http://localhost:3000");
    cy.contains("Submit your feedback");
  });

  it("skips form", () => {
    cy.contains("Full name*");
    cy.contains("Email*").click();
    cy.contains("Full name is required");
    cy.contains("Rating*").click();
    cy.contains("Must be a valid email");
    cy.get('[type="radio"]').first().focus();
    cy.contains("Comments*").click();
    cy.contains("You must provide a rating");
    cy.get("button").contains("Submit").should("be.disabled");
    cy.contains("Full name*").click();
    cy.contains("Comments are required");
  });

  it("completes form", () => {
    cy.contains("Full name*").type("James Byrne");
    cy.contains("Email*").type("j.byrne@example.com");
    cy.contains("Full name is required").should("not.exist");
    cy.get('[data-testid="4-star"]').click();
    cy.contains("Must be a valid email").should("not.exist");
    cy.get("button").contains("Submit").should("be.disabled");
    cy.contains("Comments*").type(
      "Everything was fine, but could have been better."
    );
    cy.contains("You must provide a rating").should("not.exist");
  });

  it("submits form", () => {
    cy.get("button").contains("Submit").should("not.be.disabled").click();
    cy.contains("Comments are required").should("not.exist");
  });

  it("shows results page", () => {
    cy.get("h1").contains("Feedback Results");
    cy.get("h2").contains("Latest comments");
    cy.contains("j.byrne@example.com");
    cy.contains("Everything was fine, but could have been better.");
  });
});
