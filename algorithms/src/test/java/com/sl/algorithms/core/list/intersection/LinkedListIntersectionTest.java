package com.sl.algorithms.core.list.intersection;

import static com.sl.algorithms.core.list.ListNode.createLinkedList;

import com.sl.algorithms.core.list.ListNode;
import org.junit.Assert;
import org.junit.Test;

@SuppressWarnings("unchecked")
public class LinkedListIntersectionTest extends ListIntersection {

  @Test
  public void testGetIntersectionNodeNull() {
    Assert.assertTrue(getIntersectionPoint(null, null) == null);
  }

  @Test
  public void testGetIntersectionNodeNothingCommon() {
    ListNode<Integer> list1 = createLinkedList(new Integer[]{1, 2, 3, 4, 5});
    ListNode<Integer> list2 = createLinkedList(new Integer[]{-1, -2, 0});
    Assert.assertNull(getIntersectionPoint(list1, null));
    Assert.assertNull(getIntersectionPoint(null, list2));
    Assert.assertNull(getIntersectionPoint(list1, list2));
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
    Assert.assertTrue(getIntersectionPoint(list1, list2).data.equals(3));
    Assert.assertTrue(getIntersectionPoint(list2, list1).data.equals(3));
  }
}
