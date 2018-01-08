package com.sl.algorithms.core.interfaces.count;

import com.sl.algorithms.core.interfaces.base.BaseInterface;

public interface ElementCounter<T extends Comparable> extends BaseInterface<T> {
    int countTargetElement(T[] objects, T targetElement);
}
