package com.sl.algorithms.core.sorting.finitegroups;

import com.sl.algorithms.core.interfaces.rwops.SortingEngine;

import static com.sl.algorithms.core.utils.ArrayOps.swap;

/**
 * <br>A precursor to {@link DutchNationalFlagsSort}, inspired by <a href="https://www.sciencedirect.com/science/article/pii/S0304397505001684">Wei-Mei Chen's paper</a>.<br>
 */
public class PolishNationalFlagSort<T extends Comparable> implements SortingEngine<T> {

    private T white;
    private T red;

    /**
     * <a href="https://en.wikipedia.org/wiki/Flag_of_Poland">Polish Flag</a>
     * @param _white : value of first group
     * @param _red : value of second group
     */
    public PolishNationalFlagSort(T _white, T _red) {
        white = _white;
        red = _red;
    }

    /**
     * <br><u>Approach</u>:<br>
     * <p>The two indices 'low' and 'high' keep track of the white and red block boundaries, respectively.
     * First, we scan from the left end of the array by incrementing 'low' until we find a !white element,
     * and we scan from the right end of the array by decrementing 'high' until we find a !red element.
     * We then exchange the two elements. Continue this way until 'low' and 'high' meet.<br>
     * Note that the scanning process is the same as that of the partition procedure of quicksort or quickselect</p>
     */
    @Override
    public void sort(T[] objects) {
        objChecks(objects);
        int low = 0, high = objects.length - 1;
        while (low < high) {
            while (white.equals(objects[low]) && low < high) {
                low++;
            }
            while (red.equals(objects[high]) && low < high) {
                high--;
            }
            if (low < high) {
                swap(objects, low, high);
                low++;
                high--;
            }
        }
    }
}
