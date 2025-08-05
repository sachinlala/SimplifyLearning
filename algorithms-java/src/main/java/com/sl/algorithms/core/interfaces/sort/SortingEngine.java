package com.sl.algorithms.core.interfaces.sort;

import com.sl.algorithms.core.interfaces.base.BaseInterface;
import com.sl.algorithms.core.list.ListNode;

/**
 * @param <T> : comparable object
 */
public interface SortingEngine<T extends Comparable> extends BaseInterface<T> {

  void sort(T[] objects);

  ListNode<T> sortList(ListNode<T> head);
}
