package com.sl.algorithms.core.linear.array.subarray;

import com.sl.algorithms.core.interfaces.subarray.SubArrayProduct;
import com.sl.algorithms.core.interfaces.subarray.SubArraySum;

/**
 * <br><a href="https://leetcode.com/problems/maximum-subarray/description/">Problem Reference</a><br>
 */
public class KadaneAlgorithm implements SubArraySum, SubArrayProduct {

    @Override
    public int findMaxSubArraySum(int[] nums) {
        objChecks(nums);
        if (nums.length == 1) return nums[0];
        Integer maxContiguousSum = Integer.MIN_VALUE;
        int maxTillHere=0;
        for (int num : nums) {
            if (maxTillHere < 0) maxTillHere = 0;
            maxTillHere += num;
            maxContiguousSum = Math.max(maxContiguousSum, maxTillHere);
        }
        return maxContiguousSum;
    }

    //TODO: analyze this more
    @Override
    public int findMaxSubArrayProduct(int[] nums) {
        objChecks(nums);
        if (nums.length == 1) return nums[0];
        int maxProduct = Integer.MIN_VALUE;
        int maxProductTillHere = 1;
        int minProductTillHere = 1;
        for (int num : nums) {
            int product1 = maxProductTillHere * num;
            int product2 = minProductTillHere * num;
            maxProductTillHere = Math.max(num, Math.max(product1, product2));
            minProductTillHere = Math.min(num, Math.min(product1, product2));
            maxProduct = Math.max(maxProduct, maxProductTillHere);
        }
        return maxProduct;
    }

    private void objChecks(int[] nums) {
        if (nums == null || nums.length == 0) throw new IllegalArgumentException("Array is empty");
    }
}