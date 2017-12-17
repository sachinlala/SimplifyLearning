package com.sl.algorithms.strings;

import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashMap;
import java.util.Map;

public class ParenthesisValidator {

    private ParenthesisValidator() {
        /**
         * This is a utility class.<br>
         */
    }

    // O(n) time, O(1) space
    public static boolean isValidParenthesis(String str) {
        if (str == null || str.length() == 0) return true;
        int counter = 0;
        for (char ch : str.toCharArray()) {
            if (ch == '(') counter++;
            else counter--;
            if (counter < 0) return false;
        }
        return (counter == 0);
    }

    /**
     * <ul>
     * <li>Any left parenthesis '(' must have a corresponding right parenthesis ')'</li>
     * <li>Any right parenthesis ')' must have a corresponding left parenthesis '('</li>
     * <li>Left parenthesis '(' must go before the corresponding right parenthesis ')'</li>
     * <li>'*' could be treated as a single right parenthesis ')' or a single left parenthesis '(' or an empty string</li>
     * <li>An empty string is also valid.</li>
     * </ul>
     *
     * @param str contains '(', ')' and '*' characters only.
     * @return true, if input string adheres to the stated parenthesis rules.
     */
    public static boolean isValidParenthesisWildChar(String str) {
        // O(n) time, O(1) space
        if (str == null || str.length() == 0) return true;
        int minimumOpenBraces = 0, maximumOpenBraces = 0;
        for (char c : str.toCharArray()) {
            if (c == '(') {
                minimumOpenBraces++;
                maximumOpenBraces++;
            }
            if (c == ')') {
                if (minimumOpenBraces > 0) {
                    minimumOpenBraces--;
                }
                maximumOpenBraces--;
            }
            if (c == '*') {
                if (minimumOpenBraces > 0) {
                    minimumOpenBraces--;
                }
                maximumOpenBraces++;
            }
            if (maximumOpenBraces < 0) { // too many ')'
                return false;
            }
        }
        return (minimumOpenBraces == 0);
    }

    static Map<Character, Character> PAIRS = new HashMap<>();

    static {
        PAIRS.put('(', ')');
        PAIRS.put('{', '}');
        PAIRS.put('[', ']');
    }

    /**
     * <br>Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.<br>
     * <br>The brackets must close in the correct order, "()" and "()[]{}" are all valid but "(]" and "([)]" are not.<br>
     */
    public static boolean isValidParenthesisPairs(String s) {
        // O(n) time, O(n) space
        if (s == null || s.length() == 0) return false;
        Deque<Character> stack = new ArrayDeque<>();
        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            if (stack.isEmpty()) {
                stack.push(ch);
                continue;
            }
            char prevChar = stack.peek();
            if (PAIRS.get(prevChar) != null && ch == PAIRS.get(prevChar)) {
                stack.pop();
            } else {
                stack.push(ch);
            }
        }
        return stack.isEmpty();
    }
}
