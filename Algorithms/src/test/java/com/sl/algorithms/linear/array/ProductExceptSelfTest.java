package com.sl.algorithms.linear.array;

import org.junit.Assert;
import org.junit.Test;

import static com.sl.algorithms.core.linear.ArrayOps.printArray;

public class ProductExceptSelfTest extends ProductExceptSelf {
    @Test
    public void testProductExceptSelf() {
        Assert.assertEquals("[]", printArray(ProductExceptSelf.productExceptSelf(null)));
        Assert.assertEquals("[]", printArray(ProductExceptSelf.productExceptSelf(new int[]{})));
        Assert.assertEquals("[1]", printArray(ProductExceptSelf.productExceptSelf(new int[]{0})));
        Assert.assertEquals("[1]", printArray(ProductExceptSelf.productExceptSelf(new int[]{1})));
        Assert.assertEquals("[0,1]", printArray(ProductExceptSelf.productExceptSelf(new int[]{1, 0})));
        Assert.assertEquals("[0,0,0]", printArray(ProductExceptSelf.productExceptSelf(new int[]{1, 0, 0})));
        Assert.assertEquals("[0,2,0]", printArray(ProductExceptSelf.productExceptSelf(new int[]{1, 0, 2})));
        Assert.assertEquals("[24,12,8,6]", printArray(ProductExceptSelf.productExceptSelf(new int[]{1, 2, 3, 4})));
    }
}
