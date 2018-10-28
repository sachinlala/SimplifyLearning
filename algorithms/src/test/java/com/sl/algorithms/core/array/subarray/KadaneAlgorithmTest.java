package com.sl.algorithms.core.array.subarray;

import org.junit.Assert;
import org.junit.Test;

public class KadaneAlgorithmTest extends KadaneAlgorithm {

  @Test
  public void testFindMaxSubArraySum() {
    try {
      findMaxSubArraySum(null);
      Assert.fail("Exception should've been raised");
    } catch (IllegalArgumentException iae) {
      Assert.assertNotNull(iae);
    }
    try {
      findMaxSubArraySum(new int[]{});
      Assert.fail("Exception should've been raised");
    } catch (IllegalArgumentException iae) {
      Assert.assertNotNull(iae);
    }
    Assert.assertEquals(1, findMaxSubArraySum(new int[]{1}));
    Assert.assertEquals(3, findMaxSubArraySum(new int[]{1, 2}));
    Assert.assertEquals(-1, findMaxSubArraySum(new int[]{-1}));
    Assert.assertEquals(-1, findMaxSubArraySum(new int[]{-1, -2}));
    Assert.assertEquals(1, findMaxSubArraySum(new int[]{-1, -2, 1}));
    Assert.assertEquals(5, findMaxSubArraySum(new int[]{-1, 2, 3}));
    Assert.assertEquals(2, findMaxSubArraySum(new int[]{-10, 2, -5}));
    Assert.assertEquals(4, findMaxSubArraySum(new int[]{-1, 2, -1, 3}));
    Assert.assertEquals(15, findMaxSubArraySum(new int[]{1, 2, 3, 4, 5}));
    Assert.assertEquals(2, findMaxSubArraySum(new int[]{0, 2}));
    Assert.assertEquals(3, findMaxSubArraySum(new int[]{-2, 3, -4}));
    Assert.assertEquals(6, findMaxSubArraySum(new int[]{3, -1, 4}));
  }

  @Test
  public void testFindMaxSubArrayProduct() {
    try {
      findMaxSubArrayProduct(null);
      Assert.fail("Exception should've been raised");
    } catch (IllegalArgumentException iae) {
      Assert.assertNotNull(iae);
    }
    try {
      findMaxSubArrayProduct(new int[]{});
      Assert.fail("Exception should've been raised");
    } catch (IllegalArgumentException iae) {
      Assert.assertNotNull(iae);
    }
    Assert.assertEquals(1, findMaxSubArrayProduct(new int[]{1}));
    Assert.assertEquals(2, findMaxSubArrayProduct(new int[]{1, 2}));
    Assert.assertEquals(-1, findMaxSubArrayProduct(new int[]{-1}));
    Assert.assertEquals(2, findMaxSubArrayProduct(new int[]{-1, -2}));
    Assert.assertEquals(2, findMaxSubArrayProduct(new int[]{-1, -2, 1}));
    Assert.assertEquals(6, findMaxSubArrayProduct(new int[]{-1, 2, 3}));
    Assert.assertEquals(100, findMaxSubArrayProduct(new int[]{-10, 2, -5}));
    Assert.assertEquals(6, findMaxSubArrayProduct(new int[]{-1, 2, -1, 3}));
    Assert.assertEquals(120, findMaxSubArrayProduct(new int[]{1, 2, 3, 4, 5}));
    Assert.assertEquals(-2, findMaxSubArrayProduct(new int[]{-2}));
    Assert.assertEquals(6, findMaxSubArrayProduct(new int[]{2, 3, -2, 4}));
    Assert.assertEquals(12, findMaxSubArrayProduct(new int[]{-4, -3}));
    Assert.assertEquals(2, findMaxSubArrayProduct(new int[]{0, 2}));
    Assert.assertEquals(24, findMaxSubArrayProduct(new int[]{-2, 3, -4}));
    Assert.assertEquals(4, findMaxSubArrayProduct(new int[]{3, -1, 4}));
  }
}
