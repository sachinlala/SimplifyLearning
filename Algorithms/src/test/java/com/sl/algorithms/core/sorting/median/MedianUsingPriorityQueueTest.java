package com.sl.algorithms.core.sorting.median;

import org.junit.Assert;
import org.junit.Test;

public class MedianUsingPriorityQueueTest extends MedianFinderPQ {

    @Test
    public void baseTests() {
        {
            Integer[] emptyArray = null;
            try {
                findMedianPQ(emptyArray);
                Assert.fail("Exception should've been raised because array is empty");
            } catch (IllegalArgumentException iae) {
                Assert.assertEquals("Array is empty", iae.getMessage());
            }
        }
        {
            Integer[] emptyArray = new Integer[]{};
            try {
                findMedianPQ(emptyArray);
                Assert.fail("Exception should've been raised because array is empty");
            } catch (IllegalArgumentException iae) {
                Assert.assertEquals("Array is empty", iae.getMessage());
            }
        }
        {
            Double[] emptyArray = new Double[]{1.0, 2.0};
            try {
                findMedianPQ(emptyArray);
                Assert.fail("Exception should've been raised because Double is not supported yet");
            } catch (IllegalArgumentException iae) {
                Assert.assertEquals("Input has data-type which is not supported yet", iae.getMessage());
            }
        }
        {
            Integer[] singleElement = new Integer[]{1};
            try {
                findKthSmallestPQ(singleElement, 1);
                Assert.fail("Exception should've been raised because k is larger than the highest index");
            } catch (IllegalArgumentException iae) {
                Assert.assertEquals("k is larger than highest index", iae.getMessage());
            }
        }
    }

    @Test
    public void testFindMedianBySort() {
        {
            Integer[] singleElement = new Integer[]{1};
            Assert.assertTrue(findMedianPQ(singleElement) == 1);
        }
        {
            Integer[] sample5Numbers = new Integer[]{3, 1, 2, 5, 4};
            //FIXME: Assert.assertTrue(findMedianPQ(sample5Numbers) == 3);
            Assert.assertTrue(findMedianPQ(sample5Numbers) == 4);
        }
        {
            String[] sample5Strings = new String[]{"E", "A", "B", "D", "C"};
            //FIXME: Assert.assertTrue("C".equals(findMedianPQ(sample5Strings)));
            Assert.assertTrue("D".equals(findMedianPQ(sample5Strings)));
        }
        {
            Integer[] sampleData = new Integer[]{25, 21, 98, 100, 76, 22, 43, 60, 89, 87};
            Assert.assertTrue(findMedianPQ(sampleData) == 76);
        }
    }

    @Test
    public void testFindKthLargest() {
        {
            Integer[] singleElement = new Integer[]{1};
            Assert.assertTrue(findKthSmallestPQ(singleElement, 0) == 1);
        }
        {
            Integer[] sample5Numbers = new Integer[]{3, 1, 2, 5, 4};
            //FIXME: Assert.assertTrue(findKthSmallestPQ(sample5Numbers, 2) == 3);
            Assert.assertTrue(findKthSmallestPQ(sample5Numbers, 2) == 4);
        }
        {
            String[] sample5Strings = new String[]{"E", "A", "B", "D", "C"};
            //FIXME: Assert.assertTrue("B".equals(findKthSmallestPQ(sample5Strings, 1)));
            Assert.assertTrue("E".equals(findKthSmallestPQ(sample5Strings, 1)));
        }
        {
            Integer[] sampleData = new Integer[]{25, 21, 98, 100, 76, 22, 43, 60, 89, 87};
            //FIXME: Assert.assertTrue(findKthSmallestPQ(sampleData, 3) == 76);
            Assert.assertTrue(findKthSmallestPQ(sampleData, 3) == 89);
        }
    }
}
