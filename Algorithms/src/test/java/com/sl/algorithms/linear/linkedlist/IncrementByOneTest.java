package com.sl.algorithms.linear.linkedlist;

import com.sl.algorithms.core.linear.linkedlist.ListNode;
import org.junit.Assert;
import org.junit.Test;

import static com.sl.algorithms.core.linear.linkedlist.LinkedListOps.createLinkedList;
import static com.sl.algorithms.core.linear.linkedlist.LinkedListOps.printList;

public class IncrementByOneTest extends IncrementByOne {

    @Test
    public void testIncrementByOne() {
        Assert.assertEquals("[]", printList(incrementByOne(null)));
        Assert.assertEquals("2", incrementByOne(new ListNode<>(1)).toString());
        Assert.assertEquals("10", incrementByOne(new ListNode<>(9)).toString());
        Assert.assertEquals("20", incrementByOne(createLinkedList(new Integer[]{1,9})).toString());
        Assert.assertEquals("100", incrementByOne(createLinkedList(new Integer[]{9,9})).toString());
        Assert.assertEquals("124", incrementByOne(createLinkedList(new Integer[]{1,2,3})).toString());
        Assert.assertEquals("130", incrementByOne(createLinkedList(new Integer[]{1,2,9})).toString());
        Assert.assertEquals("200", incrementByOne(createLinkedList(new Integer[]{1,9,9})).toString());
        Assert.assertEquals("900", incrementByOne(createLinkedList(new Integer[]{8,9,9})).toString());
        Assert.assertEquals("1000", incrementByOne(createLinkedList(new Integer[]{9,9,9})).toString());
        Assert.assertEquals("9000", incrementByOne(createLinkedList(new Integer[]{8,9,9,9})).toString());
        Assert.assertEquals("10000", incrementByOne(createLinkedList(new Integer[]{9,9,9,9})).toString());
    }
}
