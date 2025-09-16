# Wiggle Sort

## 🌊 Overview
Wiggle Sort arranges array elements in an alternating pattern where `arr[0] < arr[1] > arr[2] < arr[3]...`, creating a "wiggling" wave-like sequence.

## 📊 Algorithm Characteristics

| Property | Wiggle Sort I | Wiggle Sort II |
|----------|---------------|----------------|
| **Time Complexity** | O(n) | O(n log n) |
| **Space Complexity** | O(1) | O(n) |
| **Stability** | ❌ Not stable | ❌ Not stable |
| **In-place** | ✅ Yes | ❌ No |
| **Adaptive** | ❌ No | ❌ No |

## 🎯 When to Use

### ✅ Good for:
- Creating alternating/wave patterns
- UI element arrangements with peaks and valleys
- Data visualization with oscillating values
- Game development (level design, terrain generation)
- Stock price pattern analysis

### ❌ Avoid when:
- Need stable sorting
- Working with very large datasets (prefer standard sorts)
- Adjacent duplicates must be preserved in original order

## 🚀 Quick Start

```javascript
const { wiggleSortI, wiggleSortII } = require('./wiggle-sort-core');

// Basic wiggle sort (allows adjacent duplicates)
const arr1 = [3, 5, 2, 1, 6, 4];
const result1 = wiggleSortI(arr1);
console.log(result1.sortedArray); // [3, 5, 1, 6, 2, 4] (example)

// Advanced wiggle sort (no adjacent duplicates)
const arr2 = [1, 5, 1, 1, 6, 4];
const result2 = wiggleSortII(arr2);
console.log(result2.sortedArray); // [1, 6, 1, 5, 1, 4] (example)
```

## 🎮 Interactive Demo
[View Live Demo](../../demo.html?algo=sort/wiggle-sort)

## 🧮 Algorithm Variants

### Wiggle Sort I (In-place, Linear Time)
- **Algorithm**: Single pass with adjacent swaps
- **Pattern**: Ensures peaks and valleys but may have adjacent duplicates
- **Use case**: When duplicates are acceptable and speed is critical

### Wiggle Sort II (No Adjacent Duplicates)
- **Algorithm**: Sort first, then rearrange strategically
- **Pattern**: Guarantees no adjacent duplicates
- **Use case**: When duplicate separation is required

## 📈 Performance Analysis

```javascript
// Performance comparison
const sizes = [100, 1000, 10000];
sizes.forEach(size => {
    const arr = generateRandomArray(size);
    
    // Wiggle Sort I: O(n)
    console.time(`Wiggle I (${size})`);
    wiggleSortI(arr);
    console.timeEnd(`Wiggle I (${size})`);
    
    // Wiggle Sort II: O(n log n)
    console.time(`Wiggle II (${size})`);
    wiggleSortII(arr);
    console.timeEnd(`Wiggle II (${size})`);
});
```

## 🔍 Step-by-step Example

**Input**: `[3, 5, 2, 1, 6, 4]`

**Wiggle Sort I Process**:
1. Compare positions 0,1: `3 < 5` ✓ (valley-peak)
2. Compare positions 1,2: `5 > 2` ✓ (peak-valley)  
3. Compare positions 2,3: `2 > 1` ❌ → Swap: `[3, 5, 1, 2, 6, 4]`
4. Compare positions 3,4: `2 < 6` ✓ (valley-peak)
5. Compare positions 4,5: `6 > 4` ✓ (peak-valley)

**Result**: `[3, 5, 1, 6, 2, 4]` with pattern `<><><`

## 🧪 Testing

```bash
# Run manual tests
npm run test:manual

# Run unit tests
npm test -- --testPathPattern=wiggle-sort

# Performance test
node -e "require('./test-manual.js')"
```

## 📚 Related Algorithms
- **Dutch National Flag Sort**: Three-way partitioning
- **Quick Sort**: Uses similar partitioning concepts  
- **Selection Sort**: Peak/valley selection approach

## 🔗 References
- [Pattern-based Sorting Algorithms](src/sort/sorting-algorithms.html)
- [Algorithm Visualization Demo](../../demo.html?algo=sort/wiggle-sort)
- [SimplifyLearning Repository](https://github.com/sachinlala/SimplifyLearning)

---
*Part of SimplifyLearning's Algorithm Collection*