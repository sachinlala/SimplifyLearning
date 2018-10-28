package com.sl.algorithms.sort.generalpurpose.smalldata;

import static com.sl.algorithms.core.utils.ArrayOps.swap;

import com.sl.algorithms.core.interfaces.sort.SortingEngine;
import com.sl.algorithms.core.list.ListNode;

/**
 * <br>Quadratic complexity sort algorithm, with very limited practical use.<br>
 */
@SuppressWarnings("unchecked")
public class BubbleSort<T extends Comparable> implements SortingEngine<T> {

  @Override
  public void sort(T[] objects) {
    checkArray(objects);
    int n = objects.length;
    if (n == 1) {
      return;
    }
    for (int i = 0; i < n - 1; i++) {
      for (int j = 0; j < n - i - 1; j++) {
        T curr = objects[j];
        T next = objects[j + 1];
        if (curr.compareTo(next) > 0) {
          swap(objects, j, j + 1);
        }
      }
    }
  }

  @Override
  public ListNode<T> sortList(ListNode<T> head) {
    throw new UnsupportedOperationException();
  }
}
