# CC Diagnostic — 5 Representative Posts

Generated to diagnose the failed Constant Contact archive ingestion.
Findings drive the rebuild of `scripts/extract-cc-emails.py`.

## Top-level findings (preview)

- The `<title>` and slug pipeline leak HTML entities. *Whitney Houston . . . and the &quot;Single-Electron Postulate&quot;* became slug `whitney-houston-and-the-quot-single-electron-postulate-quot`. The `&quot;` was never decoded.
- All five posts have **zero `![]` image references in their markdown**, yet between 3 and 137 image files exist on disk under `public/images/posts/{slug}/`. The image-localization step saved the files but the rewritten `<img src=>` attributes never made it into the final markdown.
- markdownify is rendering layout tables (which CC uses for *everything*) as Markdown tables (`| | |` rows + `| --- | --- |` separators), producing the skeleton noise that dominates the post bodies.
- The CC wrapper-strip happens, but the campaign HTML starts with thousands of bytes of `<style>` content; once that's removed, what remains is a deeply nested `<table>` layout. The combination of layout-tables and image-rewriting failure yields a body that's all skeleton, no signal.

---

## `flares-disappearing` (short (58 words, 3 imgs reported))

- **Title in frontmatter**: `Flares disappearing . . .`
- **Source `.eml` (best-fuzzy)**: `Your campaign Flares disappearing . . . has been sent.eml[1].eml`
- **Original `<img>` tags in body**: 4
- **`![]()` image references in markdown**: 0
- **Image files saved to disk in `public/images/posts/flares-disappearing/`**: 3

- **HTML entities present in markdown body**: (none detected — but the slug suggests they leaked at title time)
- **HTML entities present in title**: []
- **Table-skeleton noise present**: YES

### Original campaign HTML body (first 3000 chars, after CC wrapper strip)

```html

                <!DOCTYPE html>
<html>
<head>

<meta content="width=device-width, initial-scale=1.0" name="viewport">

<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<!--[if gte mso 9]>
<style id="ol-styles">
/* OUTLOOK-SPECIFIC STYLES */
li {
text-indent: -1em;
padding: 0;
margin: 0;
line-height: 1.2;
}
ul, ol {
padding: 0;
margin: 0 0 0 40px;
}
p {
margin: 0;
padding: 0;
margin-bottom: 0;
}
sup {
font-size: 85% !important;
}
sub {
font-size: 85% !important;
}
</style>
<![endif]-->
<style id="template-styles-head" data-premailer="ignore">
.footer-main-width {
width: 630px!important;
max-width: 630px;
}
table {
border-collapse: collapse;
table-layout: fixed;
}
.bgimage {
table-layout: auto;
}
.preheader-container {
color: transparent;
display: none;
font-size: 1px;
line-height: 1px;
max-height: 0px;
max-width: 0px;
opacity: 0;
overflow: hidden;
}
/* LIST AND p STYLE OVERRIDES */
.editor-text p {
margin: 0;
padding: 0;
margin-bottom: 0;
}
.editor-text ul,
.editor-text ol {
padding: 0;
margin: 0 0 0 40px;
}
.editor-text li {
padding: 0;
margin: 0;
line-height: 1.2;
}
/* ==================================================
CLIENT/BROWSER SPECIFIC OVERRIDES
================================================== */
/* IE: correctly scale images with w/h attbs */
img {
-ms-interpolation-mode: bicubic;
}
/* Text Link Style Reset */
a {
text-decoration: underline;
}
/* iOS: Autolink styles inherited */
a[x-apple-data-detectors] {
text-decoration: underline !important;
font-size: inherit !important;
font-family: inherit !important;
font-weight: inherit !important;
line-height: inherit !important;
color: inherit !important;
}
/* FF/Chrome: Smooth font rendering */
.editor-text, .MainTextFullWidth {
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
}
/* Gmail/Web viewport fix */
u + .body .template-body {
width: 630px;
}
@media only screen and (max-width:480px) {
u + .body .template-body {
width: 100% !important;
}
}
/* Office365/Outlook.com image reset */
[office365] button, [office365] .divider-base div, [office365] .spacer-base div, [office365] .editor-image div { display: block !important; }
</style>
<style>@media only screen and (max-width:480px) {
table {
border-collapse: collapse;
}
.main-width {
width: 100% !important;
}
.mobile-hidden {
display: none !important;
}
td.OneColumnMobile {
display: block !important;
}
.OneColumnMobile {
width: 100% !important;
}
td.editor-col .editor-text {
padding-left: 20px !important; padding-right: 20px !important;
}
td.editor-col .editor-image.editor-image-hspace-on td {
padding-left: 20px !important; padding-right: 20px !important;
}
td.editor-col .editor-button-container {
padding-left: 20px !important; padding-right: 20px !important;
}
td.editor-col .editor-social td {
padding-left: 20px !important; padding-right: 20px !important;
}
td.editor-col .block-margin {
padding-left: 20px !important; padding-right: 20px !important;
}
td.editor-col td.block-margin 
... [truncated]
```

### Original campaign HTML body — after stripping `<style>`/`<script>` (first 2500 chars)

