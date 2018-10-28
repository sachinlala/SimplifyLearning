package com.sl.algorithms.core.utils;

import static com.sl.algorithms.core.interfaces.base.OpPosition.AFTER;
import static com.sl.algorithms.core.interfaces.base.OpPosition.END;
import static com.sl.algorithms.core.interfaces.base.OpPosition.START;
import static com.sl.algorithms.core.list.ListNode.createLinkedList;

import com.sl.algorithms.core.list.ListNode;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

public class LinkedListOpsTest extends LinkedListOps {

  private ListNode<Integer> testNode;

  @Before
  public void createList() {
    testNode = createLinkedList(new Integer[]{1, 2, 3, 4, 5});
  }

  @Test
  public void testCreateLinkedList() {
    {
      Assert.assertNull(createLinkedList(null));
      Assert.assertNull(createLinkedList(new Integer[]{}));
    }
    {
      Assert.assertEquals(new ListNode<Integer>(1), createLinkedList(new Integer[]{1}));
      Assert.assertEquals("[1,2,3,4,5]", createLinkedList(new Integer[]{1, 2, 3, 4, 5}).toString());
    }
  }

  @Test
  public void testInsertOp() {
    int data = 0;
    {
      Assert.assertEquals("[0]", insertData(null, data, START).toString());
      Assert.assertEquals("[0,1,2,3,4,5]", insertData(testNode, data, START).toString());
    }
    {
      Assert.assertEquals("[0]", insertData(null, data, AFTER).toString());
      ListNode<Integer> testNodeDeepCopy = testNode.clone();
      testNodeDeepCopy.next = insertData(testNodeDeepCopy.next, data, AFTER);
      Assert.assertEquals("[1,2,0,3,4,5]", testNodeDeepCopy.toString());
    }
    {
      Assert.assertEquals("[6]", insertData(null, 6, END).toString());
      ListNode<Integer> testNodeDeepCopy = testNode.clone();
      Assert.assertEquals("[1,2,3,4,5,6]", insertData(testNodeDeepCopy, 6, END).toString());
    }
  }

  @Test
  public void testRemoveDataByPosition() {
    {
      Assert.assertNull(removeDataByPosition(null, START));
      Assert.assertNull(removeDataByPosition(new ListNode<>(1), START));
      Assert.assertEquals("[2,3,4,5]", removeDataByPosition(testNode, START).toString());
    }
    {
      Assert.assertNull(removeDataByPosition(null, AFTER));
      ListNode<Integer> testNodeCopy = testNode.clone();
      if (testNodeCopy == null) {
        Assert.fail("Deep copy [testNodeCopy] is null");
      }
      testNodeCopy.next = removeDataByPosition(testNodeCopy.next, AFTER);
      Assert.assertEquals("[1,2,4,5]", testNodeCopy.toString());
    }
    {
      Assert.assertNull(removeDataByPosition(null, END));
      Assert.assertNull(removeDataByPosition(new ListNode<>(1), END));
      ListNode<Integer> testNodeCopy = testNode.clone();
      Assert.assertEquals("[1,2,3,4]", removeDataByPosition(testNodeCopy, END).toString());
    }
  }

  @Test
  public void testRemoveData() {
    {
      Assert.assertNull(removeData(null, 0));
    }
    {
      Assert.assertEquals("[1,2,3,4,5]", removeData(testNode, 0).toString());
      Assert.assertEquals("[2,3,4,5]", removeData(testNode, 1).toString());
      Assert.assertEquals("[1,2,3,5]", removeData(testNode, 4).toString());
      Assert.assertEquals("[1,2,3]", removeData(testNode, 5).toString());
    }
    {
      ListNode<Integer> listWithDupes = createLinkedList(new Integer[]{1, 2, 6, 3, 4, 5, 6});
      Assert.assertEquals("[1,2,3,4,5]", removeData(listWithDupes, 6).toString());
    }
    {
      ListNode<Integer> dupPairList = createLinkedList(new Integer[]{1, 1});
      Assert.assertNull(removeData(dupPairList, 1));
    }
  }

  @Test
  public void testRemoveDuplicates() {
    {
      Assert.assertNull(removeDuplicates(null));
    }
    {
      ListNode<Integer> singleNode = new ListNode<>(1);
      Assert.assertEquals(singleNode, removeDuplicates(singleNode));
    }
    {
      ListNode<Integer> testPair1 = createLinkedList(new Integer[]{1, 2, 2});
      Assert.assertEquals("[1,2]", removeDuplicates(testPair1).toString());
    }
    {
      ListNode<Integer> testPair2 = createLinkedList(new Integer[]{1, 1});
      Assert.assertEquals("[1]", removeDuplicates(testPair2).toString());
    }
    {
      ListNode<Integer> positiveTest = createLinkedList(
          new Integer[]{1, 2, 3, 4, 5, 5, 5, 5, 5, 6});
      Assert.assertEquals("[1,2,3,4,5,6]", removeDuplicates(positiveTest).toString());
    }
    {
      ListNode<Integer> negativeTest = createLinkedList(new Integer[]{1, 2, 3, 4, 5});
      Assert.assertEquals("[1,2,3,4,5]", removeDuplicates(negativeTest).toString());
    }
  }

  @Test
  public void testReorderList() {
    {
      Assert.assertNull(reorderList(null));
    }
    {
      ListNode<Integer> singleNode = new ListNode<>(1);
      Assert.assertEquals("[1]", reorderList(singleNode).toString());
    }
    {
      ListNode<String> pairNode = createLinkedList(new String[]{"A", "B"});
      Assert.assertEquals("[A,B]", reorderList(pairNode).toString());
    }
    {
      ListNode<String> triplet = createLinkedList(new String[]{"A", "B", "C"});
      Assert.assertEquals("[A,C,B]", reorderList(triplet).toString());
    }
    {
      ListNode<String> quartret = createLinkedList(new String[]{"A", "B", "C", "D"});
      Assert.assertEquals("[A,D,B,C]", reorderList(quartret).toString());
    }
    {
      ListNode<String> pentagon = createLinkedList(new String[]{"A", "B", "C", "D", "E"});
      Assert.assertEquals("[A,E,B,D,C]", reorderList(pentagon).toString());
    }
    {
      ListNode<String> hexagon = createLinkedList(new String[]{"A", "B", "C", "D", "E", "F"});
      Assert.assertEquals("[A,F,B,E,C,D]", reorderList(hexagon).toString());
    }
  }

  @Test
  public void testIsPalindrome() {
    {
      Assert.assertTrue(isPalindrome(null));
      Assert.assertTrue(isPalindrome(createLinkedList(new Integer[]{})));
    }
    {
      Assert.assertTrue(isPalindrome(createLinkedList(new Integer[]{1})));
    }
    {
      Assert.assertTrue(isPalindrome(createLinkedList(new Integer[]{1, 1})));
      Assert.assertFalse(isPalindrome(createLinkedList(new Integer[]{1, 2})));
    }
    {
      Assert.assertTrue(isPalindrome(createLinkedList(new Integer[]{1, 2, 1})));
      Assert.assertFalse(isPalindrome(createLinkedList(new Integer[]{1, 2, 3})));
    }
    {
      Assert.assertFalse(isPalindrome(createLinkedList(new Integer[]{1, 1, 2, 1})));
    }
  }
}
