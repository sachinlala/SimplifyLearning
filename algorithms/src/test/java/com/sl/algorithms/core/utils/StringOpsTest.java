package com.sl.algorithms.core.utils;

import org.junit.Assert;
import org.junit.Test;

public class StringOpsTest extends StringOps {

  @Test
  public void assertAtoi() {
    Assert.assertEquals(0, atoi(null));
    Assert.assertEquals(0, atoi(""));
    Assert.assertEquals(0, atoi(" "));
    Assert.assertEquals(0, atoi("small"));
    Assert.assertEquals(0, atoi("CAPS"));
    Assert.assertEquals(0, atoi("Special$#"));
    Assert.assertEquals(0, atoi(".123"));
    Assert.assertEquals(123, atoi("123"));
    Assert.assertEquals(123, atoi("123.3"));
    Assert.assertEquals(123, atoi("123.9"));
    Assert.assertEquals(-46, atoi("-46"));
    Assert.assertEquals(1534236469, atoi("1534236469"));
    Assert.assertEquals(-1534236469, atoi("-1534236469"));
    Assert.assertEquals(10, atoi("    010"));
    Assert.assertEquals(0, atoi("+"));
    Assert.assertEquals(4500, atoi("     +004500"));
    Assert.assertEquals(-4500, atoi("     -004500"));
    Assert.assertEquals(-12, atoi("  -0012a42"));
    Assert.assertEquals(2147483647, atoi("2147483648"));
    Assert.assertEquals(-2147483647, atoi("-2147483647"));
    Assert.assertEquals(-2147483648, atoi("-2147483648"));
    Assert.assertEquals(-2147483648, atoi("      -11919730356x"));
  }

  @Test
  public void assertFindPermutations() {
    { // base cases
      Assert.assertEquals(0, findPermutations(null).size());
      Assert.assertEquals("[]", findPermutations("").toString());
    }
    { // no letters
      Assert.assertEquals("[12345]", findPermutations("12345").toString());
    }
    { // lower case
      Assert.assertEquals("[A1, a1]", findPermutations("a1").toString());
      Assert.assertEquals("[AB, aB, Ab, ab]", findPermutations("ab").toString());
      Assert.assertEquals("[A1B, a1B, A1b, a1b]", findPermutations("a1b").toString());
      Assert.assertEquals("[ABC, aBC, AbC, abC, ABc, aBc, Abc, abc]",
          findPermutations("abc").toString());
      Assert.assertEquals("[A1B2C, a1B2C, A1b2C, a1b2C, A1B2c, a1B2c, A1b2c, a1b2c]",
          findPermutations("a1b2c").toString());
      Assert.assertEquals(
          "[ABCD, aBCD, AbCD, abCD, ABcD, aBcD, AbcD, abcD, ABCd, aBCd, AbCd, abCd, ABcd, aBcd, Abcd, abcd]",
          findPermutations("abcd").toString());
    }
    { // upper case
      Assert.assertEquals("[A1, a1]", findPermutations("A1").toString());
      Assert.assertEquals("[AB, aB, Ab, ab]", findPermutations("AB").toString());
      Assert.assertEquals("[A1B, a1B, A1b, a1b]", findPermutations("A1B").toString());
      Assert.assertEquals("[ABC, aBC, AbC, abC, ABc, aBc, Abc, abc]",
          findPermutations("ABC").toString());
      Assert.assertEquals("[A1B2C, a1B2C, A1b2C, a1b2C, A1B2c, a1B2c, A1b2c, a1b2c]",
          findPermutations("A1B2C").toString());
      Assert.assertEquals(
          "[ABCD, aBCD, AbCD, abCD, ABcD, aBcD, AbcD, abcD, ABCd, aBCd, AbCd, abCd, ABcd, aBcd, Abcd, abcd]",
          findPermutations("ABCD").toString());
    }
  }
}
