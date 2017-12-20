package com.sl.algorithms.core.sorting;

import static com.sl.algorithms.core.linear.array.ArrayOps.swap;

/**
 * <br><a href="https://leetcode.com/problems/wiggle-sort/description/">Reference</a><br>
 */
public class WiggleSort implements SortingEngine {
    @Override
    public void sort(Comparable[] objects) {
        if (objects == null || objects.length <= 1) return;

        for (int i=0; i<objects.length-1; i++) {
            boolean isEven = (i%2 == 0) ? true : false;
            boolean isHigher = (objects[i].compareTo(objects[i+1]) > 0);
            if (isEven == isHigher) {
                swap(objects, i, i+1);
            }
        }
    }
}
