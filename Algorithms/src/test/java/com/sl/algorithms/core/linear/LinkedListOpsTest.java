package com.sl.algorithms.core.linear;

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
        Assert.assertFalse(createLinkedList(new int[]{1,2,3}).equals(testNode));
        Assert.assertTrue(createLinkedList(new int[]{1,2,3,4,5}).equals(testNode));
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

    @Test
    public void testSizeNull() {
        Assert.assertEquals(0, getSize(null));
    }

    @Test
    public void testSize() {
        Assert.assertEquals(5, getSize(testNode));
    }

    @Test
    public void testRotateLeftNull() {
        ListNode<Integer> newHead = rotateListLeft(null, 1);
        Assert.assertEquals("[]", printList(newHead));
    }

    @Test
    public void testRotateLeftSingle() {
        ListNode<Integer> newHead = rotateListLeft(new ListNode<>(1), 1);
        Assert.assertEquals("[1]", printList(newHead));
    }

    @Test
    public void testRotateLeftIndexZero() {
        ListNode<Integer> newHead = rotateListLeft(testNode, 0);
        Assert.assertEquals("[12345]", printList(newHead));
    }

    @Test
    public void testRotateLeft1() {
        ListNode<Integer> newHead = rotateListLeft(testNode, 1);
        Assert.assertEquals("[23451]", printList(newHead));
    }

    @Test
    public void testRotateLeft2() {
        ListNode<Integer> newHead = rotateListLeft(testNode, 2);
        Assert.assertEquals("[34512]", printList(newHead));
    }

    @Test
    public void testRotateLeft3() {
        ListNode<Integer> newHead = rotateListLeft(testNode, 3);
        Assert.assertEquals("[45123]", printList(newHead));
    }

    @Test
    public void testRotateLeft4() {
        ListNode<Integer> newHead = rotateListLeft(testNode, 4);
        Assert.assertEquals("[51234]", printList(newHead));
    }

    @Test
    public void testRotateLeftFull() {
        ListNode<Integer> newHead = rotateListLeft(testNode, 5);
        Assert.assertEquals("[12345]", printList(newHead));
    }

    @Test
    public void testRotateLeftOverflowBy1() {
        ListNode<Integer> newHead = rotateListLeft(testNode, 6);
        Assert.assertEquals("[23451]", printList(newHead));
    }

    @Test
    public void testRotateLeftOverflowBy2() {
        ListNode<Integer> newHead = rotateListLeft(testNode, 7);
        Assert.assertEquals("[34512]", printList(newHead));
    }

    @Test
    public void testRotateLeftOverflowBy3() {
        ListNode<Integer> newHead = rotateListLeft(testNode, 8);
        Assert.assertEquals("[45123]", printList(newHead));
    }

    @Test
    public void testRotateLeftOverflowBy4() {
        ListNode<Integer> newHead = rotateListLeft(testNode, 9);
        Assert.assertEquals("[51234]", printList(newHead));
    }

    @Test
    public void testRotateLeftOverflowBy5() {
        ListNode<Integer> newHead = rotateListLeft(testNode, 10);
        Assert.assertEquals("[12345]", printList(newHead));
    }

    @Test
    public void testRotateRightNull() {
        ListNode<Integer> newHead = rotateListRight(null, 1);
        Assert.assertEquals("[]", printList(newHead));
    }

    @Test
    public void testRotateRightSingle() {
        ListNode<Integer> newHead = rotateListRight(new ListNode<>(1), 1);
        Assert.assertEquals("[1]", printList(newHead));
    }

    @Test
    public void testRotateRightIndexZero() {
        ListNode<Integer> newHead = rotateListRight(testNode, 0);
        Assert.assertEquals("[12345]", printList(newHead));
    }

    @Test
    public void testRotateRight1() {
        ListNode<Integer> newHead = rotateListRight(testNode, 1);
        Assert.assertEquals("[51234]", printList(newHead));
    }

    @Test
    public void testRotateRight2() {
        ListNode<Integer> newHead = rotateListRight(testNode, 2);
        Assert.assertEquals("[45123]", printList(newHead));
    }

    @Test
    public void testRotateRight3() {
        ListNode<Integer> newHead = rotateListRight(testNode, 3);
        Assert.assertEquals("[34512]", printList(newHead));
    }

    @Test
    public void testRotateRight4() {
        ListNode<Integer> newHead = rotateListRight(testNode, 4);
        Assert.assertEquals("[23451]", printList(newHead));
    }

    @Test
    public void testRotateRightFull() {
        ListNode<Integer> newHead = rotateListRight(testNode, 5);
        Assert.assertEquals("[12345]", printList(newHead));
    }

    @Test
    public void testRotateRightOverflowBy1() {
        ListNode<Integer> newHead = rotateListRight(testNode, 6);
        Assert.assertEquals("[51234]", printList(newHead));
    }

    @Test
    public void testRotateRightOverflowBy2() {
        ListNode<Integer> newHead = rotateListRight(testNode, 7);
        Assert.assertEquals("[45123]", printList(newHead));
    }

    @Test
    public void testRotateRightOverflowBy3() {
        ListNode<Integer> newHead = rotateListRight(testNode, 8);
        Assert.assertEquals("[34512]", printList(newHead));
    }

    @Test
    public void testRotateRightOverflowBy4() {
        ListNode<Integer> newHead = rotateListRight(testNode, 9);
        Assert.assertEquals("[23451]", printList(newHead));
    }

    @Test
    public void testRotateRightOverflowBy5() {
        ListNode<Integer> newHead = rotateListRight(testNode, 10);
        Assert.assertEquals("[12345]", printList(newHead));
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
        ListNode<Integer> test = new ListNode<>(1);
        test.next = new ListNode<>(2);
        test.next.next = new ListNode<>(2);
        Assert.assertEquals("[12]", printList(removeDuplicates(test)));
        test.next.next = new ListNode<>(2);
        Assert.assertEquals("[12]", printList(removeDuplicatesNoDereference(test)));
    }

    @Test
    public void testRemoveDuplicatesNoDup() {
        ListNode<Integer> test = new ListNode<>(1);
        test.next = new ListNode<>(2);
        Assert.assertEquals("[12]", printList(removeDuplicates(test)));
        Assert.assertEquals("[12]", printList(removeDuplicatesNoDereference(test)));
    }

    @Test
    public void testRemoveDuplicatesDupPair() {
        ListNode<Integer> test = new ListNode<>(1);
        test.next = new ListNode<>(1);
        Assert.assertEquals("[1]", printList(removeDuplicates(test)));
        Assert.assertEquals("[1]", printList(removeDuplicatesNoDereference(test)));
    }

    @Test
    public void testRemoveDuplicates() {
        insertAtEnd(testNode, 5);
        insertAtEnd(testNode, 5);
        insertAtEnd(testNode, 5);
        insertAtEnd(testNode, 5);
        insertAtEnd(testNode, 6);
        Assert.assertEquals("[123456]", printList(removeDuplicates(testNode)));
        insertAtEnd(testNode, 5);
        insertAtEnd(testNode, 5);
        insertAtEnd(testNode, 5);
        insertAtEnd(testNode, 5);
        insertAtEnd(testNode, 6);
        Assert.assertEquals("[12345656]", printList(removeDuplicatesNoDereference(testNode)));
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
        ListNode<Integer> test = new ListNode<>(1);
        test.next = new ListNode<>(2);
        test.next.next = new ListNode<>(2);
        Assert.assertEquals("[1]", printList(cleanupDuplicatedNodes(test)));
    }

    @Test
    public void testCleanupDuplicatedNodesNoDup() {
        ListNode<Integer> test = new ListNode<>(1);
        test.next = new ListNode<>(2);
        Assert.assertEquals("[12]", printList(cleanupDuplicatedNodes(test)));
    }

    @Test
    public void testCleanupDuplicatedNodesDupPair() {
        ListNode<Integer> test = new ListNode<>(1);
        test.next = new ListNode<>(1);
        Assert.assertEquals("[]", printList(cleanupDuplicatedNodes(test)));
    }

    @Test
    public void testCleanupDuplicatedNodes() {
        insertAtEnd(testNode, 5);
        insertAtEnd(testNode, 5);
        insertAtEnd(testNode, 5);
        insertAtEnd(testNode, 5);
        insertAtEnd(testNode, 6);
        Assert.assertEquals("[12346]", printList(cleanupDuplicatedNodes(testNode)));
    }

    @Test
    public void testMergeSortedListsNull() {
        Assert.assertEquals("[]", printList(mergeSortedLists(null, null)));
        Assert.assertEquals("[1]", printList(mergeSortedLists(new ListNode<>(1), null)));
        Assert.assertEquals("[2]", printList(mergeSortedLists(null, new ListNode<>(2))));
    }

    @Test
    public void testMergeSortedLists1() {
        Assert.assertEquals("[1122334455]", printList(mergeSortedLists(testNode, cloneList(testNode))));
    }

    @Test
    public void testMergeSortedLists2() {
        Assert.assertEquals("[123456]", printList(mergeSortedLists(testNode, new ListNode<>(6))));
    }

    @Test
    public void testMergeSortedLists3() {
        Assert.assertEquals("[123456]", printList(mergeSortedLists(new ListNode<>(6), testNode)));
    }

    @Test
    public void testMergeSortedLists4() {
        ListNode<Integer> t1 = new ListNode<>(4);
        t1.next = new ListNode<>(5);
        t1.next.next = new ListNode<>(6);
        Assert.assertEquals("[12344556]", printList(mergeSortedLists(t1, testNode)));
    }

    @Test
    public void testMergeSortedLists5() {
        ListNode<Integer> t1 = new ListNode<>(4);
        t1.next = new ListNode<>(5);
        t1.next.next = new ListNode<>(6);
        Assert.assertEquals("[12344556]", printList(mergeSortedLists(testNode, t1)));
    }

    @Test
    public void testMergeSortedListsIterativelyNull() {
        Assert.assertEquals("[]", printList(mergeSortedListsIteratively(null, null)));
        Assert.assertEquals("[1]", printList(mergeSortedListsIteratively(new ListNode<>(1), null)));
        Assert.assertEquals("[2]", printList(mergeSortedListsIteratively(null, new ListNode<>(2))));
    }

    @Test
    public void testMergeSortedListsIteratively1() {
        Assert.assertEquals("[1122334455]", printList(mergeSortedListsIteratively(testNode, cloneList(testNode))));
    }

    @Test
    public void testMergeSortedListsIteratively2() {
        Assert.assertEquals("[123456]", printList(mergeSortedListsIteratively(testNode, new ListNode<>(6))));
    }

    @Test
    public void testMergeSortedListsIteratively3() {
        Assert.assertEquals("[123456]", printList(mergeSortedListsIteratively(new ListNode<>(6), testNode)));
    }

    @Test
    public void testMergeSortedListsIteratively4() {
        ListNode<Integer> t1 = new ListNode<>(4);
        t1.next = new ListNode<>(5);
        t1.next.next = new ListNode<>(6);
        Assert.assertEquals("[12344556]", printList(mergeSortedListsIteratively(t1, testNode)));
    }

    @Test
    public void testMergeSortedListsIteratively5() {
        ListNode<Integer> t1 = new ListNode<>(4);
        t1.next = new ListNode<>(5);
        t1.next.next = new ListNode<>(6);
        Assert.assertEquals("[12344556]", printList(mergeSortedListsIteratively(testNode, t1)));
    }

    @Test
    public void testIncrementByOne() {
        Assert.assertEquals("[]", printList(incrementByOne(null)));

        ListNode<Integer> node = new ListNode<>(9);
        Assert.assertEquals("[10]", printList(incrementByOne(node)));

        node = new ListNode<>(9);
        node.next = new ListNode<>(9);
        Assert.assertEquals("[100]", printList(incrementByOne(node)));

        node = new ListNode<>(9);
        node.next = new ListNode<>(9);
        node.next.next = new ListNode<>(9);
        Assert.assertEquals("[1000]", printList(incrementByOne(node)));

        node = new ListNode<>(9);
        node.next = new ListNode<>(9);
        node.next.next = new ListNode<>(9);
        node.next.next.next = new ListNode<>(9);
        Assert.assertEquals("[10000]", printList(incrementByOne(node)));

        node = new ListNode<>(1);
        Assert.assertEquals("[2]", printList(incrementByOne(node)));

        node = new ListNode<>(1);
        node.next = new ListNode<>(2);
        node.next.next = new ListNode<>(3);
        Assert.assertEquals("[124]", printList(incrementByOne(node)));

        node = new ListNode<>(1);
        node.next = new ListNode<>(2);
        node.next.next = new ListNode<>(9);
        Assert.assertEquals("[130]", printList(incrementByOne(node)));

        node = new ListNode<>(1);
        node.next = new ListNode<>(9);
        Assert.assertEquals("[20]", printList(incrementByOne(node)));

        node = new ListNode<>(1);
        node.next = new ListNode<>(9);
        node.next.next = new ListNode<>(9);
        Assert.assertEquals("[200]", printList(incrementByOne(node)));

        node = new ListNode<>(8);
        node.next = new ListNode<>(9);
        node.next.next = new ListNode<>(9);
        node.next.next.next = new ListNode<>(9);
        Assert.assertEquals("[9000]", printList(incrementByOne(node)));
    }
}
