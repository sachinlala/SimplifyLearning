package com.sl.algorithms.core.stack;

import com.sl.algorithms.core.interfaces.base.Constants;

/**
 * <br><a href="https://leetcode.com/problems/min-stack/description/">Problem Reference</a><br>
 */
public class MinStack implements Constants {

  private Element head;

  public void push(int x) {
    if (head == null) {
      head = new Element(x, x);
    } else {
      head = new Element(x, Math.min(x, head.min), head);
    }
  }

  public void pop() {
    if (head == null) {
      return;
    }
    head = head.next;
  }

  public int top() {
    if (head == null) {
      return ELEMENT_NOT_FOUND;
    }
    return head.data;
  }

  public int getMin() {
    if (head == null) {
      return ELEMENT_NOT_FOUND;
    }
    return head.min;
  }

  class Element {

    int data;
    int min;
    Element next;

    Element(int _data, int _min) {
      data = _data;
      min = _min;
    }

    Element(int _data, int _min, Element _next) {
      this(_data, _min);
      next = _next;
    }
  }
}
