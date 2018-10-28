package com.sl.algorithms.core.array.subarray;

import org.junit.Assert;
import org.junit.Test;

public class MaxNonNeighboursSumTest extends MaxNonNeighboursSum {

  @Test
  public void testFindMaxSubArraySum() {
    Assert.assertEquals(0, findMaxSubArraySum(null));
    Assert.assertEquals(0, findMaxSubArraySum(new int[]{}));
    Assert.assertEquals(1, findMaxSubArraySum(new int[]{1}));
    Assert.assertEquals(2, findMaxSubArraySum(new int[]{1, 2}));
    Assert.assertEquals(4, findMaxSubArraySum(new int[]{1, 2, 3}));
    Assert.assertEquals(27, findMaxSubArraySum(new int[]{7, 8, 20}));
    Assert.assertEquals(25, findMaxSubArraySum(new int[]{2, 5, 10, 20}));
    Assert.assertEquals(9, findMaxSubArraySum(new int[]{1, 2, 3, 4, 5}));
    Assert.assertEquals(3, findMaxSubArraySum(new int[]{1, 3, 1}));
    Assert.assertEquals(4, findMaxSubArraySum(new int[]{2, 1, 1, 2}));
    Assert.assertEquals(20, findMaxSubArraySum(new int[]{1, 0, 3, 9, 2, 9, 10}));
  }
}
