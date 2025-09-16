# Dutch National Flag Sort

## 🇳🇱 Overview
Dutch National Flag Sort is a specialized partitioning algorithm that efficiently segregates an array into 2-3 distinct groups in linear time. Named after the Dutch flag's three colors (red, white, blue), it was invented by Edsger Dijkstra as part of quicksort optimization.

## 📊 Algorithm Characteristics

| Property | 3-Way Partition | 2-Way Partition |
|----------|-----------------|-----------------|
| **Time Complexity** | O(n) | O(n) |
| **Space Complexity** | O(1) | O(1) |
| **Stability** | ❌ Not stable | ❌ Not stable |
| **In-place** | ✅ Yes | ✅ Yes |
| **Adaptive** | ❌ No | ❌ No |

## 🎯 When to Use

### ✅ Perfect for:
- Partitioning problems (divide into 2-3 groups)
- Color sorting and classification
- Quicksort three-way partitioning
- Binary classification problems
- Data preprocessing and segmentation

### ❌ Avoid when:
- Need to sort into arbitrary order (use comparison-based sorts)
- Working with more than 3 distinct groups
- Stability is required

## 🚀 Quick Start

```javascript
const { dutchFlagSort, dutchFlagSort2Way, sortColors } = require('./dutch-flag-sort-core');

// Classic Dutch flag (3 colors)
const colors = ['red', 'blue', 'white', 'red', 'white', 'blue'];
const result1 = sortColors(colors);
console.log(result1.sortedArray); // ['red', 'red', 'white', 'white', 'blue', 'blue']

// Three-way partitioning (0s, 1s, 2s)
const numbers = [2, 0, 1, 2, 1, 0, 2, 1, 0];
const result2 = dutchFlagSort(numbers, 0, 1, 2);
console.log(result2.sortedArray); // [0, 0, 0, 1, 1, 1, 2, 2, 2]

// Two-way partitioning (binary)
const binary = [1, 0, 1, 0, 0, 1];
const result3 = dutchFlagSort2Way(binary, 0, 1);
console.log(result3.sortedArray); // [0, 0, 0, 1, 1, 1]
```

## 🎮 Interactive Demo
[View Live Demo](../../demo.html?algo=sort/dutch-flag-sort)

## 🧮 Algorithm Variants

### Three-Way Partitioning (Classic Dutch Flag)
- **Groups**: Red, White, Blue (or any 3 distinct values)
- **Pattern**: `[red...red][white...white][blue...blue]`
- **Use case**: Multi-class classification, quicksort optimization

### Two-Way Partitioning (Polish Flag)
- **Groups**: Two distinct values (binary classification)
- **Pattern**: `[first...first][second...second]`
- **Use case**: Binary classification, true/false segregation

## 📈 Performance Analysis

```javascript
// Linear time complexity demonstration
const sizes = [100, 1000, 10000];
sizes.forEach(size => {
    const arr = generateRandomTernaryArray(size); // 0s, 1s, 2s
    
    console.time(`Dutch Flag (${size})`);
    dutchFlagSort(arr, 0, 1, 2);
    console.timeEnd(`Dutch Flag (${size})`);
});

// Typical results: O(n) scaling
// Dutch Flag (100): ~0.1ms
// Dutch Flag (1000): ~1.0ms  
// Dutch Flag (10000): ~10ms
```

## 🔍 Step-by-step Example

**Input**: `[2, 0, 1, 2, 1, 0]` (partition into 0s, 1s, 2s)

**Process** (using three pointers):
```
Initial: [2, 0, 1, 2, 1, 0]
         red=0, white=5, blue=5

Step 1: Check arr[5]=0 → RED section
        Swap(0,5): [0, 0, 1, 2, 1, 2]
        red=1, white=4, blue=5

Step 2: Check arr[4]=1 → WHITE section  
        Keep: [0, 0, 1, 2, 1, 2]
        red=1, white=3, blue=5

Step 3: Check arr[3]=2 → BLUE section
        Swap(3,5): [0, 0, 1, 2, 1, 2]
        red=1, white=2, blue=4

Continue until complete...
```

**Result**: `[0, 0, 1, 1, 2, 2]`

## 🧪 Testing

```bash
# Run manual tests
npm run test:manual

# Run specific tests
npm test -- --testPathPattern=dutch-flag

# Quick verification
node -e "
const { dutchFlagSort } = require('./dutch-flag-sort-core');
console.log(dutchFlagSort([2,0,1,2,1,0], 0, 1, 2).sortedArray);
"
```

## 💡 Implementation Notes

### Three-Pointer Technique
- **Red pointer**: Boundary of red (first) section
- **White pointer**: Current element being processed  
- **Blue pointer**: Boundary of blue (last) section

### Key Insights
1. **Single pass**: Only one traversal needed
2. **Constant space**: No extra arrays required
3. **Boundary maintenance**: Pointers maintain section boundaries
4. **Swap strategy**: Elements moved to correct sections immediately

## 📚 Related Algorithms
- **Quicksort**: Uses Dutch flag for three-way partitioning
- **Counting Sort**: Alternative for small ranges
- **Bucket Sort**: Distribution-based sorting
- **Partition algorithms**: General partitioning strategies

## 🔗 References
- [All Sorting Algorithms](../sorting-algorithms.html)
- [Interactive Demo](../../demo.html?algo=sort/dutch-flag-sort)
- [Edsger Dijkstra's Original Paper](https://en.wikipedia.org/wiki/Dutch_national_flag_problem)
- [SimplifyLearning Repository](https://github.com/sachinlala/SimplifyLearning)

---
*Part of SimplifyLearning's Algorithm Collection*