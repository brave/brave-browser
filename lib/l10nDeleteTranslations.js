// Copyright (c) 2019 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

const chalk = require('chalk')
const transifexAPI = require('./transifexAPI')

// TODO: Read language codes from GRD file, like Python script does
const langCodes = ['am', 'ar', 'bg', 'bn', 'ca', 'cs', 'da', 'de', 'el', 'en-GB', 'es', 'es-419', 'et', 'fa', 'fi', 'fil', 'fr', 'gu', 'hi', 'hr', 'hu', 'id', 'it', 'he', 'ja', 'kn', 'ko', 'lt', 'lv', 'ml', 'mr', 'ms', 'nl', 'no', 'pl', 'pt-BR', 'pt-PT', 'ro', 'ru', 'sk', 'sl', 'sr', 'sv', 'sw', 'ta', 'te', 'th', 'tr', 'uk', 'vi', 'zh-CN', 'zh-TW']

module.exports = async function RunCommand (options) {
  const { string_ids, resource_name } = options
  if (!string_ids || !string_ids.length) {
    throw new Error(`Must provide string_id param. Was: ${string_ids}`)
  }
  if (!resource_name) {
    throw new Error(`Must provide resource_name param. Was: ${resource_name}`)
  }
  try {
    for (const string_id of string_ids) {
      console.log('------------------------------')
      console.log(chalk.black.bgYellow(`Clearing translation from all languages for hash ${string_id} in resource ${resource_name}.`))
      await clearTransifexTranslationForKey(resource_name, string_id)
    }
  } catch (err) {
    console.error(chalk.white.bgRed('Error clearing Transifex Translations:'))
    console.error(err)
    process.exit(1)
  }
  console.log('Done.')
}

async function clearTransifexTranslationForKey (transifexResourceName, stringKey) {
  const transifexProjectName = 'brave'
  const baseUrl = '2/'
  const method = 'PUT'
  const deleteCommandPayload = '{"translation": ""}'
  stringKey = stringKey.trim()
  await Promise.all(langCodes.map(langCode => {
    langCode = langCode.replace('-', '_')
    const partUrl = `project/${transifexProjectName}/resource/${transifexResourceName}/translation/${langCode}/string/${stringKey}/`
    const url = baseUrl + partUrl
    return transifexAPI.request(url, { method, data: deleteCommandPayload })
  }))
}
