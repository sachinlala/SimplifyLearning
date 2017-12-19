package com.sl.algorithms.core.linear.linkedlist;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import static com.sl.algorithms.core.linear.linkedlist.LinkedListOps.createLinkedList;
import static com.sl.algorithms.core.linear.linkedlist.LinkedListOps.createObjLinkedList;
import static com.sl.algorithms.core.linear.linkedlist.LinkedListOps.printList;

public class LinkedListMergeTest extends LinkedListMerge {
    private ListNode<Integer> testNode;

    @Before
    public void createList() {
        testNode = createLinkedList(new Integer[]{1,2,3,4,5});
    }


    @Test
    public void testMergeSortedListsNull() {
        Assert.assertEquals("[]", printList(mergeSortedLists(null, null)));
        Assert.assertEquals("[1]", printList(mergeSortedLists(new ListNode<>(1), null)));
        Assert.assertEquals("[2]", printList(mergeSortedLists(null, new ListNode<>(2))));
    }

    @Test
    public void testMergeSortedLists() {
        ListNode<Integer> newList1 = createLinkedList(new Integer[]{4,5,6});
        ListNode<Integer> newList2 = createLinkedList(new Integer[]{1,2,4,5,6});
        Assert.assertEquals("[12445566]", printList(mergeSortedLists(newList1, newList2)));

        newList1 = createLinkedList(new Integer[]{1});
        newList2 = createLinkedList(new Integer[]{1});
        Assert.assertEquals("[11]", printList(mergeSortedLists(newList1, newList2)));

        newList1 = createLinkedList(new Integer[]{1,2,3});
        newList2 = createLinkedList(new Integer[]{1,2,3});
        Assert.assertEquals("[112233]", printList(mergeSortedLists(newList1, newList2)));

        newList1 = createLinkedList(new Integer[]{1,2});
        newList2 = createLinkedList(new Integer[]{3,4,5,6});
        Assert.assertEquals("[123456]", printList(mergeSortedLists(newList1, newList2)));

        newList1 = createLinkedList(new Integer[]{1,2,3,4});
        newList2 = createLinkedList(new Integer[]{5,6});
        Assert.assertEquals("[123456]", printList(mergeSortedLists(newList1, newList2)));

        newList1 = createLinkedList(new Integer[]{1,2,5,6});
        newList2 = createLinkedList(new Integer[]{3,4});
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
        ListNode<Integer> newList1 = createLinkedList(new Integer[]{4,5,6});
        ListNode<Integer> newList2 = createLinkedList(new Integer[]{1,2,4,5,6});
        Assert.assertEquals("[12445566]", printList(mergeSortedListsIteratively(newList1, newList2)));

        newList1 = createLinkedList(new Integer[]{1});
        newList2 = createLinkedList(new Integer[]{1});
        Assert.assertEquals("[11]", printList(mergeSortedListsIteratively(newList1, newList2)));

        newList1 = createLinkedList(new Integer[]{1,2,3});
        newList2 = createLinkedList(new Integer[]{1,2,3});
        Assert.assertEquals("[112233]", printList(mergeSortedListsIteratively(newList1, newList2)));

        newList1 = createLinkedList(new Integer[]{1,2});
        newList2 = createLinkedList(new Integer[]{3,4,5,6});
        Assert.assertEquals("[123456]", printList(mergeSortedListsIteratively(newList1, newList2)));

        newList1 = createLinkedList(new Integer[]{1,2,3,4});
        newList2 = createLinkedList(new Integer[]{5,6});
        Assert.assertEquals("[123456]", printList(mergeSortedListsIteratively(newList1, newList2)));

        newList1 = createLinkedList(new Integer[]{1,2,5,6});
        newList2 = createLinkedList(new Integer[]{3,4});
        Assert.assertEquals("[123456]", printList(mergeSortedListsIteratively(newList1, newList2)));
    }

    @Test
    public void testMergeKSortedLists() {
        ListNode<Integer> newList1 = createLinkedList(new Integer[]{4,5,6});
        ListNode<Integer> newList2 = createLinkedList(new Integer[]{1,2,4,5,6});
        ListNode<Integer> newList3 = createLinkedList(new Integer[]{1});
        Assert.assertEquals("[112445566]", printList(mergeKLists(new ListNode[]{newList1, newList2, newList3})));

        newList1 = createLinkedList(new Integer[]{1});
        newList2 = createLinkedList(new Integer[]{1});
        Assert.assertEquals("[11]", printList(mergeKLists(new ListNode[]{newList1, newList2})));

        newList1 = createLinkedList(new Integer[]{1,2,3});
        newList2 = createLinkedList(new Integer[]{1,2,3});
        newList3 = createLinkedList(new Integer[]{1,2,3});
        ListNode<Integer> newList4 = createLinkedList(new Integer[]{1,2,3});
        Assert.assertEquals("[111122223333]", printList(mergeKLists(new ListNode[]{newList1, newList2, newList3, newList4})));

        newList1 = createLinkedList(new Integer[]{1,2});
        newList2 = createLinkedList(new Integer[]{3,4,5,6});
        Assert.assertEquals("[123456]", printList(mergeKLists(new ListNode[]{newList1, newList2})));

        newList1 = createLinkedList(new Integer[]{1,2,3,4});
        newList2 = createLinkedList(new Integer[]{5,6});
        Assert.assertEquals("[123456]", printList(mergeKLists(new ListNode[]{newList1, newList2})));

        newList1 = createLinkedList(new Integer[]{1,2,5,6});
        newList2 = createLinkedList(new Integer[]{3,4});
        Assert.assertEquals("[123456]", printList(mergeKLists(new ListNode[]{newList1, newList2})));

        ListNode<String> stringListNode1 = createObjLinkedList(new String[]{"A","B","C","D"});
        ListNode<String> stringListNode2 = createObjLinkedList(new String[]{"a","b","c","d"});
        ListNode<String> stringListNode3 = createObjLinkedList(new String[]{"X","Y","Z","1","2"});
        Assert.assertEquals("[ABCDXYZ12abcd]", printList(mergeKLists(new ListNode[]{stringListNode1, stringListNode2, stringListNode3})));
    }
}
