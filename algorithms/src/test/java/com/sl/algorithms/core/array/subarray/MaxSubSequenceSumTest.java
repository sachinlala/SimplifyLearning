package com.sl.algorithms.core.array.subarray;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

public class MaxSubSequenceSumTest extends MaxSubSequenceSum {

  @Test
  public void testFindMaxSubSequenceSum() {
    assertEquals(0, findMaxSubArraySum(null));
    assertEquals(0, findMaxSubArraySum(new int[]{}));
    assertEquals(1, findMaxSubArraySum(new int[]{1}));
    assertEquals(3, findMaxSubArraySum(new int[]{1, 2}));
    assertEquals(-1, findMaxSubArraySum(new int[]{-1}));
    assertEquals(-1, findMaxSubArraySum(new int[]{-1, -2}));
    assertEquals(1, findMaxSubArraySum(new int[]{-1, -2, 1}));
    assertEquals(5, findMaxSubArraySum(new int[]{-1, 2, 3}));
    assertEquals(2, findMaxSubArraySum(new int[]{-10, 2, -5}));
    assertEquals(5, findMaxSubArraySum(new int[]{-1, 2, -1, 3}));
    assertEquals(15, findMaxSubArraySum(new int[]{1, 2, 3, 4, 5}));
  }
}
