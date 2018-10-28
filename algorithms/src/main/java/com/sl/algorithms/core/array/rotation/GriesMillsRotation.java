package com.sl.algorithms.core.array.rotation;

import static com.sl.algorithms.core.utils.ArrayOps.swapInBlocks;

import com.sl.algorithms.core.interfaces.rotate.RotationEngine;
import com.sl.algorithms.core.list.ListNode;

/**
 * <br><a href="http://www.drdobbs.com/parallel/benchmarking-block-swapping-algorithms/232900395?pgno=2">Gries-Mills
 * Block-Swap Algorithm</a><br>
 */
public class GriesMillsRotation<T extends Comparable> implements RotationEngine<T> {

  // O(n) time and O(1) space
  @Override
  public T[] rotate(T[] objects, int k, boolean clockwise) {
    checkArray(objects);
    if (clockwise) {
      throw new IllegalArgumentException(OPERATION_NOT_SUPPORTED_YET);
    } else {
      return rotateLeftBlockSwap(objects, k);
    }
  }

  private T[] rotateLeftBlockSwap(T[] a, int k) {
    int n = a.length;
    k = k % n;
    if (k == 0) {
      return a;
    }
    int i = k, j = n - k;
    while (i != j) {
      if (i < j) {
        swapInBlocks(a, k - i, k + j - i, i);
        j -= i;
      } else {
        swapInBlocks(a, k - i, k, j);
        i -= j;
      }
    }
    swapInBlocks(a, k - i, k, i);
    return a;
  }

  @Override
  public ListNode<T> rotate(ListNode<T> listNode, int k, boolean clockwise) {
    throw new UnsupportedOperationException();
  }
}
