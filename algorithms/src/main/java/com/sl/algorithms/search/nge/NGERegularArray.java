package com.sl.algorithms.search.nge;

import com.sl.algorithms.core.interfaces.search.NextGreaterElement;
import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Deque;

/**
 * <a href="https://leetcode.com/problems/next-greater-element-i/description/">Next Greater
 * Element</a> <br><a href="https://leetcode.com/contest/weekly-contest-61/problems/daily-temperatures/">Daily
 * Temperatures</a><br>
 */
@SuppressWarnings("unchecked")
public class NGERegularArray implements NextGreaterElement {

  // O(n) time and O(n) space
  @Override
  public int[] findNGE(int[] temperatures) {
    checkIntArray(temperatures);
    int n = temperatures.length;
    int[] warmTemperatures = new int[n]; // => each element = 0
    Arrays.fill(warmTemperatures, 0);
    Deque<Integer> ngeStack = new ArrayDeque<>();
    for (int i = n - 1; i >= 0; i--) {
      while (!ngeStack.isEmpty()) { // search till the stack is empty
        int topIndex = ngeStack.peek();
        if (temperatures[i] < temperatures[topIndex]) {
          warmTemperatures[i] = (topIndex - i);
          break; // :-)
        }
        ngeStack.pop();
      }
      ngeStack.push(i);
    }
    return warmTemperatures;
  }

  // O(n^2) time and O(1) space - written for reference only
  public static int[] findDaysToWarmthBruteForce(int[] temperatures) {
    int n = temperatures.length;
    int[] warmTemperatures = new int[n]; // => each element = 0
    Arrays.fill(warmTemperatures, 0);
    for (int i = 0; i < n; i++) {
      for (int j = i + 1; j < n; j++) {
        if (temperatures[i] < temperatures[j]) {
          warmTemperatures[i] = j - i;
          break;
        }
      }
    }
    return warmTemperatures;
  }
}
