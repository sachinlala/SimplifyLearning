package com.sl.algorithms.core.strings.codec;

import com.sl.algorithms.core.interfaces.base.Constants;
import com.sl.algorithms.core.interfaces.strings.codec.Decoder;
import java.util.ArrayDeque;
import java.util.Deque;

/**
 * <a href="https://leetcode.com/problems/decode-string/description/">Decode String</a>
 */
public class Codec implements Decoder, Constants {

  @Override
  public String decode(String str) {
    if (str == null || str.length() == 0) {
      return str;
    }
    StringBuilder result = new StringBuilder();
    Deque<Integer> countStack = new ArrayDeque<>();
    Deque<StringBuilder> resultStack = new ArrayDeque<>();
    for (int i = 0; i < str.length(); ) {
      char c = str.charAt(i);
      if (c >= '0' && c <= '9') {
        int count = 0;
        while (c >= '0' && c <= '9') {
          count = DECIMAL_RADIX * count + (c - '0');
          c = str.charAt(++i);
        }
        countStack.push(count);
      } else {
        if (c == '[') {
          resultStack.push(result);
          result = new StringBuilder();
        } else if (c == ']') {
          StringBuilder tempBuilder = new StringBuilder();
          if (!resultStack.isEmpty()) {
            tempBuilder.append(resultStack.pop());
          }
          int multiplier = countStack.pop();
          for (int j = 0; j < multiplier; j++) {
            tempBuilder.append(result);
          }
          result = tempBuilder;
        } else {
          result.append(c);
        }
        i++;
      }
    }
    return result.toString();
  }
}
