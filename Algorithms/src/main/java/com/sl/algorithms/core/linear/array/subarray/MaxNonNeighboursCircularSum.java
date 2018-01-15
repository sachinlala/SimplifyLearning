package com.sl.algorithms.core.linear.array.subarray;

/**
 * <br><a href="https://leetcode.com/problems/house-robber-ii/description/">Problem Reference</a>
 */
public class MaxNonNeighboursCircularSum extends MaxNonNeighboursSum {

    @Override
    public int findMaxSubArraySum(int[] nums) {
        if (nums == null || nums.length == 0) {
            return 0;
        }
        if (nums.length == 1) {
            return nums[0];
        }
        if (nums.length == 2) {
            return Math.max(nums[0], nums[1]);
        }
        if (nums.length == 3) {
            return Math.max(Math.max(nums[0], nums[1]), nums[2]);
        }
        int max1 = findMaxSubArraySum(nums, 0, nums.length - 2);
        int max2 = findMaxSubArraySum(nums, 1, nums.length - 1);
        return Math.max(max1, max2);
    }
}
