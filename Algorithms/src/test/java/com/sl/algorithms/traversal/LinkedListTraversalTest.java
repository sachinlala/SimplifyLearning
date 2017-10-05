package com.sl.algorithms.traversal;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;

import static com.sl.algorithms.traversal.LinkedListTraversal.*;

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
    public void testRotateNull() {
        Node newHead = rotateList(null, 1);
        Assert.assertEquals("[]", printList(newHead));
    }

    @Test
    public void testRotateSingle() {
        Node newHead = rotateList(new Node(1), 1);
        Assert.assertEquals("[1]", printList(newHead));
    }

    @Test
    public void testRotateIndexZero() {
        Node newHead = rotateList(testNode, 0);
        Assert.assertEquals("[12345]", printList(newHead));
    }

    @Ignore
    @Test
    public void testRotateAntiClockwisePartial() {
        Node newHead = rotateList(testNode, 3);
        Assert.assertEquals("[54123]", printList(newHead));
    }

    @Ignore
    @Test
    public void testRotateAntiClockwiseFull() {
        Node newHead = rotateList(testNode, 5);
        Assert.assertEquals("[12345]", printList(newHead));
    }

    @Test
    public void testSizeNull() {
        Assert.assertEquals(0, getSize(null));
    }

    @Test
    public void testSize() {
        Assert.assertEquals(5, getSize(testNode));
    }
}