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
    public void testMerge2SortedListsNull() {
        Assert.assertEquals("[]", printList(merge2SortedLists(null, null)));
        Assert.assertEquals("[1]", printList(merge2SortedLists(new ListNode<>(1), null)));
        Assert.assertEquals("[2]", printList(merge2SortedLists(null, new ListNode<>(2))));
    }

    @Test
    public void testMerge2SortedLists() {
        ListNode<Integer> newList1 = createLinkedList(new Integer[]{4,5,6});
        ListNode<Integer> newList2 = createLinkedList(new Integer[]{1,2,4,5,6});
        Assert.assertEquals("[12445566]", printList(merge2SortedLists(newList1, newList2)));

        newList1 = createLinkedList(new Integer[]{1});
        newList2 = createLinkedList(new Integer[]{1});
        Assert.assertEquals("[11]", printList(merge2SortedLists(newList1, newList2)));

        newList1 = createLinkedList(new Integer[]{1,2,3});
        newList2 = createLinkedList(new Integer[]{1,2,3});
        Assert.assertEquals("[112233]", printList(merge2SortedLists(newList1, newList2)));

        newList1 = createLinkedList(new Integer[]{1,2});
        newList2 = createLinkedList(new Integer[]{3,4,5,6});
        Assert.assertEquals("[123456]", printList(merge2SortedLists(newList1, newList2)));

        newList1 = createLinkedList(new Integer[]{1,2,3,4});
        newList2 = createLinkedList(new Integer[]{5,6});
        Assert.assertEquals("[123456]", printList(merge2SortedLists(newList1, newList2)));

        newList1 = createLinkedList(new Integer[]{1,2,5,6});
        newList2 = createLinkedList(new Integer[]{3,4});
        Assert.assertEquals("[123456]", printList(merge2SortedLists(newList1, newList2)));
    }

    @Test
    public void testMerge2SortedListsIterativelyNull() {
        Assert.assertEquals("[]", printList(merge2SortedListsIteratively(null, null)));
        Assert.assertEquals("[1]", printList(merge2SortedListsIteratively(new ListNode<>(1), null)));
        Assert.assertEquals("[2]", printList(merge2SortedListsIteratively(null, new ListNode<>(2))));
    }

    @Test
    public void testMerge2SortedListsIteratively() {
        ListNode<Integer> newList1 = createLinkedList(new Integer[]{4,5,6});
        ListNode<Integer> newList2 = createLinkedList(new Integer[]{1,2,4,5,6});
        Assert.assertEquals("[12445566]", printList(merge2SortedListsIteratively(newList1, newList2)));

        newList1 = createLinkedList(new Integer[]{1});
        newList2 = createLinkedList(new Integer[]{1});
        Assert.assertEquals("[11]", printList(merge2SortedListsIteratively(newList1, newList2)));

        newList1 = createLinkedList(new Integer[]{1,2,3});
        newList2 = createLinkedList(new Integer[]{1,2,3});
        Assert.assertEquals("[112233]", printList(merge2SortedListsIteratively(newList1, newList2)));

        newList1 = createLinkedList(new Integer[]{1,2});
        newList2 = createLinkedList(new Integer[]{3,4,5,6});
        Assert.assertEquals("[123456]", printList(merge2SortedListsIteratively(newList1, newList2)));

        newList1 = createLinkedList(new Integer[]{1,2,3,4});
        newList2 = createLinkedList(new Integer[]{5,6});
        Assert.assertEquals("[123456]", printList(merge2SortedListsIteratively(newList1, newList2)));

        newList1 = createLinkedList(new Integer[]{1,2,5,6});
        newList2 = createLinkedList(new Integer[]{3,4});
        Assert.assertEquals("[123456]", printList(merge2SortedListsIteratively(newList1, newList2)));
    }

    @Test
    public void testMergeKSortedListsPQ() {
        ListNode<Integer> newList1 = createLinkedList(new Integer[]{4,5,6});
        ListNode<Integer> newList2 = createLinkedList(new Integer[]{1,2,4,5,6});
        ListNode<Integer> newList3 = createLinkedList(new Integer[]{1});
        Assert.assertEquals("[112445566]", printList(mergeKSortedListsPQ(new ListNode[]{newList1, newList2, newList3})));

        newList1 = createLinkedList(new Integer[]{1});
        newList2 = createLinkedList(new Integer[]{1});
        Assert.assertEquals("[11]", printList(mergeKSortedListsPQ(new ListNode[]{newList1, newList2})));

        newList1 = createLinkedList(new Integer[]{1,2,3});
        newList2 = createLinkedList(new Integer[]{1,2,3});
        newList3 = createLinkedList(new Integer[]{1,2,3});
        ListNode<Integer> newList4 = createLinkedList(new Integer[]{1,2,3});
        Assert.assertEquals("[111122223333]", printList(mergeKSortedListsPQ(new ListNode[]{newList1, newList2, newList3, newList4})));

        newList1 = createLinkedList(new Integer[]{1,2});
        newList2 = createLinkedList(new Integer[]{3,4,5,6});
        Assert.assertEquals("[123456]", printList(mergeKSortedListsPQ(new ListNode[]{newList1, newList2})));

        newList1 = createLinkedList(new Integer[]{1,2,3,4});
        newList2 = createLinkedList(new Integer[]{5,6});
        Assert.assertEquals("[123456]", printList(mergeKSortedListsPQ(new ListNode[]{newList1, newList2})));

        newList1 = createLinkedList(new Integer[]{1,2,5,6});
        newList2 = createLinkedList(new Integer[]{3,4});
        Assert.assertEquals("[123456]", printList(mergeKSortedListsPQ(new ListNode[]{newList1, newList2})));

        ListNode<String> stringListNode1 = createObjLinkedList(new String[]{"A","B","C","D"});
        ListNode<String> stringListNode2 = createObjLinkedList(new String[]{"a","b","c","d"});
        ListNode<String> stringListNode3 = createObjLinkedList(new String[]{"X","Y","Z","1","2"});
        Assert.assertEquals("[ABCDXYZ12abcd]", printList(mergeKSortedListsPQ(new ListNode[]{stringListNode1, stringListNode2, stringListNode3})));

        ListNode<Double> newDoubleList1 = createLinkedList(new Double[]{1.0,2.0});
        ListNode<Double> newDoubleList2 = createLinkedList(new Double[]{3.0,4.0});
        try {
            mergeKSortedListsPQ(new ListNode[]{newDoubleList1, newDoubleList2});
            Assert.fail("Exception should have come as Double data-type not supported yet");
        } catch (IllegalArgumentException iae) {
            Assert.assertEquals("Inputs are in a format not supported yet", iae.getMessage());
        }
    }

    @Test
    public void testMergeKSortedLists() {
        ListNode<Integer> newList1 = createLinkedList(new Integer[]{4,5,6});
        ListNode<Integer> newList2 = createLinkedList(new Integer[]{1,2,4,5,6});
        ListNode<Integer> newList3 = createLinkedList(new Integer[]{1});
        Assert.assertEquals("[112445566]", printList(mergeKSortedListsDnQ(new ListNode[]{newList1, newList2, newList3})));

        newList1 = createLinkedList(new Integer[]{1});
        newList2 = createLinkedList(new Integer[]{1});
        Assert.assertEquals("[11]", printList(mergeKSortedListsDnQ(new ListNode[]{newList1, newList2})));

        newList1 = createLinkedList(new Integer[]{1,2,3});
        newList2 = createLinkedList(new Integer[]{1,2,3});
        newList3 = createLinkedList(new Integer[]{1,2,3});
        ListNode<Integer> newList4 = createLinkedList(new Integer[]{1,2,3});
        Assert.assertEquals("[111122223333]", printList(mergeKSortedListsDnQ(new ListNode[]{newList1, newList2, newList3, newList4})));

        newList1 = createLinkedList(new Integer[]{1,2});
        newList2 = createLinkedList(new Integer[]{3,4,5,6});
        Assert.assertEquals("[123456]", printList(mergeKSortedListsDnQ(new ListNode[]{newList1, newList2})));

        newList1 = createLinkedList(new Integer[]{1,2,3,4});
        newList2 = createLinkedList(new Integer[]{5,6});
        Assert.assertEquals("[123456]", printList(mergeKSortedListsDnQ(new ListNode[]{newList1, newList2})));

        newList1 = createLinkedList(new Integer[]{1,2,5,6});
        newList2 = createLinkedList(new Integer[]{3,4});
        Assert.assertEquals("[123456]", printList(mergeKSortedListsDnQ(new ListNode[]{newList1, newList2})));

        ListNode<String> stringListNode1 = createObjLinkedList(new String[]{"A","B","C","D"});
        ListNode<String> stringListNode2 = createObjLinkedList(new String[]{"a","b","c","d"});
        ListNode<String> stringListNode3 = createObjLinkedList(new String[]{"X","Y","Z","1","2"});
        Assert.assertEquals("[ABCDXYZ12abcd]", printList(mergeKSortedListsDnQ(new ListNode[]{stringListNode1, stringListNode2, stringListNode3})));
    }
}
