package com.sl.algorithms.core.linear.linkedlist;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

public class LinkedListOpsTest extends LinkedListOps {
    private ListNode<Integer> testNode;

    @Before
    public void createList() {
        testNode = createLinkedList(new int[]{1,2,3,4,5});
    }

    @Test
    public void testToString() {
        Assert.assertEquals("12345", testNode.toString());
    }

    @Test
    public void testCreateLinkedList() {
        int[] nums = {1,2,3,4,5};
        Assert.assertEquals("[12345]", printList(createLinkedList(nums)));
        Assert.assertEquals("[]", printList(createLinkedList(null)));
        Assert.assertEquals("[]", printList(createLinkedList(new int[]{})));
        Assert.assertEquals("[1]", printList(createLinkedList(new int[]{1})));
    }

    @Test
    public void testPrintList() {
        Assert.assertEquals("[12345]", printList(testNode));
    }

    @Test
    public void testEquality() {
        Assert.assertFalse(testNode.equals(null));
        Assert.assertFalse(testNode.equals(new Object()));
        Assert.assertFalse(testNode.equals(createLinkedList(null)));

        ListNode<Integer> list1 = createLinkedList(new int[]{1,2,3});
        Assert.assertFalse(list1.equals(testNode));

        ListNode<Integer> list2 = createLinkedList(new int[]{1,2,3,4,5});
        Assert.assertTrue(list2.equals(testNode));
        Assert.assertTrue(list2.hashCode() == testNode.hashCode());
    }

    @Test
    public void testInsertAtStart() {
        ListNode<Integer> newHead = insertAtStart(testNode, 0);
        Assert.assertEquals("[012345]", printList(newHead));
    }

    @Test
    public void testInsertAtStartNegative() {
        ListNode<Integer> newHead = insertAtStart(null, 0);
        Assert.assertEquals("[0]", printList(newHead));
    }

    @Test
    public void testInsertAfter() {
        testNode.next = insertAfter(testNode.next, 0);
        Assert.assertEquals("[120345]", printList(testNode));
    }

    @Test
    public void testInsertAfterNegative() {
        Assert.assertNull(insertAfter(null, 0));
    }

    @Test
    public void testInsertAtEnd() {
        ListNode<Integer> newHead = insertAtEnd(testNode, 6);
        Assert.assertEquals("[123456]", printList(newHead));
    }

    @Test
    public void testInsertAtEndNegative() {
        ListNode<Integer> newHead = insertAtEnd(null, 6);
        Assert.assertEquals("[6]", printList(newHead));
    }

    @Test
    public void testDeleteAtStart() {
        ListNode<Integer> newHead = deleteAtStart(testNode);
        Assert.assertEquals("[2345]", printList(newHead));
    }

    @Test
    public void testDeleteAtStartSingleElement() {
        ListNode<Integer> newHead = deleteAtStart(new ListNode<>(1));
        Assert.assertEquals("[]", printList(newHead));
    }

    @Test
    public void testDeleteAtStartNegative() {
        ListNode<Integer> newHead = deleteAtStart(null);
        Assert.assertEquals("[]", printList(newHead));
    }

    @Test
    public void testDeleteAtPosition() {
        ListNode<Integer> newHead = deleteAtPosition(testNode, 2);
        Assert.assertEquals("[1345]", printList(newHead));
    }

    @Test
    public void testDeleteAtPositionStart() {
        ListNode<Integer> newHead = deleteAtPosition(testNode, 1);
        Assert.assertEquals("[2345]", printList(newHead));
    }

    @Test
    public void testDeleteAtPositionSingleElement() {
        ListNode<Integer> newHead = deleteAtPosition(new ListNode<>(1), 1);
        Assert.assertEquals("[]", printList(newHead));
    }

    @Test
    public void testDeleteAtPositionEnd() {
        ListNode<Integer> newHead = deleteAtPosition(testNode, 5);
        Assert.assertEquals("[1234]", printList(newHead));
    }

    @Test
    public void testDeleteAtPositionNegativeNull() {
        ListNode<Integer> newHead = deleteAtPosition(null, 2);
        Assert.assertEquals("[]", printList(newHead));
    }

    @Test
    public void testDeleteAtPositionNegativeInvalidIndex() {
        ListNode<Integer> newHead = deleteAtPosition(testNode, 10);
        Assert.assertEquals("[12345]", printList(newHead));
    }

