package com.sl.algorithms.linear.array;

/**
 * <a href="https://en.wikipedia.org/wiki/Boyer%E2%80%93Moore_majority_vote_algorithm">Boyer Moore Voting Algorithm</a>
 * <p>Basic idea of the algorithm is if we cancel out each occurrence of an element e with all the other elements that are different from e then e will exist till end if it is a majority element.</p>
 * Majority = n/2
 */
public class BoyerMooreVoting {

    BoyerMooreVoting() {
        /**
         * This is a utility class.<br>
         */
    }

    public static int findMajorityElement(int[] nums) {
        int majorityIndex = 0;
        int count = 1;
        for (int i = 1; i < nums.length; i++) {
            if (count == 0) {
                majorityIndex = i;
                count = 1;
            }
            if (nums[i] == nums[majorityIndex]) {
                count++;
            } else {
                count--;
            }
        }
        return nums[majorityIndex];
    }

    public static boolean isMajority(int[] nums, int majorityElement) {
        int count = 0;
        for (int num : nums) {
            if (num == majorityElement) {
                count++;
                if (count > nums.length / 2) {
                    return true;
                }
            }
        }
        return false;
    }
}
