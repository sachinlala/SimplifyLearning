package com.sl.algorithms.array.application;

import java.util.ArrayDeque;
import java.util.Deque;

public class NextGreaterElement {
    private NextGreaterElement() {
        /**
         * This is a utility class.<br>
         */
    }

    /**
     * <a href="https://leetcode.com/contest/weekly-contest-61/problems/daily-temperatures/">Daily Temperatures</a><br>
     * // O(n^2) time and O(1) space
     */
    public static int[] findDaysToWarmthBruteForce(int[] temperatures) {
        int n = temperatures.length;
        int[] warmTemperatures = new int[n]; // => each element = 0
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

    /**
     * <a href="https://leetcode.com/contest/weekly-contest-61/problems/daily-temperatures/">Daily Temperatures</a><br>
     * // O(n) time and O(n) space
     */
    public static int[] findDaysToWarmth(int[] temperatures) {
        int n = temperatures.length;
        int[] warmTemperatures = new int[n]; // => each element = 0
        Deque<Integer> ngeStack = new ArrayDeque<>();
        for (int i=n-1; i>=0; i--) {
            while (!ngeStack.isEmpty()) { // search till the stack is empty
                int topIndex = ngeStack.peek();
                if (temperatures[i] < temperatures[topIndex]) {
                    warmTemperatures[i] = (topIndex-i);
                    break;
                } else {
                    ngeStack.pop();
                }
            }
            ngeStack.push(i);
        }
        return warmTemperatures;
    }
}
