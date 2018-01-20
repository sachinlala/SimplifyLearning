package com.sl.algorithms.sort.wave;

import com.sl.algorithms.core.baseObj.ListNode;
import com.sl.algorithms.core.interfaces.sorting.SortingEngine;

import static com.sl.algorithms.core.utils.ArrayOps.swap;

/**
 * <br><a href="https://leetcode.com/problems/wiggle-sort/description/">Reference</a><br>
 */
@SuppressWarnings("unchecked") // compareTo
public class WiggleSort<T extends Comparable> implements SortingEngine<T> {

    @Override
    public void sort(T[] objects) {
        checkArray(objects);
        for (int i = 0; i < objects.length - 1; i++) {
            boolean isEven = (i % 2 == 0);
            boolean isHigher = (objects[i].compareTo(objects[i + 1]) > 0);
            if (isEven == isHigher) {
                swap(objects, i, i + 1);
            }
        }
    }

    @Override
    public ListNode<T> sortList(ListNode<T> list) {
        throw new UnsupportedOperationException();
    }
}
