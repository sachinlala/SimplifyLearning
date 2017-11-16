package com.sl.algorithms.linkedlist;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import static com.sl.algorithms.linkedlist.LinkedListTraversal.*;

public class LinkedListTraversalTest {
    private Node testNode;

    @Before
    public void createList() {
        int i = 0;
        testNode = new Node(++i);
        Node latest = new Node(++i);
        testNode.next = latest;
        while (i < 5) {
            Node temp = new Node(++i);
            latest.next = temp;
            latest = temp;
        }
    }

    @Test
    public void testToString() {
        Assert.assertEquals("12345", testNode.toString());
    }

    @Test
    public void testPrintList() {
        Assert.assertEquals("[12345]", printList(testNode));
    }

    @Test
    public void testInsertAtStart() {
        Node newHead = insertAtStart(testNode, 0);
        Assert.assertEquals("[012345]", printList(newHead));
    }

    @Test
    public void testInsertAtStartNegative() {
        Node newHead = insertAtStart(null, 0);
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
        Node newHead = insertAtEnd(testNode, 6);
        Assert.assertEquals("[123456]", printList(newHead));
    }

    @Test
    public void testInsertAtEndNegative() {
        Node newHead = insertAtEnd(null, 6);
        Assert.assertEquals("[6]", printList(newHead));
    }

    @Test
    public void testDeleteAtStart() {
        Node newHead = deleteAtStart(testNode);
        Assert.assertEquals("[2345]", printList(newHead));
    }

    @Test
    public void testDeleteAtStartSingleElement() {
        Node newHead = deleteAtStart(new Node(1));
        Assert.assertEquals("[]", printList(newHead));
    }

    @Test
    public void testDeleteAtStartNegative() {
        Node newHead = deleteAtStart(null);
        Assert.assertEquals("[]", printList(newHead));
    }

    @Test
    public void testDeleteAtPosition() {
        Node newHead = deleteAtPosition(testNode, 2);
        Assert.assertEquals("[1345]", printList(newHead));
    }

    @Test
    public void testDeleteAtPositionStart() {
        Node newHead = deleteAtPosition(testNode, 1);
        Assert.assertEquals("[2345]", printList(newHead));
    }

    @Test
    public void testDeleteAtPositionSingleElement() {
        Node newHead = deleteAtPosition(new Node(1), 1);
        Assert.assertEquals("[]", printList(newHead));
    }

    @Test
    public void testDeleteAtPositionEnd() {
        Node newHead = deleteAtPosition(testNode, 5);
        Assert.assertEquals("[1234]", printList(newHead));
    }

    @Test
    public void testDeleteAtPositionNegativeNull() {
        Node newHead = deleteAtPosition(null, 2);
        Assert.assertEquals("[]", printList(newHead));
    }

    @Test
    public void testDeleteAtPositionNegativeInvalidIndex() {
        Node newHead = deleteAtPosition(testNode, 10);
        Assert.assertEquals("[12345]", printList(newHead));
    }

    @Test
    public void testDeleteAtEnd() {
        Node newHead = deleteAtEnd(testNode);
        Assert.assertEquals("[1234]", printList(newHead));
    }

    @Test
    public void testDeleteAtEndSingleElement() {
        Node newHead = deleteAtEnd(new Node(1));
        Assert.assertEquals("[]", printList(newHead));
    }

    @Test
    public void testDeleteAtEndNegative() {
        Node newHead = deleteAtEnd(null);
        Assert.assertEquals("[]", printList(newHead));
    }

    @Test
    public void testDeleteSpecificDataNoOp() {
        Node newHead = deleteSpecificData(testNode, 0);
        Assert.assertEquals("[12345]", printList(newHead));
    }

    @Test
    public void testDeleteSpecificDataNull() {
        Node newHead = deleteSpecificData(null, 0);
        Assert.assertEquals("[]", printList(newHead));
    }