```html

<!DOCTYPE html>

<html>
<head>


<!--[if gte mso 9]>
<style id="ol-styles">
/* OUTLOOK-SPECIFIC STYLES */
li {
text-indent: -1em;
padding: 0;
margin: 0;
line-height: 1.2;
}
ul, ol {
padding: 0;
margin: 0 0 0 40px;
}
p {
margin: 0;
padding: 0;
margin-bottom: 0;
}
sup {
font-size: 85% !important;
}
sub {
font-size: 85% !important;
}
</style>
<![endif]-->


</head>
<body align="center" bgcolor="#e6e6e6" class="body" style="width: 100%; min-width: 100%; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; background-color: #e6e6e6; margin: 0px; padding: 0px;">
<table border="0" cellpadding="0" cellspacing="0" class="template-body" style="text-align: center; min-width: 100%;" width="100%">
<tr>
<td class="preheader-container">
<div>
<div id="preheader" style="display: none; font-size: 1px; color: transparent; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
<span data-entity-ref="preheader">Watch!</span>
</div>
<img alt="" src="http://r20.rs6.net/on.jsp?ca=1001bd6a-652a-4921-aae7-d84764654e39&amp;a=1133538688559&amp;c=&amp;ch="/>
</div>
</td>
</tr>
<tr>
<td align="center" class="template-shell-container">
<div class="bgcolor" style="background-color: #e6e6e6;">
<table bgcolor="#e6e6e6" border="0" cellpadding="0" cellspacing="0" class="bgimage" style="background-color: #e6e6e6;" width="100%">
<tbody>
<tr>
<td align="center">
<table align="center" border="0" cellpadding="0" cellspacing="0" class="main-width" style="width: 630px;" width="630">
<tbody>
<tr>
<td align="center" class="layout" style="padding: 15px 5px;" valign="top">
<table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
<tbody>
<tr>
<td align="center" bgcolor="#869198" class="layout-container-border" style="background-color: #869198; padding: 10px;" valign="top">
<table align="center" bgcolor="#869198" border="0" cellpadding="0" cellspacing="0" style="background-color: #869198;" width="100%">
<tbody>
<tr>
<td align="center" bgcolor="#ffffff" class="layout-container" style="background-color: #ffffff; padding: 0;" valign="top">
<div class=""><table border="0" cellpadding="0" cellspacing="0" class="galileo-ap-layout-editor" style="min-width: 100%;" width="100%">
<tbody>
<tr>
<td align="" class="editor-col OneColumnMobile" valign="top" width="100%">
<div class="gl-contains-image">
<table border="0" cellpadding="0" cellspacing="0" class="editor-image editor-image-vspace-on" style="min-width: 100%;" width="100%">
<tbody>
<tr>
<td align="cent
... [truncated]
```

### Currently extracted markdown body

```markdown

|  |
| --- |
| Watch! |
| |  |  |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | | |  |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | | |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | | |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | | |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | | |  | | --- | |  |  |  | | --- | | --"My clients aren't in the flare business. They're in the petrochemical business. If they can make more money now without flares . . . that's what they'll do. We're presenting them with this option."  - Jed Anderson, Attorney & Entrepreneur, The AL Law Group |  |  |  | | --- | --- | | |  | | --- | |  | |  |  |  |  | | --- | --- | --- | | |  |  | | --- | --- | | |  | | --- | | [Project Details](http://r20.rs6.net/tn.jsp?f=0010O25PG3NoNfU7eyeDW_kxXxlnSeU-2CXUbkaKRcooaDFFl46gDLl2WIyZ_VQIos6rUOSjkowr_Cng0cCYLUzo4aZVhQQ59gnB9pQ6KtmGGB9UozHpBVWdyIyM_Zgc4Uo9aoRl8ocBWeXCco8OAOde1uci6Xv5gFkv3YCvpbq7z2SpvuxbmH2aD0JN9qQpx2J0JcKcGC_7j78wuMjUKcLQ3jHKFNmoChHPXNrqZ8afv8=&c=&ch=) | | | | | | | | |
|  |

|  |
|  |

```

---

## `protecting-your-children` (medium (145 words, 12 imgs reported))

- **Title in frontmatter**: `Protecting your children . . .`
- **Source `.eml` (best-fuzzy)**: `Your campaign Protecting your children and grandchildren . . . has been sent.eml[1].eml`
- **Original `<img>` tags in body**: 10
- **`![]()` image references in markdown**: 0
- **Image files saved to disk in `public/images/posts/protecting-your-children/`**: 12

- **HTML entities present in markdown body**: (none detected — but the slug suggests they leaked at title time)
- **HTML entities present in title**: []
- **Table-skeleton noise present**: YES

### Original campaign HTML body (first 3000 chars, after CC wrapper strip)

