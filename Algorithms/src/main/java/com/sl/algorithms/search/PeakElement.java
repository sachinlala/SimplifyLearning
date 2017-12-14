package com.sl.algorithms.search;

import com.sl.algorithms.core.maths.Formulas;

/**
 * Given an array which is in ascending order till some point and then descending order till end, find peak element.<br>
 */
public class PeakElement {
    private PeakElement() {
        /**
         * This is a utility class.<br>
         */
    }

    /**
     * Linear algorithm to find the max in any series.<br>
     * // O(n)
     */
    public static int findPeakElement(int[] nums) throws IllegalArgumentException {
        if (nums == null || nums.length == 0) {
            throw new IllegalArgumentException("Empty Array"); // no peak element
        }
        if (nums.length == 1) {
            return nums[0];
        }
        int start=0, end=nums.length-1;
        while (start < end) {
            if (nums[start] < nums[end]) {
                start++;
            } else {
                end--;
            }
        }
        return nums[start];
    }

    /**
     * Logarithmic time to find peak in an array where values ascends and then descend.<br>
     * // O(log(n))
     */
    public static int findPeakElementInLogTime(int[] nums) {
        if (nums == null || nums.length == 0) {
            throw new IllegalArgumentException("Empty Array"); // no peak element
        }
        if (nums.length == 1) {
            return nums[0];
        }
        int start=0, end=nums.length-1;
        while (start < end) {
            int midPoint = Formulas.midPoint(start, end);
            if (nums[midPoint] > nums[midPoint+1]) {
                end = midPoint;
            } else {
                start = midPoint+1;
            }
        }
        return nums[start];
    }
}
