package com.sl.algorithms.sort.generalpurpose;

import com.sl.algorithms.core.interfaces.select.QuickSelect;
import com.sl.algorithms.core.interfaces.sort.SortingEngine;
import com.sl.algorithms.core.list.ListNode;

/**
 * <br>A general-purpose non-stable sort algorithm with an average time complexity of O(nlogn) and
 * O(n) worst-case recursive space.<br> <br><u>Inventor</u>:&nbsp;<a
 * href="https://en.wikipedia.org/wiki/Tony_Hoare">Tony Hoare</a><br> <br><a
 * href="https://en.wikipedia.org/wiki/Quicksort">Reference 1</a> <br><a
 * href="https://brilliant.org/wiki/quick-sort/">Reference 2</a>
 */
public class QuickSort<T extends Comparable> implements SortingEngine<T>, QuickSelect<T> {

  @Override
  public void sort(T[] objects) {
    checkArray(objects);
    int n = objects.length;
    if (n == 1) {
      return;
    }
    quickSort(objects, 0, n - 1);
  }

  /**
   * <p>Find a pivot, sort recursively around that.</p>
   *
   * @param objects array to be sorted
   * @param s start index (inclusive)
   * @param e end index (inclusive)
   */
  private void quickSort(T[] objects, int s, int e) {
    if (s >= e) {
      return;
    }
    int p = pivotSort(objects, s, e, medianOf3(objects, s, e));
    quickSort(objects, s, p);
    quickSort(objects, p + 1, e);
  }

  @Override
  public ListNode<T> sortList(ListNode<T> head) {
    throw new UnsupportedOperationException();
  }
}
