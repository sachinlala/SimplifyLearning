package com.sl.algorithms.strings;

import org.junit.Assert;
import org.junit.Ignore;
import org.junit.Test;

public class StringValidatorTest {

    @Test
    public void assertNull() {
        Assert.assertFalse(StringValidator.isValidParenthesis(null));
    }

    @Test
    public void assertBasicMatch() {
        Assert.assertTrue(StringValidator.isValidParenthesis("()"));
    }

    @Test
    public void assertDoubleMatch() {
        Assert.assertTrue(StringValidator.isValidParenthesis("(())"));
    }

    @Test
    public void assertPolyMatch() {
        Assert.assertTrue(StringValidator.isValidParenthesis("((((((()))))))"));
    }

    @Ignore
    @Test
    public void assertMatchWildCharAsEmpty() {
        Assert.assertTrue(StringValidator.isValidParenthesis("(*)"));
    }

    @Ignore
    @Test
    public void assertMatchWildCharAsWildChar1() {
        Assert.assertTrue(StringValidator.isValidParenthesis("((*)"));
    }

    @Ignore
    @Test
    public void assertMatchWildCharAsWildChar2() {
        Assert.assertTrue(StringValidator.isValidParenthesis("(*))"));
    }
}
