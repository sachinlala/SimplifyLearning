package com.sl.algorithms.sort.generalpurpose.heap;

import static com.sl.algorithms.core.utils.ArrayOps.swap;

import com.sl.algorithms.core.interfaces.sort.SortingEngine;
import com.sl.algorithms.core.list.ListNode;

/**
 * <p>An in-place non-stable sort algorithm with O(nlogn) time-complexity.</p> <br><a
 * href="https://brilliant.org/wiki/heap-sort/">Reference Reading 1</a> <br><a
 * href="https://www.hackerearth.com/practice/algorithms/sorting/heap-sort/tutorial/">Reference
 * Reading 3</a>
 */
public class HeapSort<T extends Comparable> implements SortingEngine<T> {

  private HeapType heapType;

  public HeapSort(HeapType _heapType) {
    heapType = _heapType;
  }

  @Override
  public void sort(T[] objects) {
    checkArray(objects);
    int n = objects.length;
    if (n == 1) {
      return;
    }
    heapSort(objects, n);
  }

  private void heapSort(T[] objects, int n) {
    buildHeap(objects, n);
    for (int i = n - 1; i > -1; i--) {
      swap(objects, 0, i);
      n--;
      heapify(objects, n, 0);
    }
  }

  private void buildHeap(T[] objects, int n) {
    for (int i = n / 2; i > -1; i--) {
      heapify(objects, n, i);
    }
  }

  // logN
  private void heapify(T[] objects, int n, int i) {
    switch (heapType) {
      case MAX_HEAP: {
        max_heapify(objects, n, i);
        break;
      }
      case MIN_HEAP: {
        min_heapify(objects, n, i);
        break;
      }
    }
  }

  @SuppressWarnings("unchecked")
  private void max_heapify(T[] a, int n, int i) {
    int max = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    if (left < n && a[left].compareTo(a[max]) > 0) {
      max = left;
    }
    if (right < n && a[right].compareTo(a[max]) > 0) {
      max = right;
    }
    if (max != i) { // 1 or 2 of the above 2 checks were true
      swap(a, i, max);
      max_heapify(a, n, max);
    }
  }

  @SuppressWarnings("unchecked")
  private void min_heapify(T[] a, int n, int i) {
    int min = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    if (left < n && a[left].compareTo(a[min]) < 0) {
      min = left;
    }
    if (right < n && a[right].compareTo(a[min]) < 0) {
      min = right;
    }
    if (min != i) {
      swap(a, min, i);
      min_heapify(a, n, min);
    }
  }

  @Override
  public ListNode<T> sortList(ListNode<T> head) {
    throw new UnsupportedOperationException();
  }
}
