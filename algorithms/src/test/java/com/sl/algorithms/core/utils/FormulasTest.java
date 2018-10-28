package com.sl.algorithms.core.utils;

import java.util.ArrayList;
import java.util.List;
import org.junit.Assert;
import org.junit.Test;

public class FormulasTest extends Formulas {

  @Test
  public void midPointTest() {
    Assert.assertEquals(1, midPoint(1, 2));
    Assert.assertEquals(2, midPoint(1, 3));
    Assert.assertEquals(1, midPoint(0, 2));
  }

  @Test
  public void midPointTestLargeRange() {
    Assert.assertEquals(Integer.MAX_VALUE / 2, midPoint(0, Integer.MAX_VALUE));
  }

  @Test
  public void midPointTestLargeNumbers() {
    Assert.assertEquals(Integer.MAX_VALUE, midPoint(Integer.MAX_VALUE, Integer.MAX_VALUE));
  }

  @Test
  public void hcfTest() {
    Assert.assertEquals(hcf(0, 0), 0);
    Assert.assertEquals(hcf(3, 0), 3);
    Assert.assertEquals(hcf(0, 1), 1);
    Assert.assertEquals(hcf(3, 2), 1);
    Assert.assertEquals(hcf(4, 2), 2);
    Assert.assertEquals(hcf(6, 2), 2);
    Assert.assertEquals(hcf(7, 2), 1);
    Assert.assertEquals(hcf(2, 7), 1);
    Assert.assertEquals(hcf(6, 3), 3);
    Assert.assertEquals(hcf(18, 12), 6);
    Assert.assertEquals(hcf(5, 6), 1);
    Assert.assertEquals(hcf(5, 7), 1);
  }

  @Test
  public void testOrderOf() {
    Assert.assertEquals(1, orderOf(1));
    Assert.assertEquals(2, orderOf(10));
    Assert.assertEquals(3, orderOf(100));
    Assert.assertEquals(3, orderOf(153));
  }

  @Test
  public void testRaiseTo() {
    Assert.assertEquals(0, raiseTo(0, 100));
    Assert.assertEquals(1, raiseTo(100, 0));
    Assert.assertEquals(2, raiseTo(2, 1));
    Assert.assertEquals(-2, raiseTo(-2, 1));
    Assert.assertEquals(27, raiseTo(3, 3));
    Assert.assertEquals(32, raiseTo(2, 5));
    Assert.assertEquals(-32, raiseTo(-2, 5));
    Assert.assertEquals(1024, raiseTo(2, 10));
    Assert.assertEquals(1024, raiseTo(-2, 10));
    Assert.assertEquals(1048576, raiseTo(-2, 20));
    Assert.assertEquals(1073741824, raiseTo(2, 30));
    Assert.assertEquals(2147483647, raiseTo(2, 31));
  }

  @Test
  public void testPrintArmstrongNumbers() {
    Assert.assertEquals(true, isArmstrongNumber(153));
    //final int[] ARMSTRONG_NUMBERS = new int[]{1, 2, 3, 4, 5, 6, 7, 8, 9, 153, 370, 371, 407, 1634, 8208, 9474, 54748, 92727, 93084, 548834, 1741725, 4210818, 9800817, 9926315, 24678050, 24678051, 88593477, 146511208, 472335975, 534494836, 912985153};
    final int[] armstrongNumbers = new int[]{1, 2, 3, 4, 5, 6, 7, 8, 9, 153, 370, 371, 407};
    List<Integer> armstrongNumbersList = new ArrayList<>();
    for (int an : armstrongNumbers) {
      armstrongNumbersList.add(an);
    }
    try {
      List<Integer> armstrongList = printArmstrongNumbers(1000);
      Assert.assertEquals(13, armstrongList.size());
      Assert.assertTrue(ArrayOps.haveSameData(armstrongNumbersList, armstrongList));
    } catch (InterruptedException ie) {
      Assert.fail(ie.getMessage());
    }
  }

  @Test
  public void testIsNeonNumber() {
    Assert.assertTrue(isNeonNumber(0));
    Assert.assertTrue(isNeonNumber(1));
    Assert.assertFalse(isNeonNumber(2));
    Assert.assertTrue(isNeonNumber(9));
    Assert.assertFalse(isNeonNumber(10));
    Assert.assertFalse(isNeonNumber(13));
    Assert.assertFalse(isNeonNumber(81));
    Assert.assertFalse(isNeonNumber(343));
  }

