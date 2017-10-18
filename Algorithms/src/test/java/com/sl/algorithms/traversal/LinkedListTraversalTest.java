package com.sl.algorithms.traversal;

import org.junit.Assert;
import org.junit.Before;
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
}
