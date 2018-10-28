package com.sl.algorithms.core.array.subarray;

import com.sl.algorithms.core.interfaces.subarray.SubArraySum;

/**
 * <br><a href="https://leetcode.com/problems/house-robber/description/">Problem Reference</a>
 */
public class MaxNonNeighboursSum implements SubArraySum {

  @Override
  public int findMaxSubArraySum(int[] nums) {
    if (nums == null || nums.length == 0) {
      return 0;
    }
    int n = nums.length;
    if (n == 1) {
      return nums[0];
    }
    if (n == 2) {
      return Math.max(nums[0], nums[1]);
    }
    return findMaxSubArraySum(nums, 0, n - 1);
  }

  int findMaxSubArraySum(int[] nums, int s, int e) {
    int maxSum = 0, maxPrevLeftSum = nums[s], maxLeftSum = nums[++s];
    for (int i = ++s; i <= e; i++) {
      maxSum = Math.max(maxLeftSum, maxPrevLeftSum + nums[i]);
      maxPrevLeftSum = Math.max(maxPrevLeftSum, maxLeftSum);
      maxLeftSum = maxSum;
    }
    return maxSum;
  }
}
