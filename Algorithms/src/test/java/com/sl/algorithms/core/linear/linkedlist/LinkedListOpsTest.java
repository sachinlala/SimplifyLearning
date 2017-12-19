package com.sl.algorithms.core.linear.linkedlist;

import com.sl.algorithms.core.linear.array.ArrayOps;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import static com.sl.algorithms.core.linear.linkedlist.OpPosition.*;

public class LinkedListOpsTest extends LinkedListOps {
    private ListNode<Integer> testNode;

    @Before
    public void createList() {
        testNode = createLinkedList(new Integer[]{1,2,3,4,5});
    }

    @Test
    public void testCreateLinkedList() {
        Assert.assertNull(createLinkedList(null));
        Assert.assertNull(createLinkedList(new Integer[]{}));
        Assert.assertEquals("1", createLinkedList(new Integer[]{1}).toString());
        Assert.assertEquals("12345", createLinkedList(new Integer[]{1,2,3,4,5}).toString());
        Assert.assertEquals("[12345]", printList(testNode));
    }

    @Test
    public void testInsertOp() {
        int data = 0;
        Assert.assertEquals("[0]", printList(insertData(null, data, START)));
        Assert.assertEquals("[012345]", printList(insertData(testNode, data, START)));

        Assert.assertEquals("[0]", printList(insertData(null, data, AFTER)));
        ListNode<Integer> testNodeDeepCopy = cloneList(testNode);
        testNodeDeepCopy.next = insertData(testNodeDeepCopy.next, data, AFTER);
        Assert.assertEquals("[120345]", printList(testNodeDeepCopy));

        Assert.assertEquals("[6]", printList(insertData(null, 6, END)));
        testNodeDeepCopy = cloneList(testNode);
        Assert.assertEquals("[123456]", printList(insertData(testNodeDeepCopy, 6, END)));
    }

    @Test
    public void testRemoveDataByPosition() {
        Assert.assertNull(removeDataByPosition(null, START));
        Assert.assertNull(removeDataByPosition(new ListNode<>(1), START));
        Assert.assertEquals("[2345]", printList(removeDataByPosition(testNode, START)));

        Assert.assertNull(removeDataByPosition(null, AFTER));

        ListNode<Integer> testNodeCopy = cloneList(testNode);
        if (testNodeCopy == null) {
            Assert.fail("Deep copy [testNodeCopy] is null");
        }
        testNodeCopy.next = removeDataByPosition(testNodeCopy.next, AFTER);
        Assert.assertEquals("[1245]", printList(testNodeCopy));

        Assert.assertNull(removeDataByPosition(null, END));
        Assert.assertNull(removeDataByPosition(new ListNode<>(1), END));

        testNodeCopy = cloneList(testNode);
        Assert.assertEquals("[1234]", printList(removeDataByPosition(testNodeCopy, END)));
    }

    @Test
    public void testRemoveData() {
        Assert.assertNull(removeData(null, 0));

        ListNode<Integer> testNodeCopy = cloneList(testNode);
        Assert.assertEquals("[12345]", printList(removeData(testNodeCopy, 0)));

        testNodeCopy = cloneList(testNode);
        Assert.assertEquals("[2345]", printList(removeData(testNodeCopy, 1)));

        testNodeCopy = cloneList(testNode);
        Assert.assertEquals("[1235]", printList(removeData(testNodeCopy, 4)));

        testNodeCopy = cloneList(testNode);
        Assert.assertEquals("[1234]", printList(removeData(testNodeCopy, 5)));

        ListNode<Integer> listWithDupes1 = createLinkedList(new Integer[]{1,2,6,3,4,5,6});
        Assert.assertEquals("[12345]", printList(removeData(listWithDupes1, 6)));

        ListNode<Integer> listWithDupes2 = createLinkedList(new Integer[]{1,1});
        Assert.assertNull(removeData(listWithDupes2, 1));
    }

    @Test
    public void testCloneList() {
        Assert.assertNull(cloneList(null));

        ListNode<Integer> oneNodeCopy = cloneList(new ListNode<>(1));
        Assert.assertEquals("[1]", printList(oneNodeCopy));

        ListNode<Integer> deepCopy = cloneList(testNode);
        Assert.assertEquals("[12345]", printList(deepCopy));
    }

    @Test
    public void testIsIdentical() {
        ListNode<Integer> sampleList = createLinkedList(new Integer[]{1,2,3,4,5});
        Assert.assertTrue(isIdentical(testNode, sampleList));
        Assert.assertTrue(isIdentical(sampleList, testNode));

        sampleList.next = new ListNode<>(6);
        Assert.assertFalse(isIdentical(sampleList, testNode));
    }

    @Test
    public void testConvertToArray() {
        Assert.assertEquals("[1,2,3,4,5]", ArrayOps.printArray(convertToArray(testNode)));
    }
}