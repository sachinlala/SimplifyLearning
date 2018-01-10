package com.sl.algorithms.core.interfaces.rwops;

import com.sl.algorithms.core.interfaces.base.BaseInterface;

public interface SortingEngine<T extends Comparable> extends BaseInterface<T> {
    void sort(T[] objects);
}