    @Test
    public void testDeleteAtEnd() {
        ListNode<Integer> newHead = deleteAtEnd(testNode);
        Assert.assertEquals("[1234]", printList(newHead));
    }

    @Test
    public void testDeleteAtEndSingleElement() {
        ListNode<Integer> newHead = deleteAtEnd(new ListNode<>(1));
        Assert.assertEquals("[]", printList(newHead));
    }

    @Test
    public void testDeleteAtEndNegative() {
        ListNode<Integer> newHead = deleteAtEnd(null);
        Assert.assertEquals("[]", printList(newHead));
    }

    @Test
    public void testDeleteSpecificDataNoOp() {
        ListNode<Integer> newHead = deleteSpecificData(testNode, 0);
        Assert.assertEquals("[12345]", printList(newHead));
    }

    @Test
    public void testDeleteSpecificDataNull() {
        ListNode<Integer> newHead = deleteSpecificData(null, 0);
        Assert.assertEquals("[]", printList(newHead));
    }

    @Test
    public void testDeleteSpecificDataStart() {
        ListNode<Integer> newHead = deleteSpecificData(testNode, 1);
        Assert.assertEquals("[2345]", printList(newHead));
    }

    @Test
    public void testDeleteSpecificData() {
        ListNode<Integer> newHead = deleteSpecificData(testNode, 2);
        Assert.assertEquals("[1345]", printList(newHead));
    }

    @Test
    public void testDeleteSpecificDataEnd() {
        ListNode<Integer> newHead = deleteSpecificData(testNode, 5);
        Assert.assertEquals("[1234]", printList(newHead));
    }

    @Test
    public void testSizeNull() {
        Assert.assertEquals(0, getSize(null));
    }

    @Test
    public void testSize() {
        Assert.assertEquals(5, getSize(testNode));
    }

    @Test
    public void testInsertAtPosition0() {
        ListNode<Integer> newHead = insertAtPosition(testNode, 0, 0);
        Assert.assertEquals("[012345]", printList(newHead));
    }

    @Test
    public void testInsertAtPosition0ForNull() {
        ListNode<Integer> newHead = insertAtPosition(null, 0, 0);
        Assert.assertEquals("[0]", printList(newHead));
    }

    @Test
    public void testInsertAtPosition1() {
        ListNode<Integer> newHead = insertAtPosition(testNode, 0, 1);
        Assert.assertEquals("[102345]", printList(newHead));
    }

    @Test
    public void testInsertAtPosition2() {
        ListNode<Integer> newHead = insertAtPosition(testNode, 0, 2);
        Assert.assertEquals("[120345]", printList(newHead));
    }

    @Test
    public void testInsertAtPosition3() {
        ListNode<Integer> newHead = insertAtPosition(testNode, 0, 3);
        Assert.assertEquals("[123045]", printList(newHead));
    }

    @Test
    public void testInsertAtPosition4() {
        ListNode<Integer> newHead = insertAtPosition(testNode, 0, 4);
        Assert.assertEquals("[123405]", printList(newHead));
    }

    @Test
    public void testInsertAtPosition5() {
        ListNode<Integer> newHead = insertAtPosition(testNode, 0, 5);
        Assert.assertEquals("[123450]", printList(newHead));
    }

    @Test
    public void testInsertAtPositionOverflow() {
        ListNode<Integer> newHead = insertAtPosition(testNode, 0, 6);
        Assert.assertEquals("[12345]", printList(newHead));
    }

    @Test
    public void testCloneList() {
        ListNode<Integer> deepCopy = cloneList(testNode);
        Assert.assertEquals("[12345]", printList(deepCopy));
        ListNode<Integer> nullCopy = cloneList(null);
        Assert.assertEquals("[]", printList(nullCopy));
        ListNode<Integer> oneNodeCopy = cloneList(new ListNode<>(1));
        Assert.assertEquals("[1]", printList(oneNodeCopy));
    }

    @Test
    public void testIsIdenticalPositive() {
        Assert.assertTrue(isIdentical(testNode, cloneList(testNode)));
    }

    @Test
    public void testIsIdenticalNegative() {
        ListNode<Integer> deepCopy = cloneList(testNode);
        Assert.assertTrue(isIdentical(testNode, deepCopy));
        deepCopy.next = new ListNode<>(6);
        Assert.assertFalse(isIdentical(testNode, deepCopy));
    }
}