    @Test
    public void testDeleteSpecificDataStart() {
        Node newHead = deleteSpecificData(testNode, 1);
        Assert.assertEquals("[2345]", printList(newHead));
    }

    @Test
    public void testDeleteSpecificData() {
        Node newHead = deleteSpecificData(testNode, 2);
        Assert.assertEquals("[1345]", printList(newHead));
    }

    @Test
    public void testDeleteSpecificDataEnd() {
        Node newHead = deleteSpecificData(testNode, 5);
        Assert.assertEquals("[1234]", printList(newHead));
    }

    @Test
    public void testReverseNull() {
        Node newHead = reverseList(null);
        Assert.assertEquals("[]", printList(newHead));
    }

    @Test
    public void testReverseSingle() {
        Node newHead = reverseList(new Node(1));
        Assert.assertEquals("[1]", printList(newHead));
    }

    @Test
    public void testReverse() {
        Node newHead = reverseList(testNode);
        Assert.assertEquals("[54321]", printList(newHead));
    }

    @Test
    public void testPartialReverseNull() {
        Node newHead = reverseList(null, 1);
        Assert.assertEquals("[]", printList(newHead));
    }

    @Test
    public void testPartialReverseSingle() {
        Node newHead = reverseList(new Node(1), 1);
        Assert.assertEquals("[1]", printList(newHead));
    }

    @Test
    public void testPartialReverseZeroIndex() {
        Node newHead = reverseList(testNode, 0);
        Assert.assertEquals("[12345]", printList(newHead));
    }

    @Test
    public void testPartialReverseOverflowIndex() {
        Node newHead = reverseList(testNode, 6);
        Assert.assertEquals("[54321]", printList(newHead));
    }

    @Test
    public void testPartialReverse1() {
        Node newHead = reverseList(testNode, 1);
        Assert.assertEquals("[12345]", printList(newHead));
    }

    @Test
    public void testPartialReverse2() {
        Node newHead = reverseList(testNode, 2);
        Assert.assertEquals("[21435]", printList(newHead));
    }

    @Test
    public void testPartialReverse3() {
        Node newHead = reverseList(testNode, 3);
        Assert.assertEquals("[32154]", printList(newHead));
    }

    @Test
    public void testPartialReverse4() {
        Node newHead = reverseList(testNode, 4);
        Assert.assertEquals("[43215]", printList(newHead));
    }

    @Test
    public void testPartialReverseFull() {
        Node newHead = reverseList(testNode, 5);
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
        Node newHead = rotateListLeft(null, 1);
        Assert.assertEquals("[]", printList(newHead));
    }

    @Test
    public void testRotateLeftSingle() {
        Node newHead = rotateListLeft(new Node(1), 1);
        Assert.assertEquals("[1]", printList(newHead));
    }

    @Test
    public void testRotateLeftIndexZero() {
        Node newHead = rotateListLeft(testNode, 0);
        Assert.assertEquals("[12345]", printList(newHead));
    }

    @Test
    public void testRotateLeft1() {
        Node newHead = rotateListLeft(testNode, 1);
        Assert.assertEquals("[23451]", printList(newHead));
    }

    @Test
    public void testRotateLeft2() {
        Node newHead = rotateListLeft(testNode, 2);
        Assert.assertEquals("[34512]", printList(newHead));
    }
    @Test
    public void testRotateLeft3() {
        Node newHead = rotateListLeft(testNode, 3);
        Assert.assertEquals("[45123]", printList(newHead));
    }

    @Test
    public void testRotateLeft4() {
        Node newHead = rotateListLeft(testNode, 4);
        Assert.assertEquals("[51234]", printList(newHead));
    }

    @Test
    public void testRotateLeftFull() {
        Node newHead = rotateListLeft(testNode, 5);
        Assert.assertEquals("[12345]", printList(newHead));
    }

