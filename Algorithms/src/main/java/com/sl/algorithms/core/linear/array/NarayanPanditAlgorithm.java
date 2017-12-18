package com.sl.algorithms.core.linear.array;

import static com.sl.algorithms.core.maths.Formulas.haveSameDigitsAndLength;
import static com.sl.algorithms.core.maths.NumberOps.*;

/**
 * <a href="https://leetcode.com/problems/next-greater-element-iii/description/">Variant 3: Next Greater Number (NGN) with same digits</a>
 */
public class NarayanPanditAlgorithm {

    NarayanPanditAlgorithm() {
        /**
         * This is a utility class.<br>
         */
    }

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
