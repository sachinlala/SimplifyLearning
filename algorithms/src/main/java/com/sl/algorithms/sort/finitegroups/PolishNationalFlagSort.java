package com.sl.algorithms.sort.finitegroups;

import static com.sl.algorithms.core.utils.ArrayOps.swap;

import com.sl.algorithms.core.interfaces.sort.SortingEngine;
import com.sl.algorithms.core.list.ListNode;

/**
 * <br>A precursor to {@link DutchNationalFlagSort}, inspired by <a href="https://www.sciencedirect.com/science/article/pii/S0304397505001684">Wei-Mei
 * Chen's paper</a>.<br>
 */
public class PolishNationalFlagSort<T extends Comparable> implements SortingEngine<T> {

  private T white;
  private T red;

  /**
   * <a href="https://en.wikipedia.org/wiki/Flag_of_Poland">Polish Flag</a>
   *
   * @param _white : value of first group
   * @param _red : value of second group
   */
  public PolishNationalFlagSort(T _white, T _red) {
    white = _white;
    red = _red;
  }

  /**
   * @param _white : primary value for sort.<br> i.e. everything else is red and can be any value
   * hence will settle in the right.<br>
   */
  public PolishNationalFlagSort(T _white) {
    white = _white;
  }

  /**
   * <br><u>Approach</u>:<br> <p>The two indices 'w' and 'r' keep track of the white and red block
   * boundaries, respectively.<br> First, we scan from the left end of the array by incrementing 'w'
   * until we find a !white element, and we scan from the right end of the array by decrementing 'r'
   * until we find a white element. We then exchange the two elements. Continue this way until 'w'
   * and 'r' meet.<br> Note that the scanning process is the same as that of the partition procedure
   * of {@link com.sl.algorithms.sort.generalpurpose.QuickSort} or {@link
   * com.sl.algorithms.search.median.QuickSelectMedianFinder}.</p>
   */
  @Override
  public void sort(T[] A) {
    checkArray(A);
    int w = 0, r = A.length - 1;
    while (w < r) {
      while (A[w].equals(white) && w < r) {
        w++;
      }
      while (!A[r].equals(white) && w < r) {
        r--;
      }
      if (w < r) {
        swap(A, w, r);
        w++;
        r--;
      }
    }
  }

  @Override
  public ListNode<T> sortList(ListNode<T> list) {
    throw new UnsupportedOperationException();
  }
}
