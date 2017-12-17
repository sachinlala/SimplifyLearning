package com.sl.algorithms.linear.array;

import org.junit.Assert;
import org.junit.Test;

public class PeakElementTest extends PeakElement {

    @Test
    public void testPeakElement() {
        try {
            findPeakElement(null);
            Assert.fail("Empty linear should have failed");
        } catch (IllegalArgumentException iea) {
            Assert.assertEquals("Empty Array", iea.getMessage());
        }
        try {
            findPeakElement(new int[]{});
            Assert.fail("Empty linear should have failed");
        } catch (IllegalArgumentException iea) {
            Assert.assertEquals("Empty Array", iea.getMessage());
        }
        Assert.assertEquals(1, findPeakElement(new int[]{1}));
        Assert.assertEquals(0, findPeakElement(new int[]{-1,0}));
        Assert.assertEquals(3, findPeakElement(new int[]{1,2,3,2,1}));
        Assert.assertEquals(3, findPeakElement(new int[]{-15,-10,0,1,2,3,-1,-10,-15}));
        Assert.assertEquals(3, findPeakElement(new int[]{1,2,3,1}));
        Assert.assertEquals(2, findPeakElement(new int[]{1,2}));
        Assert.assertEquals(3, findPeakElement(new int[]{1,3,2,1,2,3,1}));
        Assert.assertEquals(3, findPeakElement(new int[]{1,2,1,2,3,1}));
        Assert.assertEquals(3, findPeakElement(new int[]{1,3,2,1,2,1}));
        Assert.assertEquals(3, findPeakElement(new int[]{1,3,1,2,2,1}));
    }

    @Test
    public void testPeakElementLogTime() {
        try {
            findPeakElementInLogTime(null);
            Assert.fail("Empty linear should have failed");
        } catch (IllegalArgumentException iea) {
            Assert.assertEquals("Empty Array", iea.getMessage());
        }
        try {
            findPeakElementInLogTime(new int[]{});
            Assert.fail("Empty linear should have failed");
        } catch (IllegalArgumentException iea) {
            Assert.assertEquals("Empty Array", iea.getMessage());
        }
        Assert.assertEquals(1, findPeakElementInLogTime(new int[]{1}));
        Assert.assertEquals(0, findPeakElementInLogTime(new int[]{-1,0}));
        Assert.assertEquals(3, findPeakElementInLogTime(new int[]{1,2,3,2,1}));
        Assert.assertEquals(3, findPeakElementInLogTime(new int[]{-15,-10,0,1,2,3,-1,-10,-15}));
        Assert.assertEquals(3, findPeakElementInLogTime(new int[]{1,2,3,1}));
        Assert.assertEquals(2, findPeakElementInLogTime(new int[]{1,2}));
        Assert.assertEquals(3, findPeakElementInLogTime(new int[]{1,3,2,1,2,3,1}));
        Assert.assertEquals(3, findPeakElementInLogTime(new int[]{1,2,1,2,3,1}));
    }
}