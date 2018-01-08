package com.sl.algorithms.core.interfaces.rwops;

import com.sl.algorithms.core.interfaces.base.BaseInterface;

@SuppressWarnings("unchecked") // due to generic array
public interface SortingEngine<T extends Comparable> extends BaseInterface<T> {
    void sort(T[] objects);
}
