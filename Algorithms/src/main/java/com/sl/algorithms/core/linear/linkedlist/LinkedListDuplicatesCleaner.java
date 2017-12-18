package com.sl.algorithms.core.linear.linkedlist;

public class LinkedListDuplicatesCleaner {

    LinkedListDuplicatesCleaner() {
        /**
         * This is a utility class.<br>
         */
    }

    // O(n) method to remove duplicates from a sorted list
    public static ListNode<Integer> removeDuplicates(ListNode<Integer> head) {
        if (head == null || head.next == null) {
            return head;
        }
        ListNode<Integer> curr = head;
        ListNode<Integer> next = null;
        while (curr != null && curr.next != null) {
            if (curr.data == curr.next.data) {
                next = curr.next;
                curr.next = null;
                curr.next = next.next;
            } else {
                curr = curr.next;
            }
        }
        return head;
    }

    //alternative O(n) method to remove duplicates; but this doesn't cleanup dupes explicitly
    public static ListNode<Integer> removeDuplicatesNoDereference(ListNode<Integer> head) {
        if (head == null || head.next == null) {
            return head;
        }
        ListNode<Integer> curr = head;
        while (curr != null && curr.next != null) {
            if (curr.data == curr.next.data) {
                curr.next = curr.next.next;
            } else {
                curr = curr.next;
            }
        }
        return head;
    }

    // O(n) cleanup the duplicated nodes completely
    public static ListNode<Integer> cleanupDuplicatedNodes(ListNode<Integer> head) {
        if (head == null || head.next == null) {
            return head;
        }
        ListNode<Integer> prev = null;
        ListNode<Integer> curr = head;
        ListNode<Integer> dummy = new ListNode<>(0); // dummy helps have an initial value for prev pointer; it's own value is inconsequential though
        dummy.next = head;
        prev = dummy;
        while (curr != null) {
            while (curr.next != null && curr.data == curr.next.data) {
                curr = curr.next;
            }
            if (prev.next == curr) {
                prev = prev.next;
            } else {
                prev.next = curr.next;
            }
            curr = curr.next;
        }
        return dummy.next;
    }
}
