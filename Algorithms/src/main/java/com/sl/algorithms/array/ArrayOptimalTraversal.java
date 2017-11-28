package com.sl.algorithms.array;

public class ArrayOptimalTraversal {

    private ArrayOptimalTraversal() {
        /**
         * This is a utility class.<br>
         */
    }

    // O(n) time and O(1) space
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

