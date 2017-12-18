package com.sl.algorithms.core.linear.linkedlist;

public class LinkedListOps {

    LinkedListOps() {
        /**
         * This is a utility class.<br>
         */
    }

    public static ListNode<Integer> createLinkedList(int[] nums) {
        if (nums == null || nums.length == 0) return null;
        ListNode<Integer> head=null, curr=null, temp=null;
        head = new ListNode<>(nums[0]);
        if (nums.length == 1) {
            return head;
        }
        curr = new ListNode<>(nums[1]);
        head.next = curr;
        for (int i=2; i<nums.length; i++) {
            temp = new ListNode<>(nums[i]);
            curr.next = temp;
            curr = temp;
        }
        return head;
    }

    // O(n)
    public static String printList(ListNode<?> node) {
        return new StringBuilder("[").append(node != null ? node.toString() : "").append("]").toString();
    }

    // O(n)
    public static int getSize(ListNode<?> head) {
        if (head == null) return 0;
        return (1+getSize(head.next));
    }

    // O(1)
    public static ListNode<Integer> insertAtStart(ListNode<Integer> head, int newData) {
        ListNode<Integer> newNode = new ListNode<>(newData);
        newNode.next = head;
        head = newNode;
        return head;
    }

    // O(1)
    public static ListNode<Integer> insertAfter(ListNode<Integer> node, int newData) {
        if (node == null) return node;
        ListNode<Integer> newNode = new ListNode<>(newData);
        newNode.next = node.next;
        node.next = newNode;
        return node;
    }

    // O(1)
    public static ListNode<Integer> insertAtPosition(ListNode<Integer> head, int data, int position) {
        ListNode<Integer> newNode = new ListNode<>(data);
        if (head == null) return newNode;
        if (position == 0) {
            newNode.next = head;
            return newNode;
        }
        ListNode<Integer> curr = head;
        int index = 1;
        while (curr.next != null && index < position) {
            curr = curr.next;
            index++;
        }
        if (index < position) return head; // handle overflow
        // now we've reached the required 'position'
        newNode.next = curr.next;
        curr.next = newNode;
        return head;
    }

    // O(n)
    public static ListNode<Integer> insertAtEnd(ListNode<Integer> head, int newElement) {
        ListNode<Integer> newNode = new ListNode<>(newElement);
        if (head == null) return newNode;
        ListNode<Integer> curr = head;
        while (curr.next != null) {
            curr = curr.next;
        }
        curr.next = newNode;
        return head;
    }

    // O(1)
    public static ListNode<Integer> deleteAtStart(ListNode<Integer> head) {
        if (head == null) return null;
        ListNode<Integer> temp = head;
        head = temp.next;
        return head;
    }

    // O(1)
    public static ListNode<Integer> deleteAtPosition(ListNode<Integer> head, int deleteIndex) {
        ListNode<Integer> prev = null;
        ListNode<Integer> curr = head;
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
    public static ListNode<Integer> deleteAtEnd(ListNode<Integer> head) {
        if (head == null || head.next == null) return null;
        ListNode<Integer> temp = head;
        while (temp.next.next != null) {
            temp = temp.next;
        }
        temp.next = null;
        return head;
    }

    // O(n)
    public static ListNode<Integer> deleteSpecificData(ListNode<Integer> head, int data) {
        ListNode<Integer> prev = null;
        ListNode<Integer> curr = head;
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

    public static boolean isIdentical(ListNode<Integer> a, ListNode<Integer> b) {
        while (a != null && b != null) {
            if (a.data != b.data) {
                break;
            }
            a = a.next;
            b = b.next;
        }
        if (a == null && b == null) {
            return true;
        }
        return false;
    }

    // deep copy O(n)
    public static ListNode<Integer> cloneList(ListNode<Integer> head) {
        if (head == null) return null;
        ListNode<Integer> deepCopy = new ListNode<>(head.data);
        if (head.next == null) return deepCopy;
        ListNode<Integer> latest = new ListNode<>(head.next.data);
        deepCopy.next = latest;
        while (head.next.next != null) {
            ListNode<Integer> temp = new ListNode<>(head.next.next.data);
            latest.next = temp;
            latest = temp;
            head = head.next;
        }
        return deepCopy;
    }
}
