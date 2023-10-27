describe("queue test", () => {
  beforeEach(() => {
    cy.visit(`http://localhost:3000/queue`);
  });

  it("if input empty, button disabled", () => {
    cy.get("input").should("be.empty");
    cy.get("button[type=submit]").should("be.disabled");
  });

  it("Adding to the queue works and the head and tail cursors are set correctly", () => {
    cy.get("input").type("1");
    cy.get("button[type=submit]").click();

    cy.get("[data-testid=circle]")
      .eq(0)
      .should("have.css", "border-color", "rgb(210, 82, 225)");

    cy.wait(500);

    cy.get("[data-testid=contetnt]").eq(0).contains("1");
    cy.get("[data-testid=contetnt]").eq(0).contains("head");
    cy.get("[data-testid=contetnt]").eq(0).contains("tail");

    cy.get("[data-testid=circle]")
      .eq(0)
      .should("have.css", "border-color", "rgb(0, 50, 255)");

    cy.get("input").type("2");
    cy.get("button[type=submit]").click();

    cy.get("[data-testid=circle]")
      .eq(1)
      .should("have.css", "border-color", "rgb(210, 82, 225)");
    cy.get("[data-testid=contetnt]").eq(1).contains("tail");
    cy.get("[data-testid=contetnt]").eq(0).contains("tail").should("not.exist");
    cy.get("[data-testid=contetnt]").eq(0).contains("head");

    cy.wait(500);

    cy.get("[data-testid=circle]")
      .eq(1)
      .should("have.css", "border-color", "rgb(0, 50, 255)");

    cy.get("[data-testid=contetnt]").eq(1).contains("2");

    cy.get("input").type("3");
    cy.get("button[type=submit]").click();

    cy.get("[data-testid=circle]")
      .eq(2)
      .should("have.css", "border-color", "rgb(210, 82, 225)");

    cy.get("[data-testid=contetnt]").eq(2).contains("tail");
    cy.get("[data-testid=contetnt]").eq(1).contains("tail").should("not.exist");
    cy.get("[data-testid=contetnt]").eq(0).contains("head");

    cy.wait(500);

    cy.get("[data-testid=circle]")
      .eq(2)
      .should("have.css", "border-color", "rgb(0, 50, 255)");
    cy.get("[data-testid=contetnt]").eq(2).contains("3");
  });

  it("The deletion works correctly", () => {
    cy.get("input").type("1");
    cy.get("button[type=submit]").click();

    cy.get("[data-testid=circle]")
      .eq(0)
      .should("have.css", "border-color", "rgb(210, 82, 225)");

    cy.wait(500);

    cy.get("[data-testid=contetnt]").eq(0).contains("1");
    cy.get("[data-testid=contetnt]").eq(0).contains("head");
    cy.get("[data-testid=contetnt]").eq(0).contains("tail");

    cy.get("[data-testid=circle]")
      .eq(0)
      .should("have.css", "border-color", "rgb(0, 50, 255)");

    cy.get("input").type("2");
    cy.get("button[type=submit]").click();

    cy.get("[data-testid=circle]")
      .eq(1)
      .should("have.css", "border-color", "rgb(210, 82, 225)");

    cy.get("[data-testid=contetnt]").eq(1).contains("tail");
    cy.get("[data-testid=contetnt]").eq(0).contains("tail").should("not.exist");
    cy.get("[data-testid=contetnt]").eq(0).contains("head");

    cy.wait(500);

    cy.get("[data-testid=circle]")
      .eq(1)
      .should("have.css", "border-color", "rgb(0, 50, 255)");
    cy.get("[data-testid=contetnt]").eq(1).contains("2");

    cy.get("button").eq(2).click();

    cy.get("[data-testid=circle]")
      .eq(0)
      .should("have.css", "border-color", "rgb(210, 82, 225)");

    cy.get("[data-testid=contetnt]").eq(0).contains("head").should("not.exist");
    cy.get("[data-testid=contetnt]").eq(1).contains("head");

    cy.wait(500);

    cy.get("[data-testid=contetnt]").eq(0).contains("1").should("not.exist");

    cy.get("[data-testid=circle]")
      .eq(0)
      .should("have.css", "border-color", "rgb(0, 50, 255)");
  });

  it("The clear button deletes all queue items", () => {
    cy.get("input").type("1");
    cy.get("button[type=submit]").click();
    cy.wait(500);
    cy.get("input").type("2");
    cy.get("button[type=submit]").click();
    cy.wait(500);
    cy.get("input").type("3");
    cy.get("button[type=submit]").click();
    cy.wait(500);
    cy.get("button[type='reset']").click();

    cy.get("[data-testid=contetnt]").eq(0).contains("1").should("not.exist");
    cy.get("[data-testid=contetnt]").eq(1).contains("2").should("not.exist");
    cy.get("[data-testid=contetnt]").eq(2).contains("3").should("not.exist");
  });
});
