package com.sl.algorithms.shuffle;

import com.sl.algorithms.core.interfaces.select.MedianFinder;
import com.sl.algorithms.core.interfaces.shuffle.ShufflingEngine;
import com.sl.algorithms.search.median.QuickSelectMedianFinder;
import org.junit.Assert;
import org.junit.Test;

public class ShufflingTest {

  private static MedianFinder<Integer> medianFinder = new QuickSelectMedianFinder<>();
  private ShufflingEngine<Integer> integerShufflingEngine;

  @Test
  public void assertNaiveShuffling() {
    integerShufflingEngine = new NaiveShuffle<>();
    testPRNG();
    testShuffling();
  }

  @Test
  public void assertFisherYatesKnuthShuffling() {
    integerShufflingEngine = new FisherYatesKnuthShuffle<>();
    testPRNG();
    testShuffling();
  }

  @Test
  public void assertSattoloShuffling() {
    integerShufflingEngine = new SattoloShuffle<>();
    testPRNG();
    testShuffling();
  }

  private void testPRNG() {
    {
      int i = integerShufflingEngine.getRandomNumberInRange(0, 5);
      int j = integerShufflingEngine.getRandomNumberInRange(0, 5);
      Assert.assertTrue(i <= 5 && i >= 0);
      Assert.assertTrue(j <= 5 && j >= 0);
    }
    {
      int min = 1;
      int max = 10;
      Integer[] randomNums = new Integer[10];
      for (int k = 0; k < 10; k++) {
        randomNums[k] = integerShufflingEngine.getRandomNumberInRange(min, max);
      }
      int minRandom = medianFinder.findMinimum(randomNums);
      int maxRandom = medianFinder.findMaximum(randomNums);
      Assert.assertTrue(minRandom >= min && maxRandom <= max);
    }
  }

  private void testShuffling() {
    {
      Integer[] sampleData = new Integer[]{1, 2, 3};
      integerShufflingEngine.shuffle(sampleData);
      int minRandom = medianFinder.findMinimum(sampleData);
      int maxRandom = medianFinder.findMaximum(sampleData);
      Assert.assertTrue(minRandom >= 1 && maxRandom <= 3);
    }
    {
      Integer[] sampleData = new Integer[]{0, 1, 2, 3, 4, 5, 6, 7, 8, 9};
      integerShufflingEngine.shuffle(sampleData);
      int minRandom = medianFinder.findMinimum(sampleData);
      int maxRandom = medianFinder.findMaximum(sampleData);
      Assert.assertTrue(minRandom >= 0 && maxRandom <= 9);
    }
  }
}
