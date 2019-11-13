const path = require('path')
const fs = require('fs-extra')
const os = require('os')
const calculateFileChecksum = require('./calculateFileChecksum')

const dirPrefixTmp = 'brave-browser-test-calculate-file-checksum-'
const testFile1Name = 'file1'
const testFile1InitialContent = 'this is a test'
const encoding = 'utf8'
let testDirPath, testFile1Path

beforeEach(async function () {
  // Test directory
  testDirPath = await fs.mkdtemp(path.join(os.tmpdir(), dirPrefixTmp))
  // Initial test file
  testFile1Path = path.join(testDirPath, testFile1Name)
  await fs.writeFile(testFile1Path, testFile1InitialContent, encoding)
})

afterEach(async function () {
  // Remove test directory
  try {
    await fs.remove(testDirPath)
  } catch (err) {
    console.warn('Test cleanup: could not remove temp directory at ' + testDirPath)
  }
})

test('generates a checksum', async function () {
  const checksum1 = await calculateFileChecksum(testFile1Path)
  expect(checksum1).toBeTruthy()
})

test('checksum is stable', async function () {
  const checksum1 = await calculateFileChecksum(testFile1Path)
  const checksum2 = await calculateFileChecksum(testFile1Path)
  expect(checksum2).toBe(checksum1)
})

test('checksum changes when file contents change', async function () {
  const checksum1 = await calculateFileChecksum(testFile1Path)
  await fs.writeFile(testFile1Path, testFile1InitialContent + testFile1InitialContent, encoding)
  const checksum2 = await calculateFileChecksum(testFile1Path)
  expect(checksum2).not.toBe(checksum1)
})
