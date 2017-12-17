package com.sl.algorithms.linear;

import org.junit.Assert;
import org.junit.Test;

import static com.sl.algorithms.core.linear.ArrayOps.printArray;
import static com.sl.algorithms.linear.BentleyShufflingAlgorithm.*;

public class BentleyShufflingAlgorithmTest {
    @Test
    public void testRotationLeftByJuggling() {
        Assert.assertEquals("[2,3,4,5,1]", printArray(rotateLeftByJuggling(new int[]{1, 2, 3, 4, 5}, 1)));
        Assert.assertEquals("[3,4,5,1,2]", printArray(rotateLeftByJuggling(new int[]{1, 2, 3, 4, 5}, 2)));
        Assert.assertEquals("[4,5,1,2,3]", printArray(rotateLeftByJuggling(new int[]{1, 2, 3, 4, 5}, 3)));
        Assert.assertEquals("[5,1,2,3,4]", printArray(rotateLeftByJuggling(new int[]{1, 2, 3, 4, 5}, 4)));
        Assert.assertEquals("[1,2,3,4,5]", printArray(rotateLeftByJuggling(new int[]{1, 2, 3, 4, 5}, 5)));
        Assert.assertEquals("[2,3,4,5,1]", printArray(rotateLeftByJuggling(new int[]{1, 2, 3, 4, 5}, 6)));
        Assert.assertEquals("[3,4,5,1,2]", printArray(rotateLeftByJuggling(new int[]{1, 2, 3, 4, 5}, 7)));
        Assert.assertEquals("[3,4,1,2]", printArray(rotateLeftByJuggling(new int[]{1, 2, 3, 4}, 2)));
    }
}
