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
        return findIndexIteratively(sortedInput, itemToSearch,start, end);
    }

    private int findIndexIteratively(T[] sortedInput, T itemToSearch, int start, int end) {
        while (start <= end) {  // the equality check here is important
            int midPoint = Formulas.midPoint(start, end);
            T midValue = sortedInput[midPoint];
            if (itemToSearch.compareTo(midValue) == 0) return midPoint; // index found
            if (itemToSearch.compareTo(midValue) < 0) end = midPoint - 1; // go left
            else start = midPoint + 1; // go right
        }
        return NUMBER_NOT_FOUND;
    }
}