package com.sl.algorithms.core.linear.linkedlist;

public class LinkedListMerge {

    LinkedListMerge() {
        /**
         * This is a utility class.<br>
         */
    }

    // O(m+n)
    public static ListNode<Integer> mergeSortedLists(ListNode<Integer> aHead, ListNode<Integer> bHead) {
        if (aHead == null) {
            return bHead;
        }
        if (bHead == null) {
            return aHead;
        }
        ListNode<Integer> mHead = null;
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
        if (aHead == null) {
            return bHead;
        }
        if (bHead == null) {
            return aHead;
        }
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
        if (aHead != null) {
            mNext.next = aHead;
        }
        if (bHead != null) {
            mNext.next = bHead;
        }
        return mHead;
    }
}
