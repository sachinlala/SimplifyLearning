package com.sl.algorithms.core.linear.array.rotation;

import org.junit.Assert;
import org.junit.Test;

import static com.sl.algorithms.core.utils.ArrayOps.printArray;

@SuppressWarnings("unchecked")
public class BruteForceRotationTest extends BruteForceRotation {
    @Test
    public void testRotationLeft() {
        Assert.assertEquals("[2,3,4,5,1]", printArray(rotate(new Integer[]{1, 2, 3, 4, 5}, 1, false)));
        Assert.assertEquals("[3,4,5,1,2]", printArray(rotate(new Integer[]{1, 2, 3, 4, 5}, 2, false)));
        Assert.assertEquals("[4,5,1,2,3]", printArray(rotate(new Integer[]{1, 2, 3, 4, 5}, 3, false)));
        Assert.assertEquals("[5,1,2,3,4]", printArray(rotate(new Integer[]{1, 2, 3, 4, 5}, 4, false)));
        Assert.assertEquals("[1,2,3,4,5]", printArray(rotate(new Integer[]{1, 2, 3, 4, 5}, 5, false)));
        Assert.assertEquals("[2,3,4,5,1]", printArray(rotate(new Integer[]{1, 2, 3, 4, 5}, 6, false)));
    }

    @Test
    public void testRotationRight() {
        Assert.assertEquals("[5,1,2,3,4]", printArray(rotate(new Integer[]{1, 2, 3, 4, 5}, 1, true)));
        Assert.assertEquals("[4,5,1,2,3]", printArray(rotate(new Integer[]{1, 2, 3, 4, 5}, 2, true)));
        Assert.assertEquals("[3,4,5,1,2]", printArray(rotate(new Integer[]{1, 2, 3, 4, 5}, 3, true)));
        Assert.assertEquals("[2,3,4,5,1]", printArray(rotate(new Integer[]{1, 2, 3, 4, 5}, 4, true)));
        Assert.assertEquals("[1,2,3,4,5]", printArray(rotate(new Integer[]{1, 2, 3, 4, 5}, 5, true)));
        Assert.assertEquals("[5,1,2,3,4]", printArray(rotate(new Integer[]{1, 2, 3, 4, 5}, 6, true)));
    }

    @Test
    public void testRotationWithSpace() {
        Assert.assertEquals("[2,3,4,5,1]", printArray(rotateLeftWithSpace(new Integer[]{1, 2, 3, 4, 5}, 1)));
        Assert.assertEquals("[3,4,5,1,2]", printArray(rotateLeftWithSpace(new Integer[]{1, 2, 3, 4, 5}, 2)));
        Assert.assertEquals("[4,5,1,2,3]", printArray(rotateLeftWithSpace(new Integer[]{1, 2, 3, 4, 5}, 3)));
        Assert.assertEquals("[5,1,2,3,4]", printArray(rotateLeftWithSpace(new Integer[]{1, 2, 3, 4, 5}, 4)));
        Assert.assertEquals("[1,2,3,4,5]", printArray(rotateLeftWithSpace(new Integer[]{1, 2, 3, 4, 5}, 5)));
        Assert.assertEquals("[2,3,4,5,1]", printArray(rotateLeftWithSpace(new Integer[]{1, 2, 3, 4, 5}, 6)));
    }
}
