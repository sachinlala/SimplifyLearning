package com.sl.algorithms.core.linear.linkedlist.reversal;

import com.sl.algorithms.core.baseObj.ListNode;
import org.junit.Assert;
import org.junit.Test;

import static com.sl.algorithms.core.baseObj.ListNode.createLinkedList;
import static com.sl.algorithms.core.utils.LinkedListOps.incrementByOne;
import static com.sl.algorithms.core.utils.NumberOps.convertToNumber;

public class IncrementByOneTest {

    @Test
    public void testIncrementByOne() {
        Assert.assertNull(incrementByOne(null));
        Assert.assertEquals(2, convertToNumber(incrementByOne(new ListNode<>(1))));
        Assert.assertEquals(10, convertToNumber(incrementByOne(new ListNode<>(9))));
        Assert.assertEquals(20, convertToNumber(incrementByOne(createLinkedList(new Integer[]{1,9}))));
        Assert.assertEquals(100, convertToNumber(incrementByOne(createLinkedList(new Integer[]{9,9}))));
        Assert.assertEquals(124, convertToNumber(incrementByOne(createLinkedList(new Integer[]{1,2,3}))));
        Assert.assertEquals(130, convertToNumber(incrementByOne(createLinkedList(new Integer[]{1,2,9}))));
        Assert.assertEquals(200, convertToNumber(incrementByOne(createLinkedList(new Integer[]{1,9,9}))));
        Assert.assertEquals(900, convertToNumber(incrementByOne(createLinkedList(new Integer[]{8,9,9}))));
        Assert.assertEquals(1000, convertToNumber(incrementByOne(createLinkedList(new Integer[]{9,9,9}))));
        Assert.assertEquals(9000, convertToNumber(incrementByOne(createLinkedList(new Integer[]{8,9,9,9}))));
        Assert.assertEquals(10000, convertToNumber(incrementByOne(createLinkedList(new Integer[]{9,9,9,9}))));
    }
}
