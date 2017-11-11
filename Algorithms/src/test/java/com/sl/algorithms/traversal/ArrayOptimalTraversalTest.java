package com.sl.algorithms.traversal;

import org.junit.Assert;
import org.junit.Ignore;
import org.junit.Test;

import static com.sl.algorithms.traversal.ArrayTraversal.printArray;
import static com.sl.algorithms.traversal.ArrayOptimalTraversal.*;

public class ArrayOptimalTraversalTest {
    @Test
    public void testRotationLeftByJuggling1() {
        int[] a = {1, 2, 3, 4, 5};
        Assert.assertEquals("[23451]", printArray(rotateLeftByJuggling(a, 1)));
    }

    @Test
    public void testRotationLeftByJuggling2() {
        int[] a = {1, 2, 3, 4, 5};
        Assert.assertEquals("[34512]", printArray(rotateLeftByJuggling(a, 2)));
    }

    @Test
    public void testRotationLeftByJuggling3() {
        int[] a = {1, 2, 3, 4, 5};
        Assert.assertEquals("[45123]", printArray(rotateLeftByJuggling(a, 3)));
    }

    @Test
    public void testRotationLeftByJuggling4() {
        int[] a = {1, 2, 3, 4, 5};
        Assert.assertEquals("[51234]", printArray(rotateLeftByJuggling(a, 4)));
    }

    @Test
    public void testRotationLeftByJuggling5() {
        int[] a = {1, 2, 3, 4, 5};
        Assert.assertEquals("[12345]", printArray(rotateLeftByJuggling(a, 5)));
    }

    @Test
    public void testRotationLeftByJuggling6() {
        int[] a = {1, 2, 3, 4, 5};
        Assert.assertEquals("[23451]", printArray(rotateLeftByJuggling(a, 6)));
    }

    @Test
    public void testRotationLeftByJuggling7() {
        int[] a = {1, 2, 3, 4, 5};
        Assert.assertEquals("[34512]", printArray(rotateLeftByJuggling(a, 7)));
    }

    @Test
    public void testRotationLeftByJugglingHCF() {
        int[] a = {1, 2, 3, 4};
        Assert.assertEquals("[3412]", printArray(rotateLeftByJuggling(a, 2)));
    }

    @Test
    public void testReverse() {
        int[] a = {1, 2, 3, 4, 5, 6};
        Assert.assertEquals("[321456]", printArray(reverse(a, 0, 2)));
        Assert.assertEquals("[321654]", printArray(reverse(a, 3, 5)));
        Assert.assertEquals("[456123]", printArray(reverse(a, 0, 5)));
    }

    @Test
    public void testRotationLeftByReversal1() {
        int[] a = {1, 2, 3, 4, 5};
        Assert.assertEquals("[23451]", printArray(rotateLeftByReversal(a, 1)));
    }

    @Test
    public void testRotationLeftByReversal2() {
        int[] a = {1, 2, 3, 4, 5};
        Assert.assertEquals("[34512]", printArray(rotateLeftByReversal(a, 2)));
    }

    @Test
    public void testRotationLeftByReversal3() {
        int[] a = {1, 2, 3, 4, 5};
        Assert.assertEquals("[45123]", printArray(rotateLeftByReversal(a, 3)));
    }

    @Test
    public void testRotationLeftByReversal4() {
        int[] a = {1, 2, 3, 4, 5};
        Assert.assertEquals("[51234]", printArray(rotateLeftByReversal(a, 4)));
    }

    @Test
    public void testRotationLeftByReversal5() {
        int[] a = {1, 2, 3, 4, 5};
        Assert.assertEquals("[12345]", printArray(rotateLeftByReversal(a, 5)));
    }

    @Test
    public void testRotationLeftByReversal6() {
        int[] a = {1, 2, 3, 4, 5};
        Assert.assertEquals("[23451]", printArray(rotateLeftByReversal(a, 6)));
    }

    @Test
    public void testRotationLeftByReversal7() {
        int[] a = {1, 2, 3, 4, 5};
        Assert.assertEquals("[34512]", printArray(rotateLeftByReversal(a, 7)));
    }

    @Test
    public void testRotationRightByReversal1() {
        int[] a = {1, 2, 3, 4, 5};
        Assert.assertEquals("[51234]", printArray(rotateRightByReversal(a, 1)));
    }

    @Test
    public void testRotationRightByReversal2() {
        int[] a = {1, 2, 3, 4, 5};
        Assert.assertEquals("[45123]", printArray(rotateRightByReversal(a, 2)));
    }

    @Test
    public void testRotationRightByReversal3() {
        int[] a = {1, 2, 3, 4, 5};
        Assert.assertEquals("[34512]", printArray(rotateRightByReversal(a, 3)));
    }

    @Test
    public void testRotationRightByReversal4() {
        int[] a = {1, 2, 3, 4, 5};
        Assert.assertEquals("[23451]", printArray(rotateRightByReversal(a, 4)));
    }

    @Test
    public void testRotationRightByReversal5() {
        int[] a = {1, 2, 3, 4, 5};
        Assert.assertEquals("[12345]", printArray(rotateRightByReversal(a, 5)));
    }

    @Test
    public void testRotationRightByReversal6() {
        int[] a = {1, 2, 3, 4, 5};
        Assert.assertEquals("[51234]", printArray(rotateRightByReversal(a, 6)));
    }

