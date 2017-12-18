package com.sl.algorithms.core.linear.linkedlist;

public class LinkedListOps<T> {

    LinkedListOps() {
        /**
         * This is a utility class.<br>
         */
    }

    // O(n)
    public static <T> String printList(ListNode<T> node) {
        StringBuilder listAsString = new StringBuilder("[");
        listAsString.append((node != null) ? node.toString() : "");
        listAsString.append("]");
        return listAsString.toString();
    }

    //TODO: generify this
    public static ListNode<Integer> createLinkedList(int[] nums) {
        if (nums == null || nums.length == 0) return null;

        ListNode<Integer> head=new ListNode<>(nums[0]);
        if (nums.length == 1) return head;

        ListNode<Integer> curr, temp;
        curr = new ListNode<>(nums[1]);
        head.next = curr;

        for (int i=2; i<nums.length; i++) {
            temp = new ListNode<>(nums[i]);
            curr.next = temp;
            curr = temp;
        }
        return head;
    }

    // at start of list, after a node or end of list
    public static <T> ListNode<T> insertData(ListNode<T> node, T newData, OpPosition position) {
        ListNode<T> newNode = new ListNode<>(newData);
        if (node == null) { return newNode; }
        switch (position) {
            case START: { // O(1)
                newNode.next = node;
                node = newNode;
                break;
            }
            case AFTER: { // O(1)
                newNode.next = node.next;
                node.next = newNode;
                break;
            }
            case END: { // O(n)
                ListNode<T> curr = node;
                while (curr.next != null) {
                    curr = curr.next;
                }
                curr.next = newNode;
                break;
            }
        }
        return node;
    }

    public static <T> ListNode<T> removeDataByPosition(ListNode<T> node, OpPosition position) {
        if (node == null) { return node; }
        switch (position) {
            case START: { // O(1)
                if (node.next == null) { return null; }
                ListNode<T> temp = node;
                node = temp.next;
                break;
            }
            case AFTER: { // O(1)
                node.next = node.next.next;
                break;
            }
            case END: { // O(n)
                if (node.next == null) { return null; }
                ListNode<T> temp = node;
                while (temp.next.next != null) {
                    temp = temp.next;
                }
                temp.next = null;
                break;
            }
        }
        return node;
    }

    // O(n)
    public static <T> ListNode<T> removeData(ListNode<T> head, T data) {
        ListNode<T> prev = null;
        ListNode<T> curr = head;
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

    public static <T> boolean isIdentical(ListNode<T> a, ListNode<T> b) {
        while (a != null && b != null) {
            if (a.data != b.data) {
                break;
            }
            a = a.next;
            b = b.next;
        }
        return a==null && b==null;
    }

    // deep copy O(n)
    public static <T> ListNode<T> cloneList(ListNode<T> head) {
        if (head == null) return null;

        ListNode<T> deepCopy = new ListNode<>(head.data);
        if (head.next == null) return deepCopy;

        ListNode<T> latest = new ListNode<>(head.next.data);
        deepCopy.next = latest;

        while (head.next.next != null) {
            ListNode<T> temp = new ListNode<>(head.next.next.data);
            latest.next = temp;
            latest = temp;
            head = head.next;
        }
        return deepCopy;
    }

    public static int[] convertToArray(ListNode<Integer> head) {
        int[] array = new int[head.getSize()];
        ListNode<Integer> curr = head;
        for (int i=0; i<array.length && curr != null; i++) {
            array[i] = curr.data;
            curr = curr.next;
        }
        return array;
    }
}