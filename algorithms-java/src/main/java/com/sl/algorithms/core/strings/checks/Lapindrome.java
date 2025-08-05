package com.sl.algorithms.core.strings.checks;

import com.sl.algorithms.core.interfaces.strings.checks.CharSymmetryChecker;

public class Lapindrome implements CharSymmetryChecker {

  // O(n)
  @Override
  public boolean isLapindrome(String str) {
    // base conditions
    if (str == null || str.length() == 0) {
      return false;
    }
    if (str.length() == 1) {
      return true;
    }
    // main algo
    int[] charSet = new int[26];
    int midIndex = str.length() / 2;
    int skipIndex = 0;
    if (str.length() % 2 == 1) {
      skipIndex = midIndex;
    }
    for (int i = 0; i < midIndex; i++) {
      charSet[str.charAt(i) - 'a']++;
    }
    for (int i = str.length() - 1; i >= midIndex; i--) {
      int charIndex = str.charAt(i) - 'a';
      charSet[charIndex]--;
      if (charSet[charIndex] < 0 && i != skipIndex) {
        return false;
      }
    }
    return true;
  }
}
