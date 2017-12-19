package com.sl.algorithms.core.nonlinear;

import com.sl.algorithms.core.linear.array.ArrayOps;
import com.sl.algorithms.core.linear.linkedlist.LinkedListOps;
import com.sl.algorithms.core.linear.linkedlist.ListNode;
import org.junit.Assert;
import org.junit.Test;

import static com.sl.algorithms.core.linear.array.ArrayOps.printArray;

public class BSTOpsTest extends BSTOps {

    @Test
    public void testIsValidBST() {
        TreeNode<Integer> bstNull = createBSTFromSortedArray(null);
        Assert.assertTrue(isBST(bstNull));
        Assert.assertEquals(null, bstNull);

        TreeNode<Integer> bstEmpty = createBSTFromSortedArray(new Integer[]{});
        Assert.assertTrue(isBST(bstEmpty));
        Assert.assertEquals(null, bstEmpty);

        Integer[] a1 = {1};
        TreeNode<Integer> bst1 = createBSTFromSortedArray(a1);
        Assert.assertTrue(isBST(bst1));
        Assert.assertEquals("1", bst1.toString());

        Integer[] a2 = {1,2};
        TreeNode<Integer> bst2 = createBSTFromSortedArray(a2);
        Assert.assertTrue(isBST(bst2));
        Assert.assertEquals("12", bst2.toString());

        Integer[] a3 = {1,2,3};
        TreeNode<Integer> bst3 = createBSTFromSortedArray(a3);
        Assert.assertTrue(isBST(bst3));
        Assert.assertEquals("213", bst3.toString());

        Integer[] a4 = {1,2,3,4};
        TreeNode<Integer> bst4 = createBSTFromSortedArray(a4);
        Assert.assertTrue(isBST(bst4));
        Assert.assertEquals("2134", bst4.toString());

        Integer[] a5 = {1,2,3,4,5};
        TreeNode<Integer> bst5 = createBSTFromSortedArray(a5);
        Assert.assertTrue(isBST(bst5));
        Assert.assertEquals("31245", bst5.toString());
        Assert.assertEquals(bst5, findNode(bst5, 3));
        Assert.assertEquals(new TreeNode<>(2), findNode(bst5, 2));
    }

    @Test
    public void testConvertToSortedArrayNull() {
        Assert.assertEquals("[]", printArray(convertToSortedArray(null)));
    }

    @Test
    public void testCreateBSTFromSortedArray() {
        Integer[] a = {1,2,3,4,5};
        TreeNode<Integer> bst = createBSTFromSortedArray(a);
        Assert.assertTrue(isBST(bst));
        Assert.assertEquals(computeHeight(bst), 3);
        Integer[] b = convertToSortedArray(bst);
        Assert.assertTrue(ArrayOps.haveSameData(a, b));
    }

    @Test
    public void testCreateBSTFromSortedList() {
        Integer[] a = {1,2,3,4,5};
        ListNode<Integer> listNode = LinkedListOps.createLinkedList(a);
        TreeNode<Integer> bstNode = createBSTFromSortedList(listNode);
        Assert.assertTrue(isBST(bstNode));
        Assert.assertEquals(computeHeight(bstNode), 3);
        Integer[] b = convertToSortedArray(bstNode);
        Assert.assertTrue(ArrayOps.haveSameData(a, b));
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

        Integer[] a = {1,2,3,4,5};
        TreeNode<Integer> bstNode = createBSTFromSortedArray(a);

        TreeNode<Integer> resultNode = findNode(bstNode, 6);
        Assert.assertTrue(resultNode == null);

        resultNode = findNode(bstNode, 2);
        TreeNode<Integer> sampleNode = new TreeNode<>(2);
        Assert.assertTrue(resultNode.equals(sampleNode));

        Assert.assertTrue(resultNode.hashCode() == sampleNode.hashCode());

        Assert.assertTrue(findMinimum(bstNode).value == 1);
        Assert.assertTrue(findMaximum(bstNode).value == 5);
    }

    @Test
    public void testAddNode() {
        TreeNode<Integer> newBST = addNode(null, 1);
        Assert.assertTrue(newBST.equals(new TreeNode<>(1)));

        Integer[] a = {1,2,3,4};
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
    }

    @Test
    public void testAddNodeIterative() {
        Integer[] a = {1,2,3,4};
        TreeNode<Integer> bst = createBSTFromSortedArray(a);
        Assert.assertTrue(isBST(bst));

        TreeNode<Integer> bstUpdated = addNodeIteratively(bst, 5);
        Assert.assertTrue(bstUpdated.equals(bst)); // by reference
        Assert.assertTrue(isBST(bstUpdated));

        Assert.assertEquals(bstUpdated.toString(), "21345");

        bstUpdated = addNodeIteratively(bst, 0);
        Assert.assertTrue(isBST(bstUpdated));
        Assert.assertEquals(bstUpdated.toString(), "210345");
    }

    @Test
    public void testRemoveNode() {
        Assert.assertNull(removeNode(null, 2));

        Integer[] a = {1,2,3,4,5};
        TreeNode<Integer> bstUpdated = removeNode(createBSTFromSortedArray(a), 3);
        Assert.assertTrue(bstUpdated.value == 4);
        Assert.assertEquals(bstUpdated.toString(), "4125");

        TreeNode<Integer> bstUpdatedLeft = removeNode(createBSTFromSortedArray(a), 1);
        Assert.assertTrue(bstUpdatedLeft.value == 3);
        Assert.assertEquals(bstUpdatedLeft.toString(), "3245");

        TreeNode<Integer> bstUpdatedRight = removeNode(createBSTFromSortedArray(a), 4);
        Assert.assertTrue(bstUpdatedRight.value == 3);
        Assert.assertEquals(bstUpdatedRight.toString(), "3125");
    }
}
