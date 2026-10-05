// scripts/verify-i18n.mjs
// Verifies bilingual routing against a running dev/start server.
// Usage: BASE=http://localhost:3000 node scripts/verify-i18n.mjs
const BASE = process.env.BASE ?? "http://localhost:3000"

const KA_PATHS = [
  "/", "/about", "/services", "/clients", "/methodology", "/contact",
  "/services/biodiversity-assessment", "/services/tree-inventory",
  "/services/dendrology", "/services/forest-restoration",
  "/sitemap.xml", "/robots.txt",
]

const GEORGIAN = /[Ⴀ-ჿ]/

const failures = []
const ok = (m) => console.log(`  ok   ${m}`)
const bad = (m) => { failures.push(m); console.log(`  FAIL ${m}`) }

async function head(path) {
  const res = await fetch(`${BASE}${path}`, { redirect: "manual" })
  return res
}

console.log("Georgian routes keep their existing URLs:")
for (const p of KA_PATHS) {
  const res = await head(p)
  res.status === 200 ? ok(`${p} → 200`) : bad(`${p} → ${res.status}, expected 200`)
}

console.log("\nEnglish routes are served under /en:")
for (const p of KA_PATHS.filter((p) => !p.endsWith(".xml") && !p.endsWith(".txt"))) {
  const enPath = p === "/" ? "/en" : `/en${p}`
  const res = await head(enPath)
  res.status === 200 ? ok(`${enPath} → 200`) : bad(`${enPath} → ${res.status}, expected 200`)
}

console.log("\n/ka/* redirects to the bare path:")
for (const p of ["/ka", "/ka/services", "/ka/contact"]) {
  const res = await head(p)
  const loc = res.headers.get("location")
  const want = p === "/ka" ? "/" : p.replace(/^\/ka/, "")
  if (res.status === 301 && loc && new URL(loc, BASE).pathname === want) {
    ok(`${p} → 301 → ${want}`)
  } else {
    bad(`${p} → ${res.status} ${loc ?? "(no location)"}, expected 301 → ${want}`)
  }
}

console.log("\nEnglish pages contain no Georgian text:")
for (const p of ["/en", "/en/about", "/en/services", "/en/contact",
                 "/en/methodology", "/en/clients",
                 "/en/services/tree-inventory"]) {
  const res = await fetch(`${BASE}${p}`)
  const html = await res.text()
  // Strip the <head> JSON-LD/meta and the hidden Next.js flight payload, which
  // legitimately carry the other locale's strings.
  const body = html.replace(/<script[\s\S]*?<\/script>/g, "")
  const hit = body.match(GEORGIAN)
  hit ? bad(`${p} renders Georgian text: ${JSON.stringify(body.slice(Math.max(0, body.indexOf(hit[0]) - 40), body.indexOf(hit[0]) + 40))}`)
      : ok(`${p} is Georgian-free`)
}

console.log("\nhtml lang attribute matches the locale:")
for (const [p, want] of [["/", "ka"], ["/en", "en"]]) {
  const html = await (await fetch(`${BASE}${p}`)).text()
  const m = html.match(/<html[^>]*\slang="([^"]+)"/)
  m && m[1] === want ? ok(`${p} → lang="${want}"`)
                     : bad(`${p} → lang="${m?.[1] ?? "missing"}", expected "${want}"`)
}

console.log("\nAn unknown path serves the branded Georgian 404:")
{
  const p = "/this-page-does-not-exist"
  const res = await fetch(`${BASE}${p}`)
  const html = await res.text()
  if (res.status !== 404) {
    bad(`${p} → ${res.status}, expected 404`)
  } else {
    ok(`${p} → 404`)
    GEORGIAN.test(html)
      ? ok(`${p} renders Georgian text (branded page, not Next's default)`)
      : bad(`${p} → 404 but no Georgian text found (bare Next default?)`)
  }
}

console.log(
  failures.length === 0
    ? "\nAll i18n checks passed."
    : `\n${failures.length} check(s) failed.`
)
process.exit(failures.length === 0 ? 0 : 1)
