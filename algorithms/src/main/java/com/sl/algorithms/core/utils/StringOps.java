package com.sl.algorithms.core.utils;

import com.sl.algorithms.core.interfaces.base.Constants;
import java.util.ArrayList;
import java.util.List;

public class StringOps implements Constants {

  StringOps() {
    /**
     * This is a utility class.<br>
     */
  }

  /**
   * <br>Convert a given string to integer.<br> <br>1. Validate that the string only contains digits
   * or (, +, -) signs. <br>2. If the string starts with '.' then it is immaterial value; break
   * wherever '.' is encountered. <br>3. Ignore leading spaces. <br>4. Handle overflow. <br>5. Honor
   * sign ('-' or '+'/empty).
   *
   * @param str input string
   * @return output integer
   */
  public static int atoi(String str) {
    if (str == null || str.length() == 0) {
      return 0;
    }
    if (str.startsWith(".")) {
      return 0;
    }
    long intValue = 0;
    int index = 0;
    boolean isNegative = false;
    // ignore leading spaces
    while (index < str.length() && str.charAt(index) == ' ') {
      index++;
    }
    // check sign
    if (index < str.length() && (str.charAt(index) == '-' || str.charAt(index) == '+')) {
      isNegative = (str.charAt(index) == '-');
      index++;
    }
    while (index < str.length()) {
      char c = str.charAt(index);
      int digit = c - '0';
      // validate
      if (digit < 0 || digit > 9) { // all digits are in the range of 48->57
        break;
      }
      // compute value
      intValue = intValue * DECIMAL_RADIX + digit;
      // handle overflow
      if (intValue > Integer.MAX_VALUE) {
        intValue = isNegative ? Integer.MIN_VALUE : Integer.MAX_VALUE;
        break;
      }
      index++;
    }
    if (isNegative) {
      intValue *= -1;
    }
    return (int) intValue;
  }

  /**
   * <br>Print all case-sensitive permutations of a string, without changing the positions of any
   * characters.<br> <br><a href="https://leetcode.com/problems/letter-case-permutation/description/">Problem
   * Reference</a><br>
   *
   * @param s string to introspect
   * @return List of permutations, including the string itself
   */
  public static List<String> findPermutations(String s) {
    List<String> outputList = new ArrayList<>();
    if (s == null || s.length() == 0) {
      return outputList;
    }
    int charCount = getCharCount(s);
    if (charCount == 0) {
      outputList.add(s);
      return outputList;
    }
    int max = 1 << charCount; // 2 raised to the power of charCount
    for (int i = 0; i < max; i++) {
      int j = 0;
      StringBuilder word = new StringBuilder();
      for (char c : s.toCharArray()) {
        if (Character.isLetter(c)) {
          if (isBitSet(i, j++)) {
            word.append(Character.toLowerCase(c));
          } else {
            word.append(Character.toUpperCase(c));
          }
        } else {
          word.append(c);
        }
      }
      outputList.add(word.toString());
    }
    return outputList;
  }

  public static boolean isBitSet(int n, int offset) {
    return ((n >> offset) & 1) == 1;
  }

  private static int getCharCount(String s) {
    int charCount = 0;
    for (char c : s.toCharArray()) {
      if (Character.isLetter(c)) {
        charCount++;
      }
    }
    return charCount;
  }
}
