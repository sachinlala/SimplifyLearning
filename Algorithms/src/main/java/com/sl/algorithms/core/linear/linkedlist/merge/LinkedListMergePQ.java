package com.sl.algorithms.core.linear.linkedlist.merge;

import com.sl.algorithms.core.baseObj.ListNode;
import com.sl.algorithms.core.interfaces.rwops.MergeEngine;

import java.util.Collections;
import java.util.PriorityQueue;
import java.util.Queue;

public class LinkedListMergePQ<T extends Comparable> implements MergeEngine<T> {

    /**
     * <br><a href="https://leetcode.com/problems/merge-k-sorted-lists/description/">Merge K sorted lists, using priority-queue</a><br>
     * <br>Complexity:
     * <br>> Time: O(N * logK): N = total number of nodes & K = total number of lists.
     * <br>> Space: O(N): for merged list; O(k): for the priority-queue.
     */
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

    @SuppressWarnings("unchecked") // because of the generic array
    @Override
    public ListNode<T> merge2SortedLists(ListNode<T> list1, ListNode<T> list2) {
        if (list1 == null || list1.isDummyNode()) return list2;
        if (list2 == null || list2.isDummyNode()) return list1;
        return mergeKSortedLists(new ListNode[]{list1, list2});
    }
}
