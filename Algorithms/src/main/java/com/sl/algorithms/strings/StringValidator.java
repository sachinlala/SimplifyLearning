package com.sl.algorithms.strings;

import java.util.Stack;

//TODO
public class StringValidator {

    public static final String OPENING_BRACE = "(";
    public static final String CLOSING_BRACE = ")";
    public static final String WILD_CHAR = "*";

    /**
     * <ul>
     *     <li>Any left parenthesis '(' must have a corresponding right parenthesis ')'</li>
     *     <li>Any right parenthesis ')' must have a corresponding left parenthesis '('</li>
     *     <li>Left parenthesis '(' must go before the corresponding right parenthesis ')'</li>
     *     <li>'*' could be treated as a single right parenthesis ')' or a single left parenthesis '(' or an empty string</li>
     *     <li>An empty string is also valid.</li>
     * </ul>
     * @param str contains {@link #WILD_CHAR}, {@link #OPENING_BRACE} or {@link #CLOSING_BRACE} characters only
     * @return true, if input string adheres to the stated parenthesis rules
     */
    public static boolean isValidParenthesis(String str) {
        if (str == null) {
            return false;
        }
        Stack<String> stack = new Stack<>();
        String[] arr = str.split("");
        for (String s : arr) {
            if (OPENING_BRACE.equals(s) || WILD_CHAR.equals(s)) {
                stack.push(s);
            }
            if (CLOSING_BRACE.equals(s)) {
                String peekResult = stack.peek();
                if (OPENING_BRACE.equals(peekResult)) {
                    stack.pop();
                } else {
                    if (WILD_CHAR.equals(peekResult)) {
                        //TODO
                    }
                    return false;
                }
            }
        }
        return stack.isEmpty();
    }
}
