package com.sl.algorithms.core.linear.array.count;

import com.sl.algorithms.core.interfaces.count.ElementCounter;

import static com.sl.algorithms.core.utils.Formulas.midPoint;

//TODO: revise

/**
 * <br>Given a sorted array of integers, find the count of a given target element.
 * <br>Solve in Logarithmic time.
 */
public class CountElementInLogTime<T extends Comparable> implements ElementCounter<T> {

    // O(n) time method - written for reference only
    public int countTargetElementLinear(T[] nums, T target) {
        int count = 0;
        for (T num : nums) {
            if (target.equals(num)) {
                ++count;
            }
        }
        return count;
    }

    @Override
    public int countTargetElement(T[] nums, T target) {
        objChecks(nums);
        int start = 0, end = nums.length - 1;
        int minIndex = findMinIndex(nums, target, start, end);
        if (minIndex < 0) return 0;
        int maxIndex = findMaxIndex(nums, target, minIndex, end);
        int count = maxIndex - minIndex + 1;
        return count;
    }

    @SuppressWarnings("unchecked") // compareTo
    private int findMinIndex(T[] nums, T target, int start, int end) {
        int minIndex = -1;
        while (start <= end) {
            int midPoint = midPoint(start, end);
            T midValue = nums[midPoint];
            if (midValue.equals(target)
                    && (midPoint == 0 || target.compareTo(nums[midPoint - 1]) > 0)
                    ) {
                minIndex = midPoint;
                break;
            } else if (midValue.compareTo(target) < 0) {
                start = midPoint + 1;
            } else {
                end = midPoint - 1;
            }
        }
        return minIndex;
    }

    @SuppressWarnings("unchecked") // compareTo
    private int findMaxIndex(T[] nums, T target, int start, int end) {
        int maxIndex = -1;
        while (start <= end) {
            int midPoint = midPoint(start, end);
            T midValue = nums[midPoint];
            if (midValue.equals(target)
                    && (midPoint == nums.length - 1 || target.compareTo(nums[midPoint + 1]) < 0)
                    ) {
                maxIndex = midPoint;
                break;
            } else if (midValue.compareTo(target) > 0) {
                end = midPoint - 1;
            } else {
                start = midPoint + 1;
            }
        }
        return maxIndex;
    }
}
