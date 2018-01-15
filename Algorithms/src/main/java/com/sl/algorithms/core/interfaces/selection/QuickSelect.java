package com.sl.algorithms.core.interfaces.selection;

import com.sl.algorithms.core.interfaces.base.BaseInterface;
import com.sl.algorithms.core.utils.Formulas;

import static com.sl.algorithms.core.utils.ArrayOps.swap;

/**
 * <br><a href="https://en.wikipedia.org/wiki/Quickselect">Reference 1</a>
 * <br><a href="https://www.geeksforgeeks.org/quickselect-algorithm/">Reference 2</a>
 * <br>Time : O(N) average cse, O(N^2) worst case
 * <br>Space: O(1)
 */
public interface QuickSelect<T extends Comparable> extends BaseInterface<T> {

    default T findKthLargest(T[] objects, int k) {
        checkArray(objects);
        return findKthSmallest(objects, objects.length - k + 1);
    }

    /**
     * <br>QuickSelect based default implementation for findKthSmallest problem.
     * <br>e.g. 3rd smallest = 3, when objects:[1,2,3,4,5] & k=3
     */
    default T findKthSmallest(T[] objects, int k) {
        checkArray(objects);
        kCheck(objects.length, k);
        if (objects.length == 1) {
            return objects[0];
        }
        int left = 0, right = objects.length - 1;
        return quickSelect(objects, k - 1, left, right); // because 1 <= k <= N, while an array starts from 0 index
    }

    /**
     * <br>Core QuickSelect Algorithm.<br>
     */
    default T quickSelect(T[] objects, int k, int left, int right) {
        while (left < right) {
            int pivotIndex = medianOf3(objects, left, right);
            pivotIndex = partitionPartialSort(objects, left, right, pivotIndex);
            if (pivotIndex == k) {
                break;
            } else if (pivotIndex > k) {
                right = pivotIndex - 1;
            } else {
                left = pivotIndex + 1;
            }
        }
        return objects[k];
    }

    /**
     * <br><a href="https://stackoverflow.com/a/7560859/5775247">Median of 3 strategy</a>
     */
    @SuppressWarnings("unchecked") // compareTo
    default int medianOf3(T[] objects, int left, int right) {
        int mid = Formulas.midPoint(left, right);
        if (objects[mid].compareTo(objects[left]) < 0) {
            swap(objects, mid, left);
        }
        if (objects[right].compareTo(objects[left]) < 0) {
            swap(objects, right, left);
        }
        if (objects[right].compareTo(objects[mid]) < 0) {
            swap(objects, right, mid);
        }
        return mid;
    }

    /**
     * <br>Core Algorithm to sort one side of the pivot.<br>
     */
    @SuppressWarnings("unchecked") //compareTo
    default int partitionPartialSort(T[] a, int left, int right, int pivotIndex) {
        T pivotValue = a[pivotIndex];
        swap(a, pivotIndex, right); // move pivot to end
        int storeIndex = left;
        for (int i = left; i < right; i++) {
            if (a[i].compareTo(pivotValue) < 0) {
                swap(a, i, storeIndex);
                storeIndex++;
            }
        }
        swap(a, storeIndex, right); // move pivot to it's final place
        return storeIndex;
    }

    default void kCheck(int l, int k) {
        if (k < 1) throw new IllegalArgumentException("k must be at least 1");
        if (l == 1 && k != 1) throw new IllegalArgumentException("k can only be 1 for a single-element array");
        if (l > 1 && k > l) throw new IllegalArgumentException("k is higher than the highest index");
    }
}
