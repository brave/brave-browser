# Security Policy

## Supported Versions

Secretariat Browser is currently in **early development (pre-alpha)**. Security updates will be provided for:

| Version | Supported          | Status |
| ------- | ------------------ | ------ |
| 0.x.x   | :white_check_mark: | Development |

Once we reach v1.0.0, we will maintain security support for:
- Latest stable release
- Previous major version (for 6 months after new release)

## Reporting a Vulnerability

**Please do NOT report security vulnerabilities through public GitHub issues.**

### How to Report

If you discover a security vulnerability in Secretariat Browser, please report it responsibly:

**Email**: [security email will be added]

**What to include:**
- Type of vulnerability
- Full paths of source file(s) related to the vulnerability
- Location of the affected source code (tag/branch/commit or direct URL)
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue (what an attacker could do)
- Suggested fix (if you have one)

### Response Timeline

- **Acknowledgment**: Within 48 hours of report
- **Initial Assessment**: Within 7 days
- **Status Updates**: Every 7 days until resolved
- **Fix Development**: Depends on severity (see below)
- **Public Disclosure**: After fix is released and users have time to update

### Severity Levels

**Critical (P0)**
- Remote code execution
- Authentication bypass
- Private data exposure
- **Target fix time**: 24-48 hours

**High (P1)**
- Cross-site scripting (XSS)
- SQL injection (in Discovery Engine archives)
- Privilege escalation
- **Target fix time**: 7 days

**Medium (P2)**
- Information disclosure (limited)
- Denial of service (local)
- Security misconfiguration
- **Target fix time**: 30 days

**Low (P3)**
- Security best practice violations
- Low-impact information disclosure
- **Target fix time**: Next release

## Security Features

### Built-In Protections

Secretariat inherits security features from Chromium and Brave:

1. **Sandboxing**: Renderer processes are sandboxed
2. **Site Isolation**: Each site runs in its own process
3. **HTTPS Enforcement**: Automatic HTTPS upgrades
4. **Certificate Validation**: Strict certificate checking
5. **Content Security Policy**: CSP enforcement
6. **Mixed Content Blocking**: Prevents mixed HTTP/HTTPS content

### Discovery Engine Security

The Discovery Engine has additional security considerations:

**Search Privacy:**
- No search queries logged to remote servers
- No unique user identifiers in search requests
- Backend queries anonymized through SearXNG
- Local-only profile storage

**Archive Security:**
- Search archives stored locally (encrypted)
- SQLite database with secure defaults
- No automatic cloud sync (user-controlled if implemented)

**Input Validation:**
- All search queries sanitized
- Profile JSON validated on import
- Protection against injection attacks

### Known Limitations

As an early-stage project, please be aware:

- ⚠️ **Development Build**: Not yet security-hardened for production
- ⚠️ **Limited Testing**: Security audit pending
- ⚠️ **Linux-Only**: Other platforms not yet tested
- ⚠️ **Experimental Features**: Discovery Engine is new code

## Security Best Practices for Users

When using Secretariat (once released):

1. **Keep Updated**: Always use the latest version
2. **Verify Downloads**: Check SHA256 hashes
3. **Use HTTPS**: Avoid unencrypted connections
4. **Review Profiles**: Check imported Discovery Profiles for malicious content
5. **Limit Extensions**: Only install trusted extensions (future)
6. **Check Permissions**: Review site permissions regularly

## Security Best Practices for Developers

When contributing to Secretariat:

### Code Review

- [ ] All code must be reviewed before merging
- [ ] Security-sensitive changes require two reviewers
- [ ] Automated security scans must pass

### Secure Coding

**C++ (Browser Code):**
```cpp
// ✅ DO: Use smart pointers
std::unique_ptr<Profile> profile = std::make_unique<Profile>();

// ❌ DON'T: Use raw pointers for ownership
Profile* profile = new Profile();  // Memory leak risk

// ✅ DO: Validate input
if (!IsValidQuery(query)) {
  return SearchResults();
}

// ❌ DON'T: Trust user input
PerformSearch(query);  // Potential injection
```

**JavaScript (UI Code):**
```javascript
// ✅ DO: Sanitize HTML
const sanitized = DOMPurify.sanitize(userInput)

// ❌ DON'T: Use innerHTML with user input
element.innerHTML = userInput  // XSS risk

// ✅ DO: Use textContent
element.textContent = userInput
```

