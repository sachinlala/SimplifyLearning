package com.sl.algorithms.traversal;

public class Node {
    int data;
    Node next;

    Node(int d) {
        data = d;
        next = null;
    }

    @Override
    public String toString() {
        StringBuilder output = new StringBuilder().append(data);
        if (next != null) {
            output.append(next);
        }
        return output.toString();
    }
}
