package com.sl.algorithms.core.array.rotation;

import com.sl.algorithms.core.interfaces.rotate.RotationEngine;
import com.sl.algorithms.core.list.ListNode;

/**
 * <br>Problem: Rotate array of size 'n' by 'kMax' positions.<br> <br><a
 * href="https://eli.thegreenplace.net/2008/08/29/space-efficient-list-rotation">Reference</a>
 */
public class BruteForceRotation<T extends Comparable> implements RotationEngine<T> {

  @Override
  public T[] rotate(T[] objects, int k, boolean clockwise) {
    checkArray(objects);
    if (clockwise) {
      return rotateRight(objects, k);
    } else {
      return rotateLeft(objects, k);
    }
  }

  // O(kn) time and O(1) space
  private T[] rotateLeft(T a[], int k) {
    for (int i = 0; i < (k % a.length); i++) {
      int j = 0;
      T temp = a[j];
      for (; j < a.length - 1; j++) {
        a[j] = a[j + 1];
      }
      a[j] = temp; // assign the staged value to the last element
    }
    return a;
  }

  // O(kn) time and O(1) space
  private T[] rotateRight(T a[], int k) {
    for (int i = 0; i < (k % a.length); i++) {
      int j = a.length - 1;
      T temp = a[j];
      for (; j > 0; j--) {
        a[j] = a[j - 1];
      }
      a[j] = temp; // assign the staged value to the last element
    }
    return a;
  }

  @Override
  public ListNode<T> rotate(ListNode<T> listNode, int k, boolean clockwise) {
    throw new UnsupportedOperationException();
  }
}
