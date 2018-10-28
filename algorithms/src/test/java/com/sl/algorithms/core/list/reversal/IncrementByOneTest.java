package com.sl.algorithms.core.list.reversal;

import static com.sl.algorithms.core.list.ListNode.createLinkedList;
import static com.sl.algorithms.core.utils.LinkedListOps.incrementByOne;
import static com.sl.algorithms.core.utils.NumberOps.convertToNumber;

import com.sl.algorithms.core.list.ListNode;
import org.junit.Assert;
import org.junit.Test;

public class IncrementByOneTest {

  @Test
  public void testIncrementByOne() {
    Assert.assertNull(incrementByOne(null));
    Assert.assertEquals(2, convertToNumber(incrementByOne(new ListNode<>(1))));
    Assert.assertEquals(10, convertToNumber(incrementByOne(new ListNode<>(9))));
    Assert.assertEquals(20, convertToNumber(incrementByOne(createLinkedList(new Integer[]{1, 9}))));
    Assert
        .assertEquals(100, convertToNumber(incrementByOne(createLinkedList(new Integer[]{9, 9}))));
    Assert.assertEquals(124,
        convertToNumber(incrementByOne(createLinkedList(new Integer[]{1, 2, 3}))));
    Assert.assertEquals(130,
        convertToNumber(incrementByOne(createLinkedList(new Integer[]{1, 2, 9}))));
    Assert.assertEquals(200,
        convertToNumber(incrementByOne(createLinkedList(new Integer[]{1, 9, 9}))));
    Assert.assertEquals(900,
        convertToNumber(incrementByOne(createLinkedList(new Integer[]{8, 9, 9}))));
    Assert.assertEquals(1000,
        convertToNumber(incrementByOne(createLinkedList(new Integer[]{9, 9, 9}))));
    Assert.assertEquals(9000,
        convertToNumber(incrementByOne(createLinkedList(new Integer[]{8, 9, 9, 9}))));
    Assert.assertEquals(10000,
        convertToNumber(incrementByOne(createLinkedList(new Integer[]{9, 9, 9, 9}))));
    Assert.assertEquals(-1, convertToNumber(incrementByOne(
        createLinkedList(new Integer[]{9, 2, 2, 3, 3, 7, 2, 0, 3, 6, 8, 5, 4, 7, 7, 5, 8, 0, 5}))));
  }
}
