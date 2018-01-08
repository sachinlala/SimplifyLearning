package com.sl.algorithms.core.interfaces.base;

public interface BaseInterface<T extends Comparable> {

    String ARRAY_IS_EMPTY = "Array is empty";
    String DATA_TYPE_NOT_SUPPORTED_YET = "Input has data-type which is not supported yet";

    default void objChecks(T[] objects) {
        if (objects == null || objects.length == 0) throw new IllegalArgumentException(ARRAY_IS_EMPTY);
        if (!(objects instanceof Integer[] || objects instanceof String[])) {
            throw new IllegalArgumentException(DATA_TYPE_NOT_SUPPORTED_YET);
        }
    }

    default void intNullChecks(int[] nums) {
        if (nums == null || nums.length == 0) throw new IllegalArgumentException(ARRAY_IS_EMPTY);
    }
}
