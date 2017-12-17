package com.sl.algorithms.linear;

import org.junit.Assert;
import org.junit.Test;

import static com.sl.algorithms.linear.CountElementInLogTime.countTargetElement;
import static com.sl.algorithms.linear.CountElementInLogTime.countTargetElementSorted;

public class CountElementInLogTimeTest {

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
