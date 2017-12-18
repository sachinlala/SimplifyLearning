package com.sl.algorithms.core.linear.array.rotation;

/**
 * <a href="http://www.drdobbs.com/parallel/benchmarking-block-swapping-algorithms/232900395?pgno=2">Gries-Mills Block-Swap Algorithm</a>
 */
public class GriesMillsAlgorithm {

    GriesMillsAlgorithm() {
        /**
         * This is a utility class.<br>
         */
    }

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
