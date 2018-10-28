package com.sl.algorithms.search.peakelement;

import static com.sl.algorithms.core.utils.Formulas.midPoint;

import com.sl.algorithms.core.interfaces.search.PeakElementFinder;

/**
 * <p>Sub-linear time-complexity algorithm to find peak element in a bitonic series.</p>
 *
 * @see PeakElementFinder
 */
public class LogTimePEFinder<T extends Comparable> implements PeakElementFinder<T> {

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
      int midPoint = midPoint(start, end);
      if (objects[midPoint].compareTo(objects[midPoint + 1]) < 0) {
        start = midPoint + 1;
      } else {
        end = midPoint;
      }
    }
    return objects[start];
  }
}
