package com.sl.algorithms.sort.finitegroups;

import static com.sl.algorithms.core.utils.ArrayOps.printArray;

import com.sl.algorithms.sort.BaseTest;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

public class ElementMoverTest extends BaseTest {


  @Test
  public void testMoveZeroesRight() {
    ElementMover<Integer> elementMover = new ElementMover<>(0, true);
    {
      assertBaseCases(elementMover);
    }
    {
      Integer[] nums1 = {0, 1, 0, 3, 12};
      elementMover.sort(nums1);
      assertEquals("[1,3,12,0,0]", printArray(nums1));
    }
    {
      Integer[] nums2 = new Integer[]{1, 3, 12};
      elementMover.sort(nums2);
      assertEquals("[1,3,12]", printArray(nums2));
    }
    ElementMover<String> stringMover = new ElementMover<>("Tring", true);
    {
      String[] names1 = new String[]{"Knock", "Tring", "Knock", "Tring"};
      stringMover.sort(names1);
      assertEquals("[Knock,Knock,Tring,Tring]", printArray(names1));
    }
    {
      String[] names2 = new String[]{"Happy", "New", "Year"};
      stringMover.sort(names2);
      assertEquals("[Happy,New,Year]", printArray(names2));
    }
  }

  @Test
  public void testMoveZeroesLeft() {
    ElementMover<Integer> elementMover = new ElementMover<>(0, false);
    {
      Integer[] nums1 = {0, 1, 0, 3, 12};
      elementMover.sort(nums1);
      assertEquals("[0,0,1,3,12]", printArray(nums1));
    }
    {
      Integer[] nums2 = new Integer[]{1, 3, 12};
      elementMover.sort(nums2);
      assertEquals("[1,3,12]", printArray(nums2));
    }
    ElementMover<String> stringMover = new ElementMover<>("Tring", false);
    {
      String[] names1 = new String[]{"Knock", "Tring", "Knock", "Tring"};
      stringMover.sort(names1);
      assertEquals("[Tring,Tring,Knock,Knock]", printArray(names1));
    }
    {
      String[] names2 = new String[]{"Happy", "New", "Year"};
      stringMover.sort(names2);
      assertEquals("[Happy,New,Year]", printArray(names2));
    }
  }
}
