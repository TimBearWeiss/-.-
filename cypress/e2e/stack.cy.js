describe("Stack test", () => {
  beforeEach(() => {
    cy.visit(`http://localhost:3000/stack`);
  });

  it("if input empty, button disabled", () => {
    cy.get("input").should("be.empty");
    cy.get("button[type=submit]").should("be.disabled");
  });

  it("The element is being added correctly", () => {
    cy.get("input").type("1");
    cy.get("button[type='submit']").click();
    const numbers = [1, 2, 3];

    cy.get("[data-testid=contetnt]")
      .should("have.length", 1)
      .each((el, index) => {
        cy.wrap(el).contains(numbers[index]);
      });

    cy.get("[data-testid=circle]")
      .eq(0)
      .should("have.css", "border-color", "rgb(210, 82, 225)");

    cy.wait(500);

    cy.get("[data-testid=circle]")
      .eq(0)
      .should("have.css", "border-color", "rgb(0, 50, 255)");

    cy.get("input").type("2");
    cy.get("button[type='submit']").click();

    cy.get("[data-testid=contetnt]")
      .should("have.length", 2)
      .each((el, index) => {
        cy.wrap(el).contains(numbers[index]);
      });

    cy.get("[data-testid=circle]")
      .eq(1)
      .should("have.css", "border-color", "rgb(210, 82, 225)");
    cy.wait(500);

    cy.get("[data-testid=circle]")
      .eq(1)
      .should("have.css", "border-color", "rgb(0, 50, 255)");

    cy.get("input").type("3");
    cy.get("button[type='submit']").click();

    cy.get("[data-testid=contetnt]")
      .should("have.length", 3)
      .each((el, index) => {
        cy.wrap(el).contains(numbers[index]);
      });

    cy.get("[data-testid=circle]")
      .eq(2)
      .should("have.css", "border-color", "rgb(210, 82, 225)");
    cy.wait(500);

    cy.get("[data-testid=circle]")
      .eq(2)
      .should("have.css", "border-color", "rgb(0, 50, 255)");
  });

  it("The element is deleted correctly", () => {
    cy.get("input").type("1");
    cy.get("button[type='submit']").click();
    cy.get("[data-testid=contetnt]").should("exist");
    cy.wait(500);
    cy.get("[data-testid=circle]")
      .eq(0)
      .should("have.css", "border-color", "rgb(0, 50, 255)");
    cy.get("[data-testid=button-delete]").click();

    cy.get("[data-testid=circle]")
      .eq(0)
      .should("have.css", "border-color", "rgb(210, 82, 225)");

    cy.wait(500);
    cy.get("[data-testid=contetnt]").should("not.exist");
  });

  it("The clear button deletes all stack elements", () => {
    cy.get("input").type("1");
    cy.get("button[type='submit']").click();
    cy.wait(500);
    cy.get("input").type("2");
    cy.get("button[type='submit']").click();
    cy.wait(500);
    cy.get("button[type='reset']").click();
    cy.get("[data-testid=contetnt]").should("not.exist");
  });
});
