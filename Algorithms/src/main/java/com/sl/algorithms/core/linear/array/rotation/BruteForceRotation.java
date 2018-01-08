package com.sl.algorithms.core.linear.array.rotation;

import com.sl.algorithms.core.baseObj.ListNode;
import com.sl.algorithms.core.interfaces.rwops.RotationEngine;

/**
 * <br>Problem: Rotate linear of size 'n' by 'k' positions, leftwards (counter-clockwise).<br>
 * <br><a href="https://eli.thegreenplace.net/2008/08/29/space-efficient-list-rotation">Reference</a>
 */
public class BruteForceRotation<T extends Comparable> implements RotationEngine<T> {

    @Override
    public T[] rotate(T[] objects, int k, boolean clockwise) {
        objChecks(objects);
        if (clockwise) return rotateRight(objects, k);
        else return rotateLeft(objects, k);
    }

    // O(kn) time and O(1) space
    private T[] rotateLeft(T a[], int k) {
        for (int i=0; i<(k%a.length); i++) {
            int j = 0;
            T temp = a[j];
            for (; j<a.length-1; j++) a[j] = a[j + 1];
            a[j] = temp; // assign the staged value to the last element
        }
        return a;
    }

    // O(kn) time and O(1) space
    private T[] rotateRight(T a[], int k) {
        for (int i=0; i<(k%a.length); i++) {
            int j = a.length - 1;
            T temp = a[j];
            for (; j>0; j--) a[j] = a[j-1];
            a[j] = temp; // assign the staged value to the last element
        }
        return a;
    }

    // O(n) time and O(n) space
    public T[] rotateLeftWithSpace(T a[], int k) {
        int n = a.length;
        T[] b = a.clone(); // this is the bottleneck, but time-complexity is good (linear)
        k = k%n;
        for(int i=0; i<n; i++) {
            if (i-k < 0) b[i-k+n] = a[i];
            else b[i-k] = a[i];
        }
        return b;
    }

    @Override
    public ListNode<T> rotate(ListNode<T> listNode, int k, boolean clockwise) {
        throw new UnsupportedOperationException();
    }
}