**SQL (Archive Storage):**
```cpp
// ✅ DO: Use parameterized queries
sql::Statement s(db.GetUniqueStatement(
    "SELECT * FROM archives WHERE query = ?"));
s.BindString(0, query);

// ❌ DON'T: Concatenate SQL strings
std::string sql = "SELECT * FROM archives WHERE query = '" + query + "'";
```

### Authentication & Authorization

- Never store credentials in code
- Use secure random number generators
- Implement rate limiting for network requests
- Validate all permissions before allowing actions

### Data Privacy

- Minimize data collection
- Encrypt sensitive data at rest
- Use HTTPS for all network requests
- Clear sensitive data from memory when done

## Dependency Management

### Third-Party Dependencies

- Regularly audit dependencies (`npm audit`, `npm run audit_deps`)
- Keep Chromium base updated
- Monitor security advisories for:
  - Chromium
  - Node.js
  - npm packages
  - System libraries

### Chromium Updates

Secretariat tracks Chromium releases:

- **Critical Security**: Update within 48 hours
- **High Security**: Update within 7 days
- **Regular Updates**: Monthly

## Vulnerability Disclosure Policy

Once we fix a security vulnerability:

1. **Private Fix**: Develop fix in private repository fork
2. **Testing**: Thorough testing of fix
3. **Release**: Publish fix in new version
4. **Notification**: Notify users of security update
5. **Disclosure**: Publish security advisory after 30 days
   - Or sooner if vulnerability is publicly known
   - Or later if users need more time to update

### Public Disclosure Format

```markdown
## [SECRETARIAT-YYYY-NNN] Vulnerability Title

**Severity**: Critical/High/Medium/Low
**Affected Versions**: 0.x.x to 0.y.y
**Fixed in Version**: 0.z.z
**CVE ID**: CVE-YYYY-NNNN (if assigned)

### Description
Brief description of the vulnerability.

### Impact
What could an attacker do with this vulnerability?

### Mitigation
- Update to version 0.z.z or later
- Workaround (if available)

### Timeline
- YYYY-MM-DD: Vulnerability reported
- YYYY-MM-DD: Fix developed
- YYYY-MM-DD: Fix released
- YYYY-MM-DD: Public disclosure

### Credits
Thanks to [Reporter Name] for responsible disclosure.
```

## Security Audits

We plan to conduct security audits:

**Pre-v1.0:**
- Internal code review
- Automated security scanning
- Dependency audits

**Post-v1.0:**
- Professional security audit
- Penetration testing
- Bug bounty program (if resources permit)

## Bug Bounty Program

Currently: **No formal bug bounty program**

We appreciate responsible disclosure but cannot offer monetary rewards at this time. We will:
- Publicly thank security researchers (unless they prefer anonymity)
- List contributors in SECURITY_ACKNOWLEDGMENTS.md
- Provide early access to beta versions

## Secure Development Lifecycle

1. **Design**: Security review of new features
2. **Implementation**: Secure coding practices
3. **Testing**: Security testing (fuzzing, static analysis)
4. **Review**: Code review with security focus
5. **Release**: Security checklist before release
6. **Monitoring**: Track security advisories post-release

## Resources

### For Security Researchers

- **Chromium Security**: https://www.chromium.org/Home/chromium-security
- **Brave Security**: https://brave.com/security/
- **OWASP Top 10**: https://owasp.org/www-project-top-ten/

### For Users

- **Privacy Guide**: (coming soon)
- **Security Settings**: (coming soon)
- **FAQ**: (coming soon)

## Contact

**Security Team**: [security email will be added]

**PGP Key**: (will be added)

For non-security issues, please use GitHub Issues.

---

## Acknowledgments

We thank the following security researchers who have responsibly disclosed vulnerabilities:

(List will be updated as vulnerabilities are reported and fixed)

---

**Note**: Secretariat is derived from Brave Browser. For Brave security issues, see https://hackerone.com/brave

---

**Last Updated**: November 3, 2025
**Policy Version**: 1.0

---

**Thank you for helping keep Secretariat and our users safe!** 🔒
