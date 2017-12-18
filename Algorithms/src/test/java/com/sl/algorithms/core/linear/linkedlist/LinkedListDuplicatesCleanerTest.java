package com.sl.algorithms.core.linear.linkedlist;

import org.junit.Assert;
import org.junit.Test;

import static com.sl.algorithms.core.linear.linkedlist.LinkedListOps.*;

public class LinkedListDuplicatesCleanerTest extends LinkedListDuplicatesCleaner {

    @Test
    public void testRemoveDuplicatesNull() {
        Assert.assertEquals("[]", printList(removeDuplicates(null)));
        Assert.assertEquals("[]", printList(removeDuplicatesNoDereference(null)));
    }

    @Test
    public void testRemoveDuplicatesSingle() {
        Assert.assertEquals("[1]", printList(removeDuplicates(new ListNode<>(1))));
        Assert.assertEquals("[1]", printList(removeDuplicatesNoDereference(new ListNode<>(1))));
    }

    @Test
    public void testRemoveDuplicatesPairAfterHead() {
        ListNode<Integer> test = createLinkedList(new int[]{1,2,2});
        Assert.assertEquals("[12]", printList(removeDuplicates(test)));
        test.next.next = new ListNode<>(2);
        Assert.assertEquals("[12]", printList(removeDuplicatesNoDereference(test)));
    }

    @Test
    public void testRemoveDuplicatesNoDup() {
        ListNode<Integer> test = createLinkedList(new int[]{1,2});
        Assert.assertEquals("[12]", printList(removeDuplicates(test)));
        Assert.assertEquals("[12]", printList(removeDuplicatesNoDereference(test)));
    }

    @Test
    public void testRemoveDuplicatesDupPair() {
        ListNode<Integer> test1 = createLinkedList(new int[]{1,1});
        Assert.assertEquals("[1]", printList(removeDuplicates(test1)));
        ListNode<Integer> test2 = createLinkedList(new int[]{1,1});
        Assert.assertEquals("[1]", printList(removeDuplicatesNoDereference(test2)));
    }

    @Test
    public void testRemoveDuplicates() {
        ListNode<Integer> test1 = createLinkedList(new int[]{1,2,3,4,5,5,5,5,5,6});
        Assert.assertEquals("[123456]", printList(removeDuplicates(test1)));
        ListNode<Integer> test2 = createLinkedList(new int[]{1,2,3,4,5,6,5,5,5,5,6});
        Assert.assertEquals("[12345656]", printList(removeDuplicatesNoDereference(test2)));
    }

    @Test
    public void testCleanupDuplicatedNodesNull() {
        Assert.assertEquals("[]", printList(cleanupDuplicatedNodes(null)));
    }

    @Test
    public void testCleanupDuplicatedNodesSingle() {
        Assert.assertEquals("[1]", printList(cleanupDuplicatedNodes(new ListNode<>(1))));
    }

    @Test
    public void testCleanupDuplicatedNodesPairAfterHead() {
        ListNode<Integer> test = createLinkedList(new int[]{1,2,2});
        Assert.assertEquals("[1]", printList(cleanupDuplicatedNodes(test)));
    }

    @Test
    public void testCleanupDuplicatedNodesNoDup() {
        ListNode<Integer> test = createLinkedList(new int[]{1,2});
        Assert.assertEquals("[12]", printList(cleanupDuplicatedNodes(test)));
    }

    @Test
    public void testCleanupDuplicatedNodesDupPair() {
        ListNode<Integer> test = createLinkedList(new int[]{1,1});
        Assert.assertEquals("[]", printList(cleanupDuplicatedNodes(test)));
    }

    @Test
    public void testCleanupDuplicatedNodes() {
        ListNode<Integer> test = createLinkedList(new int[]{1,2,3,4,5,5,5,5,5,6});
        Assert.assertEquals("[12346]", printList(cleanupDuplicatedNodes(test)));
    }
}
