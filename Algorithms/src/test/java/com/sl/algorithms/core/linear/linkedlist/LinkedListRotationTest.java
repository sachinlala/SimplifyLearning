package com.sl.algorithms.core.linear.linkedlist;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import static com.sl.algorithms.core.linear.linkedlist.LinkedListOps.createLinkedList;
import static com.sl.algorithms.core.linear.linkedlist.LinkedListOps.printList;

public class LinkedListRotationTest extends LinkedListRotation {

    private ListNode<Integer> testNode;

    @Before
    public void createList() {
        testNode = createLinkedList(new Integer[]{1,2,3,4,5});
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
    public void testRotateLeft() {
        Assert.assertEquals("[23451]", printList(rotateListLeft(testNode, 1)));

        createList();
        Assert.assertEquals("[34512]", printList(rotateListLeft(testNode, 2)));

        createList();
        Assert.assertEquals("[45123]", printList(rotateListLeft(testNode, 3)));

        createList();
        Assert.assertEquals("[51234]", printList(rotateListLeft(testNode, 4)));

        createList();
        Assert.assertEquals("[12345]", printList(rotateListLeft(testNode, 5)));

        createList();
        Assert.assertEquals("[23451]", printList(rotateListLeft(testNode, 6)));

        createList();
        Assert.assertEquals("[34512]", printList(rotateListLeft(testNode, 7)));

        createList();
        Assert.assertEquals("[45123]", printList(rotateListLeft(testNode, 8)));

        createList();
        Assert.assertEquals("[51234]", printList(rotateListLeft(testNode, 9)));

        createList();
        Assert.assertEquals("[12345]", printList(rotateListLeft(testNode, 10)));
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
    public void testRotateRight() {
        Assert.assertEquals("[51234]", printList(rotateListRight(testNode, 1)));

        createList();
        Assert.assertEquals("[45123]", printList(rotateListRight(testNode, 2)));

        createList();
        Assert.assertEquals("[34512]", printList(rotateListRight(testNode, 3)));

        createList();
        Assert.assertEquals("[23451]", printList(rotateListRight(testNode, 4)));

        createList();
        Assert.assertEquals("[12345]", printList(rotateListRight(testNode, 5)));

        createList();
        Assert.assertEquals("[51234]", printList(rotateListRight(testNode, 6)));

        createList();
        Assert.assertEquals("[45123]", printList(rotateListRight(testNode, 7)));

        createList();
        Assert.assertEquals("[34512]", printList(rotateListRight(testNode, 8)));

        createList();
        Assert.assertEquals("[23451]", printList(rotateListRight(testNode, 9)));

        createList();
        Assert.assertEquals("[12345]", printList(rotateListRight(testNode, 10)));
    }
}
