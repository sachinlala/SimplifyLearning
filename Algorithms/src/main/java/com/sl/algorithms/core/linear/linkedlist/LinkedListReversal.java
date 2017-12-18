package com.sl.algorithms.core.linear.linkedlist;

public class LinkedListReversal {

    LinkedListReversal() {
        /**
         * This is a utility class.<br>
         */
    }
    // O(n)
    public static ListNode<Integer> reverseList(ListNode<Integer> head) {
        ListNode<Integer> prev = null, curr = head, next = null;
        while (curr != null) {
            next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        head = prev;
        return head;
    }

    // O(n)
    public static ListNode<Integer> reverseList(ListNode<Integer> head, int k) {
        if (head == null || head.next == null) {
            return head;
        }
        ListNode<Integer> prev=null, curr=head, next=null;
        int i = 0;
        while (curr != null && i < k) {
            next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
            i++;
        }
        if (next != null) {
            head.next = reverseList(next, k);
        }
        if (prev != null) {
            head = prev;
        }
        return head;
    }
}
