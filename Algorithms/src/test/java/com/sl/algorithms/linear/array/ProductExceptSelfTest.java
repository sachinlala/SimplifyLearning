package com.sl.algorithms.linear.array;

import org.junit.Assert;
import org.junit.Test;

import static com.sl.algorithms.core.linear.array.ArrayOps.printArray;

public class ProductExceptSelfTest extends ProductExceptSelf {
    @Test
    public void testProductExceptSelf() {
        Assert.assertEquals("[]", printArray(productExceptSelf(null)));
        Assert.assertEquals("[]", printArray(productExceptSelf(new Integer[]{})));
        Assert.assertEquals("[1]", printArray(productExceptSelf(new Integer[]{0})));
        Assert.assertEquals("[1]", printArray(productExceptSelf(new Integer[]{1})));
        Assert.assertEquals("[0,1]", printArray(productExceptSelf(new Integer[]{1, 0})));
        Assert.assertEquals("[0,0,0]", printArray(productExceptSelf(new Integer[]{1, 0, 0})));
        Assert.assertEquals("[0,2,0]", printArray(productExceptSelf(new Integer[]{1, 0, 2})));
        Assert.assertEquals("[24,12,8,6]", printArray(productExceptSelf(new Integer[]{1, 2, 3, 4})));
    }
}
