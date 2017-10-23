package com.sl.algorithms.maths;

public class Formulas {
    public static int hcf(int a, int b) {
        if (b == 0 && a == 0) { return -1; /* invalid input */ }
        if (b == 0) { return a; }
        if (a == 0) { return b; }
        return hcf(b, a%b);
    }
}
