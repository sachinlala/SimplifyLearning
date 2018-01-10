package com.sl.algorithms.core.linear.array.transform;

import com.sl.algorithms.core.interfaces.rwops.ElementMover;
import com.sl.algorithms.core.utils.ArrayOps;

@SuppressWarnings("unchecked") // generic array cast and compareTo call
public class ZeroesMover<T extends Comparable> implements ElementMover<T> {

    // O(n) time and O(1) space, with optimal # operations in worst case
    public void moveZeroes(T[] nums) {
        Integer zero = 0;
        moveElement(nums, (T) zero);
    }

    @Override
    public void moveElement(T[] objects, T element) {
        objChecks(objects);
        int slow = 0, fast = 0;
        while (fast < objects.length) { // { 0, 1, 0, 3, 12 }
            if (objects[fast].compareTo(element) != 0) {
                ArrayOps.swap(objects, slow, fast);
                ++slow;
            }
            ++fast;
        }
    }

    // O(n) time and O(1) space, but # operations in worst-case is high (e.g. 00001)
    public void moveZeroesNoSwap(T[] nums) {
        int slow = 0, fast = 0;
        while (fast < nums.length) {
            if (nums[fast].compareTo(0) != 0) {
                nums[slow] = nums[fast];
                ++slow;
            }
            ++fast;
        }
        Integer zero = 0;
        while (slow < nums.length) {
            nums[slow] = (T) zero;
            ++slow;
        }
    }
}
