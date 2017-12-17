package com.sl.algorithms.core.linear;

import java.util.Objects;

/**
 * Basic representation of a LinkedList node.<br>
 */
public class ListNode<T> {
    public T data;
    public ListNode<T> next;

    ListNode(T _data) {
        data = _data;
        next = null;
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
}