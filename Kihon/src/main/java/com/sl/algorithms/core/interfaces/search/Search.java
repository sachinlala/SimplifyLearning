package com.sl.algorithms.core.interfaces.search;

import com.sl.algorithms.core.interfaces.base.BaseInterface;

public interface Search<T extends Comparable> extends BaseInterface<T> {

    int ELEMENT_NOT_FOUND = -1;

    int findIndex(T[] inputArray, T targetElement);
}
