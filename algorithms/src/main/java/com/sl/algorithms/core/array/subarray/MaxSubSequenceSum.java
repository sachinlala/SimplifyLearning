package com.sl.algorithms.core.array.subarray;

import com.sl.algorithms.core.interfaces.subarray.SubArraySum;

/**
 * Maximum non-contiguous sub-array sum.
 */
public class MaxSubSequenceSum implements SubArraySum {

  @Override
  public int findMaxSubArraySum(int[] nums) {
    if (nums == null || nums.length == 0) {
      return 0;
    }
    if (nums.length == 1) {
      return nums[0];
    }
    int maxSum = Integer.MIN_VALUE;
    for (int num : nums) {
      if (num > 0) {
        maxSum += num;
      }
      maxSum = Math.max(num, maxSum);
    }
    return maxSum;
  }
}
