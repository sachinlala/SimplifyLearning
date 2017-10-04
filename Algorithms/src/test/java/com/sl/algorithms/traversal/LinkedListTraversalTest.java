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
        String output = new String("[12345]");
        Assert.assertEquals(output, printList(testNode));
        Assert.assertEquals(output, printList(testNode));
    }

    @Test
    public void testInsertAtStart() {
        String output = new String("[012345]");
        Node newHead = insertAtStart(testNode, 0);
        Assert.assertEquals(output, printList(newHead));
    }

    @Test
    public void testInsertAtStartNegative() {
        String output = new String("[0]");
        Node newHead = insertAtStart(null, 0);
        Assert.assertEquals(output, printList(newHead));
    }

    @Test
    public void testInsertAfter() {
        String output = new String("[120345]");
        testNode.next = insertAfter(testNode.next, 0);
        Assert.assertEquals(output, printList(testNode));
    }

    @Test
    public void testInsertAfterNegative() {
        String output = new String("[]");
        Assert.assertNull(insertAfter(null, 0));
    }

    @Test
    public void testInsertAtEnd() {
        String output = new String("[123456]");
        Node newHead = insertAtEnd(testNode, 6);
        Assert.assertEquals(output, printList(newHead));
    }

    @Test
    public void testInsertAtEndNegative() {
        String output = new String("[6]");
        Node newHead = insertAtEnd(null, 6);
        Assert.assertEquals(output, printList(newHead));
    }

    @Test
    public void testDeleteAtStart() {
        String output = new String("[2345]");
        Node newHead = deleteAtStart(testNode);
        Assert.assertEquals(output, printList(newHead));
    }

    @Test
    public void testDeleteAtStartSingleElement() {
        String output = new String("[]");
        Node newHead = deleteAtStart(new Node(1));
        Assert.assertEquals(output, printList(newHead));
    }

    @Test
    public void testDeleteAtStartNegative() {
        String output = new String("[]");
        Node newHead = deleteAtStart(null);
        Assert.assertEquals(output, printList(newHead));
    }

    @Test
    public void testDeleteAtPosition() {
        String output = new String("[1345]");
        Node newHead = deleteAtPosition(testNode, 2);
        Assert.assertEquals(output, printList(newHead));
    }

    @Test
    public void testDeleteAtPositionStart() {
        String output = new String("[2345]");
        Node newHead = deleteAtPosition(testNode, 1);
        Assert.assertEquals(output, printList(newHead));
    }

    @Test
    public void testDeleteAtPositionSingleElement() {
        String output = new String("[]");
        Node newHead = deleteAtPosition(new Node(1), 1);
        Assert.assertEquals(output, printList(newHead));
    }

    @Test
    public void testDeleteAtPositionEnd() {
        String output = new String("[1234]");
        Node newHead = deleteAtPosition(testNode, 5);
        Assert.assertEquals(output, printList(newHead));
    }

    @Test
    public void testDeleteAtPositionNegativeNull() {
        String output = new String("[]");
        Node newHead = deleteAtPosition(null, 2);
        Assert.assertEquals(output, printList(newHead));
    }

    @Test
    public void testDeleteAtPositionNegativeInvalidIndex() {
        String output = new String("[12345]");
        Node newHead = deleteAtPosition(testNode, 10);
        Assert.assertEquals(output, printList(newHead));
    }

    @Test
    public void testDeleteAtEnd() {
        String output = new String("[1234]");
        Node newHead = deleteAtEnd(testNode);
        Assert.assertEquals(output, printList(newHead));
    }

    @Test
    public void testDeleteAtEndSingleElement() {
        String output = new String("[]");
        Node newHead = deleteAtEnd(new Node(1));
        Assert.assertEquals(output, printList(newHead));
    }

    @Test
    public void testDeleteAtEndNegative() {
        String output = new String("[]");
        Node newHead = deleteAtEnd(null);
        Assert.assertEquals(output, printList(newHead));
    }

    @Test
    public void testDeleteSpecificDataNoOp() {
        String output = new String("[12345]");
        Node newHead = deleteSpecificData(testNode, 0);
        Assert.assertEquals(output, printList(newHead));
    }

    @Test
    public void testDeleteSpecificDataNull() {
        String output = new String("[]");
        Node newHead = deleteSpecificData(null, 0);
        Assert.assertEquals(output, printList(newHead));
    }

    @Test
    public void testDeleteSpecificDataStart() {
        String output = new String("[2345]");
        Node newHead = deleteSpecificData(testNode, 1);
        Assert.assertEquals(output, printList(newHead));
    }

    @Test
    public void testDeleteSpecificData() {
        String output = new String("[1345]");
        Node newHead = deleteSpecificData(testNode, 2);
        Assert.assertEquals(output, printList(newHead));
    }

    @Test
    public void testDeleteSpecificDataEnd() {
        String output = new String("[1234]");
        Node newHead = deleteSpecificData(testNode, 5);
        Assert.assertEquals(output, printList(newHead));
    }

    @Test
    public void testReverseNull() {
        String output = new String("[]");
        Node newHead = reverseList(null);
        Assert.assertEquals(output, printList(newHead));
    }

    @Test
    public void testReverseSingle() {
        String output = new String("[1]");
        Node newHead = reverseList(new Node(1));
        Assert.assertEquals(output, printList(newHead));
    }

    @Test
    public void testReverse() {
        String output = new String("[54321]");
        Node newHead = reverseList(testNode);
        Assert.assertEquals(output, printList(newHead));
    }

    @Test
    public void testPartialReverseNull() {
        String output = new String("[]");
        Node newHead = reverseList(null, 1);
        Assert.assertEquals(output, printList(newHead));
    }

    @Test
    public void testPartialReverseSingle() {
        String output = new String("[1]");
        Node newHead = reverseList(new Node(1), 1);
        Assert.assertEquals(output, printList(newHead));
    }

    @Test
    public void testPartialReverseZeroIndex() {
        String output = new String("[12345]");
        Node newHead = reverseList(testNode, 0);
        Assert.assertEquals(output, printList(newHead));
    }

    @Test
    public void testPartialReverse() {
        String output = new String("[32145]");
        Node newHead = reverseList(testNode, 3);
        Assert.assertEquals(output, printList(newHead));
    }

    @Test
    public void testPartialReverseFull() {
        String output = new String("[54321]");
        Node newHead = reverseList(testNode, 5);
        Assert.assertEquals(output, printList(newHead));
    }

    @Test
    public void testRotateNull() {
        String output = new String("[]");
        Node newHead = rotateList(null, 1);
        Assert.assertEquals(output, printList(newHead));
    }

    @Test
    public void testRotateSingle() {
        String output = new String("[1]");
        Node newHead = rotateList(new Node(1), 1);
        Assert.assertEquals(output, printList(newHead));
    }

    @Test
    public void testRotateIndexZero() {
        String output = new String("[12345]");
        Node newHead = rotateList(testNode, 0);
        Assert.assertEquals(output, printList(newHead));
    }

    @Ignore
    @Test
    public void testRotateAntiClockwisePartial() {
        String output = new String("[54123]");
        Node newHead = rotateList(testNode, 3);
        Assert.assertEquals(output, printList(newHead));
    }

    @Ignore
    @Test
    public void testRotateAntiClockwiseFull() {
        String output = new String("[12345]");
        Node newHead = rotateList(testNode, 5);
        Assert.assertEquals(output, printList(newHead));
    }
}