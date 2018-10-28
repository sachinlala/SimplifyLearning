package com.sl.algorithms.core.array.rotation;

import static com.sl.algorithms.core.utils.ArrayOps.reverse;

import com.sl.algorithms.core.interfaces.rotate.RotationEngine;
import com.sl.algorithms.core.list.ListNode;

/**
 * <br><b>Left Rotation</b>: Flip left hand, flip right hand, flip both hands <br> <br><b>Right
 * Rotation</b>: Flip both hands, flip right hand, flip left hand <br> <br><a
 * href="https://en.wikipedia.org/wiki/Douglas_McIlroy">Doug McIlroy</a><br>
 */
public class DougMcIlroyAlgorithm<T extends Comparable> implements RotationEngine<T> {

  // O(n) time and O(1) space
  @Override
  public T[] rotate(T[] objects, int k, boolean clockwise) {
    checkArray(objects);
    int l = objects.length;
    if (k >= l) {
      k = k % l;
    }
    if (clockwise) {
      reverse(objects, 0, l - 1);
      reverse(objects, k, l - 1);
      reverse(objects, 0, k - 1);
    } else {
      reverse(objects, 0, k - 1);
      reverse(objects, k, l - 1);
      reverse(objects, 0, l - 1);
    }
    return objects;
  }

  @Override
  public ListNode<T> rotate(ListNode<T> listNode, int k, boolean clockwise) {
    throw new UnsupportedOperationException();
  }
}
