package com.sl.algorithms.core.linear.array.rotation;

import com.sl.algorithms.core.baseObj.ListNode;
import com.sl.algorithms.core.interfaces.rwops.RotationEngine;
import com.sl.algorithms.core.utils.Formulas;

/**
 * <br>Problem: Rotate linear of size 'n' by 'kMax' positions, leftwards (counter-clockwise).<br>
 * <br><a href="https://eli.thegreenplace.net/2008/08/29/space-efficient-list-rotation">Reference</a><br>
 * <br><a href="https://en.wikipedia.org/wiki/Jon_Bentley_(computer_scientist)">Jon Bentley</a><br>
 */
public class BentleyShufflingAlgorithm<T extends Comparable> implements RotationEngine<T> {

    @Override
    public T[] rotate(T[] objects, int k, boolean clockwise) {
        checkArray(objects);
        if (clockwise) throw new IllegalArgumentException(OPERATION_NOT_SUPPORTED_YET);
        return rotateLeftByJuggling(objects, k);
    }

    // O(n) time and O(1) space
    private T[] rotateLeftByJuggling(T[] objects, int k) {
        int n = objects.length;
        int hcf = Formulas.hcf(n, k);
        int i, j, delta;
        T temp;
        for (i = 0; i < hcf; i++) {
            temp = objects[i];
            for (j = i; j < n; ) {
                delta = j + k;
                delta = delta % n; // this is required to prevent overflow
                if (delta == i) break;
                objects[j] = objects[delta];
                j = delta;
            }
            objects[j] = temp;
        }
        return objects;
    }

    @Override
    public ListNode<T> rotate(ListNode<T> listNode, int k, boolean clockwise) {
        throw new UnsupportedOperationException();
    }
}
