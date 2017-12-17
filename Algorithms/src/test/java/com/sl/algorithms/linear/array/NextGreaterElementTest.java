package com.sl.algorithms.linear.array;

import org.junit.Assert;
import org.junit.Test;

import static com.sl.algorithms.core.linear.ArrayOps.printArray;
import static com.sl.algorithms.linear.array.NGECircularArray.findNGEInCircularArray;
import static com.sl.algorithms.linear.array.NGERegularArray.findDaysToWarmth;

public class NextGreaterElementTest extends NextGreaterElement {

    @Test
    public void testFindDaysToWarmthBruteForce() {
        Assert.assertEquals("[1,1,1,1,0]", printArray(findDaysToWarmthBruteForce(new int[]{1, 2, 3, 4, 5})));
        Assert.assertEquals("[1,1,4,2,1,1,0,0]", printArray(findDaysToWarmthBruteForce(new int[]{73, 74, 75, 71, 69, 72, 76, 73})));
    }

    @Test
    public void testFindDaysToWarmth() {
        Assert.assertEquals("[1,1,1,1,0]", printArray(findDaysToWarmth(new int[]{1, 2, 3, 4, 5})));
        Assert.assertEquals("[1,1,4,2,1,1,0,0]", printArray(findDaysToWarmth(new int[]{73, 74, 75, 71, 69, 72, 76, 73})));
    }

    @Test
    public void testFindNGEInCircularArray() {
        Assert.assertEquals("[2,-1,2]", printArray(findNGEInCircularArray(new int[]{1, 2, 1})));
        Assert.assertEquals("[5,-1,5]", printArray(findNGEInCircularArray(new int[]{3,5,4})));
        Assert.assertEquals("[2,3,4,5,-1]", printArray(findNGEInCircularArray(new int[]{1, 2, 3, 4, 5})));
        Assert.assertEquals("[74,75,76,72,72,76,-1,74]", printArray(findNGEInCircularArray(new int[]{73, 74, 75, 71, 69, 72, 76, 73})));
    }
}
