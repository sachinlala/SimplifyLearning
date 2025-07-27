package com.sl.algorithms.core.array.subarray;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

public class KadaneAlgorithmTest extends KadaneAlgorithm {

  @Test
  public void testFindMaxSubArraySum() {
    try {
      findMaxSubArraySum(null);
      fail("Exception should've been raised");
    } catch (IllegalArgumentException iae) {
      assertNotNull(iae);
    }
    try {
      findMaxSubArraySum(new int[]{});
      fail("Exception should've been raised");
    } catch (IllegalArgumentException iae) {
      assertNotNull(iae);
    }
    assertEquals(1, findMaxSubArraySum(new int[]{1}));
    assertEquals(3, findMaxSubArraySum(new int[]{1, 2}));
    assertEquals(-1, findMaxSubArraySum(new int[]{-1}));
    assertEquals(-1, findMaxSubArraySum(new int[]{-1, -2}));
    assertEquals(1, findMaxSubArraySum(new int[]{-1, -2, 1}));
    assertEquals(5, findMaxSubArraySum(new int[]{-1, 2, 3}));
    assertEquals(2, findMaxSubArraySum(new int[]{-10, 2, -5}));
    assertEquals(4, findMaxSubArraySum(new int[]{-1, 2, -1, 3}));
    assertEquals(15, findMaxSubArraySum(new int[]{1, 2, 3, 4, 5}));
    assertEquals(2, findMaxSubArraySum(new int[]{0, 2}));
    assertEquals(3, findMaxSubArraySum(new int[]{-2, 3, -4}));
    assertEquals(6, findMaxSubArraySum(new int[]{3, -1, 4}));
  }

  @Test
  public void testFindMaxSubArrayProduct() {
    try {
      findMaxSubArrayProduct(null);
      fail("Exception should've been raised");
    } catch (IllegalArgumentException iae) {
      assertNotNull(iae);
    }
    try {
      findMaxSubArrayProduct(new int[]{});
      fail("Exception should've been raised");
    } catch (IllegalArgumentException iae) {
      assertNotNull(iae);
    }
    assertEquals(1, findMaxSubArrayProduct(new int[]{1}));
    assertEquals(2, findMaxSubArrayProduct(new int[]{1, 2}));
    assertEquals(-1, findMaxSubArrayProduct(new int[]{-1}));
    assertEquals(2, findMaxSubArrayProduct(new int[]{-1, -2}));
    assertEquals(2, findMaxSubArrayProduct(new int[]{-1, -2, 1}));
    assertEquals(6, findMaxSubArrayProduct(new int[]{-1, 2, 3}));
    assertEquals(100, findMaxSubArrayProduct(new int[]{-10, 2, -5}));
    assertEquals(6, findMaxSubArrayProduct(new int[]{-1, 2, -1, 3}));
    assertEquals(120, findMaxSubArrayProduct(new int[]{1, 2, 3, 4, 5}));
    assertEquals(-2, findMaxSubArrayProduct(new int[]{-2}));
    assertEquals(6, findMaxSubArrayProduct(new int[]{2, 3, -2, 4}));
    assertEquals(12, findMaxSubArrayProduct(new int[]{-4, -3}));
    assertEquals(2, findMaxSubArrayProduct(new int[]{0, 2}));
    assertEquals(24, findMaxSubArrayProduct(new int[]{-2, 3, -4}));
    assertEquals(4, findMaxSubArrayProduct(new int[]{3, -1, 4}));
  }
}
