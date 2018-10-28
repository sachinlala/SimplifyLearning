package com.sl.algorithms.search.nge;

import com.sl.algorithms.core.interfaces.search.NextGreaterElement;
import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Deque;

/**
 * <a href="https://leetcode.com/problems/next-greater-element-ii/description/">Next Greater Element
 * in a Circular Array</a>
 */
@SuppressWarnings("unchecked")
public class NGECircularArray implements NextGreaterElement {

  // O(n) time and O(n) space
  @Override
  public int[] findNGE(int[] nums) {
    checkIntArray(nums);
    int n = nums.length;
    int[] output = new int[n];
    Arrays.fill(output, -1); // O(1)
    Deque<Integer> ngeStack = new ArrayDeque<>(); // O(n)
    for (int i = 2 * n - 1; i >= 0; i--) { // O(n)
      int index = i % n;
      while (!ngeStack.isEmpty()) {
        int topIndex = ngeStack.peek();
        if (nums[index] < nums[topIndex]) {
          output[index] = nums[topIndex];
          break;
        } else {
          ngeStack.pop();
        }
      }
      ngeStack.push(index);
    }
    return output;
  }
}
