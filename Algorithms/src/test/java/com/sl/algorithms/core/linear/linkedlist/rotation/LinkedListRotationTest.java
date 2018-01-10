package com.sl.algorithms.core.linear.linkedlist.rotation;

import com.sl.algorithms.core.baseObj.ListNode;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import java.util.Arrays;

import static com.sl.algorithms.core.baseObj.ListNode.createLinkedList;

@SuppressWarnings("unchecked")
public class LinkedListRotationTest extends LinkedListRotation {

    private ListNode<Integer> integerListNode;
    private ListNode<String> stringListNode;

    @Before
    public void createList() {
        integerListNode = createLinkedList(new Integer[]{1,2,3,4,5});
        stringListNode = createLinkedList(new String[]{"Nikunj", "Roohani", "Sachin", "Sarika"});
    }

    @Test
    public void testBaseCases() {
        {
            ListNode<Integer> nullNode = null;
            Assert.assertNull(rotate(nullNode, 1, true));
            Assert.assertNull(rotate(nullNode, 1, false));
        }
        {
            ListNode<Integer> singleNode = new ListNode<>(1);
            Assert.assertEquals(singleNode, rotate(singleNode, 1, true));
            Assert.assertEquals(singleNode, rotate(singleNode, 1, false));
        }
        {
            Assert.assertEquals(integerListNode, rotate(integerListNode.clone(), 0, true));
            Assert.assertEquals(integerListNode, rotate(integerListNode.clone(), 0, false));
        }
    }

    @Test
    public void testRotateLeft() {
        {
            Assert.assertEquals("[2,3,4,5,1]", rotateListLeft(integerListNode, 1).toString());
        }
        {
            createList();
            Assert.assertEquals("[3,4,5,1,2]", rotateListLeft(integerListNode, 2).toString());
        }
        {
            createList();
            Assert.assertEquals("[4,5,1,2,3]", rotateListLeft(integerListNode, 3).toString());
        }
        {
            createList();
            Assert.assertEquals("[5,1,2,3,4]", rotateListLeft(integerListNode, 4).toString());
        }
        {
            createList();
            Assert.assertEquals("[1,2,3,4,5]", rotateListLeft(integerListNode, 5).toString());
        }
        {
            createList();
            Assert.assertEquals("[2,3,4,5,1]", rotateListLeft(integerListNode, 6).toString());
        }
        {
            createList();
            Assert.assertEquals("[3,4,5,1,2]", rotateListLeft(integerListNode, 7).toString());
        }
        {
            createList();
            Assert.assertEquals("[4,5,1,2,3]", rotateListLeft(integerListNode, 8).toString());
        }
        {
            createList();
            Assert.assertEquals("[5,1,2,3,4]", rotateListLeft(integerListNode, 9).toString());
        }
        {
            createList();
            Assert.assertEquals("[1,2,3,4,5]", rotateListLeft(integerListNode, 10).toString());
        }
    }

    @Test
    public void testRotateRight() {
        {
            Assert.assertEquals("[5,1,2,3,4]", rotateListRight(integerListNode, 1).toString());
        }
        {
            createList();
            Assert.assertEquals("[4,5,1,2,3]", rotateListRight(integerListNode, 2).toString());
        }
        {
            createList();
            Assert.assertEquals("[3,4,5,1,2]", rotateListRight(integerListNode, 3).toString());
        }
        {
            createList();
            Assert.assertEquals("[2,3,4,5,1]", rotateListRight(integerListNode, 4).toString());
        }
        {
            createList();
            Assert.assertEquals("[1,2,3,4,5]", rotateListRight(integerListNode, 5).toString());
        }
        {
            createList();
            Assert.assertEquals("[5,1,2,3,4]", rotateListRight(integerListNode, 6).toString());
        }
        {
            createList();
            Assert.assertEquals("[4,5,1,2,3]", rotateListRight(integerListNode, 7).toString());
        }
        {
            createList();
            Assert.assertEquals("[3,4,5,1,2]", rotateListRight(integerListNode, 8).toString());
        }
        {
            createList();
            Assert.assertEquals("[2,3,4,5,1]", rotateListRight(integerListNode, 9).toString());
        }
        {
            createList();
            Assert.assertEquals("[1,2,3,4,5]", rotateListRight(integerListNode, 10).toString());
        }
    }

    @Test
    public void testStringRotationRight() {
        {
            ListNode<String> rotatedBy1Right = createLinkedList(new String[]{"Sarika", "Nikunj", "Roohani", "Sachin"});
            Assert.assertEquals(rotatedBy1Right, rotateListRight(stringListNode, 1));
        }
    }

    @Test
    public void testStringRotationLeft() {
        {
            ListNode<String> rotatedBy3Left = createLinkedList(new String[]{"Sarika", "Nikunj", "Roohani", "Sachin"});
            Assert.assertEquals(rotatedBy3Left, rotateListRight(stringListNode, 1));
        }
    }

    @Test
    public void assertArrayRotationUsingLinkedList() {
        {
            String[] strArray = new String[]{"Nikunj", "Roohani", "Sachin", "Sarika"};
            String[] expectedOutput = new String[]{"Sarika", "Nikunj", "Roohani", "Sachin"};
            Assert.assertTrue(Arrays.equals(expectedOutput, rotate(strArray, 3, false)));
        }
    }
}
