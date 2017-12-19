package com.sl.algorithms.core.linear.linkedlist;

import java.util.Objects;

/**
 * Basic representation of a LinkedList node.<br>
 */
public class ListNode<T> implements Comparable<ListNode<T>> {
    public T data;
    public ListNode<T> next;

    public ListNode(T _data) {
        data = _data;
        next = null;
    }

    private ListNode() {
        /**
         * Only for dummy node creation utility method.<br>
         */
    }

    // O(n)
    public int getSize() {
        if (next == null) return 1;
        return (1 + next.getSize());
    }

    public static <T> ListNode<T> dummyNode() {
        return new ListNode<>();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ListNode<?> listNode = (ListNode<?>) o;
        return Objects.equals(data, listNode.data) &&
                Objects.equals(next, listNode.next);
    }

    @Override
    public int hashCode() {
        return Objects.hash(data, next);
    }

    @Override
    public String toString() {
        StringBuilder output = new StringBuilder().append(data);
        if (next != null) output.append(next); // this implies a recursive call
        return output.toString();
    }

    //O(n) time and O(1) space
    public boolean hasCycle() {
        if (this == null || this.next == null) return false;
        ListNode<T> slow=this, fast=this;
        while (slow != null && fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) {
                return true;
            }
        }
        //NOTE: the meeting-point of slow and fast pointers may not be the start of the cycle.<br>
        //To find the start of the cycle, we'll need to iterate one more time i.e. slow2=head & slow walking at equal speed.<br>
        return false;
    }

    @Override
    public int compareTo(ListNode<T> o2) {
        ListNode<T> o1 = this;
        if (o1.data instanceof String && o2.data instanceof String) {
            return ((String) o1.data).compareTo((String) o2.data);
        }
        if (o1.data instanceof Integer && o2.data instanceof Integer) {
            return ((Integer) o1.data).compareTo((Integer) o2.data);
        }
        throw new IllegalArgumentException("Inputs are in a format not supported yet");
    }
}