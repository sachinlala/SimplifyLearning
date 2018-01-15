package com.sl.algorithms.core.interfaces.sorting;

import com.sl.algorithms.core.interfaces.base.BaseInterface;

public interface Consolidator<T extends Comparable> extends BaseInterface<T> {

    void consolidate(T[] objects, T element, boolean right);
}
