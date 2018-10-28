package com.sl.algorithms.core.array.subarray;

import com.sl.algorithms.core.interfaces.count.ProductCalculator;

public class RunningProduct implements ProductCalculator {

  /**
   * <br><a href="https://leetcode.com/problems/product-of-array-except-self/description/">Product
   * Except Self</a>
   */
  @Override
  public int[] productExceptSelf(int[] nums) {
    if (nums == null || nums.length == 0) {
      return nums;
    }

    int length = nums.length, left = 1, right = 1;
    int[] output = new int[length];
    output[0] = 1;

    // get left side products
    for (int i = 1; i < length; i++) {
      left *= nums[i - 1];
      output[i] = left;
    }

    // get right side and final products
    for (int i = length - 2; i >= 0; i--) {
      right *= nums[i + 1];
      output[i] *= right;
    }

    return output;
  }
}
