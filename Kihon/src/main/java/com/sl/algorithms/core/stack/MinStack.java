package com.sl.algorithms.core.stack;

/**
 * <br><a href="https://leetcode.com/problems/min-stack/description/">Problem Reference</a><br>
 */
public class MinStack {
    private Element head;

    public void push(int x) {
        if (head == null) {
            head = new Element(x, x, null);
        } else {
            head = new Element(x, Math.min(x, head.min), head);
        }
    }

    public void pop() {
        if (head == null) {
            return;
        }
        head = head.next;
    }

    public int top() {
        if (head == null) {
            return -1;
        }
        return head.data;
    }

    public int getMin() {
        if (head == null) {
            return -1;
        }
        return head.min;
    }

    class Element {
        int data;
        int min;
        Element next;
        Element(int _data, int _min, Element _next) {
            data = _data;
            min = _min;
            next = _next;
        }
    }
}
