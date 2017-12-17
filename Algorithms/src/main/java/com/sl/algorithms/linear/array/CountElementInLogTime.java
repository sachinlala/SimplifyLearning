package com.sl.algorithms.linear.array;

public class CountElementInLogTime {

    CountElementInLogTime() {
        /**
         * This is a utility class.<br>
         */
    }

    // for reference only: O(n) time
    public static int countTargetElement(int[] nums, int target) {
        int count = 0;
        for (int num : nums) {
            if (num == target) {
                ++count;
            }
        }
        return count;
    }

    /**
     * Given a sorted linear of integers, find the number of times a given target element occurs in the linear.<br>
     * Solve in Logarithmic time.<br>
     */
    public static int countTargetElementSorted(int[] nums, int target) {
        int start=0, end=nums.length-1;
        int minIndex = findMinIndex(nums, start, end, target);
        if (minIndex < 0) {
            return 0;
        }
        int maxIndex = findMaxIndex(nums, minIndex, end, target);
        int count = maxIndex-minIndex+1;
        return count;
    }

    private static int findMinIndex(int[] nums, int start, int end, int target) {
        int minIndex = -1;
        while (start <= end) {
            int midPoint = start+(end-start)/2;
            int midValue = nums[midPoint];
            if (midValue == target && (midPoint==0 || target > nums[midPoint-1])) {
                minIndex = midPoint;
                break;
            } else if (midValue < target) {
                start = midPoint+1;
            } else {
                end = midPoint-1;
            }
        }
        return minIndex;
    }

    private static int findMaxIndex(int[] nums, int start, int end, int target) {
        int maxIndex = -1;
        while (start <= end) {
            int midPoint = start+(end-start)/2;
            int midValue = nums[midPoint];
            if (midValue == target && (midPoint==nums.length-1 || target < nums[midPoint+1])) {
                maxIndex = midPoint;
                break;
            } else if (midValue > target) {
                end = midPoint-1;
            } else {
                start = midPoint+1;
            }
        }
        return maxIndex;
    }
}
