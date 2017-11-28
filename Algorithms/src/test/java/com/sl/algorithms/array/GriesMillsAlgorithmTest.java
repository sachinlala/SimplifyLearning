package com.sl.algorithms.array;

import org.junit.Assert;
import org.junit.Test;

import static com.sl.algorithms.array.ArrayOps.printArray;
import static com.sl.algorithms.array.GriesMillsAlgorithm.*;

public class GriesMillsAlgorithmTest {

    @Test
    public void testRotationBlockSwap() {
        Assert.assertEquals("[2,3,4,5,1]", printArray(rotateLeftBlockSwap(new int[]{1, 2, 3, 4, 5}, 1)));
        Assert.assertEquals("[3,4,5,1,2]", printArray(rotateLeftBlockSwap(new int[]{1, 2, 3, 4, 5}, 2)));
        Assert.assertEquals("[4,5,1,2,3]", printArray(rotateLeftBlockSwap(new int[]{1, 2, 3, 4, 5}, 3)));
        Assert.assertEquals("[5,1,2,3,4]", printArray(rotateLeftBlockSwap(new int[]{1, 2, 3, 4, 5}, 4)));
        Assert.assertEquals("[1,2,3,4,5]", printArray(rotateLeftBlockSwap(new int[]{1, 2, 3, 4, 5}, 5)));
        Assert.assertEquals("[2,3,4,5,1]", printArray(rotateLeftBlockSwap(new int[]{1, 2, 3, 4, 5}, 6)));
    }
}
