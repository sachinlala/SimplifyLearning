package com.sl.algorithms.matrix;

public class MatrixTraversal {

    private MatrixTraversal() {
        /**
         * This is a utility class.<br>
         */
    }

    public static int findNegativeCount(int[][] nums) {
        int negativeCount = 0;
        int columnUpperBound = 0;
        for (int i=0; i<nums.length; i++) {
            int rowLength = nums[i].length;
            if (columnUpperBound == 0) {
                columnUpperBound = rowLength-1;
            }
            for (int j=columnUpperBound; j>=0; j--) {
                if (nums[i][j] < 0) { // pause the iteration (row & column)
                    negativeCount += (j+1);
                    columnUpperBound = j;
                    break;
                }
            }
        }
        return negativeCount;
    }
}
