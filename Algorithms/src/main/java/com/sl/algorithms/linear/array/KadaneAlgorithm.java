package com.sl.algorithms.linear.array;

// O(n) time and O(1) space algorithm-set to find max wi/n a series of numbers.<br>
public class KadaneAlgorithm {

    KadaneAlgorithm() {
        /**
         * This is a utility class.<br>
         */
    }

    public static int findMaxContiguousSumSubArray(int[] nums) {
        if (nums == null || nums.length == 0) {
            return 0;
        }
        if (nums.length == 1) {
            return nums[0];
        }
        int maxContiguousSum = Integer.MIN_VALUE;
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

    public static int findMaxNonNeighboursSumSubArray(int[] nums) {
        if (nums == null || nums.length == 0) {
            return 0;
        }
        if (nums.length == 1) {
            return nums[0];
        }
        if (nums.length == 2) {
            return Math.max(nums[0], nums[1]);
        }
        int maxSum = 0;
        int maxLeftSidePrevSum = nums[0];
        int maxLeftSideSum = nums[1];
        for (int i = 2; i < nums.length; i++) {
            maxLeftSidePrevSum += nums[i];
            maxSum = Math.max(maxLeftSideSum, maxLeftSidePrevSum);
            maxLeftSidePrevSum = maxLeftSideSum;
            maxLeftSideSum = maxSum;
        }
        return maxSum;
    }

    public static int findMaxSubSequenceSum(int[] nums) {
        if (nums == null || nums.length == 0) {
            return 0;
        }
        if (nums.length == 1) {
            return nums[0];
        }
        int maxSum = Integer.MIN_VALUE;
        int maxNum = nums[0];
        for (int num : nums) {
            if (num > 0) {
                maxSum += num;
            }
            maxNum = Math.max(maxSum, num);
            maxSum = Math.max(maxSum, maxNum);
        }
        return maxSum;
    }
}