```html

                <!DOCTYPE html>
<html>
<head>

<meta content="width=device-width, initial-scale=1.0" name="viewport">

<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<!--[if gte mso 9]>
<style id="ol-styles">
/* OUTLOOK-SPECIFIC STYLES */
li {
text-indent: -1em;
padding: 0;
margin: 0;
line-height: 1.2;
}
ul, ol {
padding: 0;
margin: 0 0 0 40px;
}
p {
margin: 0;
padding: 0;
margin-bottom: 0;
}
sup {
font-size: 85% !important;
}
sub {
font-size: 85% !important;
}
</style>
<![endif]-->
<style id="template-styles-head" data-premailer="ignore">
.footer-main-width {
width: 630px!important;
max-width: 630px;
}
table {
border-collapse: collapse;
table-layout: fixed;
}
.bgimage {
table-layout: auto;
}
.preheader-container {
color: transparent;
display: none;
font-size: 1px;
line-height: 1px;
max-height: 0px;
max-width: 0px;
opacity: 0;
overflow: hidden;
}
/* LIST AND p STYLE OVERRIDES */
.editor-text p {
margin: 0;
padding: 0;
margin-bottom: 0;
}
.editor-text ul,
.editor-text ol {
padding: 0;
margin: 0 0 0 40px;
}
.editor-text li {
padding: 0;
margin: 0;
line-height: 1.2;
}
/* ==================================================
CLIENT/BROWSER SPECIFIC OVERRIDES
================================================== */
/* IE: correctly scale images with w/h attbs */
img {
-ms-interpolation-mode: bicubic;
}
/* Text Link Style Reset */
a {
text-decoration: underline;
}
/* iOS: Autolink styles inherited */
a[x-apple-data-detectors] {
text-decoration: underline !important;
font-size: inherit !important;
font-family: inherit !important;
font-weight: inherit !important;
line-height: inherit !important;
color: inherit !important;
}
/* FF/Chrome: Smooth font rendering */
.editor-text, .MainTextFullWidth {
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
}
/* Gmail/Web viewport fix */
u + .body .template-body {
width: 630px;
}
@media only screen and (max-width:480px) {
u + .body .template-body {
width: 100% !important;
}
}
/* Office365/Outlook.com image reset */
[office365] button, [office365] .divider-base div, [office365] .spacer-base div, [office365] .editor-image div { display: block !important; }
</style>
<style>@media only screen and (max-width:480px) {
table {
border-collapse: collapse;
}
.main-width {
width: 100% !important;
}
.mobile-hidden {
display: none !important;
}
td.OneColumnMobile {
display: block !important;
}
.OneColumnMobile {
width: 100% !important;
}
td.editor-col .editor-text {
padding-left: 20px !important; padding-right: 20px !important;
}
td.editor-col .editor-image.editor-image-hspace-on td {
padding-left: 20px !important; padding-right: 20px !important;
}
td.editor-col .editor-button-container {
padding-left: 20px !important; padding-right: 20px !important;
}
td.editor-col .editor-social td {
padding-left: 20px !important; padding-right: 20px !important;
}
td.editor-col .block-margin {
padding-left: 20px !important; padding-right: 20px !important;
}
td.editor-col td.block-margin 
... [truncated]
```

### Original campaign HTML body — after stripping `<style>`/`<script>` (first 2500 chars)

```html

<!DOCTYPE html>

<html>
<head>


<!--[if gte mso 9]>
<style id="ol-styles">
/* OUTLOOK-SPECIFIC STYLES */
li {
text-indent: -1em;
padding: 0;
margin: 0;
line-height: 1.2;
}
ul, ol {
padding: 0;
margin: 0 0 0 40px;
}
p {
margin: 0;
padding: 0;
margin-bottom: 0;
}
sup {
font-size: 85% !important;
}
sub {
font-size: 85% !important;
}
</style>
<![endif]-->


</head>
<body align="center" bgcolor="#e6e6e6" class="body" style="width: 100%; min-width: 100%; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; background-color: #e6e6e6; margin: 0px; padding: 0px;">
<table border="0" cellpadding="0" cellspacing="0" class="template-body" style="text-align: center; min-width: 100%;" width="100%">
<tr>
<td class="preheader-container">
<div>
<div id="preheader" style="display: none; font-size: 1px; color: transparent; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
<span data-entity-ref="preheader"></span>
</div>
<img alt="" src="http://r20.rs6.net/on.jsp?ca=c8c39509-721f-471d-8ecc-e79ba3702291&amp;a=1133538688559&amp;c=&amp;ch="/>
</div>
</td>
</tr>
<tr>
<td align="center" class="template-shell-container">
<div class="bgcolor" style="background-color: #e6e6e6;">
<table bgcolor="#e6e6e6" border="0" cellpadding="0" cellspacing="0" class="bgimage" style="background-color: #e6e6e6;" width="100%">
<tbody>
<tr>
<td align="center">
<table align="center" border="0" cellpadding="0" cellspacing="0" class="main-width" style="width: 630px;" width="630">
<tbody>
<tr>
<td align="center" class="layout" style="padding: 15px 5px;" valign="top">
<table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
<tbody>
<tr>
<td align="center" bgcolor="#869198" class="layout-container-border" style="background-color: #869198; padding: 10px;" valign="top">
<table align="center" bgcolor="#869198" border="0" cellpadding="0" cellspacing="0" style="background-color: #869198;" width="100%">
<tbody>
<tr>
<td align="center" bgcolor="#ffffff" class="layout-container" style="background-color: #ffffff; padding: 0;" valign="top">
<div class="">
<table border="0" cellpadding="0" cellspacing="0" class="galileo-ap-layout-editor" style="min-width: 100%;" width="100%">
<tbody>
<tr>
<td align="" class="editor-col OneColumnMobile" valign="top" width="100%">
<div class="gl-contains-spacer">
<table border="0" cellpadding="0" cellspacing="0" class="editor-spacer" width="100%">
<tbody>
<tr>
<td align="center" class="" valign="top">
<table border="0" cellpa
... [truncated]
```

### Currently extracted markdown body

