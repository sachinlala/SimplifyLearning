package com.sl.algorithms.traversal;

import org.junit.Assert;
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
}
