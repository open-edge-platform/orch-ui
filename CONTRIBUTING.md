# Orchestrator GUI Web User Interface Contribution Guide

The following are guidelines for contributing to the {Name} project, including the code of conduct, submitting issues, and contributing code.

## Table of Contents

- [Code of Conduct](#code-of-conduct)

- [Security](#security)

- [Get Started](#get-started)

- [How to Contribute](#how-to-contribute)

- [Development Guidelines](#development-guidelines)

- [Sign Your Work](#sign-your-work)

- [License](#license)

## Code of Conduct

This project and everyone participating in it are governed by the [Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you are expected to adhere to this code. Please report unacceptable behavior to <email@example.com>.

## Security

## Get Started

To get started with the project, see the [Getting Started Guide](./README.md#get-started)

## How to Contribute

### Contribute Code Changes

If you want to help improve Orchestrator GUI Web User Interface, choose one of the issues reported in
[GitHub Issue Tracker](https://github.com/open-edge-platform/orch-ui/issues) and
create a Pull Request addressing it. You will see you the list pull request in the [Pull request page](https://github.com/open-edge-platform/orch-ui/pulls).

> Note: Check that the change hasn't been implemented before you start working on it.

### Improve Documentation

The easiest way to help with the [Developer Guide](#development-guidelines) <!--and [User Guide]()--> is to review it and provide feedback on the
existing articles. Whether you notice a mistake, see the possibility of improving the text,
or think more information should be added, you can reach out to discuss the potential changes.

### Report Bugs

If you encounter a bug, open an issue on the `orch-ui\*` repository. Provide the following information to help us understand and resolve the issue quickly:

- A clear and descriptive title

- A thorough description of the issue

- Steps to reproduce the issue

- Expected versus actual behavior

- Screenshots, videos or logs (if applicable; for reference refer to [Github's supported attachment list](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/attaching-files))

- Your environment (OS, browser, etc.)

### Suggest Enhancements

Intel welcomes suggestions for new features and improvements. Follow these steps to make a suggestion:

1. Check if there's already a similar suggestion in the [GitHub Issue Tracker](https://github.com/open-edge-platform/orch-ui/issues).

2. If not, open a new issue and provide the following information:

    - A clear and descriptive title

    - A detailed description of the enhancement

    - Use cases and benefits

    - Any additional context or references

### Submit Pull Requests

Before submitting a pull request, ensure you follow these guidelines:

1. Fork the repository and create your branch from `main`

2. Follow the [Development Guidelines](#development-guidelines) in this document

3. Test your changes thoroughly. For testing your changes in a virtual machine, where a UI mfe deployed via a separate Docker container and Helm chart, refer to [Build and Deploy Guide](./docs/build.md) documentation.

4. Document your changes (in code etc.)

5. Submit your pull request, detailing the changes and linking to any relevant issues

6. Wait for a review. Intel will review your pull request as soon as possible and provide you with feedback. You can expect a merge once your changes are validated with automatic tests and approved by maintainers.

## Development Guidelines

### Coding Standards

Consistently following coding standards helps maintain readability and quality. Adhere to the following conventions:

- Language-specific style guides: [TypeScript Style Guide](https://github.com/microsoft/TypeScript/wiki/Coding-guidelines), [React Style Guideline](https://react.dev/reference/rules), [MDN Docs for Web Developers](https://developer.mozilla.org/en-US/docs/Web)

- Properly formatted code with tools like [Prettier](https://prettier.io/) and [ESLint](https://eslint.org/)

- Meaningful variable and function names and structure: [JavaScript](https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Code_style_guide/JavaScript), [The Atomic Design](https://atomicdesign.bradfrost.com/chapter-2/), For testing refer to Page Object Model (POM)

- Inline comments

### Commit Messages

Clear and informative commit messages make it easier to understand the history of the project. Follow these guidelines:

- Use the present tense (e.g., "Add feature" not "Added feature")

- Capitalize the first letter

- Keep the message concise, ideally under 50 characters

- Use the following format for commit messages:

.. code-block:: text

    [Type]: Brief description

    Optional detailed description.

Examples of commit types:

- **feat**: A new feature

- **fix**: A bug fix

- **docs**: Documentation changes

- **style**: Code formatting, no functional changes

- **refactor**: Refactoring code without changing functionality

- **test**: Adding or updating tests

- **chore**: Other changes (e.g., build process)

## Sign your work

Please use the sign-off line at the end of the patch. Your signature certifies that you wrote the patch or otherwise have the right to pass it on as an open-source patch. The rules are pretty simple: if you can certify
the below (from [developercertificate.org](http://developercertificate.org/)):

```
Developer Certificate of Origin
Version 1.1

Copyright (C) 2004, 2006 The Linux Foundation and its contributors.
660 York Street, Suite 102,
San Francisco, CA 94110 USA

Everyone is permitted to copy and distribute verbatim copies of this
license document, but changing it is not allowed.

Developer's Certificate of Origin 1.1

By making a contribution to this project, I certify that:

(a) The contribution was created in whole or in part by me and I
    have the right to submit it under the open source license
    indicated in the file; or

(b) The contribution is based upon previous work that, to the best
    of my knowledge, is covered under an appropriate open source
    license and I have the right under that license to submit that
    work with modifications, whether created in whole or in part
    by me, under the same open source license (unless I am
    permitted to submit under a different license), as indicated
    in the file; or

(c) The contribution was provided directly to me by some other
    person who certified (a), (b) or (c) and I have not modified
    it.

(d) I understand and agree that this project and the contribution
    are public and that a record of the contribution (including all
    personal information I submit with it, including my sign-off) is
    maintained indefinitely and may be redistributed consistent with
    this project or the open source license(s) involved.
```

Then you just add a line to every git commit message:

    Signed-off-by: Joe Smith <joe.smith@email.com>

Use your real name (sorry, no pseudonyms or anonymous contributions.)

If you set your `user.name` and `user.email` git configs, you can sign your
commit automatically with `git commit -s`.

## License

Orchestrator GUI Web User Interface is licensed under the terms in [Apache 2.0](./LICENSES/Apache-2.0.txt). By contributing to the project, you agree to the license and copyright terms therein and release your contribution under these terms.
