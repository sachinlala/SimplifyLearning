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
        int m = list1.getSize(), n = list2.getSize();
        ListNode<T> ptr1 = list1, ptr2 = list2;
        while (m > n) {
            ptr1 = ptr1.next;
            --m;
        }
        while (m < n) {
            ptr2 = ptr2.next;
            --n;
        }
        while (ptr1 != ptr2) { // by this time, ptr1 & ptr2 are equidistant from the end
            ptr1 = ptr1.next;
            ptr2 = ptr2.next;
        }
        return ptr1;
    }
}
