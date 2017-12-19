package com.sl.algorithms.linear.linkedlist;

import com.sl.algorithms.core.linear.linkedlist.LinkedListOps;
import com.sl.algorithms.core.linear.linkedlist.ListNode;
import org.junit.Assert;
import org.junit.Test;

public class SwapInPairsTest extends SwapInPairs {

    @Test
    public void testSwapInPairsBaseCases() {
        Assert.assertNull(swapInPairs(null));

        ListNode<Integer> singleNode = new ListNode<>(1);
        Assert.assertEquals(swapInPairs(singleNode), singleNode);
    }

    @Test
    public void testSwapInPairs2Elements() {
        ListNode<Integer> pair = LinkedListOps.createLinkedList(new Integer[]{1,2});
        ListNode<Integer> reverse = LinkedListOps.createLinkedList(new Integer[]{2,1});
        Assert.assertEquals(swapInPairs(pair), reverse);
    }

    @Test
    public void testSwapInPairsEvenCount() {
        ListNode<Integer> list = LinkedListOps.createLinkedList(new Integer[]{1,2,3,4});
        ListNode<Integer> result = LinkedListOps.createLinkedList(new Integer[]{2,1,4,3});
        Assert.assertEquals(swapInPairs(list), result);
    }

    @Test
    public void testSwapInPairsOddCount() {
        ListNode<Integer> list = LinkedListOps.createLinkedList(new Integer[]{1,2,3,4,5});
        ListNode<Integer> result = LinkedListOps.createLinkedList(new Integer[]{2,1,4,3,5});
        Assert.assertEquals(swapInPairs(list), result);
    }
}
