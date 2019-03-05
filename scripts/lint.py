#!/usr/bin/env python
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this file,
# You can obtain one at http://mozilla.org/MPL/2.0/.

#!/usr/bin/env python
# Copyright (c) 2013 The Chromium Authors. All rights reserved.
# Use of this source code is governed by a BSD-style license that can be
# found in the LICENSE file.

# Copyright (C) 2008 Evan Martin <martine@danga.com>

import os
import sys
import re

scriptpath = os.path.dirname(os.path.realpath(__file__))
sys.path.append(os.path.realpath(os.path.join(scriptpath, "..", "vendor", "depot_tools")))

import git_cl
import git_common
import auth

def main(args):
  """Runs cpplint on the current changelist."""
  """Adapted from git_cl.py CMDlint """
  parser = git_cl.OptionParser()
  parser.add_option('--filter', action='append', metavar='-x,+y',
                    help='Comma-separated list of cpplint\'s category-filters')
  parser.add_option('--project_root')
  parser.add_option('--base_branch')
  auth.add_auth_options(parser)
  options, args = parser.parse_args(args)
  auth_config = auth.extract_auth_config_from_options(options)

  # Access to a protected member _XX of a client class
  # pylint: disable=protected-access
  try:
    import cpplint
    import cpplint_chromium
  except ImportError:
    print('Your depot_tools is missing cpplint.py and/or cpplint_chromium.py.')
    return 1

  # Change the current working directory before calling lint so that it
  # shows the correct base.
  settings = git_cl.settings
  previous_cwd = os.getcwd()
  os.chdir(settings.GetRoot())
  try:
    cl = git_cl.Changelist(auth_config=auth_config)
    change = cl.GetChange(git_common.get_or_create_merge_base(cl.GetBranch(), options.base_branch), None)
    files = [f.LocalPath() for f in change.AffectedFiles()]
    if not files:
      print('Cannot lint an empty CL')
      return 0

    # Process cpplints arguments if any.
    command = args + files
    if options.filter:
      command = ['--filter=' + ','.join(options.filter)] + command
    if options.project_root:
      command = ['--project_root=' + options.project_root] + command
    filenames = cpplint.ParseArguments(command)

    white_regex = re.compile(settings.GetLintRegex())
    black_regex = re.compile(settings.GetLintIgnoreRegex())
    extra_check_functions = [cpplint_chromium.CheckPointerDeclarationWhitespace]
    for filename in filenames:
      if white_regex.match(filename):
        if black_regex.match(filename):
          print('Ignoring file %s' % filename)
        else:
          cpplint.ProcessFile(filename, cpplint._cpplint_state.verbose_level,
                              extra_check_functions)
      else:
        print('Skipping file %s' % filename)
  finally:
    os.chdir(previous_cwd)
  print('Total errors found: %d\n' % cpplint._cpplint_state.error_count)
  if cpplint._cpplint_state.error_count != 0:
    return 1
  return 0

if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
