function* generateNumbers() {
  const result = yield

  console.log('result', result)
}

const generate = generateNumbers()

generate.next('this is result 1')
generate.next('this is result 2')
generate.next('this is result 3')
// console.log(generate.next())

// for (const value of generate) {
//   console.log(value)
// }
