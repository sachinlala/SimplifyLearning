package com.sl.algorithms.core.list.merge;

import com.sl.algorithms.core.interfaces.merge.MergeEngine;
import com.sl.algorithms.core.list.ListNode;
import java.util.Collections;
import java.util.PriorityQueue;
import java.util.Queue;

/**
 * <br><a href="https://leetcode.com/problems/merge-k-sorted-lists/description/">Merge K sorted
 * lists, using priority-queue</a><br> <br><u>Complexity</u>: <br>Time: O(N * logK): N = total
 * number of nodes and K = total number of lists. <br>Space: O(N): for merged list + O(kMax): for
 * the priority-queue.
 */
public class LinkedListMergePQ<T extends Comparable> implements MergeEngine<T> {

  @Override
  public ListNode<T> mergeKSortedLists(ListNode<T>[] sortedListsArray) {
    ListNode<T> dummyNode = ListNode.dummyNode();
    ListNode<T> minNode = dummyNode;
    dummyNode.next = minNode;
    Queue<ListNode<T>> priorityQueue = new PriorityQueue<>();
    Collections.addAll(priorityQueue, sortedListsArray);
    while (!priorityQueue.isEmpty()) {
      minNode.next = priorityQueue.poll();
      minNode = minNode.next;
      if (minNode.next != null) {
        priorityQueue.add(minNode.next); // queue will get re-adjusted
      }
    }
    return dummyNode.next;
  }

  @Override
  @SuppressWarnings("unchecked") // because of the unchecked call to mergeKSortedLists
  public ListNode<T> merge2SortedLists(ListNode<T> list1, ListNode<T> list2) {
    if (list1 == null || list1.isDummyNode()) {
      return list2;
    }
    if (list2 == null || list2.isDummyNode()) {
      return list1;
    }
    return mergeKSortedLists(new ListNode[]{list1, list2});
  }
}
