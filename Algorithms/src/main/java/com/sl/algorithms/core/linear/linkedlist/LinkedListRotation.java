package com.sl.algorithms.core.linear.linkedlist;

public class LinkedListRotation {

    LinkedListRotation() {
        /**
         * This is a utility class.<br>
         */
    }

    /**
     * Counter-clockwise rotation:<br><br>
     * 1. Reach the kth node and preserve it<br>
     * 2. Continue linkedlist, reach to the original tail<br>
     * 3. Join original tail with the original head<br>
     * 4. Mark (k+1)th node as the new head<br>
     * 5. Mark kth node as the new tail<br>
     * // O(n)
     */
    public static <T> ListNode<T> rotateListLeft(ListNode<T> head, int k) {
        if (head == null || head.next == null || k == 0) {
            return head;
        }
        ListNode<T> kNode=null, curr=head;
        // traverse upto kth node
        for (int i = 1; i < k; i++) {
            curr = curr.next;
            if (curr == null) {
                curr = head;
            }
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
     * 1. Reach the original tail and record size<br>
     * 2. Find the new tail where seed=(n-(k%n))
     * 3. Join original tail with the original head<br>
     * 4. Mark (n-k+1)th node as the new head<br>
     * 5. Mark (n-k)th node as the new tail<br>
     * // O(n)
     */
    public static <T> ListNode<T> rotateListRight(ListNode<T> head, int k) {
        if (head == null || head.next == null || k == 0) {
            return head;
        }
        int size = 1;
        ListNode<T> fast=head, slow=head;
        // reach the original tail and find the size
        while (fast.next != null) {
            size++;
            fast = fast.next;
        }
        // find the seed value to find the new tail
        // (k%size) is to ensure we can handle any value of k i.e. k <=> size
        int seed = size - (k % size);
        for (int i = seed; i > 1; i--) {
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
}
