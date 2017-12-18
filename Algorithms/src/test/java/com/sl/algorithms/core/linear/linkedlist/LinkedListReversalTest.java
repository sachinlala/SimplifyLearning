package com.sl.algorithms.core.linear.linkedlist;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import static com.sl.algorithms.core.linear.linkedlist.LinkedListOps.*;

class LinkedListReversalTest extends LinkedListReversal {
    private ListNode<Integer> testNode;

    @Before
    public void createList() {
        testNode = createLinkedList(new int[]{1,2,3,4,5});
    }

    @Test
    public void testReverseNull() {
        ListNode<Integer> newHead = reverseList(null);
        Assert.assertEquals("[]", printList(newHead));
    }

    @Test
    public void testReverseSingle() {
        ListNode<Integer> newHead = reverseList(new ListNode<>(1));
        Assert.assertEquals("[1]", printList(newHead));
    }

    @Test
    public void testReversePair() {
        ListNode<Integer> newHead = reverseList(createLinkedList(new int[]{1,2}));
        Assert.assertEquals("[21]", printList(newHead));
    }

    @Test
    public void testReverse() {
        ListNode<Integer> newHead = reverseList(testNode);
        Assert.assertEquals("[54321]", printList(newHead));
    }

    @Test
    public void testPartialReverseNull() {
        ListNode<Integer> newHead = reverseList(null, 1);
        Assert.assertEquals("[]", printList(newHead));
    }

    @Test
    public void testPartialReverseSingle() {
        ListNode<Integer> newHead = reverseList(new ListNode<>(1), 1);
        Assert.assertEquals("[1]", printList(newHead));
    }

    @Test
    public void testPartialReverseZeroIndex() {
        ListNode<Integer> newHead = reverseList(testNode, 0);
        Assert.assertEquals("[12345]", printList(newHead));
    }

    @Test
    public void testPartialReverseOverflowIndex() {
        ListNode<Integer> newHead = reverseList(testNode, 6);
        Assert.assertEquals("[54321]", printList(newHead));
    }

    @Test
    public void testPartialReverse1() {
        ListNode<Integer> newHead = reverseList(testNode, 1);
        Assert.assertEquals("[12345]", printList(newHead));
    }

    @Test
    public void testPartialReverse2() {
        ListNode<Integer> newHead = reverseList(testNode, 2);
        Assert.assertEquals("[21435]", printList(newHead));
    }

    @Test
    public void testPartialReverse3() {
        ListNode<Integer> newHead = reverseList(testNode, 3);
        Assert.assertEquals("[32154]", printList(newHead));
    }

    @Test
    public void testPartialReverse4() {
        ListNode<Integer> newHead = reverseList(testNode, 4);
        Assert.assertEquals("[43215]", printList(newHead));
    }

    @Test
    public void testPartialReverseFull() {
        ListNode<Integer> newHead = reverseList(testNode, 5);
        Assert.assertEquals("[54321]", printList(newHead));
    }
}
