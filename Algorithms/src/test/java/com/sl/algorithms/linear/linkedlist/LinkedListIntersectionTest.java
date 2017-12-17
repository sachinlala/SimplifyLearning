package com.sl.algorithms.linear.linkedlist;

import com.sl.algorithms.core.linear.LinkedListOps;
import com.sl.algorithms.core.linear.ListNode;
import org.junit.Assert;
import org.junit.Test;

public class LinkedListIntersectionTest extends LinkedListIntersection {

    @Test
    public void testGetIntersectionNodeNull() {
        Assert.assertTrue(getIntersectionNode(null, null) == null);
    }

    @Test
    public void testGetIntersectionNodeNothingCommon() {
        ListNode<Integer> list1 = LinkedListOps.createLinkedList(new int[]{1, 2, 3, 4, 5});
        ListNode<Integer> list2 = LinkedListOps.createLinkedList(new int[]{-1, -2, 0});
        Assert.assertTrue(getIntersectionNode(list1, null) == null);
        Assert.assertTrue(getIntersectionNode(null, list2) == null);
        Assert.assertTrue(getIntersectionNode(list1, list2) == null);
    }

        @Test
    public void testGetIntersectionNode() {
        ListNode<Integer> list1 = LinkedListOps.createLinkedList(new int[]{1,2,3,4,5});
        ListNode<Integer> list2 = LinkedListOps.createLinkedList(new int[]{-1,-2,0});
        ListNode<Integer> ptr1 = list1;
        int delta = 0;
        while (delta < 2) {
            ptr1 = ptr1.next;
            ++delta;
        }
        ListNode<Integer> ptr2 = list2;
        while (ptr2.next != null) {
            ptr2 = ptr2.next;
        }
        ptr2.next = ptr1;
        Assert.assertTrue(getIntersectionNode(list1, list2).data == 3);
        Assert.assertTrue(getIntersectionNode(list2, list1).data == 3);
    }
}
