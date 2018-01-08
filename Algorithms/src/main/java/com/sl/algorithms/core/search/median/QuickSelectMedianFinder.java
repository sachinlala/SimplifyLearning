package com.sl.algorithms.core.search.median;

import com.sl.algorithms.core.interfaces.rwops.ShufflingEngine;
import com.sl.algorithms.core.interfaces.search.MedianFinder;
import com.sl.algorithms.core.utils.ArrayOps;

/**
 * <br><a href="https://brilliant.org/wiki/median-finding-algorithm/#">Reference</a>
 * <br><a href="https://en.wikipedia.org/wiki/Quickselect">Quick Select</a>
 *     <br>Time : O(N)
 *     <br>Space: O(1)
 */
public class QuickSelectMedianFinder<T extends Comparable> implements MedianFinder<T>, ShufflingEngine<T> {

    /**
     * See {@link MedianFinder#findKthSmallest(Comparable[], int)}
     * <br><br><u>Steps</u>:<br>
     * 1. Divide list into sub-lists.<br>
     * 2. Determine "approximate" median for each of the sub-lists.<br>
     * 3. Put all the medians into a new list and find the median of the new list.<br>
     */
    @Override
    public T findKthSmallest(T[] objects, int k) {
        objChecks(objects);
        int l = objects.length;
        kCheck(l, k);
        //shuffle(objects);
        int low = 0;
        int high = l - 1;
        while (low < high) {
            int j = partition(objects, low, high);
            if (j < k) {
                low = j + 1;
            } else if (j > k) {
                high = j - 1;
            } else {
                break;
            }
        }
        return objects[--k];
    }

    @SuppressWarnings("unchecked")
    private int partition(T[] a, int low, int high) {
        int i = low;
        int j = high + 1;
        while (true) {
            while (i < high && (a[++i].compareTo(a[low]) < 0)) ;
            while (j > low && (a[low].compareTo(a[--j]) < 0)) ;
            if (i >= j) break;
            ArrayOps.swap(a, i, j);
        }
        ArrayOps.swap(a, low, j);
        return j;
    }
}