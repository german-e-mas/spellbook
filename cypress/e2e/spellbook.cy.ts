describe('Spellbook', () => {
  it('Check if its empty', () => {
    cy.visit('/spellbook');

    cy.get('div.error').should('exist');

    cy.get('[data-cy="spellbook"]').should('not.exist');
  });

  it('Check if the local spells are loaded', () => {
    cy.visit('/spellbook', {
      onBeforeLoad(win) {
        win.localStorage.setItem('spells', '["magic-missile"]');
      },
    });

    cy.get('div.error').should('not.exist');

    cy.get('[data-cy="spellbook"]')
      .children()
      .filter('mat-list-item')
      .should('have.length', 1);
  });

  it('Should remove spell from spellbook', () => {
    cy.visit('/spellbook', {
      onBeforeLoad(win) {
        win.localStorage.setItem('spells', '["fireball", "magic-missile"]');
      },
    });

    cy.get('[data-cy="spellbook"]')
      .find('mat-list-item')
      .contains('div', /^Fireball/)
      .should('exist')
      .closest('mat-list-item')
      .contains('button', 'delete')
      .click();

    cy.get('[data-cy="spellbook"]')
      .children()
      .filter('mat-list-item')
      .should('have.length', 1);
  });

  it('Should have the active spellbook tab', () => {
    cy.visit('/spellbook');

    cy.get('[data-cy="tabs"] a')
      .filter('.mdc-tab--active')
      .should('have.length', 1)
      .contains('Spellbook');
  });
});