    @Test
    public void testRotateLeftOverflowBy1() {
        Node newHead = rotateListLeft(testNode, 6);
        Assert.assertEquals("[23451]", printList(newHead));
    }

    @Test
    public void testRotateLeftOverflowBy2() {
        Node newHead = rotateListLeft(testNode, 7);
        Assert.assertEquals("[34512]", printList(newHead));
    }

    @Test
    public void testRotateLeftOverflowBy3() {
        Node newHead = rotateListLeft(testNode, 8);
        Assert.assertEquals("[45123]", printList(newHead));
    }

    @Test
    public void testRotateLeftOverflowBy4() {
        Node newHead = rotateListLeft(testNode, 9);
        Assert.assertEquals("[51234]", printList(newHead));
    }

    @Test
    public void testRotateLeftOverflowBy5() {
        Node newHead = rotateListLeft(testNode, 10);
        Assert.assertEquals("[12345]", printList(newHead));
    }

    @Test
    public void testRotateRightNull() {
        Node newHead = rotateListRight(null, 1);
        Assert.assertEquals("[]", printList(newHead));
    }

    @Test
    public void testRotateRightSingle() {
        Node newHead = rotateListRight(new Node(1), 1);
        Assert.assertEquals("[1]", printList(newHead));
    }

    @Test
    public void testRotateRightIndexZero() {
        Node newHead = rotateListRight(testNode, 0);
        Assert.assertEquals("[12345]", printList(newHead));
    }

    @Test
    public void testRotateRight1() {
        Node newHead = rotateListRight(testNode, 1);
        Assert.assertEquals("[51234]", printList(newHead));
    }

    @Test
    public void testRotateRight2() {
        Node newHead = rotateListRight(testNode, 2);
        Assert.assertEquals("[45123]", printList(newHead));
    }

    @Test
    public void testRotateRight3() {
        Node newHead = rotateListRight(testNode, 3);
        Assert.assertEquals("[34512]", printList(newHead));
    }

    @Test
    public void testRotateRight4() {
        Node newHead = rotateListRight(testNode, 4);
        Assert.assertEquals("[23451]", printList(newHead));
    }

    @Test
    public void testRotateRightFull() {
        Node newHead = rotateListRight(testNode, 5);
        Assert.assertEquals("[12345]", printList(newHead));
    }

    @Test
    public void testRotateRightOverflowBy1() {
        Node newHead = rotateListRight(testNode, 6);
        Assert.assertEquals("[51234]", printList(newHead));
    }

    @Test
    public void testRotateRightOverflowBy2() {
        Node newHead = rotateListRight(testNode, 7);
        Assert.assertEquals("[45123]", printList(newHead));
    }

    @Test
    public void testRotateRightOverflowBy3() {
        Node newHead = rotateListRight(testNode, 8);
        Assert.assertEquals("[34512]", printList(newHead));
    }

    @Test
    public void testRotateRightOverflowBy4() {
        Node newHead = rotateListRight(testNode, 9);
        Assert.assertEquals("[23451]", printList(newHead));
    }

    @Test
    public void testRotateRightOverflowBy5() {
        Node newHead = rotateListRight(testNode, 10);
        Assert.assertEquals("[12345]", printList(newHead));
    }

    @Test
    public void testInsertAtPosition0() {
        Node newHead = insertAtPosition(testNode, 0,0);
        Assert.assertEquals("[012345]", printList(newHead));
    }

    @Test
    public void testInsertAtPosition0ForNull() {
        Node newHead = insertAtPosition(null, 0,0);
        Assert.assertEquals("[0]", printList(newHead));
    }

    @Test
    public void testInsertAtPosition1() {
        Node newHead = insertAtPosition(testNode, 0,1);
        Assert.assertEquals("[102345]", printList(newHead));
    }

    @Test
    public void testInsertAtPosition2() {
        Node newHead = insertAtPosition(testNode, 0,2);
        Assert.assertEquals("[120345]", printList(newHead));
    }

