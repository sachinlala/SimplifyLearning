package com.sl.algorithms.linear.array;

import org.junit.Assert;
import org.junit.Test;

public class MissingNumberTest extends MissingNumber {
    @Test
    public void testFindSmallestMissingNumberSorted() {
        Assert.assertEquals(0, findSmallestMissingNumberSorted(new int[]{}));
        Assert.assertEquals(0, findSmallestMissingNumberSorted(null));
        Assert.assertEquals(3, findSmallestMissingNumberSorted(new int[]{0, 1, 2, 4, 5}));
        Assert.assertEquals(0, findSmallestMissingNumberSorted(new int[]{1, 2, 4, 5}));
        Assert.assertEquals(1, findSmallestMissingNumberSorted(new int[]{0, 2, 4, 5}));
        Assert.assertEquals(6, findSmallestMissingNumberSorted(new int[]{0, 1, 2, 3, 4, 5}));
    }

    @Test
    public void testFindSmallestMissingNumberSortedXOR() {
        Assert.assertEquals(0, findSmallestMissingNumberSortedXOR(new int[]{}));
        Assert.assertEquals(0, findSmallestMissingNumberSortedXOR(null));
        Assert.assertEquals(3, findSmallestMissingNumberSortedXOR(new int[]{0, 1, 2, 4, 5}));
        //5
        //0, 1, 2, 4, 5
        //0, 1, 2, 3, 4
        //5^0^0 = 0101^1^1 = 0101^0 = 0101^(4^3) = 0101^(0100^0011) = 0101^(0111) = 0010 = 2
        //2^(5^4) = 2^(0101^0100) = 2^(0001) = 0010^0001 = 0011 = 3
    }

    @Test
    public void testFindSmallestMissingNumberUnsorted() {
        Assert.assertEquals(3, findSmallestMissingNumberUnsorted(new int[]{0, 0, 1, 2, 2, 4, 5}));
        Assert.assertEquals(3, findSmallestMissingNumberUnsorted(new int[]{0, 0, 1, 2, 4, 5}));
        Assert.assertEquals(4, findSmallestMissingNumberUnsorted(new int[]{5, 2, 3, 2, 2, 1}));
        Assert.assertEquals(4, findSmallestMissingNumberUnsorted(new int[]{-1, 1, 1, 2, 2, 3}));
        Assert.assertEquals(4, findSmallestMissingNumberUnsorted(new int[]{-1, 1, 2, 3}));
        Assert.assertEquals(1, findSmallestMissingNumberUnsorted(new int[]{-2, -3, -4, -8}));
        Assert.assertEquals(3, findSmallestMissingNumberUnsorted(new int[]{1, 2, 4, 5}));
        Assert.assertEquals(4, findSmallestMissingNumberUnsorted(new int[]{0, 1, 2, 3}));
        Assert.assertEquals(3, findSmallestMissingNumberUnsorted(new int[]{0, 1, 2, 4}));
        Assert.assertEquals(5, findSmallestMissingNumberUnsorted(new int[]{4, 1, 2, 3}));
        Assert.assertEquals(5, findSmallestMissingNumberUnsorted(new int[]{4, 2, 1, 3}));
        Assert.assertEquals(5, findSmallestMissingNumberUnsorted(new int[]{4, 2, 3, 1}));
        Assert.assertEquals(2, findSmallestMissingNumberUnsorted(new int[]{3, 4, -1, 1}));
        Assert.assertEquals(5, findSmallestMissingNumberUnsorted(new int[]{4, 3, 2, 1}));
        Assert.assertEquals(4, findSmallestMissingNumberUnsorted(new int[]{40, 1, 2, 3}));
        Assert.assertEquals(2, findSmallestMissingNumberUnsorted(new int[]{4, 1, 4, 3}));
        Assert.assertEquals(1, findSmallestMissingNumberUnsorted(new int[]{}));
    }
}
