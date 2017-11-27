package com.sl.algorithms.array;

import org.junit.Assert;
import org.junit.Ignore;
import org.junit.Test;

import static com.sl.algorithms.array.ArrayOptimalTraversal.*;
import static com.sl.algorithms.array.ArrayTraversal.printArray;

public class ArrayOptimalTraversalTest {
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
        Assert.assertEquals(0, findSmallestMissingNumberSorted(new int[]{}));
        Assert.assertEquals(0, findSmallestMissingNumberSorted(null));
        Assert.assertEquals(3, findSmallestMissingNumberSorted(new int[]{0, 1, 2, 4, 5}));
        Assert.assertEquals(0, findSmallestMissingNumberSorted(new int[]{1, 2, 4, 5}));
        Assert.assertEquals(1, findSmallestMissingNumberSorted(new int[]{0, 2, 4, 5}));
        Assert.assertEquals(6, findSmallestMissingNumberSorted(new int[]{0, 1, 2, 3, 4, 5}));
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
}