package com.sl.algorithms.sort.generalpurpose.heap;

import com.sl.algorithms.core.baseObj.ListNode;
import com.sl.algorithms.core.interfaces.sorting.SortingEngine;

public class HeapSort<T extends Comparable> implements SortingEngine<T> {

    @Override
    public void sort(T[] objects) {
        checkArray(objects);
        int n = objects.length;
        if (n == 1) {
            return;
        }
    }

    @Override
    public ListNode<T> sortList(ListNode<T> head) {
        throw new UnsupportedOperationException();
    }
}
