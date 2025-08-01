package com.sl.algorithms.sort.finitegroups.bucketsort;

/**
 * <p><u>Requirement</u>: Sort a list of floating-point numbers that are uniformly distributed over
 * a range, in "linear time".</p>
 *
 * @see BucketSort
 */
public class FPBucketSort<T extends Double> extends BucketSort<T> {

  @Override
  public int bucketIndex(T obj, int n) {
    double value = obj;
    // Normalize to [0,1] range and then multiply by (n-1) to get bucket index
    double normalizedValue = (value + 1.0) / 2.0;  // This maps [-1,1] to [0,1]
    return Math.min(n - 1, Math.max(0, (int) (normalizedValue * n)));
  }
}