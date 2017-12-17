package com.sl.algorithms.linear.array;

public class ProductExceptSelf {

    ProductExceptSelf() {
        /**
         * This is a utility class.<br>
         */
    }

    /**
     * <a href="https://leetcode.com/problems/product-of-array-except-self/description/">Product Except Self</a>
     * <br>//O(n) time and O(1) space
     */
    public static int[] productExceptSelf(int[] nums) {
        if (nums == null || nums.length == 0) {
            return nums;
        }
        int length=nums.length, left=1, right=1;
        int[] output = new int[length]; // not counted towards space as this is not used for any temp storage
        output[0] = 1;
        for (int i=1; i<length; i++) {
            left *= nums[i-1];
            output[i] = left;
        }
        for (int i=length-2; i>=0; i--) {
            right *= nums[i+1];
            output[i] *= right;
        }
        return output;
    }
}
