package com.sl.algorithms.array;

import org.junit.Assert;
import org.junit.Test;

import static com.sl.algorithms.core.ArrayOps.printArray;
import static com.sl.algorithms.array.PrepQuestions.*;

public class PrepQuestionsTest {

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

    @Test
    public void testCountTargetElementSorted() {
        Assert.assertEquals(countTargetElementSorted(new int[]{1,2,3,4,4}, 4), 2);
        Assert.assertEquals(countTargetElementSorted(new int[]{1,2,3,4,4}, 1), 1);
        Assert.assertEquals(countTargetElementSorted(new int[]{1,2,3,4,4}, -1), 0);
        Assert.assertEquals(countTargetElementSorted(new int[]{1,1,2,2,2,2,3}, 1), 2);
        Assert.assertEquals(countTargetElementSorted(new int[]{1,1,2,2,2,2,3}, 2), 4);
        Assert.assertEquals(countTargetElementSorted(new int[]{1,1,2,2,2,2,3}, 3), 1);
        Assert.assertEquals(countTargetElementSorted(new int[]{1,1,2,2,2,2,3}, 4), 0);
    }

    @Test
    public void testCountTargetElement() {
        Assert.assertEquals(countTargetElement(new int[]{4,1,3,2,4}, 4), 2);
        Assert.assertEquals(countTargetElement(new int[]{1,2,3,4,4}, 4), 2);
        Assert.assertEquals(countTargetElement(new int[]{10,100,2,1,3}, 1), 1);
        Assert.assertEquals(countTargetElement(new int[]{10,100,2,10,3}, 10), 2);
        Assert.assertEquals(countTargetElement(new int[]{1,2,3,4,4}, -1), 0);
        Assert.assertEquals(countTargetElement(new int[]{1,1,2,2,2,2,3}, 1), 2);
        Assert.assertEquals(countTargetElement(new int[]{1,1,2,2,2,2,3}, 2), 4);
        Assert.assertEquals(countTargetElement(new int[]{1,1,2,2,2,2,3}, 3), 1);
        Assert.assertEquals(countTargetElement(new int[]{1,1,2,2,2,2,3}, 4), 0);
    }
}
