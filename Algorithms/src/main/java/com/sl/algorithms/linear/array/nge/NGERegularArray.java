package com.sl.algorithms.linear.array.nge;

import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Deque;

/**
 * <a href="https://leetcode.com/problems/next-greater-element-i/description/">Next Greater Element</a>
 * <br><a href="https://leetcode.com/contest/weekly-contest-61/problems/daily-temperatures/">Daily Temperatures</a><br>
 */
public class NGERegularArray {

    NGERegularArray() {
        /**
         * This is a utility class.<br>
         */
    }

    // O(n^2) time and O(1) space
    public static Integer[] findDaysToWarmthBruteForce(Integer[] temperatures) {
        int n = temperatures.length;
        Integer[] warmTemperatures = new Integer[n]; // => each element = 0
        Arrays.fill(warmTemperatures, 0);
        for (int i=0; i<n; i++) {
            for (int j=i+1; j<n; j++) {
                if (temperatures[i] < temperatures[j]) {
                    warmTemperatures[i] = j-i;
                    break;
                }
            }
        }
        return warmTemperatures;
    }

    // O(n) time and O(n) space
    public static Integer[] findDaysToWarmth(Integer[] temperatures) {
        int n = temperatures.length;
        Integer[] warmTemperatures = new Integer[n]; // => each element = 0
        Arrays.fill(warmTemperatures, 0);
        Deque<Integer> ngeStack = new ArrayDeque<>();
        for (int i=n-1; i >= 0; i--) {
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
}
