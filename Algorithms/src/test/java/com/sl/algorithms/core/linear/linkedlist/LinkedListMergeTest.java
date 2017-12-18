package com.sl.algorithms.core.linear.linkedlist;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import static com.sl.algorithms.core.linear.linkedlist.LinkedListOps.createLinkedList;
import static com.sl.algorithms.core.linear.linkedlist.LinkedListOps.printList;

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
        ListNode<Integer> newList1 = createLinkedList(new int[]{4,5,6});
        ListNode<Integer> newList2 = createLinkedList(new int[]{1,2,4,5,6});
        Assert.assertEquals("[12445566]", printList(mergeSortedLists(newList1, newList2)));

        newList1 = createLinkedList(new int[]{1,2,3});
        newList2 = createLinkedList(new int[]{4,5,6});
        Assert.assertEquals("[123456]", printList(mergeSortedLists(newList1, newList2)));
    }

    @Test
    public void testMergeSortedListsIterativelyNull() {
        Assert.assertEquals("[]", printList(mergeSortedListsIteratively(null, null)));
        Assert.assertEquals("[1]", printList(mergeSortedListsIteratively(new ListNode<>(1), null)));
        Assert.assertEquals("[2]", printList(mergeSortedListsIteratively(null, new ListNode<>(2))));
    }

    @Test
    public void testMergeSortedListsIteratively() {
        ListNode<Integer> newList1 = createLinkedList(new int[]{4,5,6});
        ListNode<Integer> newList2 = createLinkedList(new int[]{1,2,4,5,6});
        Assert.assertEquals("[12445566]", printList(mergeSortedListsIteratively(newList1, newList2)));
    }
}
