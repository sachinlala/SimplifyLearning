package com.sl.algorithms.matrix;

import org.junit.Assert;
import org.junit.Test;

import static com.sl.algorithms.matrix.MatrixTraversal.findNegativeCount;

public class MatrixTraversalTest {

    @Test
    public void testFindNegativeCountMix() {
        int[][] matrix =
                {{-3, -2, 1},
                        {-2, 1, 2},
                        {1, 3, 4}};
        Assert.assertEquals(3, findNegativeCount(matrix));
    }

    @Test
    public void testFindNegativeCountAllNegative() {
        int[][] matrix =
                {{-5, -4, -3},
                        {-4, -3, -2},
                        {-3, -2, -1}};
        Assert.assertEquals(9, findNegativeCount(matrix));
    }

    @Test
    public void testFindNegativeCountAllPositive() {
        int[][] matrix =
                {{1, 2, 3},
                        {2, 3, 4},
                        {3, 4, 5}};
        Assert.assertEquals(0, findNegativeCount(matrix));
    }

    @Test
    public void testFindNegativeCountHasZeroes() {
        int[][] matrix =
                {{-3, -2, 0},
                        {-2, 0, 2},
                        {0, 3, 4}};
        Assert.assertEquals(3, findNegativeCount(matrix));
    }

    @Test
    public void testFindNegativeCountRectangle() {
        int[][] matrix =
                {{-3, -2, -1, 1},
                        {-2, 2, 3, 4},
                        {4, 5, 7, 8}};
        Assert.assertEquals(4, findNegativeCount(matrix));
    }
}
