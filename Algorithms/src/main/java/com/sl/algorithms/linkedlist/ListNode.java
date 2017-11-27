package com.sl.algorithms.linkedlist;

public class ListNode {
    int data;
    ListNode next;

    ListNode(int _data) {
        data = _data;
        next = null;
    }

    @Override
    public String toString() {
        StringBuilder output = new StringBuilder().append(data);
        if (next != null) {
            output.append(next); // this implies a recursive call
        }
        return output.toString();
    }
}
