package com.sl.algorithms.sort.wave;

import com.sl.algorithms.core.baseObj.ListNode;
import com.sl.algorithms.core.interfaces.sorting.SortingEngine;

import static com.sl.algorithms.core.utils.ArrayOps.swap;

/**
 * <br><a href="https://leetcode.com/problems/wiggle-sort/description/">Reference</a><br>
 */
public class WiggleSort<T extends Comparable> implements SortingEngine<T> {

    @SuppressWarnings("unchecked")
    @Override
    public void sort(T[] A) {
        checkArray(A);
        for (int i = 0; i < A.length - 1; i++) {
            boolean isEven = (i % 2 == 0);
            boolean isHigher = (A[i].compareTo(A[i + 1]) > 0);
            if (isEven == isHigher) {
                swap(A, i, i + 1);
            }
        }
    }

    @Override
    public ListNode<T> sortList(ListNode<T> list) {
        throw new UnsupportedOperationException();
    }
}
