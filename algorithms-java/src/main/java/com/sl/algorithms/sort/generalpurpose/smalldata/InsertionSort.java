package com.sl.algorithms.sort.generalpurpose.smalldata;

import com.sl.algorithms.core.interfaces.sort.SortingEngine;
import com.sl.algorithms.core.list.ListNode;

/**
 * <br>In-place, stable and online quadratic-complexity sort algorithm useful for small
 * data-set.<br> <br><u>Approach</u>:&nbsp;Given a list, take the current element and insert it at
 * the appropriate position of the list, adjusting the list every time you insert. It is similar to
 * arranging the cards in a Card game.<br> <br><u>Usage</u>:&nbsp;Typical implementations of the
 * general-purpose quick/merge-sort also switch to insertion-sort for small data-sets.<br> Insertion
 * Sort an adaptive algorithm i.e. efficient for data sets already sorted to some degree.<br>
 * <br><u>Inner Loop</u>:&nbsp;operates on the Sorted portion.<br> <a
 * href="https://en.wikipedia.org/wiki/Insertion_sort">Reference</a><br>
 */
public class InsertionSort<T extends Comparable> implements SortingEngine<T> {

  @SuppressWarnings("unchecked") // compareTo
  @Override
  public void sort(T[] objects) {
    checkArray(objects);
    int n = objects.length;
    if (n == 1) {
      return;
    }
    for (int i = 1; i < n; i++) {
      T pivot = objects[i];
      int j = i - 1;
      while (j >= 0 && pivot.compareTo(objects[j]) < 0) {
        objects[j + 1] = objects[j];
        j--;
      }
      objects[j + 1] = pivot;
    }
  }

  /**
   * <a href="https://leetcode.com/problems/insertion-sort-list/description/">Reference</a>
   */
  public ListNode<T> sortList(ListNode<T> head) {
    checkList(head);
    if (head.next == null) {
      return head;
    }
    ListNode<T> dummyNode = ListNode.dummyNode();
    ListNode<T> curr = head;
    while (curr != null) {
      ListNode<T> next = curr.next;
      ListNode<T> prev = dummyNode;
      while (prev.next != null && prev.next.compareTo(curr) < 0) {
        prev = prev.next;
      }
      curr.next = prev.next;
      prev.next = curr;
      curr = next;
    }
    return dummyNode.next;
  }
}