```markdown

|  |
| --- |
| by 2035 |
| |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | | |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | | |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | | |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | | |  |  |  | | --- | --- | --- | | |  |  | | --- | --- | | |  | | --- | |  | | |  |  |  | | --- | --- | | |  | | --- | | Why do we care about your children? | |  |  |  | | --- | --- | | |  | | --- | | Earth's future depends on them. [And they are eternal beings] | |  |  |  | | --- | --- | | |  | | --- | | We're a "for-profit company" with a "non-profit mission" . . . to build a machine to protect earth. | |  |  |  |  |  |  | | --- | --- | --- | --- | --- | | |  | | --- | | EnviroAI is approximately 2% complete toward our mission of building an "[environmental protection machine](https://r20.rs6.net/tn.jsp?f=001qAI7k70pstHEUTZ8P4nBi5YXdNY-w43QDRWu-8vnuAB8rT3qLeVODHnN8y2PVjWhT2PZV8_pw8VRUTbN2RfNjMydgEamoQpifFKI-1wwol8HdoEW-ALpLTxU5fm3zPBv0FluHnP0Hp-wIBPkSbx4ag==&c=&ch=)" using data, AI, and remote sensing technologies. | | |  |  | | --- | --- | | |  | | --- | |  | | |  |  |  |  |  |  | | --- | --- | --- | --- | --- | | |  |  | | --- | --- | | |  | | --- | |  | | | |  | | --- | | Our projected mission completion date is 2035. | |  |  |  |  | | --- | --- | --- | | |  |  | | --- | --- | | |  | | --- | |  | | |  |  |  | | --- | --- | | |  | | --- | |  | |  |  |  | | --- | --- | | |  | | --- | |  | |  |  |  |  |  | | --- | --- | --- | --- | | |  | | --- | |  |  |  | | --- | |  |  |  | | --- | |  | |  |  |  | | --- | --- | | |  | | --
... [truncated]
```

---

## `whitney-houston-and-the-quot-single-electron-postulate-quot` (10K+ words (14952 words, 137 imgs reported))

- **Title in frontmatter**: `Whitney Houston . . . and the &quot;Single-Electron Postulate&quot; . . .`
- **Source `.eml` (best-fuzzy)**: `Your campaign Whitney Houston . . . and the _Single-Electron Postulate_ . . . has been sent.eml[1].eml`
- **Original `<img>` tags in body**: 138
- **`![]()` image references in markdown**: 0
- **Image files saved to disk in `public/images/posts/whitney-houston-and-the-quot-single-electron-postulate-quot/`**: 137

- **HTML entities present in markdown body**: (none detected — but the slug suggests they leaked at title time)
- **HTML entities present in title**: ['&quot;']
- **Table-skeleton noise present**: YES

### Original campaign HTML body (first 3000 chars, after CC wrapper strip)

```html

                <!DOCTYPE html>
<html>
<head>

<meta content="width=device-width, initial-scale=1.0" name="viewport">

<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<!--[if gte mso 9]>
<style id="ol-styles">
/* OUTLOOK-SPECIFIC STYLES */
li {
text-indent: -1em;
padding: 0;
margin: 0;
line-height: 1.2;
}
ul, ol {
padding: 0;
margin: 0 0 0 40px;
}
p {
margin: 0;
padding: 0;
margin-bottom: 0;
}
sup {
font-size: 85% !important;
}
sub {
font-size: 85% !important;
}
</style>
<![endif]-->
<style id="template-styles-head" data-premailer="ignore">
.footer-main-width {
width: 630px!important;
max-width: 630px;
}
table {
border-collapse: collapse;
table-layout: fixed;
}
.bgimage {
table-layout: auto;
}
.preheader-container {
color: transparent;
display: none;
font-size: 1px;
line-height: 1px;
max-height: 0px;
max-width: 0px;
opacity: 0;
overflow: hidden;
}
/* LIST AND p STYLE OVERRIDES */
.editor-text p {
margin: 0;
padding: 0;
margin-bottom: 0;
}
.editor-text ul,
.editor-text ol {
padding: 0;
margin: 0 0 0 40px;
}
.editor-text li {
padding: 0;
margin: 0;
line-height: 1.2;
}
/* ==================================================
CLIENT/BROWSER SPECIFIC OVERRIDES
================================================== */
/* IE: correctly scale images with w/h attbs */
img {
-ms-interpolation-mode: bicubic;
}
/* Text Link Style Reset */
a {
text-decoration: underline;
}
/* iOS: Autolink styles inherited */
a[x-apple-data-detectors] {
text-decoration: underline !important;
font-size: inherit !important;
font-family: inherit !important;
font-weight: inherit !important;
line-height: inherit !important;
color: inherit !important;
}
/* FF/Chrome: Smooth font rendering */
.editor-text, .MainTextFullWidth {
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
}
/* Gmail/Web viewport fix */
u + .body .template-body {
width: 630px;
}
@media only screen and (max-width:480px) {
u + .body .template-body {
width: 100% !important;
}
}
/* Office365/Outlook.com image reset */
[office365] button, [office365] .divider-base div, [office365] .spacer-base div, [office365] .editor-image div { display: block !important; }
</style>
<style>@media only screen and (max-width:480px) {
table {
border-collapse: collapse;
}
.main-width {
width: 100% !important;
}
.mobile-hidden {
display: none !important;
}
td.OneColumnMobile {
display: block !important;
}
.OneColumnMobile {
width: 100% !important;
}
td.editor-col .editor-text {
padding-left: 20px !important; padding-right: 20px !important;
}
td.editor-col .editor-image.editor-image-hspace-on td {
padding-left: 20px !important; padding-right: 20px !important;
}
td.editor-col .editor-button-container {
padding-left: 20px !important; padding-right: 20px !important;
}
td.editor-col .editor-social td {
padding-left: 20px !important; padding-right: 20px !important;
}
td.editor-col .block-margin {
padding-left: 20px !important; padding-right: 20px !important;
}
td.editor-col td.block-margin 
... [truncated]
```

