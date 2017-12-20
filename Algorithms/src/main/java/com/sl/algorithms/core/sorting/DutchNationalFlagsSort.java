package com.sl.algorithms.core.sorting;

/**
 * <br><a href="https://rosettacode.org/wiki/Dutch_national_flag_problem">Reference 1</a>
 * <br><a href="http://users.monash.edu/~lloyd/tildeAlgDS/Sort/Flag/">Reference 2</a>
 * <br>A customized quick-sort, this algorithm is specific for cases when the data could be divided into 2-3 finite groups.
 * <br><br>
 * Time = O(N) & Space = O(1)
 */
public class DutchNationalFlagsSort<T extends Comparable> implements SortingEngine {

    @Override
    public void sort(Comparable[] objects) {
        if (objects == null) return;

        if (!(objects instanceof Integer[])) {
            throw new IllegalArgumentException("Input contains a data-type not yet supported");
        }

        if (objects.length <= 1) return;

        int low=0, medium=0, high=objects.length-1;
        while (medium <= high) {
            Comparable obj = objects[medium];
            if (obj.compareTo(0) == 0) { // low
                swap(objects, low++, medium++);
            }
            if (obj.compareTo(2) == 0) { // high
                swap(objects, high--, medium);
            }
            if (obj.compareTo(1) ==0) { // middle
                medium++;
            }
        }
        return;
    }

    private void swap(Comparable[] objects, int i, int j) {
        Comparable temp = objects[i];
        objects[i] = objects[j];
        objects[j] = temp;
        return;
    }
}
