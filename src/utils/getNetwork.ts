/**
 * Returns the appropriate API URL based on the provided network type.
 *
 * @param {string} network - The network type (e.g., 'eth', 'bsc').
 * @returns {string} - The corresponding API URL for the specified network.
 */
export function getNetwork(network) {
  // Switch case to handle different network types
  switch (network) {
    case 'eth':
      // Ethereum network (mainnet)
      return 'https://api.etherscan.io/api'
    case 'bsc':
      // Binance Smart Chain network
      return 'https://api.bscscan.io/api'

    // Default case for unsupported networks, returns Ethereum API by default
    default:
      return 'https://api.etherscan.io/api'
  }
}
