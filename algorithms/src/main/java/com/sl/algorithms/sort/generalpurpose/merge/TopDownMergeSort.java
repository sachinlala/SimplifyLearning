package com.sl.algorithms.sort.generalpurpose.merge;

import static com.sl.algorithms.core.utils.Formulas.midPoint;

import com.sl.algorithms.core.interfaces.merge.MergeEngine;
import com.sl.algorithms.core.list.ListNode;
import com.sl.algorithms.core.list.merge.LinkedListMergeDnQ;

/**
 * <p>TopDownMergeSort recursively splits the array into sub-lists and merges them to produce a
 * sorted list.</p>
 *
 * @see MergeSort
 */
@SuppressWarnings("unchecked")
public class TopDownMergeSort<T extends Comparable> extends MergeSort<T> {

  private static final MergeEngine mergeEngine = new LinkedListMergeDnQ();

  /**
   * <br><u>Steps</u>: <br>(0) if list is of size=1, return as is (i.e. base case). <br>(1)
   * partition the array into to a cluster of single units (divide). <br>(2) sort adjacent units as
   * a pair (conquer). <br>(3) merge adjacent unit (combine). <br>(4) repeat (2) and (3) till all
   * units are merged.<br> <br><u>Note</u>: The copy-back step is avoided by alternating the
   * direction of merge, during each recursion.<br>
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
    topDownMerge(aux, 0, n, objects);
  }

  /**
   * <u>Objective</u>: Sort a given portion (s->e) of target array, using the source array.
   *
   * @param source unsorted array
   * @param s start index (inclusive)
   * @param e end index (exclusive)
   * @param target output sorted array
   */
  private void topDownMerge(T[] source, int s, int e, T[] target) {
    if (e - s < 2) { // base condition
      return;
    }
    int m = midPoint(s, e);
    // split into 2 halves, recursively, and sort from target to source
    topDownMerge(target, s, m, source); // sort the left side
    topDownMerge(target, m, e, source); // sort the right side
    merge(source, s, m, e, target);
  }

  @Override
  public ListNode<T> sortList(ListNode<T> head) {
    checkList(head);
    if (head.next == null) {
      return head;
    }
    ListNode<T> midPoint = head.midPoint();
    ListNode<T> nextToMid = midPoint.next;
    midPoint.next = null; // this step is important as it breaks the list and keeps the memory usage in control/check.
    ListNode<T> left = sortList(head);
    ListNode<T> right = sortList(nextToMid);
    return mergeEngine.merge2SortedLists(left, right);
  }
}
