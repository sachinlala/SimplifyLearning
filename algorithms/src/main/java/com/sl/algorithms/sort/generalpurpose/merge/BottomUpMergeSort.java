package com.sl.algorithms.sort.generalpurpose.merge;

import com.sl.algorithms.core.interfaces.merge.MergeEngine;
import com.sl.algorithms.core.list.ListNode;
import com.sl.algorithms.core.list.merge.LinkedListMergeIterative;

/**
 * <p>BottomUpMergeSort treats the input array as a cluster of sub-lists and iteratively merges them
 * back and forth b/n 2 buffers to produce a sorted list.</p>
 *
 * @see MergeSort
 */
@SuppressWarnings("unchecked")
public class BottomUpMergeSort<T extends Comparable> extends MergeSort<T> {

  private static final MergeEngine mergeEngine = new LinkedListMergeIterative();

  /**
   * <br><u>Steps</u>: <br>(0) if list is of size=1, return as is (i.e. base case). <br>(1) pick
   * sub-lists of size 1 and build bottom-up with width increasing in multiples of 2. <br>(2) sort
   * adjacent units as a pair (conquer). <br>(3) iterate till entire width is sorted.<br>
   * <br><u>Note</u>: The copy-back step is explicitly required in each iteration to incrementally
   * sort the input array.<br>
   */
  @Override
  public void sort(T[] objects) {
    checkArray(objects);
    int n = objects.length;
    if (n == 1) {
      return;
    }
    T[] aux = (T[]) new Comparable[n];
    System.arraycopy(objects, 0, aux, 0, n);
    for (int w = 1; w < n; w <<= 1) {
      for (int i = 0; i < n; i += w << 1) {
        int m = Math.min(n, i + w);
        int e = Math.min(n, i + (w << 1));
        merge(objects, i, m, e, aux);
      }
      System.arraycopy(aux, 0, objects, 0, n);
    }
  }

  @Override
  public ListNode<T> sortList(ListNode<T> head) {
    checkList(head);
    if (head.next == null) {
      return head;
    }
    int sizeLimit = 8;
    ListNode<T>[] auxList = new ListNode[sizeLimit];
    ListNode<T> result = head;
    while (result != null) {
      ListNode<T> next = result.next;
      result.next = null;
      int i = 0;
      for (; i < sizeLimit && auxList[i] != null; i++) {
        result = mergeEngine.merge2SortedLists(auxList[i], result);
        auxList[i] = null;
      }
      if (i == sizeLimit) {
        i--;
      }
      auxList[i] = result;
      result = next;
    }
    result = null;
    for (int i = 0; i < sizeLimit; i++) {
      result = mergeEngine.merge2SortedLists(auxList[i], result);
    }
    return result;
  }
}
