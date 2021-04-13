const Vote = artifacts.require('Vote')
const CANDIDATE_NAMES = ['apple', 'banana']
const SELECTION_TYPE = 0
const ONE_HOUR = 60 * 60 * 1000 // in milliseconds
const ONE_HOUR_LATER = Math.floor((new Date().getTime() + ONE_HOUR) / 1000.0)
const ONE_DAY_LATER = Math.floor((new Date().getTime() + ONE_HOUR * 24) / 1000.0)

module.exports = function(deployer) {
  deployer.deploy(Vote, CANDIDATE_NAMES, SELECTION_TYPE, ONE_HOUR_LATER, ONE_DAY_LATER)
}