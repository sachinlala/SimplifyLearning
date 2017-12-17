package com.sl.algorithms.linear.linkedlist;

import com.sl.algorithms.core.linear.LinkedListOps;
import com.sl.algorithms.core.linear.ListNode;
import org.junit.Assert;
import org.junit.Test;

public class LinkedListIntersectionTest extends LinkedListIntersection {

    @Test
    public void testGetIntersectionNode() {
        Assert.assertTrue(getIntersectionNode(null, null) == null);
        ListNode<Integer> list1 = LinkedListOps.createLinkedList(new int[]{1,2,3,4,5});
        Assert.assertTrue(getIntersectionNode(list1, null) == null);
        ListNode<Integer> list2 = LinkedListOps.createLinkedList(new int[]{-1,-2,0});
        Assert.assertTrue(getIntersectionNode(null, list2) == null);
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
    }
}
