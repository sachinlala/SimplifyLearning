package com.sl.algorithms.search.linearsearch;

import com.sl.algorithms.core.interfaces.search.Search;

/**
 * <br>O(n) time and O(1) space search in a 1-d array.<br>
 */
public class LinearSearch<T extends Comparable> implements Search<T> {

  @Override
  public int findIndex(T[] inputArray, T targetElement) {
    checkArray(inputArray);
    for (int i = 0; i < inputArray.length; i++) {
      if (inputArray[i].equals(targetElement)) {
        return i;
      }
    }
    return ELEMENT_NOT_FOUND;
  }
}
