package com.sl.algorithms.core.interfaces.select;

import static com.sl.algorithms.core.utils.ArrayOps.swap;

import com.sl.algorithms.core.interfaces.base.BaseInterface;
import com.sl.algorithms.core.utils.Formulas;

/**
 * <p>Find kth largest/smallest element in an unsorted array, in Linear time as average-case.</p>
 * <br><a href="https://en.wikipedia.org/wiki/Quickselect">Reference 1</a> <br><a
 * href="https://www.geeksforgeeks.org/quickselect-algorithm/">Reference 2</a> <br>Time : O(N)
 * average case, O(N^2) worst case <br>Space: O(1)
 */
@SuppressWarnings("unchecked") //compareTo
public interface QuickSelect<T extends Comparable> extends BaseInterface<T> {

  default T findKthLargest(T[] objects, int k) {
    checkArray(objects);
    return findKthSmallest(objects, objects.length - k + 1);
  }

  /**
   * <br>QuickSelect based default implementation for findKthSmallest problem.
   *
   * @param objects input array
   * @param k 3rd smallest = 3, when objects:[1,2,3,4,5] and k=3
   * @return kth smallest element in objects
   */
  default T findKthSmallest(T[] objects, int k) {
    checkArray(objects);
    int n = objects.length;
    kCheck(n, k);
    if (n == 1) {
      return objects[0];
    }
    return quickSelect(objects, k, 0, n);
  }

  /**
   * <br>Core QuickSelect Algorithm.<br>
   *
   * @param objects input array
   * @param k 3rd smallest = 3, when objects:[1,2,3,4,5] and k=3
   * @param s start index (inclusive)
   * @param e end index (inclusive)
   * @return kth element
   */
  default T quickSelect(T[] objects, int k, int s, int e) {
    k--; // because 1 <= kMax <= N, while an array starts from 0 index
    e--; // to prevent overflow
    while (s < e) {
      int p = pivotSort(objects, s, e, medianOf3(objects, s, e));
      if (p == k) {
        break;
      } else if (p > k) {
        e = p - 1;
      } else {
        s = p + 1;
      }
    }
    return objects[k];
  }

  /**
   * <br>Core Algorithm to sort one side of the pivot.<br>
   *
   * @param a input array
   * @param s start index (inclusive)
   * @param e end index (inclusive)
   * @param p initial pivot
   * @return pivot index after sort
   */
  default int pivotSort(T[] a, int s, int e, int p) {
    T pivotValue = a[p];
    swap(a, p, e); // move pivot to end
    p = s;
    for (int i = s; i < e; i++) {
      if (a[i].compareTo(pivotValue) < 0) {
        swap(a, i, p);
        p++;
      }
    }
    swap(a, p, e); // move pivot to it's final place
    return p;
  }

  /**
   * <br><a href="https://stackoverflow.com/a/7560859/5775247">Median of 3 strategy</a>
   *
   * @param a input array
   * @param s start index (inclusive)
   * @param e end index (inclusive)
   * @return median index
   */
  default int medianOf3(T[] a, int s, int e) {
    int m = Formulas.midPoint(s, e);
    T left = a[s];
    T mid = a[m];
    T right = a[e];
    if (mid.compareTo(left) < 0) {
      swap(a, s, m);
    }
    if (right.compareTo(mid) < 0) {
      swap(a, m, e);
    }
    if (right.compareTo(left) < 0) {
      swap(a, s, e);
    }
    return m;
  }

  default void kCheck(int n, int k) {
    if (k < 1) {
      throw new IllegalArgumentException("kMax must be at least 1");
    }
    if (n == 1 && k != 1) {
      throw new IllegalArgumentException("kMax can only be 1 for a single-element array");
    }
    if (n > 1 && k > n) {
      throw new IllegalArgumentException("kMax is higher than the highest index");
    }
  }
}
