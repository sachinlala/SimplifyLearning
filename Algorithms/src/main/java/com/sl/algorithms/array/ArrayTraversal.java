package com.sl.algorithms.array;

public class ArrayTraversal {
    // O(n)
    public static String printArray(int[] a) {
        if (a == null || a.length == 0) {
            return "[]";
        }
        StringBuilder output = new StringBuilder("[");
        for (int i=0; i<a.length-1; i++) {
            output = output.append(a[i]).append(",");
        }
        output.append(a[a.length-1]).append("]");
        return output.toString();
    }

    /**
     * Problem: Rotate array of size 'n' by 'k' positions, leftwards (counter-clockwise).<br>
     * Approach: Move one by one, 'k' times.<br>
     * Time = O(nk)<br>
     * Space = O(1)<br>
     */
    public static int[] rotateLeft(int a[], int k) {
        for (int i=0; i<k; i++){
            int j = 0;
            int temp = a[j];
            for (; j<a.length-1; j++) { // leave last element to be assigned with the staged value (temp)
                a[j] = a[j+1];
            }
            a[j] = temp;
        }
        return a;
    }

    /**
     * Problem: Rotate array of size 'n' by 'k' positions, rightwards (clockwise).<br>
     * Approach: Move one by one, 'k' times.<br>
     * Time = O(nk)<br>
     * Space = O(1)<br>
     */
    public static int[] rotateRight(int a[], int k) {
        for (int i=0; i<k; i++){
            int j = a.length - 1;
            int temp = a[j];
            for (; j>0; j--) { // leave last element to be assigned with the staged value (temp)
                a[j] = a[j-1];
            }
            a[j] = temp;
        }
        return a;
    }
}
