package com.sl.algorithms.core.maths;

import org.junit.Assert;
import org.junit.Test;

import static com.sl.algorithms.core.maths.DataOps.atoi;

public class DataOpsTest {

    @Test
    public void assertAtoi() {
        Assert.assertEquals(0, atoi(null));
        Assert.assertEquals(0, atoi(""));
        Assert.assertEquals(0, atoi(" "));
        Assert.assertEquals(0, atoi("small"));
        Assert.assertEquals(0, atoi("CAPS"));
        Assert.assertEquals(0, atoi("Special$#"));
        Assert.assertEquals(0, atoi(".123"));
        Assert.assertEquals(123, atoi("123"));
        Assert.assertEquals(123, atoi("123.3"));
        Assert.assertEquals(123, atoi("123.9"));
        Assert.assertEquals(-46, atoi("-46"));
        Assert.assertEquals(1534236469, atoi("1534236469"));
        Assert.assertEquals(-1534236469, atoi("-1534236469"));
        Assert.assertEquals(10, atoi("    010"));
        Assert.assertEquals(0, atoi("+"));
        Assert.assertEquals(4500, atoi("     +004500"));
        Assert.assertEquals(-4500, atoi("     -004500"));
        Assert.assertEquals(-12, atoi("  -0012a42"));
        Assert.assertEquals(2147483647, atoi("2147483648"));
        Assert.assertEquals(-2147483647, atoi("-2147483647"));
        Assert.assertEquals(-2147483648, atoi("-2147483648"));
        Assert.assertEquals(-2147483648, atoi("      -11919730356x"));
    }
}