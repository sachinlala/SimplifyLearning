package com.sl.algorithms.core.interfaces.rwops;

import com.sl.algorithms.core.baseObj.ListNode;

public interface MergeEngine<T extends Comparable> {
    ListNode<T> mergeKSortedLists(ListNode<T>[] sortedListsArray);
    ListNode<T> merge2SortedLists(ListNode<T> list1, ListNode<T> list2);
}