    @Test
    public void testRotationRightByReversal7() {
        int[] a = {1, 2, 3, 4, 5};
        Assert.assertEquals("[45123]", printArray(rotateRightByReversal(a, 7)));
    }

    @Test
    public void testFindSmallestMissingNumberSortedEmpty() {
        int[] a = {};
        Assert.assertEquals(0, findSmallestMissingNumberSorted(a, 0, 0));
        Assert.assertEquals(0, findSmallestMissingNumberSorted(null, 0, 0));
    }

    @Test
    public void testFindSmallestMissingNumberSorted() {
        int[] a = {0, 1, 2, 4, 5};
        Assert.assertEquals(3, findSmallestMissingNumberSorted(a, 0, 4));
    }

    @Test
    public void testFindSmallestMissingNumberSortedXOR() {
        int[] a = {0, 1, 2, 4, 5};
        Assert.assertEquals(3, findSmallestMissingNumberSortedXOR(a));
    }

    @Ignore
    @Test
    public void testFindSmallestMissingNumberSortedDup1() {
        int[] a = {0, 0, 1, 2, 4, 5};
        Assert.assertEquals(3, findSmallestMissingNumberSortedXOR(a));
    }

    @Ignore
    @Test
    public void testFindSmallestMissingNumberSortedDup2() {
        int[] a = {0, 0, 1, 2, 2, 4, 5};
        Assert.assertEquals(3, findSmallestMissingNumberSortedXOR(a));
    }

    @Test
    public void testFindSmallestMissingNumberSortedNoZero() {
        int[] a = {1, 2, 4, 5};
        Assert.assertEquals(0, findSmallestMissingNumberSorted(a, 0, 3));
    }

    @Test
    public void testFindSmallestMissingNumberSortedContiguous() {
        int[] a = {0, 1, 2, 3, 4, 5};
        Assert.assertEquals(6, findSmallestMissingNumberSorted(a, 0, 5));
    }

    @Test
    public void testFindSmallestMissingNumberUnsortedNegative1() {
        int[] a = {-1, 1, 2, 3};
        Assert.assertEquals(4, findSmallestMissingNumberUnsorted(a));
    }

    @Test
    public void testFindSmallestMissingNumberUnsortedNegative2() {
        int[] a = {-2, -3, -4, -8};
        Assert.assertEquals(1, findSmallestMissingNumberUnsorted(a));
    }

    @Test
    public void testFindSmallestMissingNumberUnsorted() {
        int[] a = {1, 2, 4, 5};
        Assert.assertEquals(3, findSmallestMissingNumberUnsorted(a));
    }

    @Test
    public void testFindSmallestMissingNumberUnsorted1() {
        int[] a = {0, 1, 2, 3};
        Assert.assertEquals(4, findSmallestMissingNumberUnsorted(a));
    }

    @Test
    public void testFindSmallestMissingNumberUnsorted2() {
        int[] a = {0, 1, 2, 4};
        Assert.assertEquals(3, findSmallestMissingNumberUnsorted(a));
    }

    @Test
    public void testFindSmallestMissingNumberUnsorted3() {
        int[] a = {4, 1, 2, 3};
        Assert.assertEquals(5, findSmallestMissingNumberUnsorted(a));
    }

    @Test
    public void testFindSmallestMissingNumberUnsorted4() {
        int[] a = {4, 2, 1, 3};
        Assert.assertEquals(5, findSmallestMissingNumberUnsorted(a));
    }

    @Test
    public void testFindSmallestMissingNumberUnsorted5() {
        int[] a = {4, 2, 3, 1};
        Assert.assertEquals(5, findSmallestMissingNumberUnsorted(a));
    }

    @Test
    public void testFindSmallestMissingNumberUnsorted6() {
        int[] a = {3, 4, -1, 1};
        Assert.assertEquals(2, findSmallestMissingNumberUnsorted(a));
    }

    @Test
    public void testFindSmallestMissingNumberUnsorted7() {
        int[] a = {4, 3, 2, 1};
        Assert.assertEquals(5, findSmallestMissingNumberUnsorted(a));
    }

    @Test
    public void testFindSmallestMissingNumberUnsortedOutlier() {
        int[] a = {40, 1, 2, 3};
        Assert.assertEquals(4, findSmallestMissingNumberUnsorted(a));
    }

    @Test
    public void testFindSmallestMissingNumberUnsortedDup() {
        int[] a = {4, 1, 4, 3};
        Assert.assertEquals(2, findSmallestMissingNumberUnsorted(a));
    }

    @Test
    public void testFindSmallestMissingNumberUnsortedEmpty() {
        int[] a = {};
        Assert.assertEquals(1, findSmallestMissingNumberUnsorted(a));
    }

    @Test
    public void testFindMaxContiguousSumSubArray() {
        Assert.assertEquals(0, findMaxContiguousSumSubArray(null));
        Assert.assertEquals(0, findMaxContiguousSumSubArray(new int[]{}));
        Assert.assertEquals(1, findMaxContiguousSumSubArray(new int[]{1}));
        Assert.assertEquals(-1, findMaxContiguousSumSubArray(new int[]{-1}));
        Assert.assertEquals(5, findMaxContiguousSumSubArray(new int[]{-1, 2, 3}));
        Assert.assertEquals(2, findMaxContiguousSumSubArray(new int[]{-10, 2, -5}));
        Assert.assertEquals(4, findMaxContiguousSumSubArray(new int[]{-1, 2, -1, 3}));
    }
}
