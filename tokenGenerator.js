
const tokenize = function * (string, regex) {
  let token
  while ((token = regex.exec(string))) {
    yield token[0]
  }
}

const calcTokens = tokenize('(1+(4+5+2)-3)+(6+8)', /\d+|\+|\-|\(|\)/g)

for (let token of calcTokens) {
  console.log(token)
}
