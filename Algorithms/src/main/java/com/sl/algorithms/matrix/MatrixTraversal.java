package com.sl.algorithms.matrix;

public class MatrixTraversal {

    private MatrixTraversal() {
        /**
         * This is a utility class.<br>
         */
    }

    // O(n+m)
    public static int findNegativeCount(int[][] nums) {
        int negativeCount = 0;
        int i=0, j=nums[0].length-1;
        while (i<nums.length && j>=0) {
            if (nums[i][j] < 0) {
                negativeCount += (j+1);
                i++;
            } else {
                j--;
            }
        }
        return negativeCount;
    }
}
