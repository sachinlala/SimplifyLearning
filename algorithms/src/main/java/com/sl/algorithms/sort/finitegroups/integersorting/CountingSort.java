package com.sl.algorithms.sort.finitegroups.integersorting;

import com.sl.algorithms.core.interfaces.select.MedianFinder;
import com.sl.algorithms.core.interfaces.sort.SortingEngine;
import com.sl.algorithms.core.list.ListNode;
import com.sl.algorithms.search.median.QuickSelectMedianFinder;

/**
 * <br>A stable special-purpose integer-sort algorithm with linear time and space complexity =
 * O(N+kMax), the range of legit values in the array i.e. (0..kMax-1).<br>
 * <br><u>Inventor</u>:&nbsp;<a href="https://en.wikipedia.org/wiki/Harold_H._Seward">Harold H
 * Seward</a><br> <br><u>Note</u>:&nbsp;kMax is not significantly more than n (only then this algo
 * is advantageous). While I have implemented for integers, counting-sort can be used for any
 * elements as long as their key is an integer.<br> <br><a href="https://en.wikipedia.org/wiki/Counting_sort">Reference
 * Reading 0</a> <br><a href="https://brilliant.org/wiki/counting-sort/">Reference Reading 1</a>
 * <br><a href="https://stackoverflow.com/a/17111445/5775247">Reference Reading 2 (how stability is
 * achieved)</a> <br><a href="http://www.cs.usfca.edu/~galles/visualization/CountingSort.html">Animation</a><br>
 */
@SuppressWarnings("unchecked") // valueOf
public class CountingSort<T extends Integer> implements SortingEngine<T> {

  @Override
  public void sort(T[] nums) {
    checkArray(nums);
    int n = nums.length;
    if (n == 1) {
      return;
    }
    countSort(nums, n, 1, findMax(nums));
  }

  /**
   * @param nums - array to be sorted
   * @param n - size
   * @param digit - the digit's place to use for sort, with defaultValue = 1
   * @param kMax - the range of legit values in the array i.e. (0..kMax-1)
   */
  void countSort(T[] nums, int n, int digit, int kMax) {
    int[] counts = count(nums, digit, kMax);
    T[] output = (T[]) new Integer[n];
    for (int i = n - 1; i >= 0; i--) {
      T obj = nums[i];
      int j = getIndex(obj, digit);
      output[counts[j] - 1] = obj;
      --counts[j];
    }
    System.arraycopy(output, 0, nums, 0, n);
  }

  private int[] count(T[] objects, int digitPlace, int kMax) {
    int[] countArray = new int[kMax + 1];
    for (T obj : objects) { // count
      int i = getIndex(obj, digitPlace);
      ++countArray[i];
    }
    for (int i = 1; i <= kMax; i++) { // mark start-index for each element
      countArray[i] += countArray[i - 1];
    }
    return countArray;
  }

  private int getIndex(int obj, int digitPlace) {
    return (obj / digitPlace) % DECIMAL_RADIX;
  }

  T findMax(T[] objects) {
    MedianFinder<T> medianFinder = new QuickSelectMedianFinder<>();
    return medianFinder.findMaximum(objects);
  }

  @Override
  public ListNode<T> sortList(ListNode<T> list) {
    throw new UnsupportedOperationException();
  }
}