### Original campaign HTML body — after stripping `<style>`/`<script>` (first 2500 chars)

```html

<!DOCTYPE html>

<html>
<head>


<!--[if gte mso 9]>
<style id="ol-styles">
/* OUTLOOK-SPECIFIC STYLES */
li {
text-indent: -1em;
padding: 0;
margin: 0;
line-height: 1.2;
}
ul, ol {
padding: 0;
margin: 0 0 0 40px;
}
p {
margin: 0;
padding: 0;
margin-bottom: 0;
}
sup {
font-size: 85% !important;
}
sub {
font-size: 85% !important;
}
</style>
<![endif]-->


</head>
<body align="center" bgcolor="#e6e6e6" class="body" style="width: 100%; min-width: 100%; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; background-color: #e6e6e6; margin: 0px; padding: 0px;">
<table border="0" cellpadding="0" cellspacing="0" class="template-body" style="text-align: center; min-width: 100%;" width="100%">
<tr>
<td class="preheader-container">
<div>
<div id="preheader" style="display: none; font-size: 1px; color: transparent; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
<span data-entity-ref="preheader">"When I see simplicity in the world . . . radical simplicity . . . creative simplicity . . . I about want to do cartwheels." - Jed Anderson, EnviroAI</span>
</div>
<img alt="" src="https://r20.rs6.net/on.jsp?ca=5d9dc01f-b349-478e-b4ab-9bb7d9603e25&amp;a=1133538688559&amp;c=&amp;ch="/>
</div>
</td>
</tr>
<tr>
<td align="center" class="template-shell-container">
<div class="bgcolor" style="background-color: #e6e6e6;">
<!--[if gte mso 9]>
<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
<v:fill type="tile" src="https://mlsvc01-prod.s3.amazonaws.com/f2ebb2ce701/09d8ea67-ab6e-4d5e-b135-6ed4a676057d.gif" color="#e6e6e6" ></v:fill>
</v:background>
<![endif]-->
<table background="https://mlsvc01-prod.s3.amazonaws.com/f2ebb2ce701/09d8ea67-ab6e-4d5e-b135-6ed4a676057d.gif" border="0" cellpadding="0" cellspacing="0" class="bgimage" style="background: url('https://mlsvc01-prod.s3.amazonaws.com/f2ebb2ce701/09d8ea67-ab6e-4d5e-b135-6ed4a676057d.gif') repeat top left;" width="100%">
<tbody>
<tr>
<td align="center">
<table align="center" border="0" cellpadding="0" cellspacing="0" class="main-width" style="width: 630px;" width="630">
<tbody>
<tr>
<td align="center" class="layout" style="padding: 15px 5px;" valign="top">
<table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
<tbody>
<tr>
<td align="center" bgcolor="#869198" class="layout-container-border" style="background-color: #869198; padding: 10px;" valign="top">
<table align="center" bgcolor="#869198" border="0" cellpadding="0" cellspacing="0" style="backgrou
... [truncated]
```

### Currently extracted markdown body

```markdown

|  |
| --- |
| "When I see simplicity in the world . . . radical simplicity . . . creative simplicity . . . I about want to do cartwheels." - Jed Anderson, EnviroAI |
| |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | 
... [truncated]
```

---

## `harbor-or-open-sea` (10K+ words zero-image (14023 words, 0 imgs reported))

- **Title in frontmatter**: `Harbor or open sea?`
- **Source `.eml` (best-fuzzy)**: `Your campaign Harbor or open sea_ has been sent.eml[1].eml`
- **Original `<img>` tags in body**: 118
- **`![]()` image references in markdown**: 0
- **Image files saved to disk in `public/images/posts/harbor-or-open-sea/`**: 117

- **HTML entities present in markdown body**: (none detected — but the slug suggests they leaked at title time)
- **HTML entities present in title**: []
- **Table-skeleton noise present**: YES

### Original campaign HTML body (first 3000 chars, after CC wrapper strip)

