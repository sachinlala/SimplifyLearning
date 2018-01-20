package com.sl.algorithms.search.pigeonhole;

import com.sl.algorithms.core.interfaces.search.pigeonhole.DuplicateFinder;
import org.junit.Assert;
import org.junit.Test;

public class DuplFinderTest {

    private DuplicateFinder duplicateFinder;

    @Test
    public void testNaiveDuplicateFinder() {
        duplicateFinder = new AuxSpaceDupFinder();
        nullTests();
        noDuplicatesTest();
        testDuplicateFinder();
    }

    @Test
    public void testEfficientDuplicateFinder() {
        duplicateFinder = new ConstantSpaceDupFinder();
        nullTests();
        //N.A. noDuplicatesTest();
        testDuplicateFinder();
    }

    public void nullTests() {
        {
            int[] nums = null;
            try {
                duplicateFinder.findDuplicate(nums);
                Assert.fail("Test should have failed");
            } catch (IllegalArgumentException iae) {
                Assert.assertEquals(duplicateFinder.ARRAY_IS_NULL_EMPTY_SIZE_1, iae.getMessage());
            }
        }
        {
            int[] nums = {};
            try {
                duplicateFinder.findDuplicate(nums);
                Assert.fail("Test should have failed");
            } catch (IllegalArgumentException iae) {
                Assert.assertEquals(duplicateFinder.ARRAY_IS_NULL_EMPTY_SIZE_1, iae.getMessage());
            }
        }
        {
            int[] nums = {1};
            try {
                duplicateFinder.findDuplicate(nums);
                Assert.fail("Test should have failed");
            } catch (IllegalArgumentException iae) {
                Assert.assertEquals(duplicateFinder.ARRAY_IS_NULL_EMPTY_SIZE_1, iae.getMessage());
            }
        }
    }

    public void noDuplicatesTest() {
        {
            int[] nums = {1, 2, 0};
            try {
                int i = duplicateFinder.findDuplicate(nums);
                System.out.println(i);
                Assert.fail("Test should have failed");
            } catch (IllegalArgumentException iae) {
                Assert.assertEquals(duplicateFinder.NO_DUPLICATES_FOUND, iae.getMessage());
            }
        }
    }

    public void testDuplicateFinder() {
        {
            int[] nums = {2, 3, 5, 1, 2, 4}; // no one's at their expected place
            int expectedOutput = 2;
            int actualOutput = duplicateFinder.findDuplicate(nums);
            Assert.assertEquals(expectedOutput, actualOutput);
        }
        {
            int[] nums = {1, 2, 3, 4, 5, 5}; // everyone's expected is at their expected place, except one element (5)
            int expectedOutput = 5;
            int actualOutput = duplicateFinder.findDuplicate(nums);
            Assert.assertEquals(expectedOutput, actualOutput);
        }
    }
}
