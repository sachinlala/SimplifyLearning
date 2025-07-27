package com.sl.algorithms.core.array.count;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

public class CountNegativesInMatrixTest extends CountNegativesInMatrix {

  @Test
  public void testFindNegativeCountMix() {
    int[][] matrix =
        {{-3, -2, 1},
            {-2, 1, 2},
            {1, 3, 4}};
    assertEquals(3, countNegatives(matrix));
  }

  @Test
  public void testFindNegativeCountAllNegative() {
    int[][] matrix =
        {{-5, -4, -3},
            {-4, -3, -2},
            {-3, -2, -1}};
    assertEquals(9, countNegatives(matrix));
  }

  @Test
  public void testFindNegativeCountAllPositive() {
    int[][] matrix =
        {{1, 2, 3},
            {2, 3, 4},
            {3, 4, 5}};
    assertEquals(0, countNegatives(matrix));
  }

  @Test
  public void testFindNegativeCountHasZeroes() {
    int[][] matrix =
        {{-3, -2, 0},
            {-2, 0, 2},
            {0, 3, 4}};
    assertEquals(3, countNegatives(matrix));
  }

  @Test
  public void testFindNegativeCountRectangle() {
    int[][] matrix =
        {{-3, -2, -1, 1},
            {-2, 2, 3, 4},
            {4, 5, 7, 8}};
    assertEquals(4, countNegatives(matrix));
  }
}
