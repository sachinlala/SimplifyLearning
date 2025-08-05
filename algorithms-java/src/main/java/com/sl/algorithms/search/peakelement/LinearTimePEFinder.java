package com.sl.algorithms.search.peakelement;

import com.sl.algorithms.core.interfaces.search.PeakElementFinder;

/**
 * <p>Linear time-complexity algorithm to find peak element in a bitonic series.</p>
 *
 * @see PeakElementFinder
 */
public class LinearTimePEFinder<T extends Comparable> implements PeakElementFinder<T> {

  /**
   * {@inheritDoc}
   */
  @SuppressWarnings("unchecked")
  @Override
  public T findPeakElement(T[] objects) {
    checkArray(objects);
    if (objects.length == 1) {
      return objects[0];
    }
    int start = 0, end = objects.length - 1;
    while (start != end) {
      if (objects[start].compareTo(objects[end]) < 0) {
        start++;
      } else {
        end--;
      }
    }
    return objects[start];
  }
}
