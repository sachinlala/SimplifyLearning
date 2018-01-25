package com.sl.algorithms.core.interfaces.merge;

import com.sl.algorithms.core.baseObj.ListNode;
import com.sl.algorithms.core.interfaces.base.BaseInterface;

public interface MergeEngine<T extends Comparable> extends BaseInterface<T> {

    ListNode<T> mergeKSortedLists(ListNode<T>[] sortedListsArray);

    ListNode<T> merge2SortedLists(ListNode<T> list1, ListNode<T> list2);
}
