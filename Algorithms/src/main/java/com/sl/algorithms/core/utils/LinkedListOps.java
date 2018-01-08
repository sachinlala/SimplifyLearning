package com.sl.algorithms.core.utils;

import com.sl.algorithms.core.baseObj.ListNode;
import com.sl.algorithms.core.baseObj.OpPosition;

@SuppressWarnings("unchecked")
public class LinkedListOps {

    LinkedListOps() {
        /**
         * This is a utility class.<br>
         */
    }

    // at start of list, after a node or end of list
    public static <T extends Comparable> ListNode<T> insertData(ListNode<T> node, T newData, OpPosition position) {
        ListNode<T> newNode = new ListNode<T>(newData);
        if (node == null) return newNode;
        switch (position) {
            case START: { // O(1)
                newNode.next = node;
                node = newNode;
                break;
            }
            case AFTER: { // O(1)
                newNode.next = node.next;
                node.next = newNode;
                break;
            }
            case END: { // O(n)
                node.next = insertData(node.next, newData, OpPosition.END);
                break;
            }
        }
        return node;
    }

    public static <T extends Comparable> ListNode<T> removeDataByPosition(ListNode<T> node, OpPosition position) {
        if (node == null) return node;
        switch (position) {
            case START: { // O(1)
                if (node.next == null) return null;
                ListNode<T> temp = node;
                node = temp.next;
                break;
            }
            case AFTER: { // O(1)
                node.next = node.next.next;
                break;
            }
            case END: { // O(n)
                if (node.next == null) return null;
                ListNode<T> temp = node;
                while (temp.next.next != null) {
                    temp = temp.next;
                }
                temp.next = null;
                break;
            }
        }
        return node;
    }

    // O(n) time and O(1) space
    public static <T extends Comparable> ListNode<T> removeData(ListNode<T> head, T data) {
        ListNode<T> dummyNode = ListNode.dummyNode();
        dummyNode.next = head;
        ListNode<T> prev = dummyNode, curr = head;
        while (curr != null) {
            if (curr.data == data) prev.next = curr.next;
            else prev = curr;
            curr = curr.next;
        }
        return dummyNode.next;
    }

    // O(n) method to remove duplicates from a list
    public static <T extends Comparable> ListNode<T> removeDuplicates(ListNode<T> head) {
        if (head == null || head.next == null) return head;
        ListNode<T> curr = head, next = null;
        //1 22 23
        while (curr != null && curr.next != null) {
            while (curr != null && curr.next != null && curr.compareTo(curr.next) == 0) {
                next = curr.next;
                curr.next = null;
                curr.next = next.next;
            }
            if (curr != null) curr = curr.next;
        }
        return head;
    }

    // O(n) time and O(1) space method to reverse a list
    public static <T extends Comparable> ListNode<T> reverse(ListNode<T> head) {
        ListNode<T> prev = null, curr = head, next;
        while (curr != null) {
            next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        head = prev;
        return head;
    }

    // O(n) time and O(n/k) recursion-space method to reverse list in groups of k
    public static <T extends Comparable> ListNode<T> reverseListInGroups(ListNode<T> head, int k) {
        if (head == null || head.next == null || k > head.getSize() || k == 0) {
            return head;
        }
        ListNode<T> prev = null, curr = head, next = null;
        for (int i = 0; i < k && curr != null; i++) {
            next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        head.next = reverseListInGroups(next, k);
        head = prev;
        return head;
    }

    // O(n) time and O(n/2) recursion-space method to swap/reverse in pairs
    public static <T extends Comparable> ListNode<T> swapInPairs(ListNode<T> head) {
        if (head == null || head.next == null) return head;
        ListNode<T> next = head.next;
        head.next = swapInPairs(head.next.next);
        next.next = head;
        return next;
    }

    // O(n) time and O(1) space
    public static ListNode<Integer> incrementByOne(ListNode<Integer> head) {
        if (head == null) return head;
        int one = 1;
        boolean addOne = true;
        head = reverse(head);
        ListNode<Integer> curr = head;
        while (curr != null && curr.next != null) {
            if (addOne) curr.data += one;
            if (curr.data > 9) {
                curr.data = curr.data % 10;
                addOne = true;
            } else {
                addOne = false;
            }
            curr = curr.next;
        }
        if (addOne) {
            curr.data += one;
            if (curr.data > 9) {
                curr.data = curr.data % 10;
                curr.next = new ListNode<>(one);
            }
        }
        head = reverse(head);
        return head;
    }

}