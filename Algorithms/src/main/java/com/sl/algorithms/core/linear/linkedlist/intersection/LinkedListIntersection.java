package com.sl.algorithms.core.linear.linkedlist.intersection;

import com.sl.algorithms.core.baseObj.ListNode;
import com.sl.algorithms.core.interfaces.search.IntersectionFinder;

/**
 * <br><a href="https://leetcode.com/problems/intersection-of-two-linked-lists/description/">Problem Reference</a><br>
 * <br>Requirement: O(m+n) time and O(1) space
 */
public class LinkedListIntersection<T extends Comparable> implements IntersectionFinder<T> {

    @Override
    public ListNode<T> getIntersectionPoint(ListNode<T> list1, ListNode<T> list2) {
        if (list1 == null || list2 == null) return null;
        int d = list1.size() - list2.size();
        ListNode<T> ptr1 = travel(list1, d);
        ListNode<T> ptr2 = travel(list2, -d);
        while (ptr1 != null && ptr2 != null && ptr1.compareTo(ptr2) != 0) { // by this time, ptr1 & ptr2 are equidistant from the end
            ptr1 = ptr1.next;
            ptr2 = ptr2.next;
        }
        return ptr1;
    }

    private ListNode<T> travel(ListNode<T> list, int d) {
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
}
