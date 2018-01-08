package com.sl.algorithms.core.linear.array.subarray;

import com.sl.algorithms.core.interfaces.subarray.SubArraySum;

/**
 * <br><a href="https://leetcode.com/problems/house-robber/description/">Problem Reference</a>
 */
public class MaxNonNeighboursSum implements SubArraySum {

    @Override
    public int findMaxSubArraySum(int[] nums) {
        if (nums == null || nums.length == 0) return 0;
        if (nums.length == 1) return nums[0];
        if (nums.length == 2) return Math.max(nums[0], nums[1]);
        return findMaxSubArraySum(nums, 0, nums.length-1);
    }

    protected int findMaxSubArraySum(int[] nums, int start, int end) {
        int maxSum=0, maxPrevLeftSum=nums[start], maxLeftSum=nums[++start];
        for (int i=++start; i<=end; i++) {
            maxSum = Math.max(maxLeftSum, maxPrevLeftSum+nums[i]);
            maxPrevLeftSum = Math.max(maxPrevLeftSum, maxLeftSum);
            maxLeftSum = maxSum;
        }
        return maxSum;
    }
}
