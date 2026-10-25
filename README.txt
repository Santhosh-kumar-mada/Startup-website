STARTUP WEBSITE: README
=======================
1. OPEN LOCALLY
   Unzip, then double-click index.html. No server or install needed.

2. EDIT THE SITE (search each file for the words shown)
   Colours / spacing / font sizes : css/styles.css, the :root block at the top (lines 1-20). Change --accent first.
   Company name, email, phone     : index.html, find/replace [YOUR COMPANY NAME], [YOUR EMAIL], [YOUR NUMBER].
                                    Also replace YOUR_EMAIL in mailto: links and YOUR_NUMBER in wa.me links
                                    (number with country code, digits only, e.g. 919876543210).
   Headline, tagline, copy        : index.html, hero section (search "<!-- ===== 2. HERO").
   Pricing                        : index.html, search "8. PRICING". Edit price, list items and button text.
   Stats                          : index.html, search "placeholder stats" (section 7).
   Social links                   : index.html footer, search class="social" and replace href="#".
   SEO / social preview           : index.html <head> (title, description, og: tags).
   Logo / illustrations           : files in assets/ (SVG, edit in any text editor or Figma).

3. CONNECT THE CONTACT FORM
   The form validates in the browser but sends nothing yet.
   Formspree: create a form at formspree.io, copy your endpoint, then in index.html add to the <form> tag:
       action="https://formspree.io/f/YOUR_ID" method="POST"
   and in js/script.js, in the submit handler, replace the demo status lines with:
       fetch(form.action,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}})
         .then(r=>{status.textContent=r.ok?'Thanks! We will reply within 48 hours.':'Something went wrong. Please email us.';if(r.ok)form.reset();});
   Google Forms or your own backend: post the same fields (name, email, type, message) to its URL.

4. DEPLOY FREE
   Netlify: go to app.netlify.com/drop and drag the startup-website folder onto the page.
   GitHub Pages: create a repo, upload all files (index.html at the top level), then
   Settings > Pages > Deploy from branch > main > / (root). Your site appears at username.github.io/repo.
