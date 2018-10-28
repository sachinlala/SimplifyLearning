package com.sl.algorithms.core.interfaces.count;

import com.sl.algorithms.core.interfaces.base.BaseInterface;

/**
 * Given a sorted array, find the count of a given target element.<br> Provide both Linear and
 * Logarithmic time-complexity solutions.<br>
 *
 * @param <T> {@link Comparable}
 */
public interface ElementCounter<T extends Comparable> extends BaseInterface<T> {

  int countInLogTime(T[] objects, T targetElement);

  int countInLinearTime(T[] objects, T targetElement);
}
