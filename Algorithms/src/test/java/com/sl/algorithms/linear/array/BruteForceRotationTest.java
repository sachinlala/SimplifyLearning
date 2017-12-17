package com.sl.algorithms.linear.array;

import org.junit.Assert;
import org.junit.Test;

import static com.sl.algorithms.core.linear.ArrayOps.printArray;

public class BruteForceRotationTest extends BruteForceRotation {
    @Test
    public void testRotationLeft() {
        Assert.assertEquals("[2,3,4,5,1]", printArray(rotateLeft(new int[]{1, 2, 3, 4, 5}, 1)));
        Assert.assertEquals("[3,4,5,1,2]", printArray(rotateLeft(new int[]{1, 2, 3, 4, 5}, 2)));
        Assert.assertEquals("[4,5,1,2,3]", printArray(rotateLeft(new int[]{1, 2, 3, 4, 5}, 3)));
        Assert.assertEquals("[5,1,2,3,4]", printArray(rotateLeft(new int[]{1, 2, 3, 4, 5}, 4)));
        Assert.assertEquals("[1,2,3,4,5]", printArray(rotateLeft(new int[]{1, 2, 3, 4, 5}, 5)));
        Assert.assertEquals("[2,3,4,5,1]", printArray(rotateLeft(new int[]{1, 2, 3, 4, 5}, 6)));
    }

    @Test
    public void testRotationRight() {
        Assert.assertEquals("[5,1,2,3,4]", printArray(rotateRight(new int[]{1, 2, 3, 4, 5}, 1)));
        Assert.assertEquals("[4,5,1,2,3]", printArray(rotateRight(new int[]{1, 2, 3, 4, 5}, 2)));
        Assert.assertEquals("[3,4,5,1,2]", printArray(rotateRight(new int[]{1, 2, 3, 4, 5}, 3)));
        Assert.assertEquals("[2,3,4,5,1]", printArray(rotateRight(new int[]{1, 2, 3, 4, 5}, 4)));
        Assert.assertEquals("[1,2,3,4,5]", printArray(rotateRight(new int[]{1, 2, 3, 4, 5}, 5)));
        Assert.assertEquals("[5,1,2,3,4]", printArray(rotateRight(new int[]{1, 2, 3, 4, 5}, 6)));
    }

    @Test
    public void testRotationWithSpace() {
        Assert.assertEquals("[2,3,4,5,1]", printArray(rotateLeftWithSpace(new int[]{1, 2, 3, 4, 5}, 1)));
        Assert.assertEquals("[3,4,5,1,2]", printArray(rotateLeftWithSpace(new int[]{1, 2, 3, 4, 5}, 2)));
        Assert.assertEquals("[4,5,1,2,3]", printArray(rotateLeftWithSpace(new int[]{1, 2, 3, 4, 5}, 3)));
        Assert.assertEquals("[5,1,2,3,4]", printArray(rotateLeftWithSpace(new int[]{1, 2, 3, 4, 5}, 4)));
        Assert.assertEquals("[1,2,3,4,5]", printArray(rotateLeftWithSpace(new int[]{1, 2, 3, 4, 5}, 5)));
        Assert.assertEquals("[2,3,4,5,1]", printArray(rotateLeftWithSpace(new int[]{1, 2, 3, 4, 5}, 6)));
    }
}
