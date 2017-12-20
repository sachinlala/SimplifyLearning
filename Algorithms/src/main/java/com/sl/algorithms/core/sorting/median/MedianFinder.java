package com.sl.algorithms.core.sorting.median;

import java.util.Arrays;
import java.util.PriorityQueue;
import java.util.Queue;
import java.util.Random;

import static com.sl.algorithms.core.linear.array.ArrayOps.swap;

/**
 * <br><a href="https://brilliant.org/wiki/median-finding-algorithm/#">Reference</a>
 */
public class MedianFinder {

    MedianFinder() {
        /**
         * This is a utility class.<br>
         */
    }

    static <T extends Comparable> void basicChecks(T[] objects) {
        if (objects == null || objects.length == 0) throw new IllegalArgumentException("Array is empty");
        if (!(objects instanceof Integer[] || objects instanceof String[])) {
            throw new IllegalArgumentException("Input has data-type which is not supported yet");
        }
    }

    /**
     * <br><u>Steps</u>:<br>
     * 1. Divide list into sub-lists.<br>
     * 2. Determine "approximate" median for each of the sub-lists.<br>
     * 3. Put all the medians into a new list and find the median of the new list.<br>
     */
    public static <T extends Comparable> T findMedian(T[] objects) {
        basicChecks(objects);
        if (objects.length == 1) return objects[0];
        return findKthSmallest(objects, 1+(objects.length/2));
    }

    private static <T extends Comparable> T findKthSmallest(T[] objects, int k) {
        shuffle(objects);
        k = objects.length - k;
        int low = 0;
        int high = objects.length - 1;
        while (low < high) {
            int j = partition(objects, low, high);
            if(j < k) {
                low = j + 1;
            } else if (j > k) {
                high = j - 1;
            } else {
                break;
            }
        }
        return objects[k];
    }

    private static <T extends Comparable> void shuffle(T a[]) {
        Random random = new Random();
        for (int index=1; index < a.length; index++) {
            int randomIndex = random.nextInt(index+1);
            swap(a, index, randomIndex);
        }
    }

    private static <T extends Comparable> Integer partition(T[] a, int low, int high) {
        int i = low;
        int j = high + 1;
        while(true) {
            while(i<high && (a[++i].compareTo(a[low]) < 0));
            while(j> low && (a[low].compareTo(a[--j]) < 0));
            if(i >= j) {
                break;
            }
            swap(a, i, j);
        }
        swap(a, low, j);
        return j;
    }
}

class MedianFinderBySort {
    // brute-force O(N*logN) solution, for reference only
    public static <T extends Comparable> T findMedianBySort(T[] objects) {
        MedianFinder.basicChecks(objects);
        if (objects.length == 1) return objects[0];
        return findKthSmallestBySort(objects, objects.length/2);
    }

    // brute-force O(N*logN) solution, for reference only
    // note: k start from 0
    public static <T extends Comparable> T findKthSmallestBySort(T[] objects, int k) {
        MedianFinder.basicChecks(objects);
        if (k > objects.length-1) throw new IllegalArgumentException("k is larger than highest index");
        Arrays.parallelSort(objects);
        return objects[k];
    }
}

class MedianFinderPQ {
    // O(N*logk) solution, for reference only
    public static <T extends Comparable> T findMedianPQ(T[] objects) {
        MedianFinder.basicChecks(objects);
        if (objects.length == 1) return objects[0];
        return findKthSmallestPQ(objects, objects.length/2);
    }

    //TODO: this needs further improvements
    // O(N*logk) solution, for reference only
    public static <T extends Comparable> T findKthSmallestPQ(T[] objects, int k) {
        MedianFinder.basicChecks(objects);
        if (k > objects.length - 1) throw new IllegalArgumentException("k is larger than highest index");
        if (objects.length == 1) return objects[0];
        Queue<T> priorityQueue = new PriorityQueue<>(objects.length);
        for (T obj : objects) {
            priorityQueue.add(obj);
            if (priorityQueue.size() > k) {
                priorityQueue.poll();
            }
        }
        return priorityQueue.peek();
    }
}