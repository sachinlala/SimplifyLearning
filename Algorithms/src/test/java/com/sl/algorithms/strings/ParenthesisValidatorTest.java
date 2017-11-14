package com.sl.algorithms.strings;

import org.junit.Assert;
import org.junit.Test;

public class ParenthesisValidatorTest {
    @Test
    public void assertIsValidParenthesis() {
        Assert.assertTrue(ParenthesisValidator.isValidParenthesis(null));
        Assert.assertTrue(ParenthesisValidator.isValidParenthesis(""));
        Assert.assertFalse(ParenthesisValidator.isValidParenthesis("("));
        Assert.assertFalse(ParenthesisValidator.isValidParenthesis(")"));
        Assert.assertTrue(ParenthesisValidator.isValidParenthesis("()"));
        Assert.assertFalse(ParenthesisValidator.isValidParenthesis(")("));
        Assert.assertTrue(ParenthesisValidator.isValidParenthesis("()()"));
        Assert.assertTrue(ParenthesisValidator.isValidParenthesis("(())"));
        Assert.assertTrue(ParenthesisValidator.isValidParenthesis("(())()"));
        Assert.assertFalse(ParenthesisValidator.isValidParenthesis("(())())"));
    }

    @Test
    public void assertIsValidParenthesisWildChar() {
        Assert.assertTrue(ParenthesisValidator.isValidParenthesisWildChar(null));
        Assert.assertTrue(ParenthesisValidator.isValidParenthesisWildChar(""));
        Assert.assertFalse(ParenthesisValidator.isValidParenthesisWildChar("("));
        Assert.assertFalse(ParenthesisValidator.isValidParenthesisWildChar(")"));
        Assert.assertTrue(ParenthesisValidator.isValidParenthesisWildChar("*"));
        Assert.assertTrue(ParenthesisValidator.isValidParenthesisWildChar("()"));
        Assert.assertTrue(ParenthesisValidator.isValidParenthesisWildChar("(())"));
        Assert.assertTrue(ParenthesisValidator.isValidParenthesisWildChar("((((((()))))))"));
        Assert.assertTrue(ParenthesisValidator.isValidParenthesisWildChar("(*)"));
        Assert.assertTrue(ParenthesisValidator.isValidParenthesisWildChar("((*)"));
        Assert.assertTrue(ParenthesisValidator.isValidParenthesisWildChar("(*))"));
    }

    @Test
    public void assertIsValidParenthesisString() {
        Assert.assertFalse(ParenthesisValidator.isValidParenthesisPairs(null));
        Assert.assertFalse(ParenthesisValidator.isValidParenthesisPairs(""));
        Assert.assertFalse(ParenthesisValidator.isValidParenthesisPairs("("));
        Assert.assertFalse(ParenthesisValidator.isValidParenthesisPairs(")"));
        Assert.assertFalse(ParenthesisValidator.isValidParenthesisPairs("*"));
        Assert.assertFalse(ParenthesisValidator.isValidParenthesisPairs("([)"));
        Assert.assertFalse(ParenthesisValidator.isValidParenthesisPairs("([)"));
        Assert.assertFalse(ParenthesisValidator.isValidParenthesisPairs("){"));
        Assert.assertFalse(ParenthesisValidator.isValidParenthesisPairs("["));
        Assert.assertTrue(ParenthesisValidator.isValidParenthesisPairs("()"));
        Assert.assertTrue(ParenthesisValidator.isValidParenthesisPairs("()[]{}"));
        Assert.assertFalse(ParenthesisValidator.isValidParenthesisPairs("(]"));
        Assert.assertFalse(ParenthesisValidator.isValidParenthesisPairs("([)]"));
    }
}