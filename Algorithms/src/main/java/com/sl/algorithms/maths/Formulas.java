package com.sl.algorithms.maths;

public final class Formulas {
    /**
     * Find mid-point between 2 numbers; prevent integer overflow.
     */
    public static int midPoint(int start, int end) {
        int mid = start + (end-start)/2;
        return mid;
    }

    // O(n^1/2)
    public static boolean isPrimeNumber(long n) {
        if (n <= 1) {
            return false;
        }
        if (n <= 3) {
            return true;
        }
        if (n % 2 == 0 || n % 3 == 0) {
            return false;
        }
        for (long i = 5; i * i <= n; ) {
            if (n % i == 0 || n % (i + 2) == 0) {
                return false;
            }
            i += 6; //every prime number is of the form 6k+i
        }
        return true;
    }

    public static int hcf(int a, int b) {
        if (b == 0 && a == 0) {
            return -1; /* invalid input */
        }
        if (b == 0) {
            return a;
        }
        if (a == 0) {
            return b;
        }
        return hcf(b, a % b);
    }

}
