package com.sl.algorithms.core.interfaces.sorting;

import com.sl.algorithms.core.baseObj.ListNode;
import com.sl.algorithms.core.interfaces.base.BaseInterface;

/**
 * @param <T> : comparable object
 */
public interface SortingEngine<T extends Comparable> extends BaseInterface<T> {

    void sort(T[] objects);

    ListNode<T> sortList(ListNode<T> head);
}
