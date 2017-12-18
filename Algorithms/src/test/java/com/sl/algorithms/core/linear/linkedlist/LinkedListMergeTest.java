package com.sl.algorithms.core.linear.linkedlist;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import static com.sl.algorithms.core.linear.linkedlist.LinkedListOps.printList;
import static com.sl.algorithms.core.linear.linkedlist.LinkedListOps.cloneList;
import static com.sl.algorithms.core.linear.linkedlist.LinkedListOps.createLinkedList;

public class LinkedListMergeTest extends LinkedListMerge {
    private ListNode<Integer> testNode;

    @Before
    public void createList() {
        testNode = createLinkedList(new int[]{1,2,3,4,5});
    }


    @Test
    public void testMergeSortedListsNull() {
        Assert.assertEquals("[]", printList(mergeSortedLists(null, null)));
        Assert.assertEquals("[1]", printList(mergeSortedLists(new ListNode<>(1), null)));
        Assert.assertEquals("[2]", printList(mergeSortedLists(null, new ListNode<>(2))));
    }

    @Test
    public void testMergeSortedLists() {
        Assert.assertEquals("[1122334455]", printList(mergeSortedLists(testNode, cloneList(testNode))));
        Assert.assertEquals("[123456]", printList(mergeSortedLists(testNode, new ListNode<>(6))));
        Assert.assertEquals("[123456]", printList(mergeSortedLists(new ListNode<>(6), testNode)));

        ListNode<Integer> t1 = createLinkedList(new int[]{4,5,6});
        Assert.assertEquals("[12344556]", printList(mergeSortedLists(t1, testNode)));
        Assert.assertEquals("[12344556]", printList(mergeSortedLists(testNode, t1)));
    }

    @Test
    public void testMergeSortedListsIterativelyNull() {
        Assert.assertEquals("[]", printList(mergeSortedListsIteratively(null, null)));
        Assert.assertEquals("[1]", printList(mergeSortedListsIteratively(new ListNode<>(1), null)));
        Assert.assertEquals("[2]", printList(mergeSortedListsIteratively(null, new ListNode<>(2))));
    }

    @Test
    public void testMergeSortedListsIteratively() {
        Assert.assertEquals("[1122334455]", printList(mergeSortedListsIteratively(testNode, cloneList(testNode))));
        Assert.assertEquals("[123456]", printList(mergeSortedListsIteratively(testNode, new ListNode<>(6))));
        Assert.assertEquals("[123456]", printList(mergeSortedListsIteratively(new ListNode<>(6), testNode)));

        ListNode<Integer> t1 = createLinkedList(new int[]{4,5,6});
        Assert.assertEquals("[12344556]", printList(mergeSortedListsIteratively(t1, testNode)));
        Assert.assertEquals("[12344556]", printList(mergeSortedListsIteratively(testNode, t1)));
    }
}
