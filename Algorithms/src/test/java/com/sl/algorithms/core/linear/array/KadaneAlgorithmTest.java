package com.sl.algorithms.core.linear.array;

import org.junit.Assert;
import org.junit.Test;

public class KadaneAlgorithmTest extends KadaneAlgorithm {
    @Test
    public void testFindMaxContiguousSumSubArray() {
        Assert.assertEquals(15, findMaxContiguousSumSubArray(new int[]{1, 2, 3, 4, 5}));
        Assert.assertEquals(0, findMaxContiguousSumSubArray(null));
        Assert.assertEquals(0, findMaxContiguousSumSubArray(new int[]{}));
        Assert.assertEquals(1, findMaxContiguousSumSubArray(new int[]{1}));
        Assert.assertEquals(3, findMaxContiguousSumSubArray(new int[]{1, 2}));
        Assert.assertEquals(-1, findMaxContiguousSumSubArray(new int[]{-1}));
        Assert.assertEquals(-1, findMaxContiguousSumSubArray(new int[]{-1, -2}));
        Assert.assertEquals(1, findMaxContiguousSumSubArray(new int[]{-1, -2, 1}));
        Assert.assertEquals(5, findMaxContiguousSumSubArray(new int[]{-1, 2, 3}));
        Assert.assertEquals(2, findMaxContiguousSumSubArray(new int[]{-10, 2, -5}));
        Assert.assertEquals(4, findMaxContiguousSumSubArray(new int[]{-1, 2, -1, 3}));
    }

    @Test
    public void testFindMaxSubSequenceSum() {
        Assert.assertEquals(15, findMaxSubSequenceSum(new int[]{1, 2, 3, 4, 5}));
        Assert.assertEquals(0, findMaxSubSequenceSum(null));
        Assert.assertEquals(0, findMaxSubSequenceSum(new int[]{}));
        Assert.assertEquals(1, findMaxSubSequenceSum(new int[]{1}));
        Assert.assertEquals(3, findMaxSubSequenceSum(new int[]{1, 2}));
        Assert.assertEquals(-1, findMaxSubSequenceSum(new int[]{-1}));
        Assert.assertEquals(-1, findMaxSubSequenceSum(new int[]{-1, -2}));
        Assert.assertEquals(1, findMaxSubSequenceSum(new int[]{-1, -2, 1}));
        Assert.assertEquals(5, findMaxSubSequenceSum(new int[]{-1, 2, 3}));
        Assert.assertEquals(2, findMaxSubSequenceSum(new int[]{-10, 2, -5}));
        Assert.assertEquals(5, findMaxSubSequenceSum(new int[]{-1, 2, -1, 3}));
    }

    @Test
    public void testFindMaxNonNeighboursSumSubArray() {
        Assert.assertEquals(9, findMaxNonNeighboursSumSubArray(new int[]{1, 2, 3, 4, 5}));
        Assert.assertEquals(0, findMaxNonNeighboursSumSubArray(null));
        Assert.assertEquals(0, findMaxNonNeighboursSumSubArray(new int[]{}));
        Assert.assertEquals(1, findMaxNonNeighboursSumSubArray(new int[]{1}));
        Assert.assertEquals(2, findMaxNonNeighboursSumSubArray(new int[]{1, 2}));
        Assert.assertEquals(4, findMaxNonNeighboursSumSubArray(new int[]{1, 2, 3}));
        Assert.assertEquals(27, findMaxNonNeighboursSumSubArray(new int[]{7, 8, 20}));
        Assert.assertEquals(25, findMaxNonNeighboursSumSubArray(new int[]{2, 5, 10, 20}));
    }
}
