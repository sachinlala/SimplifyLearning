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

    // O(1)
    public static Node deleteAtStart(Node head) {
        if (head == null) {
            return null;
        }
        Node temp = head;
        head = temp.next;
        return head;
    }

    // O(N)
    public static Node deleteAtPosition(Node head, int deleteIndex) {
        Node prev = null;
        Node curr = head;
        int index = 1;
        while (curr != null) {
            if (index == deleteIndex) {
                if (prev == null) {
                    head = curr.next;
                    return head;
                }
                prev.next = curr.next;
            }
            prev = curr;
            curr = curr.next;
            index++;
        }
        return head;
    }

    // O(N)
    public static Node deleteAtEnd(Node head) {
        if (head == null || head.next == null) {
            return null;
        }
        Node temp = head;
        while (temp.next.next != null) {
            temp = temp.next;
        }
        temp.next = null;
        return head;
    }

    // O(N)
    public static Node deleteSpecificData(Node head, int data) {
        Node prev = null;
        Node curr = head;
        while (curr != null) {
            if (curr.data == data) {
                if (prev == null) {
                    head = curr.next;
                    return head;
                }
                prev.next = curr.next;
            }
            prev = curr;
            curr = curr.next;
        }
        return head;
    }
}
