package com.sl.algorithms.linear.linkedlist;

import com.sl.algorithms.core.linear.linkedlist.ListNode;

public class LinkedListIntersection {

    /**
     * <a href="https://leetcode.com/problems/intersection-of-two-linked-lists/description/">Intersection of 2 singly linked lists</a><br>
     * //O(n) time and O(1) space
     */
    public ListNode<Integer> getIntersectionNode(ListNode<Integer> list1, ListNode<Integer> list2) {
        if (list1 == null || list2 == null) return null;
        int l1=0, l2=0;
        ListNode<Integer> ptr1=list1, ptr2=list2;
        while (ptr1 != null) {
            ++l1;
            ptr1 = ptr1.next;
        }
        while (ptr2 != null) {
            ++l2;
            ptr2 = ptr2.next;
        }
        ptr1 = list1;
        ptr2 = list2;
        if (l1 < l2) {
            int count = 0;
            while (count < l2-l1) {
                ++count;
                ptr2 = ptr2.next;
            }
        }
        if (l1 > l2) {
            int count = 0;
            while (count < l1-l2) {
                ++count;
                ptr1 = ptr1.next;
            }
        }
        // by this time, ptr1 & ptr2 are equidistant from the end
        while (ptr1 != null && ptr2 != null) {
            if (ptr1 == ptr2) return ptr1;
            ptr1 = ptr1.next;
            ptr2 = ptr2.next;
        }
        return null;
    }
}
