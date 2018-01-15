package com.sl.algorithms.core.interfaces.base;

import com.sl.algorithms.core.baseObj.Constants;

public interface BaseInterface<T extends Comparable> extends Constants {

    default void objChecks(T[] objects) {
        if (objects == null || objects.length == 0) throw new IllegalArgumentException(ARRAY_IS_EMPTY);
        if (!(objects instanceof Integer[] || objects instanceof String[])) {
            throw new IllegalArgumentException(DATA_TYPE_NOT_SUPPORTED_YET);
        }
    }

    default void intArrayCheck(int[] nums) {
        if (nums == null || nums.length == 0) throw new IllegalArgumentException(ARRAY_IS_EMPTY);
    }
}
