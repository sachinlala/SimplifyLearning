package com.sl.algorithms.traversal;

public class LinkedListTraversal {

    // O(n)
    public static String printList(Node node) {
        StringBuilder output = new StringBuilder("[");
        while (node != null) {
            output = output.append(node.data);
            node = node.next;
        }
        output.append("]");
        return output.toString();
    }

    // O(n)
    public static int getSize(Node head) {
        if (head == null) {
            return 0;
        }
        return (1 + getSize(head.next));
    }

    // O(1)
    public static Node insertAtStart(Node head, int newData) {
        Node newNode = new Node(newData);
        newNode.next = head;
        head = newNode;
        return head;
    }

    // O(1)
    public static Node insertAfter(Node node, int newData) {
        if (node == null) {
            return null;
        }
        Node newNode = new Node(newData);
        newNode.next = node.next;
        node.next = newNode;
        return node;
    }

    // O(n)
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

    // O(n)
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

    // O(n)
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

    // O(n)
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

    // O(n)
    public static Node reverseList(Node head) {
        Node prev, curr, next;
        prev = null;
        curr = head;
        while (curr != null) {
            next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        head = prev;
        return head;
    }

    // O(n)
    public static Node reverseList(Node head, int k) {
        if (head == null || head.next == null) {
            return head;
        }
        Node prev = null, curr = head, next = null;
        int i = 0;
        while (curr != null && i < k) {
            next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
            i++;
        }
        if (next != null) {
            head.next = reverseList(next, k);
        }
        if (prev != null) {
            head = prev;
        }
        return head;
    }

    /**
     * Counter-clockwise rotation:<br><br>
     * 1. Point next of kth node to null<br>
     * 2. Point next of last node to previous head<br>
     * 3. Point head to (k+1)th node
     * // O(n)
     */
    public static Node rotateListLeft(Node head, int k) {
        if (head == null || head.next == null || k == 0) {
            return head;
        }
        Node kNode = null, curr = head;
        // traverse upto kth node
        for (int i = 1; curr != null && i < k; i++) {
            curr = curr.next;
        }
        // return head if k >= size of the list
        if (curr == null) {
            return head;
        }
        // preserve the kth node
        kNode = curr;
        // now reach the end
        while (curr.next != null) {
            curr = curr.next;
        }
        // point next of last node to previous head
        curr.next = head;
        // point head to (k+1)th node
        head = kNode.next;
        // point (k+1)th node to null (as it is the new tail)
        kNode.next = null;
        return head;
    }

    /**
     * Clockwise rotation:<br><br>
     * 1. Reach the kth node<br>
     * 2. Make the (k+1)th node as the new head<br>
     * 3. Make the kth node as the new terminal<br>
     * 4. Join the original tail with the original head<br>
     */
    public static Node rotateListRight(Node head, int k) {
        if (head == null || head.next == null || k == 0) {
            return head;
        }
        int size = 1;
        Node fast = head, slow = head;
        // reach the original tail and find the size
        while (fast.next != null) {
            size++;
            fast = fast.next;
        }
        // find the seed value to find the new tail
        // (k%size) is to ensure we can handle any value of k i.e. k <=> size
        int seed = size-(k%size);
        for (int i=seed; i>1; i--) {
            slow = slow.next;
        }
        // join original tail with original head
        fast.next = head;
        // set the new head
        head = slow.next;
        // point the new tail to null
        slow.next = null;
        return head;
    }
/*
    public static Node rotateListRight(Node head, int k) {
        if (head == null || head.next == null || k == 0) {
            return head;
        }
        Node newHead=head, newTail=head, tail=head.next;
        // reach the (k+1)th node, so that we can get the new head
        while (k-- >= 0) {
            if (newHead == null) {// this can happen when k > size of the list
                newHead = head;
            }
            newHead = newHead.next;
        }
        // now find the original tail and new tail + new head
        while (newHead != null) {
            tail = newHead;
            newHead = newHead.next;
            newTail = newTail.next;
        }
        newHead = newTail.next;
        newTail.next = null;
        // protection required for case when k=n
        if (newHead == null) {
            return head;
        }
        // protection required for case when k=(n-1)
        while (tail.next != null) {
            tail = tail.next;
        }
        // join the original tail with original head
        tail.next = head;
        // set the new head
        head = newHead;
        return head;
    }
*/
}