```html

                <!DOCTYPE html>
<html>
<head>

<meta content="width=device-width, initial-scale=1.0" name="viewport">

<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<!--[if gte mso 9]>
<style id="ol-styles">
/* OUTLOOK-SPECIFIC STYLES */
li {
text-indent: -1em;
padding: 0;
margin: 0;
line-height: 1.2;
}
ul, ol {
padding: 0;
margin: 0 0 0 40px;
}
p {
margin: 0;
padding: 0;
margin-bottom: 0;
}
sup {
font-size: 85% !important;
}
sub {
font-size: 85% !important;
}
</style>
<![endif]-->
<style id="template-styles-head" data-premailer="ignore">
.footer-main-width {
width: 630px!important;
max-width: 630px;
}
table {
border-collapse: collapse;
table-layout: fixed;
}
.bgimage {
table-layout: auto;
}
.preheader-container {
color: transparent;
display: none;
font-size: 1px;
line-height: 1px;
max-height: 0px;
max-width: 0px;
opacity: 0;
overflow: hidden;
}
/* LIST AND p STYLE OVERRIDES */
.editor-text p {
margin: 0;
padding: 0;
margin-bottom: 0;
}
.editor-text ul,
.editor-text ol {
padding: 0;
margin: 0 0 0 40px;
}
.editor-text li {
padding: 0;
margin: 0;
line-height: 1.2;
}
/* ==================================================
CLIENT/BROWSER SPECIFIC OVERRIDES
================================================== */
/* IE: correctly scale images with w/h attbs */
img {
-ms-interpolation-mode: bicubic;
}
/* Text Link Style Reset */
a {
text-decoration: underline;
}
/* iOS: Autolink styles inherited */
a[x-apple-data-detectors] {
text-decoration: underline !important;
font-size: inherit !important;
font-family: inherit !important;
font-weight: inherit !important;
line-height: inherit !important;
color: inherit !important;
}
/* FF/Chrome: Smooth font rendering */
.editor-text, .MainTextFullWidth {
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
}
/* Gmail/Web viewport fix */
u + .body .template-body {
width: 630px;
}
@media only screen and (max-width:480px) {
u + .body .template-body {
width: 100% !important;
}
}
/* Office365/Outlook.com image reset */
[office365] button, [office365] .divider-base div, [office365] .spacer-base div, [office365] .editor-image div { display: block !important; }
</style>
<style>@media only screen and (max-width:480px) {
table {
border-collapse: collapse;
}
.main-width {
width: 100% !important;
}
.mobile-hidden {
display: none !important;
}
td.OneColumnMobile {
display: block !important;
}
.OneColumnMobile {
width: 100% !important;
}
td.editor-col .editor-text {
padding-left: 20px !important; padding-right: 20px !important;
}
td.editor-col .editor-image.editor-image-hspace-on td {
padding-left: 20px !important; padding-right: 20px !important;
}
td.editor-col .editor-button-container {
padding-left: 20px !important; padding-right: 20px !important;
}
td.editor-col .editor-social td {
padding-left: 20px !important; padding-right: 20px !important;
}
td.editor-col .block-margin {
padding-left: 20px !important; padding-right: 20px !important;
}
td.editor-col td.block-margin 
... [truncated]
```

### Original campaign HTML body — after stripping `<style>`/`<script>` (first 2500 chars)

```html

<!DOCTYPE html>

<html>
<head>


<!--[if gte mso 9]>
<style id="ol-styles">
/* OUTLOOK-SPECIFIC STYLES */
li {
text-indent: -1em;
padding: 0;
margin: 0;
line-height: 1.2;
}
ul, ol {
padding: 0;
margin: 0 0 0 40px;
}
p {
margin: 0;
padding: 0;
margin-bottom: 0;
}
sup {
font-size: 85% !important;
}
sub {
font-size: 85% !important;
}
</style>
<![endif]-->


</head>
<body align="center" bgcolor="#e6e6e6" class="body" style="width: 100%; min-width: 100%; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; background-color: #e6e6e6; margin: 0px; padding: 0px;">
<table border="0" cellpadding="0" cellspacing="0" class="template-body" style="text-align: center; min-width: 100%;" width="100%">
<tr>
<td class="preheader-container">
<div>
<div id="preheader" style="display: none; font-size: 1px; color: transparent; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
<span data-entity-ref="preheader">Shore or Adventure?</span>
</div>
<img alt="" src="https://r20.rs6.net/on.jsp?ca=e742eaf6-0e68-4625-ae38-b5b7557bd59f&amp;a=1133538688559&amp;c=&amp;ch="/>
</div>
</td>
</tr>
<tr>
<td align="center" class="template-shell-container">
<div class="bgcolor" style="background-color: #e6e6e6;">
<!--[if gte mso 9]>
<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
<v:fill type="tile" src="https://mlsvc01-prod.s3.amazonaws.com/f2ebb2ce701/09d8ea67-ab6e-4d5e-b135-6ed4a676057d.gif" color="#e6e6e6" ></v:fill>
</v:background>
<![endif]-->
<table background="https://mlsvc01-prod.s3.amazonaws.com/f2ebb2ce701/09d8ea67-ab6e-4d5e-b135-6ed4a676057d.gif" border="0" cellpadding="0" cellspacing="0" class="bgimage" style="background: url('https://mlsvc01-prod.s3.amazonaws.com/f2ebb2ce701/09d8ea67-ab6e-4d5e-b135-6ed4a676057d.gif') repeat top left;" width="100%">
<tbody>
<tr>
<td align="center">
<table align="center" border="0" cellpadding="0" cellspacing="0" class="main-width" style="width: 630px;" width="630">
<tbody>
<tr>
<td align="center" class="layout" style="padding: 15px 5px;" valign="top">
<table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
<tbody>
<tr>
<td align="center" bgcolor="#869198" class="layout-container-border" style="background-color: #869198; padding: 10px;" valign="top">
<table align="center" bgcolor="#869198" border="0" cellpadding="0" cellspacing="0" style="background-color: #869198;" width="100%">
<tbody>
<tr>
<td align="center" bgcolor="#ffffff" class="layout-container" style="background-col
... [truncated]
```

### Currently extracted markdown body

```markdown

|  |
| --- |
| Shore or Adventure? |
| |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- 
... [truncated]
```

---

## `i-love-open-space-more-room-to-roam` (high images (12328 words, 130 imgs reported))

- **Title in frontmatter**: `I LOVE OPEN SPACE! . . . MORE ROOM TO ROAM!`
- **Source `.eml` (best-fuzzy)**: `Your campaign I LOVE OPEN SPACE! . . . MORE ROOM TO ROAM! has been sent.eml[1].eml`
- **Original `<img>` tags in body**: 131
- **`![]()` image references in markdown**: 0
- **Image files saved to disk in `public/images/posts/i-love-open-space-more-room-to-roam/`**: 130

