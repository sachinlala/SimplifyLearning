package com.sl.algorithms.core.interfaces.search;

import com.sl.algorithms.core.interfaces.base.BaseInterface;

public interface Search<T extends Comparable> extends BaseInterface<T> {

  int findIndex(T[] inputArray, T targetElement);
}
