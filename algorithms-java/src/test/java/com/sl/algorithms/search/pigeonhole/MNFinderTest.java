package com.sl.algorithms.search.pigeonhole;

import com.sl.algorithms.core.interfaces.search.pigeonhole.MissingNumberFinder;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

public class MNFinderTest {

  private MissingNumberFinder missingNumberFinder = new LinearTimeMNFinder();

  @Test
  public void testFindMissingNumber() {
    {
      assertEquals(0, missingNumberFinder.findMissingNumber(null));
      assertEquals(0, missingNumberFinder.findMissingNumber(new int[]{}));
    }
    { // numbers at (/almost) their expected indices
      assertEquals(3, missingNumberFinder.findMissingNumber(new int[]{0, 1, 2, 4, 5}));
      assertEquals(6, missingNumberFinder.findMissingNumber(new int[]{0, 1, 2, 3, 4, 5}));
    }
    { // jumbled
      assertEquals(1, missingNumberFinder.findMissingNumber(new int[]{0, 2, 4, 3}));
      assertEquals(0, missingNumberFinder.findMissingNumber(new int[]{1, 2, 4, 3}));
    }
    {
      // n (representing size of the array) itself is missing
      assertEquals(4, missingNumberFinder.findMissingNumber(new int[]{0, 1, 2, 3}));
    }
    {
      /**
       * This one's important to observe: if 0 was in scope of output, then XOR approach won't work rather we'll need to utilize binary search.
       */
      assertEquals(6, missingNumberFinder.findMissingNumber(new int[]{1, 2, 4, 5}));
    }
  }

  @Test
  public void testFindFirstMissingPositive() {
    { // null
      assertEquals(1, missingNumberFinder.findFirstMissingPositive(null));
      assertEquals(1, missingNumberFinder.findFirstMissingPositive(new int[]{}));
    }
    { // single element
      assertEquals(1, missingNumberFinder.findFirstMissingPositive(new int[]{-1}));
      assertEquals(1, missingNumberFinder.findFirstMissingPositive(new int[]{0}));
      assertEquals(2, missingNumberFinder.findFirstMissingPositive(new int[]{1}));
      assertEquals(1, missingNumberFinder.findFirstMissingPositive(new int[]{10}));
    }
    { // pair
      assertEquals(2, missingNumberFinder.findFirstMissingPositive(new int[]{1, 1}));
      assertEquals(3, missingNumberFinder.findFirstMissingPositive(new int[]{1, 2}));
      assertEquals(1, missingNumberFinder.findFirstMissingPositive(new int[]{2, 2}));
    }
    { // dupes
      assertEquals(1, missingNumberFinder.findFirstMissingPositive(new int[]{3, 3, 3}));
      assertEquals(3, missingNumberFinder.findFirstMissingPositive(new int[]{1, 1, 2, 2}));
      assertEquals(4, missingNumberFinder.findFirstMissingPositive(new int[]{1, 1, 2, 3}));
      assertEquals(3, missingNumberFinder.findFirstMissingPositive(new int[]{1, 1, 2, 4}));
      assertEquals(3,
          missingNumberFinder.findFirstMissingPositive(new int[]{0, 0, 1, 2, 2, 4, 5}));
      assertEquals(3,
          missingNumberFinder.findFirstMissingPositive(new int[]{0, 0, 1, 2, 4, 5}));
      assertEquals(4,
          missingNumberFinder.findFirstMissingPositive(new int[]{5, 2, 3, 2, 2, 1}));
      assertEquals(4,
          missingNumberFinder.findFirstMissingPositive(new int[]{-1, 1, 1, 2, 2, 3}));
      assertEquals(2, missingNumberFinder.findFirstMissingPositive(new int[]{4, 1, 4, 3}));
    }
    { // regular - numbers are (/almost) at their expected indices
      assertEquals(4, missingNumberFinder.findFirstMissingPositive(new int[]{0, 1, 2, 3}));
      assertEquals(4, missingNumberFinder.findFirstMissingPositive(new int[]{-1, 1, 2, 3}));
      assertEquals(3, missingNumberFinder.findFirstMissingPositive(new int[]{0, 1, 2, 4}));
      assertEquals(5, missingNumberFinder.findFirstMissingPositive(new int[]{4, 1, 2, 3}));
      assertEquals(4, missingNumberFinder.findFirstMissingPositive(new int[]{40, 1, 2, 3}));
    }
    { // jumbled
      assertEquals(5, missingNumberFinder.findFirstMissingPositive(new int[]{1, 2, 3, 4}));
      assertEquals(4, missingNumberFinder.findFirstMissingPositive(new int[]{1, 2, 3}));
      assertEquals(5, missingNumberFinder.findFirstMissingPositive(new int[]{1, 3, 2, 4}));
          assertEquals(1, missingNumberFinder.findFirstMissingPositive(new int[]{-2, -3, -4, -8}));
      assertEquals(3, missingNumberFinder.findFirstMissingPositive(new int[]{1, 2, 4, 5}));
      assertEquals(5, missingNumberFinder.findFirstMissingPositive(new int[]{4, 2, 1, 3}));
      assertEquals(5, missingNumberFinder.findFirstMissingPositive(new int[]{4, 2, 3, 1}));
      assertEquals(2, missingNumberFinder.findFirstMissingPositive(new int[]{3, 4, -1, 1}));
      assertEquals(5, missingNumberFinder.findFirstMissingPositive(new int[]{4, 3, 2, 1}));
    }
  }
}
