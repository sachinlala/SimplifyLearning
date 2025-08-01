package com.sl.algorithms.core.array.count;

import com.sl.algorithms.core.interfaces.count.NegativeCounter;

public class CountNegativesInMatrix implements NegativeCounter {

  // O(n+m)
  @Override
  public int countNegatives(int[][] nums) {
    int negativeCount = 0;
    int i = 0, j = nums[0].length - 1;
    while (i < nums.length && j >= 0) {
      if (nums[i][j] < 0) {
        negativeCount += (j + 1);
        i++;
      } else {
        j--;
      }
    }
    return negativeCount;
  }
}
