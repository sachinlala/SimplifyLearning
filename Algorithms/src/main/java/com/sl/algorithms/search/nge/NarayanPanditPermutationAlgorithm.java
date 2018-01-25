package com.sl.algorithms.search.nge;

import com.sl.algorithms.core.interfaces.search.NextGreaterElement;

import static com.sl.algorithms.core.utils.ArrayOps.reverse;
import static com.sl.algorithms.core.utils.ArrayOps.swap;
import static com.sl.algorithms.core.utils.Formulas.haveSameDigitsAndLength;
import static com.sl.algorithms.core.utils.NumberOps.countDigits;

/**
 * <br>&nbsp;<a href="https://en.wikipedia.org/wiki/Permutation#Generation_in_lexicographic_order">Generate Permutations</a>
 * <br>&nbsp;<a href="https://leetcode.com/problems/next-greater-element-iii/description/">Next Greater Number (NGN) with same digits</a><br>
 * <br><u>Inventor</u>:&nbsp;<a href="https://en.wikipedia.org/wiki/Narayana_Pandit">Narayan Pandit</a>
 */
@SuppressWarnings("unchecked")
public class NarayanPanditPermutationAlgorithm implements NextGreaterElement {

    // O(n) time and O(1) space
    @Override
    public int[] findNGE(int[] N) {
        checkIntArray(N);
        int flipPoint = -1, ngsdIndex = -1, li = N.length - 1;
        for (int i = li; i > 0; i--) {
            if (N[i] > N[i - 1]) {
                flipPoint = i - 1;
                ngsdIndex = i;
                break;
            }
        }
        if (flipPoint < 0) {
            return new int[]{NGE_NOT_FOUND};
        }
        for (int i = ngsdIndex; i <= li; i++) {
            if (N[i] > N[flipPoint]) ngsdIndex = i;
        }
        swap(N, flipPoint, ngsdIndex);
        reverse(N, flipPoint + 1, li);
        return N;
    }

    // creative, intuitive but an exponential brute-force method
    public int findNGNSameDigits10s(int number) {
        int result = number;
        int digitCount = countDigits(number);
        while (countDigits(result) == digitCount) {
            result += 9;
            if (haveSameDigitsAndLength(result, number)) {
                return result;
            }
        }
        return NGE_NOT_FOUND;
    }
}
