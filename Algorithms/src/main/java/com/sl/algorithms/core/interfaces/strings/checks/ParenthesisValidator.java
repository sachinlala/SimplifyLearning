package com.sl.algorithms.core.interfaces.strings.checks;

//TODO : revise
public interface ParenthesisValidator {

    char OPEN = '(';
    char CLOSE = ')';
    char WILDCHAR = '*';

    boolean isValidParenthesis(String str);

    default boolean isEmptyOrNull(String str) {
        if (str == null || str.length() == 0) return true;
        return false;
    }
}