    @Test
    public void testInsertAtPosition3() {
        Node newHead = insertAtPosition(testNode, 0,3);
        Assert.assertEquals("[123045]", printList(newHead));
    }

    @Test
    public void testInsertAtPosition4() {
        Node newHead = insertAtPosition(testNode, 0,4);
        Assert.assertEquals("[123405]", printList(newHead));
    }

    @Test
    public void testInsertAtPosition5() {
        Node newHead = insertAtPosition(testNode, 0,5);
        Assert.assertEquals("[123450]", printList(newHead));
    }

    @Test
    public void testInsertAtPositionOverflow() {
        Node newHead = insertAtPosition(testNode, 0,6);
        Assert.assertEquals("[12345]", printList(newHead));
    }

    @Test
    public void testCloneList() {
        Node deepCopy = cloneList(testNode);
        Assert.assertEquals("[12345]", printList(deepCopy));
    }

    @Test
    public void testIsIdenticalPositive() {
        Assert.assertTrue(isIdentical(testNode, cloneList(testNode)));
    }

    @Test
    public void testIsIdenticalNegative() {
        Node deepCopy = cloneList(testNode);
        Assert.assertTrue(isIdentical(testNode, deepCopy));
        deepCopy.next = new Node(6);
        Assert.assertFalse(isIdentical(testNode, deepCopy));
    }

    @Test
    public void testRemoveDuplicatesNull() {
        Assert.assertEquals("[]", printList(removeDuplicates(null)));
        Assert.assertEquals("[]", printList(removeDuplicatesNoDereference(null)));
    }

    @Test
    public void testRemoveDuplicatesSingle() {
        Assert.assertEquals("[1]", printList(removeDuplicates(new Node(1))));
        Assert.assertEquals("[1]", printList(removeDuplicatesNoDereference(new Node(1))));
    }

    @Test
    public void testRemoveDuplicatesPairAfterHead() {
        Node test = new Node(1);
        test.next = new Node(2);
        test.next.next = new Node(2);
        Assert.assertEquals("[12]", printList(removeDuplicates(test)));
        test.next.next = new Node(2);
        Assert.assertEquals("[12]", printList(removeDuplicatesNoDereference(test)));
    }

    @Test
    public void testRemoveDuplicatesNoDup() {
        Node test = new Node(1);
        test.next = new Node(2);
        Assert.assertEquals("[12]", printList(removeDuplicates(test)));
        Assert.assertEquals("[12]", printList(removeDuplicatesNoDereference(test)));
    }

    @Test
    public void testRemoveDuplicatesDupPair() {
        Node test = new Node(1);
        test.next = new Node(1);
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
        Assert.assertEquals("[1]", printList(cleanupDuplicatedNodes(new Node(1))));
    }

    @Test
    public void testCleanupDuplicatedNodesPairAfterHead() {
        Node test = new Node(1);
        test.next = new Node(2);
        test.next.next = new Node(2);
        Assert.assertEquals("[1]", printList(cleanupDuplicatedNodes(test)));
    }

    @Test
    public void testCleanupDuplicatedNodesNoDup() {
        Node test = new Node(1);
        test.next = new Node(2);
        Assert.assertEquals("[12]", printList(cleanupDuplicatedNodes(test)));
    }

    @Test
    public void testCleanupDuplicatedNodesDupPair() {
        Node test = new Node(1);
        test.next = new Node(1);
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
        Assert.assertEquals("[1]", printList(mergeSortedLists(new Node(1), null)));
        Assert.assertEquals("[2]", printList(mergeSortedLists(null, new Node(2))));
    }

    @Test
    public void testMergeSortedLists1() {
        Assert.assertEquals("[1122334455]", printList(mergeSortedLists(testNode, cloneList(testNode))));
    }

    @Test
    public void testMergeSortedLists2() {
        Assert.assertEquals("[123456]", printList(mergeSortedLists(testNode, new Node(6))));
    }

