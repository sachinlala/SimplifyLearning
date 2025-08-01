package com.sl.algorithms.core.utils;

import com.sl.algorithms.core.interfaces.base.Constants;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

@SuppressWarnings("javadoc")
public class Formulas implements Constants {

  Formulas() {
    /**
     * This is a utility class.<br>
     */
  }

  public static int midPoint(int start, int end) {
    int mid = start + (end - start) / 2; // the 2nd part is to prevent integer overflow
    return mid;
  }

  /**
   * O(log(n)) solution, based on the works of Euclid and Aryabhatta.<br>
   *
   * @param a integer
   * @param b integer
   * @return HCF
   */
  public static int hcf(int a, int b) {
    if (a == 0) {
      return b;
    }
    if (b == 0) {
      return a;
    }
    while (a != b) {
      if (a < b) {
        b -= a;
      } else {
        a -= b;
      }
    }
    return a;
  }

  // O(n^1/2)
  public static boolean isPrimeNumber(long n) {
    if (n <= 1) {
      return false;
    }
    if (n <= 3) {
      return true;
    }
    if (n % 2 == 0 || n % 3 == 0) {
      return false;
    }
    for (long i = 5; i * i <= n; i += 4) {
      if (n % i == 0 || n % (i + 2) == 0) {
        return false;
      }
    }
    return true;
  }

  /**
   * <a href="https://en.wikipedia.org/wiki/Narcissistic_number">Armstrong NumberOps</a>
   *
   * @param number input
   * @return true, when the number is Armstrong
   */
  public static boolean isArmstrongNumber(int number) {
    int sum = 0;
    int power = orderOf(number);
    for (int i = number; i > 0; i /= DECIMAL_RADIX) {
      sum += raiseTo(i % DECIMAL_RADIX, power);
    }
    return (sum == number);
  }

  public static int orderOf(int n) {
    int order = 0; // unknown
    int temp = n;
    while (temp != 0) {
      temp = temp / DECIMAL_RADIX;
      ++order;
    }
    return order;
  }

  //TODO: this can be improved further to handle large powers
  public static int raiseTo(int n, int p) {
    if (n == 0) {
      return 0;
    }
    if (p == 0) {
      return 1;
    }
    if (n == 1) {
      return n;
    }
    long result = n;
    int counter = 1;
    while (counter < p) {
      if (result * n >= Integer.MAX_VALUE) {
        return Integer.MAX_VALUE;
      }
      result *= n;
      counter++;
    }
    return (int) result;
  }

  /**
   * <a href="http://www.geeksforgeeks.org/neon-number/">Neon NumberOps</a>
   *
   * @param number input
   * @return true, when the number is Neon
   */
  public static boolean isNeonNumber(int number) {
    int sum = 0;
    for (int i = number * number; i > 0; i /= DECIMAL_RADIX) {
      sum += i % DECIMAL_RADIX;
    }
    return (sum == number);
  }

  /**
   * @param a 32-bit unsigned integer
   * @param b 32-bit unsigned integer
   * @return true, when a and b have same digits and length
   */
  public static boolean haveSameDigitsAndLengthPrimes(int a, int b) {
    int[] primes = {2, 3, 5, 7, 11, 13, 17, 19, 23, 29};
    int hashA = 1, hashB = 1;
    while (a > 0) {
      hashA *= primes[a % DECIMAL_RADIX];
      a /= DECIMAL_RADIX;
    }
    while (b > 0) {
      hashB *= primes[b % DECIMAL_RADIX];
      b /= DECIMAL_RADIX;
    }
    return (hashA == hashB);
  }

  public static boolean haveSameDigitsAndLength(int a, int b) {
    if ((a == 0 || b == 0) && a != b) {
      return false;
    }
    int[] digits = new int[DECIMAL_RADIX];
    int i = a, j = b;
    for (; i > 0 && j > 0; i /= DECIMAL_RADIX, j /= DECIMAL_RADIX) {
      ++digits[i % DECIMAL_RADIX];
      --digits[j % DECIMAL_RADIX];
    }
    if (i != 0 || j != 0) {
      return false;
    }
    for (int digit : digits) {
      if (digit != 0) {
        return false;
      }
    }
    return true;
  }

  /**
   * <br><a href="https://en.wikipedia.org/wiki/Palindromic_number">Palindromic NumberOps</a><br>
   * //O(n) time and O(1) space
   *
   * @param number input
   * @return true, when the number has palindrome pattern
   */
  public static boolean isPalindrome(int number) {
    if (number < 0) {
      return false;
    }
    if (number == 0) {
      return true;
    }
    if (number % DECIMAL_RADIX == 0) {
      return false;
    }
    int reverse = 0;
    while (number > reverse) {
      reverse = reverse * DECIMAL_RADIX + number % DECIMAL_RADIX;
      number /= DECIMAL_RADIX;
    }
    return (number == reverse || number == reverse / DECIMAL_RADIX);
  }

  public static List<Integer> printArmstrongNumbers(int upperBound) throws InterruptedException {
    List<Integer> outputList = new ArrayList<>();
    ExecutorService executorService = Executors
        .newFixedThreadPool(Runtime.getRuntime().availableProcessors());
    int batchSize = 1000;
    long index = 1;
    while (index < upperBound) {
      long start = index;
      long end = (index + batchSize) <= upperBound ? index + batchSize : upperBound;
      executorService.execute(new Runnable() {
        @Override
        public void run() {
          for (long i = start; i < end; i++) {
            int numberToInspect = (int) i;
            if (isArmstrongNumber(numberToInspect)) {
              outputList.add(numberToInspect);
            }
          }
        }
      });
      index = end;
    }
    executorService.shutdown();
    executorService.awaitTermination(1, TimeUnit.MINUTES);
    return outputList;
  }
}