  @Test
  public void testHaveSameDigitsAndLength() {
    Assert.assertTrue(haveSameDigitsAndLength(12, 21));
    Assert.assertTrue(haveSameDigitsAndLength(123, 132));
    Assert.assertTrue(haveSameDigitsAndLength(123456789, 987654321));
    Assert.assertTrue(haveSameDigitsAndLength(1999999999, 1999999999));

    Assert.assertFalse(haveSameDigitsAndLength(10, 11));
    Assert.assertFalse(haveSameDigitsAndLength(0, 10));
    Assert.assertFalse(haveSameDigitsAndLength(12, 211));
    Assert.assertFalse(haveSameDigitsAndLength(21, 102));
    Assert.assertFalse(haveSameDigitsAndLength(102, 21));
    Assert.assertFalse(haveSameDigitsAndLength(3, 33));
    Assert.assertFalse(haveSameDigitsAndLength(123, 1234));
    Assert.assertFalse(haveSameDigitsAndLength(123, 4123));
    Assert.assertFalse(haveSameDigitsAndLength(12345679, 976543210));
  }

  @Test
  public void testHaveSameDigitsAndLengthPrimes() {
    Assert.assertTrue(haveSameDigitsAndLengthPrimes(12, 21));
    Assert.assertTrue(haveSameDigitsAndLengthPrimes(123, 132));
    Assert.assertTrue(haveSameDigitsAndLengthPrimes(123456789, 987654321));
    Assert.assertTrue(haveSameDigitsAndLengthPrimes(1999999999, 1999999999));

    Assert.assertFalse(haveSameDigitsAndLengthPrimes(10, 11));
    Assert.assertFalse(haveSameDigitsAndLengthPrimes(0, 10));
    Assert.assertFalse(haveSameDigitsAndLengthPrimes(21, 102));
    Assert.assertFalse(haveSameDigitsAndLengthPrimes(102, 21));
    Assert.assertFalse(haveSameDigitsAndLengthPrimes(12, 211));
    Assert.assertFalse(haveSameDigitsAndLengthPrimes(3, 33));
    Assert.assertFalse(haveSameDigitsAndLengthPrimes(123, 1234));
    Assert.assertFalse(haveSameDigitsAndLengthPrimes(123, 4123));
    Assert.assertFalse(haveSameDigitsAndLengthPrimes(12345679, 976543210));
  }

  @Test
  public void testIsPalindrome() {
    Assert.assertTrue(isPalindrome(22));
    Assert.assertTrue(isPalindrome(222));
    Assert.assertTrue(isPalindrome(2442));
    Assert.assertTrue(isPalindrome(343));
  }

  @Test
  public void testPrimality() {
    Assert.assertFalse(isPrimeNumber(0));
    Assert.assertFalse(isPrimeNumber(1));
    Assert.assertTrue(isPrimeNumber(2));
    Assert.assertTrue(isPrimeNumber(3));
    Assert.assertFalse(isPrimeNumber(4));
    Assert.assertTrue(isPrimeNumber(5));
    Assert.assertTrue(isPrimeNumber(7));
    Assert.assertFalse(isPrimeNumber(20));
    Assert.assertTrue(isPrimeNumber(41));
    Assert.assertFalse(isPrimeNumber(45));
    Assert.assertFalse(isPrimeNumber(57));
    Assert.assertTrue(isPrimeNumber(67));
    Assert.assertTrue(isPrimeNumber(83));
    Assert.assertTrue(isPrimeNumber(191));
    Assert.assertFalse(isPrimeNumber(10001));
    Assert.assertFalse(isPrimeNumber(10003));
    Assert.assertTrue(isPrimeNumber(10007));
  }

  @Test
  public void testPrimalityLargeNumber() {
    Assert.assertFalse(isPrimeNumber(239124949));
    Assert.assertFalse(isPrimeNumber(239124947));
  }

  @Test
  public void testEulerPrimes() {
    Assert.assertTrue(isPrimeNumber(6700417));
    Assert.assertTrue(isPrimeNumber(2147483647)); // [2*pow(31)-1]
  }
}
