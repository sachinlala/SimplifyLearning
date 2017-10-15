package com.sl.algorithms.strings;

import org.junit.Assert;
import org.junit.Ignore;
import org.junit.Test;

public class ParenthesisValidatorTest {

    @Test
    public void assertNull() {
        Assert.assertFalse(ParenthesisValidator.isValidParenthesis(null));
    }

    @Test
    public void assertBasicMatch() {
        Assert.assertTrue(ParenthesisValidator.isValidParenthesis("()"));
    }

    @Test
    public void assertDoubleMatch() {
        Assert.assertTrue(ParenthesisValidator.isValidParenthesis("(())"));
    }

    @Test
    public void assertPolyMatch() {
        Assert.assertTrue(ParenthesisValidator.isValidParenthesis("((((((()))))))"));
    }

    @Ignore
    @Test
    public void assertMatchWildCharAsEmpty() {
        Assert.assertTrue(ParenthesisValidator.isValidParenthesis("(*)"));
    }

    @Ignore
    @Test
    public void assertMatchWildCharAsWildChar1() {
        Assert.assertTrue(ParenthesisValidator.isValidParenthesis("((*)"));
    }

    @Ignore
    @Test
    public void assertMatchWildCharAsWildChar2() {
        Assert.assertTrue(ParenthesisValidator.isValidParenthesis("(*))"));
    }
}
