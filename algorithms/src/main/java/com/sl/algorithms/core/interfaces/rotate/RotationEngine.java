package com.sl.algorithms.core.interfaces.rotate;

import com.sl.algorithms.core.interfaces.base.BaseInterface;
import com.sl.algorithms.core.list.ListNode;
import java.util.Arrays;

public interface RotationEngine<T extends Comparable> extends BaseInterface<T> {

  T[] rotate(T[] objects, int k, boolean clockwise);

  ListNode<T> rotate(ListNode<T> head, int k, boolean clockwise);

  default boolean isRotation(T[] A, T[] B) {
    checkArray(A);
    checkArray(B);
    if (Arrays.equals(A, B)) {
      return true;
    }
    int nA = A.length, nB = B.length;
    if (nA != nB) {
      return false;
    }
    T common = A[0];
    int index = -1;
    for (int i = 0; i < nB; i++) {
      if (common.equals(B[i])) {
        index = i;
        break;
      }
    }
    if (index == -1) {
      return false;
    }
    for (int j = 0; j < nA; j++) {
      T a = A[j];
      T b = B[(j + index) % nA];
      if (!a.equals(b)) {
        return false;
      }
    }
    return true;
  }

  default boolean isRotation(ListNode<T> A, ListNode<T> B) {
    checkList(A);
    checkList(B);
    if (A.equals(B)) {
      return true;
    }
    int nA = A.size(), nB = B.size();
    if (nA != nB) {
      return false;
    }
    ListNode<T> a = A, b = B;
    while (b != null) {
      if (b.compareTo(a) == 0) {
        break;
      }
      b = b.next;
    }
    if (b == null) {
      return false;
    }
    while (a != null) {
      if (a.compareTo(b) != 0) {
        return false;
      }
      a = a.next;
      b = b.next;
      if (b == null) {
        b = B;
      }
    }
    return true;
  }
}
