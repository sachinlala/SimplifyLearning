package com.sl.algorithms.core.sorting;

import com.sl.algorithms.core.maths.Formulas;

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
public class MergeSort<T extends Comparable> implements SortingEngine {

    @Override
    public void sort(Comparable[] objects) {
        if (objects == null || objects.length <= 1) return;
        partitionThenMerge(objects, 0, objects.length-1);
    }

    private <T extends Comparable> void partitionThenMerge(T[] objects, int start, int end) {
        if (start >= end) return;
        int midPoint = Formulas.midPoint(start, end);
        partitionThenMerge(objects, start, midPoint);
        partitionThenMerge(objects, midPoint+1, end);
        mergeSort(objects, start, midPoint, end);
        return;
    }

    private <T extends Comparable> void mergeSort(T[] objects, int start, int midPoint, int end) {
        T[] a = (T[])new Comparable[midPoint-start+1];
        T[] b = (T[])new Comparable[end-midPoint];
        a = Arrays.copyOfRange(objects, start, midPoint+1); //+1 for copyOfRange API, "to" is exclusive
        b = Arrays.copyOfRange(objects, midPoint+1, end+1); //+1 for copyOfRange API, "to" is exclusive
        int i=0, j=0, k=start;
        for (; i<a.length && j<b.length; k++) {
            if (a[i].compareTo(b[j]) <= 0) {
                objects[k] = a[i];
                i++;
            } else if (a[i].compareTo(b[j]) > 0) {
                objects[k] = b[j];
                j++;
            }
        }
        for (; i<a.length; i++, k++) {
            objects[k] = a[i];
        }
        for (; j<b.length; j++, k++) {
            objects[k] = b[j];
        }
        return;
    }
}
