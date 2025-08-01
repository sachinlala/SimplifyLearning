package com.sl.algorithms.core.list.rotation;

import static com.sl.algorithms.core.list.ListNode.createLinkedList;

import com.sl.algorithms.core.interfaces.rotate.RotationEngine;
import com.sl.algorithms.core.list.ListNode;

/**
 * <br><u>Requirement</u>: rotate w/in O(n) time and O(1) space.<br>
 */
public class LinkedListRotation<T extends Comparable> implements RotationEngine<T> {

  /**
   * <br><u>Approach</u>: <br>0. If kMax%size or kMax == 0 then no/full rotation. <br>1. Track 2
   * pointers, one for originalTail and second for newTail. <br>2. Join originalTail with
   * originalHead. <br>3. newTail : right=(n-kMax) | left=(kMax) <br>4. newHead = newTail.next,
   * newTail.next = null. <br>5. Handle scenario when kMax is greater than the size of the list
   * (solution: kMax = kMax%size).
   */
  @Override
  public ListNode<T> rotate(ListNode<T> head, int k, boolean clockwise) {
    if (head == null || head.next == null || k == 0) {
      return head;
    }
    int size = 1, lowerBound = 1, upperBound;
    ListNode<T> tail = head, newTail = head;
    while (tail.next != null) {
      size++;
      tail = tail.next;
    }
    k %= size;
    if (k == 0) {
      return head;
    }
    tail.next = head;
    if (clockwise) { // newTail = (n-kMax)
      upperBound = size - k;
    } else { // newTail = kMax
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
    ListNode<T> rotatedList = rotate(createLinkedList(objects), k, clockwise);
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
