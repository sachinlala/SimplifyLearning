package com.sl.algorithms.core.array.subarray;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

public class MaxNonNeighboursCircularSumTest extends MaxNonNeighboursCircularSum {

  @Test
  public void testFindMaxSubArraySum() {
    assertEquals(0, findMaxSubArraySum(null));
    assertEquals(0, findMaxSubArraySum(new int[]{}));
    assertEquals(1, findMaxSubArraySum(new int[]{1}));
    assertEquals(2, findMaxSubArraySum(new int[]{1, 2}));
    assertEquals(3, findMaxSubArraySum(new int[]{1, 2, 3}));
    assertEquals(20, findMaxSubArraySum(new int[]{7, 8, 20}));
    assertEquals(25, findMaxSubArraySum(new int[]{2, 5, 10, 20}));
    assertEquals(8, findMaxSubArraySum(new int[]{1, 2, 3, 4, 5}));
    assertEquals(3, findMaxSubArraySum(new int[]{1, 3, 1}));
    assertEquals(3, findMaxSubArraySum(new int[]{2, 1, 1, 2}));
    assertEquals(19, findMaxSubArraySum(new int[]{1, 0, 3, 9, 2, 9, 10}));
    assertEquals(1, findMaxSubArraySum(new int[]{1, 1, 1}));
  }
}
