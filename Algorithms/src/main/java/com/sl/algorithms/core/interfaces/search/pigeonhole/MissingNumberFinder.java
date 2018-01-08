package com.sl.algorithms.core.interfaces.search.pigeonhole;

/**
 * <br>Find the missing number in a list of numbers.<br>
 * <br><u>Variants</u>:
 * <br>1- array of size 'n' where member elements range is {0...n} and one number goes missing.
 * <br>2- array with integer member elements and we need to find the first missing 'positive' number.
 * <br>etc.
 * <br>
 */
public interface MissingNumberFinder {

    /**
     * <br><a href="https://leetcode.com/problems/first-missing-positive/description/">Reference Problem</a><br>
     * <br><u>Scope</u>: Input: integers; Output: positive integer<br>
     *     // find first positive missing number from an array which can contain any integer
     */
    int findFirstMissingPositive(int[] integers);

    /**
     * <br><a href="https://leetcode.com/problems/missing-number/description/">Reference Problem</a><br>
     * <br><u>Scope</u>: Input: non-negative integers; Output: non-negative integer.<br>
     *     // find first non-negative missing number from an array containing only 0->n numbers
     */
    int findMissingNumber(int[] nonnegatives);
}
