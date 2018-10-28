package com.sl.algorithms.core.list.intersection;

import com.sl.algorithms.core.interfaces.search.IntersectionFinder;
import com.sl.algorithms.core.list.ListNode;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * <br><a href="https://leetcode.com/problems/intersection-of-two-linked-lists/description/">Problem
 * Reference</a><br> <br>Requirement: O(m+n) time and O(1) space
 */
public class ListIntersection<T extends Comparable> implements IntersectionFinder<T> {

  @Override
  public ListNode<T> getIntersectionPoint(ListNode<T> list1, ListNode<T> list2) {
    if (list1 == null || list2 == null) {
      return null;
    }
    int d = list1.size() - list2.size();
    ListNode<T> ptr1 = travelDelta(list1, d);
    ListNode<T> ptr2 = travelDelta(list2, -d);
    // at this point, ptr1 & ptr2 are equidistant from the end
    while (ptr1 != null && ptr2 != null && ptr1.compareTo(ptr2) != 0) {
      ptr1 = ptr1.next;
      ptr2 = ptr2.next;
    }
    return ptr1;
  }

  private ListNode<T> travelDelta(ListNode<T> list, int d) {
    if (d <= 0) {
      return list;
    }
    ListNode<T> ptr = list;
    while (d > 0 && ptr != null) {
      ptr = ptr.next;
      d--;
    }
    return ptr;
  }

  @Override
  public List<T> getIntersection(List<T> list1, List<T> list2) {
    List<T> outputList = new ArrayList<>();
    if (list1 == null || list2 == null || list1.size() == 0 || list2.size() == 0) {
      return outputList;
    }
    Set<T> hashSet = new HashSet<>(list1);
    for (T obj : list2) {
      if (hashSet.contains(obj)) {
        outputList.add(obj);
      }
    }
    return outputList;
  }
}
