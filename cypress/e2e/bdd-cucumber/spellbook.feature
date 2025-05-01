Feature: Spellbook
    Background:
        Given I am at the Spellbook page

    Scenario: Empty spellbook
        Given I have no spells in my spellbook
        Then I see a warning in the page
    
    Scenario: See the spell list
        Given Fireball and Magic Missile are in my Spellbook
        Then I see Fireball and Magic Missile in the list of spells

    Scenario: Remove a spell
        Given Fireball and Magic Missile are in my Spellbook
        When I click on the Remove button
        Then Fireball should no longer be in the list

    Scenario: See the details of a spell
        Given Fireball is in my Spellbook
        When I click on the Details button
        Then I am taken to the Fireball spell detail page
