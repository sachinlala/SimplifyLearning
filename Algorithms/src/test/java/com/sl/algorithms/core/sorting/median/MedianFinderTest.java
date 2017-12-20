package com.sl.algorithms.core.sorting.median;

import org.junit.Assert;
import org.junit.Test;

public class MedianFinderTest extends MedianFinder {

    @Test
    public void baseTests() {
        {
            Integer[] emptyArray = null;
            try {
                findMedian(emptyArray);
                Assert.fail("Exception should've been raised because array is empty");
            } catch (IllegalArgumentException iae) {
                Assert.assertEquals("Array is empty", iae.getMessage());
            }
        }
        {
            Integer[] emptyArray = new Integer[]{};
            try {
                findMedian(emptyArray);
                Assert.fail("Exception should've been raised because array is empty");
            } catch (IllegalArgumentException iae) {
                Assert.assertEquals("Array is empty", iae.getMessage());
            }
        }
        {
            Double[] emptyArray = new Double[]{1.0, 2.0};
            try {
                findMedian(emptyArray);
                Assert.fail("Exception should've been raised because Double is not supported yet");
            } catch (IllegalArgumentException iae) {
                Assert.assertEquals("Input has data-type which is not supported yet", iae.getMessage());
            }
        }
    }

    @Test
    public void testFindMedian() {
        {
            Integer[] singleElement = new Integer[]{1};
            Assert.assertTrue(findMedian(singleElement) == 1);
        }
        {
            Integer[] sample5Numbers = new Integer[]{3, 1, 2, 5, 4};
            Assert.assertTrue(findMedian(sample5Numbers) == 3);
        }
        {
            String[] sample5Strings = new String[]{"E", "A", "B", "D", "C"};
            Assert.assertTrue("C".equals(findMedian(sample5Strings)));
        }
        {
            Integer[] sampleData = new Integer[]{25, 21, 98, 100, 76, 22, 43, 60, 89, 87};
            Assert.assertTrue(findMedian(sampleData) == 60);
        }
    }
}
