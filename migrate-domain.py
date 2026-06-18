#!/usr/bin/env python3
"""
DevForge — Domain Migration Script
====================================
Run this when devforgelab.eu is live and DNS has propagated.

Usage:
  python migrate-domain.py

What it does:
  1. Updates js/config.js → sets SITE_URL to https://devforgelab.eu
  2. Replaces all canonical/OG/hreflang URLs in *.html files
  3. Rewrites sitemap.xml with new domain
  4. Updates robots.txt sitemap directive
  5. Updates pet-portraits sitemap
  6. Reports all changes made

Requirements:
  - Python 3 (stdlib only — no pip needed)
  - Run from ~/webdev-site/
"""

import os
import re
import sys

# === CONFIG — Change these ===
OLD_DOMAIN = 'devforgelab.eu'
NEW_DOMAIN = 'devforgelab.eu'
SITE_DIR = os.path.dirname(os.path.abspath(__file__))  # ~/webdev-site/

# === Tracking ===
changes = []

def file_replace(filepath, old_str, new_str, label=None):
    """Replace old_str with new_str in file. Reports if changed."""
    fpath = os.path.join(SITE_DIR, filepath)
    if not os.path.exists(fpath):
        print(f"  ⚠️  File not found: {filepath}")
        return
    
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if old_str not in content:
        return  # no change needed
    
    count = content.count(old_str)
    content = content.replace(old_str, new_str)
    
    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    label = label or filepath
    changes.append(f"  ✅ {label}: {count} replacement(s)")
    print(f"  ✅ {label}: {count} changes — \"{old_str[:50]}...\" → \"{new_str[:50]}...\"")


def main():
    print("=" * 60)
    print("  DevForge Domain Migration")
    print(f"  {OLD_DOMAIN} → {NEW_DOMAIN}")
    print("=" * 60)
    print()

    # === Step 1: Update config.js ===
    print("[1/6] Updating central config…")
    file_replace(
        'js/config.js',
        f"SITE_URL: '{OLD_DOMAIN}'",
        f"SITE_URL: '{NEW_DOMAIN}'",
        label='js/config.js — SITE_URL'
    )

    # === Step 2: Update all HTML files ===
    print("[2/6] Updating canonical, OG, hreflang in all HTML files…")
    html_files = []
    for root, dirs, files in os.walk(SITE_DIR):
        # Skip node_modules, .git, .netlify
        if any(skip in root for skip in ['node_modules', '.git', '.netlify', '.hermes']):
            continue
        for f in files:
            if f.endswith('.html'):
                html_files.append(os.path.relpath(os.path.join(root, f), SITE_DIR))
    
    for html_file in sorted(html_files):
        # Canonical links
        file_replace(html_file, f'rel="canonical" href="https://{OLD_DOMAIN}', f'rel="canonical" href="https://{NEW_DOMAIN}')
        # OG URLs
        file_replace(html_file, f'property="og:url" content="https://{OLD_DOMAIN}', f'property="og:url" content="https://{NEW_DOMAIN}')
        # OG image
        file_replace(html_file, f'property="og:image" content="https://{OLD_DOMAIN}', f'property="og:image" content="https://{NEW_DOMAIN}')
        # Open Graph image (alternate format)
        file_replace(html_file, f'property="og:image:secure_url" content="https://{OLD_DOMAIN}', f'property="og:image:secure_url" content="https://{NEW_DOMAIN}')
        # Hreflang
        file_replace(html_file, f'hreflang="en" href="https://{OLD_DOMAIN}', f'hreflang="en" href="https://{NEW_DOMAIN}')
        file_replace(html_file, f'hreflang="no" href="https://{OLD_DOMAIN}', f'hreflang="no" href="https://{NEW_DOMAIN}')
        file_replace(html_file, f'hreflang="x-default" href="https://{OLD_DOMAIN}', f'hreflang="x-default" href="https://{NEW_DOMAIN}')
        # Netlify.app references in content (e.g. image URLs in pages)
        file_replace(html_file, OLD_DOMAIN, NEW_DOMAIN, label=f'{html_file} — remaining refs')
    
    # === Step 3: Update sitemap.xml ===
    print("[3/6] Updating sitemap.xml…")
    file_replace('sitemap.xml', OLD_DOMAIN, NEW_DOMAIN, label='sitemap.xml')
    
    # === Step 4: Update pet-portraits sitemap ===
    print("[4/6] Updating pet-portraits sitemap…")
    file_replace('pet-portraits/sitemap.xml', OLD_DOMAIN, NEW_DOMAIN, label='pet-portraits/sitemap.xml')
    
    # === Step 5: Update robots.txt ===
    print("[5/6] Updating robots.txt…")
    if os.path.exists(os.path.join(SITE_DIR, 'robots.txt')):
        file_replace('robots.txt', OLD_DOMAIN, NEW_DOMAIN, label='robots.txt')
    
    # === Step 6: Summary ===
    print()
    print("=" * 60)
    print(f"  Migration complete — {len(changes)} changes")
    print("=" * 60)
    print()
    if changes:
        print("Changes made:")
        for c in changes:
            print(c)
    
    print()
    print("Next steps:")
    print("  1. Commit: git add -A && git commit -m 'Migrate to NEW_DOMAIN'")
    print("  2. Push:   git push origin master")
    print("  3. Deploy: ssh VPS '/usr/local/bin/deploy-devforgelab'")
    print("  4. Verify: ForgeGuard SEO-audit")
    print()


if __name__ == '__main__':
    main()
