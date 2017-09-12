package com.sl.algorithms.traversal;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

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
        Assert.assertEquals(output, LinkedListTraversal.printList(testNode));
    }

    @Test
    public void testInsertAtStart() {
        String output = new String("[012345]");
        Node newHead = LinkedListTraversal.insertAtStart(testNode, 0);
        Assert.assertEquals(output, LinkedListTraversal.printList(newHead));
    }

    @Test
    public void testInsertAtStartNegative() {
        String output = new String("[0]");
        Node newHead = LinkedListTraversal.insertAtStart(null, 0);
        Assert.assertEquals(output, LinkedListTraversal.printList(newHead));
    }

    @Test
    public void testInsertAfter() {
        String output = new String("[120345]");
        testNode.next = LinkedListTraversal.insertAfter(testNode.next, 0);
        Assert.assertEquals(output, LinkedListTraversal.printList(testNode));
    }

    @Test
    public void testInsertAfterNegative() {
        String output = new String("[]");
        Assert.assertNull(LinkedListTraversal.insertAfter(null, 0));
    }

    @Test
    public void testInsertAtEnd() {
        String output = new String("[123456]");
        Node newHead = LinkedListTraversal.insertAtEnd(testNode, 6);
        Assert.assertEquals(output, LinkedListTraversal.printList(newHead));
    }

    @Test
    public void testInsertAtEndNegative() {
        String output = new String("[6]");
        Node newHead = LinkedListTraversal.insertAtEnd(null, 6);
        Assert.assertEquals(output, LinkedListTraversal.printList(newHead));
    }
}
