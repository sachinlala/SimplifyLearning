package com.sl.algorithms.search;

import com.sl.algorithms.core.maths.Formulas;

public class BinarySearch {

    public static final int NUMBER_NOT_FOUND = -1;

    private BinarySearch() {
        /**
         * This is a utility class.<br>
         */
    }

    // O(log(n)) time and O(1) space
    public static int findIndexIteratively(int[] sortedInput, int numberToSearch) {
        int start=0, end=sortedInput.length-1;
        while (start <= end) { // the equality check here is KEY!
            int midPoint = Formulas.midPoint(start, end);
            int currValue = sortedInput[midPoint];
            if (currValue == numberToSearch) {
                return midPoint;
            }
            if (currValue > numberToSearch) {
                end = midPoint-1;
            } else {
                start = midPoint+1;
            }
        }
        return NUMBER_NOT_FOUND;
    }

    public static int findIndex(int[] sortedInput, int numberToSearch) {
        return findIndexRecursively(sortedInput, numberToSearch, 0, sortedInput.length - 1);
    }

    // O(log(n)) time and space
    private static int findIndexRecursively(int[] sortedInput, int numberToSearch, int start, int end) {
        if (start > end) {
            return NUMBER_NOT_FOUND;
        }
        int midPoint = Formulas.midPoint(start, end);
        int currValue = sortedInput[midPoint];
        if (currValue == numberToSearch) {
            return midPoint;
        }
        if (currValue > numberToSearch) {
            return findIndexRecursively(sortedInput, numberToSearch, start, midPoint-1);
        } else {
            return findIndexRecursively(sortedInput, numberToSearch, midPoint+1, end);
        }
    }
}
