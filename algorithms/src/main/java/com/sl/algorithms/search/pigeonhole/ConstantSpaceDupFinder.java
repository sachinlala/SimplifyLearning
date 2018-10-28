package com.sl.algorithms.search.pigeonhole;

import com.sl.algorithms.core.interfaces.search.pigeonhole.DuplicateFinder;

/**
 * <br><a href="https://www.interviewcake.com/question/java/find-duplicate-optimize-for-space-beast-mode">Reference</a><br>
 * <br><u>Crux</u>: Position of the node with multiple incoming pointers is the duplicate.<br>
 * <br><u>Assumption</u>: There is at least one duplicate in the list.<br> <br><u>Complexity</u>:
 * O(n) time, O(1) space<br>
 */
public class ConstantSpaceDupFinder implements DuplicateFinder {

  /**
   * {@inheritDoc}
   */
  public int findDuplicate(int[] nums) {
    checkIntArray(nums);
    if (nums.length == 1) {
      throw new IllegalArgumentException(NO_DUPLICATES_FOUND);
    }
    int slow = nums[0], fast = nums[0];
    do {
      slow = nums[slow];
      fast = nums[nums[fast]];
    } while (slow != fast);

    int ptr1 = nums[0];
    int ptr2 = slow;
    while (ptr1 != ptr2) {
      ptr1 = nums[ptr1];
      ptr2 = nums[ptr2];
    }
    return ptr1;
  }
}
