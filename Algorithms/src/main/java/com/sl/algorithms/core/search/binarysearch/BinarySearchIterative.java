package com.sl.algorithms.core.search.binarysearch;

import com.sl.algorithms.core.interfaces.search.BinarySearch;
import com.sl.algorithms.core.utils.Formulas;

/**
 * {@link BinarySearch}
 */
@SuppressWarnings("unchecked")
public class BinarySearchIterative<T extends Comparable> implements BinarySearch<T> {

    /**
     * <br>Since we reduce the search space by half each time, the complexity must be in the order of O(log(n)).<br>
     * <br>O(log(n)) time and O(1) space.<br>
     */
    @Override
    public int findIndex(T[] sortedInput, T itemToSearch) {
        objChecks(sortedInput);
        int start = 0, end = sortedInput.length - 1;
        while (start <= end) {  // the equality check here is KEY!
            int midPoint = Formulas.midPoint(start, end);
            T midValue = sortedInput[midPoint];
            if (midValue.compareTo(itemToSearch) == 0) {
                return midPoint;
            }
            if (midValue.compareTo(itemToSearch) > 0) {
                end = midPoint - 1;
            } else {
                start = midPoint + 1;
            }
        }
        return NUMBER_NOT_FOUND;
    }
}