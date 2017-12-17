package com.sl.algorithms.linear;

import org.junit.Assert;
import org.junit.Test;

import static com.sl.algorithms.linear.BoyerMooreVoting.findMajorityElement;
import static com.sl.algorithms.linear.BoyerMooreVoting.isMajority;

public class BoyerMooreVotingTest {
    @Test
    public void testBoyerMooreVoting() {
        int[] nums1 = new int[]{1}; // size=1, 1's count=1
        Assert.assertEquals(1, findMajorityElement(nums1));
        Assert.assertTrue(isMajority(nums1, findMajorityElement(nums1)));

        int[] nums2 = new int[]{1, 1}; // size=2, 1's count=2
        Assert.assertEquals(1, findMajorityElement(nums2));
        Assert.assertTrue(isMajority(nums2, findMajorityElement(nums2)));

        int[] nums3 = new int[]{1, 2, 2}; // size=3, 2's count=2 > 3/2
        Assert.assertEquals(2, findMajorityElement(nums3));
        Assert.assertTrue(isMajority(nums3, findMajorityElement(nums3)));

        int[] nums4 = new int[]{1, 2, 1, 2, 1}; // size=5, 1's count=3 > 5/2
        Assert.assertEquals(1, findMajorityElement(nums4));
        Assert.assertTrue(isMajority(nums4, findMajorityElement(nums4)));

        int[] nums5 = new int[]{1, 3, 5, 5, 5, 5, 4, 1, 5}; // size=9, 5's count=5 > 9/2
        Assert.assertEquals(5, findMajorityElement(nums5));
        Assert.assertTrue(isMajority(nums5, findMajorityElement(nums5)));
    }

    @Test
    public void testBoyerMooreVotingOutliers() {
        int[] outlier1 = new int[]{4, 1, 2, 2, 3, 3, 2}; // size=7, 2's count=3 <= 7/2
        Assert.assertFalse(isMajority(outlier1, findMajorityElement(outlier1)));

        int[] outlier2 = new int[]{-1, -10, -10, 3, 3, -10}; // size=6, -10's count=3 == 6/3
        Assert.assertFalse(isMajority(outlier2, findMajorityElement(outlier2)));

        int[] outlier3 = new int[]{4, 1, 2, 2, 3, 3}; // size=6, 2's count = 3's count = 2 < 6/2
        Assert.assertFalse(isMajority(outlier3, findMajorityElement(outlier3)));

        int[] outlier4 = new int[]{5, 4, 5, 2, 1, 1, 5, 5}; // size=8, 5's count=4 == 8/2
        Assert.assertFalse(isMajority(outlier4, findMajorityElement(outlier4)));

        int[] outlier5 = new int[]{1, 2, 6, 2, 2, 3, 3, 2, 3, 2, 5, 10, 3, 1, 3, 4, 3, 7, 3, 5}; // size=20, 3's count=7 < 20/2
        Assert.assertFalse(isMajority(outlier5, findMajorityElement(outlier5)));
    }
}