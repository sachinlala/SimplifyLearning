package com.sl.algorithms.search.pigeonhole;

import com.sl.algorithms.core.interfaces.search.pigeonhole.DuplicateFinder;
import java.util.HashSet;
import java.util.Set;

// O(n) time, O(n) space
public class AuxSpaceDupFinder implements DuplicateFinder {

  /**
   * {@inheritDoc}
   */
  public int findDuplicate(int[] nums) {
    checkIntArray(nums);
    Set<Integer> numSet = new HashSet<>();
    for (int num : nums) {
      if (numSet.contains(num)) {
        return num;
      }
      numSet.add(num);
    }
    throw new IllegalArgumentException(NO_DUPLICATES_FOUND);
  }

}
