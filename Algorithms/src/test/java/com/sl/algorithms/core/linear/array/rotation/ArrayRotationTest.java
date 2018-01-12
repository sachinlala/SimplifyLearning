package com.sl.algorithms.core.linear.array.rotation;

import com.sl.algorithms.core.baseObj.ListNode;
import com.sl.algorithms.core.interfaces.rwops.RotationEngine;
import org.junit.Assert;
import org.junit.Test;

import static com.sl.algorithms.core.utils.ArrayOps.printArray;

@SuppressWarnings("unchecked")
public class ArrayRotationTest {

    private RotationEngine rotationEngine;

    @Test
    public void assertBruteForceRotation() {
        rotationEngine = new BruteForceRotation();
        testRotationLeft();
        testRotationRight(true);
        assertListNodeRotation();
    }

    @Test
    public void assertBruteForceRotationWithSpace() {
        rotationEngine = new BruteForceRotationWithSpace();
        testRotationLeft();
        testRotationRight(false);
        assertListNodeRotation();
    }

    @Test
    public void assertDougMcIlroyAlgorithm() {
        rotationEngine = new DougMcIlroyAlgorithm();
        testRotationLeft();
        testRotationRight(true);
        assertListNodeRotation();
    }

    @Test
    public void assertBentleyShufflingAlgorithm() {
        rotationEngine = new BentleyShufflingAlgorithm();
        testRotationLeft();
        testRotationRight(false);
        assertListNodeRotation();
    }

    @Test
    public void assertGriesMillsAlgorithm() {
        rotationEngine = new GriesMillsAlgorithm();
        testRotationLeft();
        testRotationRight(false);
        assertListNodeRotation();
    }

    public void testRotationLeft() {
        Assert.assertEquals("[2,3,4,5,1]", printArray(rotationEngine.rotate(new Integer[]{1, 2, 3, 4, 5}, 1, false)));
        Assert.assertEquals("[3,4,5,1,2]", printArray(rotationEngine.rotate(new Integer[]{1, 2, 3, 4, 5}, 2, false)));
        Assert.assertEquals("[4,5,1,2,3]", printArray(rotationEngine.rotate(new Integer[]{1, 2, 3, 4, 5}, 3, false)));
        Assert.assertEquals("[5,1,2,3,4]", printArray(rotationEngine.rotate(new Integer[]{1, 2, 3, 4, 5}, 4, false)));
        Assert.assertEquals("[1,2,3,4,5]", printArray(rotationEngine.rotate(new Integer[]{1, 2, 3, 4, 5}, 5, false)));
        Assert.assertEquals("[2,3,4,5,1]", printArray(rotationEngine.rotate(new Integer[]{1, 2, 3, 4, 5}, 6, false)));
        Assert.assertEquals("[3,4,5,1,2]", printArray(rotationEngine.rotate(new Integer[]{1, 2, 3, 4, 5}, 7, false)));
        Assert.assertEquals("[3,4,1,2]", printArray(rotationEngine.rotate(new Integer[]{1, 2, 3, 4}, 2, false)));
    }

    public void testRotationRight(boolean isSupported) {
        if (!isSupported) {
            try {
                rotationEngine.rotate(new Integer[]{1, 2, 3, 4, 5}, 1, true);
                Assert.fail("Should have thrown an exception");
            } catch (IllegalArgumentException iae) {
                Assert.assertEquals(iae.getMessage(), RotationEngine.OPERATION_NOT_SUPPORTED_YET);
            }
            return;
        }
        Assert.assertEquals("[5,1,2,3,4]", printArray(rotationEngine.rotate(new Integer[]{1, 2, 3, 4, 5}, 1, true)));
        Assert.assertEquals("[4,5,1,2,3]", printArray(rotationEngine.rotate(new Integer[]{1, 2, 3, 4, 5}, 2, true)));
        Assert.assertEquals("[3,4,5,1,2]", printArray(rotationEngine.rotate(new Integer[]{1, 2, 3, 4, 5}, 3, true)));
        Assert.assertEquals("[2,3,4,5,1]", printArray(rotationEngine.rotate(new Integer[]{1, 2, 3, 4, 5}, 4, true)));
        Assert.assertEquals("[1,2,3,4,5]", printArray(rotationEngine.rotate(new Integer[]{1, 2, 3, 4, 5}, 5, true)));
        Assert.assertEquals("[5,1,2,3,4]", printArray(rotationEngine.rotate(new Integer[]{1, 2, 3, 4, 5}, 6, true)));
    }

    private void assertListNodeRotation() {
        try {
            rotationEngine.rotate(ListNode.dummyNode(), 1, true);
            Assert.fail("Should have thrown an UnsupportedOperationException");
        } catch (UnsupportedOperationException uoe) {
            Assert.assertNotNull(uoe);
        }
    }
}
