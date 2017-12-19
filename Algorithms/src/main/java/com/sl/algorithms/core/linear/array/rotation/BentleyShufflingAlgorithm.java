package com.sl.algorithms.core.linear.array.rotation;

import com.sl.algorithms.core.maths.Formulas;

/**
 * <a href="https://en.wikipedia.org/wiki/Jon_Bentley_(computer_scientist)">Jon Bentley</a>
 * <br>Problem: Rotate linear of size 'n' by 'k' positions, leftwards (counter-clockwise).
 * <br><a href="https://eli.thegreenplace.net/2008/08/29/space-efficient-list-rotation">Reference</a>
 */
public class BentleyShufflingAlgorithm {

    BentleyShufflingAlgorithm() {
        /**
         * This is a utility class.<br>
         */
    }
    // O(n) time and O(1) space
    public static <T> T[] rotateLeftByJuggling(T[] a, int k) {
        int n = a.length;
        int hcf = Formulas.hcf(n, k);
        int i, j, delta;
        T temp;
        for (i=0; i<hcf; i++) {
            temp = a[i];
            j = i;
            for (j=i; j<n; ) {
                delta = j + k;
                delta = delta % n; // this is required to prevent overflow
                if (delta == i) {
                    break;
                }
                a[j] = a[delta];
                j = delta;
            }
            a[j] = temp;
        }
        return a;
    }
}
