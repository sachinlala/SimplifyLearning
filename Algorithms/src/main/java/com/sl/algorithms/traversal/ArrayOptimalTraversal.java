package com.sl.algorithms.traversal;

import com.sl.algorithms.maths.Formulas;

public class ArrayOptimalTraversal {
    /**
     * Problem: Rotate array of size 'n' by 'k' positions, leftwards (counter-clockwise).<br>
     * Approach: Juggle the elements, 'hcf(n,k)' times.<br>
     * Time = O(n)<br>
     * Space = O(1)<br>
     */
    public static int[] rotateLeftByJuggling(int[] a, int k) {
        int i, j, d, temp, n = a.length, hcf = Formulas.hcf(k, n);
        for (i = 0; i < hcf; i++)
        {
            temp = a[i];
            j = i;
            while (true)
            {
                d = j + k;
                if (d >= n)
                    d = d - n;
                d = d%n; // this is required to prevent overflow
                if (d == i)
                    break;
                a[j] = a[d];
                j = d;
            }
            a[j] = temp;
        }
        return a;
    }

    /**
     * Problem: Rotate array of size 'n' by 'k' positions, leftwards (counter-clockwise).<br>
     * Approach: Reverse 0->k elements, then reverse k+1->n elements, finally reverse the whole array.<br>
     * Time = O(n) <-- Traversal upto 'n', 3 times.<br>
     * Space = O(1)<br>
     */
    public static int[] rotateLeftByReversal(int[] a, int k) {
        if (k >= a.length) {
            k = k%a.length;
        }
        a = reverse(a, 0, k-1);
        a = reverse(a, k, a.length-1);
        a = reverse(a, 0, a.length-1);
        return a;
    }

    /**
     * Problem: Rotate array of size 'n' by 'k' positions, rightwards (clockwise).<br>
     * Approach: Reverse the array, then reverse k+1->n elements, finally reverse 0->k elements.<br>
     * Time = O(n) <-- Traversal upto 'n', 3 times.<br>
     * Space = O(1)<br>
     */
    public static int[] rotateRightByReversal(int[] a, int k) {
        if (k >= a.length) {
            k = k%a.length;
        }
        a = reverse(a, 0, a.length-1);
        a = reverse(a, k, a.length-1);
        a = reverse(a, 0, k-1);
        return a;
    }

    public static int[] reverse(int[] a, int start, int end) {
        while (start < end) {
            int temp = a[start];
            a[start] = a[end];
            a[end] = temp;
            start++;
            end--;
        }
        return a;
    }
}
