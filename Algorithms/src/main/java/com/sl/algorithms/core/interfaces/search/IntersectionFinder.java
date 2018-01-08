package com.sl.algorithms.core.interfaces.search;

import com.sl.algorithms.core.baseObj.ListNode;

public interface IntersectionFinder<T extends Comparable> {
    ListNode<T> getIntersectionPoint(ListNode<T> list1, ListNode<T> list2);
}
