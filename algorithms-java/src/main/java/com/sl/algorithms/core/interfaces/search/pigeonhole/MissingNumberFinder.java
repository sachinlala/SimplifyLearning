package com.sl.algorithms.core.interfaces.search.pigeonhole;

/**
 * <br>Find the missing number in a list of numbers.<br> <br><u>Variants</u>: <br>1- array of size
 * 'n' where member elements range is {0...n} and one number goes missing. <br>2- array with integer
 * member elements and we need to find the first missing 'positive' number. <br>etc. <br>
 */
public interface MissingNumberFinder {

  /**
   * <br><a href="https://leetcode.com/problems/first-missing-positive/description/">Reference
   * Problem</a><br> <br><u>Scope</u>: Input: integers; Output: positive integer<br>
   *
   * @param integers input array
   * @return first positive number missing from the array which can contain any integer
   */
  int findFirstMissingPositive(int[] integers);

  /**
   * <br><a href="https://leetcode.com/problems/missing-number/description/">Reference
   * Problem</a><br> <br><u>Scope</u>: Input: non-negative integers; Output: non-negative
   * integer.<br>
   *
   * @param nonnegatives input array
   * @return first non-negative missing number missing from the array which contains 0 to n numbers
   */
  int findMissingNumber(int[] nonnegatives);
}
