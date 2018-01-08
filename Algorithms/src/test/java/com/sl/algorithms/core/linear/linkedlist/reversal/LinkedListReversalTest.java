package com.sl.algorithms.core.linear.linkedlist.reversal;

import com.sl.algorithms.core.baseObj.ListNode;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import static com.sl.algorithms.core.baseObj.ListNode.createLinkedList;
import static com.sl.algorithms.core.utils.LinkedListOps.reverse;
import static com.sl.algorithms.core.utils.LinkedListOps.reverseListInGroups;

public class LinkedListReversalTest {
    private ListNode<Integer> testNode;

    @Before
    public void createList() {
        testNode = createLinkedList(new Integer[]{1, 2, 3, 4, 5});
    }

    @Test
    public void testReverse() {
        Assert.assertNull(reverse(null));

        ListNode<Integer> singleNode = new ListNode<>(1);
        Assert.assertEquals(singleNode, reverse(singleNode));

        ListNode<Integer> pair = reverse(createLinkedList(new Integer[]{1, 2}));
        Assert.assertEquals("[21]", pair.toString());

        Assert.assertEquals("[54321]", reverse(testNode).toString());
    }

    @Test
    public void testReverseInGroups() {
        {
            Assert.assertNull(reverseListInGroups(null, 1));
        }
        {
            ListNode<Integer> singleNode = new ListNode<>(1);
            Assert.assertTrue(singleNode.equals(reverseListInGroups(singleNode, 1)));
        }
        {
            ListNode<Integer> pairNode = createLinkedList(new Integer[]{1, 2});
            Assert.assertEquals("[21]", reverseListInGroups(pairNode, 2).toString());
            pairNode = createLinkedList(new Integer[]{1, 2});
            Assert.assertEquals("[12]", reverseListInGroups(pairNode, 3).toString());
        }
        {
            Assert.assertEquals(testNode, reverseListInGroups(testNode, 0));
            Assert.assertEquals(testNode, reverseListInGroups(testNode, 1));
        }
        {
            Assert.assertEquals("[21435]", reverseListInGroups(testNode.clone(), 2).toString());
        }
        {
            Assert.assertEquals("[32145]", reverseListInGroups(testNode.clone(), 3).toString());
        }
        {
            Assert.assertEquals("[43215]", reverseListInGroups(testNode.clone(), 4).toString());
        }
        {
            Assert.assertEquals("[54321]", reverseListInGroups(testNode.clone(), 5).toString());
        }
        {
            Assert.assertEquals("[12345]", reverseListInGroups(testNode.clone(), 6).toString());
        }
    }
}
