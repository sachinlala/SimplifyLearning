package com.sl.algorithms.core.array.rotation;

import com.sl.algorithms.core.interfaces.rotate.RotationEngine;
import com.sl.algorithms.core.list.ListNode;

/**
 * <br>Problem Reference: Rotate array of size 'n' by 'kMax' positions.<br>
 */
public class BruteForceRotationWithSpace<T extends Comparable> implements RotationEngine<T> {

  @Override
  public T[] rotate(T[] objects, int k, boolean clockwise) {
    checkArray(objects);
    if (clockwise) {
      throw new IllegalArgumentException(OPERATION_NOT_SUPPORTED_YET);
    } else {
      return rotateLeft(objects, k);
    }
  }

  // O(n) time and O(n) space
  public T[] rotateLeft(T a[], int k) {
    int n = a.length;
    T[] b = a.clone(); // this is the bottleneck
    k = k % n;
    for (int i = 0; i < n; i++) {
      if (i - k < 0) {
        b[i - k + n] = a[i];
      } else {
        b[i - k] = a[i];
      }
    }
    return b;
  }

  @Override
  public ListNode<T> rotate(ListNode<T> listNode, int k, boolean clockwise) {
    throw new UnsupportedOperationException();
  }
}
