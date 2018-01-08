package com.sl.algorithms.core.linear.array.lexicography;

import com.sl.algorithms.core.interfaces.search.NextGreaterElement;

import static com.sl.algorithms.core.utils.ArrayOps.reverse;
import static com.sl.algorithms.core.utils.ArrayOps.swap;
import static com.sl.algorithms.core.utils.Formulas.haveSameDigitsAndLength;
import static com.sl.algorithms.core.utils.NumberOps.countDigits;

/**
 * <u>References</u>:
 * <br>&nbsp;<a href="https://en.wikipedia.org/wiki/Permutation#Generation_in_lexicographic_order">Generate Permutations</a>
 * <br>&nbsp;<a href="https://en.wikipedia.org/wiki/Narayana_Pandit">Narayan Pandit</a>
 * <br>&nbsp;<a href="https://leetcode.com/problems/next-greater-element-iii/description/">Variant 3: Next Greater Number (NGN) with same digits</a>
 */
@SuppressWarnings("unchecked")
public class NarayanPanditAlgorithm implements NextGreaterElement {

    @Override
    public int[] findNGE(int[] elements) {
        intNullChecks(elements);
        int flipPoint = -1, ngsdIndex = -1, maxIndex = elements.length - 1;
        for (int i = maxIndex; i > 0; i--) {
            if (elements[i] > elements[i - 1]) {
                flipPoint = i - 1;
                ngsdIndex = i;
                break;
            }
        }
        if (flipPoint < 0) return new int[]{NGE_NOT_FOUND};
        for (int i = ngsdIndex; i <= maxIndex; i++) {
            if (elements[i] > elements[flipPoint]) ngsdIndex = i;
        }
        swap(elements, flipPoint, ngsdIndex);
        reverse(elements, flipPoint + 1, maxIndex);
        return elements;
    }

    // creative, intuitive but an exponential brute-force method
    public int findNGNSameDigits10s(int number) {
        int result = number;
        int digitCount = countDigits(number);
        while (countDigits(result) == digitCount) {
            result += 9;
            if (haveSameDigitsAndLength(result, number)) return result;
        }
        return NGE_NOT_FOUND;
    }
}
