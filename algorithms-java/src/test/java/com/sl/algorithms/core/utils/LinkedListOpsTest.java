package com.sl.algorithms.core.utils;

import static com.sl.algorithms.core.interfaces.base.OpPosition.AFTER;
import static com.sl.algorithms.core.interfaces.base.OpPosition.END;
import static com.sl.algorithms.core.interfaces.base.OpPosition.START;
import static com.sl.algorithms.core.list.ListNode.createLinkedList;

import com.sl.algorithms.core.list.ListNode;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class LinkedListOpsTest extends LinkedListOps {

  private ListNode<Integer> testNode;

  @BeforeEach
  public void createList() {
    testNode = createLinkedList(new Integer[]{1, 2, 3, 4, 5});
  }

  @Test
  public void testCreateLinkedList() {
    {
      assertNull(createLinkedList(null));
      assertNull(createLinkedList(new Integer[]{}));
    }
    {
      assertEquals(new ListNode<Integer>(1), createLinkedList(new Integer[]{1}));
      assertEquals("[1,2,3,4,5]", createLinkedList(new Integer[]{1, 2, 3, 4, 5}).toString());
    }
  }

  @Test
  public void testInsertOp() {
    int data = 0;
    {
      assertEquals("[0]", insertData(null, data, START).toString());
      assertEquals("[0,1,2,3,4,5]", insertData(testNode, data, START).toString());
    }
    {
      assertEquals("[0]", insertData(null, data, AFTER).toString());
      ListNode<Integer> testNodeDeepCopy = testNode.clone();
      testNodeDeepCopy.next = insertData(testNodeDeepCopy.next, data, AFTER);
      assertEquals("[1,2,0,3,4,5]", testNodeDeepCopy.toString());
    }
    {
      assertEquals("[6]", insertData(null, 6, END).toString());
      ListNode<Integer> testNodeDeepCopy = testNode.clone();
      assertEquals("[1,2,3,4,5,6]", insertData(testNodeDeepCopy, 6, END).toString());
    }
  }

  @Test
  public void testRemoveDataByPosition() {
    {
      assertNull(removeDataByPosition(null, START));
      assertNull(removeDataByPosition(new ListNode<>(1), START));
      assertEquals("[2,3,4,5]", removeDataByPosition(testNode, START).toString());
    }
    {
      assertNull(removeDataByPosition(null, AFTER));
      ListNode<Integer> testNodeCopy = testNode.clone();
      if (testNodeCopy == null) {
        fail("Deep copy [testNodeCopy] is null");
      }
      testNodeCopy.next = removeDataByPosition(testNodeCopy.next, AFTER);
      assertEquals("[1,2,4,5]", testNodeCopy.toString());
    }
    {
      assertNull(removeDataByPosition(null, END));
      assertNull(removeDataByPosition(new ListNode<>(1), END));
      ListNode<Integer> testNodeCopy = testNode.clone();
      assertEquals("[1,2,3,4]", removeDataByPosition(testNodeCopy, END).toString());
    }
  }

  @Test
  public void testRemoveData() {
    {
      assertNull(removeData(null, 0));
    }
    {
      assertEquals("[1,2,3,4,5]", removeData(testNode, 0).toString());
      assertEquals("[2,3,4,5]", removeData(testNode, 1).toString());
      assertEquals("[1,2,3,5]", removeData(testNode, 4).toString());
      assertEquals("[1,2,3]", removeData(testNode, 5).toString());
    }
    {
      ListNode<Integer> listWithDupes = createLinkedList(new Integer[]{1, 2, 6, 3, 4, 5, 6});
      assertEquals("[1,2,3,4,5]", removeData(listWithDupes, 6).toString());
    }
    {
      ListNode<Integer> dupPairList = createLinkedList(new Integer[]{1, 1});
      assertNull(removeData(dupPairList, 1));
    }
  }

  @Test
  public void testRemoveDuplicates() {
    {
      assertNull(removeDuplicates(null));
    }
    {
      ListNode<Integer> singleNode = new ListNode<>(1);
      assertEquals(singleNode, removeDuplicates(singleNode));
    }
    {
      ListNode<Integer> testPair1 = createLinkedList(new Integer[]{1, 2, 2});
      assertEquals("[1,2]", removeDuplicates(testPair1).toString());
    }
    {
      ListNode<Integer> testPair2 = createLinkedList(new Integer[]{1, 1});
      assertEquals("[1]", removeDuplicates(testPair2).toString());
    }
    {
      ListNode<Integer> positiveTest = createLinkedList(
          new Integer[]{1, 2, 3, 4, 5, 5, 5, 5, 5, 6});
      assertEquals("[1,2,3,4,5,6]", removeDuplicates(positiveTest).toString());
    }
    {
      ListNode<Integer> negativeTest = createLinkedList(new Integer[]{1, 2, 3, 4, 5});
      assertEquals("[1,2,3,4,5]", removeDuplicates(negativeTest).toString());
    }
  }

  @Test
  public void testReorderList() {
    {
      assertNull(reorderList(null));
    }
    {
      ListNode<Integer> singleNode = new ListNode<>(1);
      assertEquals("[1]", reorderList(singleNode).toString());
    }
    {
      ListNode<String> pairNode = createLinkedList(new String[]{"A", "B"});
      assertEquals("[A,B]", reorderList(pairNode).toString());
    }
    {
      ListNode<String> triplet = createLinkedList(new String[]{"A", "B", "C"});
      assertEquals("[A,C,B]", reorderList(triplet).toString());
    }
    {
      ListNode<String> quartret = createLinkedList(new String[]{"A", "B", "C", "D"});
      assertEquals("[A,D,B,C]", reorderList(quartret).toString());
    }
    {
      ListNode<String> pentagon = createLinkedList(new String[]{"A", "B", "C", "D", "E"});
      assertEquals("[A,E,B,D,C]", reorderList(pentagon).toString());
    }
    {
      ListNode<String> hexagon = createLinkedList(new String[]{"A", "B", "C", "D", "E", "F"});
      assertEquals("[A,F,B,E,C,D]", reorderList(hexagon).toString());
    }
  }

  @Test
  public void testIsPalindrome() {
    {
      assertTrue(isPalindrome(null));
      assertTrue(isPalindrome(createLinkedList(new Integer[]{})));
    }
    {
      assertTrue(isPalindrome(createLinkedList(new Integer[]{1})));
    }
    {
      assertTrue(isPalindrome(createLinkedList(new Integer[]{1, 1})));
      assertFalse(isPalindrome(createLinkedList(new Integer[]{1, 2})));
    }
    {
      assertTrue(isPalindrome(createLinkedList(new Integer[]{1, 2, 1})));
      assertFalse(isPalindrome(createLinkedList(new Integer[]{1, 2, 3})));
    }
    {
      assertFalse(isPalindrome(createLinkedList(new Integer[]{1, 1, 2, 1})));
    }
  }
}
