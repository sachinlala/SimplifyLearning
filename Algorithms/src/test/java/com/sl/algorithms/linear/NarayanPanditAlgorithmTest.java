package com.sl.algorithms.linear;

import org.junit.Assert;
import org.junit.Test;

import static com.sl.algorithms.linear.NarayanPanditAlgorithm.findNGNSameDigits;
import static com.sl.algorithms.linear.NarayanPanditAlgorithm.findNGNSameDigits10s;

public class NarayanPanditAlgorithmTest {

    @Test
    public void testNGNSameDigits10s() {
        Assert.assertEquals(-1, findNGNSameDigits10s(10));
        Assert.assertEquals(21, findNGNSameDigits10s(12));
        Assert.assertEquals(-1, findNGNSameDigits10s(21));
        Assert.assertEquals(120, findNGNSameDigits10s(102));
        Assert.assertEquals(211, findNGNSameDigits10s(121));
        Assert.assertEquals(132, findNGNSameDigits10s(123));
        Assert.assertEquals(213, findNGNSameDigits10s(132));
        Assert.assertEquals(192, findNGNSameDigits10s(129));
        Assert.assertEquals(219, findNGNSameDigits10s(192));
        Assert.assertEquals(-1, findNGNSameDigits10s(1999999999));
    }

    @Test
    public void testNGNSameDigits() {
        Assert.assertEquals(-1, findNGNSameDigits(4321));
        Assert.assertEquals(4132, findNGNSameDigits(4123));
        Assert.assertEquals(4213, findNGNSameDigits(4132));
        Assert.assertEquals(4231, findNGNSameDigits(4213));
        Assert.assertEquals(4321, findNGNSameDigits(4312));
        Assert.assertEquals(-1, findNGNSameDigits(10));
        Assert.assertEquals(21, findNGNSameDigits(12));
        Assert.assertEquals(-1, findNGNSameDigits(21));
        Assert.assertEquals(120, findNGNSameDigits(102));
        Assert.assertEquals(211, findNGNSameDigits(121));
        Assert.assertEquals(132, findNGNSameDigits(123));
        Assert.assertEquals(213, findNGNSameDigits(132));
        Assert.assertEquals(192, findNGNSameDigits(129));
        Assert.assertEquals(219, findNGNSameDigits(192));
        Assert.assertEquals(919, findNGNSameDigits(199));
        Assert.assertEquals(5746, findNGNSameDigits(5674));
        Assert.assertEquals(5764, findNGNSameDigits(5746));
        Assert.assertEquals(6457, findNGNSameDigits(5764));
        Assert.assertEquals(6475, findNGNSameDigits(6457));
        Assert.assertEquals(6547, findNGNSameDigits(6475));
        Assert.assertEquals(6574, findNGNSameDigits(6547));
        Assert.assertEquals(6745, findNGNSameDigits(6574));
        Assert.assertEquals(6754, findNGNSameDigits(6745));
        Assert.assertEquals(7456, findNGNSameDigits(6754));
        Assert.assertEquals(9199, findNGNSameDigits(1999));
        Assert.assertEquals(-1, findNGNSameDigits(1999999999));
    }
}
