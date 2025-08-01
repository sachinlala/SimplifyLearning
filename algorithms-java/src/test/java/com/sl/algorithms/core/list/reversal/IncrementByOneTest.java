package com.sl.algorithms.core.list.reversal;

import static com.sl.algorithms.core.list.ListNode.createLinkedList;
import static com.sl.algorithms.core.utils.LinkedListOps.incrementByOne;
import static com.sl.algorithms.core.utils.NumberOps.convertToNumber;

import com.sl.algorithms.core.list.ListNode;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

public class IncrementByOneTest {

  @Test
  public void testIncrementByOne() {
    assertNull(incrementByOne(null));
    assertEquals(2, convertToNumber(incrementByOne(new ListNode<>(1))));
    assertEquals(10, convertToNumber(incrementByOne(new ListNode<>(9))));
    assertEquals(20, convertToNumber(incrementByOne(createLinkedList(new Integer[]{1, 9}))));
    assertEquals(100, convertToNumber(incrementByOne(createLinkedList(new Integer[]{9, 9}))));
    assertEquals(124,
        convertToNumber(incrementByOne(createLinkedList(new Integer[]{1, 2, 3}))));
    assertEquals(130,
        convertToNumber(incrementByOne(createLinkedList(new Integer[]{1, 2, 9}))));
    assertEquals(200,
        convertToNumber(incrementByOne(createLinkedList(new Integer[]{1, 9, 9}))));
    assertEquals(900,
        convertToNumber(incrementByOne(createLinkedList(new Integer[]{8, 9, 9}))));
    assertEquals(1000,
        convertToNumber(incrementByOne(createLinkedList(new Integer[]{9, 9, 9}))));
    assertEquals(9000,
        convertToNumber(incrementByOne(createLinkedList(new Integer[]{8, 9, 9, 9}))));
    assertEquals(10000,
        convertToNumber(incrementByOne(createLinkedList(new Integer[]{9, 9, 9, 9}))));
    assertEquals(-1, convertToNumber(incrementByOne(
        createLinkedList(new Integer[]{9, 2, 2, 3, 3, 7, 2, 0, 3, 6, 8, 5, 4, 7, 7, 5, 8, 0, 5}))));
  }
}
