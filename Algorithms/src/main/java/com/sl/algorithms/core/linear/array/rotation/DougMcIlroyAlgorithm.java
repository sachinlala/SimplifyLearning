package com.sl.algorithms.core.linear.array.rotation;

import com.sl.algorithms.core.baseObj.ListNode;
import com.sl.algorithms.core.interfaces.rwops.RotationEngine;

import static com.sl.algorithms.core.utils.ArrayOps.reverse;

/**
 * <br><b>Left Rotation</b>: Flip Left Hand -> Flip Right Hand -> Flip Both Hands <br>
 * <br><b>Right Rotation</b>: Flip Both Hands -> Flip Right Hand -> Flip Left Hand <br>
 * <br><a href="https://en.wikipedia.org/wiki/Douglas_McIlroy">Doug McIlroy</a><br>
 */
public class DougMcIlroyAlgorithm<T extends Comparable> implements RotationEngine<T> {

    // O(n) time and O(1) space
    @Override
    public T[] rotate(T[] objects, int k, boolean clockwise) {
        objChecks(objects);
        int l = objects.length;
        if (k >= l) k = k%l;
        if (clockwise) {
            reverse(objects, 0, l-1);
            reverse(objects, k, l-1);
            reverse(objects, 0, k-1);
        } else {
            reverse(objects, 0, k-1);
            reverse(objects, k, l-1);
            reverse(objects, 0, l-1);
        }
        return objects;
    }

    @Override
    public ListNode<T> rotate(ListNode<T> listNode, int k, boolean clockwise) {
        throw new UnsupportedOperationException();
    }
}
