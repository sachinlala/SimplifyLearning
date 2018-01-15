package com.sl.algorithms.core.linear.linkedlist.rotation;

import com.sl.algorithms.core.baseObj.ListNode;
import com.sl.algorithms.core.interfaces.rwops.RotationEngine;

/**
 * <br><u>Requirement</u>: rotate w/in O(n) time and O(1) space.<br>
 */
public class LinkedListRotation<T extends Comparable> implements RotationEngine<T> {

    /**
     * <br><u>Approach</u>:
     * <br>0. If k%size or k == 0 => no/full rotation.
     * <br>1. Track 2 pointers, one for originalTail and second for newTail.
     * <br>2. Join originalTail with originalHead.
     * <br>3. newTail : right=(n-k) | left=(k)
     * <br>4. newHead = newTail.next, newTail.next = null.
     * <br>5. Handle k>size i.e. k = k%size.
     */
    @Override
    public ListNode<T> rotate(ListNode<T> head, int k, boolean clockwise) {
        if (head == null || head.next == null || k == 0) return head;
        int size = 1, lowerBound = 1, upperBound;
        ListNode<T> tail = head, newTail = head;
        while (tail.next != null) {
            size++;
            tail = tail.next;
        }
        k %= size;
        if (k == 0) return head;
        tail.next = head;
        if (clockwise) { // newTail = (n-k)
            upperBound = size - k;
        } else { // newTail = k
            upperBound = k;
        }
        for (int i = lowerBound; i < upperBound; i++) {
            newTail = newTail.next;
        }
        head = newTail.next;
        newTail.next = null;
        return head;
    }

    public ListNode<T> rotateListLeft(ListNode<T> head, int k) {
        return rotate(head, k, false);
    }

    public ListNode<T> rotateListRight(ListNode<T> head, int k) {
        return rotate(head, k, true);
    }

    @SuppressWarnings("unchecked")
    @Override
    public T[] rotate(T[] objects, int k, boolean clockwise) {
        ListNode<T> rotatedList = rotate(ListNode.createLinkedList(objects), k, clockwise);
        T[] outputArray = (T[]) new Comparable[objects.length];
        int index = 0;
        ListNode<T> ptr = rotatedList;
        while (ptr != null) {
            outputArray[index] = ptr.data;
            ptr = ptr.next;
            index++;
        }
        return outputArray;
    }
}
