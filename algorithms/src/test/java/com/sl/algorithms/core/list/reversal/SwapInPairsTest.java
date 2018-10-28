package com.sl.algorithms.core.list.reversal;

import static com.sl.algorithms.core.list.ListNode.createLinkedList;
import static com.sl.algorithms.core.utils.LinkedListOps.swapInPairs;

import com.sl.algorithms.core.list.ListNode;
import org.junit.Assert;
import org.junit.Test;

@SuppressWarnings("unchecked")
public class SwapInPairsTest {

  @Test
  public void testSwapInPairsBaseCases() {
    Assert.assertNull(swapInPairs(null));

    ListNode<Integer> singleNode = new ListNode<>(1);
    Assert.assertEquals(swapInPairs(singleNode), singleNode);
  }

  @Test
  public void testSwapInPairs2Elements() {
    ListNode<Integer> pair = createLinkedList(new Integer[]{1, 2});
    ListNode<Integer> reverse = createLinkedList(new Integer[]{2, 1});
    Assert.assertEquals(swapInPairs(pair), reverse);
  }

  @Test
  public void testSwapInPairsEvenCount() {
    {
      ListNode<Integer> list = createLinkedList(new Integer[]{1, 2, 3, 4});
      ListNode<Integer> result = createLinkedList(new Integer[]{2, 1, 4, 3});
      Assert.assertEquals(swapInPairs(list), result);
    }
    {
      ListNode<String> strList = createLinkedList(new String[]{"A", "B", "C", "D"});
      ListNode<String> strResult = createLinkedList(new String[]{"B", "A", "D", "C"});
      Assert.assertEquals(swapInPairs(strList), strResult);
    }
  }

  @Test
  public void testSwapInPairsOddCount() {
    {
      ListNode<Integer> list = createLinkedList(new Integer[]{1, 2, 3, 4, 5});
      ListNode<Integer> result = createLinkedList(new Integer[]{2, 1, 4, 3, 5});
      Assert.assertEquals(swapInPairs(list), result);
    }
    {
      ListNode<String> strList = createLinkedList(new String[]{"A", "B", "C", "D", "E"});
      ListNode<String> strResult = createLinkedList(new String[]{"B", "A", "D", "C", "E"});
      Assert.assertEquals(swapInPairs(strList), strResult);
    }
  }
}
