//  given tree
//  return flattened list of node values

//  f(tree) -> list (string?)

/*
flattenByBreath(node){
  put node value into resultArray
  check if there are children
  true map them to flattenByBreath
  return joined(resultArray + mappedArray)
}

*/

const node = (val, children = []) => { return {val: val, children: children} };

// const node = function(val, children){
//   return children && children.length ? {val: val, children: children} : {val: val, children: []}
// }

// const exampleTree =
//   node(1, [
//     node(2),
//     node(3, [
//       node(4)
//           ]),
//     node(5)])

const exampleTree2 =
node(1, [
  node(2, [node('a'), node('b', [node('b2'), node('b22')])]),
  node(3, [
    node(4),
  ]),
  node(5)])

const flattenByDepth = function (nodeList) {
  if (!Array.isArray(nodeList)) nodeList = [nodeList]
  if (nodeList.length === 0) return nodeList

  const [head, ...rest] = nodeList
  return [head].concat(flattenByDepth(head.children)).concat(flattenByDepth(rest))
}

// const returnNode = (node) => {
//   return node
// }

const flattenByBreath = (nodeList, queue = []) => {
  if (!Array.isArray(nodeList)) nodeList = [nodeList]
  if (nodeList.length === 0) return nodeList

  // const [head, ...rest] = nodeList
  // map over nodeList, add children to queue, return nodelist and queue
  const allChildren = [].concat.apply([], (nodeList.map(node => node.children)))
  return nodeList.concat(flattenByBreath(allChildren))
}

const exampleTree =
  node(1, [
    node(2, [node('a', [node('d')])]),
    node(3),
    node(5, [node('b', [node('c')])]),
    ])

// console.log(flattenByDepth(exampleTree2))
console.log(flattenByBreath(exampleTree))
