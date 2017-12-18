package com.sl.algorithms.core.linear.linkedlist;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import static com.sl.algorithms.core.linear.linkedlist.LinkedListOps.*;

public class LinkedListReversalTest extends LinkedListReversal {
    private ListNode<Integer> testNode;

    @Before
    public void createList() {
        testNode = createLinkedList(new int[]{1,2,3,4,5});
    }

    @Test
    public void testReverse() {
        Assert.assertEquals("[]", printList(reverseListInGroups(null)));

        ListNode<Integer> singleNode = reverseListInGroups(new ListNode<>(1));
        Assert.assertEquals("[1]", printList(singleNode));

        ListNode<Integer> pair = reverseListInGroups(createLinkedList(new int[]{1,2}));
        Assert.assertEquals("[21]", printList(pair));

        Assert.assertEquals("[54321]", printList(reverseListInGroups(testNode)));
    }

    @Test
    public void testReverseRecursive() {
        Assert.assertEquals("[]", printList(reverseListRecursive(null)));

        ListNode<Integer> singleNode = reverseListRecursive(new ListNode<>(1));
        Assert.assertEquals("[1]", printList(singleNode));

        ListNode<Integer> pair = reverseListRecursive(createLinkedList(new int[]{1,2}));
        Assert.assertEquals("[21]", printList(pair));

        Assert.assertEquals("[54321]", printList(reverseListRecursive(testNode)));
    }

    @Test
    public void testReverseInGroups() {
        Assert.assertNull(reverseListInGroups(null, 1));

        ListNode<Integer> singleNode = new ListNode<>(1);
        Assert.assertTrue(singleNode.equals(reverseListInGroups(singleNode, 1)));

        ListNode<Integer> pairNode = createLinkedList(new int[]{1,2});
        Assert.assertEquals("[21]", printList(reverseListInGroups(pairNode, 2)));
        pairNode = createLinkedList(new int[]{1,2});
        Assert.assertEquals("[12]", printList(reverseListInGroups(pairNode, 3)));

        ListNode<Integer> testNodeDeepCopy = cloneList(testNode);
        Assert.assertEquals("[12345]", printList(reverseListInGroups(testNodeDeepCopy, 0)));

        testNodeDeepCopy = cloneList(testNode);
        Assert.assertEquals("[12345]", printList(reverseListInGroups(testNodeDeepCopy, 1)));

        testNodeDeepCopy = cloneList(testNode);
        Assert.assertEquals("[21435]", printList(reverseListInGroups(testNodeDeepCopy, 2)));

        testNodeDeepCopy = cloneList(testNode);
        Assert.assertEquals("[32145]", printList(reverseListInGroups(testNodeDeepCopy, 3)));

        testNodeDeepCopy = cloneList(testNode);
        Assert.assertEquals("[43215]", printList(reverseListInGroups(testNodeDeepCopy, 4)));

        testNodeDeepCopy = cloneList(testNode);
        Assert.assertEquals("[54321]", printList(reverseListInGroups(testNodeDeepCopy, 5)));

        testNodeDeepCopy = cloneList(testNode);
        Assert.assertEquals("[12345]", printList(reverseListInGroups(testNodeDeepCopy, 6)));
    }
}
