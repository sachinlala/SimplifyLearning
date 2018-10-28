package com.sl.algorithms.core.list.merge;

import static com.sl.algorithms.core.list.ListNode.createLinkedList;

import com.sl.algorithms.core.interfaces.merge.MergeEngine;
import com.sl.algorithms.core.list.ListNode;
import org.junit.Assert;
import org.junit.Test;

public class LinkedListMergeTest {

  private MergeEngine<Integer> mergeEngine;

  @Test
  public void testIterative() {
    mergeEngine = new LinkedListMergeIterative<>();
    testMerge2SortedListsNull();
    testMerge2SortedLists();
    testMergeKSortedLists();
  }

  @Test
  public void testDnQ() {
    mergeEngine = new LinkedListMergeDnQ<>();
    testMerge2SortedListsNull();
    testMerge2SortedLists();
    testMergeKSortedLists();
  }

  @Test
  public void testPQ() {
    mergeEngine = new LinkedListMergePQ<>();
    testMerge2SortedListsNull();
    testMerge2SortedLists();
    testMergeKSortedLists();
  }

  private void testMerge2SortedListsNull() {
    Assert.assertNull(mergeEngine.merge2SortedLists(null, null));
    Assert.assertEquals("[1]", mergeEngine.merge2SortedLists(new ListNode<>(1), null).toString());
    Assert.assertEquals("[2]", mergeEngine.merge2SortedLists(null, new ListNode<>(2)).toString());
  }

  private void testMerge2SortedLists() {
    ListNode<Integer> newList1 = createLinkedList(new Integer[]{4, 5, 6});
    ListNode<Integer> newList2 = createLinkedList(new Integer[]{1, 2, 4, 5, 6});
    Assert.assertEquals("[1,2,4,4,5,5,6,6]",
        mergeEngine.merge2SortedLists(newList1, newList2).toString());

    newList1 = createLinkedList(new Integer[]{1});
    newList2 = createLinkedList(new Integer[]{1});
    Assert.assertEquals("[1,1]", mergeEngine.merge2SortedLists(newList1, newList2).toString());

    newList1 = createLinkedList(new Integer[]{1, 2, 3});
    newList2 = createLinkedList(new Integer[]{1, 2, 3});
    Assert.assertEquals("[1,1,2,2,3,3]",
        mergeEngine.merge2SortedLists(newList1, newList2).toString());

    newList1 = createLinkedList(new Integer[]{1, 2});
    newList2 = createLinkedList(new Integer[]{3, 4, 5, 6});
    Assert.assertEquals("[1,2,3,4,5,6]",
        mergeEngine.merge2SortedLists(newList1, newList2).toString());

    newList1 = createLinkedList(new Integer[]{1, 2, 3, 4});
    newList2 = createLinkedList(new Integer[]{5, 6});
    Assert.assertEquals("[1,2,3,4,5,6]",
        mergeEngine.merge2SortedLists(newList1, newList2).toString());

    newList1 = createLinkedList(new Integer[]{1, 2, 5, 6});
    newList2 = createLinkedList(new Integer[]{3, 4});
    Assert.assertEquals("[1,2,3,4,5,6]",
        mergeEngine.merge2SortedLists(newList1, newList2).toString());
  }

  @SuppressWarnings("unchecked")
  private void testMergeKSortedLists() {
    ListNode<Integer> newList1 = createLinkedList(new Integer[]{4, 5, 6});
    ListNode<Integer> newList2 = createLinkedList(new Integer[]{1, 2, 4, 5, 6});
    ListNode<Integer> newList3 = createLinkedList(new Integer[]{1});
    Assert.assertEquals("[1,1,2,4,4,5,5,6,6]",
        mergeEngine.mergeKSortedLists(new ListNode[]{newList1, newList2, newList3}).toString());

    newList1 = createLinkedList(new Integer[]{1});
    newList2 = createLinkedList(new Integer[]{1});
    Assert.assertEquals("[1,1]",
        mergeEngine.mergeKSortedLists(new ListNode[]{newList1, newList2}).toString());

    newList1 = createLinkedList(new Integer[]{1, 2, 3});
    newList2 = createLinkedList(new Integer[]{1, 2, 3});
    newList3 = createLinkedList(new Integer[]{1, 2, 3});
    ListNode<Integer> newList4 = createLinkedList(new Integer[]{1, 2, 3});
    Assert.assertEquals("[1,1,1,1,2,2,2,2,3,3,3,3]",
        mergeEngine.mergeKSortedLists(new ListNode[]{newList1, newList2, newList3, newList4})
            .toString());

    newList1 = createLinkedList(new Integer[]{1, 2});
    newList2 = createLinkedList(new Integer[]{3, 4, 5, 6});
    Assert.assertEquals("[1,2,3,4,5,6]",
        mergeEngine.mergeKSortedLists(new ListNode[]{newList1, newList2}).toString());

    newList1 = createLinkedList(new Integer[]{1, 2, 3, 4});
    newList2 = createLinkedList(new Integer[]{5, 6});
    Assert.assertEquals("[1,2,3,4,5,6]",
        mergeEngine.mergeKSortedLists(new ListNode[]{newList1, newList2}).toString());

    newList1 = createLinkedList(new Integer[]{1, 2, 5, 6});
    newList2 = createLinkedList(new Integer[]{3, 4});
    Assert.assertEquals("[1,2,3,4,5,6]",
        mergeEngine.mergeKSortedLists(new ListNode[]{newList1, newList2}).toString());

    ListNode<String> stringNode1 = createLinkedList(new String[]{"A", "B", "C", "D"});
    ListNode<String> stringNode2 = createLinkedList(new String[]{"a", "b", "c", "d"});
    ListNode<String> stringNode3 = createLinkedList(new String[]{"X", "Y", "Z", "1", "2"});
    Assert.assertEquals("[A,B,C,D,X,Y,Z,1,2,a,b,c,d]",
        mergeEngine.mergeKSortedLists(new ListNode[]{stringNode1, stringNode2, stringNode3})
            .toString());
  }
}
