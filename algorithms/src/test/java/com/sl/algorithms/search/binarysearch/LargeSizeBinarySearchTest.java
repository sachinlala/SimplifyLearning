package com.sl.algorithms.search.binarysearch;

import org.junit.Assert;
import org.junit.Test;

@SuppressWarnings("unchecked")
public class LargeSizeBinarySearchTest {

  @Test
  public void largeSizeTest() {
    IterativeBinarySearch binarySearch = new IterativeBinarySearch();
    int size = Integer.MAX_VALUE / 256; // /64 is w/in limits when primitive int[] is used
    Integer[] numArray = new Integer[size];
    for (int i = 0; i < size; i++) {
      numArray[i] = i;
    }
    Assert.assertEquals(6, binarySearch.findIndex(numArray, 6));
    Assert.assertEquals(65535, binarySearch.findIndex(numArray, 65535));
  }
}
