package com.sl.algorithms.core.linear.linkedlist;

import org.junit.Assert;
import org.junit.Test;

import static com.sl.algorithms.core.linear.linkedlist.LinkedListOps.*;

public class ListNodeTest {

    @Test
    public void testEquality() {
        ListNode<Integer> testNode = createLinkedList(new int[]{1,2,3,4,5});

        Assert.assertFalse(testNode.equals(new Object()));
        Assert.assertFalse(testNode.equals(null));

        Assert.assertFalse(createLinkedList(new int[]{1,2,3}).equals(testNode));

        ListNode<Integer> list = createLinkedList(new int[]{1,2,3,4,5});
        Assert.assertTrue(list.equals(testNode));
        Assert.assertTrue(list.hashCode() == testNode.hashCode());
    }

    @Test
    public void testSize() {
        ListNode<Integer> testNode = createLinkedList(new int[]{1,2,3,4,5});
        Assert.assertEquals(5, testNode.getSize());
    }

    @Test
    public void testHasCycle() {
        Assert.assertFalse(ListNode.dummyNode().hasCycle());
        Assert.assertFalse(new ListNode<>(1).hasCycle());

        ListNode<Integer> list = createLinkedList(new int[]{1,2,3,4,5});
        Assert.assertFalse(list.hasCycle());

        ListNode<Integer> tail = list;
        while (tail.next != null) {
            tail = tail.next;
        }
        tail.next = list.next.next.next;
        Assert.assertTrue(list.hasCycle());
    }
}
