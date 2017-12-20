package com.sl.algorithms.core.sorting;

import static com.sl.algorithms.core.sorting.median.MedianFinder.findMedian;

import static com.sl.algorithms.core.linear.array.ArrayOps.swap;

/**
 * <br><a href="https://leetcode.com/problems/wiggle-sort-ii/description/">Reference</a><br>
 */
public class WiggleSortII<T extends Comparable> implements SortingEngine {
    @Override
    public void sort(Comparable[] objects) {// only for integers for now
        if (objects == null || objects.length <= 1) return;

        //TODO //FIXME - add support for String data-type
        Integer median = (Integer)findMedian(objects);

        int length=objects.length, low=0, middle=0, high=objects.length-1;
        while (middle <= high) {
            if (objects[newIndex(middle, length)].compareTo(median) > 0) {
                swap(objects, newIndex(low++, length), newIndex(middle++, length));
            }
            else if (objects[newIndex(middle, length)].compareTo(median) < 0) {
                swap(objects, newIndex(high--, length), newIndex(middle, length));
            }
            else {
                middle++;
            }
        }
    }

    //TODO: analyze this further
    private int newIndex(int index, int n) {
        int newIndex = 1;
        newIndex += 2*index;
        newIndex %= (n|1);
        return newIndex;
    }
}
