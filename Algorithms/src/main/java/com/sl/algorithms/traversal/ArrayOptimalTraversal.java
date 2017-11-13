package com.sl.algorithms.traversal;

import com.sl.algorithms.maths.Formulas;

public class ArrayOptimalTraversal {

    /**
     * Problem: Rotate array of size 'n' by 'k' positions, leftwards (counter-clockwise).<br>
     * Approach: Reverse 0->k elements, then reverse k+1->n elements, finally reverse the whole array.<br>
     * Time = O(n) <-- Traversal upto 'n', 3 times.<br>
     * Space = O(1)<br>
     */
    public static int[] rotateLeftByReversal(int[] a, int k) {
        if (k >= a.length) {
            k = k%a.length;
        }
        a = reverse(a, 0, k-1);
        a = reverse(a, k, a.length-1);
        a = reverse(a, 0, a.length-1);
        return a;
    }

    /**
     * Problem: Rotate array of size 'n' by 'k' positions, rightwards (clockwise).<br>
     * Approach: Reverse the array, then reverse k+1->n elements, finally reverse 0->k elements.<br>
     * Time = O(n) <-- Traversal upto 'n', 3 times.<br>
     * Space = O(1)<br>
     */
    public static int[] rotateRightByReversal(int[] a, int k) {
        if (k >= a.length) {
            k = k%a.length;
        }
        a = reverse(a, 0, a.length-1);
        a = reverse(a, k, a.length-1);
        a = reverse(a, 0, k-1);
        return a;
    }

    public static int[] reverse(int[] a, int start, int end) {
        while (start < end) {
            int temp = a[start];
            a[start] = a[end];
            a[end] = temp;
            start++;
            end--;
        }
        return a;
    }

    /**
     * Problem: Rotate array of size 'n' by 'k' positions, leftwards (counter-clockwise).<br>
     * Approach: Juggle the elements, 'hcf(n,k)' times.<br>
     * Time = O(n)<br>
     * Space = O(1)<br>
     */
    public static int[] rotateLeftByJuggling(int[] a, int k) {
        int i, j, d, temp, n = a.length, hcf = Formulas.hcf(k, n);
        for (i = 0; i < hcf; i++)
        {
            temp = a[i];
            j = i;
            while (true)
            {
                d = j + k;
                if (d >= n)
                    d = d - n;
                d = d%n; // this is required to prevent overflow
                if (d == i)
                    break;
                a[j] = a[d];
                j = d;
            }
            a[j] = temp;
        }
        return a;
    }

    /**
     * <br>Find Smallest Missing Number for a Sorted Array<br>
     * <br>O(logN) time & O(1) space.<br>
     * <br>Limitation: cannot handle duplicates</>
     * @param arr : integers (sorted) >= 0 < Integer.MAX_VALUE
     * @param start 0
     * @param end length-1
     * @return int : minimum missing number >= 0 & <= Integer.MAX_VALUE
     */
    public static int findSmallestMissingNumberSorted(int[] arr, int start, int end) {
        if (arr == null || arr.length == 0) {
            return 0;
        }
        if (start > end) {
            return end+1;
        }
        if (arr[start] != start) {
            return start;
        }
        int mid = Formulas.midPoint(start, end);
        if (arr[mid]-arr[start] != (mid-start)) {
            return findSmallestMissingNumberSorted(arr, start, mid);
        }
        return findSmallestMissingNumberSorted(arr, mid+1, end);
    }

    /**
     * <br>Find Smallest Missing Number for a Sorted Array<br>
     * <br>O(N) time & O(1) space.<br>
     * <br>Limitation: cannot handle duplicates</>
     * @param arr : integers (sorted) >= 0 < Integer.MAX_VALUE
     * @return int : minimum missing number >= 0 & <= Integer.MAX_VALUE
     */
    public static int findSmallestMissingNumberSortedXOR(int[] arr) {
        if (arr == null || arr.length == 0) {
            return 0;
        }
        int xor = arr[0];
        for (int i=1; i<arr.length; i++) {
            xor = xor ^ arr[i] ^ i;
        }
        xor ^= arr.length;
        return xor;
    }

    /**
     * <br>Find Smallest Missing Number for a UnSorted Array.<br>
     * <br>O(n) time & O(1) space.<br>
     * @param arr : integers (unsorted) >= 0 < Integer.MAX_VALUE
     * @return int : minimum missing number > 0 & <= Integer.MAX_VALUE
     */
    public static int findSmallestMissingNumberUnsorted(int[] arr) {
        int i=0;
        int n=arr.length;
        while (i < n) {
            if (arr[i] > 0 && arr[i] < n && arr[i] != arr[arr[i]]) {
                int temp = arr[i];
                arr[i] = arr[temp];
                arr[temp] = temp;
            } else {
                i++;
            }
        }
        int k=1;
        while (k < n && arr[k] == k) {
            k++;
        }
        if (n == 0 || k < n) {
            return k;
        }
        if (arr[0] == k) {
            return k+1;
        }
        return k;
    }

    // Kadane's algo: O(n)
    public static int findMaxContiguousSumSubArray(int[] nums) {
        if (nums == null || nums.length == 0) {
            return 0;
        }
        if (nums.length == 1) {
            return nums[0];
        }
        int maxContiguousSum = Integer.MIN_VALUE;
        int maxTillHere = 0;
        for (int num : nums) {
            maxTillHere += num;
            maxContiguousSum = Math.max(maxContiguousSum, maxTillHere);
            if (maxTillHere < 0) {
                maxTillHere = 0;
            }
        }
        return maxContiguousSum;
    }

    //O(n)
    public static int findMaxNonNeighboursSumSubArray(int[] nums) {
        if (nums == null || nums.length == 0) {
            return 0;
        }
        if (nums.length == 1) {
            return nums[0];
        }
        if (nums.length == 2) {
            return Math.max(nums[0], nums[1]);
        }
        int maxSum = 0;
        int maxLeftSidePrevSum = nums[0];
        int maxLeftSideSum = nums[1];
        for (int i=2; i<nums.length; i++) {
            maxLeftSidePrevSum += nums[i];
            maxSum = Math.max(maxLeftSideSum, maxLeftSidePrevSum);
            maxLeftSidePrevSum = maxLeftSideSum;
            maxLeftSideSum = maxSum;
        }
        return maxSum;
    }

    public static int findMaxSubSequenceSum(int[] nums) {
        if (nums == null || nums.length == 0) {
            return 0;
        }
        if (nums.length == 1) {
            return nums[0];
        }
        int maxSum = Integer.MIN_VALUE;
        int maxNum = nums[0];
        for (int num : nums) {
            if (num > 0) {
                maxSum += num;
            }
            maxNum = Math.max(maxSum, num);
            maxSum = Math.max(maxSum, maxNum);
        }
        return maxSum;
    }
}
