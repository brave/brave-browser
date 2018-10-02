.. _rs_sphinx_readthedocs:

Documentation
*************

We use Sphinx to render, and readthedocs.org to publish, Brave Browser
documentation. You can view the latest documentation at `https://brave-browser.readthedocs.io/en/latest/ <https://brave-browser.readthedocs.io/en/latest/>`_.

Contributing to Brave Browser documentation can be done by editing the
``docs/source/*.rst`` files in the `brave-browser repository <https://github.com/brave/brave-browser>`_
and then opening a PR.



Prerequisites
=============

* Install ``sphinx`` using `these instructions <http://dont-be-afraid-to-commit.readthedocs.io/en/latest/documentation.html#sphinx>`_.
    * You might want to create a Python `virtualenv <https://virtualenv.pypa.io/en/stable/>`_ or use `Pipenv <https://docs.pipenv.org/>`_
      first to sequester these Python modules from your installed system
      modules.


Using Sphinx
============

To create or edit reStructuredText files in the source directory,
`follow this guide <http://dont-be-afraid-to-commit.readthedocs.io/en/latest/documentation.html#using-sphinx-restructuredtext>`_.
The `reStructuredText primer <http://www.sphinx-doc.org/en/master/usage/restructuredtext/basics.html#rst-primer>`_
documents the markup that is supported by Sphinx.

After editing your content, you will render and view the documentation locally.
This is done by running the ``make html`` command from the ``docs`` directory.
Example::

    [mbacchi@host docs]$ make html
    Running Sphinx v1.7.6
    loading pickled environment... done
    building [mo]: targets for 0 po files that are out of date
    building [html]: targets for 1 source files that are out of date
    updating environment: 0 added, 1 changed, 0 removed
    reading sources... [100%] docs
    looking for now-outdated files... none found
    pickling environment... done
    checking consistency... done
    preparing documents... done
    writing output... [100%] index
    generating indices... genindex
    writing additional pages... search
    copying static files... done
    copying extra files... done
    dumping search index in English (code: en) ... done
    dumping object inventory... done
    build succeeded.

    The HTML pages are in build/html.

Now you can view the pages by pointing a web browser at the file
``brave-browser/docs/build/html/index.html``.

After you have verified the documentation looks like you want, you can commit
it and open a PR in GitHub.

ReadTheDocs
===========

We have a project for the `brave-browser repository <https://github.com/brave/brave-browser>`_
already setup on readthedocs.org. You can view the latest documentation at
`https://brave-browser.readthedocs.io/en/latest/ <https://brave-browser.readthedocs.io/en/latest/>`_.

By default, `readthedocs <http://brave-browser.readthedocs.io/>`_
will render any new changes to the documentation
nightly. But readthedocs.org also allows setting up a webhook that will
render new changes to the live site when any commit lands in the repository.
We will setup this webhook when Sphinx and readthedocs.org has
been accepted as the documentation tool of choice by the entire team.
