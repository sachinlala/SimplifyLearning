package com.sl.algorithms.linear.array;

public class MoveZeroes {

    MoveZeroes() {
        /**
         * This is a utility class.<br>
         */
    }

    // O(n) time and O(1) space, but # operations in worst-case is high (e.g. 00001)
    public static int[] moveZeroes(int[] nums) {
        int slow=0, fast=0;
        while (fast < nums.length) {
            if (nums[fast] != 0) {
                nums[slow] = nums[fast];
                ++slow;
            }
            ++fast;
        }
        while (slow < nums.length) {
            nums[slow] = 0;
            ++slow;
        }
        return nums;
    }

    // O(n) time and O(1) space, with optimal # operations in worst case
    public static int[] moveZeroesOptimal(int[] nums) {
        int slow=0, fast=0;
        // { 0, 1, 0, 3, 12 }
        while (fast < nums.length) {
            if (nums[fast] != 0) {
                int temp = nums[fast];
                nums[fast] = nums[slow];
                nums[slow] = temp;
                ++slow;
            }
            ++fast;
        }
        return nums;
    }
}
