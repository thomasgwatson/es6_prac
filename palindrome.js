// given string
// let firstChar = string[0]
// let lastChar = string[-1]

// if(string === '') return true

// if firstChar === lastChar let newString = string.slice(0, -1) recurse(newString) else
//   return false

const isPalindrome = (string) => {
  if(string === '') return true;

  const firstChar = string[0]
  const lastChar = string[string.length - 1]

  return firstChar === lastChar && isPalindrome(string.slice(+1,-1))
}

const testData = [
  ["", true],
  ["t", true],
  ["tt", true],
  ["ty", false],
  ["tat", true],
  ["tta", false],
  ["taat", true],
  ["taadfgt", false],
  ["racecar", true]
]

for (let [input, expected] of testData){
  const actual = isPalindrome(input)
  if (actual !== expected){
    console.log("No bueno given: ", input, " expected:", expected, " got: ", actual)
  }
}
console.log("okay")
