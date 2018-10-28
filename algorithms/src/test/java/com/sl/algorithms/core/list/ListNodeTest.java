package com.sl.algorithms.core.list;

import static com.sl.algorithms.core.list.ListNode.createLinkedList;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

public class ListNodeTest {

  private ListNode<Integer> integerListNode;
  private ListNode<String> stringListNode;

  @Before
  public void setup() {
    integerListNode = createLinkedList(new Integer[]{1, 2, 3, 4, 5});
    stringListNode = createLinkedList(new String[]{"Array", "List", "Tree", "Map"});
  }

  @Test
  public void testEquality() {
    {
      Assert.assertFalse(integerListNode.equals(new Object()));
      Assert.assertFalse(integerListNode.equals(null));
      Assert.assertFalse(stringListNode.equals(new Object()));
      Assert.assertFalse(stringListNode.equals(null));
      Assert.assertFalse(integerListNode.equals(stringListNode));
    }
    {
      ListNode<Integer> newList = createLinkedList(new Integer[]{1, 2, 3});
      Assert.assertFalse(integerListNode.equals(newList));
      Assert.assertFalse(integerListNode.hashCode() == newList.hashCode());
    }
    {
      ListNode<String> newList = createLinkedList(new String[]{"Array", "List", "Tree"});
      Assert.assertFalse(stringListNode.equals(newList));
      Assert.assertFalse(stringListNode.hashCode() == newList.hashCode());
    }
    {
      ListNode<Integer> newList = createLinkedList(new Integer[]{1, 2, 3, 4, 5});
      Assert.assertTrue(integerListNode.equals(newList));
      Assert.assertTrue(integerListNode.hashCode() == newList.hashCode());
    }
    {
      ListNode<String> newList = createLinkedList(new String[]{"Array", "List", "Tree", "Map"});
      Assert.assertTrue(stringListNode.equals(newList));
      Assert.assertTrue(stringListNode.hashCode() == newList.hashCode());
    }
    {
      ListNode<Double> doubleListNode = new ListNode<>(1.0);
      try {
        doubleListNode.compareTo(doubleListNode);
        Assert.fail("Exception should've been thrown because Double not supported yet");
      } catch (IllegalArgumentException iae) {
        Assert.assertNotNull(iae);
      }
    }
  }

  @Test
  public void testMidPoint() {
    Assert.assertTrue(new ListNode<>(1).midPoint().data.equals(1));
    Assert.assertTrue(createLinkedList(new Integer[]{1, 2}).midPoint().data.equals(1));
    Assert.assertTrue(createLinkedList(new Integer[]{1, 2, 3}).midPoint().data.equals(2));
    Assert.assertTrue(integerListNode.midPoint().data.equals(3));
    Assert.assertEquals("List", stringListNode.midPoint().data);
  }

  @Test
  public void testCloneList() {
    {
      ListNode<Integer> oneNodeCopy = new ListNode<>(1);
      Assert.assertEquals(oneNodeCopy, oneNodeCopy.clone());
    }
    {
      ListNode<Integer> deepCopy = integerListNode.clone();
      Assert.assertEquals("[1,2,3,4,5]", deepCopy.toString());
    }
  }

  @Test
  public void testSize() {
    Assert.assertEquals(5, integerListNode.size());
    Assert.assertEquals(4, stringListNode.size());
  }

  @Test
  public void testIsCircular() {
    {
      Assert.assertFalse(ListNode.dummyNode().isCircular());
      Assert.assertFalse(new ListNode<>(1).isCircular());
    }
    {
      Assert.assertFalse(integerListNode.isCircular());
      Assert.assertFalse(stringListNode.isCircular());
    }
    {
      ListNode<Integer> curr = integerListNode;
      while (curr.next != null) {
        curr = curr.next;
      }
      Assert.assertFalse(integerListNode.isCircular());
      curr.next = integerListNode.next.next;
      Assert.assertFalse(integerListNode.isCircular());
      Assert.assertEquals("[1,2,3,4,5]", integerListNode.toString());
    }
    {
      ListNode<String> curr = stringListNode;
      while (curr.next != null) {
        curr = curr.next;
      }
      Assert.assertFalse(stringListNode.isCircular());
      curr.next = stringListNode;
      Assert.assertTrue(stringListNode.isCircular());
      Assert.assertEquals("[Array,List,Tree,Map]", stringListNode.toString());
    }
  }

  @Test
  public void testIsCyclic() {
    {
      Assert.assertFalse(ListNode.dummyNode().isCyclic());
      Assert.assertFalse(new ListNode<>(1).isCyclic());
    }
    {
      Assert.assertFalse(integerListNode.isCyclic());
      Assert.assertFalse(stringListNode.isCyclic());
    }
    {
      ListNode<String> curr = stringListNode;
      while (curr.next != null) {
        curr = curr.next;
      }
      Assert.assertFalse(stringListNode.isCyclic());
      curr.next = stringListNode;
      Assert.assertTrue(stringListNode.isCyclic());
      Assert.assertEquals("[Array,List,Tree,Map]", stringListNode.toString());
    }
    {
      ListNode<Integer> curr = integerListNode;
      while (curr.next != null) {
        curr = curr.next;
      }
      Assert.assertFalse(integerListNode.isCyclic());
      curr.next = integerListNode.next.next;
      Assert.assertTrue(integerListNode.isCyclic());
      Assert.assertEquals("[1,2,3,4,5]", integerListNode.toString());
    }
  }
}
