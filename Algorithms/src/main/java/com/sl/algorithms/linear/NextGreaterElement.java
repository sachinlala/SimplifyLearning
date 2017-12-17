package com.sl.algorithms.linear;

import com.sl.algorithms.core.linear.ArrayOps;

import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Deque;

import static com.sl.algorithms.core.maths.Formulas.haveSameDigitsAndLength;
import static com.sl.algorithms.core.maths.NumberOps.convertToArray;
import static com.sl.algorithms.core.maths.NumberOps.convertToNumber;
import static com.sl.algorithms.core.maths.NumberOps.countDigits;

/**
 * <br><a href="https://leetcode.com/problems/next-greater-element-i/description/">Variant 1</a>
 * <br><a href="https://leetcode.com/problems/next-greater-element-ii/description/">Variant 2</a>
 * <br><a href="https://leetcode.com/problems/next-greater-element-iii/description/">Variant 3</a>
 */
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
}

/**
 * <a href="https://leetcode.com/contest/weekly-contest-61/problems/daily-temperatures/">Daily Temperatures</a><br>
 */
class NGERegularArray {
    // O(n) time and O(n) space
    public static int[] findDaysToWarmth(int[] temperatures) {
        int n = temperatures.length;
        int[] warmTemperatures = new int[n]; // => each element = 0
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
}

/**
 * <a href="https://leetcode.com/problems/next-greater-element-ii/description/">Variant 2</a>
 */
class NGECircularArray {
    // O(n) time and O(n) space
    public static int[] findNGEInCircularArray(int[] nums) {
        int n = nums.length;
        int[] output = new int[n];
        Arrays.fill(output, -1); // O(1)
        Deque<Integer> ngeStack = new ArrayDeque<>(); // O(n)
        for (int i = 2*n-1; i >= 0; i--) { // O(n)
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

/**
 * <a href="https://leetcode.com/problems/next-greater-element-iii/description/">Variant 3: Next Greater Number (NGN) with same digits</a>
 */
class NarayanPanditAlgorithm {

    /**
     * <u>References</u>:
     *     <br>&nbsp;<a href="https://en.wikipedia.org/wiki/Permutation#Generation_in_lexicographic_order">Generate Permutations</a>
     *     <br>&nbsp;<a href="https://en.wikipedia.org/wiki/Narayana_Pandit">Narayan Pandit</a>
     */
    public static int findNGNSameDigits(int number) {
        int[] digits = convertToArray(number);
        int flipPoint=-1, ngsdIndex=-1, maxIndex=digits.length-1;
        for (int i=maxIndex; i>0; i--) {
            if (digits[i] > digits[i-1]) {
                flipPoint = i-1;
                ngsdIndex = i;
                break;
            }
        }
        if (flipPoint < 0) {
            return -1;
        }
        for (int i=ngsdIndex; i<=maxIndex; i++) {
            if (digits[i] > digits[flipPoint]) {
                ngsdIndex = i;
            }
        }
        int temp = digits[flipPoint];
        digits[flipPoint] = digits[ngsdIndex];
        digits[ngsdIndex] = temp;
        digits = ArrayOps.reverse(digits, flipPoint+1, maxIndex);
        int result = convertToNumber(digits);
        return result;
    }

    // creative, intuitive but an exponential brute-force method
    public static int findNGNSameDigits10s(int number) {
        int result = number;
        int digitCount = countDigits(number);
        while (countDigits(result) == digitCount) {
            result += 9;
            if (haveSameDigitsAndLength(result, number)) {
                return result;
            }
        }
        return -1;
    }
}