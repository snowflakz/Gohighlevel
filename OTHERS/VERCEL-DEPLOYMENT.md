# Fixing the BrigePoint Vercel deployment

The public address https://gohighlevel-beta.vercel.app/ returned Vercel's `404 NOT_FOUND` during review on 4 October 2026. This is confirmed. The precise project-side cause is not confirmed because the dashboard requires sign-in.

The homepage is a static HTML file. Vercel needs to publish the folder containing that file. Configuration files now specify the correct output location.

## Choose the row matching the files you deploy

| Uploaded/repository contents | Root Directory | Output Directory |
|---|---|---|
| This complete GoHighlevel workspace, with `site/dist/index.html` | Leave empty (repository root) | `site/dist` |
| Extracted BrigePoint-vercel-ready.zip, with `dist/index.html` | Leave empty (extracted root) | `dist` |
| Repository root selected as `site` | `site` | `dist` |

For all three: Framework Preset **Other**; Build Command **empty**; Install Command **empty**. The supplied vercel.json already sets those values. Do not deploy the strategy folder or workbook. Do not set Output Directory to `public`, `.next`, or `build`.

1. Put the corrected files in the repository/source connected to the existing Vercel project. Local edits do not update Vercel automatically.
2. In the project's build settings, use the matching row above. Check Root Directory carefully; vercel.json cannot correct a wrong Root Directory selection.
3. Create a new production deployment containing these files. Redeploying an old commit will not include local fixes.
4. Confirm the deployment is Ready and its output contains `index.html`, `css`, `js`, and `assets` at the output root.
5. Open that deployment's unique URL. If it works but gohighlevel-beta.vercel.app does not, check the project's domain assignment/production deployment.
6. Verify homepage, privacy.html, image, checklist, referral buttons, and both video players.

If the deployment still returns 404, inspect its source commit and deployment output before changing routing. This site does not need an SPA rewrite.

## Launch status

The site remains a review build with noindex. Email capture is intentionally disabled because no form processor has been supplied. The checklist and email-enquiry link are available. Complete the owner/contact and privacy details in README.md, connect and test a form service, verify referral attribution in the affiliate portal, and enable indexing for the final verified domain before organic promotion.

Use a BrigePoint-branded production address before promotion. The current `gohighlevel-beta` hostname includes the vendor's brand; the reviewed affiliate program rules restrict branded domains/handles. Changing the project name or adding a new domain needs a verified available address, not an assumed domain assignment.

Official diagnostic reference: https://vercel.com/docs/errors/not_found
