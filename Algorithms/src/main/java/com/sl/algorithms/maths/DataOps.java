package com.sl.algorithms.maths;

public class DataOps {

    private DataOps() {
        /**
         * This is a utility class.<br>
         */
    }

    // handle overflow while reversing a given integer
    public static int reverse(int x) {
        long reverse = 0;
        while (x != 0) {
            reverse = reverse * 10 + x % 10;
            if (reverse > Integer.MAX_VALUE || reverse < Integer.MIN_VALUE) {
                return 0;
            }
            x = x / 10;
        }
        return (int) reverse;
    }

    /**
     * <br>Convert a given string to integer.<br>
     * <br>1. Validate that the string only contains digits or (, +, -) signs.
     * <br>2. If the string starts with '.' then it is immaterial value; break wherever '.' is encountered.
     * <br>3. Ignore leading spaces.
     * <br>4. Handle overflow.
     * <br>5. Honor sign ('-' or '+'/empty).
     */
    public static int atoi(String str) {
        if (str == null || str.length() == 0) {
            return 0;
        }
        if (str.startsWith(".")) {
            return 0;
        }
        long intValue = 0;
        int index = 0;
        boolean isNegative = false;
        // ignore leading spaces
        while (index < str.length() && str.charAt(index) == ' ') {
            index++;
        }
        // check sign
        if (index < str.length() && (str.charAt(index) == '-' || str.charAt(index) == '+')) {
            isNegative = (str.charAt(index) == '-');
            index++;
        }
        while (index < str.length()) {
            char c = str.charAt(index);
            int digit = c - '0';
            // validate
            if (digit < 0 || digit > 9) { // all digits are in the range of 48->57
                break;
            }
            // compute value
            intValue = intValue * 10 + digit;
            // handle overflow
            if (intValue > Integer.MAX_VALUE) {
                intValue = isNegative ? Integer.MIN_VALUE : Integer.MAX_VALUE;
                break;
            }
            index++;
        }
        if (isNegative) {
            intValue *= -1;
        }
        return (int) intValue;
    }
}
