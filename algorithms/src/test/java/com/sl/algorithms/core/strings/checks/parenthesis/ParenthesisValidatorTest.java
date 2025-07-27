package com.sl.algorithms.core.strings.checks.parenthesis;

import com.sl.algorithms.core.interfaces.strings.checks.ParenthesisValidator;
import static org.junit.jupiter.api.Assertions.*;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.anyOf;
import static org.hamcrest.Matchers.is;
import org.junit.jupiter.api.Test;

public class ParenthesisValidatorTest {

  private ParenthesisValidator parenthesisValidator;

  @Test
  public void assertIsValidParenthesis() {
    parenthesisValidator = new CommonParenthesisValidator();
    assertTrue(parenthesisValidator.isValidParenthesis(null));
    assertTrue(parenthesisValidator.isValidParenthesis(""));
    assertFalse(parenthesisValidator.isValidParenthesis("("));
    assertFalse(parenthesisValidator.isValidParenthesis(")"));
    assertTrue(parenthesisValidator.isValidParenthesis("()"));
    assertFalse(parenthesisValidator.isValidParenthesis(")("));
    assertTrue(parenthesisValidator.isValidParenthesis("()()"));
    assertTrue(parenthesisValidator.isValidParenthesis("(())"));
    assertTrue(parenthesisValidator.isValidParenthesis("(())()"));
    assertFalse(parenthesisValidator.isValidParenthesis("(())())"));
  }

  @Test
  public void assertIsValidParenthesisWildChar() {
    parenthesisValidator = new WildCharParenthesisValidator();
    assertTrue(parenthesisValidator.isValidParenthesis(null));
    assertTrue(parenthesisValidator.isValidParenthesis(""));
    assertFalse(parenthesisValidator.isValidParenthesis("("));
    assertFalse(parenthesisValidator.isValidParenthesis(")"));
    assertTrue(parenthesisValidator.isValidParenthesis("*"));
    assertTrue(parenthesisValidator.isValidParenthesis("()"));
    assertTrue(parenthesisValidator.isValidParenthesis("(())"));
    assertTrue(parenthesisValidator.isValidParenthesis("((((((()))))))"));
    assertTrue(parenthesisValidator.isValidParenthesis("(*)"));
    assertTrue(parenthesisValidator.isValidParenthesis("((*)"));
    assertTrue(parenthesisValidator.isValidParenthesis("(*))"));
  }

  @Test
  public void assertIsValidParenthesisString() {
    parenthesisValidator = new MultiBraceParenthesisValidator();
    assertFalse(parenthesisValidator.isValidParenthesis(null));
    assertFalse(parenthesisValidator.isValidParenthesis(""));
    assertFalse(parenthesisValidator.isValidParenthesis("("));
    assertFalse(parenthesisValidator.isValidParenthesis(")"));
    assertFalse(parenthesisValidator.isValidParenthesis("*"));
    assertFalse(parenthesisValidator.isValidParenthesis("([)"));
    assertFalse(parenthesisValidator.isValidParenthesis("([)"));
    assertFalse(parenthesisValidator.isValidParenthesis("){"));
    assertFalse(parenthesisValidator.isValidParenthesis("["));
    assertTrue(parenthesisValidator.isValidParenthesis("()"));
    assertTrue(parenthesisValidator.isValidParenthesis("()[]{}"));
    assertFalse(parenthesisValidator.isValidParenthesis("(]"));
    assertFalse(parenthesisValidator.isValidParenthesis("([)]"));
  }
}
