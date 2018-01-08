package com.sl.algorithms.core.interfaces.search;

import com.sl.algorithms.core.interfaces.base.BaseInterface;

/**
 * <br><u>Objective</u>: Search in a SORTED array, in Logarithmic time.<br>
 * <br><a href="https://en.wikipedia.org/wiki/Binary_search_algorithm">Reference</a><br>
 */
public interface BinarySearch<T extends Comparable> extends BaseInterface<T> {

    int NUMBER_NOT_FOUND = -1;

    int findIndex(T[] sortedInput, T itemToSearch);
}
