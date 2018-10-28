package com.sl.algorithms.core.array.subarray;

import java.util.Arrays;
import org.junit.Assert;
import org.junit.Test;

public class RunningProductTest extends RunningProduct {

  @Test
  public void testProductExceptSelf() {
    {
      Assert.assertNull(productExceptSelf(null));
    }
    {
      int[] emptyArray = new int[]{};
      Assert.assertTrue(Arrays.equals(emptyArray, productExceptSelf(emptyArray)));
    }
    {
      int[] nums = new int[]{0};
      Assert.assertTrue(Arrays.equals(new int[]{1}, productExceptSelf(nums)));
    }
    {
      int[] nums = new int[]{1};
      Assert.assertTrue(Arrays.equals(new int[]{1}, productExceptSelf(nums)));
    }
    {
      int[] nums = new int[]{1, 0};
      Assert.assertTrue(Arrays.equals(new int[]{0, 1}, productExceptSelf(nums)));
    }
    {
      int[] nums = new int[]{1, 0, 0};
      Assert.assertTrue(Arrays.equals(new int[]{0, 0, 0}, productExceptSelf(nums)));
    }
    {
      int[] nums = new int[]{1, 0, 2};
      Assert.assertTrue(Arrays.equals(new int[]{0, 2, 0}, productExceptSelf(nums)));
    }
    {
      int[] nums = new int[]{1, 2, 3, 4};
      Assert.assertTrue(Arrays.equals(new int[]{24, 12, 8, 6}, productExceptSelf(nums)));
    }
  }
}
