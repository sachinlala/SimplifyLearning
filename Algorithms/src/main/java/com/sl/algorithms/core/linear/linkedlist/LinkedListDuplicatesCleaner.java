package com.sl.algorithms.core.linear.linkedlist;

public class LinkedListDuplicatesCleaner {

    LinkedListDuplicatesCleaner() {
        /**
         * This is a utility class.<br>
         */
    }

    // O(n) method to remove duplicates from a sorted list
    public static <T> ListNode<T> removeDuplicates(ListNode<T> head) {
        if (head == null || head.next == null) {
            return head;
        }
        ListNode<T> curr = head;
        ListNode<T> next = null;
        while (curr != null && curr.next != null) {
            if (curr.compareTo(curr.next) == 0) {
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
    public static <T> ListNode<T> removeDuplicatesNoDereference(ListNode<T> head) {
        if (head == null || head.next == null) {
            return head;
        }
        ListNode<T> curr = head;
        while (curr != null && curr.next != null) {
            if (curr.compareTo(curr.next) == 0) {
                curr.next = curr.next.next;
            } else {
                curr = curr.next;
            }
        }
        return head;
    }

    // O(n) cleanup the duplicated nodes completely
    public static <T> ListNode<T> cleanupDuplicatedNodes(ListNode<T> head) {
        if (head == null || head.next == null) {
            return head;
        }
        ListNode<T> prev = null;
        ListNode<T> curr = head;
        ListNode<T> dummy = ListNode.dummyNode();
        dummy.next = head;
        prev = dummy;
        while (curr != null) {
            while (curr.next != null && curr.compareTo(curr.next) == 0) {
                curr = curr.next;
            }
            if (prev.next == curr) prev = prev.next;
            else prev.next = curr.next;
            curr = curr.next;
        }
        return dummy.next;
    }
}
