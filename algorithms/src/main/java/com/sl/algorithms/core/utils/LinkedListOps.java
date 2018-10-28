package com.sl.algorithms.core.utils;

import com.sl.algorithms.core.interfaces.base.OpPosition;
import com.sl.algorithms.core.list.ListNode;

public class LinkedListOps {

  LinkedListOps() {
    /**
     * This is a utility class.<br>
     */
  }

  public static <T extends Comparable> ListNode<T> insertData(ListNode<T> head, T newData,
      OpPosition position) {
    ListNode<T> newNode = new ListNode<>(newData);
    if (head == null) {
      return newNode;
    }
    switch (position) {
      case START: { // O(1)
        newNode.next = head;
        head = newNode;
        break;
      }
      case AFTER: { // O(1)
        newNode.next = head.next;
        head.next = newNode;
        break;
      }
      case END: { // O(n)
        head.next = insertData(head.next, newData, OpPosition.END);
        break;
      }
    }
    return head;
  }

  public static <T extends Comparable> ListNode<T> removeDataByPosition(ListNode<T> head,
      OpPosition position) {
    if (head == null) {
      return head;
    }
    switch (position) {
      case START: { // O(1)
        if (head.next == null) {
          return null;
        }
        ListNode<T> temp = head;
        head = temp.next;
        break;
      }
      case AFTER: { // O(1)
        head.next = head.next.next;
        break;
      }
      case END: { // O(n)
        if (head.next == null) {
          return null;
        }
        ListNode<T> temp = head;
        while (temp.next.next != null) {
          temp = temp.next;
        }
        temp.next = null;
        break;
      }
    }
    return head;
  }

  // O(n) time and O(1) space
  public static <T extends Comparable> ListNode<T> removeData(ListNode<T> head, T data) {
    ListNode<T> dummyNode = ListNode.dummyNode();
    dummyNode.next = head;
    ListNode<T> prev = dummyNode, curr = head;
    while (curr != null) {
      if (curr.data == data) {
        prev.next = curr.next;
      } else {
        prev = curr;
      }
      curr = curr.next;
    }
    return dummyNode.next;
  }

  // O(n) method to remove duplicates from a list
  public static <T extends Comparable> ListNode<T> removeDuplicates(ListNode<T> head) {
    if (head == null || head.next == null) {
      return head;
    }
    ListNode<T> curr = head;
    ListNode<T> next;
    while (curr != null && curr.next != null) {
      while (curr.next != null && curr.compareTo(curr.next)
          == 0) { // we mainly need data check only here, not a deep equality check
        next = curr.next;
        curr.next = next.next;
      }
      curr = curr.next;
    }
    return head;
  }

  /**
   * O(n) time and O(1) space method to reverse a list.
   *
   * @param head input list
   * @param <T> {@link Comparable}
   * @return reversed list
   */
  public static <T extends Comparable> ListNode<T> reverse(ListNode<T> head) {
    ListNode<T> prev = null, curr = head, next;
    while (curr != null) {
      next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
    }
    head = prev;
    return head;
  }

  /**
   * O(n) time and O(n/kMax) recursion-space method to reverse list in groups of kMax.
   *
   * @param head input list
   * @param k batch-size
   * @param <T> {@link Comparable}
   * @return reversed list
   */
  public static <T extends Comparable> ListNode<T> reverseListInGroups(ListNode<T> head, int k) {
    if (head == null || head.next == null || k > head.size() || k == 0) {
      return head;
    }
    ListNode<T> prev = null, curr = head, next = null;
    for (int i = 0; i < k && curr != null; i++) {
      next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
    }
    head.next = reverseListInGroups(next, k);
    head = prev;
    return head;
  }

  /**
   * O(n) time and O(n/2) recursion-space method to swap/reverse in pairs.
   *
   * @param head input list
   * @param <T> {@link Comparable}
   * @return transformed list
   */
  public static <T extends Comparable> ListNode<T> swapInPairs(ListNode<T> head) {
    if (head == null || head.next == null) {
      return head;
    }
    ListNode<T> next = head.next;
    head.next = swapInPairs(head.next.next);
    next.next = head;
    return next;
  }

  // O(n) time and O(1) space
  public static ListNode<Integer> incrementByOne(ListNode<Integer> head) {
    if (head == null) {
      return null;
    }
    int one = 1;
    boolean addOne = true;
    head = reverse(head);
    ListNode<Integer> curr = head;
    while (curr != null && curr.next != null) {
      if (addOne) {
        curr.data += one;
      }
      if (curr.data > 9) {
        curr.data = curr.data % 10;
        addOne = true;
      } else {
        addOne = false;
      }
      curr = curr.next;
    }
    if (curr != null && addOne) {
      curr.data += one;
      if (curr.data > 9) {
        curr.data = curr.data % 10;
        curr.next = new ListNode<>(one);
      }
    }
    head = reverse(head);
    return head;
  }

  /**
   * <br><a href="https://leetcode.com/problems/reorder-list/description/">Reorder List</a><br>
   * <br><u>Approach</u>:&nbsp;Find the mid-point; break the list into 2 parts around the mid-point;
   * establish new links.<br>
   *
   * @param head input list
   * @param <T> {@link Comparable}
   * @return re-ordered list
   */
  public static <T extends Comparable> ListNode<T> reorderList(ListNode<T> head) {
    if (head == null || head.next == null || head.next.next == null) {
      return head;
    }
    ListNode<T> midPoint = head.midPoint();
    ListNode<T> reverseNode = reverse(midPoint.next);
    midPoint.next = null; // this is to break the list into 2 (it's also important to keep the memory-usage in control)
    ListNode<T> curr = head;
    while (curr != null && reverseNode != null) {
      ListNode<T> currNext = curr.next;
      ListNode<T> reverseNext = reverseNode.next;
      curr.next = reverseNode;
      reverseNode.next = currNext;
      curr = currNext;
      reverseNode = reverseNext;
    }
    return head;
  }

  /**
   * <br><a href="https://leetcode.com/problems/palindrome-linked-list/description/">Palindrome
   * Linked List</a><br>
   *
   * @param head input list
   * @param <T> {@link Comparable}
   * @return true, when the list follows a palindrome pattern
   */
  public static <T extends Comparable> boolean isPalindrome(ListNode<T> head) {
    if (head == null || head.next == null) {
      return true;
    }
    ListNode<T> midPoint = head.midPoint();
    ListNode<T> reverseNode = reverse(midPoint);
    midPoint.next = null;
    ListNode<T> curr = head;
    while (curr != null && reverseNode != null) {
      if (curr.compareTo(reverseNode) != 0) {
        return false;
      }
      curr = curr.next;
      reverseNode = reverseNode.next;
    }
    return true;
  }
}
