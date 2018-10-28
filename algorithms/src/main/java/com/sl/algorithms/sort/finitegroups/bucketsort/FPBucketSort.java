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
    double bi = n * (double) obj;
    return (int) bi;
  }
}
