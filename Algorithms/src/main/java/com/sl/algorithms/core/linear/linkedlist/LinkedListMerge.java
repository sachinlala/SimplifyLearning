package com.sl.algorithms.core.linear.linkedlist;

import java.util.Comparator;
import java.util.PriorityQueue;
import java.util.Queue;

public class LinkedListMerge {

    LinkedListMerge() {
        /**
         * This is a utility class.<br>
         */
    }

    // O(m+n)
    public static ListNode<Integer> mergeSortedLists(ListNode<Integer> aHead, ListNode<Integer> bHead) {
        if (aHead == null) return bHead;
        if (bHead == null) return aHead;
        ListNode<Integer> mHead;
        if (aHead.data <= bHead.data) {
            mHead = aHead;
            mHead.next = mergeSortedLists(aHead.next, bHead);
        } else {
            mHead = bHead;
            mHead.next = mergeSortedLists(aHead, bHead.next);
        }
        return mHead;
    }

    // O(m+n)
    public static ListNode<Integer> mergeSortedListsIteratively(ListNode<Integer> aHead, ListNode<Integer> bHead) {
        if (aHead == null) return bHead;
        if (bHead == null) return aHead;
        ListNode<Integer> mHead = null;
        if (aHead.data <= bHead.data) {
            mHead = aHead;
            aHead = aHead.next;
        } else {
            mHead = bHead;
            bHead = bHead.next;
        }
        ListNode<Integer> mNext = mHead;
        while (aHead != null && bHead != null) {
            if (aHead.data <= bHead.data) {
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

    public static <T> ListNode<T> mergeKLists(ListNode<T>[] lists) {
        Queue<ListNode<T>> priorityQueue = new PriorityQueue<>(lists.length, new Comparator<ListNode<T>>() {
            @Override
            public int compare(ListNode<T> o1, ListNode<T> o2) {
                if (o1.data instanceof String && o2.data instanceof String) {
                    return ((String) o1.data).compareTo((String) o2.data);
                }
                if (o1.data instanceof Integer && o2.data instanceof Integer) {
                    return ((Integer) o1.data).compareTo((Integer) o2.data);
                }
                throw new IllegalArgumentException("Inputs are in a format not supported yet");
            }
        });

        ListNode<T> dummy = ListNode.dummyNode();
        ListNode<T> tail = dummy;

        for (ListNode<T> node : lists) {
            priorityQueue.add(node);
        }

        while (!priorityQueue.isEmpty()) {
            tail.next = priorityQueue.poll();
            tail = tail.next;

            if (tail.next != null) {
                priorityQueue.add(tail.next);
            }
        }

        return dummy.next;
    }
}
