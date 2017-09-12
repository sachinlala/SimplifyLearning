package com.sl.algorithms.search;

public final class BinarySearch {

    public static final int NUMBER_NOT_FOUND = -1;

    public static int findIndex(int[] sortedInput, int numberToSearch) {
        return findRecursively(sortedInput, numberToSearch, 0, sortedInput.length - 1);
    }

    private static int findRecursively(int[] sortedInput, int numberToSearch, int start, int end) {
        if (start > end) {
            return NUMBER_NOT_FOUND;
        }
        int index = (start + end) / 2;
        if (sortedInput[index] == numberToSearch) {
            return index;
        }
        if (sortedInput[index] > numberToSearch) {
            return findRecursively(sortedInput, numberToSearch, start, index - 1);
        } else {
            return findRecursively(sortedInput, numberToSearch, index + 1, end);
        }
    }
}
