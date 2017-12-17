package com.sl.algorithms.linear;

import com.sl.algorithms.core.maths.Formulas;

public class MissingNumber {

    private MissingNumber() {
        /**
         * This is a utility class.<br>
         */
    }

    public static int findSmallestMissingNumberSorted(int[] arr) {
        if (arr == null || arr.length == 0) {
            return 0;
        }
        int start=0, end=arr.length-1;
        return findSmallestMissingNumberSorted(arr, start, end); // arms-length recursion
    }

    /**
     * O(logN) time & O(1) space.<br>
     * Limitation: cannot handle duplicates
     */
    private static int findSmallestMissingNumberSorted(int[] arr, int start, int end) {
        if (start > end) {
            return end + 1;
        }
        if (arr[start] != start) {
            return start;
        }
        int mid = Formulas.midPoint(start, end);
        if (arr[mid] - arr[start] != (mid - start)) {
            return findSmallestMissingNumberSorted(arr, start, mid);
        }
        return findSmallestMissingNumberSorted(arr, mid + 1, end);
    }

    /**
     * O(logN) time & O(1) space.<br>
     * Limitation: cannot handle duplicates
     */
    public static int findSmallestMissingNumberSortedXOR(int[] arr) {
        if (arr == null || arr.length == 0) {
            return 0;
        }
        int xor = arr.length;
        System.out.println(xor);
        for (int i=0; i<arr.length; i++) {
            System.out.println(arr[i] + " " + i);
            xor ^=  arr[i] ^ i;
            System.out.println(xor);
        }
        return xor;
    }

    /**
     * O(n) time & O(1) space.<br>
     * Usefulness: can handle duplicates
     */
    public static int findSmallestMissingNumberUnsorted(int[] arr) {
        int i = 0;
        int n = arr.length;
        while (i < n) {
            if (arr[i] > 0 && arr[i] < n && arr[i] != arr[arr[i]]) {
                int temp = arr[i];
                arr[i] = arr[temp];
                arr[temp] = temp;
            } else {
                i++;
            }
        }
        int k = 1;
        while (k < n && arr[k] == k) {
            k++;
        }
        if (n == 0 || k < n) {
            return k;
        }
        if (arr[0] == k) {
            return k + 1;
        }
        return k;
    }
}
