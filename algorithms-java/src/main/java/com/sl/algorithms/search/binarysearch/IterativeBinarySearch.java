package com.sl.algorithms.search.binarysearch;

import com.sl.algorithms.core.interfaces.search.Search;
import com.sl.algorithms.core.utils.Formulas;

/**
 * <br><u>Objective</u>: Search in a SORTED array, in Logarithmic time.<br> <br><a
 * href="https://en.wikipedia.org/wiki/Binary_search_algorithm">Reference</a><br>
 */
@SuppressWarnings("unchecked")
public class IterativeBinarySearch<T extends Comparable> implements Search<T> {

  /**
   * <br>Since we reduce the search space by half each time, the complexity must be in the order of
   * O(log(n)).<br> <br>O(log(n)) time and O(1) space.<br>
   */
  @Override
  public int findIndex(T[] sortedInput, T targetElement) {
    checkArray(sortedInput);
    int start = 0, end = sortedInput.length - 1;
    return findIndexIteratively(sortedInput, targetElement, start, end);
  }

  protected int findIndexIteratively(T[] sortedInput, T itemToSearch, int start, int end) {
    while (start <= end) {  // the equality check here is important
      int midPoint = Formulas.midPoint(start, end);
      T midValue = sortedInput[midPoint];
      if (itemToSearch.equals(midValue)) {
        return midPoint; // index found
      }
      if (itemToSearch.compareTo(midValue) < 0) {
        end = midPoint - 1; // go left
      } else {
        start = midPoint + 1; // go right
      }
    }
    return ELEMENT_NOT_FOUND;
  }
}
