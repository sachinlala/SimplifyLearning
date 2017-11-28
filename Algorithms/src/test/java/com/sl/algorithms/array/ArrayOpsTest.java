package com.sl.algorithms.array;

import org.junit.Assert;
import org.junit.Test;

import static com.sl.algorithms.array.ArrayOps.*;

public class ArrayOpsTest {
    @Test
    public void testReverse() {
        int[] a = {1, 2, 3, 4, 5, 6};
        Assert.assertEquals("[3,2,1,4,5,6]", printArray(reverse(a, 0, 2)));
        Assert.assertEquals("[3,2,1,6,5,4]", printArray(reverse(a, 3, 5)));
        Assert.assertEquals("[4,5,6,1,2,3]", printArray(reverse(a, 0, 5)));
    }
}