- **HTML entities present in markdown body**: (none detected — but the slug suggests they leaked at title time)
- **HTML entities present in title**: []
- **Table-skeleton noise present**: YES

### Original campaign HTML body (first 3000 chars, after CC wrapper strip)

```html

                <!DOCTYPE html>
<html>
<head>

<meta content="width=device-width, initial-scale=1.0" name="viewport">

<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<!--[if gte mso 9]>
<style id="ol-styles">
/* OUTLOOK-SPECIFIC STYLES */
li {
text-indent: -1em;
padding: 0;
margin: 0;
line-height: 1.2;
}
ul, ol {
padding: 0;
margin: 0 0 0 40px;
}
p {
margin: 0;
padding: 0;
margin-bottom: 0;
}
sup {
font-size: 85% !important;
}
sub {
font-size: 85% !important;
}
</style>
<![endif]-->
<style id="template-styles-head" data-premailer="ignore">
.footer-main-width {
width: 630px!important;
max-width: 630px;
}
table {
border-collapse: collapse;
table-layout: fixed;
}
.bgimage {
table-layout: auto;
}
.preheader-container {
color: transparent;
display: none;
font-size: 1px;
line-height: 1px;
max-height: 0px;
max-width: 0px;
opacity: 0;
overflow: hidden;
}
/* LIST AND p STYLE OVERRIDES */
.editor-text p {
margin: 0;
padding: 0;
margin-bottom: 0;
}
.editor-text ul,
.editor-text ol {
padding: 0;
margin: 0 0 0 40px;
}
.editor-text li {
padding: 0;
margin: 0;
line-height: 1.2;
}
/* ==================================================
CLIENT/BROWSER SPECIFIC OVERRIDES
================================================== */
/* IE: correctly scale images with w/h attbs */
img {
-ms-interpolation-mode: bicubic;
}
/* Text Link Style Reset */
a {
text-decoration: underline;
}
/* iOS: Autolink styles inherited */
a[x-apple-data-detectors] {
text-decoration: underline !important;
font-size: inherit !important;
font-family: inherit !important;
font-weight: inherit !important;
line-height: inherit !important;
color: inherit !important;
}
/* FF/Chrome: Smooth font rendering */
.editor-text, .MainTextFullWidth {
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
}
/* Gmail/Web viewport fix */
u + .body .template-body {
width: 630px;
}
@media only screen and (max-width:480px) {
u + .body .template-body {
width: 100% !important;
}
}
/* Office365/Outlook.com image reset */
[office365] button, [office365] .divider-base div, [office365] .spacer-base div, [office365] .editor-image div { display: block !important; }
</style>
<style>@media only screen and (max-width:480px) {
table {
border-collapse: collapse;
}
.main-width {
width: 100% !important;
}
.mobile-hidden {
display: none !important;
}
td.OneColumnMobile {
display: block !important;
}
.OneColumnMobile {
width: 100% !important;
}
td.editor-col .editor-text {
padding-left: 20px !important; padding-right: 20px !important;
}
td.editor-col .editor-image.editor-image-hspace-on td {
padding-left: 20px !important; padding-right: 20px !important;
}
td.editor-col .editor-button-container {
padding-left: 20px !important; padding-right: 20px !important;
}
td.editor-col .editor-social td {
padding-left: 20px !important; padding-right: 20px !important;
}
td.editor-col .block-margin {
padding-left: 20px !important; padding-right: 20px !important;
}
td.editor-col td.block-margin 
... [truncated]
```

### Original campaign HTML body — after stripping `<style>`/`<script>` (first 2500 chars)

```html

<!DOCTYPE html>

<html>
<head>


<!--[if gte mso 9]>
<style id="ol-styles">
/* OUTLOOK-SPECIFIC STYLES */
li {
text-indent: -1em;
padding: 0;
margin: 0;
line-height: 1.2;
}
ul, ol {
padding: 0;
margin: 0 0 0 40px;
}
p {
margin: 0;
padding: 0;
margin-bottom: 0;
}
sup {
font-size: 85% !important;
}
sub {
font-size: 85% !important;
}
</style>
<![endif]-->


</head>
<body align="center" bgcolor="#e6e6e6" class="body" style="width: 100%; min-width: 100%; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; background-color: #e6e6e6; margin: 0px; padding: 0px;">
<table border="0" cellpadding="0" cellspacing="0" class="template-body" style="text-align: center; min-width: 100%;" width="100%">
<tr>
<td class="preheader-container">
<div>
<div id="preheader" style="display: none; font-size: 1px; color: transparent; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
<span data-entity-ref="preheader">South Dakota . . . prairies &amp; universe(s)</span>
</div>
<img alt="" src="https://r20.rs6.net/on.jsp?ca=264e6caf-98e9-4e7d-a509-9bceb9753e39&amp;a=1133538688559&amp;c=&amp;ch="/>
</div>
</td>
</tr>
<tr>
<td align="center" class="template-shell-container">
<div class="bgcolor" style="background-color: #e6e6e6;">
<table bgcolor="#e6e6e6" border="0" cellpadding="0" cellspacing="0" class="bgimage" style="background-color: #e6e6e6;" width="100%">
<tbody>
<tr>
<td align="center">
<table align="center" border="0" cellpadding="0" cellspacing="0" class="main-width" style="width: 630px;" width="630">
<tbody>
<tr>
<td align="center" class="layout" style="padding: 15px 5px;" valign="top">
<table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
<tbody>
<tr>
<td align="center" bgcolor="#869198" class="layout-container-border" style="background-color: #869198; padding: 10px;" valign="top">
<table align="center" bgcolor="#869198" border="0" cellpadding="0" cellspacing="0" style="background-color: #869198;" width="100%">
<tbody>
<tr>
<td align="center" bgcolor="#ffffff" class="layout-container" style="background-color: #ffffff; padding: 0;" valign="top">
<div class="">
<table border="0" cellpadding="0" cellspacing="0" class="galileo-ap-layout-editor" style="min-width: 100%;" width="100%">
<tbody>
<tr>
<td align="" class="editor-col OneColumnMobile" valign="top" width="100%">
<div class="gl-contains-spacer">
<table border="0" cellpadding="0" cellspacing="0" class="editor-spacer" width="100%">
<tbody>
<tr>
<td align="center" c
... [truncated]
```

