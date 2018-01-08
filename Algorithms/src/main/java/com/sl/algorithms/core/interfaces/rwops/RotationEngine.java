package com.sl.algorithms.core.interfaces.rwops;

import com.sl.algorithms.core.baseObj.ListNode;
import com.sl.algorithms.core.interfaces.base.BaseInterface;

public interface RotationEngine<T extends Comparable> extends BaseInterface<T> {
    T[] rotate(T[] objects, int k, boolean clockwise);
    ListNode<T> rotate(ListNode<T> head, int k, boolean clockwise);
}
