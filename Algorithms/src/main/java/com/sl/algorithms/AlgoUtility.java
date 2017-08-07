package com.sl.algorithms;

/**
 * Utility class to invoke the required Algorithm functions.
 */
public class AlgoUtility {
    public static int binarySearch(int[] sortedInput, int numberToSearch) {
        return BinarySearch.findIndex(sortedInput, numberToSearch);
    }
}
