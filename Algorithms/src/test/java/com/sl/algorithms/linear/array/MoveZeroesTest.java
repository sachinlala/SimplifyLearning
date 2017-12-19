package com.sl.algorithms.linear.array;

import org.junit.Assert;
import org.junit.Test;

import java.util.Arrays;

public class MoveZeroesTest extends MoveZeroes {

    @Test
    public void testMoveZeroes() {
        int[] nums = {0, 1, 0, 3, 12};
        int[] result = {1, 3, 12, 0, 0};
        Assert.assertTrue(Arrays.equals(result, moveZeroes(nums)));
    }

    @Test
    public void testMoveZeroesOptimal() {
        int[] nums = {0, 1, 0, 3, 12};
        int[] result = {1, 3, 12, 0, 0};
        Assert.assertTrue(Arrays.equals(result, moveZeroesOptimal(nums)));

        nums = new int[]{1, 3, 12};
        result = new int[]{1, 3, 12};
        Assert.assertTrue(Arrays.equals(result, moveZeroes(nums)));
    }
}
