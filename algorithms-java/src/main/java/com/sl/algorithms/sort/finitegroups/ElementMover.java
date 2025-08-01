package com.sl.algorithms.sort.finitegroups;

import static com.sl.algorithms.core.utils.ArrayOps.swap;

import com.sl.algorithms.core.interfaces.sort.SortingEngine;
import com.sl.algorithms.core.list.ListNode;

/**
 * <br><a href="https://leetcode.com/problems/move-zeroes/description/">Problem Reference</a>
 */
public class ElementMover<T extends Comparable> implements SortingEngine<T> {

  private T element;
  private boolean right;

  ElementMover(T _element, boolean _right) {
    element = _element;
    right = _right;
  }

  /**
   * O(n) time and O(1) space, with optimal # operations in worst case.
   */
  @Override
  public void sort(T[] objects) {
    checkArray(objects);
    int slow = 0, fast = 0;
    if (right) {
      moveRight(objects, element, slow, fast);
    } else {
      moveLeft(objects, element, slow, fast);
    }
  }

  @Override
  public ListNode<T> sortList(ListNode<T> head) {
    throw new UnsupportedOperationException();
  }

  private void moveRight(T[] objects, T element, int slow, int fast) {
    while (fast < objects.length) {
      if (!objects[fast].equals(element)) {
        swap(objects, slow, fast);
        ++slow;
      }
      ++fast;
    }
  }

  private void moveLeft(T[] objects, T element, int slow, int fast) {
    while (fast < objects.length) {
      if (objects[fast].equals(element)) {
        swap(objects, slow, fast);
        ++slow;
      }
      ++fast;
    }
  }
}
