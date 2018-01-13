package com.sl.algorithms.core.sorting.generalpurpose;

import com.sl.algorithms.core.interfaces.rwops.SortingEngine;
import com.sl.algorithms.core.utils.Formulas;

import java.util.Arrays;

/**
 * <br><a href="http://www.geeksforgeeks.org/merge-sort/">Reference</a><br>
 * <br><u>Steps</u>:
 * <br>(1) partition the array to a cluster of single units
 * <br>(2) sort each unit
 * <br>(3) merge
 * <br><br>
 * Time = O(N*logN) & Space = O(N)
 */
public class MergeSort<T extends Comparable> implements SortingEngine<T> {

    @Override
    public void sort(T[] objects) {
        objChecks(objects);
        partitionThenMerge(objects, 0, objects.length - 1);
    }

    //TODO: revise //TODO: do in-place also
    private void partitionThenMerge(T[] objects, int start, int end) {
        if (start >= end) return;
        int midPoint = Formulas.midPoint(start, end);
        partitionThenMerge(objects, start, midPoint);
        partitionThenMerge(objects, midPoint + 1, end);
        mergeSort(objects, start, midPoint, end);
    }

    @SuppressWarnings("unchecked")
    private void mergeSort(T[] objects, int start, int midPoint, int end) {
        T[] a = (T[]) Arrays.copyOfRange(objects, start, midPoint + 1); //+1 for copyOfRange API, "to" is exclusive
        T[] b = (T[]) Arrays.copyOfRange(objects, midPoint + 1, end + 1); //+1 for copyOfRange API, "to" is exclusive
        int i = 0, j = 0, k = start;
        for (; i < a.length && j < b.length; k++) {
            int diff = a[i].compareTo(b[j]);
            if (diff <= 0) {
                objects[k] = a[i];
                i++;
            } else {
                objects[k] = b[j];
                j++;
            }
        }
        for (; i < a.length; i++, k++) {
            objects[k] = a[i];
        }
        for (; j < b.length; j++, k++) {
            objects[k] = b[j];
        }
        return;
    }
}
