package com.sl.algorithms.sort.finitegroups.bucketsort;

import com.sl.algorithms.core.interfaces.sort.SortingEngine;
import com.sl.algorithms.core.list.ListNode;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * <p>A sort algorithm (non-stable, out-of-place) that uses O(n) space and provides O(n) best-case
 * and O(n^2) average/worst-case time-complexity.</p> <br><a href="https://en.wikipedia.org/wiki/Bucket_sort">Reference
 * Reading</a> <br><a href="https://www.cs.usfca.edu/~galles/visualization/BucketSort.html">Visualization</a>
 */
@SuppressWarnings("unchecked")
public abstract class BucketSort<T extends Comparable> implements SortingEngine<T> {

  @Override
  public void sort(T[] objects) {
    checkArray(objects);
    int n = objects.length;
    if (n == 1) {
      return;
    }
    bucketSort(objects, n);
  }

  /**
   * <br><u>Steps</u>:<br> <br>0. Create n buckets. <br>1. Put elements in their respective 'range'
   * buckets: <br>e.g. for {0.4, 0.6, 0.9}, buckets : {b0, b1, b2, b3}, and then b0:{}, b1:{0.4,
   * 0.6}, b2:{0.9}, b3:{}. <br>2. Sort each bucket, using insertion sort. <br>3. Concatenate the
   * buckets to produce the resultant sorted list.
   */
  private void bucketSort(T[] objects, int n) {
    List<T>[] bucketList = new ArrayList[n + 1];
    for (int i = 0; i < n; i++) {
      T obj = objects[i];
      int bi = bucketIndex(obj, n);
      if (bucketList[bi] == null) {
        bucketList[bi] = new ArrayList<>();
      }
      bucketList[bi].add(obj);
    }
    int index = 0;
    for (int i = 0; i < n; i++) {
      List<T> bucket = bucketList[i];
      if (bucket != null) {
        Collections.sort(bucket);
        for (T obj : bucket) {
          objects[index++] = obj;
        }
      }
    }
  }

  public abstract int bucketIndex(T obj, int n);

  @Override
  public ListNode<T> sortList(ListNode<T> head) {
    throw new UnsupportedOperationException();
  }
}
