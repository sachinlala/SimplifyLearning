package com.sl.algorithms.core.search.peakelement;

import com.sl.algorithms.core.interfaces.base.BaseInterface;
import com.sl.algorithms.core.interfaces.search.PeakElementFinder;
import org.junit.Assert;
import org.junit.Test;

import static org.hamcrest.CoreMatchers.anyOf;
import static org.hamcrest.CoreMatchers.is;

@SuppressWarnings("unchecked")
public class PeakElementFinderTest<T extends Comparable> {

    private PeakElementFinder peakElementFinder;

    @Test
    public void testLinearTimePEFinder() {
        peakElementFinder = new LinearTimePEFinder();
        testFindPeakElement();
    }

    @Test
    public void testLogTimePEFinder() {
        peakElementFinder = new LogTimePEFinder();
        testFindPeakElement();
    }

    private void testFindPeakElement() {
        try {
            peakElementFinder.findPeakElement(null);
            Assert.fail("Empty linear should have failed");
        } catch (IllegalArgumentException iea) {
            Assert.assertEquals(BaseInterface.ARRAY_IS_EMPTY, iea.getMessage());
        }
        try {
            peakElementFinder.findPeakElement(new Integer[]{});
            Assert.fail("Empty linear should have failed");
        } catch (IllegalArgumentException iea) {
            Assert.assertEquals(BaseInterface.ARRAY_IS_EMPTY, iea.getMessage());
        }
        Assert.assertEquals(1, peakElementFinder.findPeakElement(new Integer[]{1}));
        Assert.assertEquals(0, peakElementFinder.findPeakElement(new Integer[]{-1, 0}));
        Assert.assertEquals(3, peakElementFinder.findPeakElement(new Integer[]{1, 2, 3, 2, 1}));
        Assert.assertEquals(3, peakElementFinder.findPeakElement(new Integer[]{-15, -10, 0, 1, 2, 3, -1, -10, -15}));
        Assert.assertEquals(3, peakElementFinder.findPeakElement(new Integer[]{1, 2, 3, 1}));
        Assert.assertEquals(2, peakElementFinder.findPeakElement(new Integer[]{1, 2}));
        Assert.assertEquals(3, peakElementFinder.findPeakElement(new Integer[]{1, 3, 2, 1, 2, 3, 1}));
        Assert.assertEquals(3, peakElementFinder.findPeakElement(new Integer[]{1, 2, 1, 2, 3, 1}));
        Assert.assertEquals(3, peakElementFinder.findPeakElement(new Integer[]{1, 3, 2, 1, 2, 1}));
        Assert.assertThat(peakElementFinder.findPeakElement(new Integer[]{1, 3, 1, 2, 2, 1}), anyOf(is(2), is(3)));
    }
}