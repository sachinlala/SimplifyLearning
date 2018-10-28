package com.sl.algorithms.core.array.count;

import static com.sl.algorithms.core.utils.Formulas.midPoint;

import com.sl.algorithms.core.interfaces.count.ElementCounter;

public class CountElementSortedList<T extends Comparable> implements ElementCounter<T> {

  // O(n) time method - written for reference only
  public int countInLinearTime(T[] objects, T target) {
    int count = 0;
    for (T obj : objects) {
      if (target.equals(obj)) {
        ++count;
      }
    }
    return count;
  }

  @Override
  public int countInLogTime(T[] objects, T target) {
    checkArray(objects);
    int s = 0, e = objects.length - 1;
    int minIndex = findMinIndex(objects, target, s, e);
    if (minIndex < 0) {
      return 0;
    }
    int maxIndex = findMaxIndex(objects, target, minIndex, e);
    return (maxIndex - minIndex + 1);
  }

  @SuppressWarnings("unchecked")
  private int findMinIndex(T[] objects, T target, int s, int e) {
    while (s <= e) {
      int m = midPoint(s, e);
      T mv = objects[m];
      if (mv.equals(target) && (m == 0 || mv.compareTo(objects[m - 1]) > 0)) {
        return m;
      } else if (mv.compareTo(target) < 0) {
        s = m + 1;
      } else {
        e = m - 1;
      }
    }
    return ELEMENT_NOT_FOUND;
  }

  @SuppressWarnings("unchecked")
  private int findMaxIndex(T[] objects, T target, int s, int e) {
    while (s <= e) {
      int m = midPoint(s, e);
      T mv = objects[m];
      if (mv.equals(target) && (m == objects.length - 1 || mv.compareTo(objects[m + 1]) < 0)) {
        return m;
      } else if (mv.compareTo(target) > 0) {
        e = m - 1;
      } else {
        s = s + 1;
      }
    }
    return ELEMENT_NOT_FOUND;
  }
}
