package com.sl.algorithms.sort.advanced.wave;

import static com.sl.algorithms.core.utils.ArrayOps.swap;

import com.sl.algorithms.core.interfaces.select.MedianFinder;
import com.sl.algorithms.core.interfaces.select.QuickSelect;
import com.sl.algorithms.core.interfaces.sort.SortingEngine;
import com.sl.algorithms.core.list.ListNode;
import com.sl.algorithms.search.median.QuickSelectMedianFinder;
import com.sl.algorithms.sort.finitegroups.DutchNationalFlagSort;

/**
 * <br><a href="https://leetcode.com/problems/wiggle-sort-ii/description/">Reference</a><br>
 *
 * @see QuickSelect
 * @see DutchNationalFlagSort
 */
@SuppressWarnings("unchecked")
public class WiggleSortII<T extends Comparable> implements SortingEngine<T> {

  private static final MedianFinder medianFinder = new QuickSelectMedianFinder<>();

  @Override
  public void sort(T[] A) {
    checkArray(A);
    int n = A.length;
    if (n < 2) {
      return;
    }
    Comparable M = medianFinder.findMedian(A);
    int r = 0, w = n - 1, b = n - 1;
    while (w >= r) {
      T obj = A[index(w, n)];
      if (obj.compareTo(M) > 0) { // because the requirement is num1 < num2 > num3
        swap(A, index(r, n), index(w, n));
        r++;
      } else if (obj.compareTo(M) < 0) {
        swap(A, index(b, n), index(w, n));
        b--;
        w--;
      } else {
        w--;
      }
    }
  }

  private int index(int index, int n) {
    return (1 + 2 * index) % (n | 1);
  }

  @Override
  public ListNode<T> sortList(ListNode<T> head) {
    throw new UnsupportedOperationException();
  }
}
