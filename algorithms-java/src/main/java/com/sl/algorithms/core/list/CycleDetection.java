package com.sl.algorithms.core.list;

import static com.sl.algorithms.core.interfaces.base.Constants.DELIMITER_COMMA;

import com.sl.algorithms.core.utils.Pair;

/**
 * <a href="https://en.wikipedia.org/wiki/Cycle_detection#Floyd's_Tortoise_and_Hare">Floyd's
 * Algorithm</a>
 *
 * @param <T> : {@link Comparable}
 */
public class CycleDetection<T extends Comparable> {

  /**
   * <br>For a cyclic list, find a node inside the cycle.<br> If null, implies the list is not
   * cyclic.<br> <br><u>Note</u>: For a cyclic list (unlike circular list), the node returned may
   * not be the start/end of the cycle.<br> To find the start & end of the cycle, please use
   * {@link #getCycleEndPoints(ListNode)}.<br>
   */
  static <T extends Comparable> ListNode<T> getNodeFromCycle(ListNode<T> head) {
    if (head == null || head.next == null) {
      return null;
    }
    ListNode<T> slow = head, fast = head;
    while (fast != null && fast.next != null) {
      slow = slow.next;
      fast = fast.next.next;
      if (slow == fast) {
        return slow;
      }
    }
    return null;
  }

  /**
   * <br>Find start & end of the cycle in a Cyclic list. <br>Depends on {@link
   * #getNodeFromCycle(ListNode)}.<br>
   */
  static <T extends Comparable> Pair<ListNode<T>, ListNode<T>> getCycleEndPoints(
      ListNode<T> head) {
    ListNode<T> cyclePoint = getNodeFromCycle(head);
    if (cyclePoint == null) {
      return null; // non-cyclic list
    }
    if (cyclePoint == head) {
      return new Pair<>(cyclePoint, head.tail()); // circular list
    }
    ListNode<T> curr = head, prev = cyclePoint;
    while (curr != cyclePoint) {
      curr = curr.next;
      cyclePoint = cyclePoint.next;
      if (curr != cyclePoint) {
        prev = cyclePoint;
      }
    }
    return new Pair<>(cyclePoint, prev);
  }

  /**
   * <br>Helper function for {@link ListNode#toString()}.
   */
  static <T extends Comparable> String getCyclicStringValue(ListNode<T> head) {
    if (head.next == null) {
      return head.data == null ? "" : head.data.toString();
    }
    StringBuilder listStr = new StringBuilder();
    ListNode<T> curr = head;
    Pair<ListNode<T>, ListNode<T>> pair = getCycleEndPoints(head);
    if (pair != null) {
      ListNode<T> tailOfCycle = pair.right;
      while (curr != tailOfCycle) {
        listStr.append(curr.data == null ? "" : curr.data.toString());
        listStr.append(DELIMITER_COMMA);
        curr = curr.next;
      }
      listStr.append(curr.data == null ? "" : curr.data.toString());
      return listStr.toString();
    }
    return null;
  }
}