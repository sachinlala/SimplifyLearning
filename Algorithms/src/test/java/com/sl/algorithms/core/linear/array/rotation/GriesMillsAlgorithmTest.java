package com.sl.algorithms.core.linear.array.rotation;

import org.junit.Assert;
import org.junit.Test;

import static com.sl.algorithms.core.utils.ArrayOps.printArray;

@SuppressWarnings("unchecked")
public class GriesMillsAlgorithmTest extends GriesMillsAlgorithm {

    @Test
    public void testLeftRotationBlockSwap() {
        Assert.assertEquals("[2,3,4,5,1]", printArray(rotate(new Integer[]{1, 2, 3, 4, 5}, 1, false)));
        Assert.assertEquals("[3,4,5,1,2]", printArray(rotate(new Integer[]{1, 2, 3, 4, 5}, 2, false)));
        Assert.assertEquals("[4,5,1,2,3]", printArray(rotate(new Integer[]{1, 2, 3, 4, 5}, 3, false)));
        Assert.assertEquals("[5,1,2,3,4]", printArray(rotate(new Integer[]{1, 2, 3, 4, 5}, 4, false)));
        Assert.assertEquals("[1,2,3,4,5]", printArray(rotate(new Integer[]{1, 2, 3, 4, 5}, 5, false)));
        Assert.assertEquals("[2,3,4,5,1]", printArray(rotate(new Integer[]{1, 2, 3, 4, 5}, 6, false)));
    }

    @Test
    public void testRightRotationBlockSwap() {
        try {
            rotate(new Integer[]{1, 2, 3, 4, 5}, 1, true);
            Assert.fail("Should have thrown an exception");
        } catch (IllegalArgumentException iae) {
            Assert.assertEquals(iae.getMessage(), "Right rotation not supported for GriesMillsAlgorithm yet");
        }
    }
}
