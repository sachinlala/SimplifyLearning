package com.sl.algorithms.array;

public class ArrayOps {

    private ArrayOps() {
        /**
         * This is a utility class.<br>
         */
    }

    public static String printArray(int[] a) {
        if (a == null || a.length == 0) {
            return "[]";
        }
        StringBuilder output = new StringBuilder("[");
        for (int i = 0; i < a.length - 1; i++) {
            output = output.append(a[i]).append(",");
        }
        output.append(a[a.length - 1]).append("]");
        return output.toString();
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
}
