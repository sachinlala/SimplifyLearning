package com.sl.algorithms.sort.generalpurpose.merge;

import com.sl.algorithms.core.interfaces.sort.SortingEngine;

/**
 * <br>A general-purpose stable sort algorithm with a guaranteed time complexity of O(nlogn) and
 * O(n) space.<br> <br><u>Inventor</u>:&nbsp;<a href="https://en.wikipedia.org/wiki/John_von_Neumann">John
 * Von Neumann</a><br> <br><a href="https://brilliant.org/wiki/merge/">Reference 1</a> <br><a
 * href="https://en.wikipedia.org/wiki/Merge_sort">Reference 2</a>
 */
@SuppressWarnings("unchecked")
public abstract class MergeSort<T extends Comparable> implements SortingEngine<T> {

  /**
   * <u>Objective</u>: MERGE and SORT 2 parts (s to m and m to e) of an array A (read-only), into an
   * output array B.
   *
   * @param source unsorted input array
   * @param s start index
   * @param m midpoint
   * @param e end index
   * @param target auxiliary array to help in the sort process
   */
  public void merge(T[] source, int s, int m, int e, T[] target) {
    int i = s, j = m;
    for (int k = s; k < e; k++) {
      if (i < m && (j >= e || source[i].compareTo(source[j]) <= 0)) {
        target[k] = source[i];
        i++;
      } else {
        target[k] = source[j];
        j++;
      }
    }
  }
}
