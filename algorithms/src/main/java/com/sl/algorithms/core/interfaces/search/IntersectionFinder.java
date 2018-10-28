package com.sl.algorithms.core.interfaces.search;

import com.sl.algorithms.core.interfaces.base.BaseInterface;
import com.sl.algorithms.core.list.ListNode;
import java.util.List;

public interface IntersectionFinder<T extends Comparable> extends BaseInterface<T> {

  ListNode<T> getIntersectionPoint(ListNode<T> list1, ListNode<T> list2);

  List<T> getIntersection(List<T> list1, List<T> list2);
}
