package com.sl.algorithms.strings;

import org.junit.Assert;
import org.junit.Test;

public class LapindromeTest {
    @Test
    public void assertNull() {
        Assert.assertFalse(Lapindrome.isLapindrome(null));
    }

    @Test
    public void assertSingleCharString() {
        Assert.assertTrue(Lapindrome.isLapindrome(" "));
        Assert.assertTrue(Lapindrome.isLapindrome("x"));
    }

    @Test
    public void assertPositive() {
        Assert.assertTrue(Lapindrome.isLapindrome("abcab"));
        Assert.assertTrue(Lapindrome.isLapindrome("x"));
        Assert.assertTrue(Lapindrome.isLapindrome("abba"));
        Assert.assertTrue(Lapindrome.isLapindrome("abab"));
    }

    @Test
    public void assertNegative() {
        Assert.assertFalse(Lapindrome.isLapindrome("test"));
    }
}
