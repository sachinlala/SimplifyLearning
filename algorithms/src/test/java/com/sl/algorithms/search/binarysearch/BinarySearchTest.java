package com.sl.algorithms.search.binarysearch;

import static com.sl.algorithms.core.interfaces.search.Search.ELEMENT_NOT_FOUND;

import com.sl.algorithms.core.interfaces.search.Search;
import static org.junit.jupiter.api.Assertions.*;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.anyOf;
import static org.hamcrest.Matchers.is;
import org.junit.jupiter.api.Test;

public class BinarySearchTest {

  private Search<Integer> binarySearch;

  @Test
  public void testBinarySearchRecursive() {
    binarySearch = new RecursiveBinarySearch<>();
    testFindIndex();
  }

  @Test
  public void testBinarySearchIterative() {
    binarySearch = new IterativeBinarySearch<>();
    testFindIndex();
  }

  @Test
  public void testBinarySearchGeneric() {
    binarySearch = new GenericBinarySearch<>();
    testFindIndex();
    testFindIndexInRotatedArray();
    testRotatedArrayAllElementsSame();
    testRotatedSparseArray();
  }

  private void testFindIndex() {
    assertEquals(0, binarySearch.findIndex(new Integer[]{1}, 1));
    assertEquals(3, binarySearch.findIndex(new Integer[]{1, 2, 3, 4, 5, 6}, 4));
    assertEquals(ELEMENT_NOT_FOUND,
        binarySearch.findIndex(new Integer[]{1, 2, 3, 4, 5, 6}, 10));
    assertEquals(0, binarySearch.findIndex(new Integer[]{1, 2, 3, 4, 5, 6}, 1));
    assertEquals(5, binarySearch.findIndex(new Integer[]{1, 2, 3, 4, 5, 6}, 6));
  }

  private void testFindIndexInRotatedArray() {
    { // sorted & rotated array
      assertEquals(3, binarySearch.findIndex(new Integer[]{4, 5, 1, 2, 3}, 2));
      assertEquals(0, binarySearch.findIndex(new Integer[]{4, 5, 1, 2, 3}, 4));
      assertEquals(2, binarySearch.findIndex(new Integer[]{4, 5, 1, 2, 3}, 1));
      assertEquals(1, binarySearch.findIndex(new Integer[]{3, 4, 5, 1, 2}, 4));
      assertEquals(3, binarySearch.findIndex(new Integer[]{3, 4, 5, 1, 2}, 1));
      assertEquals(2, binarySearch.findIndex(new Integer[]{3, 4, 5, 1, 2}, 5));
      assertEquals(0, binarySearch.findIndex(new Integer[]{3, 4, 5, 1, 2}, 3));
      assertEquals(4, binarySearch.findIndex(new Integer[]{3, 4, 5, 1, 2}, 2));
      assertEquals(3, binarySearch.findIndex(new Integer[]{6, 7, 1, 2, 3, 4, 5}, 2));
      assertEquals(1, binarySearch.findIndex(new Integer[]{6, 7, 1, 2, 3, 4, 5}, 7));
      assertEquals(6, binarySearch.findIndex(new Integer[]{6, 7, 1, 2, 3, 4, 5}, 5));
    }
    { // sorted, rotated array, with duplicates
      assertEquals(0, binarySearch.findIndex(new Integer[]{3, 3, 4, 5, 1, 2}, 3));
      assertEquals(2, binarySearch.findIndex(new Integer[]{3, 3, 4, 5, 1, 2}, 4));
      assertEquals(3, binarySearch.findIndex(new Integer[]{3, 3, 4, 5, 1, 2}, 5));
      assertEquals(4, binarySearch.findIndex(new Integer[]{3, 3, 4, 5, 1, 2}, 1));
      assertEquals(5, binarySearch.findIndex(new Integer[]{3, 3, 4, 5, 1, 2}, 2));
      assertEquals(0, binarySearch.findIndex(new Integer[]{3, 3, 1}, 3));
      assertEquals(8,
          binarySearch.findIndex(new Integer[]{0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5}, 4));
    }
    { // sorted, rotated, has duplicates in the position where virtual trimming of array must be done during the binary search
      assertEquals(0, binarySearch.findIndex(new Integer[]{4, 5, 6, 7, 0, 0, 1, 2}, 4));
      assertEquals(1, binarySearch.findIndex(new Integer[]{4, 5, 6, 7, 0, 0, 1, 2}, 5));
      assertThat(binarySearch.findIndex(new Integer[]{4, 5, 6, 7, 0, 0, 1, 2}, 0),
          anyOf(is(4), is(5))); // special case
      assertEquals(6, binarySearch.findIndex(new Integer[]{4, 5, 6, 7, 0, 0, 1, 2}, 1));
    }
    {
      assertEquals(1, binarySearch.findIndex(new Integer[]{1, 3, 1, 1, 1}, 3));
    }
  }

  private void testRotatedArrayAllElementsSame() {
    { // sorted, rotated, all elements are same
      assertThat(binarySearch.findIndex(new Integer[]{1, 1, 1}, 1),
          anyOf(is(0), is(1), is(2))); // special case
    }
  }

  private void testRotatedSparseArray() {
    {
      assertEquals(2, binarySearch.findIndex(new Integer[]{1, 1, 2, 1, 1}, 2));
      assertEquals(2, binarySearch.findIndex(new Integer[]{1, 1, 2, 1, 1, 1}, 2));
      assertEquals(3, binarySearch.findIndex(new Integer[]{1, 1, 1, 2, 1, 1}, 2));
    }
    {
      Integer[] sparseArray = new Integer[1000];
      for (int i = 0; i < sparseArray.length; i++) {
        sparseArray[i] = 1;
        if (i == 699) {
          sparseArray[i] = 2;
        }
      }
      assertEquals(699, binarySearch.findIndex(sparseArray, 2));
    }
  }

  @Test
  public void testFindStartOfRotation() {
    binarySearch = new GenericBinarySearch<>();
    { // single element
      assertEquals(0,
          ((GenericBinarySearch<Integer>) binarySearch).findStartOfAscent(new Integer[]{1}));
    }
    { // regular sorted array
      assertEquals(0, ((GenericBinarySearch<Integer>) binarySearch)
          .findStartOfAscent(new Integer[]{1, 2, 3, 4, 5}));
    }
    { // sorted array, with duplicates
      assertEquals(0, ((GenericBinarySearch<Integer>) binarySearch)
          .findStartOfAscent(new Integer[]{1, 2, 3, 3, 4, 5}));
    }
    { // sorted & rotated array
      assertEquals(2, ((GenericBinarySearch<Integer>) binarySearch)
          .findStartOfAscent(new Integer[]{4, 5, 1, 2, 3}));
      assertEquals(3, ((GenericBinarySearch<Integer>) binarySearch)
          .findStartOfAscent(new Integer[]{3, 4, 5, 1, 2}));
    }
    { // sorted, rotated array, with duplicates
      assertEquals(4, ((GenericBinarySearch<Integer>) binarySearch)
          .findStartOfAscent(new Integer[]{3, 3, 4, 5, 1, 2}));
      assertEquals(2,
          ((GenericBinarySearch<Integer>) binarySearch).findStartOfAscent(new Integer[]{3, 3, 1}));
    }
    { // sorted, rotated, all elements same
      assertEquals(0,
          ((GenericBinarySearch<Integer>) binarySearch).findStartOfAscent(new Integer[]{1, 1, 1}));
    }
  }
}
