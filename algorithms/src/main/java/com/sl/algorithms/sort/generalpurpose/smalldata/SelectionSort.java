package com.sl.algorithms.sort.generalpurpose.smalldata;

import static com.sl.algorithms.core.utils.ArrayOps.swap;

import com.sl.algorithms.core.interfaces.sort.SortingEngine;
import com.sl.algorithms.core.list.ListNode;

/**
 * <br>In-place quadratic-complexity sort algorithm, useful for small data-set.<br> <br><a
 * href="https://www.hackerearth.com/practice/algorithms/sorting/selection-sort/tutorial/">Reference</a><br>
 * <br><u>Approach</u>:&nbsp;Given a list, take the current element and exchange it with the
 * smallest element on the right.<br> <br><u>Usage</u>:&nbsp;Small data-set / when 'write' operation
 * is expensive.<br> <br><u>Inner Loop</u>:&nbsp;operates on the Unsorted portion.<br>
 */
@SuppressWarnings("unchecked")
public class SelectionSort<T extends Comparable> implements SortingEngine<T> {

  @Override
  public void sort(T[] objects) {
    checkArray(objects);
    int n = objects.length;
    if (n == 1) {
      return;
    }
    for (int i = 0; i < n; i++) {
      int minIndex = i;
      for (int j = i + 1; j < n;
          j++) { // this is where a heap will be best to bring down the overall complexity down to nlogn
        T curr = objects[j];
        T min = objects[minIndex];
        if (curr.compareTo(min) < 0) {
          minIndex = j;
        }
      }
      swap(objects, minIndex, i);
    }
  }

  @Override
  public ListNode<T> sortList(ListNode<T> head) {
    throw new UnsupportedOperationException();
  }
}
