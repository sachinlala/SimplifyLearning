package com.sl.algorithms.linear.array;

import com.sl.algorithms.core.maths.Formulas;

/**
 * <a href="https://leetcode.com/problems/missing-number/description/">Reference Problem</a>
 * <br>Variants: <br>- sorted array<br>- un-sorted but one number missing only; <br>- un-sorted and we need to find the first missing number etc.<br>
 */
public class MissingNumber {

    MissingNumber() {
        /**
         * This is a utility class.<br>
         */
    }

    public static int findSmallestMissingNumberSorted(int[] arr) {
        if (arr == null || arr.length == 0) return 0;
        int start=0, end=arr.length-1;
        return findSmallestMissingNumberSorted(arr, start, end); // arms-length recursion
    }

    /**
     * O(logN) time & O(1) space.<br>
     * Limitation: cannot handle duplicates
     */
    private static int findSmallestMissingNumberSorted(int[] arr, int start, int end) {
        if (start > end) return ++end; // when missing number > highest number in array e.g. [0,1,2,3,4,5]
        if (arr[start] != start) return start;
        int mid = Formulas.midPoint(start, end);
        if (arr[mid]-arr[start] != (mid-start)) return findSmallestMissingNumberSorted(arr, start, mid);
        return findSmallestMissingNumberSorted(arr, mid+1, end);
    }

    /**
     * O(n) time & O(1) space.<br>
     * Limitation: cannot handle duplicates
     */
    public static int findSmallestMissingNumberSortedXOR(int[] arr) {
        if (arr == null || arr.length == 0) return 0;
        int xor = arr.length;
        for (int i=0; i<arr.length; i++) {
            xor ^=  arr[i] ^ i;
        }
        return xor;
    }

    /**
     * <a href="https://leetcode.com/problems/first-missing-positive/description/">First Missing Positive</a><br>
     * <br>O(n) time & O(1) space.<br>
     * <br>Phase-1: <br>- counting sort to ensure the values which are present are at their rightful index e.g. 3 is at 3; <br>- Phase-2: detect mis-match => missing-number.<br>
     * <br>Usefulness: can handle duplicates and space is constant.<br>
     */
    public static int findSmallestMissingNumberUnsorted(int[] arr) {
        if (arr == null || arr.length == 0) return 1;
        int i=0, j=1, n=arr.length;
        while (i<n) {//sort
            if (arr[i] > 0 && arr[i] < n && arr[i] != arr[arr[i]]) {
                int temp = arr[i];
                arr[i] = arr[temp];
                arr[temp] = temp;
            } else {
                i++;
            }
        }
        while (j<n) {//compare
            if (arr[j] != j) {
                return j;
            }
            j++;
        }
        if (arr[0] == j) {//final check
            return j+1;
        }
        return j;
    }
}