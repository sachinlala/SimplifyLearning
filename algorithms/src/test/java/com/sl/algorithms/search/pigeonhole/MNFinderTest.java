package com.sl.algorithms.search.pigeonhole;

import com.sl.algorithms.core.interfaces.search.pigeonhole.MissingNumberFinder;
import org.junit.Assert;
import org.junit.Test;

public class MNFinderTest {

  private MissingNumberFinder missingNumberFinder = new LinearTimeMNFinder();

  @Test
  public void testFindMissingNumber() {
    {
      Assert.assertEquals(0, missingNumberFinder.findMissingNumber(null));
      Assert.assertEquals(0, missingNumberFinder.findMissingNumber(new int[]{}));
    }
    { // numbers at (/almost) their expected indices
      Assert.assertEquals(3, missingNumberFinder.findMissingNumber(new int[]{0, 1, 2, 4, 5}));
      Assert.assertEquals(6, missingNumberFinder.findMissingNumber(new int[]{0, 1, 2, 3, 4, 5}));
    }
    { // jumbled
      Assert.assertEquals(1, missingNumberFinder.findMissingNumber(new int[]{0, 2, 4, 3}));
      Assert.assertEquals(0, missingNumberFinder.findMissingNumber(new int[]{1, 2, 4, 3}));
    }
    {
      // n (representing size of the array) itself is missing
      Assert.assertEquals(4, missingNumberFinder.findMissingNumber(new int[]{0, 1, 2, 3}));
    }
    {
      /**
       * This one's important to observe: if 0 was in scope of output, then XOR approach won't work rather we'll need to utilize binary search.
       */
      Assert.assertEquals(6, missingNumberFinder.findMissingNumber(new int[]{1, 2, 4, 5}));
    }
  }

  @Test
  public void testFindFirstMissingPositive() {
    { // null
      Assert.assertEquals(1, missingNumberFinder.findFirstMissingPositive(null));
      Assert.assertEquals(1, missingNumberFinder.findFirstMissingPositive(new int[]{}));
    }
    { // single element
      Assert.assertEquals(1, missingNumberFinder.findFirstMissingPositive(new int[]{-1}));
      Assert.assertEquals(1, missingNumberFinder.findFirstMissingPositive(new int[]{0}));
      Assert.assertEquals(2, missingNumberFinder.findFirstMissingPositive(new int[]{1}));
      Assert.assertEquals(1, missingNumberFinder.findFirstMissingPositive(new int[]{10}));
    }
    { // pair
      Assert.assertEquals(2, missingNumberFinder.findFirstMissingPositive(new int[]{1, 1}));
      Assert.assertEquals(3, missingNumberFinder.findFirstMissingPositive(new int[]{1, 2}));
      Assert.assertEquals(1, missingNumberFinder.findFirstMissingPositive(new int[]{2, 2}));
    }
    { // dupes
      Assert.assertEquals(1, missingNumberFinder.findFirstMissingPositive(new int[]{3, 3, 3}));
      Assert.assertEquals(3, missingNumberFinder.findFirstMissingPositive(new int[]{1, 1, 2, 2}));
      Assert.assertEquals(4, missingNumberFinder.findFirstMissingPositive(new int[]{1, 1, 2, 3}));
      Assert.assertEquals(3, missingNumberFinder.findFirstMissingPositive(new int[]{1, 1, 2, 4}));
      Assert.assertEquals(3,
          missingNumberFinder.findFirstMissingPositive(new int[]{0, 0, 1, 2, 2, 4, 5}));
      Assert.assertEquals(3,
          missingNumberFinder.findFirstMissingPositive(new int[]{0, 0, 1, 2, 4, 5}));
      Assert.assertEquals(4,
          missingNumberFinder.findFirstMissingPositive(new int[]{5, 2, 3, 2, 2, 1}));
      Assert.assertEquals(4,
          missingNumberFinder.findFirstMissingPositive(new int[]{-1, 1, 1, 2, 2, 3}));
      Assert.assertEquals(2, missingNumberFinder.findFirstMissingPositive(new int[]{4, 1, 4, 3}));
    }
    { // regular - numbers are (/almost) at their expected indices
      Assert.assertEquals(4, missingNumberFinder.findFirstMissingPositive(new int[]{0, 1, 2, 3}));
      Assert.assertEquals(4, missingNumberFinder.findFirstMissingPositive(new int[]{-1, 1, 2, 3}));
      Assert.assertEquals(3, missingNumberFinder.findFirstMissingPositive(new int[]{0, 1, 2, 4}));
      Assert.assertEquals(5, missingNumberFinder.findFirstMissingPositive(new int[]{4, 1, 2, 3}));
      Assert.assertEquals(4, missingNumberFinder.findFirstMissingPositive(new int[]{40, 1, 2, 3}));
    }
    { // jumbled
      Assert.assertEquals(5, missingNumberFinder.findFirstMissingPositive(new int[]{1, 2, 3, 4}));
      Assert.assertEquals(4, missingNumberFinder.findFirstMissingPositive(new int[]{1, 2, 3}));
      Assert.assertEquals(5, missingNumberFinder.findFirstMissingPositive(new int[]{1, 3, 2, 4}));
      Assert
          .assertEquals(1, missingNumberFinder.findFirstMissingPositive(new int[]{-2, -3, -4, -8}));
      Assert.assertEquals(3, missingNumberFinder.findFirstMissingPositive(new int[]{1, 2, 4, 5}));
      Assert.assertEquals(5, missingNumberFinder.findFirstMissingPositive(new int[]{4, 2, 1, 3}));
      Assert.assertEquals(5, missingNumberFinder.findFirstMissingPositive(new int[]{4, 2, 3, 1}));
      Assert.assertEquals(2, missingNumberFinder.findFirstMissingPositive(new int[]{3, 4, -1, 1}));
      Assert.assertEquals(5, missingNumberFinder.findFirstMissingPositive(new int[]{4, 3, 2, 1}));
    }
  }
}
