package com.sl.algorithms.core.list;

import static com.sl.algorithms.core.interfaces.base.Constants.DATA_TYPE_NOT_SUPPORTED_YET;
import static com.sl.algorithms.core.interfaces.base.Constants.DELIMITER_COMMA;
import static com.sl.algorithms.core.list.CycleDetection.getCyclicStringValue;
import static com.sl.algorithms.core.list.CycleDetection.getNodeFromCycle;

import com.sl.algorithms.core.utils.Pair;
import java.io.Serializable;
import java.util.Objects;

/**
 * Basic representation of a singly LinkedList node.<br>
 *
 * @param <T> : {@link Comparable}
 */
public class ListNode<T extends Comparable>
    implements Comparable<ListNode<T>>, Serializable {

  /**
   * Direct public access for this project only (as it's not a service/app).<br>
   */
  public T data;
  public ListNode<T> next;

  public ListNode(final T _data) {
    data = _data;
    next = null;
  }

  private ListNode() {
    /*
     * For internal use only.<br>
     */
  }

  public static <T extends Comparable> ListNode<T> dummyNode() {
    return new ListNode<>();
  }

  /**
   * @param objects input array
   * @param <T> {@link Comparable}
   * @return head of the list
   */
  public static <T extends Comparable> ListNode<T> createLinkedList(T[] objects) {
    if (objects == null || objects.length == 0) {
      return null;
    }
    ListNode<T> dummyNode = ListNode.dummyNode();
    ListNode<T> head = new ListNode<>(objects[0]);
    dummyNode.next = head;
    for (int i = 1; i < objects.length; i++) {
      head.next = new ListNode<>(objects[i]);
      head = head.next;
    }
    return dummyNode.next;
  }

  /**
   * Deep Equality Assertion.<br>
   */
  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ListNode<?> node = (ListNode<?>) o;
    return Objects.equals(data, node.data) &&
        Objects.equals(next, node.next); // this implies a recursive call
  }

  @Override
  public int hashCode() {
    return Objects.hash(data, next); // this implies a recursive call
  }

  /**
   * Deep Copy.<br>
   */
  @Override
  public ListNode<T> clone() {
    ListNode<T> deepCopy = new ListNode<>(data);
    if (next == null) {
      return deepCopy;
    }
    deepCopy.next = next.clone();
    return deepCopy;
  }

  /**
   * Compare only the current node i.e. head/root level comparison only.<br> For deep equality
   * check, use {@link #equals(Object)}.<br>
   */
  @Override
  public int compareTo(ListNode<T> o) {
    if (data == null && o.data == null) {
      return 0;
    }
    if (data instanceof Integer && o.data instanceof Integer) {
      return ((Integer) data).compareTo((Integer) o.data);
    }
    if (data instanceof String && o.data instanceof String) {
      return ((String) data).compareTo((String) o.data);
    }
    throw new IllegalArgumentException(DATA_TYPE_NOT_SUPPORTED_YET);
  }

  @Override
  public String toString() {
    String strValue = "";
    if (isCyclic()) {
      strValue = getCyclicStringValue(this);
    } else {
      strValue = getStringValue();
    }
    if (strValue == null) {
      strValue = "";
    }
    return "[".concat(strValue).concat("]");
  }

  private String getStringValue() {
    if (next == null) {
      return data == null ? "" : data.toString();
    }
    StringBuilder listStr = new StringBuilder();
    ListNode<T> curr = this;
    do {
      listStr.append(curr.data == null ? "" : curr.data.toString());
      if (curr.next != null) {
        listStr.append(DELIMITER_COMMA);
      }
      curr = curr.next;
    } while (curr != null);
    return listStr.toString();
  }

  /**
   * @return Length of the list.
   */
  public int size() {
    if (next == null) {
      return 1;
    }
    return (1 + next.size());
  }

  // tail.next = some-node i.e. list is cycle but may not be circular
  public boolean isCyclic() {
    return (getNodeFromCycle(this) != null);
  }

  // tail.next = head i.e. list is cyclic and is circular
  public boolean isCircular() {
    return (getNodeFromCycle(this) == this);
  }

  /**
   * <u>Scope</u>: regular or circular list; for cyclic list, use #getEndPointsForCyclicList.
   *
   * @return tail node of the list
   */
  public ListNode<T> tail() {
    if (next == null) {
      return null;
    }
    ListNode<T> curr = this;
    ListNode<T> terminal = null;
    if (isCircular()) {
      terminal = this;
    }
    while (curr.next != terminal) {
      curr = curr.next;
    }
    return curr;
  }

  public boolean isDummyNode() {
    return (data == null && next == null);
  }

  /**
   * Floyd is great !
   *
   * @return node at the mid of the list
   */
  public ListNode<T> midPoint() {
    if (next == null || next.next == null) {
      return this; // null, {1}, {1,2}
    }
    if (next.next.next == null) {
      return next; // {1,2,3}
    }
    ListNode<T> slow = this, fast = next;
    while (fast != null && fast.next != null) {
      slow = slow.next;
      fast = fast.next.next;
    }
    return slow;
  }
}

/**
 * <a href="https://en.wikipedia.org/wiki/Cycle_detection#Floyd's_Tortoise_and_Hare">Floyd's
 * Algorithm</a>
 *
 * @param <T> : {@link Comparable}
 */
class CycleDetection<T extends Comparable> {

  /**
   * <br>For a cyclic list, find a node inside the cycle.<br> If null, implies the list is not
   * cyclic.<br> <br><u>Note</u>: For a cyclic list (unlike circular list), the node returned may
   * not be the start/end of the cycle.<br> To find the start & end of the cycle, please use {@link
   * #getCycleEndPoints(ListNode)}.<br>
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
