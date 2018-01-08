package com.sl.algorithms.core.interfaces.search;

import com.sl.algorithms.core.interfaces.base.BaseInterface;

/**
 * <br>Given an array A = A[1,...,n] and an index k (1 ≤ k ≤ n), find the kth smallest element of A.<br>
 * <br><a href="https://brilliant.org/wiki/median-finding-algorithm/#">Reference 1</a>
 * <br><a href="https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-046j-design-and-analysis-of-algorithms-spring-2012/lecture-notes/MIT6_046JS12_lec01.pdf">Reference 2</a>
 */
public interface MedianFinder<T extends Comparable> extends BaseInterface<T> {

    /**
     * e.g. 3rd smallest = 3, for objects:[1,2,3,4,5] & k=3
     */
    T findKthSmallest(T[] objects, int k);

    default T findMedian(T[] objects) {
        objChecks(objects);
        int k = objects.length / 2;
        if (objects.length % 2 != 0) k++;
        return findKthSmallest(objects, k);
        /**
         * To get more precise, we could do an average of the middle 2 elements.
         */
    }

    default T findMinimum(T[] objects) {
        objChecks(objects);
        return findKthSmallest(objects, 1);
    }

    default T findMaximum(T[] objects) {
        objChecks(objects);
        return findKthSmallest(objects, objects.length);
    }

    default void kCheck(int l, int k) {
        if (k < 1) throw new IllegalArgumentException("k must be at least 1");
        if (l == 1 && k != 1) throw new IllegalArgumentException("k can only be 1 for a single-element array");
        if (l > 1 && k > l) throw new IllegalArgumentException("k is higher than the highest index");
    }
}
