package com.sl.algorithms.core.interfaces.search.pigeonhole;

import com.sl.algorithms.core.interfaces.base.BaseInterface;

public interface DuplicateFinder extends BaseInterface {

  String NO_DUPLICATES_FOUND = "No duplicates found";

  /**
   * <br><a href="https://leetcode.com/problems/find-the-duplicate-number/">Problem
   * Reference</a><br> <br><u>Requirements</u>: <br>1. solve without modifying the original array,
   * else sort and detect would be OK to go with. <br>2. solve without any additional space, else
   * hash-set would be OK to go with.
   *
   * @param numbers input
   * @return find the first repeating number
   */
  int findDuplicate(int[] numbers);
}
