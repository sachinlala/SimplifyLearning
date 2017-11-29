package com.sl.algorithms.search;

import org.junit.Assert;
import org.junit.Test;

import static com.sl.algorithms.search.PeakElement.*;

public class PeakElementTest {

    @Test
    public void testPeakElement() {
        Assert.assertEquals(-1, findPeakElement(null));
        Assert.assertEquals(-1, findPeakElement(new int[]{}));
        Assert.assertEquals(0, findPeakElement(new int[]{-1,0}));
        Assert.assertEquals(3, findPeakElement(new int[]{1,2,3,2,1}));
        Assert.assertEquals(3, findPeakElement(new int[]{-15,-10,0,1,2,3,-1,-10,-15}));
        Assert.assertEquals(3, findPeakElement(new int[]{1,2,3,1}));
        Assert.assertEquals(2, findPeakElement(new int[]{1,2}));
        Assert.assertEquals(3, findPeakElement(new int[]{1,3,2,1,2,3,1}));
        Assert.assertEquals(3, findPeakElement(new int[]{1,2,1,2,3,1}));
        Assert.assertEquals(3, findPeakElement(new int[]{1,3,2,1,2,1}));
    }

    @Test
    public void testPeakElementLogTime() {
        Assert.assertEquals(-1, findPeakElementInLogTime(null));
        Assert.assertEquals(-1, findPeakElementInLogTime(new int[]{}));
        Assert.assertEquals(0, findPeakElementInLogTime(new int[]{-1,0}));
        Assert.assertEquals(3, findPeakElementInLogTime(new int[]{1,2,3,2,1}));
        Assert.assertEquals(3, findPeakElementInLogTime(new int[]{-15,-10,0,1,2,3,-1,-10,-15}));
        Assert.assertEquals(3, findPeakElementInLogTime(new int[]{1,2,3,1}));
        Assert.assertEquals(2, findPeakElementInLogTime(new int[]{1,2}));
        Assert.assertEquals(3, findPeakElementInLogTime(new int[]{1,3,2,1,2,3,1}));
        Assert.assertEquals(3, findPeakElementInLogTime(new int[]{1,2,1,2,3,1}));
        Assert.assertEquals(3, findPeakElementInLogTime(new int[]{1,3,2,1,2,1}));
    }
}