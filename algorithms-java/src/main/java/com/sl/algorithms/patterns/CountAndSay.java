package com.sl.algorithms.patterns;

/**
 * Given a natural number, generate the values for a given row, such that each row represents the
 * count for "each" number in a given number.
 * e.g. if n = 1, rowNumber = 5, the rows generated will be:
 * row-0: 1
 * row-1: 1 1
 * row-2: 2 1
 * row 3: 1 2 1 1
 * row 4: 1 1 1 2 2 1
 * row 5: 3 1 2 2 1 1
 */
public class CountAndSay {

  public static String compute(final int n, final int rowNumber) {
    if (n <= 0 || rowNumber < 0) {
      throw new IllegalArgumentException("Invalid input");
    }
    final StringBuilder result = new StringBuilder();
    if (rowNumber == 0) {
      return result.append(n).toString();
    }
    for (int i = 1; i < rowNumber; i++) {
      int count = 1;
      char prevChar = result.charAt(0);
      for (int j = 1; j < result.length(); j++) {
        if (prevChar == result.charAt(j)) {
          count++;
        } else {
          result.append(count).append(prevChar);
          count = 1;
          prevChar = result.charAt(j);
        }
      }
    }
    return result.toString();
  }
}
