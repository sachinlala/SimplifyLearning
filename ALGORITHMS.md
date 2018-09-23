#### [Core Interfaces](algorithms/src/main/java/com/sl/algorithms/core/interfaces)

|Algorithm Group|Content|
|---------------|-------|
|[Arrays](algorithms/src/main/java/com/sl/algorithms/core/array)|Counters, Rotation, Sub-Arrays|
|[Array Rotation](algorithms/src/main/java/com/sl/algorithms/core/array/rotation)|Doug Mcllroy, Jon Bentley, Gries-Mills|
|[Sub-Arrays](algorithms/src/main/java/com/sl/algorithms/core/array/subarray)|Kadane's Algo, Sub-Array vs. Sub-Sequence, Circular Array, Running Product|
|[List](algorithms/src/main/java/com/sl/algorithms/core/list)|LinkedList CRUD operations, Merge, Cycle Detection, Intersection Point etc.|
|[Stack](algorithms/src/main/java/com/sl/algorithms/core/stack)|Min Stack|
|[Strings](algorithms/src/main/java/com/sl/algorithms/core/strings)|Lapindrome, CoDec, Parenthesis Validators|
|[Tree](algorithms/src/main/java/com/sl/algorithms/core/tree)|Binary Tree, LCA Detection|

#### [Utils](algorithms/src/main/java/com/sl/algorithms/core/utils)
|Util|Content|
|----|-------|
|[Formulaes](algorithms/src/main/java/com/sl/algorithms/core/utils/Formulas.java)| LCM, HCF, MidPoint, Special Number (Prime, Armstrong, Neon), Raise-To etc.|
|[ArrayOps](algorithms/src/main/java/com/sl/algorithms/core/utils/ArrayOps.java)| Swap elements (singular, in blocks), Reverse, Deep Copy, Print, isEquals etc.|
|[LinkedListOps](algorithms/src/main/java/com/sl/algorithms/core/utils/LinkedListOps.java)| Insert, Remove, Reverse, Swap (in pairs), Increment, Re-Order etc.|
|[NumberOps](algorithms/src/main/java/com/sl/algorithms/core/utils/NumberOps.java)| Count Digits, Reverse, Count Primes, Convert Decimal to Binary (& vica-versa) etc.|
|[StringOps](algorithms/src/main/java/com/sl/algorithms/core/utils/StringOps.java)| Convert to Integer, Find Permutations, Count chars etc.|

#### [Element Search](algorithms/src/main/java/com/sl/algorithms/search)
|Requirement|Notable(s)|
|-----------|--------|
|[Linear Search](algorithms/src/main/java/com/sl/algorithms/search/linearsearch)| Basic O(n) traversal|
|[Binary Search](algorithms/src/main/java/com/sl/algorithms/search/binarysearch)| Generic, Iterative, Recursive|
|[Majority Element Finder](algorithms/src/main/java/com/sl/algorithms/search/majorityelement)|[Boyer Moore Voting](https://en.wikipedia.org/wiki/Boyer%E2%80%93Moore_majority_vote_algorithm)|
|[Median Finder](algorithms/src/main/java/com/sl/algorithms/search/median)|Quick Select, Priority Queue|
|[Next Greater Element Finder](algorithms/src/main/java/com/sl/algorithms/search/nge)|[Narayana Pandit Permutation Algorithm](http://www.tropicalcoder.com/APermutationOnCombinatorialAlgorithms.htm)|
|[Peak Element Search](algorithms/src/main/java/com/sl/algorithms/search/peakelement)|Bitonic Series, Linear & Logarithmic time-complexity|
|[Duplicate or Missing Element Search](algorithms/src/main/java/com/sl/algorithms/search/pigeonhole)|[Pigeonhole Principle](https://en.wikipedia.org/wiki/Pigeonhole_principle)|

#### [Shuffle](algorithms/src/main/java/com/sl/algorithms/shuffle)
|Technique|Characteristics|
|---------|---------------|
|[Naive](algorithms/src/main/java/com/sl/algorithms/shuffle/NaiveShuffle.java)| In-place, randomized, un-even probability.|
|[Fisher Yates Knuth Shuffle](algorithms/src/main/java/com/sl/algorithms/shuffle/FisherYatesKnuthShuffle.java)|In-place, randomized, equal probability, asymptotically optimal.|
|[Sattolo Shuffle](algorithms/src/main/java/com/sl/algorithms/shuffle/SattoloShuffle.java)|In-place, randomized, equal probability, asymptotically optimal, one cycle only.|

#### [Sort](algorithms/src/main/java/com/sl/algorithms/sort)
|Domain|Notable(s)|
|------|----------|
|[Finite Range](algorithms/src/main/java/com/sl/algorithms/sort/finitegroups)|[Counting Sort](algorithms/src/main/java/com/sl/algorithms/sort/finitegroups/integersorting/CountingSort.java), [Radix Sort](algorithms/src/main/java/com/sl/algorithms/sort/finitegroups/integersorting/RadixSort.java), [Bucket Sort](algorithms/src/main/java/com/sl/algorithms/sort/finitegroups/bucketsort), [Polish National Flags - for 2 groups](algorithms/src/main/java/com/sl/algorithms/sort/finitegroups/PolishNationalFlagSort.java), [Dutch National Flags - for 3 groups](algorithms/src/main/java/com/sl/algorithms/sort/finitegroups/DutchNationalFlagSort.java)|
|[Small Dataset](algorithms/src/main/java/com/sl/algorithms/sort/generalpurpose/smalldata)|[Bubble Sort](algorithms/src/main/java/com/sl/algorithms/sort/generalpurpose/smalldata/BubbleSort.java), [Insertion Sort](algorithms/src/main/java/com/sl/algorithms/sort/generalpurpose/smalldata/InsertionSort.java), [Selection Sort](algorithms/src/main/java/com/sl/algorithms/sort/generalpurpose/smalldata/SelectionSort.java)|
|[General Purpose](algorithms/src/main/java/com/sl/algorithms/sort/generalpurpose)|[Quick Sort](algorithms/src/main/java/com/sl/algorithms/sort/generalpurpose/QuickSort.java), [Merge Sort](algorithms/src/main/java/com/sl/algorithms/sort/generalpurpose/merge), [Heap Sort](algorithms/src/main/java/com/sl/algorithms/sort/generalpurpose/heap)|
|[Advanced](algorithms/src/main/java/com/sl/algorithms/sort/advanced)|[Wave Sort](algorithms/src/main/java/com/sl/algorithms/sort/advanced/wave)|
