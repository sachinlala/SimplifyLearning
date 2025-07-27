package com.sl.algorithms.core.utils;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

public class StringOpsTest extends StringOps {

  @Test
  public void assertAtoi() {
    assertEquals(0, atoi(null));
    assertEquals(0, atoi(""));
    assertEquals(0, atoi(" "));
    assertEquals(0, atoi("small"));
    assertEquals(0, atoi("CAPS"));
    assertEquals(0, atoi("Special$#"));
    assertEquals(0, atoi(".123"));
    assertEquals(123, atoi("123"));
    assertEquals(123, atoi("123.3"));
    assertEquals(123, atoi("123.9"));
    assertEquals(-46, atoi("-46"));
    assertEquals(1534236469, atoi("1534236469"));
    assertEquals(-1534236469, atoi("-1534236469"));
    assertEquals(10, atoi("    010"));
    assertEquals(0, atoi("+"));
    assertEquals(4500, atoi("     +004500"));
    assertEquals(-4500, atoi("     -004500"));
    assertEquals(-12, atoi("  -0012a42"));
    assertEquals(2147483647, atoi("2147483648"));
    assertEquals(-2147483647, atoi("-2147483647"));
    assertEquals(-2147483648, atoi("-2147483648"));
    assertEquals(-2147483648, atoi("      -11919730356x"));
  }

  @Test
  public void assertFindPermutations() {
    { // base cases
      assertEquals(0, findPermutations(null).size());
      assertEquals("[]", findPermutations("").toString());
    }
    { // no letters
      assertEquals("[12345]", findPermutations("12345").toString());
    }
    { // lower case
      assertEquals("[A1, a1]", findPermutations("a1").toString());
      assertEquals("[AB, aB, Ab, ab]", findPermutations("ab").toString());
      assertEquals("[A1B, a1B, A1b, a1b]", findPermutations("a1b").toString());
      assertEquals("[ABC, aBC, AbC, abC, ABc, aBc, Abc, abc]",
          findPermutations("abc").toString());
      assertEquals("[A1B2C, a1B2C, A1b2C, a1b2C, A1B2c, a1B2c, A1b2c, a1b2c]",
          findPermutations("a1b2c").toString());
      assertEquals(
          "[ABCD, aBCD, AbCD, abCD, ABcD, aBcD, AbcD, abcD, ABCd, aBCd, AbCd, abCd, ABcd, aBcd, Abcd, abcd]",
          findPermutations("abcd").toString());
    }
    { // upper case
      assertEquals("[A1, a1]", findPermutations("A1").toString());
      assertEquals("[AB, aB, Ab, ab]", findPermutations("AB").toString());
      assertEquals("[A1B, a1B, A1b, a1b]", findPermutations("A1B").toString());
      assertEquals("[ABC, aBC, AbC, abC, ABc, aBc, Abc, abc]",
          findPermutations("ABC").toString());
      assertEquals("[A1B2C, a1B2C, A1b2C, a1b2C, A1B2c, a1B2c, A1b2c, a1b2c]",
          findPermutations("A1B2C").toString());
      assertEquals(
          "[ABCD, aBCD, AbCD, abCD, ABcD, aBcD, AbcD, abcD, ABCd, aBCd, AbCd, abCd, ABcd, aBcd, Abcd, abcd]",
          findPermutations("ABCD").toString());
    }
  }
}
