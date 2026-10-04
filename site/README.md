# BrigePoint landing page

Static source is in `dist/`: no framework or build is required. The optional root-level generation scripts in the parent workspace created these files; future edits may be made directly to this delivered source. Do not rerun the initial generator over subsequent edits.

## Current state

- Visual refresh: emerald/teal gradient buttons, gold accents, hover feedback, one-time section entrance animations, reading progress and an interactive business-type selector. Reduced-motion users receive a static experience; content does not depend on animations being available.

- Brand and contact are configured: BrigePoint / g2wsales@gmail.com.
- Three homepage referral buttons plus the thank-you button use the one exact bootcamp URL in `dist/js/config.js`.
- Two official HighLevel YouTube videos use click-to-load privacy-enhanced embeds. They are attributed and dated, not sold as bootcamp recordings. Their oEmbed metadata was verified; complete playback and caption availability still need checking in the launch browser.
- Checklist download and email enquiry work without a form service. The email enquiry opens the visitor’s mail app; it does not automatically subscribe them.
- Email form and Google tags are disabled because no service/IDs were supplied.
- Noindex and robots disallow are intentional for private review. Domain ownership/DNS for BrigePoint.com has not been verified.

## Remaining owner details and settings

Provide legal owner name, real short biography, physical mailing address, form processor/endpoint and delivery configuration. Optional: original introduction video ID, GA4 ID, Google Ads ID/lead label and official brand-kit assets. Do not invent these values.

Config: AFFILIATE_URL, BRAND, DOMAIN, CONTACT_EMAIL, FORM_ENDPOINT, ENABLE_EMAIL_CAPTURE, GA4_ID, GOOGLE_ADS_ID, GOOGLE_ADS_LEAD_LABEL, YOUTUBE_VIDEO_ID, SELF_HOSTED_VIDEO, SHOW_PERSONAL_BONUS. No HighLevel access token belongs here.

## Lead collection

Recommended simple option: create a Formspree form in your own account, verify the receiving email, configure domain restrictions and anti-spam, then supply its HTTPS endpoint. Update the privacy page to name the processor and retention/transfer details. Enable the form only after a real test confirms storage, delivery and failure handling. A 2xx response confirms acceptance, not necessarily email arrival. Use an email automation provider if the checklist must be delivered automatically.

For HighLevel: use an approved native form with required fields, or a secure server adapter that validates input and posts to an inbound workflow webhook. The browser currently sends multipart FormData; a HighLevel webhook may expect JSON and may lack suitable CORS. Do not paste a private workflow URL into public JavaScript or assume it is a form endpoint. Map first name/email and consent timestamp/version, create/update the contact, tag the checklist request, and send only the requested resource unless separate marketing consent exists. Test duplicate contacts, rejection, opt-out and delivery before enabling. The current delivery checkbox does not authorize ongoing promotional nurture.

## Video and assets

The official videos are identified in index.html. Clicking play loads YouTube; before that no YouTube request is made. Third-party videos retain their own branding and rights. Add your own introduction using YOUTUBE_VIDEO_ID, with spoken and visible commission disclosure. For self-hosted video, provide hero.mp4 / hero.webm / poster.webp / hero.vtt under assets/video and set SELF_HOSTED_VIDEO. Caption the complete recording accurately. No empty video placeholders display.

Use `assets/highlevel/` only for unmodified authorized assets supplied by the owner. Photo source and license are in ASSET-LICENSES.md. Never represent the stock subject as an instructor, customer or endorser.

## Deploying the static files to Vercel

1. Sign in to your own Vercel account and create/import a project from a repository containing this source.
2. Choose the Other/static preset, leave Build Command empty, and set Output Directory to `dist` (or select `dist` as the deployed root with no output subdirectory).
3. Deploy a review build and test routes, assets, links and consent.
4. Add BrigePoint.com only if you own it. Follow the DNS records Vercel displays and verify HTTPS.
5. Update canonical URLs and sitemap for the verified domain. Remove `noindex,nofollow` from public pages and replace robots disallow with an allow policy plus the real sitemap URL. Keep thank-you noindex.
6. Complete the launch gates below before starting promotion. Do not place strategy workbooks or private earnings research in the public directory.

Local files are not automatically synchronized to the existing Vercel deployment. A new deployment containing these changes is required.

## Pre-launch checks

- Exact issued tywo-24 destination and portal attribution verified.
- Current trial, selected plan, card, renewal, charges and bootcamp agenda checked.
- Top, inline and footer disclosures visible; additional material connections disclosed if any.
- No fabricated experience, earnings promises, urgency, testimonials or copied design.
- Old Google Business Chat claim omitted; confirm session date from provider email.
- Own brand and authorized assets only; no disguised referral redirects.
- Personal bonuses disabled without written authorization.
- Owner/contact/address and actual privacy processing correct.
- Forms and email delivery tested; marketing opt-in separate; no phone/SMS capture.
- Google tags remain off before consent; direct thank-you visits do not fire conversions.
- Affiliate engagement after second referral and payout onboarding completed.
- Review all page links, mobile layout, keyboard controls and actual video playback.
- Run Lighthouse mobile; target Performance 90+, Accessibility/Best Practices/SEO 95+. Scores are not claimed without measurement. Private noindex intentionally prevents a public-launch SEO pass.

## Vercel error recovery
The workspace root has vercel.json with outputDirectory site/dist. If importing only the site folder, its own vercel.json uses outputDirectory dist. Use Framework Other, no build command, no install command. The downloadable ZIP contains the site folder contents: extract it and deploy that extracted root, not the ZIP and not the parent strategy folder. Vercel must receive dist/index.html. Do not select Next.js or run npm run build. The public gohighlevel-beta.vercel.app address was confirmed to return Vercel 404 NOT_FOUND on 4 October 2026. Project settings remain unverified pending dashboard sign-in; see VERCEL-DEPLOYMENT.md. Canonical tags are temporarily omitted until the real deployed domain is confirmed.
