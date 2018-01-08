package com.sl.algorithms.core.interfaces.rwops;

import com.sl.algorithms.core.interfaces.base.BaseInterface;

public interface ElementMover<T extends Comparable> extends BaseInterface<T> {
    void moveElement(T[] objects, T element);
}
