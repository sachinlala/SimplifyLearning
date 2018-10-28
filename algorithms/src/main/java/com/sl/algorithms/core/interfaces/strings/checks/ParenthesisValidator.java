package com.sl.algorithms.core.interfaces.strings.checks;

public interface ParenthesisValidator {

  boolean isValidParenthesis(String str);

  default boolean isEmptyOrNull(String str) {
    if (str == null || str.length() == 0) {
      return true;
    }
    return false;
  }

  enum ParenthesisEnum {
    OPEN('('),
    CLOSE(')'),
    WILDCHAR('*');

    private char expr;

    ParenthesisEnum(char _expr) {
      expr = _expr;
    }

    public char getExpr() {
      return expr;
    }
  }

}
