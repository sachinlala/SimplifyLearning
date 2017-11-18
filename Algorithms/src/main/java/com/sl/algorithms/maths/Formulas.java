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
        if (n%2 == 0 || n%3 == 0) {
            return false;
        }
        for (long i=5; i*i<=n; i=i+4) {
            if (n%i==0 || n%(i+2)==0) {
                return false;
            }
        }
        return true;
    }

    // Sieve of Eratosthenes: O(nlog(log(n))
    public static int countPrimes(int n) {
        if (n < 2) {
            return 0;
        }
        int primeCount = 0;
        boolean[] isPrime = new boolean[n];
        for (int i=2; i<n; i++) {
            isPrime[i] = true;
            primeCount++;
        }
        for (int i=2; i*i<n; i++) {
            if (!isPrime[i]) {
                continue;
            }
            for (int j=i*i; j<n; j+=i) {
                if (isPrime[j]) {
                    isPrime[j] = false;
                    primeCount--;
                }
            }
        }
        return primeCount;
    }

    public static int hcf(int a, int b) {
        while (a != 0 && b != 0) {
            // equals can be in either conditions
            if (a < b) {
                b = b-a;
            } else {
                a = a-b;
            }
        }
        return b==0 ? a : b;
    }
}
