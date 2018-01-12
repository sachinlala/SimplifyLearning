package com.sl.algorithms.core.search.linearsearch;

import com.sl.algorithms.core.interfaces.search.Search;

/**
 * <br>O(n) time and O(1) space search in a 1-d array.<br>
 */
public class LinearSearch<T extends Comparable> implements Search<T> {

    @SuppressWarnings("unchecked") // compareTo
    @Override
    public int findIndex(T[] inputArray, T targetElement) {
        objChecks(inputArray);
        for (int i = 0; i < inputArray.length; i++) {
            if (inputArray[i].compareTo(targetElement) == 0) {
                return i;
            }
        }
        return ELEMENT_NOT_FOUND;
    }
}
