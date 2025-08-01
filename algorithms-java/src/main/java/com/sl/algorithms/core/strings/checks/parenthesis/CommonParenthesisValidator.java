package com.sl.algorithms.core.strings.checks.parenthesis;

import static com.sl.algorithms.core.interfaces.strings.checks.ParenthesisValidator.ParenthesisEnum.CLOSE;
import static com.sl.algorithms.core.interfaces.strings.checks.ParenthesisValidator.ParenthesisEnum.OPEN;

import com.sl.algorithms.core.interfaces.strings.checks.ParenthesisValidator;

/**
 * <br>Most common parenthesis validator e.g. an essential check in all code editors !<br>
 */
public class CommonParenthesisValidator implements ParenthesisValidator {

  /**
   * <br> O(n) time and O(1) space. <br>
   */
  @Override
  public boolean isValidParenthesis(String str) {
    if (isEmptyOrNull(str)) {
      return true;
    }
    int counter = 0;
    for (char c : str.toCharArray()) {
      if (c == OPEN.getExpr()) {
        ++counter;
      }
      if (c == CLOSE.getExpr()) {
        --counter;
      }
      if (counter < 0) {
        return false; // too many CLOSE
      }
    }
    return (counter == 0);
  }
}
