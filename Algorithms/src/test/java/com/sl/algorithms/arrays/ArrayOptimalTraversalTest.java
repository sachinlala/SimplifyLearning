package com.sl.algorithms.arrays;

import org.junit.Assert;
import org.junit.Ignore;
import org.junit.Test;

import static com.sl.algorithms.arrays.ArrayOptimalTraversal.*;
import static com.sl.algorithms.arrays.ArrayTraversal.printArray;

public class ArrayOptimalTraversalTest {
    @Test
    public void testRotationLeftByJuggling() {
        Assert.assertEquals("[2,3,4,5,1]", printArray(rotateLeftByJuggling(new int[]{1, 2, 3, 4, 5}, 1)));
        Assert.assertEquals("[3,4,5,1,2]", printArray(rotateLeftByJuggling(new int[]{1, 2, 3, 4, 5}, 2)));
        Assert.assertEquals("[4,5,1,2,3]", printArray(rotateLeftByJuggling(new int[]{1, 2, 3, 4, 5}, 3)));
        Assert.assertEquals("[5,1,2,3,4]", printArray(rotateLeftByJuggling(new int[]{1, 2, 3, 4, 5}, 4)));
        Assert.assertEquals("[1,2,3,4,5]", printArray(rotateLeftByJuggling(new int[]{1, 2, 3, 4, 5}, 5)));
        Assert.assertEquals("[2,3,4,5,1]", printArray(rotateLeftByJuggling(new int[]{1, 2, 3, 4, 5}, 6)));
        Assert.assertEquals("[3,4,5,1,2]", printArray(rotateLeftByJuggling(new int[]{1, 2, 3, 4, 5}, 7)));
        Assert.assertEquals("[3,4,1,2]", printArray(rotateLeftByJuggling(new int[]{1, 2, 3, 4}, 2)));
    }

    @Test
    public void testReverse() {
        int[] a = {1, 2, 3, 4, 5, 6};
        Assert.assertEquals("[3,2,1,4,5,6]", printArray(reverse(a, 0, 2)));
        Assert.assertEquals("[3,2,1,6,5,4]", printArray(reverse(a, 3, 5)));
        Assert.assertEquals("[4,5,6,1,2,3]", printArray(reverse(a, 0, 5)));
    }

    @Test
    public void testRotationLeftByReversal() {
        Assert.assertEquals("[2,3,4,5,1]", printArray(rotateLeftByReversal(new int[]{1, 2, 3, 4, 5}, 1)));
        Assert.assertEquals("[3,4,5,1,2]", printArray(rotateLeftByReversal(new int[]{1, 2, 3, 4, 5}, 2)));
        Assert.assertEquals("[4,5,1,2,3]", printArray(rotateLeftByReversal(new int[]{1, 2, 3, 4, 5}, 3)));
        Assert.assertEquals("[1,2,3,4,5]", printArray(rotateLeftByReversal(new int[]{1, 2, 3, 4, 5}, 5)));
        Assert.assertEquals("[5,1,2,3,4]", printArray(rotateLeftByReversal(new int[]{1, 2, 3, 4, 5}, 4)));
        Assert.assertEquals("[2,3,4,5,1]", printArray(rotateLeftByReversal(new int[]{1, 2, 3, 4, 5}, 6)));
        Assert.assertEquals("[3,4,5,1,2]", printArray(rotateLeftByReversal(new int[]{1, 2, 3, 4, 5}, 7)));
    }

    @Test
    public void testRotationRightByReversal() {
        Assert.assertEquals("[5,1,2,3,4]", printArray(rotateRightByReversal(new int[]{1, 2, 3, 4, 5}, 1)));
        Assert.assertEquals("[4,5,1,2,3]", printArray(rotateRightByReversal(new int[]{1, 2, 3, 4, 5}, 2)));
        Assert.assertEquals("[3,4,5,1,2]", printArray(rotateRightByReversal(new int[]{1, 2, 3, 4, 5}, 3)));
        Assert.assertEquals("[2,3,4,5,1]", printArray(rotateRightByReversal(new int[]{1, 2, 3, 4, 5}, 4)));
        Assert.assertEquals("[1,2,3,4,5]", printArray(rotateRightByReversal(new int[]{1, 2, 3, 4, 5}, 5)));
        Assert.assertEquals("[5,1,2,3,4]", printArray(rotateRightByReversal(new int[]{1, 2, 3, 4, 5}, 6)));
        Assert.assertEquals("[4,5,1,2,3]", printArray(rotateRightByReversal(new int[]{1, 2, 3, 4, 5}, 7)));
    }

    @Test
    public void testFindSmallestMissingNumberSortedXOR() {
        Assert.assertEquals(3, findSmallestMissingNumberSortedXOR(new int[]{0, 1, 2, 4, 5}));
    }

    @Test
    public void testFindSmallestMissingNumberSorted() {
        Assert.assertEquals(0, findSmallestMissingNumberSorted(new int[]{}, 0, 0));
        Assert.assertEquals(0, findSmallestMissingNumberSorted(null, 0, 0));
        Assert.assertEquals(3, findSmallestMissingNumberSorted(new int[]{0, 1, 2, 4, 5}, 0, 4));
        Assert.assertEquals(0, findSmallestMissingNumberSorted(new int[]{1, 2, 4, 5}, 0, 3));
        Assert.assertEquals(6, findSmallestMissingNumberSorted(new int[]{0, 1, 2, 3, 4, 5}, 0, 5));
    }

    @Ignore
    @Test
    public void testFindSmallestMissingNumberSortedDup() {
        Assert.assertEquals(3, findSmallestMissingNumberSortedXOR(new int[]{0, 0, 1, 2, 2, 4, 5}));
        Assert.assertEquals(3, findSmallestMissingNumberSortedXOR(new int[]{0, 0, 1, 2, 4, 5}));
    }

    @Test
    public void testFindSmallestMissingNumberUnsorted() {
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