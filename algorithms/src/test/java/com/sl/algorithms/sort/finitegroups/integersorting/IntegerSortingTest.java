package com.sl.algorithms.sort.finitegroups.integersorting;

import com.sl.algorithms.core.interfaces.sort.SortingEngine;
import com.sl.algorithms.sort.BaseTest;
import java.util.Arrays;
import org.junit.Assert;
import org.junit.Test;

public class IntegerSortingTest extends BaseTest {

  private SortingEngine<Integer> integerSortingEngine;

  @Test
  public void testCountingSort() {
    integerSortingEngine = new CountingSort<>();
    assertBaseCases(integerSortingEngine);
    testkRange();
  }

  @Test
  public void testRadixSort() {
    integerSortingEngine = new RadixSort<>();
    assertBaseCases(integerSortingEngine);
    testkRange();
    testkPlus();
  }

  private void testkRange() {
    { // 0 .. kMax/2 - 1
      Integer[] testData = new Integer[]{4, 4, 4, 1, 2, 2};
      Integer[] sortedData = new Integer[]{1, 2, 2, 4, 4, 4};
      integerSortingEngine.sort(testData);
      Assert.assertTrue(Arrays.equals(testData, sortedData));
    }
    { // almost sorted
      Integer[] testData = new Integer[]{1, 2, 4, 3};
      Integer[] sortedData = new Integer[]{1, 2, 3, 4};
      integerSortingEngine.sort(testData);
      Assert.assertTrue(Arrays.equals(testData, sortedData));
    }
    { // 1->kMax-1 are present
      Integer[] testData = new Integer[]{5, 7, 6, 1, 3, 1, 2, 3, 4, 4, 2, 2, 3, 1, 2, 8, 5, 6, 9, 1,
          2, 8, 6, 7};
      Integer[] sortedData = new Integer[]{1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 4, 4, 5, 5, 6, 6, 6,
          7, 7, 8, 8, 9};
      integerSortingEngine.sort(testData);
      Assert.assertTrue(Arrays.equals(testData, sortedData));
    }
    { // max number present is significantly less than kMax
      Integer[] testData = new Integer[]{1, 2, 3, 5, 4};
      Integer[] sortedData = new Integer[]{1, 2, 3, 4, 5};
      integerSortingEngine.sort(testData);
      Assert.assertTrue(Arrays.equals(testData, sortedData));
    }
    { // kMax-1 is present
      Integer[] testData = new Integer[]{9, 2, 1, 3, 9};
      Integer[] sortedData = new Integer[]{1, 2, 3, 9, 9};
      integerSortingEngine.sort(testData);
      Assert.assertTrue(Arrays.equals(testData, sortedData));
    }
    { // 1->kMax-1 are present
      Integer[] testData = new Integer[]{5, 7, 6, 1, 3, 1, 2, 3, 4, 4, 2, 2, 3, 1, 2, 8, 5, 6, 9, 1,
          2, 8, 6, 7};
      Integer[] sortedData = new Integer[]{1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 4, 4, 5, 5, 6, 6, 6,
          7, 7, 8, 8, 9};
      integerSortingEngine.sort(testData);
      Assert.assertTrue(Arrays.equals(testData, sortedData));
    }
    { // 0->kMax-1 are present
      Integer[] testData = new Integer[]{5, 7, 0, 6, 1, 3, 1, 2, 9, 3, 0, 4, 4, 2, 2, 3, 1, 2, 8, 5,
          6, 9, 1, 2, 8, 6, 7};
      Integer[] sortedData = new Integer[]{0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 4, 4, 5, 5, 6,
          6, 6, 7, 7, 8, 8, 9, 9};
      integerSortingEngine.sort(testData);
      Assert.assertTrue(Arrays.equals(testData, sortedData));
    }
  }

  private void testkPlus() {
    { // kMax is present
      Integer[] testData = new Integer[]{1, 2, 3, 10, 4};
      Integer[] sortedData = new Integer[]{1, 2, 3, 4, 10};
      integerSortingEngine.sort(testData);
      Assert.assertTrue(Arrays.equals(testData, sortedData));
    }
    {
      Integer[] testData = new Integer[]{50, 2, 45};
      Integer[] sortedData = new Integer[]{2, 45, 50};
      integerSortingEngine.sort(testData);
      Assert.assertTrue(Arrays.equals(testData, sortedData));
    }
    {
      Integer[] testData = new Integer[]{50, 2, 170};
      Integer[] sortedData = new Integer[]{2, 50, 170};
      integerSortingEngine.sort(testData);
      Assert.assertTrue(Arrays.equals(testData, sortedData));
    }
    {
      Integer[] testData = new Integer[]{170, 802, 2, 45};
      Integer[] sortedData = new Integer[]{2, 45, 170, 802};
      integerSortingEngine.sort(testData);
      Assert.assertTrue(Arrays.equals(testData, sortedData));
    }
    {
      Integer[] testData = new Integer[]{170, 45, 75, 90, 802, 24, 2, 66};
      Integer[] sortedData = new Integer[]{2, 24, 45, 66, 75, 90, 170, 802};
      integerSortingEngine.sort(testData);
      Assert.assertTrue(Arrays.equals(testData, sortedData));
    }
  }
}
