package com.sl.algorithms.core.sorting.median;

import org.junit.Assert;
import org.junit.Test;

public class MedianBySortingTest extends MedianFinderBySort {

    @Test
    public void baseTests() {
        {
            Integer[] emptyArray = null;
            try {
                findMedianBySort(emptyArray);
                Assert.fail("Exception should've been raised because array is empty");
            } catch (IllegalArgumentException iae) {
                Assert.assertEquals("Array is empty", iae.getMessage());
            }
        }
        {
            Integer[] emptyArray = new Integer[]{};
            try {
                findMedianBySort(emptyArray);
                Assert.fail("Exception should've been raised because array is empty");
            } catch (IllegalArgumentException iae) {
                Assert.assertEquals("Array is empty", iae.getMessage());
            }
        }
        {
            Double[] emptyArray = new Double[]{1.0, 2.0};
            try {
                findMedianBySort(emptyArray);
                Assert.fail("Exception should've been raised because Double is not supported yet");
            } catch (IllegalArgumentException iae) {
                Assert.assertEquals("Input has data-type which is not supported yet", iae.getMessage());
            }
        }
        {
            Integer[] singleElement = new Integer[]{1};
            try {
                findKthSmallestBySort(singleElement, 1);
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
            Assert.assertTrue(findMedianBySort(singleElement) == 1);
        }
        {
            Integer[] sample5Numbers = new Integer[]{3, 1, 2, 5, 4};
            Assert.assertTrue(findMedianBySort(sample5Numbers) == 3);
        }
        {
            String[] sample5Strings = new String[]{"E", "A", "B", "D", "C"};
            Assert.assertTrue("C".equals(findMedianBySort(sample5Strings)));
        }
        {
            Integer[] sampleData = new Integer[]{25, 21, 98, 100, 76, 22, 43, 60, 89, 87};
            Assert.assertTrue(findMedianBySort(sampleData) == 76);
        }
    }

    @Test
    public void testFindKthLargest() {
        {
            Integer[] singleElement = new Integer[]{1};
            Assert.assertTrue(findKthSmallestBySort(singleElement, 0) == 1);
        }
        {
            Integer[] sample5Numbers = new Integer[]{3, 1, 2, 5, 4};
            Assert.assertTrue(findKthSmallestBySort(sample5Numbers, 2) == 3);
        }
        {
            String[] sample5Strings = new String[]{"E", "A", "B", "D", "C"};
            Assert.assertTrue("B".equals(findKthSmallestBySort(sample5Strings, 1)));
        }
        {
            Integer[] sampleData = new Integer[]{25, 21, 98, 100, 76, 22, 43, 60, 89, 87};
            Assert.assertTrue(findKthSmallestBySort(sampleData, 3) == 43);
        }
    }
}
