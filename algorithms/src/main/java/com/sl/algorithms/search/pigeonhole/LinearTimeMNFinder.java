package com.sl.algorithms.search.pigeonhole;

import static com.sl.algorithms.core.utils.ArrayOps.swap;

import com.sl.algorithms.core.interfaces.search.pigeonhole.MissingNumberFinder;

/**
 * <p>O(n) time and O(1) space algorithm to find the first missing positive number.</p>
 *
 * @see MissingNumberFinder
 */
public class LinearTimeMNFinder implements MissingNumberFinder {

  /**
   * <br><a href="https://leetcode.com/problems/first-missing-positive/description/">First Missing
   * Positive</a><br> <br><u>Approach (Reverse of Pigeonhole)</u>: you can 'n' balls, you put them
   * into n+1 bins, one bin will remain empty.<br> <br>Phase-1: "approximate" sort to ensure the
   * elements are at their rightful index e.g. 3 is at 3 <br>Phase-2: detect mis-match i.e.
   * missing-number.<br> <br>Usefulness: can handle duplicates and space is constant.<br>
   */
  @Override
  public int findFirstMissingPositive(int[] nums) {
    if (nums == null || nums.length == 0) {
      return 1;
    }
    int n = nums.length;
    for (int i = 0; i < n; ) { // phase-1 : sort as much possible
      int num = nums[i];
      if (num > 0 && num < n && num != nums[num]) { // n>=0, if 0 is also in scope
        swap(nums, i, num);
      } else {
        i++;
      }
    }
    // at this point, all numbers will be at their designated positions, except the missing number
    for (int i = 1; i < n; i++) { // phase-2a : find missing number // i=0 if 0 is also in scope
      if (nums[i] != i) {
        return i;
      }
    }
    if (nums[0]
        == n) { // phase-2b : // missing number is greater than all the numbers present in the array
      return ++n;
    }
    return n;
  }

  /**
   * <br><u>Complexity</u>: O(n) time and O(1) space.<br> <br><u>Assumption</u>: no duplicates.<br>
   * <br><u>Approach</u>: Because we know that 'nums' contains 'n' numbers and that it is missing
   * exactly one number in the range [0..n-1], we can infer that 'n' definitely replaces the missing
   * number in nums.<br> <br>Therefore, if we initialize an integer to 'n' and XOR it with every
   * index and value, we will be left with the missing number.<br>
   */
  @Override
  public int findMissingNumber(int[] nums) {
    if (nums == null || nums.length == 0) {
      return 0;
    }
    int n = nums.length;
    int xor = n;
    for (int i = n - 1; i > 0; i--) {
      xor ^= i;
    }
    for (int i = 0; i < n; i++) {
      xor ^= nums[i];
    }
    return xor;
  }
}
