package com.sl.algorithms.core.list.merge;

import com.sl.algorithms.core.interfaces.merge.MergeEngine;
import com.sl.algorithms.core.list.ListNode;
import com.sl.algorithms.core.utils.Formulas;

public class LinkedListMergeDnQ<T extends Comparable> implements MergeEngine<T> {

  /**
   * <br><a href="https://leetcode.com/problems/merge-k-sorted-lists/description/">Merge K sorted
   * lists, using divide-n-conquer technique</a><br> <br>Complexity: <br>- Time: O(N * logK): N =
   * total number of nodes and K = total number of lists. <br>- Space: O(N): because we're using the
   * recursive @{@link LinkedListMergeDnQ#merge2SortedLists(ListNode, ListNode)} method.
   */
  @Override
  public ListNode<T> mergeKSortedLists(ListNode<T>[] sortedListsArray) {
    return partitionThenMerge(sortedListsArray, 0, sortedListsArray.length - 1);
  }

  private ListNode<T> partitionThenMerge(ListNode<T>[] sortedListArray, int start, int end) {
    if (start > end) {
      return null;
    }
    if (start == end) {
      return sortedListArray[start];
    }
    int midPoint = Formulas.midPoint(start, end);
    ListNode<T> listNode1 = partitionThenMerge(sortedListArray, start, midPoint);
    ListNode<T> listNode2 = partitionThenMerge(sortedListArray, midPoint + 1, end);
    return merge2SortedLists(listNode1, listNode2);
  }

  /**
   * <br>O(n+m) time and space recursive method to merge 2 sorted lists.<br>
   */
  public ListNode<T> merge2SortedLists(ListNode<T> list1, ListNode<T> list2) {
    if (list1 == null) {
      return list2;
    }
    if (list2 == null) {
      return list1;
    }
    ListNode<T> mergedHead;
    if (list1.compareTo(list2) <= 0) {
      mergedHead = list1;
      mergedHead.next = merge2SortedLists(list1.next, list2);
    } else {
      mergedHead = list2;
      mergedHead.next = merge2SortedLists(list1, list2.next);
    }
    return mergedHead;
  }

}
