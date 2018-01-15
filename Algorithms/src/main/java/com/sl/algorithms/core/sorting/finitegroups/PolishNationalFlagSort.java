package com.sl.algorithms.core.sorting.finitegroups;

import com.sl.algorithms.core.interfaces.sorting.SortingEngine;

import static com.sl.algorithms.core.utils.ArrayOps.swap;

/**
 * <br>A precursor to {@link DutchNationalFlagSort}, inspired by <a href="https://www.sciencedirect.com/science/article/pii/S0304397505001684">Wei-Mei Chen's paper</a>.<br>
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
     * @param _white : primary value for sorting.<br>
     * i.e. everything else is red and can be any value => will settle in the right.<br>
     */
    public PolishNationalFlagSort(T _white) {
        white = _white;
    }

    /**
     * <br><u>Approach</u>:<br>
     * <p>The two indices 'w' and 'r' keep track of the white and red block boundaries, respectively.<br>
     * First, we scan from the left end of the array by incrementing 'w' until we find a !white element,
     * and we scan from the right end of the array by decrementing 'r' until we find a white element.
     * We then exchange the two elements. Continue this way until 'w' and 'r' meet.<br>
     * Note that the scanning process is the same as that of the partition procedure of {@link com.sl.algorithms.core.sorting.generalpurpose.QuickSort} or {@link com.sl.algorithms.core.selection.median.QuickSelectMedianFinder}.</p>
     */
    @Override
    public void sort(T[] objects) {
        objChecks(objects);
        int w = 0, r = objects.length - 1;
        while (w < r) {
            while (objects[w].equals(white) && w < r) {
                w++;
            }
            while (!objects[r].equals(white) && w < r) {
                r--;
            }
            if (w < r) {
                swap(objects, w, r);
                w++;
                r--;
            }
        }
    }
}
