package com.sl.algorithms.core.strings.codec;

import com.sl.algorithms.core.interfaces.strings.codec.Decoder;
import org.junit.Assert;
import org.junit.Test;

public class CodecTest {

  @Test
  public void assertDecode() {
    Decoder decoder = new Codec();
    Assert.assertEquals(null, decoder.decode(null));
    Assert.assertEquals("", decoder.decode(""));
    Assert.assertEquals("a", decoder.decode("a"));
    Assert.assertEquals("aa", decoder.decode("2[a]"));
    Assert.assertEquals("a", decoder.decode("1[a]"));
    Assert.assertEquals("aaaaaaaaaaaa", decoder.decode("12[a]"));
    Assert.assertEquals("ab", decoder.decode("ab"));
    Assert.assertEquals("abab", decoder.decode("2[ab]"));
    Assert.assertEquals("abbabb", decoder.decode("2[a2[b]]"));
    Assert.assertEquals("bcacabcacabcaca", decoder.decode("3[b2[ca]]"));
  }
}
