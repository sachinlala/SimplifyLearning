package com.sl.algorithms.core.list.reversal;

import static com.sl.algorithms.core.list.ListNode.createLinkedList;
import static com.sl.algorithms.core.utils.LinkedListOps.swapInPairs;

import com.sl.algorithms.core.list.ListNode;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

@SuppressWarnings("unchecked")
public class SwapInPairsTest {

  @Test
  public void testSwapInPairsBaseCases() {
    assertNull(swapInPairs(null));

    ListNode<Integer> singleNode = new ListNode<>(1);
    assertEquals(swapInPairs(singleNode), singleNode);
  }

  @Test
  public void testSwapInPairs2Elements() {
    ListNode<Integer> pair = createLinkedList(new Integer[]{1, 2});
    ListNode<Integer> reverse = createLinkedList(new Integer[]{2, 1});
    assertEquals(swapInPairs(pair), reverse);
  }

  @Test
  public void testSwapInPairsEvenCount() {
    {
      ListNode<Integer> list = createLinkedList(new Integer[]{1, 2, 3, 4});
      ListNode<Integer> result = createLinkedList(new Integer[]{2, 1, 4, 3});
      assertEquals(swapInPairs(list), result);
    }
    {
      ListNode<String> strList = createLinkedList(new String[]{"A", "B", "C", "D"});
      ListNode<String> strResult = createLinkedList(new String[]{"B", "A", "D", "C"});
      assertEquals(swapInPairs(strList), strResult);
    }
  }

  @Test
  public void testSwapInPairsOddCount() {
    {
      ListNode<Integer> list = createLinkedList(new Integer[]{1, 2, 3, 4, 5});
      ListNode<Integer> result = createLinkedList(new Integer[]{2, 1, 4, 3, 5});
      assertEquals(swapInPairs(list), result);
    }
    {
      ListNode<String> strList = createLinkedList(new String[]{"A", "B", "C", "D", "E"});
      ListNode<String> strResult = createLinkedList(new String[]{"B", "A", "D", "C", "E"});
      assertEquals(swapInPairs(strList), strResult);
    }
  }
}
