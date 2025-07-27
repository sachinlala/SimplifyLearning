package com.sl.algorithms.core.strings.codec;

import com.sl.algorithms.core.interfaces.strings.codec.Decoder;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

public class CodecTest {

  @Test
  public void assertDecode() {
    Decoder decoder = new Codec();
    assertEquals(null, decoder.decode(null));
    assertEquals("", decoder.decode(""));
    assertEquals("a", decoder.decode("a"));
    assertEquals("aa", decoder.decode("2[a]"));
    assertEquals("a", decoder.decode("1[a]"));
    assertEquals("aaaaaaaaaaaa", decoder.decode("12[a]"));
    assertEquals("ab", decoder.decode("ab"));
    assertEquals("abab", decoder.decode("2[ab]"));
    assertEquals("abbabb", decoder.decode("2[a2[b]]"));
    assertEquals("bcacabcacabcaca", decoder.decode("3[b2[ca]]"));
  }
}
