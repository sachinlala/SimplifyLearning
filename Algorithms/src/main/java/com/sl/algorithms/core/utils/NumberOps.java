package com.sl.algorithms.core.utils;

import com.sl.algorithms.core.baseObj.Constants;
import com.sl.algorithms.core.baseObj.ListNode;

import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Deque;

import static com.sl.algorithms.core.utils.Formulas.raiseTo;

public class NumberOps implements Constants {

    NumberOps() {
        /**
         * This is a utility class.<br>
         */
    }

    public static int countDigits(int n) {
        int count = 0;
        if (n < 0) n *= -1;
        if (n < DECIMAL_RADIX) return 1;
        for (int i = n; i > 0; i = i / DECIMAL_RADIX) count++;
        return count;
    }

    // handle overflow while reversing a given integer
    public static int reverse(int n) {
        long r = 0;
        while (n != 0) {
            r = r * DECIMAL_RADIX + n % DECIMAL_RADIX;
            if (r > Integer.MAX_VALUE || r < Integer.MIN_VALUE) return 0;
            n /= DECIMAL_RADIX;
        }
        return (int) r;
    }

    // n>=0
    public static int[] convertToArray(int n) {
        int length = countDigits(n);
        int[] digits = new int[length];
        Arrays.fill(digits, 0);
        int index = length - 1;
        for (int i = n; i > 0; i /= DECIMAL_RADIX) {
            digits[index--] = i % DECIMAL_RADIX;
        }
        return digits;
    }

    // n>=0 and 32-bit
    public static int convertToNumber(int[] a) {
        long n = 0;
        for (int digit : a) {
            n = n * DECIMAL_RADIX + digit;
        }
        if (n > Integer.MAX_VALUE) {
            return -1;
        }
        return (int) n;
    }

    // n>=0 and 32-bit
    public static int convertToNumber(ListNode<Integer> list) {
        long n = 0;
        ListNode<Integer> ptr = list;
        while (ptr != null) {
            n = n * DECIMAL_RADIX + ptr.data;
            ptr = ptr.next;
        }
        if (n > Integer.MAX_VALUE) {
            return -1;
        }
        return (int) n;
    }

    // n>=0 and 32-bit
    public static int convertToNumberUsingPower(int[] a) {
        long n = 0;
        int length = a.length;
        for (int i = length - 1; i >= 0; i--) {
            long update = raiseTo(DECIMAL_RADIX, length - i - 1);
            n += update * a[i];
        }
        if (n > Integer.MAX_VALUE) {
            return -1;
        }
        return (int) n;
    }

    // Sieve of Eratosthenes: O(nlog(log(n))
    public static int countPrimes(int n) {
        if (n < 2) return 0;
        int primeCount = 0;
        boolean[] isPrime = new boolean[n];
        for (int i = 2; i < n; i++) {
            isPrime[i] = true;
            primeCount++;
        }
        for (int i = 2; i * i < n; i++) {
            if (!isPrime[i]) continue;
            for (int j = i * i; j < n; j += i) {
                if (isPrime[j]) {
                    isPrime[j] = false;
                    primeCount--;
                }
            }
        }
        return primeCount;
    }

    // n >= 0
    public static String convertToBinary(int decimalNum) {
        if (decimalNum == 0) return "0";
        Deque<Integer> bitStack = new ArrayDeque<>();
        StringBuilder bits = new StringBuilder();
        for (int i = decimalNum; i > 0; i >>= 1) {
            bitStack.push(i % 2);
        }
        while (!bitStack.isEmpty()) {
            bits.append(bitStack.pop());
        }
        return bits.toString();
    }

    // n >= 0
    public static int convertToDecimal(int binaryNum) {
        int result = 0;
        int index = 0;
        for (int i = binaryNum; i > 0; i /= DECIMAL_RADIX) {
            int bit = i % DECIMAL_RADIX;
            result += bit * raiseTo(2, index);
            ++index;
        }
        return result;
    }

    public static int convertToDecimal(String binaryStr) {
        return convertToDecimal(Integer.parseInt(binaryStr));
    }

    // O(n) time and O(n) space
    public static Integer[] plusOne(Integer[] digits) {
        if (digits == null || digits.length == 0) return digits;
        int length = digits.length;
        boolean addOne = true;
        int numberToAdd = 1;
        for (int i = length - 1; i >= 0; i--) {
            if (addOne) digits[i] += numberToAdd;
            if (digits[i] > 9) {
                digits[i] = digits[i] % DECIMAL_RADIX;
                addOne = true;
            } else {
                addOne = false;
            }
        }
        if (addOne) {
            Integer[] plusOneNumber = new Integer[length + 1];
            Arrays.fill(plusOneNumber, 0);
            plusOneNumber[0] = numberToAdd;
            return plusOneNumber;
        }
        return digits;
    }
}