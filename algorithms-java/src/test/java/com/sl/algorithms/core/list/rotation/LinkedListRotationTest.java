package com.sl.algorithms.core.list.rotation;

import static com.sl.algorithms.core.list.ListNode.createLinkedList;

import com.sl.algorithms.core.list.ListNode;
import java.util.Arrays;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

@SuppressWarnings("unchecked")
public class LinkedListRotationTest extends LinkedListRotation {

  private ListNode<Integer> integerListNode;
  private ListNode<String> stringListNode;

  @BeforeEach
  public void createList() {
    integerListNode = createLinkedList(new Integer[]{1, 2, 3, 4, 5});
    stringListNode = createLinkedList(new String[]{"Nikunj", "Roohani", "Sachin", "Sarika"});
  }

  @Test
  public void testBaseCases() {
    {
      ListNode<Integer> nullNode = null;
      assertNull(rotate(nullNode, 1, true));
      assertNull(rotate(nullNode, 1, false));
    }
    {
      ListNode<Integer> singleNode = new ListNode<>(1);
      assertEquals(singleNode, rotate(singleNode, 1, true));
      assertEquals(singleNode, rotate(singleNode, 1, false));
    }
    {
      assertEquals(integerListNode, rotate(integerListNode.clone(), 0, true));
      assertEquals(integerListNode, rotate(integerListNode.clone(), 0, false));
    }
  }

  @Test
  public void testRotateLeft() {
    {
      assertEquals("[2,3,4,5,1]", rotateListLeft(integerListNode, 1).toString());
    }
    {
      createList();
      assertEquals("[3,4,5,1,2]", rotateListLeft(integerListNode, 2).toString());
    }
    {
      createList();
      assertEquals("[4,5,1,2,3]", rotateListLeft(integerListNode, 3).toString());
    }
    {
      createList();
      assertEquals("[5,1,2,3,4]", rotateListLeft(integerListNode, 4).toString());
    }
    {
      createList();
      assertEquals("[1,2,3,4,5]", rotateListLeft(integerListNode, 5).toString());
    }
    {
      createList();
      assertEquals("[2,3,4,5,1]", rotateListLeft(integerListNode, 6).toString());
    }
    {
      createList();
      assertEquals("[3,4,5,1,2]", rotateListLeft(integerListNode, 7).toString());
    }
    {
      createList();
      assertEquals("[4,5,1,2,3]", rotateListLeft(integerListNode, 8).toString());
    }
    {
      createList();
      assertEquals("[5,1,2,3,4]", rotateListLeft(integerListNode, 9).toString());
    }
    {
      createList();
      assertEquals("[1,2,3,4,5]", rotateListLeft(integerListNode, 10).toString());
    }
  }

  @Test
  public void testRotateRight() {
    {
      assertEquals("[5,1,2,3,4]", rotateListRight(integerListNode, 1).toString());
    }
    {
      createList();
      assertEquals("[4,5,1,2,3]", rotateListRight(integerListNode, 2).toString());
    }
    {
      createList();
      assertEquals("[3,4,5,1,2]", rotateListRight(integerListNode, 3).toString());
    }
    {
      createList();
      assertEquals("[2,3,4,5,1]", rotateListRight(integerListNode, 4).toString());
    }
    {
      createList();
      assertEquals("[1,2,3,4,5]", rotateListRight(integerListNode, 5).toString());
    }
    {
      createList();
      assertEquals("[5,1,2,3,4]", rotateListRight(integerListNode, 6).toString());
    }
    {
      createList();
      assertEquals("[4,5,1,2,3]", rotateListRight(integerListNode, 7).toString());
    }
    {
      createList();
      assertEquals("[3,4,5,1,2]", rotateListRight(integerListNode, 8).toString());
    }
    {
      createList();
      assertEquals("[2,3,4,5,1]", rotateListRight(integerListNode, 9).toString());
    }
    {
      createList();
      assertEquals("[1,2,3,4,5]", rotateListRight(integerListNode, 10).toString());
    }
  }

  @Test
  public void testStringRotationRight() {
    {
      ListNode<String> rotatedBy1Right = createLinkedList(
          new String[]{"Sarika", "Nikunj", "Roohani", "Sachin"});
      assertEquals(rotatedBy1Right, rotateListRight(stringListNode, 1));
    }
  }

  @Test
  public void testStringRotationLeft() {
    {
      ListNode<String> rotatedBy3Left = createLinkedList(
          new String[]{"Sarika", "Nikunj", "Roohani", "Sachin"});
      assertEquals(rotatedBy3Left, rotateListRight(stringListNode, 1));
    }
  }

  @Test
  public void assertArrayRotationUsingLinkedList() {
    {
      String[] strArray = new String[]{"Nikunj", "Roohani", "Sachin", "Sarika"};
      String[] expectedOutput = new String[]{"Sarika", "Nikunj", "Roohani", "Sachin"};
      assertTrue(Arrays.equals(expectedOutput, rotate(strArray, 3, false)));
    }
  }

  @Test
  public void assertIsRotation() {
    {
      ListNode<String> A = createLinkedList(new String[]{"A", "B", "C"});
      ListNode<String> B = createLinkedList(new String[]{"X", "Y", "Z"});
      assertFalse(isRotation(A, B));
    }
    {
      ListNode<String> A = createLinkedList(new String[]{"A", "B", "C", "D"});
      ListNode<String> B = createLinkedList(new String[]{"A", "B", "C", "D", "E"});
      assertFalse(isRotation(A, B));
    }
    {
      ListNode<String> A = createLinkedList(new String[]{"A", "B", "C", "D", "E"});
      ListNode<String> B = createLinkedList(new String[]{"A", "B", "C", "D", "E"});
      assertTrue(isRotation(A, B));
      {
        try {
          isRotation(A, null);
          fail("Exception should've come.");
        } catch (IllegalArgumentException iae) {
          assertNotNull(iae);
        }

      }
      {
        try {
          isRotation(null, B);
          fail("Exception should've come.");
        } catch (IllegalArgumentException iae) {
          assertNotNull(iae);
        }
      }
    }
    {
      ListNode<String> A = createLinkedList(new String[]{"A", "B", "C", "D", "E"});
      ListNode<String> B = createLinkedList(new String[]{"B", "A", "C", "D", "E"});
      assertFalse(isRotation(A, B));
    }
    {
      ListNode<String> A = createLinkedList(new String[]{"A", "B", "C", "D", "E"});
      ListNode<String> B = createLinkedList(new String[]{"D", "E", "A", "B", "C"});
      assertTrue(isRotation(A, B));
    }
  }
}
