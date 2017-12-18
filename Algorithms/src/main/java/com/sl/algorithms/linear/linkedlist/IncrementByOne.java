package com.sl.algorithms.linear.linkedlist;

import com.sl.algorithms.core.linear.linkedlist.ListNode;

import static com.sl.algorithms.core.linear.linkedlist.LinkedListReversal.reverseList;

public class IncrementByOne {

    IncrementByOne() {
        /**
         * This is a utility class.<br>
         */
    }

    //O(n) time and O(1) space
    public static ListNode<Integer> incrementByOne(ListNode<Integer> head) {
        if (head == null) {
            return head;
        }
        int numberToAdd = 1;
        boolean addOne = true;
        head = reverseList(head);
        ListNode<Integer> curr = head;
        while (curr != null && curr.next != null) {
            if (addOne) {
                curr.data += numberToAdd;
            }
            if (curr.data > 9) {
                curr.data = curr.data % 10;
                addOne = true;
            } else {
                addOne = false;
            }
            curr = curr.next;
        }
        if (addOne) {
            curr.data += numberToAdd;
            if (curr.data > 9) {
                curr.data = curr.data % 10;
                curr.next = new ListNode<>(numberToAdd);
            }
        }
        head = reverseList(head);
        return head;
    }
}
