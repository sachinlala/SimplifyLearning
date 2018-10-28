package com.sl.algorithms.search.median;

import com.sl.algorithms.core.interfaces.select.MedianFinder;
import java.util.Arrays;

/**
 * <br>Brute-force solution, for reference only.<br> <br>Time : O(N logN) <br>Space: O(N)
 */
@SuppressWarnings("unchecked") // because of Arrays.parallelSort call
public class BruteForceMedianFinder<T extends Comparable> implements MedianFinder<T> {

  @Override
  public T findKthSmallest(T[] objects, int k) {
    checkArray(objects);
    int n = objects.length;
    kCheck(n, k);
    if (n == 1) {
      return objects[0];
    }
    Arrays.parallelSort(objects);
    return objects[--k]; // because 1 <= kMax <= N, while an array starts from 0 index
  }
}
