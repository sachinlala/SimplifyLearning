package com.sl.algorithms.core;

import com.sl.algorithms.core.maths.Formulas;

import static com.sl.algorithms.core.ArrayOps.reverse;

/**
 * <br>Problem: Rotate array of size 'n' by 'k' positions, leftwards (counter-clockwise).<br>
 * <br><a href="https://eli.thegreenplace.net/2008/08/29/space-efficient-list-rotation">Reference</a>
*/
public class ArrayRotation {
    private ArrayRotation() {
        /**
         * This is a utility class.<br>
         */
    }
}

class BruteForceRotation {
    // O(kn) time and O(1) space
    public static int[] rotateLeft(int a[], int k) {
        for (int i = 0; i < k; i++) {
            int j = 0;
            int temp = a[j];
            for (; j < a.length - 1; j++) { // leave last element to be assigned with the staged value (temp)
                a[j] = a[j + 1];
            }
            a[j] = temp;
        }
        return a;
    }

    // O(kn) time and O(1) space
    public static int[] rotateRight(int a[], int k) {
        for (int i = 0; i < k; i++) {
            int j = a.length - 1;
            int temp = a[j];
            for (; j > 0; j--) { // leave last element to be assigned with the staged value (temp)
                a[j] = a[j - 1];
            }
            a[j] = temp;
        }
        return a;
    }

    // O(n) time and O(n) space
    public static int[] rotateLeftWithSpace(int a[], int k) {
        int n = a.length;
        int[] b = new int[n]; // this is the bottleneck
        k = k%n;
        for(int i=0; i<n; i++) {
            if (i-k < 0){
                b[i-k+n] = a[i];
            } else {
                b[i-k] = a[i];
            }
        }
        return b;
    }
}

/**
 * <br><a href="https://en.wikipedia.org/wiki/Douglas_McIlroy">Doug McIlroy</a><br>
 * <br><b>Left Rotation</b>: Flip Left Hand -> Flip Right Hand -> Flip Both Hands <br>
 * <br><b>Right Rotation</b>: Flip Both Hands -> Flip Right Hand -> Flip Left Hand <br>
 */
class DougMcIlroyAlgorithm {
    // O(n) time and O(1) space
    public static int[] rotate(int[] a, int k, boolean rotateLeft) {
        if (k >= a.length) {
            k = k % a.length;
        }
        if (rotateLeft) {
            a = reverse(a, 0, k - 1);
            a = reverse(a, k, a.length - 1);
            a = reverse(a, 0, a.length - 1);
        } else {
            a = reverse(a, 0, a.length - 1);
            a = reverse(a, k, a.length - 1);
            a = reverse(a, 0, k - 1);
        }
        return a;
    }

    public static int[] rotateLeftByReversal(int[] a, int k) {
        return rotate(a, k, true);
    }

    public static int[] rotateRightByReversal(int[] a, int k) {
        return rotate(a, k, false);
    }
}

/**
 * <br><a href="https://en.wikipedia.org/wiki/Jon_Bentley_(computer_scientist)">Jon Bentley</a><br>
 */
class BentleyShufflingAlgorithm {
    // O(n) time and O(1) space
    public static int[] rotateLeftByJuggling(int[] a, int k) {
        int n = a.length;
        int hcf = Formulas.hcf(n, k);
        int i, j, temp, delta;
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

/**
 * <a href="http://www.drdobbs.com/parallel/benchmarking-block-swapping-algorithms/232900395?pgno=2">Gries-Mills Block-Swap Algorithm</a>
 */
class GriesMillsAlgorithm {

    /**
     * Swap 'n' elements starting at index 'i1' with 'n' elements starting at index 'i2'.<br>
     */
    private static int[] swapInBlocks(int[] a, int i1, int i2, int n) {
        for (int i=0; i<n; i++) {
            int temp = a[i1+i];
            a[i1+i] = a[i2+i];
            a[i2+i] = temp;
        }
        return a;
    }

    // O(n) time and O(1) space
    public static int[] rotateLeftBlockSwap(int[] a, int k) {
        int n = a.length;
        k = k%n;
        if (k == 0) {
            return a;
        }
        int i=k, j=n-k;
        while (i != j) {
            if (i < j) {
                a = swapInBlocks(a, k-i, k+j-i, i);
                j -= i;
            } else {
                a = swapInBlocks(a, k-i, k, j);
                i -= j;
            }
        }
        a = swapInBlocks(a, k-i, k, i);
        return a;
    }
}