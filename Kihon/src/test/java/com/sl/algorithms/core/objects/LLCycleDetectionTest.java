package com.sl.algorithms.core.objects;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import static com.sl.algorithms.core.objects.ListNode.createLinkedList;

public class LLCycleDetectionTest extends CycleDetection {
    private ListNode<Integer> integerListNode;
    private ListNode<String> stringListNode;

    @Before
    public void setup() {
        integerListNode = ListNode.createLinkedList(new Integer[]{1, 2, 3, 4, 5});
        stringListNode = ListNode.createLinkedList(new String[]{"Array", "List", "Tree", "Map"});
    }

    @Test
    public void testCycleEndPoints() {
        {
            Assert.assertNull(getCycleEndPoints(ListNode.dummyNode()));
            Assert.assertNull(getCycleEndPoints(new ListNode<>(1)));
            Assert.assertNull(getCycleEndPoints(integerListNode));
            Assert.assertNull(getCycleEndPoints(stringListNode));
        }
        {
            ListNode<Integer> curr = integerListNode;
            while (curr.next != null) curr = curr.next;
            ListNode<Integer> cyclePoint = integerListNode.next.next;
            curr.next = cyclePoint;
            Pair<ListNode<Integer>, ListNode<Integer>> endPoints = getCycleEndPoints(integerListNode);
            Assert.assertEquals("3", endPoints.left.data.toString());
            Assert.assertEquals("5", endPoints.right.data.toString());
        }
        {
            ListNode<String> curr = stringListNode;
            while (curr.next != null) curr = curr.next;
            curr.next = stringListNode;
            Pair<ListNode<String>, ListNode<String>> endPoints = getCycleEndPoints(stringListNode);
            Assert.assertEquals("Array", endPoints.left.data.toString());
            Assert.assertEquals("Map", endPoints.right.data.toString());
        }
    }
}
