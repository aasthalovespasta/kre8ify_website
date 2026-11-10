// Copies the static site in site/ to dist/ for deployment (Vercel, Netlify, Cloudflare Pages).
import { cpSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';

rmSync('dist', { recursive: true, force: true });
mkdirSync('dist', { recursive: true });
cpSync('site', 'dist', { recursive: true });
writeFileSync('dist/robots.txt', 'User-agent: *\nAllow: /\n');
console.log('built site/ -> dist/');
