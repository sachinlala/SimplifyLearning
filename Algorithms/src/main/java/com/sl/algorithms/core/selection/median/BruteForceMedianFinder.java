package com.sl.algorithms.core.selection.median;

import com.sl.algorithms.core.interfaces.selection.MedianFinder;

import java.util.Arrays;

/**
 * <br>Brute-force solution, for reference only.<br>
 * <br>Time : O(N logN)
 * <br>Space: O(N)
 */
@SuppressWarnings("unchecked") // because of Arrays.parallelSort call
public class BruteForceMedianFinder<T extends Comparable> implements MedianFinder<T> {

    @Override
    public T findKthSmallest(T[] objects, int k) {
        objChecks(objects);
        int l = objects.length;
        kCheck(l, k);
        if (l == 1) {
            return objects[0];
        }
        Arrays.parallelSort(objects);
        return objects[--k]; // because 1 <= k <= N, while an array starts from 0 index
    }
}
