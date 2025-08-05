package com.sl.algorithms.core.utils;

import static com.sl.algorithms.core.utils.ArrayOps.printArray;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

public class NumberOpsTest extends NumberOps {

  @Test
  public void testCountDigits() {
    assertEquals(1, countDigits(-1));
    assertEquals(1, countDigits(0));
    assertEquals(1, countDigits(1));
    assertEquals(2, countDigits(10));
    assertEquals(9, countDigits(123456789));
    assertEquals(2, countDigits(-10));
    assertEquals(10, countDigits(1999999999));
  }

  @Test
  public void assertReverse() {
    assertEquals(-522222222, reverse(-222222225));
    assertEquals(-65536, reverse(-63556));
    assertEquals(-1, reverse(-1));
    assertEquals(0, reverse(0));
    assertEquals(1, reverse(1));
    assertEquals(21, reverse(12));
    assertEquals(999, reverse(999));
    assertEquals(63556, reverse(65536));
    assertEquals(65536, reverse(63556));
    assertEquals(522222222, reverse(222222225));
    assertEquals(0, reverse(1534236469));
  }

  @Test
  public void testCountPrimes() {
    assertEquals(0, countPrimes(-1));
    assertEquals(0, countPrimes(0));
    assertEquals(0, countPrimes(1));
    assertEquals(0, countPrimes(2));
    assertEquals(1, countPrimes(3)); // 2
    assertEquals(2, countPrimes(4)); // 3,2
    assertEquals(2, countPrimes(5)); // 3,2
    assertEquals(3, countPrimes(6)); // 3,2
    assertEquals(1229, countPrimes(10000)); // 3,2
  }

  @Test
  public void testConvertToBinary() {
    assertEquals("0", convertToBinary(0));
    assertEquals("1", convertToBinary(1));
    assertEquals("10", convertToBinary(2));
    assertEquals("11", convertToBinary(3));
    assertEquals("100", convertToBinary(4));
    assertEquals("101", convertToBinary(5));
    assertEquals("110", convertToBinary(6));
    assertEquals("111", convertToBinary(7));
    assertEquals("1000", convertToBinary(8));
    assertEquals("10000", convertToBinary(16));
    assertEquals("1001001", convertToBinary(73));
    assertEquals("100101", convertToBinary(37));

    assertEquals(Integer.toBinaryString(0), convertToBinary(0));
    assertEquals(Integer.toBinaryString(1), convertToBinary(1));
    assertEquals(Integer.toBinaryString(2), convertToBinary(2));
    assertEquals(Integer.toBinaryString(3), convertToBinary(3));
    assertEquals(Integer.toBinaryString(4), convertToBinary(4));
    assertEquals(Integer.toBinaryString(5), convertToBinary(5));
    assertEquals(Integer.toBinaryString(6), convertToBinary(6));
    assertEquals(Integer.toBinaryString(7), convertToBinary(7));
    assertEquals(Integer.toBinaryString(8), convertToBinary(8));
    assertEquals(Integer.toBinaryString(16), convertToBinary(16));
    assertEquals(Integer.toBinaryString(73), convertToBinary(73));
    assertEquals(Integer.toBinaryString(37), convertToBinary(37));
  }

  @Test
  public void testConvertToDecimal() {
    assertEquals(0, convertToDecimal(0));
    assertEquals(1, convertToDecimal(1));
    assertEquals(2, convertToDecimal(10));
    assertEquals(3, convertToDecimal(11));
    assertEquals(4, convertToDecimal(100));
    assertEquals(5, convertToDecimal(101));
    assertEquals(6, convertToDecimal(110));
    assertEquals(7, convertToDecimal(111));
    assertEquals(8, convertToDecimal(1000));
    assertEquals(16, convertToDecimal(10000));
    assertEquals(73, convertToDecimal(1001001));
    assertEquals(37, convertToDecimal(100101));
    assertEquals(37, convertToDecimal("100101"));

    assertEquals(Integer.parseInt("0", 2), convertToDecimal(0));
    assertEquals(Integer.parseInt("1", 2), convertToDecimal(1));
    assertEquals(Integer.parseInt("10", 2), convertToDecimal(10));
    assertEquals(Integer.parseInt("11", 2), convertToDecimal(11));
    assertEquals(Integer.parseInt("100", 2), convertToDecimal(100));
    assertEquals(Integer.parseInt("101", 2), convertToDecimal(101));
    assertEquals(Integer.parseInt("110", 2), convertToDecimal(110));
    assertEquals(Integer.parseInt("111", 2), convertToDecimal(111));
    assertEquals(Integer.parseInt("1000", 2), convertToDecimal(1000));
    assertEquals(Integer.parseInt("10000", 2), convertToDecimal(10000));
    assertEquals(Integer.parseInt("1001001", 2), convertToDecimal(1001001));
    assertEquals(Integer.parseInt("100101", 2), convertToDecimal(100101));
  }

  @Test
  public void testConvertToArray() {
    assertEquals("[0]", printArray(convertToArray(0)));
    assertEquals("[1]", printArray(convertToArray(1)));
    assertEquals("[1,2,3]", printArray(convertToArray(123)));
    assertEquals("[1,0,0]", printArray(convertToArray(100)));
    assertEquals("[1,2,3,4,5,6,7,8,9,0]", printArray(convertToArray(1234567890)));
    assertEquals("[0,0,0]", printArray(convertToArray(-123)));
  }

  @Test
  public void testConvertToNumber() {
    assertEquals(0, convertToNumber(new int[]{}));
    assertEquals(0, convertToNumber(new int[]{0}));
    assertEquals(1, convertToNumber(new int[]{1}));
    assertEquals(123, convertToNumber(new int[]{1, 2, 3}));
    assertEquals(1234567890, convertToNumber(new int[]{1, 2, 3, 4, 5, 6, 7, 8, 9, 0}));
    assertEquals(1999999999, convertToNumber(new int[]{1, 9, 9, 9, 9, 9, 9, 9, 9, 9}));
    assertEquals(-1,
        convertToNumber(new int[]{9, 2, 2, 3, 3, 7, 2, 0, 3, 6, 8, 5, 4, 7, 7, 5, 8, 0, 6}));
  }

  @Test
  public void testConvertToNumberUsingPower() {
    assertEquals(0, convertToNumberUsingPower(new int[]{}));
    assertEquals(0, convertToNumberUsingPower(new int[]{0}));
    assertEquals(1, convertToNumberUsingPower(new int[]{1}));
    assertEquals(123, convertToNumberUsingPower(new int[]{1, 2, 3}));
    assertEquals(1234567890,
        convertToNumberUsingPower(new int[]{1, 2, 3, 4, 5, 6, 7, 8, 9, 0}));
    assertEquals(1999999999,
        convertToNumberUsingPower(new int[]{1, 9, 9, 9, 9, 9, 9, 9, 9, 9}));
    assertEquals(-1, convertToNumberUsingPower(new int[]{9, 1, 9, 9, 9, 9, 9, 9, 9, 9}));
  }

  @Test
  public void testPlusOne() {
    assertEquals("[]", printArray(plusOne(null)));
    assertEquals("[2]", printArray(plusOne(new Integer[]{1})));
    assertEquals("[1,0]", printArray(plusOne(new Integer[]{9})));
    assertEquals("[2,0]", printArray(plusOne(new Integer[]{1, 9})));
    assertEquals("[1,0,0]", printArray(plusOne(new Integer[]{9, 9})));
    assertEquals("[1,0,0,0]", printArray(plusOne(new Integer[]{9, 9, 9})));
  }
}
