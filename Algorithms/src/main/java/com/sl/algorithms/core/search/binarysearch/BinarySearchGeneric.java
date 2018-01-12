package com.sl.algorithms.core.search.binarysearch;

import com.sl.algorithms.core.interfaces.search.BinarySearch;

/**
 * <br>{@link BinarySearchGeneric} is useful for both regular and rotated array.<br>
 * <br><u>Related Problems</u>:
 * <br><a href="https://leetcode.com/problems/search-in-rotated-sorted-array/description/">Search in Rotated Sorted Array</a>
 * <br><a href="https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/description/">Find Minimum in a Rotated Sorted Array</a>
 * <br><a href="https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii/description/">Find Minimum in a Rotated Sorted Array (with duplicates)</a>
 */
public class BinarySearchGeneric<T extends Comparable> implements BinarySearch<T> {

    @Override
    public int findIndex(T[] rotatedSortedInput, T itemToSearch) {
        objChecks(rotatedSortedInput);
        int start = 0, end = rotatedSortedInput.length - 1;
        int rotationPoint = findStartOfAscent(rotatedSortedInput, start, end);
        return findIndexGeneric(rotatedSortedInput, itemToSearch, start, end, rotationPoint);
    }

    @SuppressWarnings("unchecked") // compareTo
    private int findIndexGeneric(T[] a, T target, int start, int end, int rotationPoint) {
        while (start <= end) {
            int midPoint = start + (end - start) / 2;
            int realMidPoint = (midPoint + rotationPoint) % a.length;
            int diff = a[realMidPoint].compareTo(target);
            if (diff == 0) {
                return realMidPoint;
            }
            if (diff < 0) {
                start = midPoint + 1;
            } else {
                end = midPoint - 1;
            }
        }
        return NUMBER_NOT_FOUND;
    }

    public int findStartOfAscent(T[] a) {
        objChecks(a);
        return findStartOfAscent(a, 0, a.length - 1);
    }

    @SuppressWarnings("unchecked") // compareTo
    private int findStartOfAscent(T[] a, int start, int end) {
        if (a[start].compareTo(a[end]) <= 0) { // not rotated
            return start;
        }
        while (start < end) {
            int m = start + (end - start) / 2;
            int diff = a[m].compareTo(a[end]);
            if (diff > 0) { // start-index is at the right
                start = m + 1;
            } else if (diff < 0) { // start-index is at the left
                end = m;
            } else { // diff == 0 // this is to handle duplicates
                end--;
            }
        }
        return start;
    }
}
