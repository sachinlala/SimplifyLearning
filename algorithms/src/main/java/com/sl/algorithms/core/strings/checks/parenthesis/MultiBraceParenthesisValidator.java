package com.sl.algorithms.core.strings.checks.parenthesis;

import com.sl.algorithms.core.interfaces.strings.checks.ParenthesisValidator;
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashMap;
import java.util.Map;

public class MultiBraceParenthesisValidator implements ParenthesisValidator {

  private static Map<Character, Character> bracesMap = new HashMap<>();

  static {
    bracesMap.put('(', ')');
    bracesMap.put('{', '}');
    bracesMap.put('[', ']');
  }

  /**
   * <br>Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if
   * the input string is valid.<br> <br>The brackets must close in the correct order, "()" and
   * "()[]{}" are all valid but "(]" and "([)]" are not.<br> <br>Solve in O(n) time and O(n)
   * space.<br>
   */
  public boolean isValidParenthesis(String s) {
    if (isEmptyOrNull(s)) {
      return false;
    }
    Deque<Character> stack = new ArrayDeque<>();
    for (char c : s.toCharArray()) {
      if (stack.isEmpty()) {
        stack.push(c);
        continue;
      }
      Character charInMap = bracesMap.get(stack.peek());
      if (charInMap != null && c == charInMap) {
        stack.pop();
      } else {
        stack.push(c);
      }
    }
    return stack.isEmpty();
  }
}
