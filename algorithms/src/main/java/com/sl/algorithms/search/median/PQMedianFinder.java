package com.sl.algorithms.search.median;

import com.sl.algorithms.core.interfaces.select.MedianFinder;
import java.util.Collections;
import java.util.PriorityQueue;
import java.util.Queue;

/**
 * <br>{@link PriorityQueue} (Max Heap) based solution, for reference only.<br> <br>Time : O(N logN)
 * worst-case and O(N logk) on average <br>Space: O(N) worst case and O(kMax) on average
 */
public class PQMedianFinder<T extends Comparable> implements MedianFinder<T> {

  @Override
  public T findKthSmallest(T[] objects, int k) {
    checkArray(objects);
    int n = objects.length;
    kCheck(n, k);
    if (n == 1) {
      return objects[0];
    }
    Queue<T> priorityQueue = new PriorityQueue<>(Collections.reverseOrder());
    for (T obj : objects) {
      priorityQueue.add(obj);
      if (priorityQueue.size() > k) {
        priorityQueue.poll();
      }
    }
    return priorityQueue.peek();
  }
}
