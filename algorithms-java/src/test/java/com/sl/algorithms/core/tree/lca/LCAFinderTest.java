package com.sl.algorithms.core.tree.lca;

import com.sl.algorithms.core.interfaces.search.LowestCommonAncestor;
import com.sl.algorithms.core.tree.TreeNode;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

public class LCAFinderTest {

  private LowestCommonAncestor<Integer> lowestCommonAncestorI;
  private LowestCommonAncestor<String> lowestCommonAncestorS;

  @Test
  public void assertLCAIterative() {
    lowestCommonAncestorI = new LCAFinderIterative<>();
    lowestCommonAncestorS = new LCAFinderIterative<>();
    testNull();
    testSimpleTreeLCA();
    testParentChild();
    testOnlyLeft();
    testOnlyRight();
    testBST();
    testBSTLeft();
    testBSTRight();
  }

  @Test
  public void assertLCARecursive() {
    lowestCommonAncestorI = new LCAFinderRecursive<>();
    lowestCommonAncestorS = new LCAFinderRecursive<>();
    testNull();
    testSimpleTreeLCA();
    testParentChild();
    testOnlyLeft();
    testOnlyRight();
    testBST();
    testBSTLeft();
    testBSTRight();
  }

  private void testNull() {
    assertNull(lowestCommonAncestorI.findLCA(null, null, null));
    assertNull(lowestCommonAncestorI.findLCABST(null, null, null));
  }

  private void testSimpleTreeLCA() {
    TreeNode<Integer> bTree = new TreeNode<>(1);
    bTree.left = new TreeNode<>(2);
    bTree.right = new TreeNode<>(3);
    assertEquals(bTree, lowestCommonAncestorI.findLCA(bTree, bTree.left, bTree.right));
  }

  private void testParentChild() {
    TreeNode<String> bTree = new TreeNode<>("Sarika");
    bTree.left = new TreeNode<>("Roohani");
    bTree.right = new TreeNode<>("Nikunj");
    assertEquals(bTree, lowestCommonAncestorS.findLCA(bTree, bTree.left, bTree.right));
    assertEquals(bTree, lowestCommonAncestorS.findLCA(bTree, bTree, bTree.right));
    assertEquals(bTree, lowestCommonAncestorS.findLCA(bTree, bTree.left, bTree));
  }

  private void testOnlyLeft() {
    TreeNode<Integer> bTree = new TreeNode<>(1);
    bTree.left = new TreeNode<>(2);
    bTree.right = new TreeNode<>(3);
    bTree.left.left = new TreeNode<>(4);
    assertEquals(bTree, lowestCommonAncestorI.findLCA(bTree, bTree.left.left, bTree.right));
  }

  private void testOnlyRight() {
    TreeNode<Integer> bTree = new TreeNode<>(1);
    bTree.left = new TreeNode<>(2);
    bTree.right = new TreeNode<>(3);
    bTree.right.right = new TreeNode<>(4);
    assertEquals(bTree, lowestCommonAncestorI.findLCA(bTree, bTree.left, bTree.right.right));
  }

  private void testBST() {
    TreeNode<Integer> bst = new TreeNode<>(2);
    bst.left = new TreeNode<>(1);
    bst.right = new TreeNode<>(3);
    assertEquals(bst, lowestCommonAncestorI.findLCABST(bst, bst.left, bst.right));
    assertEquals(bst, lowestCommonAncestorI.findLCABST(bst, bst, bst.right));
    assertEquals(bst, lowestCommonAncestorI.findLCABST(bst, bst.left, bst));
  }

  private void testBSTLeft() {
    TreeNode<Integer> bTree = new TreeNode<>(3);
    bTree.left = new TreeNode<>(2);
    bTree.right = new TreeNode<>(4);
    bTree.left.left = new TreeNode<>(1);
    assertEquals(bTree.left,
        lowestCommonAncestorI.findLCABST(bTree, bTree.left.left, bTree.left));
  }

  private void testBSTRight() {
    TreeNode<Integer> bTree = new TreeNode<>(2);
    bTree.left = new TreeNode<>(1);
    bTree.right = new TreeNode<>(3);
    bTree.right.right = new TreeNode<>(4);
    assertEquals(bTree.right,
        lowestCommonAncestorI.findLCABST(bTree, bTree.right, bTree.right.right));
  }
}
