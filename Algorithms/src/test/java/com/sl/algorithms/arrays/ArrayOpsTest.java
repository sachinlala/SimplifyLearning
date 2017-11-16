package com.sl.algorithms.arrays;

import org.junit.Assert;
import org.junit.Test;

import static com.sl.algorithms.arrays.ArrayTraversal.*;
import static com.sl.algorithms.arrays.ArrayOps.*;

public class ArrayOpsTest {

    @Test
    public void testPlusOne() {
        Assert.assertEquals("[]", printArray(plusOne(null)));
        Assert.assertEquals("[2]", printArray(plusOne(new int[]{1})));
        Assert.assertEquals("[10]", printArray(plusOne(new int[]{9})));
        Assert.assertEquals("[20]", printArray(plusOne(new int[]{1, 9})));
        Assert.assertEquals("[100]", printArray(plusOne(new int[]{9, 9})));
        Assert.assertEquals("[1000]", printArray(plusOne(new int[]{9, 9, 9})));
    }
}
