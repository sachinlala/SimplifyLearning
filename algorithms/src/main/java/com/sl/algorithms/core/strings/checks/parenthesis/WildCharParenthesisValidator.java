package com.sl.algorithms.core.strings.checks.parenthesis;

import static com.sl.algorithms.core.interfaces.strings.checks.ParenthesisValidator.ParenthesisEnum.CLOSE;
import static com.sl.algorithms.core.interfaces.strings.checks.ParenthesisValidator.ParenthesisEnum.OPEN;
import static com.sl.algorithms.core.interfaces.strings.checks.ParenthesisValidator.ParenthesisEnum.WILDCHAR;

import com.sl.algorithms.core.interfaces.strings.checks.ParenthesisValidator;

/**
 * <u>Validations</u>: <ul> <li>Any left parenthesis '(' must have a corresponding right parenthesis
 * ')'</li> <li>Any right parenthesis ')' must have a corresponding left parenthesis '('</li>
 * <li>Left parenthesis '(' must go before the corresponding right parenthesis ')'</li> <li>'*'
 * could be treated as a single right parenthesis ')' or a single left parenthesis '(' or an empty
 * string</li> <li>An empty string is also valid.</li> </ul>
 */
public class WildCharParenthesisValidator implements ParenthesisValidator {

  /**
   * Solve in O(n) time and O(1) space.<br>
   *
   * @param str contains '(', ')' and '*' characters only.
   * @return true, if input string adheres to the stated parenthesis rules.
   */
  @Override
  public boolean isValidParenthesis(String str) {
    if (isEmptyOrNull(str)) {
      return true;
    }
    int counter = 0;
    int maxCounter = 0;
    for (char c : str.toCharArray()) {
      if (c == OPEN.getExpr()) {
        ++counter;
        ++maxCounter;
      }
      if (c == CLOSE.getExpr()) {
        if (counter > 0) {
          --counter;
        }
        --maxCounter;
      }
      if (c == WILDCHAR.getExpr()) {
        if (counter > 0) {
          --counter;
        }
        ++maxCounter;
      }
      if (maxCounter < 0) {
        return false; // too many CLOSE
      }
    }
    return (counter == 0);
  }
}
