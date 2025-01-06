export function weiToEther(wei) {
  return parseFloat(wei) / Math.pow(10, 18)
}

export function gweiToEther(gwei) {
  return parseFloat(gwei) / Math.pow(10, 9)
}
