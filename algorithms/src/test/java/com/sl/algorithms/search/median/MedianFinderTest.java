package com.sl.algorithms.search.median;

import static org.hamcrest.CoreMatchers.anyOf;
import static org.hamcrest.CoreMatchers.is;

import com.sl.algorithms.core.interfaces.select.MedianFinder;
import com.sl.algorithms.core.interfaces.shuffle.ShufflingEngine;
import com.sl.algorithms.shuffle.FisherYatesKnuthShuffle;
import com.sl.algorithms.shuffle.NaiveShuffle;
import org.junit.Assert;
import org.junit.Test;

public class MedianFinderTest<T extends Comparable> {

  private MedianFinder<Integer> integerMedianFinder;
  private MedianFinder<String> stringMedianFinder;
  private ShufflingEngine<Integer> integerShufflingEngine = new FisherYatesKnuthShuffle<>();
  private ShufflingEngine<String> stringShufflingEngine = new NaiveShuffle<>();

  @Test
  public void testBruteForceMethod() {
    integerMedianFinder = new BruteForceMedianFinder<>();
    stringMedianFinder = new BruteForceMedianFinder<>();
    testNullAndEmpty();
    testFindKthSmallest();
    testFindMinMax();
    testFindMedian();
    testSpecialCases();
  }

  @Test
  public void testPQApproach() {
    integerMedianFinder = new PQMedianFinder<>();
    stringMedianFinder = new PQMedianFinder<>();
    testNullAndEmpty();
    testFindKthSmallest();
    testFindMinMax();
    testFindMedian();
    testSpecialCases();
  }

  @Test
  public void testQuickSelectApproach() {
    integerMedianFinder = new QuickSelectMedianFinder<>();
    stringMedianFinder = new QuickSelectMedianFinder<>();
    testNullAndEmpty();
    testFindKthSmallest();
    testFindMinMax();
    testFindMedian();
    testSpecialCases();
  }

  public void testFindKthSmallest() {
    {
      Integer[] singleElementArray = new Integer[]{1};
      try {
        integerMedianFinder.findKthSmallest(singleElementArray, 0);
        Assert.fail("Exception should've been raised because kMax != 1 for a single-element array");
      } catch (IllegalArgumentException iae) {
        Assert.assertEquals("kMax must be at least 1", iae.getMessage());
      }
      try {
        integerMedianFinder.findKthSmallest(singleElementArray, 2);
        Assert.fail("Exception should've been raised because kMax != 1 for a single-element array");
      } catch (IllegalArgumentException iae) {
        Assert.assertEquals("kMax can only be 1 for a single-element array", iae.getMessage());
      }
      Assert.assertTrue(integerMedianFinder.findKthSmallest(singleElementArray, 1) == 1);
    }
    {
      Integer[] sample5Numbers = new Integer[]{3, 1, 2, 5, 4};
      Assert.assertTrue(integerMedianFinder.findKthSmallest(sample5Numbers, 1) == 1);

      integerShufflingEngine.shuffle(sample5Numbers);
      Assert.assertTrue(integerMedianFinder.findKthSmallest(sample5Numbers, 2) == 2);

      integerShufflingEngine.shuffle(sample5Numbers);
      Assert.assertTrue(integerMedianFinder.findKthSmallest(sample5Numbers, 3) == 3);

      integerShufflingEngine.shuffle(sample5Numbers);
      Assert.assertTrue(integerMedianFinder.findKthSmallest(sample5Numbers, 4) == 4);

      integerShufflingEngine.shuffle(sample5Numbers);
      Assert.assertTrue(integerMedianFinder.findKthSmallest(sample5Numbers, 5) == 5);

      integerShufflingEngine.shuffle(sample5Numbers);
      try {
        integerMedianFinder.findKthSmallest(sample5Numbers, 6);
        Assert.fail(
            "Exception should've been raised because kMax should be less than the array length");
      } catch (IllegalArgumentException iae) {
        Assert.assertEquals("kMax is higher than the highest index", iae.getMessage());
      }
    }
    {
      String[] sample5Strings = new String[]{"E", "A", "B", "D", "C"};
      Assert.assertEquals(stringMedianFinder.findKthSmallest(sample5Strings, 1), "A");

      stringShufflingEngine.shuffle(sample5Strings);
      Assert.assertEquals(stringMedianFinder.findKthSmallest(sample5Strings, 1), "A");

      stringShufflingEngine.shuffle(sample5Strings);
      Assert.assertEquals(stringMedianFinder.findKthSmallest(sample5Strings, 2), "B");

      stringShufflingEngine.shuffle(sample5Strings);
      Assert.assertEquals(stringMedianFinder.findKthSmallest(sample5Strings, 5), "E");
    }
    {
      Integer[] sampleData = new Integer[]{25, 21, 98, 100, 76, 22, 43, 60, 89, 87};
      Assert.assertTrue(integerMedianFinder.findKthSmallest(sampleData, 3) == 25);
    }
  }

