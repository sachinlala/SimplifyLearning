package com.sl.algorithms.core.linear.array.rotation;

import static com.sl.algorithms.core.linear.array.ArrayOps.reverse;

/**
 * <br><a href="https://en.wikipedia.org/wiki/Douglas_McIlroy">Doug McIlroy</a><br>
 * <br><b>Left Rotation</b>: Flip Left Hand -> Flip Right Hand -> Flip Both Hands <br>
 * <br><b>Right Rotation</b>: Flip Both Hands -> Flip Right Hand -> Flip Left Hand <br>
 */
public class DougMcIlroyAlgorithm {

    DougMcIlroyAlgorithm() {
        /**
         * This is a utility class.<br>
         */
    }

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
