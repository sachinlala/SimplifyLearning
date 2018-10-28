package com.sl.algorithms.core.interfaces.select;

/**
 * <br>Given an array A = A[1,...,n] and an index kMax (1 ≤ kMax ≤ n), find the kth smallest element
 * of A.<br> <br><a href="https://brilliant.org/wiki/median-finding-algorithm/#">Reference 1</a>
 * <br><a href="https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-046j-design-and-analysis-of-algorithms-spring-2012/lecture-notes/MIT6_046JS12_lec01.pdf">Reference
 * 2</a>
 */
public interface MedianFinder<T extends Comparable> extends QuickSelect<T> {

  default T findMedian(T[] objects) {
    checkArray(objects);
    int n = objects.length;
    if (n == 1) {
      return objects[0];
    }
    int k = n / 2;
    if (n % 2 != 0) {
      k++;
    }
    return findKthSmallest(objects, k);
    /**
     * To get more precise, for even length list, we could do an average of the middle 2 elements.
     */
  }

  default T findMinimum(T[] objects) {
    checkArray(objects);
    return findKthSmallest(objects, 1);
  }

  default T findMaximum(T[] objects) {
    checkArray(objects);
    return findKthSmallest(objects, objects.length);
  }
}
