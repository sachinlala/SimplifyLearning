package com.sl.algorithms.maths;

import org.junit.Assert;
import org.junit.Test;

import static com.sl.algorithms.maths.Formulas.*;

public class FormulasTest {
    @Test
    public void midPointTest() {
        Assert.assertEquals(1, midPoint(1, 2));
        Assert.assertEquals(2, midPoint(1, 3));
        Assert.assertEquals(1, midPoint(0, 2));
    }

    @Test
    public void midPointTestLargeRange() {
        Assert.assertEquals(Integer.MAX_VALUE/2, midPoint(0, Integer.MAX_VALUE));
    }

    @Test
    public void midPointTestLargeNumbers() {
        Assert.assertEquals(Integer.MAX_VALUE, midPoint(Integer.MAX_VALUE, Integer.MAX_VALUE));
    }

    @Test
    public void hcfTest() {
        Assert.assertEquals(hcf(0, 0), -1);
        Assert.assertEquals(hcf(3, 0), 3);
        Assert.assertEquals(hcf(0, 1), 1);
        Assert.assertEquals(hcf(3, 2), 1);
        Assert.assertEquals(hcf(4, 2), 2);
        Assert.assertEquals(hcf(6, 2), 2);
        Assert.assertEquals(hcf(7, 2), 1);
        Assert.assertEquals(hcf(2, 7), 1);
        Assert.assertEquals(hcf(6, 3), 3);
        Assert.assertEquals(hcf(18, 12), 6);
        Assert.assertEquals(hcf(5, 6), 1);
        Assert.assertEquals(hcf(5, 7), 1);
    }

    @Test
    public void testPrimality() {
        Assert.assertFalse(isPrimeNumber(0));
        Assert.assertFalse(isPrimeNumber(1));
        Assert.assertTrue(isPrimeNumber(2));
        Assert.assertTrue(isPrimeNumber(3));
        Assert.assertFalse(isPrimeNumber(4));
        Assert.assertTrue(isPrimeNumber(5));
        Assert.assertTrue(isPrimeNumber(7));
        Assert.assertFalse(isPrimeNumber(20));
        Assert.assertFalse(isPrimeNumber(45));
        Assert.assertFalse(isPrimeNumber(57));
        Assert.assertTrue(isPrimeNumber(67));
        Assert.assertTrue(isPrimeNumber(83));
        Assert.assertTrue(isPrimeNumber(191));
    }

    @Test
    public void testPrimalityLargeNumber() {
        Assert.assertFalse(isPrimeNumber(239124949));
        Assert.assertFalse(isPrimeNumber(239124947));
    }

    @Test
    public void testEulerPrimes() {
        Assert.assertTrue(isPrimeNumber(6700417));
        Assert.assertTrue(isPrimeNumber(2147483647)); // [2*pow(31)-1]
    }
}
