package com.sl.algorithms.array.application;

public class ArrayMaths {

    private ArrayMaths() {
        /**
         * This is a utility class.<br>
         */
    }

    // O(n) time and O(n) space
    public static int[] plusOne(int[] digits) {
        if (digits == null || digits.length == 0) {
            return digits;
        }
        int length = digits.length;
        boolean addOne = true;
        int numberToAdd = 1;
        for (int i = length - 1; i >= 0; i--) {
            if (addOne) {
                digits[i] += numberToAdd;
            }
            if (digits[i] > 9) {
                digits[i] = digits[i] % 10;
                addOne = true;
            } else {
                addOne = false;
            }
        }
        if (addOne) {
            int[] plusOneNumber = new int[length + 1];
            plusOneNumber[0] = numberToAdd;
            return plusOneNumber;
        }
        return digits;
    }

    /**
     * <a href="https://leetcode.com/problems/product-of-array-except-self/description/">Product Except Self</a>
     * <br>//O(n) time and O(1) space
     */
    public static int[] productExceptSelf(int[] nums) {
        if (nums == null || nums.length == 0) {
            return nums;
        }
        int length = nums.length;
        int left = 1, right = 1;
        int[] output = new int[length]; // not counted towards space as this is not used for any temp storage
        output[0] = 1;
        for (int i = 1; i < length; i++) {
            left *= nums[i - 1];
            output[i] = left;
        }
        for (int i = length - 2; i >= 0; i--) {
            right *= nums[i + 1];
            output[i] *= right;
        }
        return output;
    }
}
