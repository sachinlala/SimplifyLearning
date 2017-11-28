package com.sl.algorithms.strings;

import org.junit.Assert;
import org.junit.Test;

import static com.sl.algorithms.strings.StringOps.decode;

public class StringOpsTest {

    @Test
    public void assertDecode() {
        Assert.assertEquals(null, decode(null));
        Assert.assertEquals("", decode(""));
        Assert.assertEquals("a", decode("a"));
        Assert.assertEquals("aa", decode("2[a]"));
        Assert.assertEquals("a", decode("1[a]"));
        Assert.assertEquals("aaaaaaaaaaaa", decode("12[a]"));
        Assert.assertEquals("ab", decode("ab"));
        Assert.assertEquals("abab", decode("2[ab]"));
        Assert.assertEquals("abbabb", decode("2[a2[b]]"));
        Assert.assertEquals("bcacabcacabcaca", decode("3[b2[ca]]"));
    }
}
