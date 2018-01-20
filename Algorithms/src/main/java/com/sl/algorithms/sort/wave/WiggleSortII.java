package com.sl.algorithms.sort.wave;

import com.sl.algorithms.core.baseObj.ListNode;
import com.sl.algorithms.core.interfaces.sorting.SortingEngine;
import com.sl.algorithms.core.interfaces.selection.MedianFinder;
import com.sl.algorithms.select.median.QuickSelectMedianFinder;

import static com.sl.algorithms.core.utils.ArrayOps.swap;

/**
 * <br><a href="https://leetcode.com/problems/wiggle-sort-ii/description/">Reference</a><br>
 */
@SuppressWarnings("unchecked") // due to generic array
public class WiggleSortII<T extends Comparable> implements SortingEngine<T> {

    //TODO - add support for String data-type
    @Override
    public void sort(T[] objects) {// only for integers for now
        checkArray(objects);

        MedianFinder<T> medianFinder = new QuickSelectMedianFinder<>();
        T median = medianFinder.findMedian(objects);

        int length = objects.length, low = 0, middle = 0, high = objects.length - 1;
        while (middle <= high) {
            if (objects[newIndex(middle, length)].compareTo(median) > 0) {
                swap(objects, newIndex(low++, length), newIndex(middle++, length));
            } else if (objects[newIndex(middle, length)].compareTo(median) < 0) {
                swap(objects, newIndex(high--, length), newIndex(middle, length));
            } else {
                middle++;
            }
        }
    }

    private int newIndex(int index, int n) {
        int newIndex = 1;
        newIndex += 2 * index;
        newIndex %= (n | 1);
        return newIndex;
    }

    @Override
    public ListNode<T> sortList(ListNode<T> list) {
        throw new UnsupportedOperationException();
    }
}
