package com.sl.algorithms.array;

import com.sl.algorithms.maths.Formulas;

public class BentleyShufflingAlgorithm {

    private BentleyShufflingAlgorithm() {
        /**
         * This is a utility class.<br>
         */
    }

    /**
     * Problem: Rotate array of size 'n' by 'k' positions, leftwards (counter-clockwise).<br>
     * Approach: Juggle the elements, 'hcf(n,k)' times.<br>
     * Time = O(n)<br>
     * Space = O(1)<br>
     */
    public static int[] rotateLeftByJuggling(int[] a, int k) {
        int i, j, d, temp, n = a.length, hcf = Formulas.hcf(k, n);
        for (i = 0; i < hcf; i++) {
            temp = a[i];
            j = i;
            while (true) {
                d = j + k;
                if (d >= n)
                    d = d - n;
                d = d % n; // this is required to prevent overflow
                if (d == i)
                    break;
                a[j] = a[d];
                j = d;
            }
            a[j] = temp;
        }
        return a;
    }
}
