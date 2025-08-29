describe("Sudoku Validator App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173"); // change to your app URL
  });
  
  it("UI renders: Title", () => {
    cy.contains("Snake & Ladders").should("be.visible");
  });

  it("UI renders: Players and Turn", () => {
    cy.contains("Turn").should("be.visible");
    cy.contains("P1").should("be.visible");
    cy.contains("P2").should("be.visible");
  });

  it("UI renders: Description", () => {
    cy.contains("Exact 100 is required to win. Land on a ladder to climb up, a snake to slide down.").should("be.visible");
  });
  
  it("UI renders: buttons", () => {
    cy.contains("Roll Dice").should("be.visible");
    cy.contains("Reset").should("be.visible");
  });
});

