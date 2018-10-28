package com.sl.algorithms.core.array.subarray;

import com.sl.algorithms.core.interfaces.subarray.SubArrayProduct;
import com.sl.algorithms.core.interfaces.subarray.SubArraySum;

/**
 * <br><a href="https://leetcode.com/problems/maximum-subarray/description/">Problem
 * Reference</a><br>
 */
public class KadaneAlgorithm implements SubArraySum, SubArrayProduct {

  @Override
  public int findMaxSubArraySum(int[] nums) {
    checkIntArray(nums);
    if (nums.length == 1) {
      return nums[0];
    }
    Integer maxContiguousSum = Integer.MIN_VALUE;
    int maxTillHere = 0;
    for (int num : nums) {
      if (maxTillHere < 0) {
        maxTillHere = 0;
      }
      maxTillHere += num;
      maxContiguousSum = Math.max(maxContiguousSum, maxTillHere);
    }
    return maxContiguousSum;
  }

  @Override
  public int findMaxSubArrayProduct(int[] nums) {
    checkIntArray(nums);
    if (nums.length == 1) {
      return nums[0];
    }
    int maxProduct = Integer.MIN_VALUE, maxProductTillHere = 1, minProductTillHere = 1;
    for (int num : nums) {
      int product1 = maxProductTillHere * num;
      int product2 = minProductTillHere * num;
      maxProductTillHere = Math.max(num, Math.max(product1, product2));
      minProductTillHere = Math.min(num, Math.min(product1, product2));
      maxProduct = Math.max(maxProduct, maxProductTillHere);
    }
    return maxProduct;
  }
}
