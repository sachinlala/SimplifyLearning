package com.sl.algorithms.arrays;

public class ArrayOps {

    // O(n) time and O(n) space
    public static int[] plusOne(int[] digits) {
        if (digits == null || digits.length == 0) {
            return digits;
        }
        int length = digits.length;
        boolean addOne = true;
        int numberToAdd = 1;
        for (int i=length-1; i>=0; i--) {
            if (addOne) {
                digits[i] += numberToAdd;
            }
            if (digits[i] > 9) {
                digits[i] = digits[i]%10;
                addOne = true;
            } else {
                addOne = false;
            }
        }
        if (addOne) {
            int[] plusOneNumber = new int[length+1];
            plusOneNumber[0] = numberToAdd;
            return plusOneNumber;
        }
        return digits;
    }
}
