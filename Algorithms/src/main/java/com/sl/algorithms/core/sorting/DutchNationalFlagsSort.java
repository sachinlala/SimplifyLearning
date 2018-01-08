package com.sl.algorithms.core.sorting;

import com.sl.algorithms.core.interfaces.rwops.SortingEngine;

import static com.sl.algorithms.core.utils.ArrayOps.swap;

/**
 * <br><a href="https://rosettacode.org/wiki/Dutch_national_flag_problem">Reference 1</a>
 * <br><a href="http://users.monash.edu/~lloyd/tildeAlgDS/Sort/Flag/">Reference 2</a>
 * <br>A customized quick-sort, this algorithm is specific for cases when the data could be divided into 2-3 finite groups.
 * <br><br>
 * Time = O(N) & Space = O(1)
 */
@SuppressWarnings("unchecked")
public class DutchNationalFlagsSort<T extends Comparable> implements SortingEngine<T> {

    private T lowerBand;
    private T higherBand;

    public DutchNationalFlagsSort(T _lowerBand, T _higherBand) {
        lowerBand = _lowerBand;
        higherBand = _higherBand;
    }

    //TODO : revise
    @Override
    public void sort(T[] objects) {
        objChecks(objects);

        int low = 0, medium = 0, high = objects.length - 1;

        while (medium <= high) {
            T obj = objects[medium];
            if (obj.compareTo(lowerBand) == 0) {
                swap(objects, low++, medium++);
            } else if (obj.compareTo(higherBand) == 0) {
                swap(objects, high--, medium);
            } else {
                medium++; // if (obj.compareTo(middleBand) == 0) {
            }
        }
    }
}
