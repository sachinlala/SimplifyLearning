package com.sl.algorithms.core.list.intersection;

import static com.sl.algorithms.core.list.ListNode.createLinkedList;

import com.sl.algorithms.core.list.ListNode;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

@SuppressWarnings("unchecked")
public class LinkedListIntersectionTest extends ListIntersection {

  @Test
  public void testGetIntersectionNodeNull() {
    assertTrue(getIntersectionPoint(null, null) == null);
  }

  @Test
  public void testGetIntersectionNodeNothingCommon() {
    ListNode<Integer> list1 = createLinkedList(new Integer[]{1, 2, 3, 4, 5});
    ListNode<Integer> list2 = createLinkedList(new Integer[]{-1, -2, 0});
    assertNull(getIntersectionPoint(list1, null));
    assertNull(getIntersectionPoint(null, list2));
    assertNull(getIntersectionPoint(list1, list2));
  }

  @Test
  public void testGetIntersectionNode() {
    ListNode<Integer> list1 = createLinkedList(new Integer[]{1, 2, 3, 4, 5});
    ListNode<Integer> list2 = createLinkedList(new Integer[]{-1, -2, 0});
    ListNode<Integer> ptr1 = list1;
    int delta = 0;
    while (delta < 2) {
      ptr1 = ptr1.next;
      ++delta;
    }
    ListNode<Integer> ptr2 = list2;
    while (ptr2.next != null) {
      ptr2 = ptr2.next;
    }
    ptr2.next = ptr1;
    assertTrue(getIntersectionPoint(list1, list2).data.equals(3));
    assertTrue(getIntersectionPoint(list2, list1).data.equals(3));
  }
}