    @Test
    public void testMergeSortedLists3() {
        Assert.assertEquals("[123456]", printList(mergeSortedLists(new Node(6), testNode)));
    }

    @Test
    public void testMergeSortedLists4() {
        Node t1 = new Node(4);
        t1.next = new Node(5);
        t1.next.next = new Node(6);
        Assert.assertEquals("[12344556]", printList(mergeSortedLists(t1, testNode)));
    }

    @Test
    public void testMergeSortedLists5() {
        Node t1 = new Node(4);
        t1.next = new Node(5);
        t1.next.next = new Node(6);
        Assert.assertEquals("[12344556]", printList(mergeSortedLists(testNode, t1)));
    }

    @Test
    public void testMergeSortedListsIterativelyNull() {
        Assert.assertEquals("[]", printList(mergeSortedListsIteratively(null, null)));
        Assert.assertEquals("[1]", printList(mergeSortedListsIteratively(new Node(1), null)));
        Assert.assertEquals("[2]", printList(mergeSortedListsIteratively(null, new Node(2))));
    }

    @Test
    public void testMergeSortedListsIteratively1() {
        Assert.assertEquals("[1122334455]", printList(mergeSortedListsIteratively(testNode, cloneList(testNode))));
    }

    @Test
    public void testMergeSortedListsIteratively2() {
        Assert.assertEquals("[123456]", printList(mergeSortedListsIteratively(testNode, new Node(6))));
    }

    @Test
    public void testMergeSortedListsIteratively3() {
        Assert.assertEquals("[123456]", printList(mergeSortedListsIteratively(new Node(6), testNode)));
    }

    @Test
    public void testMergeSortedListsIteratively4() {
        Node t1 = new Node(4);
        t1.next = new Node(5);
        t1.next.next = new Node(6);
        Assert.assertEquals("[12344556]", printList(mergeSortedListsIteratively(t1, testNode)));
    }

    @Test
    public void testMergeSortedListsIteratively5() {
        Node t1 = new Node(4);
        t1.next = new Node(5);
        t1.next.next = new Node(6);
        Assert.assertEquals("[12344556]", printList(mergeSortedListsIteratively(testNode, t1)));
    }

    @Test
    public void testIncrementByOne() {
        Assert.assertEquals("[]", printList(incrementByOne(null)));

        Node node = new Node(9);
        Assert.assertEquals("[10]", printList(incrementByOne(node)));

        node = new Node(9);
        node.next = new Node(9);
        Assert.assertEquals("[100]", printList(incrementByOne(node)));

        node = new Node(9);
        node.next = new Node(9);
        node.next.next = new Node(9);
        Assert.assertEquals("[1000]", printList(incrementByOne(node)));

        node = new Node(9);
        node.next = new Node(9);
        node.next.next = new Node(9);
        node.next.next.next = new Node(9);
        Assert.assertEquals("[10000]", printList(incrementByOne(node)));

        node = new Node(1);
        Assert.assertEquals("[2]", printList(incrementByOne(node)));

        node = new Node(1);
        node.next = new Node(2);
        node.next.next = new Node(3);
        Assert.assertEquals("[124]", printList(incrementByOne(node)));

        node = new Node(1);
        node.next = new Node(2);
        node.next.next = new Node(9);
        Assert.assertEquals("[130]", printList(incrementByOne(node)));

        node = new Node(1);
        node.next = new Node(9);
        Assert.assertEquals("[20]", printList(incrementByOne(node)));

        node = new Node(1);
        node.next = new Node(9);
        node.next.next = new Node(9);
        Assert.assertEquals("[200]", printList(incrementByOne(node)));

        node = new Node(8);
        node.next = new Node(9);
        node.next.next = new Node(9);
        node.next.next.next = new Node(9);
        Assert.assertEquals("[9000]", printList(incrementByOne(node)));
    }
}
