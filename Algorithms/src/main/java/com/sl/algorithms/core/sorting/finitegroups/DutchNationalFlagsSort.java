package com.sl.algorithms.core.sorting.finitegroups;

import com.sl.algorithms.core.interfaces.rwops.SortingEngine;

import static com.sl.algorithms.core.utils.ArrayOps.swap;

/**
 * <br>A customized quick-sort, this algorithm is specific for cases when the data could be divided into 2-3 finite groups.
 * <br><a href="https://rosettacode.org/wiki/Dutch_national_flag_problem">Reference 1</a>
 * <br><a href="http://users.monash.edu/~lloyd/tildeAlgDS/Sort/Flag/">Reference 2</a>
 * <br>Time = O(N) & Space = O(1)<br>
 */
public class DutchNationalFlagsSort<T extends Comparable> implements SortingEngine<T> {

    private T red;
    private T blue;

    /**
     * <a href="https://en.wikipedia.org/wiki/Flag_of_the_Netherlands">Dutch Flag</a>
     * @param _lowerBand (red) : value of first group
     * <br>(white) is the implicit middle layer<br>
     * @param _higherBand (blue) : value of third group
     */
    public DutchNationalFlagsSort(T _lowerBand, T _higherBand) {
        red = _lowerBand;
        blue = _higherBand;
    }

    @Override
    public void sort(T[] objects) {
        objChecks(objects);
        int low = 0, medium = 0, high = objects.length - 1;
        while (medium <= high) {
            T obj = objects[medium];
            if (red.equals(obj)) {
                swap(objects, low, medium);
                low++;
                medium++;
            } else if (blue.equals(obj)) {
                swap(objects, high, medium);
                high--;
            } else { // white
                medium++;
            }
        }
    }
}