  public void testSpecialCases() {
    {
      Integer[] sampleDataNegative = new Integer[]{-1, 2, 0};
      Assert.assertTrue(integerMedianFinder.findKthSmallest(sampleDataNegative, 2) == 0);
    }
    {
      Integer[] shuffled = new Integer[]{5, 4, 3, 1, 2};
      Assert.assertTrue(integerMedianFinder.findKthSmallest(shuffled, 2) == 2);
    }
    {
      Integer[] reversed = new Integer[]{7, 6, 5, 4, 3, 2, 1};
      Assert.assertTrue(integerMedianFinder.findKthSmallest(reversed, 2) == 2);
      integerShufflingEngine.shuffle(reversed);
      Assert.assertTrue(integerMedianFinder.findKthSmallest(reversed, 7) == 7);
    }
  }

  private void testFindMinMax() {
    {
      String[] sample5Strings = new String[]{"E", "A", "B", "D", "C"};
      Assert.assertEquals(stringMedianFinder.findMinimum(sample5Strings), "A");

      stringShufflingEngine.shuffle(sample5Strings);
      Assert.assertEquals(stringMedianFinder.findMaximum(sample5Strings), "E");
    }
    {
      Integer[] sampleData = new Integer[]{25, 21, 98, 100, 76, 22, 43, 60, 89, 87};
      Assert.assertTrue(integerMedianFinder.findMinimum(sampleData) == 21);

      integerShufflingEngine.shuffle(sampleData);
      Assert.assertTrue(integerMedianFinder.findMaximum(sampleData) == 100);
    }
  }

  public void testFindMedian() {
    {
      Integer[] singleElementArray = new Integer[]{1};
      Assert.assertTrue(integerMedianFinder.findMedian(singleElementArray) == 1);
    }
    {
      Integer[] sample5Numbers = new Integer[]{3, 1, 2, 5, 4};
      Assert.assertTrue(integerMedianFinder.findMedian(sample5Numbers) == 3);
    }
    {
      String[] sample5Strings = new String[]{"E", "A", "B", "D", "C"};
      Assert.assertEquals("C", stringMedianFinder.findMedian(sample5Strings));
    }
    {
      Integer[] sampleData = new Integer[]{25, 21, 98, 100, 76, 22, 43, 60, 89, 87};
      // as this is an even count array, any of the 2 center elements is acceptable as the median (i.e. 60 or 76)
      // to get more precise, we could do an average of the middle 2 elements
      Assert.assertThat(integerMedianFinder.findMedian(sampleData),
          anyOf(is(60), is(76))); // power of Hamcrest !
    }
  }

  public void testNullAndEmpty() {
    { // null
      try {
        integerMedianFinder.findMedian(null);
        Assert.fail("Exception should've been raised because array is empty");
      } catch (IllegalArgumentException iae) {
        Assert.assertEquals("Array is empty", iae.getMessage());
      }
    }
    { // empty array
      Integer[] emptyArray = new Integer[]{};
      try {
        integerMedianFinder.findMedian(emptyArray);
        Assert.fail("Exception should've been raised because array is empty");
      } catch (IllegalArgumentException iae) {
        Assert.assertEquals("Array is empty", iae.getMessage());
      }
    }
    { // kMax > length
      Integer[] pairArray = new Integer[]{1, 2};
      try {
        integerMedianFinder.findKthSmallest(pairArray, 3);
        Assert
            .fail("Exception should've been raised because kMax is higher than the highest index");
      } catch (IllegalArgumentException iae) {
        Assert.assertEquals("kMax is higher than the highest index", iae.getMessage());
      }
    }
  }
}
