package com.sl.algorithms.core.array.subarray;

import org.junit.Assert;
import org.junit.Test;

public class MaxSubSequenceSumTest extends MaxSubSequenceSum {

  @Test
  public void testFindMaxSubSequenceSum() {
    Assert.assertEquals(0, findMaxSubArraySum(null));
    Assert.assertEquals(0, findMaxSubArraySum(new int[]{}));
    Assert.assertEquals(1, findMaxSubArraySum(new int[]{1}));
    Assert.assertEquals(3, findMaxSubArraySum(new int[]{1, 2}));
    Assert.assertEquals(-1, findMaxSubArraySum(new int[]{-1}));
    Assert.assertEquals(-1, findMaxSubArraySum(new int[]{-1, -2}));
    Assert.assertEquals(1, findMaxSubArraySum(new int[]{-1, -2, 1}));
    Assert.assertEquals(5, findMaxSubArraySum(new int[]{-1, 2, 3}));
    Assert.assertEquals(2, findMaxSubArraySum(new int[]{-10, 2, -5}));
    Assert.assertEquals(5, findMaxSubArraySum(new int[]{-1, 2, -1, 3}));
    Assert.assertEquals(15, findMaxSubArraySum(new int[]{1, 2, 3, 4, 5}));
  }
}
