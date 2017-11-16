package com.sl.algorithms.maths;

import org.junit.Assert;
import org.junit.Test;
import static com.sl.algorithms.maths.DataOps.*;

public class DataOpsTest {

    @Test
    public void assertReverse() {
        Assert.assertEquals(-522222222, reverse(-222222225));
        Assert.assertEquals(-65536, reverse(-63556));
        Assert.assertEquals(-1, reverse(-1));
        Assert.assertEquals(0, reverse(0));
        Assert.assertEquals(1, reverse(1));
        Assert.assertEquals(21, reverse(12));
        Assert.assertEquals(999, reverse(999));
        Assert.assertEquals(63556, reverse(65536));
        Assert.assertEquals(65536, reverse(63556));
        Assert.assertEquals(522222222, reverse(222222225));
        Assert.assertEquals(0, reverse(1534236469));
    }

    @Test
    public void assertAtoi() {
        Assert.assertEquals(0, atoi(null));
        Assert.assertEquals(0, atoi(""));
        Assert.assertEquals(0, atoi(" "));
        Assert.assertEquals(0, atoi("small"));
        Assert.assertEquals(0, atoi("CAPS"));
        Assert.assertEquals(0, atoi("Special$#"));
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