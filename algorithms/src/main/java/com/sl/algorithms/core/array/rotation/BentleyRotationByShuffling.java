package com.sl.algorithms.core.array.rotation;

import static com.sl.algorithms.core.utils.Formulas.hcf;

import com.sl.algorithms.core.interfaces.rotate.RotationEngine;
import com.sl.algorithms.core.list.ListNode;

/**
 * <br>Problem: Rotate linear of size 'n' by 'kMax' positions, leftwards (counter-clockwise).<br>
 * <br><a href="https://eli.thegreenplace.net/2008/08/29/space-efficient-list-rotation">Reference</a><br>
 * <br><a href="https://en.wikipedia.org/wiki/Jon_Bentley_(computer_scientist)">Jon Bentley</a><br>
 */
public class BentleyRotationByShuffling<T extends Comparable> implements RotationEngine<T> {

  @Override
  public T[] rotate(T[] objects, int k, boolean clockwise) {
    checkArray(objects);
    if (clockwise) {
      throw new IllegalArgumentException(OPERATION_NOT_SUPPORTED_YET);
    }
    return rotateLeftByJuggling(objects, k);
  }

  // O(n) time and O(1) space
  private T[] rotateLeftByJuggling(T[] a, int k) {
    int n = a.length;
    k = k % n;
    if (k == 0) {
      return a;
    }
    int hcf = hcf(n, k);
    int i, j, delta;
    T temp;
    for (i = 0; i < hcf; i++) {
      temp = a[i];
      for (j = i; j < n; ) {
        delta = (j + k) % n; // %n is required to prevent overflow
        if (delta == i) {
          break;
        }
        a[j] = a[delta];
        j = delta;
      }
      a[j] = temp;
    }
    return a;
  }

  @Override
  public ListNode<T> rotate(ListNode<T> listNode, int k, boolean clockwise) {
    throw new UnsupportedOperationException();
  }
}
