package com.sl.algorithms.array;

import org.junit.Assert;
import org.junit.Test;
import static com.sl.algorithms.array.ArrayTraversal.*;

public class ArrayTraversalTest {
    @Test
    public void testRotationLeft1() {
        int[] a = {1, 2, 3, 4, 5};
        Assert.assertEquals("[2,3,4,5,1]", printArray(rotateLeft(a, 1)));
    }

    @Test
    public void testRotationLeft2() {
        int[] a = {1, 2, 3, 4, 5};
        Assert.assertEquals("[3,4,5,1,2]", printArray(rotateLeft(a, 2)));
    }

    @Test
    public void testRotationLeft3() {
        int[] a = {1, 2, 3, 4, 5};
        Assert.assertEquals("[4,5,1,2,3]", printArray(rotateLeft(a, 3)));
    }

    @Test
    public void testRotationLeft4() {
        int[] a = {1, 2, 3, 4, 5};
        Assert.assertEquals("[5,1,2,3,4]", printArray(rotateLeft(a, 4)));
    }

    @Test
    public void testRotationLeft5() {
        int[] a = {1, 2, 3, 4, 5};
        Assert.assertEquals("[1,2,3,4,5]", printArray(rotateLeft(a, 5)));
    }

    @Test
    public void testRotationLeft6() {
        int[] a = {1, 2, 3, 4, 5};
        Assert.assertEquals("[2,3,4,5,1]", printArray(rotateLeft(a, 6)));
    }

    @Test
    public void testRotationLeft7() {
        int[] a = {1, 2, 3, 4, 5};
        Assert.assertEquals("[3,4,5,1,2]", printArray(rotateLeft(a, 7)));
    }

    @Test
    public void testRotationRight1() {
        int[] a = {1, 2, 3, 4, 5};
        Assert.assertEquals("[5,1,2,3,4]", printArray(rotateRight(a, 1)));
    }

    @Test
    public void testRotationRight2() {
        int[] a = {1, 2, 3, 4, 5};
        Assert.assertEquals("[4,5,1,2,3]", printArray(rotateRight(a, 2)));
    }

    @Test
    public void testRotationRight3() {
        int[] a = {1, 2, 3, 4, 5};
        Assert.assertEquals("[3,4,5,1,2]", printArray(rotateRight(a, 3)));
    }

    @Test
    public void testRotationRight4() {
        int[] a = {1, 2, 3, 4, 5};
        Assert.assertEquals("[2,3,4,5,1]", printArray(rotateRight(a, 4)));
    }

    @Test
    public void testRotationRight5() {
        int[] a = {1, 2, 3, 4, 5};
        Assert.assertEquals("[1,2,3,4,5]", printArray(rotateRight(a, 5)));
    }

    @Test
    public void testRotationRight6() {
        int[] a = {1, 2, 3, 4, 5};
        Assert.assertEquals("[5,1,2,3,4]", printArray(rotateRight(a, 6)));
    }

    @Test
    public void testRotationRight7() {
        int[] a = {1, 2, 3, 4, 5};
        Assert.assertEquals("[4,5,1,2,3]", printArray(rotateRight(a, 7)));
    }
}
