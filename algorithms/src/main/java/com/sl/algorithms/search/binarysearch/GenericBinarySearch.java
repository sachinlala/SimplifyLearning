package com.sl.algorithms.search.binarysearch;

import com.sl.algorithms.core.interfaces.search.Search;
import com.sl.algorithms.core.utils.Formulas;

/**
 * <br>Search object in a sorted (and rotated) list.<br> <br><u>Related Problems</u>: <br><a
 * href="https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/description/">Find
 * Minimum in a Rotated Sorted Array</a> <br><a href="https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii/description/">Find
 * Minimum in a Rotated Sorted Array (with duplicates)</a> <br><a href="https://leetcode.com/problems/search-in-rotated-sorted-array/description/">Search
 * in Rotated Sorted Array</a> <br><a href="https://leetcode.com/problems/search-in-rotated-sorted-array-ii/description/">Search
 * in Rotated Sorted Array (with duplicates)</a>
 */
public class GenericBinarySearch<T extends Comparable> implements Search<T> {

  @Override
  public int findIndex(T[] rotatedSortedInput, T targetElement) {
    checkArray(rotatedSortedInput);
    int start = 0, end = rotatedSortedInput.length - 1;
    int startOfAscent =
        rotatedSortedInput.length == 1 ? 0 : findStartOfAscent(rotatedSortedInput, start, end);
    return findIndexGeneric(rotatedSortedInput, targetElement, start, end, startOfAscent);
  }

  @SuppressWarnings("unchecked") // compareTo
  private int findIndexGeneric(T[] a, T target, int start, int end, int startOfAscent) {
    while (start <= end) {
      int midPoint = Formulas.midPoint(start, end);
      int realMidPoint = (midPoint + startOfAscent) % a.length;
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
    return ELEMENT_NOT_FOUND;
  }

  public int findStartOfAscent(T[] a) {
    checkArray(a);
    return a.length == 1 ? 0 : findStartOfAscent(a, 0, a.length - 1);
  }

  @SuppressWarnings("unchecked") // compareTo
  private int findStartOfAscent(T[] a, int start, int end) {
    // both checks are necessary e.g. when all elements are the same or when all elements are same except one (e.g. [1,3,1,1,1])
    T leftValue = a[start];
    T rightValue = a[end];
    while (start < end && leftValue.compareTo(rightValue) >= 0) {
      int m = Formulas.midPoint(start, end);
      int mDiff = a[m].compareTo(a[end]);
      if (mDiff == 0) {
        if (leftValue.compareTo(a[--end])
            < 0) { // this is to handle duplicates and also sparsed array e.g. {1,1,1,2,1,1}
          return ++end;
        }
      } else if (mDiff > 0) { // start-index is at the right
        start = m + 1;
      } else { // if (mDiff < 0) // start-index is at the left
        end = m;
      }
      leftValue = a[start];
      rightValue = a[end];
    }
    return start;
  }
}
