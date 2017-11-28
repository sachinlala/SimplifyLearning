package com.sl.algorithms.array;

import org.junit.Assert;
import org.junit.Test;

import static com.sl.algorithms.array.ArrayMaths.plusOne;
import static com.sl.algorithms.array.ArrayMaths.productExceptSelf;
import static com.sl.algorithms.array.ArrayOps.printArray;

public class ArrayMathsTest {
    @Test
    public void testPlusOne() {
        Assert.assertEquals("[]", printArray(plusOne(null)));
        Assert.assertEquals("[2]", printArray(plusOne(new int[]{1})));
        Assert.assertEquals("[1,0]", printArray(plusOne(new int[]{9})));
        Assert.assertEquals("[2,0]", printArray(plusOne(new int[]{1, 9})));
        Assert.assertEquals("[1,0,0]", printArray(plusOne(new int[]{9, 9})));
        Assert.assertEquals("[1,0,0,0]", printArray(plusOne(new int[]{9, 9, 9})));
    }

    @Test
    public void testProductExceptSelf() {
        Assert.assertEquals("[]", printArray(productExceptSelf(null)));
        Assert.assertEquals("[]", printArray(productExceptSelf(new int[]{})));
        Assert.assertEquals("[1]", printArray(productExceptSelf(new int[]{0})));
        Assert.assertEquals("[1]", printArray(productExceptSelf(new int[]{1})));
        Assert.assertEquals("[0,1]", printArray(productExceptSelf(new int[]{1, 0})));
        Assert.assertEquals("[0,0,0]", printArray(productExceptSelf(new int[]{1, 0, 0})));
        Assert.assertEquals("[0,2,0]", printArray(productExceptSelf(new int[]{1, 0, 2})));
        Assert.assertEquals("[24,12,8,6]", printArray(productExceptSelf(new int[]{1, 2, 3, 4})));
    }
}
