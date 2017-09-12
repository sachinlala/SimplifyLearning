package com.sl.algorithms.traversal;

public class LinkedListTraversal {

    // O(N)
    public static String printList(Node node) {
        StringBuilder output = new StringBuilder("[");
        while (node != null) {
            output = output.append(node.data);
            node = node.next;
        }
        output.append("]");
        return output.toString();
    }

    // O(1)
    public static Node insertAtStart(Node head, int newElement) {
        Node newNode = new Node(newElement);
        newNode.next = head;
        head = newNode;
        return head;
    }

    // O(1)
    public static Node insertAfter(Node index, int newElement) {
        if (index == null) {
            System.err.println("Inside insertAfter: Input is null");
            return null;
        }
        Node newNode = new Node(newElement);
        newNode.next = index.next;
        index.next = newNode;
        return index;
    }

    // O(N)
    public static Node insertAtEnd(Node head, int newElement) {
        Node newNode = new Node(newElement);
        if (head == null) {
            return newNode;
        }
        Node latest = head;
        while (head.next != null) {
            head = head.next;
        }
        head.next = newNode;
        return latest;
    }
}
