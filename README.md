# Lasso X: How to deploy
This is silly but its a hack to deploy it without committing to a proper rewrite
Run these commands:
```
yarn install
yarn run build (will probably fail)
cd src\drivers\npm
replace the package.json with the one below (bump the version)
npm login --scope=@lasso-x --registry=https://npm.pkg.github.com // Use a personal token as password
npm publish --scope=@lasso-x --registry=https://npm.pkg.github.com
```

```
{
  "name": "@lasso-x/wappalyzer",
  "version": "1.0.5",
  "repository": {
    "type": "git",
    "url": "git://github.com/lasso-x/wappalyzer.git"
  },
  "main": "driver.js",
  "files": [
    "cli.js",
    "categories.json",
    "driver.js",
    "index.js",
    "technologies/*",
    "wappalyzer.js"
  ],
  "bin": {
    "wappalyzer": "./cli.js"
  },
  "dependencies": {
    "puppeteer": "~19.7.0"
  },
  "engines": {
    "node": ">=16"
  }
}
```


[![Validate](https://github.com/wappalyzer/wappalyzer/actions/workflows/validate.yml/badge.svg)](https://github.com/wappalyzer/wappalyzer/actions/workflows/validate.yml)
[![wappalyzer NPM](https://img.shields.io/badge/npm-wappalyzer-blue)](https://www.npmjs.com/package/wappalyzer)
[![wappalyzer-core NPM](https://img.shields.io/badge/npm-wappalyzer--core-blue)](https://www.npmjs.com/package/wappalyzer-core)
[![Github Sponsor](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&link=https://github.com/sponsors/AliasIO)](https://github.com/sponsors/AliasIO)

<a href="https://www.wappalyzer.com/?utm_source=readme&utm_medium=github&utm_campaign=wappalyzer"><img src="https://www.wappalyzer.com/images/logo/icon_192.png" height="72" alt="Wappalyzer" align="left" /></a>

# Wappalyzer

<br>

**[Wappalyzer](https://www.wappalyzer.com) identifies technologies on websites, such as CMS, web frameworks, ecommerce platforms, JavaScript libraries, analytics tools and [more](https://www.wappalyzer.com/technologies).**

If you don't have time to configure, host, debug and maintain your own infrastructure to analyse websites at scale, we offer a SaaS solution that has all the same capabilities and a lot more. Our [apps](https://www.wappalyzer.com/apps/) and [APIs](https://www.wappalyzer.com/api/) not only reveal the technology stack a website uses but also company and contact details, social media profiles, keywords and metadata.

## Prerequisites

-   [Git](https://git-scm.com)
-   [Node.js](https://nodejs.org) version 14 or higher
-   [Yarn](https://yarnpkg.com)

## Quick start

```sh
git clone https://github.com/wappalyzer/wappalyzer.git
cd wappalyzer
yarn install
yarn run link
```

## Usage

### Command line

```sh
node src/drivers/npm/cli.js https://example.com
```

### Chrome extension

* Go to `about:extensions`
* Enable 'Developer mode'
* Click 'Load unpacked'
* Select `src/drivers/webextension`

### Firefox extension

* Go to `about:debugging#/runtime/this-firefox`
* Click 'Load Temporary Add-on'
* Select `src/drivers/webextension/manifest.json`

## Specification

A long list of [regular expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) is used to identify technologies on web pages. Wappalyzer inspects HTML code, as well as JavaScript variables, response headers and more.

Patterns (regular expressions) are kept in [`src/technologies/`](https://github.com/wappalyzer/wappalyzer/blob/master/src/technologies). The following is an example of an application fingerprint.

#### Example

```json
"Example": {
  "description": "A short description of the technology.",
  "cats": [
    "1"
  ],
  "cookies": {
    "cookie_name": "Example"
  },
  "dom": {
    "#example-id": {
      "exists": "",
      "attributes": {
        "class": "example-class"
      },
      "properties": {
        "example-property": ""
      },
      "text": "Example text content"
    }
  },
  "dns": {
    "MX": [
      "example\\.com"
    ]
  },
  "js": {
    "Example.method": ""
  },
  "excludes": "Example",
  "headers": {
    "X-Powered-By": "Example"
  },
  "html": "<link[^>]example\\.css",
  "text": "\bexample\b",
  "css": "\\.example-class",
  "robots": "Disallow: /unique-path/",
  "implies": "PHP\\;confidence:50",
  "requires": "WordPress",
  "requiresCategory": "Ecommerce",
  "meta": {
    "generator": "(?:Example|Another Example)"
  },
  "scriptSrc": "example-([0-9.]+)\\.js\\;confidence:50\\;version:\\1",
  "scripts": "function webpackJsonpCallback\\(data\\) {",
  "url": "example\\.com",
  "xhr": "example\\.com",
  "oss": true,
  "saas": true,
  "pricing": ["mid", "freemium", "recurring"],
  "website": "https://example.com",
}
```

## JSON fields

Find the JSON schema at [`schema.json`](https://github.com/wappalyzer/wappalyzer/blob/master/schema.json).

### Required properties

<table>
  <thead>
    <tr>
      <th>Field</th>
      <th>Type</th>
      <th>Description</th>
      <th>Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>cats</code></td>
      <td>Array</td>
      <td>
        One or more category IDs.
      </td>
      <td><code>[1, 6]</code></td>
    </tr>
    <tr>
      <td><code>website</code></td>
      <td>String</td>
      <td>URL of the application's website.</td>
      <td>
        <code>"https://example.com"</code>
      </td>
    </tr>
  </tbody>
</table>

### Optional properties

<table>
  <thead>
    <tr>
      <th>Field</th>
      <th>Type</th>
      <th>Description</th>
      <th>Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>description</code></td>
      <td>String</td>
      <td>
        A short description of the technology in British English (max.
        250 characters). Write in a neutral, factual tone; not like an
        ad.
      </td>
      <td><code>"A short description."</code></td>
    </tr>
    <tr>
      <td><code>icon</code></td>
      <td>String</td>
      <td>Application icon filename.</td>
      <td><code>"WordPress.svg"</code></td>
    </tr>
    <tr>
      <td><code>cpe</code></td>
      <td>String</td>
      <td>
        <a href="https://nvd.nist.gov/products/cpe" target="_blank">CPE</a>
        is a structured naming scheme for technologies. To check if a CPE is valid and exists (using v2.3), use the <a href="https://nvd.nist.gov/products/cpe/search" target="_blank">search</a>).
      </td>
      <td><code>"cpe:2.3:a:apache:http_server</code><br /><code>:*:*:*:*:*:*:*:*"</code></td>
    </tr>
    <tr>
      <td><code>saas</code></td>
      <td>Boolean</td>
      <td>
        The technology is offered as a Software-as-a-Service (SaaS), i.e. hosted or cloud-based.
      </td>
      <td><code>true</code></td>
    </tr>
    <tr>
      <td><code>oss</code></td>
      <td>Boolean</td>
      <td>
        The technology has an open-source license.
      </td>
      <td><code>true</code></td>
    </tr>
    <tr>
      <td><code>pricing</code></td>
      <td>Array</td>
      <td>
Cost indicator (based on a typical plan or average monthly price) and available pricing models. For paid products only.

One of:
<ul>
  <li><code>low</code>Less than US $100 / mo</li>
  <li><code>mid</code>Between US $100 - $1,000 / mo</li>
  <li><code>high</code>More than US $1,000 / mo</li>
</ul>

Plus any of:
<ul>
  <li><code>freemium</code> Free plan available</li>
  <li><code>onetime</code> One-time payments accepted</li>
  <li><code>recurring</code> Subscriptions available</li>
  <li><code>poa</code> Price on asking</li>
  <li><code>payg</code> Pay as you go (e.g. commissions or usage-based fees)</li>
</ul>
      </td>
      <td><code>["low", "freemium"]</code></td>
    </tr>
  </tbody>
</table>

### Implies, requires and excludes (optional)

<table>
  <thead>
    <tr>
      <th>Field</th>
      <th>Type</th>
      <th>Description</th>
      <th>Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>implies</code></td>
      <td>String | Array</td>
      <td>
        The presence of one application can imply the presence of
        another, e.g. WordPress means PHP is also in use.
      </td>
      <td><code>"PHP"</code></td>
    </tr>
    <tr>
      <td><code>requires</code></td>
      <td>String | Array</td>
      <td>
        Similar to implies but detection only runs if the required technology has been identified. Useful for themes for a specific CMS.
      </td>
      <td><code>"WordPress"</code></td>
    </tr>
    <tr>
      <td><code>requiresCategory</code></td>
      <td>String | Array</td>
      <td>
        Similar to requires; detection only runs if a technology in the required category has been identified.
      </td>
      <td><code>"Ecommerce"</code></td>
    </tr>
    <tr>
      <td><code>excludes</code></td>
      <td>String | Array</td>
      <td>
        Opposite of implies. The presence of one application can exclude
        the presence of another.
      </td>
      <td><code>"Apache"</code></td>
    </tr>
  </tbody>
</table>

### Patterns (optional)

<table>
  <thead>
    <tr>
      <th>Field</th>
      <th>Type</th>
      <th>Description</th>
      <th>Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>cookies</code></td>
      <td>Object</td>
      <td>Cookies.</td>
      <td><code>{ "cookie_name": "Cookie value" }</code></td>
    </tr>
    <tr>
      <td><code>dom</code></td>
      <td>String | Array | Object</td>
      <td>
        Uses a
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll"
          target="_blank"
          noopener
          >query selector</a
        >
        to inspect element properties, attributes and text content.
      </td>
      <td>
        <code
          >{ "#example-id": { "property": { "example-prop": "" } }
          }</code
        >
      </td>
    </tr>
    <tr>
      <td><code>dns</code></td>
      <td>Object</td>
      <td>
        DNS records: supports MX, TXT, SOA and NS (NPM driver only).
      </td>
      <td>
        <code>{ "MX": "example\\.com" }</code>
      </td>
    </tr>
    <tr>
      <td><code>js</code></td>
      <td>Object</td>
      <td>
        JavaScript properties (case sensitive). Avoid short property
        names to prevent matching minified code.
      </td>
      <td><code>{ "jQuery.fn.jquery": "" }</code></td>
    </tr>
    <tr>
      <td><code>headers</code></td>
      <td>Object</td>
      <td>HTTP response headers.</td>
      <td><code>{ "X-Powered-By": "^WordPress$" }</code></td>
    </tr>
    <tr>
      <td><code>html</code></td>
      <td>String | Array</td>
      <td>
        HTML source code. Patterns must include an HTML opening tag to
        avoid matching plain text. For performance reasons, avoid
        <code>html</code> where possible and use
        <code>dom</code> instead.
      </td>
      <td><code>"&lt;a [^&gt;]*href=\"index.html"</code></td>
    </tr>
    <tr>
      <td><code>text</code></td>
      <td>String | Array</td>
      <td>
        Matches plain text. Should only be used in very specific cases where other methods can't be used.
      </td>
      <td><code>\bexample\b</code></td>
    </tr>
    <tr>
      <td><code>css</code></td>
      <td>String | Array</td>
      <td>
        CSS rules. Unavailable when a website enforces a same-origin
        policy. For performance reasons, only a portion of the available
        CSS rules are used to find matches.
      </td>
      <td><code>"\\.example-class"</code></td>
    </tr>
    <tr>
      <td><code>robots</code></td>
      <td>String | Array</td>
      <td>
        Robots.txt contents.
      </td>
      <td><code>"Disallow: /unique-path/"</code></td>
    </tr>
    <tr>
      <td><code>url</code></td>
      <td>String | Array</td>
      <td>Full URL of the page.</td>
      <td><code>"^https?//.+\\.wordpress\\.com"</code></td>
    </tr>
    <tr>
      <td><code>xhr</code></td>
      <td>String | Array</td>
      <td>Hostnames of XHR requests.</td>
      <td><code>"cdn\\.netlify\\.com"</code></td>
    </tr>
    <tr>
      <td><code>meta</code></td>
      <td>Object</td>
      <td>HTML meta tags, e.g. generator.</td>
      <td><code>{ "generator": "^WordPress$" }</code></td>
    </tr>
    <tr>
      <td><code>scriptSrc</code></td>
      <td>String | Array</td>
      <td>
        URLs of JavaScript files included on the page.
      </td>
      <td><code>"jquery\\.js"</code></td>
    </tr>
    <tr>
      <td><code>scripts</code></td>
      <td>String | Array</td>
      <td>
        JavaScript source code. Inspects inline and external scripts. For performance reasons, avoid
        <code>scripts</code> where possible and use
        <code>js</code> instead.
      </td>
      <td><code>"function webpackJsonpCallback\\(data\\) {"</code></td>
    </tr>
  </tbody>
</table>

## Patterns

Patterns are essentially JavaScript regular expressions written as strings, but with some additions.

### Quirks and pitfalls

-   Because of the string format, the escape character itself must be escaped when using special characters such as the dot (`\\.`). Double quotes must be escaped only once (`\"`). Slashes do not need to be escaped (`/`).
-   Flags are not supported. Regular expressions are treated as case-insensitive.
-   Capture groups (`()`) are used for version detection. In other cases, use non-capturing groups (`(?:)`).
-   Use start and end of string anchors (`^` and `$`) where possible for optimal performance.
-   Short or generic patterns can cause applications to be identified incorrectly. Try to find unique strings to match.

### Tags

Tags (a non-standard syntax) can be appended to patterns (and implies and excludes, separated by `\\;`) to store additional information.

<table>
  <thead>
    <tr>
      <th>Tag</th>
      <th>Description</th>
      <th>Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>confidence</code></td>
      <td>
        Indicates a less reliable pattern that may cause false
        positives. The aim is to achieve a combined confidence of 100%.
        Defaults to 100% if not specified.
      </td>
      <td>
        <code>"js": { "Mage": "\\;confidence:50" }</code>
      </td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>
        Gets the version number from a pattern match using a special
        syntax.
      </td>
      <td>
        <code>"scriptSrc": "jquery-([0-9.]+)\.js\\;version:\\1"</code>
      </td>
    </tr>
  </tbody>
</table>

### Version syntax

Application version information can be obtained from a pattern using a capture group. A condition can be evaluated using the ternary operator (`?:`).

<table>
  <thead>
    <tr>
      <th>Example</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>\\1</code></td>
      <td>Returns the first match.</td>
    </tr>
    <tr>
      <td><code>\\1?a:</code></td>
      <td>
        Returns a if the first match contains a value, nothing
        otherwise.
      </td>
    </tr>
    <tr>
      <td><code>\\1?a:b</code></td>
      <td>
        Returns a if the first match contains a value, b otherwise.
      </td>
    </tr>
    <tr>
      <td><code>\\1?:b</code></td>
      <td>
        Returns nothing if the first match contains a value, b
        otherwise.
      </td>
    </tr>
    <tr>
      <td><code>foo\\1</code></td>
      <td>
        Returns foo with the first match appended.
      </td>
    </tr>
  </tbody>
</table>
