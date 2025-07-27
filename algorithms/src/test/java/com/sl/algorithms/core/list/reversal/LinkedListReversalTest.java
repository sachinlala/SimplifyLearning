package com.sl.algorithms.core.list.reversal;

import static com.sl.algorithms.core.list.ListNode.createLinkedList;
import static com.sl.algorithms.core.utils.LinkedListOps.reverse;
import static com.sl.algorithms.core.utils.LinkedListOps.reverseListInGroups;

import com.sl.algorithms.core.list.ListNode;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class LinkedListReversalTest {

  private ListNode<Integer> testNode;

  @BeforeEach
  public void createList() {
    testNode = createLinkedList(new Integer[]{1, 2, 3, 4, 5});
  }

  @Test
  public void testReverse() {
    assertNull(reverse(null));

    ListNode<Integer> singleNode = new ListNode<>(1);
    assertEquals(singleNode, reverse(singleNode));

    ListNode<Integer> pair = reverse(createLinkedList(new Integer[]{1, 2}));
    assertEquals("[2,1]", pair.toString());

    assertEquals("[5,4,3,2,1]", reverse(testNode).toString());
  }

  @Test
  public void testReverseInGroups() {
    {
      assertNull(reverseListInGroups(null, 1));
    }
    {
      ListNode<Integer> singleNode = new ListNode<>(1);
      assertTrue(singleNode.equals(reverseListInGroups(singleNode, 1)));
    }
    {
      ListNode<Integer> pairNode = createLinkedList(new Integer[]{1, 2});
      assertEquals("[2,1]", reverseListInGroups(pairNode, 2).toString());
      pairNode = createLinkedList(new Integer[]{1, 2});
      assertEquals("[1,2]", reverseListInGroups(pairNode, 3).toString());
    }
    {
      assertEquals(testNode, reverseListInGroups(testNode, 0));
      assertEquals(testNode, reverseListInGroups(testNode, 1));
    }
    {
      assertEquals("[2,1,4,3,5]", reverseListInGroups(testNode.clone(), 2).toString());
    }
    {
      assertEquals("[3,2,1,4,5]", reverseListInGroups(testNode.clone(), 3).toString());
    }
    {
      assertEquals("[4,3,2,1,5]", reverseListInGroups(testNode.clone(), 4).toString());
    }
    {
      assertEquals("[5,4,3,2,1]", reverseListInGroups(testNode.clone(), 5).toString());
    }
    {
      assertEquals("[1,2,3,4,5]", reverseListInGroups(testNode.clone(), 6).toString());
    }
  }
}
