package com.sl.algorithms.core.list;

import static com.sl.algorithms.core.list.ListNode.createLinkedList;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class ListNodeTest {

  private ListNode<Integer> integerListNode;
  private ListNode<String> stringListNode;

  @BeforeEach
  public void setup() {
    integerListNode = createLinkedList(new Integer[]{1, 2, 3, 4, 5});
    stringListNode = createLinkedList(new String[]{"Array", "List", "Tree", "Map"});
  }

  @Test
  public void testEquality() {
    {
      assertFalse(integerListNode.equals(new Object()));
      assertFalse(integerListNode.equals(null));
      assertFalse(stringListNode.equals(new Object()));
      assertFalse(stringListNode.equals(null));
      assertFalse(integerListNode.equals(stringListNode));
    }
    {
      ListNode<Integer> newList = createLinkedList(new Integer[]{1, 2, 3});
      assertFalse(integerListNode.equals(newList));
      assertFalse(integerListNode.hashCode() == newList.hashCode());
    }
    {
      ListNode<String> newList = createLinkedList(new String[]{"Array", "List", "Tree"});
      assertFalse(stringListNode.equals(newList));
      assertFalse(stringListNode.hashCode() == newList.hashCode());
    }
    {
      ListNode<Integer> newList = createLinkedList(new Integer[]{1, 2, 3, 4, 5});
      assertTrue(integerListNode.equals(newList));
      assertTrue(integerListNode.hashCode() == newList.hashCode());
    }
    {
      ListNode<String> newList = createLinkedList(new String[]{"Array", "List", "Tree", "Map"});
      assertTrue(stringListNode.equals(newList));
      assertTrue(stringListNode.hashCode() == newList.hashCode());
    }
    {
      ListNode<Double> doubleListNode = new ListNode<>(1.0);
      try {
        doubleListNode.compareTo(doubleListNode);
        fail("Exception should've been thrown because Double not supported yet");
      } catch (IllegalArgumentException iae) {
        assertNotNull(iae);
      }
    }
  }

  @Test
  public void testMidPoint() {
    assertTrue(new ListNode<>(1).midPoint().data.equals(1));
    assertTrue(createLinkedList(new Integer[]{1, 2}).midPoint().data.equals(1));
    assertTrue(createLinkedList(new Integer[]{1, 2, 3}).midPoint().data.equals(2));
    assertTrue(integerListNode.midPoint().data.equals(3));
    assertEquals("List", stringListNode.midPoint().data);
  }

  @Test
  public void testCloneList() {
    {
      ListNode<Integer> oneNodeCopy = new ListNode<>(1);
      assertEquals(oneNodeCopy, oneNodeCopy.clone());
    }
    {
      ListNode<Integer> deepCopy = integerListNode.clone();
      assertEquals("[1,2,3,4,5]", deepCopy.toString());
    }
  }

  @Test
  public void testSize() {
    assertEquals(5, integerListNode.size());
    assertEquals(4, stringListNode.size());
  }

  @Test
  public void testIsCircular() {
    {
      assertFalse(ListNode.dummyNode().isCircular());
      assertFalse(new ListNode<>(1).isCircular());
    }
    {
      assertFalse(integerListNode.isCircular());
      assertFalse(stringListNode.isCircular());
    }
    {
      ListNode<Integer> curr = integerListNode;
      while (curr.next != null) {
        curr = curr.next;
      }
      assertFalse(integerListNode.isCircular());
      curr.next = integerListNode.next.next;
      assertFalse(integerListNode.isCircular());
      assertEquals("[1,2,3,4,5]", integerListNode.toString());
    }
    {
      ListNode<String> curr = stringListNode;
      while (curr.next != null) {
        curr = curr.next;
      }
      assertFalse(stringListNode.isCircular());
      curr.next = stringListNode;
      assertTrue(stringListNode.isCircular());
      assertEquals("[Array,List,Tree,Map]", stringListNode.toString());
    }
  }

  @Test
  public void testIsCyclic() {
    {
      assertFalse(ListNode.dummyNode().isCyclic());
      assertFalse(new ListNode<>(1).isCyclic());
    }
    {
      assertFalse(integerListNode.isCyclic());
      assertFalse(stringListNode.isCyclic());
    }
    {
      ListNode<String> curr = stringListNode;
      while (curr.next != null) {
        curr = curr.next;
      }
      assertFalse(stringListNode.isCyclic());
      curr.next = stringListNode;
      assertTrue(stringListNode.isCyclic());
      assertEquals("[Array,List,Tree,Map]", stringListNode.toString());
    }
    {
      ListNode<Integer> curr = integerListNode;
      while (curr.next != null) {
        curr = curr.next;
      }
      assertFalse(integerListNode.isCyclic());
      curr.next = integerListNode.next.next;
      assertTrue(integerListNode.isCyclic());
      assertEquals("[1,2,3,4,5]", integerListNode.toString());
    }
  }
}
