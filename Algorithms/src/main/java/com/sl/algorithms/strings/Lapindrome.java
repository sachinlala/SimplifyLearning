package com.sl.algorithms.strings;

import java.util.Scanner;

public class Lapindrome {
    // O(n)
    public static boolean isLapindrome(String str) {
        // base conditions
        if (str == null || str.length() == 0) {
            return false;
        }
        if (str.length() == 1 || str.length() == 1) {
            return true;
        }
        // main algo
        int[] charSet = new int[26];
        char[] strArr = str.toCharArray();
        int midIndex = strArr.length/2;
        int skipIndex = 0;
        if (strArr.length % 2 == 1) {
            skipIndex = midIndex;
        }
        for (int i=0; i<midIndex; i++) {
            int charIndex = strArr[i] - 'a';
            charSet[charIndex]++;
        }
        for (int i=strArr.length-1; i>=midIndex; i--) {
            int charIndex = strArr[i] - 'a';
            charSet[charIndex]--;
            if (charSet[charIndex] < 0 && i != skipIndex) {
                return false;
            }
        }
        return true;
    }

    public static void main(String[] args) {
        Scanner s = new Scanner(System.in);
        int testCount = s.nextInt();
        while (testCount --> 0) {
            String str = s.next();
            System.out.println((isLapindrome(str)) ? "YES" : "NO");
        }
        return;
    }
}