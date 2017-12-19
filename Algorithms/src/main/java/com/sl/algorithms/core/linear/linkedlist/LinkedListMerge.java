package com.sl.algorithms.core.linear.linkedlist;

import com.sl.algorithms.core.maths.Formulas;

import java.util.PriorityQueue;
import java.util.Queue;

public class LinkedListMerge {

    LinkedListMerge() {
        /**
         * This is a utility class.<br>
         */
    }

    // O(m+n)
    public static <T> ListNode<T> merge2SortedLists(ListNode<T> aHead, ListNode<T> bHead) {
        if (aHead == null) return bHead;
        if (bHead == null) return aHead;
        ListNode<T> mHead;
        if (aHead.compareTo(bHead) <= 0) {
            mHead = aHead;
            mHead.next = merge2SortedLists(aHead.next, bHead);
        } else {
            mHead = bHead;
            mHead.next = merge2SortedLists(aHead, bHead.next);
        }
        return mHead;
    }

    // O(m+n)
    public static <T> ListNode<T> merge2SortedListsIteratively(ListNode<T> aHead, ListNode<T> bHead) {
        if (aHead == null) return bHead;
        if (bHead == null) return aHead;
        ListNode<T> mHead = null;
        if (aHead.compareTo(bHead) <= 0) {
            mHead = aHead;
            aHead = aHead.next;
        } else {
            mHead = bHead;
            bHead = bHead.next;
        }
        ListNode<T> mNext = mHead;
        while (aHead != null && bHead != null) {
            if (aHead.compareTo(bHead) <= 0) {
                mNext.next = aHead;
                mNext = aHead;
                aHead = aHead.next;
            } else {
                mNext.next = bHead;
                mNext = bHead;
                bHead = bHead.next;
            }
        }
        // handle the case when one list contains all values less that second list
        if (aHead != null) mNext.next = aHead;
        if (bHead != null) mNext.next = bHead;
        return mHead;
    }

    /**
     * <br><a href="https://leetcode.com/problems/merge-k-sorted-lists/description/">Merge K sorted lists, using priority-queue</a><br>
     * <br>Complexity:
     * <br>> Time: O(N * logK): N = total number of nodes & K = total number of lists.
     * <br>> Space: O(N): for merged list; O(k): for the priority-queue.
     */
    public static <T> ListNode<T> mergeKSortedListsPQ(ListNode<T>[] lists) {
        Queue<ListNode<T>> priorityQueue = new PriorityQueue<>(lists.length);
        ListNode<T> dummy = ListNode.dummyNode();
        ListNode<T> tail = dummy;
        for (ListNode<T> node : lists) {
            priorityQueue.add(node);
        }
        while (!priorityQueue.isEmpty()) {
            tail.next = priorityQueue.poll(); // gets us the node with highest priority i.e. least numerical value
            tail = tail.next; // for next iteration
            if (tail.next != null) priorityQueue.add(tail.next); // a given list could have 1+ other nodes
        }
        return dummy.next;
    }

    /**
     * <br><a href="https://leetcode.com/problems/merge-k-sorted-lists/description/">Merge K sorted lists, using divide-n-conquer technique</a><br>
     * <br>Complexity:
     * <br>> Time: O(N * logK): N = total number of nodes & K = total number of lists.
     * <br>> Space: O(1): because we're using the {@link LinkedListMerge#merge2SortedLists(ListNode, ListNode)} method.
     */
    public static <T> ListNode<T> mergeKSortedListsDnQ(ListNode<T>[] lists) {
        return partitionThenMerge(lists, 0, lists.length-1);
    }

    private static <T> ListNode<T> partitionThenMerge(ListNode<T>[] lists, int start, int end) {
        if (start > end) return null;
        if (start == end) return lists[start];
        int midPoint = Formulas.midPoint(start, end);
        ListNode<T> list1 = partitionThenMerge(lists, start, midPoint);
        ListNode<T> list2 = partitionThenMerge(lists, midPoint+1, end);
        return merge2SortedLists(list1, list2);
    }
}