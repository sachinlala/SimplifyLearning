package com.sl.algorithms.core.interfaces.base;

import com.sl.algorithms.core.list.ListNode;

public interface BaseInterface<T extends Comparable> extends Constants {

  default void checkArray(T[] objects) {
    if (objects == null || objects.length == 0) {
      throw new IllegalArgumentException(ARRAY_IS_EMPTY);
    }
  }

  default void checkIntArray(int[] nums) {
    if (nums == null || nums.length == 0) {
      throw new IllegalArgumentException(ARRAY_IS_EMPTY);
    }
  }

  default void checkList(ListNode<T> head) {
    if (head == null) {
      throw new IllegalArgumentException(LIST_IS_EMPTY);
    }
  }
}
