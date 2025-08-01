package com.sl.algorithms.core.utils;

import java.util.ArrayList;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

public class FormulasTest extends Formulas {

  @Test
  public void midPointTest() {
    assertEquals(1, midPoint(1, 2));
    assertEquals(2, midPoint(1, 3));
    assertEquals(1, midPoint(0, 2));
  }

  @Test
  public void midPointTestLargeRange() {
    assertEquals(Integer.MAX_VALUE / 2, midPoint(0, Integer.MAX_VALUE));
  }

  @Test
  public void midPointTestLargeNumbers() {
    assertEquals(Integer.MAX_VALUE, midPoint(Integer.MAX_VALUE, Integer.MAX_VALUE));
  }

  @Test
  public void hcfTest() {
    assertEquals(hcf(0, 0), 0);
    assertEquals(hcf(3, 0), 3);
    assertEquals(hcf(0, 1), 1);
    assertEquals(hcf(3, 2), 1);
    assertEquals(hcf(4, 2), 2);
    assertEquals(hcf(6, 2), 2);
    assertEquals(hcf(7, 2), 1);
    assertEquals(hcf(2, 7), 1);
    assertEquals(hcf(6, 3), 3);
    assertEquals(hcf(18, 12), 6);
    assertEquals(hcf(5, 6), 1);
    assertEquals(hcf(5, 7), 1);
  }

  @Test
  public void testOrderOf() {
    assertEquals(1, orderOf(1));
    assertEquals(2, orderOf(10));
    assertEquals(3, orderOf(100));
    assertEquals(3, orderOf(153));
  }

  @Test
  public void testRaiseTo() {
    assertEquals(0, raiseTo(0, 100));
    assertEquals(1, raiseTo(100, 0));
    assertEquals(2, raiseTo(2, 1));
    assertEquals(-2, raiseTo(-2, 1));
    assertEquals(27, raiseTo(3, 3));
    assertEquals(32, raiseTo(2, 5));
    assertEquals(-32, raiseTo(-2, 5));
    assertEquals(1024, raiseTo(2, 10));
    assertEquals(1024, raiseTo(-2, 10));
    assertEquals(1048576, raiseTo(-2, 20));
    assertEquals(1073741824, raiseTo(2, 30));
    assertEquals(2147483647, raiseTo(2, 31));
  }

  @Test
  public void testPrintArmstrongNumbers() {
    assertEquals(true, isArmstrongNumber(153));
    //final int[] ARMSTRONG_NUMBERS = new int[]{1, 2, 3, 4, 5, 6, 7, 8, 9, 153, 370, 371, 407, 1634, 8208, 9474, 54748, 92727, 93084, 548834, 1741725, 4210818, 9800817, 9926315, 24678050, 24678051, 88593477, 146511208, 472335975, 534494836, 912985153};
    final int[] armstrongNumbers = new int[]{1, 2, 3, 4, 5, 6, 7, 8, 9, 153, 370, 371, 407};
    List<Integer> armstrongNumbersList = new ArrayList<>();
    for (int an : armstrongNumbers) {
      armstrongNumbersList.add(an);
    }
    try {
      List<Integer> armstrongList = printArmstrongNumbers(1000);
      assertEquals(13, armstrongList.size());
      assertTrue(ArrayOps.haveSameData(armstrongNumbersList, armstrongList));
    } catch (InterruptedException ie) {
      fail(ie.getMessage());
    }
  }

  @Test
  public void testIsNeonNumber() {
    assertTrue(isNeonNumber(0));
    assertTrue(isNeonNumber(1));
    assertFalse(isNeonNumber(2));
    assertTrue(isNeonNumber(9));
    assertFalse(isNeonNumber(10));
    assertFalse(isNeonNumber(13));
    assertFalse(isNeonNumber(81));
    assertFalse(isNeonNumber(343));
  }

  @Test
  public void testHaveSameDigitsAndLength() {
    assertTrue(haveSameDigitsAndLength(12, 21));
    assertTrue(haveSameDigitsAndLength(123, 132));
    assertTrue(haveSameDigitsAndLength(123456789, 987654321));
    assertTrue(haveSameDigitsAndLength(1999999999, 1999999999));

    assertFalse(haveSameDigitsAndLength(10, 11));
    assertFalse(haveSameDigitsAndLength(0, 10));
    assertFalse(haveSameDigitsAndLength(12, 211));
    assertFalse(haveSameDigitsAndLength(21, 102));
    assertFalse(haveSameDigitsAndLength(102, 21));
    assertFalse(haveSameDigitsAndLength(3, 33));
    assertFalse(haveSameDigitsAndLength(123, 1234));
    assertFalse(haveSameDigitsAndLength(123, 4123));
    assertFalse(haveSameDigitsAndLength(12345679, 976543210));
  }

  @Test
  public void testHaveSameDigitsAndLengthPrimes() {
    assertTrue(haveSameDigitsAndLengthPrimes(12, 21));
    assertTrue(haveSameDigitsAndLengthPrimes(123, 132));
    assertTrue(haveSameDigitsAndLengthPrimes(123456789, 987654321));
    assertTrue(haveSameDigitsAndLengthPrimes(1999999999, 1999999999));

    assertFalse(haveSameDigitsAndLengthPrimes(10, 11));
    assertFalse(haveSameDigitsAndLengthPrimes(0, 10));
    assertFalse(haveSameDigitsAndLengthPrimes(21, 102));
    assertFalse(haveSameDigitsAndLengthPrimes(102, 21));
    assertFalse(haveSameDigitsAndLengthPrimes(12, 211));
    assertFalse(haveSameDigitsAndLengthPrimes(3, 33));
    assertFalse(haveSameDigitsAndLengthPrimes(123, 1234));
    assertFalse(haveSameDigitsAndLengthPrimes(123, 4123));
    assertFalse(haveSameDigitsAndLengthPrimes(12345679, 976543210));
  }

  @Test
  public void testIsPalindrome() {
    assertTrue(isPalindrome(22));
    assertTrue(isPalindrome(222));
    assertTrue(isPalindrome(2442));
    assertTrue(isPalindrome(343));
  }

  @Test
  public void testPrimality() {
    assertFalse(isPrimeNumber(0));
    assertFalse(isPrimeNumber(1));
    assertTrue(isPrimeNumber(2));
    assertTrue(isPrimeNumber(3));
    assertFalse(isPrimeNumber(4));
    assertTrue(isPrimeNumber(5));
    assertTrue(isPrimeNumber(7));
    assertFalse(isPrimeNumber(20));
    assertTrue(isPrimeNumber(41));
    assertFalse(isPrimeNumber(45));
    assertFalse(isPrimeNumber(57));
    assertTrue(isPrimeNumber(67));
    assertTrue(isPrimeNumber(83));
    assertTrue(isPrimeNumber(191));
    assertFalse(isPrimeNumber(10001));
    assertFalse(isPrimeNumber(10003));
    assertTrue(isPrimeNumber(10007));
  }

  @Test
  public void testPrimalityLargeNumber() {
    assertFalse(isPrimeNumber(239124949));
    assertFalse(isPrimeNumber(239124947));
  }

  @Test
  public void testEulerPrimes() {
    assertTrue(isPrimeNumber(6700417));
    assertTrue(isPrimeNumber(2147483647)); // [2*pow(31)-1]
  }
}
