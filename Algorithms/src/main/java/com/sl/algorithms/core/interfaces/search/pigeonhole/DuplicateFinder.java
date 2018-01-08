package com.sl.algorithms.core.interfaces.search.pigeonhole;

public interface DuplicateFinder {
    String NO_DUPLICATES_FOUND = "No duplicates found";
    String ARRAY_IS_NULL_EMPTY_SIZE_1 = "Array is null/empty/size=1";

    /**
     * <br><a href="https://leetcode.com/problems/find-the-duplicate-number/">Problem Reference</a><br>
     * <br><u>Requirements</u>:
     * <br>1. solve without modifying the original array, else sort and detect would be OK to go with.
     * <br>2. solve without any additional space, else hash-set add & contains-check would be OK to go with.
     */
    int findDuplicate(int[] numbers);

    default void nullCheck(int[] nums) {
        if (nums == null || nums.length <= 1) throw new IllegalArgumentException(ARRAY_IS_NULL_EMPTY_SIZE_1);
    }
}
