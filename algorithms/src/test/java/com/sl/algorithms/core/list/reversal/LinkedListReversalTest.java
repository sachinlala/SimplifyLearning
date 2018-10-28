package com.sl.algorithms.core.list.reversal;

import static com.sl.algorithms.core.list.ListNode.createLinkedList;
import static com.sl.algorithms.core.utils.LinkedListOps.reverse;
import static com.sl.algorithms.core.utils.LinkedListOps.reverseListInGroups;

import com.sl.algorithms.core.list.ListNode;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

public class LinkedListReversalTest {

  private ListNode<Integer> testNode;

  @Before
  public void createList() {
    testNode = createLinkedList(new Integer[]{1, 2, 3, 4, 5});
  }

  @Test
  public void testReverse() {
    Assert.assertNull(reverse(null));

    ListNode<Integer> singleNode = new ListNode<>(1);
    Assert.assertEquals(singleNode, reverse(singleNode));

    ListNode<Integer> pair = reverse(createLinkedList(new Integer[]{1, 2}));
    Assert.assertEquals("[2,1]", pair.toString());

    Assert.assertEquals("[5,4,3,2,1]", reverse(testNode).toString());
  }

  @Test
  public void testReverseInGroups() {
    {
      Assert.assertNull(reverseListInGroups(null, 1));
    }
    {
      ListNode<Integer> singleNode = new ListNode<>(1);
      Assert.assertTrue(singleNode.equals(reverseListInGroups(singleNode, 1)));
    }
    {
      ListNode<Integer> pairNode = createLinkedList(new Integer[]{1, 2});
      Assert.assertEquals("[2,1]", reverseListInGroups(pairNode, 2).toString());
      pairNode = createLinkedList(new Integer[]{1, 2});
      Assert.assertEquals("[1,2]", reverseListInGroups(pairNode, 3).toString());
    }
    {
      Assert.assertEquals(testNode, reverseListInGroups(testNode, 0));
      Assert.assertEquals(testNode, reverseListInGroups(testNode, 1));
    }
    {
      Assert.assertEquals("[2,1,4,3,5]", reverseListInGroups(testNode.clone(), 2).toString());
    }
    {
      Assert.assertEquals("[3,2,1,4,5]", reverseListInGroups(testNode.clone(), 3).toString());
    }
    {
      Assert.assertEquals("[4,3,2,1,5]", reverseListInGroups(testNode.clone(), 4).toString());
    }
    {
      Assert.assertEquals("[5,4,3,2,1]", reverseListInGroups(testNode.clone(), 5).toString());
    }
    {
      Assert.assertEquals("[1,2,3,4,5]", reverseListInGroups(testNode.clone(), 6).toString());
    }
  }
}
