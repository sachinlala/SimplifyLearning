package com.sl.algorithms.core.linear.linkedlist;

import static com.sl.algorithms.core.linear.linkedlist.LinkedListOps.getSize;

public class LinkedListReversal {

    LinkedListReversal() {
        /**
         * This is a utility class.<br>
         */
    }

    // O(n) time and O(1) space
    public static ListNode<Integer> reverseListInGroups(ListNode<Integer> head) {
        ListNode<Integer> prev=null, curr=head, next=null;
        while (curr != null) {
            next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        head = prev;
        return head;
    }

    // O(n) time and O(n) space
    public static ListNode<Integer> reverseListRecursive(ListNode<Integer> head) {
        if (head == null || head.next == null) return head;
        ListNode<Integer> ptr = reverseListInGroups(head.next);
        head.next.next = head;
        head.next = null;
        return ptr;
    }

    // O(n)
    public static ListNode<Integer> reverseListInGroups(ListNode<Integer> head, int k) {
        if (head == null || head.next == null || k > getSize(head) || k == 0) {
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
        head.next = reverseListInGroups(next, k);
        head = prev;
        return head;
    }
}
