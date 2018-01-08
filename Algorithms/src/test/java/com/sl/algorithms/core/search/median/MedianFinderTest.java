package com.sl.algorithms.core.search.median;

import com.sl.algorithms.core.interfaces.search.MedianFinder;
import org.junit.Assert;
import org.junit.Test;

import static org.hamcrest.CoreMatchers.anyOf;
import static org.hamcrest.CoreMatchers.is;

@SuppressWarnings("unchecked")
public class MedianFinderTest<T extends Comparable> {
    private MedianFinder<T> medianFinder;

    @Test
    public void testBruteForceMethod() {
        medianFinder = new BruteForceMedianFinder<T>();
        testNullAndEmpty();
        testFindKthSmallest();
        testFindMinMax();
        testFindMedian();
    }

    @Test
    public void testPQApproach() {
        medianFinder = new PQMedianFinder<T>();
        testNullAndEmpty();
        testFindKthSmallest();
        testFindMinMax();
        testFindMedian();
    }

    @Test
    public void testDnQOptimization() {
        medianFinder = new QuickSelectMedianFinder<>();
        testNullAndEmpty();
        testFindKthSmallest();
        testFindMinMax();
        testFindMedian();
    }

    public void testFindKthSmallest() {
        {
            Integer[] singleElementArray = new Integer[]{1};
            try {
                medianFinder.findKthSmallest((T[]) singleElementArray, 0);
                Assert.fail("Exception should've been raised because k != 1 for a single-element array");
            } catch (IllegalArgumentException iae) {
                Assert.assertEquals("k must be at least 1", iae.getMessage());
            }
            try {
                medianFinder.findKthSmallest((T[]) singleElementArray, 2);
                Assert.fail("Exception should've been raised because k != 1 for a single-element array");
            } catch (IllegalArgumentException iae) {
                Assert.assertEquals("k can only be 1 for a single-element array", iae.getMessage());
            }
            Assert.assertEquals(medianFinder.findKthSmallest((T[]) singleElementArray, 1), 1);
        }
        {
            Integer[] sample5Numbers = new Integer[]{3, 1, 2, 5, 4};
            Assert.assertEquals(medianFinder.findKthSmallest((T[]) sample5Numbers, 1), 1);
            Assert.assertEquals(medianFinder.findKthSmallest((T[]) sample5Numbers, 2), 2);
            Assert.assertEquals(medianFinder.findKthSmallest((T[]) sample5Numbers, 3), 3);
            Assert.assertEquals(medianFinder.findKthSmallest((T[]) sample5Numbers, 4), 4);
            Assert.assertEquals(medianFinder.findKthSmallest((T[]) sample5Numbers, 5), 5);
            try {
                medianFinder.findKthSmallest((T[]) sample5Numbers, 6);
                Assert.fail("Exception should've been raised because k should be less than the array length");
            } catch (IllegalArgumentException iae) {
                Assert.assertEquals("k is higher than the highest index", iae.getMessage());
            }
        }
        {
            Integer[] sample5Numbers = new Integer[]{3, 1, 2, 5, 4};
            Assert.assertEquals(medianFinder.findKthSmallest((T[]) sample5Numbers, 3), 3);
        }
        {
            String[] sample5Strings = new String[]{"E", "A", "B", "D", "C"};
            Assert.assertEquals(medianFinder.findKthSmallest((T[]) sample5Strings, 1), "A");
        }
        {
            Integer[] sampleData = new Integer[]{25, 21, 98, 100, 76, 22, 43, 60, 89, 87};
            Assert.assertEquals(medianFinder.findKthSmallest((T[]) sampleData, 3), 25);
        }
    }

    private void testFindMinMax() {
        {
            String[] sample5Strings = new String[]{"E", "A", "B", "D", "C"};
            Assert.assertEquals(medianFinder.findMinimum((T[]) sample5Strings), "A");
            Assert.assertEquals(medianFinder.findMaximum((T[]) sample5Strings), "E");
        }
        {
            Integer[] sampleData = new Integer[]{25, 21, 98, 100, 76, 22, 43, 60, 89, 87};
            Assert.assertEquals(medianFinder.findMinimum((T[]) sampleData), 21);
            Assert.assertEquals(medianFinder.findMaximum((T[]) sampleData), 100);
        }
    }

    public void testFindMedian() {
        {
            Integer[] singleElementArray = new Integer[]{1};
            Assert.assertEquals(medianFinder.findMedian((T[]) singleElementArray), 1);
        }
        {
            Integer[] sample5Numbers = new Integer[]{3, 1, 2, 5, 4};
            Assert.assertEquals(medianFinder.findMedian((T[]) sample5Numbers), 3);
        }
        {
            String[] sample5Strings = new String[]{"E", "A", "B", "D", "C"};
            Assert.assertEquals("C", medianFinder.findMedian((T[]) sample5Strings));
        }
        {
            Integer[] sampleData = new Integer[]{25, 21, 98, 100, 76, 22, 43, 60, 89, 87};
            // as this is an even count array, any of the 2 center elements is acceptable as the median (i.e. 60 or 76)
            // to get more precise, we could do an average of the middle 2 elements
            Assert.assertThat(medianFinder.findMedian((T[]) sampleData), anyOf(is(60), is(76))); // power of Hamcrest !
        }
    }

    public void testNullAndEmpty() {
        { // null
            try {
                medianFinder.findMedian(null);
                Assert.fail("Exception should've been raised because array is empty");
            } catch (IllegalArgumentException iae) {
                Assert.assertEquals("Array is empty", iae.getMessage());
            }
        }
        { // empty array
            Integer[] emptyArray = new Integer[]{};
            try {
                medianFinder.findMedian((T[]) emptyArray);
                Assert.fail("Exception should've been raised because array is empty");
            } catch (IllegalArgumentException iae) {
                Assert.assertEquals("Array is empty", iae.getMessage());
            }
        }
        { // data type not supported yet
            Double[] doubleArray = new Double[]{1.0, 2.0};
            try {
                medianFinder.findMedian((T[]) doubleArray);
                Assert.fail("Exception should've been raised because Double is not supported yet");
            } catch (IllegalArgumentException iae) {
                Assert.assertEquals("Input has data-type which is not supported yet", iae.getMessage());
            }
        }
        { // k > length
            Integer[] pairArray = new Integer[]{1, 2};
            try {
                medianFinder.findKthSmallest((T[]) pairArray, 3);
                Assert.fail("Exception should've been raised because k is higher than the highest index");
            } catch (IllegalArgumentException iae) {
                Assert.assertEquals("k is higher than the highest index", iae.getMessage());
            }
        }
    }
}
