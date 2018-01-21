package com.sl.algorithms.sort.wave;

import com.sl.algorithms.core.baseObj.ListNode;
import com.sl.algorithms.core.interfaces.selection.MedianFinder;
import com.sl.algorithms.core.interfaces.selection.QuickSelect;
import com.sl.algorithms.core.interfaces.sorting.SortingEngine;
import com.sl.algorithms.select.median.QuickSelectMedianFinder;
import com.sl.algorithms.sort.finitegroups.DutchNationalFlagSort;

import static com.sl.algorithms.core.utils.ArrayOps.swap;

/**
 * <br><a href="https://leetcode.com/problems/wiggle-sort-ii/description/">Reference</a><br>
 *
 * @see QuickSelect
 * @see DutchNationalFlagSort
 */
@SuppressWarnings("unchecked")
public class WiggleSortII<T extends Comparable> implements SortingEngine<T> {

    private static final MedianFinder medianFinder = new QuickSelectMedianFinder<>();

    @Override
    public void sort(T[] A) {
        checkArray(A);
        Comparable median = medianFinder.findMedian(A);
        int n = A.length;
        int left = 0, i = 0, right = n - 1;
        while (i <= right) {
            if (A[newIndex(i, n)].compareTo(median) > 0) {
                swap(A, newIndex(left++, n), newIndex(i++, n));
            } else if (A[newIndex(i, n)].compareTo(median) < 0) {
                swap(A, newIndex(right--, n), newIndex(i, n));
            } else {
                i++;
            }
        }
    }

    private int newIndex(int index, int n) {
        return (1 + 2 * index) % (n | 1);
    }

    @Override
    public ListNode<T> sortList(ListNode<T> head) {
        throw new UnsupportedOperationException();
    }
}
