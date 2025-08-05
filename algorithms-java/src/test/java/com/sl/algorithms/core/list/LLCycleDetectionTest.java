package com.sl.algorithms.core.list;

import static com.sl.algorithms.core.list.ListNode.createLinkedList;
import static com.sl.algorithms.core.list.ListNode.dummyNode;

import com.sl.algorithms.core.utils.Pair;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class LLCycleDetectionTest extends CycleDetection {

  private ListNode<Integer> integerListNode;
  private ListNode<String> stringListNode;

  @BeforeEach
  public void setup() {
    integerListNode = createLinkedList(new Integer[]{1, 2, 3, 4, 5});
    stringListNode = createLinkedList(new String[]{"Array", "List", "Tree", "Map"});
  }

  @Test
  public void testCycleEndPoints() {
    {
      assertNull(getCycleEndPoints(dummyNode()));
      assertNull(getCycleEndPoints(new ListNode<>(1)));
      assertNull(getCycleEndPoints(integerListNode));
      assertNull(getCycleEndPoints(stringListNode));
    }
    {
      ListNode<Integer> curr = integerListNode;
      while (curr.next != null) {
        curr = curr.next;
      }
      ListNode<Integer> cyclePoint = integerListNode.next.next;
      curr.next = cyclePoint;
      Pair<ListNode<Integer>, ListNode<Integer>> endPoints = getCycleEndPoints(integerListNode);
      assertEquals("3", endPoints.left.data.toString());
      assertEquals("5", endPoints.right.data.toString());
    }
    {
      ListNode<String> curr = stringListNode;
      while (curr.next != null) {
        curr = curr.next;
      }
      curr.next = stringListNode;
      Pair<ListNode<String>, ListNode<String>> endPoints = getCycleEndPoints(stringListNode);
      assertEquals("Array", endPoints.left.data.toString());
      assertEquals("Map", endPoints.right.data.toString());
    }
  }
}
