package com.sl.algorithms.core.array.subarray;

import java.util.Arrays;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

public class RunningProductTest extends RunningProduct {

  @Test
  public void testProductExceptSelf() {
    {
      assertNull(productExceptSelf(null));
    }
    {
      int[] emptyArray = new int[]{};
      assertTrue(Arrays.equals(emptyArray, productExceptSelf(emptyArray)));
    }
    {
      int[] nums = new int[]{0};
      assertTrue(Arrays.equals(new int[]{1}, productExceptSelf(nums)));
    }
    {
      int[] nums = new int[]{1};
      assertTrue(Arrays.equals(new int[]{1}, productExceptSelf(nums)));
    }
    {
      int[] nums = new int[]{1, 0};
      assertTrue(Arrays.equals(new int[]{0, 1}, productExceptSelf(nums)));
    }
    {
      int[] nums = new int[]{1, 0, 0};
      assertTrue(Arrays.equals(new int[]{0, 0, 0}, productExceptSelf(nums)));
    }
    {
      int[] nums = new int[]{1, 0, 2};
      assertTrue(Arrays.equals(new int[]{0, 2, 0}, productExceptSelf(nums)));
    }
    {
      int[] nums = new int[]{1, 2, 3, 4};
      assertTrue(Arrays.equals(new int[]{24, 12, 8, 6}, productExceptSelf(nums)));
    }
  }
}
