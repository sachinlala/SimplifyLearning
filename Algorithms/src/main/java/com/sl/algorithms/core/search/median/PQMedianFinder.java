package com.sl.algorithms.core.search.median;

import com.sl.algorithms.core.interfaces.search.MedianFinder;

import java.util.Collections;
import java.util.PriorityQueue;
import java.util.Queue;

/**
 * <br>{@link PriorityQueue} (Max Heap) based solution, for reference only.<br>
 *     <br>Time : O(N logN) worst-case and O(N logk) on average
 *     <br>Space: O(N) worst case and O(k) on average
 */
public class PQMedianFinder<T extends Comparable> implements MedianFinder<T> {

    /**
     * @inheritDoc
     */
    @Override
    public T findKthSmallest(T[] objects, int k) {
        objChecks(objects);
        int l = objects.length;
        kCheck(l, k);
        if (l == 1) return objects[0];
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