### Currently extracted markdown body

```markdown

|  |
| --- |
| South Dakota . . . prairies & universe(s) |
| |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | 
... [truncated]
```

---

## Diagnosis — what's broken in the extractor

### Bug 1 — HTML entities not decoded before slugify / display

In `extract-cc-emails.py::extract_title_from_html` the regex captures the raw text between `<b>Subject:</b>` and the closing `<hr>`. The captured group is wrapped with `re.sub(r"\s+", " ", t).strip().strip("'\"")` but `html.unescape()` is never called.

Effect: titles like *Whitney Houston . . . and the &quot;Single-Electron Postulate&quot;* are stored verbatim into frontmatter (which is wrong) and slugified verbatim (which is why the slug contains `-quot-`).

**Fix**: in `extract_title_from_html`, return `html.unescape(t)`. Apply unescape to all text fields pulled from HTML before they hit frontmatter or markdown post-processing.

### Bug 2 — image localization writes files but never updates markdown image references

`localize_images` builds tasks, writes files to disk, AND assigns `img_tag['src'] = '/images/posts/{slug}/{file}'` on the parsed BeautifulSoup tree. It returns `str(soup)` as the modified HTML. The caller passes that to `clean_campaign_html`, then `markdownify`.

BUT — many CC campaigns use background-image style attributes rather than `<img>` tags for content imagery, AND when the layout uses `<td background="...">` instead of `<img>`, our extractor never sees them. Worse — even the proper `<img>` tags that we localized correctly are being **stripped by markdownify when they sit inside a `<table>` cell** that the converter is rendering as a markdown table row.

Evidence: all five samples have files on disk (range 3-137) but **zero `![]()` references in the markdown body**. The image attributes were updated on the soup tree but the tags got swallowed when markdownify rendered the surrounding `<table>` as a Markdown table — Markdown table cells can't contain block-level image syntax, so markdownify drops them.

**Fix options**:
- Before running markdownify, convert layout-tables to a flat sequence of `<div>` blocks (BeautifulSoup pass that replaces every `<table>`/`<tr>`/`<td>` with `<div>` so markdownify treats the contents as block flow, not as table data).
- Or use `markdownify(..., strip=['table', 'thead', 'tbody', 'tr', 'td'])` to unwrap the table structure entirely — image and prose content inside cells survives, table layout is discarded.
- Either way, also extract `<td background="...">` and `style="background-image: url(...)"` references as additional image sources before stripping.

### Bug 3 — markdownify rendering layout tables as Markdown tables

Default markdownify behavior: a `<table>` becomes a Markdown pipe table; nested or layout tables become nested pipe tables that quickly degenerate into skeleton output (`| | | --- | --- |`).

Evidence: `flares-disappearing.md` body is a 2-row, 1-cell table where the cell contains another table whose cells contain another table — etc. — and every level renders as a separator row. Net output is mostly `| | | | --- | --- | --- |` noise with the actual quote (`'My clients aren't in the flare business…'`) buried in the middle.

**Fix**: unwrap all `<table>`, `<tbody>`, `<thead>`, `<tr>`, `<td>` elements into plain `<div>` flow before calling markdownify. CC uses tables for layout exclusively; there are no genuine tabular data tables in this corpus.

### Bug 4 — word-count quarantine threshold counted skeleton noise as words

Because the body is now mostly `| | --- |` skeleton + a single short paragraph, the word-count classifier saw mostly low-content posts and quarantined them. The 50-word floor was the wrong knob; the actual problem is that the skeleton inflated some counts and the prose-only count was tiny.

**Fix**: once the table-unwrap above lands, the body will contain only prose + image refs + links. Word counts then reflect real content. The 15-word floor from the recalibration step is probably right for the rebuilt corpus.

## Recommended rebuild order

1. Patch `extract-cc-emails.py`:
   - `html.unescape()` on all text extracted from HTML before frontmatter/markdown.
   - Pre-markdownify: BeautifulSoup pass to unwrap `<table>/<tbody>/<thead>/<tr>/<td>` into `<div>`. Preserve cell text order.
   - Pre-markdownify: harvest `<td background>` and `style="background-image: url(...)"` URLs as additional image sources.
   - Drop the wrapper `<div>Dear Jed Anderson,</div>` block and any other CC confirmation chrome that's currently surviving.
2. Delete the broken extracted markdown (already drafted, easy to wipe).
3. Re-run the pipeline. Images already on disk should be reusable — the new run should overwrite markdown and **add** image refs to it; the existing image files don't need re-downloading.
4. Re-classify with the 15-word floor.
5. Rebuild + push.
