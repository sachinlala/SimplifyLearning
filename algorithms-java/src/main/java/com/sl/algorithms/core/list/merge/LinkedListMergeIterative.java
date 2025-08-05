package com.sl.algorithms.core.list.merge;

import com.sl.algorithms.core.interfaces.merge.MergeEngine;
import com.sl.algorithms.core.list.ListNode;

/**
 * <p>Iteratively merge lists from an array of sorted lists - for reference only.</p>
 */
public class LinkedListMergeIterative<T extends Comparable> implements MergeEngine<T> {

  @Override
  public ListNode<T> mergeKSortedLists(ListNode<T>[] sortedListsArray) {
    ListNode<T> mHead = merge2SortedLists(sortedListsArray[0], sortedListsArray[1]);
    for (int i = 2; i < sortedListsArray.length; i++) {
      ListNode<T> list1 = mHead;
      ListNode<T> list2 = sortedListsArray[i];
      mHead = merge2SortedLists(list1, list2);
    }
    return mHead;
  }

  /**
   * O(n+m) time and space iterative method to merge 2 sorted lists.<br>
   */
  @Override
  public ListNode<T> merge2SortedLists(ListNode<T> list1, ListNode<T> list2) {
    if (list1 == null || list1.isDummyNode()) {
      return list2;
    }
    if (list2 == null || list2.isDummyNode()) {
      return list1;
    }
    ListNode<T> dummyNode = ListNode.dummyNode();
    ListNode<T> mHead = dummyNode;
    dummyNode.next = mHead;
    do {
      if (list1.compareTo(list2) <= 0) {
        mHead.next = list1;
        mHead = list1;
        list1 = list1.next;
      } else {
        mHead.next = list2;
        mHead = list2;
        list2 = list2.next;
      }
    } while (list1 != null && list2 != null);
    // handle the case when one list contains all values less that second list
    if (list1 != null) {
      mHead.next = list1;
    } else { // if (list2 != null)
      mHead.next = list2;
    }
    return dummyNode.next;
  }
}
