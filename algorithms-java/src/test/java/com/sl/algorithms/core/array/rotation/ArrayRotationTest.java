package com.sl.algorithms.core.array.rotation;

import static com.sl.algorithms.core.utils.ArrayOps.printArray;

import com.sl.algorithms.core.interfaces.rotate.RotationEngine;
import com.sl.algorithms.core.list.ListNode;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

@SuppressWarnings("unchecked")
public class ArrayRotationTest {

  private RotationEngine rotationEngine;

  @Test
  public void assertBruteForceRotation() {
    rotationEngine = new BruteForceRotation();
    testRotationLeft();
    testRotationRight(true);
    testListNodeRotation();
  }

  @Test
  public void assertBruteForceRotationWithSpace() {
    rotationEngine = new BruteForceRotationWithSpace();
    testRotationLeft();
    testRotationRight(false);
    testListNodeRotation();
  }

  @Test
  public void assertDougMcIlroyAlgorithm() {
    rotationEngine = new DougMcIlroyAlgorithm();
    testRotationLeft();
    testRotationRight(true);
    testListNodeRotation();
  }

  @Test
  public void assertBentleyShufflingAlgorithm() {
    rotationEngine = new BentleyRotationByShuffling();
    testRotationLeft();
    testRotationRight(false);
    testListNodeRotation();
  }

  @Test
  public void assertGriesMillsAlgorithm() {
    rotationEngine = new GriesMillsRotation();
    testRotationLeft();
    testRotationRight(false);
    testListNodeRotation();
  }

  public void testRotationLeft() {
    assertEquals("[2,3,4,5,1]",
        printArray(rotationEngine.rotate(new Integer[]{1, 2, 3, 4, 5}, 1, false)));
    assertEquals("[3,4,5,1,2]",
        printArray(rotationEngine.rotate(new Integer[]{1, 2, 3, 4, 5}, 2, false)));
    assertEquals("[4,5,1,2,3]",
        printArray(rotationEngine.rotate(new Integer[]{1, 2, 3, 4, 5}, 3, false)));
    assertEquals("[5,1,2,3,4]",
        printArray(rotationEngine.rotate(new Integer[]{1, 2, 3, 4, 5}, 4, false)));
    assertEquals("[1,2,3,4,5]",
        printArray(rotationEngine.rotate(new Integer[]{1, 2, 3, 4, 5}, 5, false)));
    assertEquals("[2,3,4,5,1]",
        printArray(rotationEngine.rotate(new Integer[]{1, 2, 3, 4, 5}, 6, false)));
    assertEquals("[3,4,5,1,2]",
        printArray(rotationEngine.rotate(new Integer[]{1, 2, 3, 4, 5}, 7, false)));
    assertEquals("[3,4,1,2]",
        printArray(rotationEngine.rotate(new Integer[]{1, 2, 3, 4}, 2, false)));
    assertIsRotation();
  }

  public void assertIsRotation() {
    {
      String[] A = new String[]{"A", "B", "C"};
      String[] B = new String[]{"X", "Y", "Z"};
      assertFalse(rotationEngine.isRotation(A, B));
    }
    {
      String[] A = new String[]{"A", "B", "C", "D"};
      String[] B = new String[]{"A", "B", "C", "D", "E"};
      assertFalse(rotationEngine.isRotation(A, B));
    }
    {
      String[] A = new String[]{"A", "B", "C", "D", "E"};
      String[] B = new String[]{"A", "B", "C", "D", "E"};
      assertTrue(rotationEngine.isRotation(A, B));
    }
    {
      String[] A = new String[]{"A", "B", "C", "D", "E"};
      String[] B = new String[]{"B", "A", "C", "D", "E"};
      assertFalse(rotationEngine.isRotation(A, B));
    }
    {
      String[] A = new String[]{"A", "B", "C", "D", "E"};
      String[] B = new String[]{"D", "E", "A", "B", "C"};
      assertTrue(rotationEngine.isRotation(A, B));
    }
  }

  public void testRotationRight(boolean isSupported) {
    if (!isSupported) {
      try {
        rotationEngine.rotate(new Integer[]{1, 2, 3, 4, 5}, 1, true);
        fail("Should have thrown an exception");
      } catch (IllegalArgumentException iae) {
        assertEquals(iae.getMessage(), RotationEngine.OPERATION_NOT_SUPPORTED_YET);
      }
      return;
    }
    assertEquals("[5,1,2,3,4]",
        printArray(rotationEngine.rotate(new Integer[]{1, 2, 3, 4, 5}, 1, true)));
    assertEquals("[4,5,1,2,3]",
        printArray(rotationEngine.rotate(new Integer[]{1, 2, 3, 4, 5}, 2, true)));
    assertEquals("[3,4,5,1,2]",
        printArray(rotationEngine.rotate(new Integer[]{1, 2, 3, 4, 5}, 3, true)));
    assertEquals("[2,3,4,5,1]",
        printArray(rotationEngine.rotate(new Integer[]{1, 2, 3, 4, 5}, 4, true)));
    assertEquals("[1,2,3,4,5]",
        printArray(rotationEngine.rotate(new Integer[]{1, 2, 3, 4, 5}, 5, true)));
    assertEquals("[5,1,2,3,4]",
        printArray(rotationEngine.rotate(new Integer[]{1, 2, 3, 4, 5}, 6, true)));
  }

  private void testListNodeRotation() {
    try {
      rotationEngine.rotate(ListNode.dummyNode(), 1, true);
      fail("Should have thrown an UnsupportedOperationException");
    } catch (UnsupportedOperationException uoe) {
      assertNotNull(uoe);
    }
  }
}
