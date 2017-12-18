package com.sl.algorithms.linear.array;

import com.sl.algorithms.core.linear.array.ArrayOps;
import org.junit.Assert;
import org.junit.Test;

public class MoveZeroesTest extends MoveZeroes {

    @Test
    public void testMoveZeroes() {
        int[] nums = {0, 1, 0, 3, 12};
        int[] result = {1, 3, 12, 0, 0};
        Assert.assertTrue(ArrayOps.areEqual(result, moveZeroes(nums)));
    }

    @Test
    public void testMoveZeroesOptimal() {
        int[] nums = {0, 1, 0, 3, 12};
        int[] result = {1, 3, 12, 0, 0};
        Assert.assertTrue(ArrayOps.areEqual(result, moveZeroesOptimal(nums)));
    }
}
