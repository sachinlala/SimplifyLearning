package com.sl.algorithms.core.nonlinear;

import com.sl.algorithms.core.linear.ArrayOps;
import com.sl.algorithms.core.linear.LinkedListOps;
import com.sl.algorithms.core.linear.ListNode;
import org.junit.Assert;
import org.junit.Test;

import static com.sl.algorithms.core.linear.ArrayOps.printArray;
import static com.sl.algorithms.core.nonlinear.BSTOps.*;

public class BSTOpsTest {

    @Test
    public void testIsValidBST() {
        TreeNode<Integer> bstNull = null;
        Assert.assertTrue(isBST(bstNull));
        Assert.assertEquals("[]", printTree(bstNull));

        int[] a1 = {1};
        TreeNode<Integer> bst1 = createBSTFromSortedArray(a1);
        Assert.assertTrue(isBST(bst1));
        Assert.assertEquals("[1]", printTree(bst1));

        int[] a2 = {1,2};
        TreeNode<Integer> bst2 = createBSTFromSortedArray(a2);
        Assert.assertTrue(isBST(bst2));
        Assert.assertEquals("[12]", printTree(bst2));

        int[] a3 = {1,2,3};
        TreeNode<Integer> bst3 = createBSTFromSortedArray(a3);
        Assert.assertTrue(isBST(bst3));
        Assert.assertEquals("[213]", printTree(bst3));

        int[] a4 = {1,2,3,4};
        TreeNode<Integer> bst4 = createBSTFromSortedArray(a4);
        Assert.assertTrue(isBST(bst4));
        Assert.assertEquals("[2134]", printTree(bst4));

        int[] a5 = {1,2,3,4,5};
        TreeNode<Integer> bst5 = createBSTFromSortedArray(a5);
        Assert.assertTrue(isBST(bst5));
        Assert.assertEquals("[31245]", printTree(bst5));
        Assert.assertEquals(printTree(bst5), printTree(findNode(bst5, 3)));
        Assert.assertEquals(new TreeNode<>(2), findNode(bst5, 2));
    }

    @Test
    public void testCreateBSTFromSortedArray() {
        int[] a = {1,2,3,4,5};
        TreeNode<Integer> bst = createBSTFromSortedArray(a);
        Assert.assertTrue(isBST(bst));
        Assert.assertEquals(computeHeight(bst), 3);
        int[] b = convertToSortedArray(bst);
        Assert.assertTrue(ArrayOps.areEqual(a, b));
    }

    @Test
    public void testCreateBSTFromSortedList() {
        int[] a = {1,2,3,4,5};
        ListNode<Integer> listNode = LinkedListOps.createLinkedList(a);
        TreeNode<Integer> bstNode = BSTOps.createBSTFromSortedList(listNode);
        Assert.assertTrue(isBST(bstNode));
        Assert.assertEquals(computeHeight(bstNode), 3);
        int[] b = convertToSortedArray(bstNode);
        Assert.assertTrue(ArrayOps.areEqual(a, b));
    }

    @Test
    public void testMinMax() {
        try {
            findMinimum(null);
            Assert.fail("No minimum in empty tree");
        } catch (IllegalArgumentException iae) {
            Assert.assertEquals("Tree is empty", iae.getMessage());
        }
        try {
            findMaximum(null);
            Assert.fail("No maximum in empty tree");
        } catch (IllegalArgumentException iae) {
            Assert.assertEquals("Tree is empty", iae.getMessage());
        }

        int[] a = {1,2,3,4,5};
        TreeNode<Integer> bstNode = createBSTFromSortedArray(a);
        Assert.assertTrue(findNode(bstNode, 2).equals(new TreeNode<>(2)));

        Assert.assertTrue(findMinimum(bstNode).value == 1);
        Assert.assertTrue(findMaximum(bstNode).value == 5);
    }

    @Test
    public void testAddNode() {
        TreeNode<Integer> newBST = addNode(null, 1);
        Assert.assertTrue(newBST.equals(new TreeNode<>(1)));

        int[] a = {1,2,3,4};
        TreeNode<Integer> bst = createBSTFromSortedArray(a);
        Assert.assertTrue(isBST(bst));

        TreeNode<Integer> bstUpdated = addNode(bst, 5);
        Assert.assertTrue(bstUpdated.equals(bst)); // by reference
        Assert.assertTrue(isBST(bstUpdated));
        Assert.assertEquals(bstUpdated.toString(), "21345");
        Assert.assertEquals(printTree(bstUpdated), "[21345]");
        Assert.assertEquals(printArray(convertToSortedArray(bstUpdated)), "[1,2,3,4,5]");

        bstUpdated = addNode(bst, 0);
        Assert.assertTrue(isBST(bstUpdated));
        Assert.assertEquals(bstUpdated.toString(), "210345");
        Assert.assertEquals(printTree(bstUpdated), "[210345]");
        Assert.assertEquals(printArray(convertToSortedArray(bstUpdated)), "[0,1,2,3,4,5]");
    }

    @Test
    public void testAddNodeIterative() {
        int[] a = {1,2,3,4};
        TreeNode<Integer> bst = createBSTFromSortedArray(a);
        Assert.assertTrue(isBST(bst));

        TreeNode<Integer> bstUpdated = addNodeIteratively(bst, 5);
        Assert.assertTrue(bstUpdated.equals(bst)); // by reference
        Assert.assertTrue(isBST(bstUpdated));

        Assert.assertEquals(bstUpdated.toString(), "21345");
        Assert.assertEquals(printTree(bstUpdated), "[21345]");
        Assert.assertEquals(printArray(convertToSortedArray(bstUpdated)), "[1,2,3,4,5]");

        bstUpdated = addNodeIteratively(bst, 0);
        Assert.assertTrue(isBST(bstUpdated));
        Assert.assertEquals(bstUpdated.toString(), "210345");
        Assert.assertEquals(printTree(bstUpdated), "[210345]");
        Assert.assertEquals(printArray(convertToSortedArray(bstUpdated)), "[0,1,2,3,4,5]");
    }

    @Test
    public void testRemoveNode() {
        Assert.assertNull(removeNode(null, 2));

        int[] a = {1,2,3,4,5};
        TreeNode<Integer> bstUpdated = removeNode(createBSTFromSortedArray(a), 3);
        Assert.assertTrue(bstUpdated.value == 4);
        Assert.assertEquals(bstUpdated.toString(), "4125");
        Assert.assertEquals(printArray(convertToSortedArray(bstUpdated)), "[1,2,4,5]");

        TreeNode<Integer> bstUpdatedLeft = removeNode(createBSTFromSortedArray(a), 1);
        Assert.assertTrue(bstUpdatedLeft.value == 3);
        Assert.assertEquals(bstUpdatedLeft.toString(), "3245");
        Assert.assertEquals(printArray(convertToSortedArray(bstUpdatedLeft)), "[2,3,4,5]");

        TreeNode<Integer> bstUpdatedRight = removeNode(createBSTFromSortedArray(a), 4);
        Assert.assertTrue(bstUpdatedRight.value == 3);
        Assert.assertEquals(bstUpdatedRight.toString(), "3125");
        Assert.assertEquals(printArray(convertToSortedArray(bstUpdatedRight)), "[1,2,3,5]");
    }
}
