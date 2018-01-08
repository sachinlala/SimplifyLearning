package com.sl.algorithms.core.search.binarysearch;

import com.sl.algorithms.core.interfaces.search.BinarySearch;
import com.sl.algorithms.core.utils.Formulas;

/**
 * {@link BinarySearch}
 */
@SuppressWarnings("unchecked")
public class BinarySearchRecursive<T extends Comparable> implements BinarySearch<T> {

    /**
     * O(log(n)) time and space
     */
    @Override
    public int findIndex(T[] sortedInput, T itemToSearch) {
        objChecks(sortedInput);
        return findIndexRecursively(sortedInput, itemToSearch, 0, sortedInput.length - 1);
    }

    private int findIndexRecursively(T[] sortedInput, T itemToSearch, int start, int end) {
        if (start > end) {
            return NUMBER_NOT_FOUND;
        }
        int midPoint = Formulas.midPoint(start, end);
        T midValue = sortedInput[midPoint];
        if (midValue.compareTo(itemToSearch) == 0) {
            return midPoint;
        }
        if (midValue.compareTo(itemToSearch) > 0) {
            return findIndexRecursively(sortedInput, itemToSearch, start, midPoint - 1);
        }
        return findIndexRecursively(sortedInput, itemToSearch, midPoint + 1, end);
    }
}