// --------------
// Selection Sort
// --------------

function selectionSort(arr) {
    let n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        for(let j = i + 1; j < n; j++) {
            if(arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            let temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
    }
    return arr;
}

let array2 = [29, 10, 14, 37, 13];
let ss_array = document.getElementById("originalArray_selection");
ss_array.textContent += " [" + array2 + "]";

let sortedArray2 = selectionSort(array2);
document.getElementById("sortedArray_selection").textContent += " [" + sortedArray2 + "]";