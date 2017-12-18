package com.sl.algorithms.linear.linkedlist;

import com.sl.algorithms.core.linear.linkedlist.ListNode;

public class SwapInPairs {

    SwapInPairs() {
        /**
         * This is a utility class.<br>
         */
    }

    public static ListNode<Integer> swapInPairs(ListNode<Integer> head) {
        if (head == null || head.next == null) return head;
        ListNode<Integer> next = head.next;
        head.next = swapInPairs(head.next.next);
        next.next = head;
        return next;
    }
}
