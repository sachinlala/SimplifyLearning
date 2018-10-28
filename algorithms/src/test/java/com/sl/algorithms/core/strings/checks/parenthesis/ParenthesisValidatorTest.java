package com.sl.algorithms.core.strings.checks.parenthesis;

import com.sl.algorithms.core.interfaces.strings.checks.ParenthesisValidator;
import org.junit.Assert;
import org.junit.Test;

public class ParenthesisValidatorTest {

  private ParenthesisValidator parenthesisValidator;

  @Test
  public void assertIsValidParenthesis() {
    parenthesisValidator = new CommonParenthesisValidator();
    Assert.assertTrue(parenthesisValidator.isValidParenthesis(null));
    Assert.assertTrue(parenthesisValidator.isValidParenthesis(""));
    Assert.assertFalse(parenthesisValidator.isValidParenthesis("("));
    Assert.assertFalse(parenthesisValidator.isValidParenthesis(")"));
    Assert.assertTrue(parenthesisValidator.isValidParenthesis("()"));
    Assert.assertFalse(parenthesisValidator.isValidParenthesis(")("));
    Assert.assertTrue(parenthesisValidator.isValidParenthesis("()()"));
    Assert.assertTrue(parenthesisValidator.isValidParenthesis("(())"));
    Assert.assertTrue(parenthesisValidator.isValidParenthesis("(())()"));
    Assert.assertFalse(parenthesisValidator.isValidParenthesis("(())())"));
  }

  @Test
  public void assertIsValidParenthesisWildChar() {
    parenthesisValidator = new WildCharParenthesisValidator();
    Assert.assertTrue(parenthesisValidator.isValidParenthesis(null));
    Assert.assertTrue(parenthesisValidator.isValidParenthesis(""));
    Assert.assertFalse(parenthesisValidator.isValidParenthesis("("));
    Assert.assertFalse(parenthesisValidator.isValidParenthesis(")"));
    Assert.assertTrue(parenthesisValidator.isValidParenthesis("*"));
    Assert.assertTrue(parenthesisValidator.isValidParenthesis("()"));
    Assert.assertTrue(parenthesisValidator.isValidParenthesis("(())"));
    Assert.assertTrue(parenthesisValidator.isValidParenthesis("((((((()))))))"));
    Assert.assertTrue(parenthesisValidator.isValidParenthesis("(*)"));
    Assert.assertTrue(parenthesisValidator.isValidParenthesis("((*)"));
    Assert.assertTrue(parenthesisValidator.isValidParenthesis("(*))"));
  }

  @Test
  public void assertIsValidParenthesisString() {
    parenthesisValidator = new MultiBraceParenthesisValidator();
    Assert.assertFalse(parenthesisValidator.isValidParenthesis(null));
    Assert.assertFalse(parenthesisValidator.isValidParenthesis(""));
    Assert.assertFalse(parenthesisValidator.isValidParenthesis("("));
    Assert.assertFalse(parenthesisValidator.isValidParenthesis(")"));
    Assert.assertFalse(parenthesisValidator.isValidParenthesis("*"));
    Assert.assertFalse(parenthesisValidator.isValidParenthesis("([)"));
    Assert.assertFalse(parenthesisValidator.isValidParenthesis("([)"));
    Assert.assertFalse(parenthesisValidator.isValidParenthesis("){"));
    Assert.assertFalse(parenthesisValidator.isValidParenthesis("["));
    Assert.assertTrue(parenthesisValidator.isValidParenthesis("()"));
    Assert.assertTrue(parenthesisValidator.isValidParenthesis("()[]{}"));
    Assert.assertFalse(parenthesisValidator.isValidParenthesis("(]"));
    Assert.assertFalse(parenthesisValidator.isValidParenthesis("([)]"));
  }
}
