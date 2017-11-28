package com.sl.algorithms.strings;

import java.util.ArrayDeque;
import java.util.Deque;

public class StringOps {

    private StringOps() {
        /**
         * This is a utility class.<br>
         */
    }

    /**
     * <a href="Decode String">http://www.geeksforgeeks.org/decode-string-recursively-encoded-count-followed-substring/</a>
     */
    public static String decode(String str) {
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
                    count = 10 * count + (c - '0');
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
