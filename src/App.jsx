// ═══════════════════════════════════════════════════════════════
// VAULTWRIGHT — WoW Midnight Gear Advisor  |  "Know your next move."
// ═══════════════════════════════════════════════════════════════

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Link2, FileText, ChevronLeft, Sword, Trophy, Calendar,
  Loader2, AlertCircle, CheckCircle2, BarChart3,
} from "lucide-react";
import { getSpecKnowledge, KNOWLEDGE_VERSION, KNOWLEDGE_DATE } from './specKnowledge.js';

// ── Design tokens & static data ─────────────────────────────────
const CLASSES = [
  { name: "Death Knight", specs: ["Blood", "Frost", "Unholy"], color: "#C41E3A" },
  { name: "Demon Hunter", specs: ["Havoc", "Vengeance", "Devourer"], color: "#A330C9" },
  { name: "Druid", specs: ["Balance", "Feral", "Guardian", "Restoration"], color: "#FF7C0A" },
  { name: "Evoker", specs: ["Devastation", "Preservation", "Augmentation"], color: "#33937F" },
  { name: "Hunter", specs: ["Beast Mastery", "Marksmanship", "Survival"], color: "#AAD372" },
  { name: "Mage", specs: ["Arcane", "Fire", "Frost"], color: "#3FC7EB" },
  { name: "Monk", specs: ["Brewmaster", "Mistweaver", "Windwalker"], color: "#00FF98" },
  { name: "Paladin", specs: ["Holy", "Protection", "Retribution"], color: "#F48CBA" },
  { name: "Priest", specs: ["Discipline", "Holy", "Shadow"], color: "#DDDDFF" },
  { name: "Rogue", specs: ["Assassination", "Outlaw", "Subtlety"], color: "#FFF468" },
  { name: "Shaman", specs: ["Elemental", "Enhancement", "Restoration"], color: "#0070DD" },
  { name: "Warlock", specs: ["Affliction", "Demonology", "Destruction"], color: "#8788EE" },
  { name: "Warrior", specs: ["Arms", "Fury", "Protection"], color: "#C69B3A" },
];

const GEAR_SLOTS = [
  { key: "head", label: "Head" }, { key: "neck", label: "Neck" },
  { key: "shoulder", label: "Shoulders" }, { key: "back", label: "Back" },
  { key: "chest", label: "Chest" }, { key: "wrist", label: "Wrists" },
  { key: "hands", label: "Hands" }, { key: "waist", label: "Waist" },
  { key: "legs", label: "Legs" }, { key: "feet", label: "Feet" },
  { key: "finger1", label: "Ring 1" }, { key: "finger2", label: "Ring 2" },
  { key: "trinket1", label: "Trinket 1" }, { key: "trinket2", label: "Trinket 2" },
  { key: "mainhand", label: "Main Hand" }, { key: "offhand", label: "Off Hand" },
];

// ── Design tokens ────────────────────────────────────────────────
const T = {
  bg:        "#080c12",
  surface:   "#0f1520",
  surfaceHi: "#162030",
  border:    "#1e2d42",
  gold:      "#c8973a",
  goldBright:"#e8b84b",
  text:      "#e8ecf2",
  textSub:   "#7a8fa8",
  textDim:   "#3a4f64",
  green:     "#2ea84a",
  red:       "#e84545",
  purple:    "#8b6fff",
};

const S = {
  app: { minHeight: "100vh", background: T.bg, backgroundImage: "radial-gradient(ellipse at 30% 0%, rgba(200,151,58,0.07) 0%, transparent 50%), radial-gradient(ellipse at 70% 100%, rgba(26,58,92,0.4) 0%, transparent 60%)", fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif", color: T.text, padding: "16px 16px 120px" },
  wrap: { maxWidth: 680, margin: "0 auto" },
  card: { background: T.surface, border: `1px solid ${T.border}`, borderRadius: 16, padding: "22px 20px", boxShadow: "0 8px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)" },
  label: { fontFamily: "'Cinzel', serif", color: T.gold, fontSize: 10, letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 8, display: "block", fontWeight: 700 },
  input: { background: "rgba(0,0,0,0.3)", border: `1px solid ${T.border}`, borderRadius: 10, color: T.text, fontSize: 16, padding: "14px 16px", fontFamily: "inherit", outline: "none", width: "100%", boxSizing: "border-box", transition: "border-color 0.2s, box-shadow 0.2s", WebkitAppearance: "none" },
  textarea: { background: "rgba(0,0,0,0.3)", border: `1px solid ${T.border}`, borderRadius: 8, color: T.text, fontSize: 13, padding: "12px 14px", fontFamily: "monospace", outline: "none", width: "100%", boxSizing: "border-box", resize: "vertical", lineHeight: 1.6 },
  primaryBtn: { background: `linear-gradient(135deg, ${T.goldBright} 0%, ${T.gold} 100%)`, border: "none", borderRadius: 12, padding: "15px 28px", cursor: "pointer", color: "#060a0f", fontFamily: "'Cinzel', serif", fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", transition: "all 0.2s", WebkitTapHighlightColor: "transparent", minHeight: 52, boxShadow: "0 4px 20px rgba(200,151,58,0.3)" },
  ghostBtn: { background: "rgba(255,255,255,0.03)", border: `1px solid ${T.border}`, borderRadius: 12, color: T.textSub, cursor: "pointer", fontSize: 14, padding: "12px 20px", fontFamily: "inherit", minHeight: 44, WebkitTapHighlightColor: "transparent", transition: "all 0.15s" },
  backBtn: { background: "none", border: "none", color: T.textSub, cursor: "pointer", fontSize: 14, padding: "0 0 18px 0", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6, WebkitTapHighlightColor: "transparent" },
  tag: sel => ({ background: sel ? `rgba(200,151,58,0.12)` : "rgba(255,255,255,0.02)", border: `1px solid ${sel ? T.gold : T.border}`, borderRadius: 24, padding: "10px 18px", cursor: "pointer", color: sel ? T.goldBright : T.textSub, fontSize: 13, fontFamily: "inherit", transition: "all 0.15s", minHeight: 44, WebkitTapHighlightColor: "transparent" }),
  chatMsg: role => ({ marginBottom: 10, padding: "16px 18px", borderRadius: 14, background: role === "user" ? `rgba(200,151,58,0.06)` : T.surface, border: `1px solid ${role === "user" ? `${T.gold}25` : T.border}`, borderLeft: `3px solid ${role === "user" ? T.goldBright : T.purple}`, boxShadow: "0 2px 12px rgba(0,0,0,0.3)" }),
};

// ── Knowledge base ──────────────────────────────────────────────
// Per-spec knowledge injected conditionally into the prompt.
// Only the player's spec is sent — never all 40 at once.

// Patch info kept separate so it's easy to bump without touching spec knowledge
const PATCH_CONTEXT = `CURRENT PATCH: World of Warcraft Midnight Season 1, patch 12.0.5 (March 2026).
If the player asks about anything that may have changed in a recent hotfix or patch, you MUST use web_search to verify before answering. Do not guess. Recent tuning changes, embellishment nerfs, and stat weight shifts happen frequently.
When you use web_search, prefer sources: icy-veins.com, method.gg, wowhead.com, class Discord resources.
After searching, clearly state if advice differs from the player's spec knowledge block below.`;

const UNIVERSAL_KNOWLEDGE = `
== MIDNIGHT SEASON 1 — UNIVERSAL RULES ==
GEAR TRACKS: Adventurer 220-237 | Veteran 233-250 | Champion 246-263 | Hero 259-272 | Myth 272-289 (max ilvl 289)
DAWNCRESTS: 20 per upgrade rank | 100/week cap per type | FREE if slot is below its personal highest-ever ilvl | Spend order: Myth > Hero > Champion > Veteran > Adventurer
SPARKS OF RADIANCE: 1/week (2 week 1) | 2 Sparks most items, 4 Sparks 2H/ranged | Base crafted ilvl 259 (Hero 1/6) | +Hero crests → 272 | +Myth crests → 285-289 | Thalassian Missive = choose your stats
NEVER CRAFT: Head, Shoulders, Chest, Hands, Legs (Tier slots — can't Catalyst convert)
BEST CRAFT TARGETS: Weapon > Neck > Cloak > Bracers > Belt > Boots > Rings
EMBELLISHMENTS: Max 2 equipped simultaneously. Cannot add to pre-embellished gear. Crafted via Mar'nah in Silvermoon.
OPTIONAL REAGENT EMBELLISHMENTS (add to any non-pre-embellished crafted piece):
- Darkmoon Sigil: Void — Chance to grant Versatility for 15s. Multiple stacks overlap.
- Darkmoon Sigil: Hunt — Chance to grant 85 secondary stats for 15s based on creature type. WEAPON-ONLY slot.
- Darkmoon Sigil: Rot — Afflict target with Rooting Roots: 18 Nature dmg every 2s, stacks to 5 (15s per stack). Nature-damage specs only.
- Darkmoon Sigil: Blood — Procs lowest secondary stat +116 for 15s. Procs highest secondary stat when an ally dies (5 min CD). Generally weakest option.
- Devouring Banding — Chance to launch Devouring Bolts at target and boost your highest secondary stat.
- Primal Spore Binding — Chance to launch Explosive Spores: heals allies or damages enemies based on target.
- Arcanoweave Lining — Armor-slot reagent. Provides Mastery proc. Belt/Bracers/Boots/Cloak only.
PRE-EMBELLISHED SETS (2-piece bonuses, no additional embellishment slot):
- Sunfire set (Cloth) — Gain 157 Haste while above 80% health.
- Arcanoweave set (Cloth) — Gain 157 Critical Strike while above 80% health.
- Signet of Azerothian Blessings (Ring) — Chance to grant 23 to all secondary stats for 15s.
- Loa Worshiper's Band (Ring) — Chance to call a Loa avatar to assist in combat.
EMBELLISHMENT RULES: Each Embellishment provides roughly 0.5–1% DPS/throughput. Plan both slots before first craft. Weapon embellishments (Sigil: Hunt) get replaced when you upgrade to Myth-track weapons.
VAULT: Resets Tuesday | 1/4/8 M+ keys = 1/2/3 dungeon slots | +10 key = 272 vault reward
4-SET TIER: Almost always beats 2-set + 2x higher ilvl non-tier pieces`;

// ── API helpers ──────────────────────────────────────────────────
// Fetch wrapper with timeout + retry logic

const DEFAULT_TIMEOUT = 30000; // 30s — Claude API can be slow on cold starts
const MAX_RETRIES = 2;

async function fetchWithRetry(url, options = {}, retries = MAX_RETRIES, timeout = DEFAULT_TIMEOUT) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);
    try {
      const res = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(timer);
      return res;
    } catch (err) {
      clearTimeout(timer);
      const isLast = attempt === retries;
      if (err.name === "AbortError") {
        if (isLast) throw new Error("Request timed out. Check your connection and try again.");
      } else if (isLast) {
        throw err;
      }
      // Exponential backoff: 500ms, 1000ms
      await new Promise(r => setTimeout(r, 500 * Math.pow(2, attempt)));
    }
  }
}

// system can be a string OR an array of {type,text,cache_control?} blocks
async function callClaude(systemPrompt, messages, maxTokens = 1500) {
  const res = await fetchWithRetry("/api/claude", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      max_tokens: maxTokens,
      system: systemPrompt,  // proxy handles string or array
      messages,
    }),
  });
  if (!res.ok) throw new Error(res.status === 429 ? "Daily limit reached (5 analyses/day). Come back tomorrow!" : `API error ${res.status}`);
  const data = await res.json();
  return data.content?.map(b => b.text || "").join("") || "No response.";
}

// ── Chat history truncation: keeps first exchange for context + last 4 exchanges
function truncateHistory(hist, keepPairs = 4) {
  if (hist.length <= keepPairs * 2 + 2) return hist;
  const first = hist.slice(0, 2);  // original analysis Q+A for context
  const recent = hist.slice(-(keepPairs * 2));
  const skipped = Math.floor((hist.length - 2 - keepPairs * 2) / 2);
  const summary = {
    role: "user",
    content: `[${skipped} earlier exchange${skipped > 1 ? "s" : ""} omitted for brevity]`,
    display: "[Earlier messages truncated]",
  };
  return [...first, summary, ...recent];
}

// ── Knowledge update extractor ──────────────────────────────────
// Strips [KNOWLEDGE_UPDATE: field | old | new | source] blocks from
// Claude's response before display, returns them for queuing.
function extractKnowledgeUpdates(text) {
  const regex = /\[KNOWLEDGE_UPDATE:\s*([^|]+?)\s*\|\s*([^|]*?)\s*\|\s*([^|]+?)\s*\|\s*([^\]]+?)\s*\]/g;
  const updates = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    updates.push({
      field:     match[1].trim(),
      old_value: match[2].trim(),
      new_value: match[3].trim(),
      source:    match[4].trim(),
    });
  }
  // Strip update blocks from visible text, clean trailing whitespace
  const clean = text.replace(/\[KNOWLEDGE_UPDATE:[^\]]+\]/g, "").replace(/\n{3,}/g, "\n\n").trim();
  return { clean, updates };
}

// ── Gear summary: top 5 weakest slots by ilvl for follow-up prompts
function summarizeGearForPrompt(gearSummaryFull, simcParsed, inputMode) {
  let slots = [];
  if (inputMode === "rio" && gearSummaryFull) {
    const lines = gearSummaryFull.split("\n").slice(2); // skip header lines
    slots = lines.map(l => {
      const m = l.match(/^(.+?):\s*(.+?)(?:\s+\((ilvl )?(\d+)\))?$/);
      return m ? { label: m[1], name: m[2], ilvl: m[4] ? parseInt(m[4]) : 999 } : null;
    }).filter(Boolean);
  } else if (inputMode === "simc" && simcParsed) {
    slots = simcParsed.gear.filter(g => g.name && g.ilvl).map(g => ({ label: g.label, name: g.name, ilvl: g.ilvl }));
  }
  if (!slots.length) return "No gear data — give best general spec advice.";
  const sorted = [...slots].sort((a, b) => a.ilvl - b.ilvl);
  const weakest = sorted.slice(0, 5);
  const avg = Math.round(slots.reduce((s, g) => s + (g.ilvl || 0), 0) / slots.length);
  return `Avg ilvl: ${avg}. 5 weakest slots:\n` + weakest.map(g => `${g.label}: ${g.name} (ilvl ${g.ilvl})`).join("\n");
}

// ── Class icon SVGs ──────────────────────────────────────────────

const CLASS_ICON_RENDERERS = {
  "Death Knight": (p) => (<>
    <defs><radialGradient id={`${p}dk`} cx="45%" cy="40%" r="55%"><stop offset="0%" stopColor="#dce8ed"/><stop offset="100%" stopColor="#7a9ba8"/></radialGradient></defs>
    <polygon points="7,16 9,4 12,15" fill="#1a4e8a"/><polygon points="13,12 16,2 19,12" fill="#1e63b0"/><polygon points="20,15 23,4 25,16" fill="#1a4e8a"/>
    <rect x="7" y="14" width="18" height="3" rx="1" fill="#1a4e8a"/><rect x="7" y="14" width="18" height="1.5" rx="1" fill="#2979cc" opacity="0.6"/>
    <ellipse cx="16" cy="20" rx="10" ry="9" fill={`url(#${p}dk)`}/>
    <ellipse cx="12.5" cy="19" rx="3.2" ry="3.5" fill="#0a1825"/><ellipse cx="19.5" cy="19" rx="3.2" ry="3.5" fill="#0a1825"/>
    <ellipse cx="12.5" cy="19" rx="1.6" ry="1.8" fill="#2196f3" opacity="0.85"/><ellipse cx="19.5" cy="19" rx="1.6" ry="1.8" fill="#2196f3" opacity="0.85"/>
    <path d="M8 25 Q8 31 16 31 Q24 31 24 25" fill="#8eaab5"/>
    <rect x="11" y="27" width="2.5" height="3.2" rx="0.6" fill="#ecf4f7"/><rect x="14.7" y="27" width="2.5" height="4" rx="0.6" fill="#ecf4f7"/><rect x="18.5" y="27" width="2.5" height="3.2" rx="0.6" fill="#ecf4f7"/>
  </>),
  "Demon Hunter": (p) => (<>
    <defs><linearGradient id={`${p}dh`} x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#6a0080"/><stop offset="100%" stopColor="#311244"/></linearGradient></defs>
    <path d="M4 28 C4 28 6 24 10 18 C13 13 12 7 15 5 C16 4 17 4 17 5 C15 8 16 13 13 18 C10 23 8 27 7 30 Z" fill={`url(#${p}dh)`} stroke="#9c27b0" strokeWidth="0.5"/>
    <path d="M28 28 C28 28 26 24 22 18 C19 13 20 7 17 5 C16 4 15 4 15 5 C17 8 16 13 19 18 C22 23 24 27 25 30 Z" fill={`url(#${p}dh)`} stroke="#9c27b0" strokeWidth="0.5"/>
    <circle cx="16" cy="16" r="5.5" fill="#1a0028"/><circle cx="16" cy="16" r="3.8" fill="#39ff14" opacity="0.9"/>
    <path d="M14.8 9.5 C14.2 11.5 14 14 14 16 C14 18 14.2 20.5 14.8 22.5 L17.2 22.5 C17.8 20.5 18 18 18 16 C18 14 17.8 11.5 17.2 9.5 Z" fill="#0a0018"/>
  </>),
  "Druid": (p) => (<>
    <defs><radialGradient id={`${p}dr`} cx="40%" cy="40%" r="60%"><stop offset="0%" stopColor="#a0522d"/><stop offset="100%" stopColor="#5c2a0e"/></radialGradient></defs>
    <ellipse cx="16" cy="22" rx="8.5" ry="7" fill={`url(#${p}dr)`}/>
    <ellipse cx="8" cy="14" rx="3.5" ry="4" fill={`url(#${p}dr)`}/><ellipse cx="13" cy="11" rx="3.5" ry="4" fill={`url(#${p}dr)`}/><ellipse cx="19" cy="11" rx="3.5" ry="4" fill={`url(#${p}dr)`}/><ellipse cx="24" cy="14" rx="3.5" ry="4" fill={`url(#${p}dr)`}/>
    <path d="M6 10.5 L4 6 L8 10" fill="#3a1a06"/><path d="M11 7.5 L10 3 L14 7" fill="#3a1a06"/><path d="M17 7.5 L18 3 L22 7" fill="#3a1a06"/><path d="M22 10.5 L24 6 L28 10" fill="#3a1a06"/>
  </>),
  "Evoker": (p) => (<>
    <defs><radialGradient id={`${p}ev`} cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#e8b84b"/><stop offset="100%" stopColor="#9c6e10"/></radialGradient></defs>
    <path d="M4 16 C6 6 26 6 28 16" fill="#1a5c50"/><path d="M4 16 C6 26 26 26 28 16" fill="#1a5c50"/>
    <ellipse cx="16" cy="16" rx="8" ry="7" fill={`url(#${p}ev)`}/>
    <path d="M14.5 9.5 C14 11.5 14 14 14 16 C14 18 14 20.5 14.5 22.5 L17.5 22.5 C18 20.5 18 18 18 16 C18 14 18 11.5 17.5 9.5 Z" fill="#050505"/>
    <ellipse cx="13.5" cy="13" rx="1.2" ry="1.8" fill="white" opacity="0.3"/>
  </>),
  "Hunter": (p) => (<>
    <defs><linearGradient id={`${p}hu`} x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#a07828"/><stop offset="100%" stopColor="#5c3a0e"/></linearGradient></defs>
    <path d="M10 3 C4 8 4 24 10 29" stroke={`url(#${p}hu)`} strokeWidth="3.5" fill="none" strokeLinecap="round"/>
    <line x1="10" y1="3" x2="10" y2="29" stroke="#e8d090" strokeWidth="1" strokeOpacity="0.7"/>
    <line x1="10" y1="16" x2="27" y2="16" stroke="#9e6a1a" strokeWidth="2" strokeLinecap="round"/>
    <polygon points="27,13.5 31.5,16 27,18.5" fill="#c0c0c8"/>
    <path d="M12 16 L10 12 L11.5 16" fill="#558b2f"/><path d="M12 16 L10 20 L11.5 16" fill="#2e7d32"/>
  </>),
  "Mage": (p) => (<>
    <defs><radialGradient id={`${p}mg`} cx="40%" cy="35%" r="60%"><stop offset="0%" stopColor="#b39ddb"/><stop offset="60%" stopColor="#7c4dff"/><stop offset="100%" stopColor="#311b92"/></radialGradient></defs>
    <path d="M7 30 L8.5 31 L22 8 L20.5 7 Z" fill="#5c3a0e"/>
    <circle cx="21" cy="7" r="5.5" fill={`url(#${p}mg)`}/>
    <ellipse cx="19" cy="5" rx="1.8" ry="2.2" fill="white" opacity="0.42"/>
  </>),
  "Monk": (p) => (<>
    <defs><radialGradient id={`${p}mk`} cx="35%" cy="30%" r="65%"><stop offset="0%" stopColor="#c5e8a0"/><stop offset="60%" stopColor="#7cb342"/><stop offset="100%" stopColor="#33691e"/></radialGradient></defs>
    <path d="M6 31 L8 31 L26 3 L24 2 Z" fill="#6d3a14"/>
    <line x1="18" y1="11" x2="14" y2="15" stroke="#a0720a" strokeWidth="1.5" strokeLinecap="round"/>
    <ellipse cx="13" cy="16" rx="3" ry="3.5" fill="#8d6e28"/>
    <ellipse cx="12" cy="23" rx="7" ry="8" fill={`url(#${p}mk)`}/>
  </>),
  "Paladin": (p) => (<>
    <defs><radialGradient id={`${p}pa`} cx="50%" cy="40%" r="55%"><stop offset="0%" stopColor="#fffde7"/><stop offset="100%" stopColor="#f57f17" stopOpacity="0"/></radialGradient></defs>
    <line x1="16" y1="2" x2="16" y2="7" stroke="#ffe082" strokeWidth="1.8" strokeLinecap="round" opacity="0.7"/>
    <line x1="5" y1="7" x2="9" y2="11" stroke="#ffe082" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
    <line x1="27" y1="7" x2="23" y2="11" stroke="#ffe082" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
    <line x1="3" y1="16" x2="8" y2="16" stroke="#ffe082" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
    <line x1="29" y1="16" x2="24" y2="16" stroke="#ffe082" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
    <ellipse cx="16" cy="13" rx="9" ry="8" fill={`url(#${p}pa)`}/>
    <rect x="7.5" y="6" width="17" height="11" rx="2.5" fill="#d4a843"/>
    <rect x="8.5" y="6.5" width="15" height="4" rx="1.5" fill="#ffd54f" opacity="0.55"/>
    <rect x="14.5" y="17" width="3" height="12" rx="1.5" fill="#8B6914"/>
    <circle cx="16" cy="30.5" r="2.8" fill="#c89830"/>
  </>),
  "Priest": (p) => (<>
    <defs><radialGradient id={`${p}pr`} cx="50%" cy="35%" r="55%"><stop offset="0%" stopColor="white" stopOpacity="0.25"/><stop offset="100%" stopColor="white" stopOpacity="0"/></radialGradient></defs>
    <circle cx="16" cy="10" r="10" fill={`url(#${p}pr)`}/>
    <circle cx="16" cy="10" r="6.5" fill="none" stroke="#d0d8e8" strokeWidth="3.8"/>
    <rect x="14.2" y="16" width="3.6" height="13.5" rx="1.8" fill="#d0d8e8"/>
    <rect x="7.5" y="19.5" width="17" height="3.6" rx="1.8" fill="#d0d8e8"/>
  </>),
  "Rogue": (p) => (<>
    <defs><linearGradient id={`${p}ro`} x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#b0bec5"/><stop offset="50%" stopColor="#eceff1"/><stop offset="100%" stopColor="#78909c"/></linearGradient></defs>
    <path d="M7 27 L9.5 30 L28 8 L25.5 5 Z" fill={`url(#${p}ro)`}/>
    <path d="M6.5 22.5 L10.5 19 L13.5 22 L9.5 25.5 Z" fill="#d4a843"/>
    <ellipse cx="5" cy="25.5" rx="3" ry="3" fill="#d4a843"/>
  </>),
  "Shaman": (p) => (<>
    <defs>
      <filter id={`${p}sb`}><feGaussianBlur stdDeviation="1.5"/></filter>
      <linearGradient id={`${p}sl`} x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#fff9c4"/><stop offset="50%" stopColor="#ffeb3b"/><stop offset="100%" stopColor="#f57f17"/></linearGradient>
    </defs>
    <path d="M21 2 L10.5 17.5 L18 17.5 L11 30 L23 13.5 L15.5 13.5 Z" fill="#2196f3" opacity="0.4" filter={`url(#${p}sb)`}/>
    <path d="M21 2 L10.5 17.5 L18 17.5 L11 30 L23 13.5 L15.5 13.5 Z" fill={`url(#${p}sl)`}/>
    <path d="M20 5 L13 17 L18 17 L14 27 L21 15 L16 15 Z" fill="white" opacity="0.55"/>
  </>),
  "Warlock": (p) => (<>
    <defs><radialGradient id={`${p}wl`} cx="50%" cy="80%" r="70%"><stop offset="0%" stopColor="#76ff03"/><stop offset="60%" stopColor="#00c853"/><stop offset="100%" stopColor="#1b5e20" stopOpacity="0.3"/></radialGradient></defs>
    <path d="M16 14 C13 9 11 5.5 13.5 3 C14 6 15 7.5 16 5.5 C17 7.5 18 6 18.5 3 C21 5.5 19 9 16 14 Z" fill={`url(#${p}wl)`}/>
    <rect x="9.5" y="13" width="3" height="7" rx="1.5" fill="#6a1b9a"/>
    <rect x="13.2" y="11.5" width="3" height="7.5" rx="1.5" fill="#7b1fa2"/>
    <rect x="17" y="11.5" width="3" height="7.5" rx="1.5" fill="#7b1fa2"/>
    <rect x="20.8" y="13" width="2.8" height="7" rx="1.4" fill="#6a1b9a"/>
    <path d="M9.5 20 C9 16.5 10 15.5 16 15.5 C22 15.5 23 16.5 22.5 20 L21.5 27.5 C20.5 29.5 11.5 29.5 10.5 27.5 Z" fill="#7b1fa2"/>
  </>),
  "Warrior": (p) => (<>
    <defs><linearGradient id={`${p}wa`} x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#90a4ae"/><stop offset="45%" stopColor="#eceff1"/><stop offset="100%" stopColor="#607d8b"/></linearGradient></defs>
    <path d="M7 27 L9.5 30 L28 8.5 L25.5 6 Z" fill={`url(#${p}wa)`}/>
    <path d="M5 21.5 L8 24.5 L16.5 16.5 L13.5 13.5 Z" fill="#d4a843"/>
    <path d="M13.5 13.5 L16.5 16.5 L19.5 13.5 L16.5 10.5 Z" fill="#d4a843"/>
    <circle cx="4.5" cy="24.5" r="3.2" fill="#c89830"/>
  </>),
  // Devourer uses the Demon Hunter icon (same class)
  "Devourer": (p) => (<>
    <defs><linearGradient id={`${p}dh`} x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#6a0080"/><stop offset="100%" stopColor="#311244"/></linearGradient></defs>
    <path d="M4 28 C4 28 6 24 10 18 C13 13 12 7 15 5 C16 4 17 4 17 5 C15 8 16 13 13 18 C10 23 8 27 7 30 Z" fill={`url(#${p}dh)`} stroke="#9c27b0" strokeWidth="0.5"/>
    <path d="M28 28 C28 28 26 24 22 18 C19 13 20 7 17 5 C16 4 15 4 15 5 C17 8 16 13 19 18 C22 23 24 27 25 30 Z" fill={`url(#${p}dh)`} stroke="#9c27b0" strokeWidth="0.5"/>
    <circle cx="16" cy="16" r="5.5" fill="#1a0028"/><circle cx="16" cy="16" r="3.8" fill="#39ff14" opacity="0.9"/>
    <path d="M14.8 9.5 C14.2 11.5 14 14 14 16 C14 18 14.2 20.5 14.8 22.5 L17.2 22.5 C17.8 20.5 18 18 18 16 C18 14 17.8 11.5 17.2 9.5 Z" fill="#0a0018"/>
  </>),
};

function ClassIcon({ name, color, size = 24, style = {} }) {
  const id = (name || "").replace(/\s/g, "");
  const renderer = CLASS_ICON_RENDERERS[name] || CLASS_ICON_RENDERERS["Warrior"];
  return (
    <svg width={size} height={size} viewBox="0 0 32 32"
      style={{ borderRadius: 5, flexShrink: 0, display: "block", filter: `drop-shadow(0 0 3px ${color}55)`, ...style }}>
      <defs>
        <linearGradient id={`cbg-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e1610"/><stop offset="100%" stopColor="#0a0808"/>
        </linearGradient>
        <linearGradient id={`cbd-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.9"/><stop offset="100%" stopColor={color} stopOpacity="0.35"/>
        </linearGradient>
        <clipPath id={`cclip-${id}`}><rect width="32" height="32" rx="4"/></clipPath>
      </defs>
      <rect width="32" height="32" fill={`url(#cbg-${id})`} rx="4"/>
      <g clipPath={`url(#cclip-${id})`}>{renderer(id)}</g>
      <rect x="1" y="1" width="30" height="12" rx="3" fill="white" fillOpacity="0.05"/>
      <rect x="0.5" y="0.5" width="31" height="31" rx="4" fill="none" stroke={`url(#cbd-${id})`} strokeWidth="1.5"/>
    </svg>
  );
}

// ── Shared UI components ─────────────────────────────────────────

// ── Skeleton loader — matches the shape of actual response content
function SkeletonBlock({ lines = 4 }) {
  return (
    <div style={{ padding: "4px 0" }}>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} style={{
          height: 14, borderRadius: 6, marginBottom: 10,
          width: i === lines - 1 ? "60%" : i % 3 === 0 ? "90%" : "75%",
          background: `linear-gradient(90deg, ${T.surfaceHi} 25%, #22282f 50%, ${T.surfaceHi} 75%)`,
          backgroundSize: "200% 100%",
          animation: "shimmer 1.4s ease-in-out infinite",
          animationDelay: `${i * 0.08}s`,
        }} />
      ))}
    </div>
  );
}

function SkeletonGearGrid() {
  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
        <div style={{ height: 12, width: 80, borderRadius: 4, background: T.surfaceHi, animation: "shimmer 1.4s ease-in-out infinite", backgroundSize: "200% 100%", backgroundImage: `linear-gradient(90deg, ${T.surfaceHi} 25%, #22282f 50%, ${T.surfaceHi} 75%)` }} />
        <div style={{ height: 12, width: 60, borderRadius: 4, background: T.surfaceHi, animation: "shimmer 1.4s ease-in-out infinite", backgroundSize: "200% 100%", backgroundImage: `linear-gradient(90deg, ${T.surfaceHi} 25%, #22282f 50%, ${T.surfaceHi} 75%)` }} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} style={{ height: 32, borderRadius: 6, backgroundImage: `linear-gradient(90deg, ${T.surfaceHi} 25%, #22282f 50%, ${T.surfaceHi} 75%)`, backgroundSize: "200% 100%", animation: "shimmer 1.4s ease-in-out infinite", animationDelay: `${i * 0.04}s` }} />
        ))}
      </div>
    </div>
  );
}

// ── Ilvl track badge
function IlvlBadge({ ilvl }) {
  const n = parseInt(ilvl);
  if (!ilvl || isNaN(n)) return null;
  const color = n >= 272 ? "#E6CC80" : n >= 259 ? "#A335EE" : n >= 246 ? "#0070DD" : n >= 233 ? "#1EFF00" : n >= 220 ? "#9D9D9D" : "#7A7A7A";
  return <span style={{ color, fontSize: 11, fontWeight: 700, fontFamily: "monospace", textShadow: `0 0 6px ${color}50` }}>{n}</span>;
}

// ── Response markdown renderer
function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button onClick={handleCopy} style={{
      background: copied ? `${T.green}20` : "rgba(255,255,255,0.04)",
      border: `1px solid ${copied ? T.green : T.border}`,
      borderRadius: 8, padding: "5px 10px", cursor: "pointer",
      color: copied ? T.green : T.textSub, fontSize: 11, fontFamily: "'Cinzel', serif",
      letterSpacing: 1, transition: "all 0.2s", WebkitTapHighlightColor: "transparent",
    }}>
      {copied ? "✓ COPIED" : "COPY"}
    </button>
  );
}

// Flag button — lets players report wrong advice to Discord webhook
function FlagButton({ content, spec, cls }) {
  const [state, setState] = useState("idle"); // idle | open | sending | done | error
  const [reason, setReason] = useState("");

  const send = async () => {
    if (!reason.trim()) return;
    setState("sending");
    try {
      const res = await fetch("/api/flag", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ spec, cls, advice: content, reason: reason.trim(), patch: "12.0.5" }),
      });
      setState(res.ok ? "done" : "error");
    } catch { setState("error"); }
  };

  if (state === "done") return (
    <span style={{ fontSize: 11, color: T.green, fontFamily: "'Cinzel', serif", letterSpacing: 1 }}>
      ✓ FLAGGED — thanks
    </span>
  );

  if (state === "open" || state === "sending" || state === "error") return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
      <textarea
        placeholder="What's wrong? (e.g. 'Crit is now better than Haste after 12.0.5 patch')"
        value={reason}
        onChange={e => setReason(e.target.value)}
        rows={2}
        style={{
          width: "100%", minWidth: 220, background: T.surfaceHi, border: `1px solid ${T.border}`,
          borderRadius: 8, padding: "7px 10px", color: T.text, fontSize: 13, resize: "none",
          fontFamily: "'DM Sans', sans-serif",
        }}
      />
      <div style={{ display: "flex", gap: 6 }}>
        <button onClick={() => { setState("idle"); setReason(""); }} style={{
          background: "transparent", border: `1px solid ${T.border}`, borderRadius: 8,
          padding: "4px 10px", cursor: "pointer", color: T.textSub, fontSize: 11,
        }}>Cancel</button>
        <button onClick={send} disabled={state === "sending" || !reason.trim()} style={{
          background: `${T.red}18`, border: `1px solid ${T.red}40`, borderRadius: 8,
          padding: "4px 10px", cursor: "pointer", color: T.red, fontSize: 11,
          fontFamily: "'Cinzel', serif", letterSpacing: 1, opacity: !reason.trim() ? 0.45 : 1,
        }}>
          {state === "sending" ? "SENDING…" : state === "error" ? "RETRY" : "SEND REPORT"}
        </button>
      </div>
    </div>
  );

  return (
    <button onClick={() => setState("open")} style={{
      background: "transparent", border: "none", cursor: "pointer",
      color: T.textDim, fontSize: 11, fontFamily: "'Cinzel', serif", letterSpacing: 1,
      padding: "5px 6px", WebkitTapHighlightColor: "transparent",
      transition: "color 0.2s",
    }}
    onMouseEnter={e => e.currentTarget.style.color = T.red}
    onMouseLeave={e => e.currentTarget.style.color = T.textDim}
    title="Report incorrect advice">
      Wrong advice?
    </button>
  );
}

function ShareButton({ text, label }) {
  const [state, setState] = useState("idle"); // idle | copied | error

  const share = async () => {
    const shareText = `Vaultwright gear analysis — ${label}\n\n${text.slice(0, 800)}${text.length > 800 ? "…" : ""}\n\ngearchecker-ucm7.vercel.app`;
    if (navigator.share) {
      try {
        await navigator.share({ title: `Vaultwright — ${label}`, text: shareText });
        setState("copied");
      } catch { /* user cancelled */ }
    } else {
      navigator.clipboard?.writeText(shareText).then(() => {
        setState("copied");
        setTimeout(() => setState("idle"), 2500);
      }).catch(() => setState("error"));
    }
  };

  return (
    <button onClick={share} style={{
      background: state === "copied" ? `${T.green}20` : "rgba(255,255,255,0.04)",
      border: `1px solid ${state === "copied" ? T.green : T.border}`,
      borderRadius: 8, padding: "5px 10px", cursor: "pointer",
      color: state === "copied" ? T.green : T.textSub, fontSize: 11,
      fontFamily: "'Cinzel', serif", letterSpacing: 1, transition: "all 0.2s",
      WebkitTapHighlightColor: "transparent",
    }}>
      {state === "copied" ? "✓ SHARED" : "↑ SHARE"}
    </button>
  );
}

function ResponseBlock({ content, showCopy = false, spec = "", cls = "" }) {
  if (!content) return null;
  return (
    <div>
      {showCopy && (
        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <FlagButton content={content} spec={spec} cls={cls} />
          <CopyButton text={content} />
        </div>
      )}
    <div style={{ lineHeight: 1.8 }}>
      {(() => {
        const lines = content.split("\n");
        const out = [];
        let i = 0;
        while (i < lines.length) {
          const line = lines[i];
          if (!line.trim()) { i++; continue; }
          // Table detection: line starts with |
          if (line.trim().startsWith("|")) {
            const tableLines = [];
            while (i < lines.length && lines[i].trim().startsWith("|")) {
              tableLines.push(lines[i]);
              i++;
            }
            const rows = tableLines.filter(l => !l.match(/^\s*\|[-:\s|]+\|\s*$/));
            if (rows.length > 0) {
              const headers = rows[0].split("|").filter((_,j,a) => j>0 && j<a.length-1).map(h=>h.trim());
              const bodyRows = rows.slice(1);
              out.push(
                <div key={`tbl-${i}`} style={{ overflowX:"auto", margin:"14px 0", borderRadius:10, border:`1px solid ${T.border}` }}>
                  <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13, minWidth:300 }}>
                    <thead>
                      <tr style={{ background: T.surfaceHi }}>
                        {headers.map((h,j) => <th key={j} style={{ padding:"9px 12px", color:T.gold, fontFamily:"'Cinzel',serif", fontSize:10, letterSpacing:1.5, textAlign:"left", borderBottom:`1px solid ${T.border}`, fontWeight:700 }}>{h}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {bodyRows.map((row,ri) => {
                        const cells = row.split("|").filter((_,j,a)=>j>0&&j<a.length-1).map(c=>c.trim());
                        return <tr key={ri} style={{ borderBottom:`1px solid ${T.border}20`, background: ri%2===0?"transparent":T.surfaceHi+"40" }}>
                          {cells.map((c,ci) => <td key={ci} style={{ padding:"8px 12px", color:"#c9d1d9", fontSize:13, verticalAlign:"top" }} dangerouslySetInnerHTML={{ __html: c.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\*\*(.+?)\*\*/g,`<strong style="color:${T.text}">$1</strong>`) }} />)}
                        </tr>;
                      })}
                    </tbody>
                  </table>
                </div>
              );
            }
            continue;
          }
          if (line.startsWith("##")) {
            out.push(<h3 key={i} style={{ color: T.gold, fontSize: 14, fontFamily: "'Cinzel', serif", fontWeight: 700, marginTop: 18, marginBottom: 6, letterSpacing: 0.5 }}>{line.replace(/^#+\s*/, "")}</h3>);
          } else if (line.startsWith("- ") || line.startsWith("• ")) {
            const raw = line.replace(/^[-•]\s*/, "");
            const safe = raw.replace(/</g,"&lt;").replace(/>/g,"&gt;");
            const html = safe.replace(/\*\*(.+?)\*\*/g, `<strong style="color:${T.text}">$1</strong>`);
            out.push(
              <div key={i} style={{ display:"flex", gap:10, margin:"5px 0", paddingLeft:4 }}>
                <span style={{ color:T.gold, flexShrink:0, marginTop:6, fontSize:6 }}>◆</span>
                <span style={{ color:"#c9d1d9", fontSize:14, lineHeight:1.6 }} dangerouslySetInnerHTML={{ __html: html }} />
              </div>
            );
          } else if (line.match(/^---+$/)) {
            out.push(<hr key={i} style={{ border:"none", borderTop:`1px solid ${T.border}`, margin:"14px 0" }} />);
          } else {
            const safeLine = line.replace(/</g,"&lt;").replace(/>/g,"&gt;");
            const html = safeLine.replace(/\*\*(.+?)\*\*/g, `<strong style="color:${T.text}">$1</strong>`);
            out.push(<p key={i} style={{ color:"#c9d1d9", fontSize:14, margin:"6px 0", lineHeight:1.7 }} dangerouslySetInnerHTML={{ __html: html }} />);
          }
          i++;
        }
        return out;
      })()}
    </div>
    </div>
  );
}

// ── Gear preview grid
function GearPreviewGrid({ gear }) {
  const filled = gear.filter(g => g.name);
  const withIlvl = filled.filter(g => g.ilvl && !isNaN(parseInt(g.ilvl)));
  const avg = withIlvl.length > 0 ? Math.round(withIlvl.reduce((a, g) => a + parseInt(g.ilvl), 0) / withIlvl.length) : 0;
  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <span style={{ color: T.gold, fontSize: 11, fontFamily: "'Cinzel', serif", letterSpacing: 1.5 }}>{filled.length}/{gear.length} SLOTS DETECTED</span>
        {avg > 0 && <span style={{ color: T.textSub, fontSize: 12 }}>avg <IlvlBadge ilvl={avg} /></span>}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {gear.map((slot, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "9px 12px", borderRadius: 8,
            background: slot.name ? "rgba(255,255,255,0.03)" : "transparent",
            borderBottom: i < gear.length - 1 ? `1px solid ${T.border}22` : "none",
          }}>
            <span style={{
              color: T.textDim, fontSize: 10, fontFamily: "'Cinzel', serif",
              letterSpacing: 0.5, width: 68, flexShrink: 0, textTransform: "uppercase",
            }}>{slot.label}</span>
            {slot.name ? (
              <>
                <span style={{
                  color: T.text, fontSize: 13, flex: 1,
                  overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                }}>{slot.name}</span>
                {slot.ilvl && <IlvlBadge ilvl={slot.ilvl} />}
              </>
            ) : (
              <span style={{ color: T.textDim, fontSize: 12, fontStyle: "italic" }}>empty</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Pure helpers (module-level) ─────────────────────────────────
// ── Rate limit counter ──────────────────────────────────────────
function getRateData() {
  try {
    const raw = localStorage.getItem('vw_rate');
    if (!raw) return { count: 0, date: new Date().toDateString() };
    return JSON.parse(raw);
  } catch { return { count: 0, date: new Date().toDateString() }; }
}
function incrementRate() {
  const today = new Date().toDateString();
  const data = getRateData();
  const count = data.date === today ? data.count + 1 : 1;
  try { localStorage.setItem('vw_rate', JSON.stringify({ count, date: today })); } catch {}
  return count;
}
function getTodayCount() {
  const data = getRateData();
  return data.date === new Date().toDateString() ? data.count : 0;
}

const toRealmSlug = n => n.trim().toLowerCase().replace(/\s+/g, "-").replace(/'/g, "").replace(/[^a-z0-9-]/g, "");

// Parses raider.io/characters/us/realm/name URLs (or us/realm/name shorthand)
const parseRioUrl = (url) => {
  const m = url.trim().match(/(?:raider\.io\/characters\/)?([a-z]{2})\/([^/]+)\/([^/?#]+)/i);
  if (!m) return null;
  return { region: m[1].toLowerCase(), realm: m[2], name: m[3] };
};

// ── Main App ─────────────────────────────────────────────────────
// ── Mode card (no emoji) ─────────────────────────────────────────
function ModeCard({ icon: Icon, title, badge, badgeColor = T.gold, description, selected, onClick }) {
  return (
    <button onClick={onClick} style={{
      background: selected ? `${badgeColor}12` : T.bg,
      border: `1.5px solid ${selected ? badgeColor : T.border}`,
      borderRadius: 12, padding: 16, cursor: "pointer", textAlign: "left",
      transition: "all 0.15s", width: "100%", WebkitTapHighlightColor: "transparent", minHeight: 72,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: 8, background: `${badgeColor}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Icon size={18} color={badgeColor} strokeWidth={1.8} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
            <span style={{ color: selected ? T.text : T.textSub, fontSize: 15, fontWeight: 600 }}>{title}</span>
            <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20, background: `${badgeColor}20`, color: badgeColor, flexShrink: 0 }}>{badge}</span>
          </div>
          <p style={{ color: T.textSub, fontSize: 13, margin: 0, lineHeight: 1.4 }}>{description}</p>
        </div>
        <div style={{ width: 20, height: 20, borderRadius: "50%", flexShrink: 0, border: `2px solid ${selected ? badgeColor : T.border}`, background: selected ? badgeColor : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {selected && <span style={{ color: T.bg, fontSize: 10, fontWeight: 900, lineHeight: 1 }}>✓</span>}
        </div>
      </div>
    </button>
  );
}

// ── Oracle tab button (no emoji) ─────────────────────────────────
function OracleTab({ label, icon: Icon, active, onClick }) {
  return (
    <button role="tab" aria-selected={active} aria-label={label} onClick={onClick} style={{
      flex: 1, padding: "10px 6px", borderRadius: 10, cursor: "pointer",
      background: active ? `${T.gold}18` : T.surface,
      border: `1.5px solid ${active ? T.gold : T.border}`,
      color: active ? T.gold : T.textSub,
      fontSize: 12, fontWeight: active ? 700 : 500, letterSpacing: 0.5,
      WebkitTapHighlightColor: "transparent", transition: "all 0.15s",
      display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
    }}>
      <Icon size={16} strokeWidth={active ? 2.5 : 1.8} />
      <span style={{ fontSize: 11 }}>{label}</span>
    </button>
  );
}

// ── Analysis empty state ─────────────────────────────────────────
function AnalysisEmptyState({ specName, className, onRun, loading }) {
  return (
    <div style={{ textAlign: "center", padding: "32px 20px" }}>
      <div style={{ width: 56, height: 56, borderRadius: 16, background: `${T.gold}12`, border: `1px solid ${T.gold}30`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
        <BarChart3 size={28} color={T.gold} strokeWidth={1.5} />
      </div>
      <p style={{ color: T.text, fontSize: 15, fontWeight: 600, margin: "0 0 6px" }}>
        {specName && className ? `${specName} ${className}` : "Ready to analyse"}
      </p>
      <p style={{ color: T.textSub, fontSize: 13, margin: "0 0 24px", lineHeight: 1.5 }}>
        Tell Vaultwright what you mainly play — they'll diagnose what's actually holding you back.
      </p>
      <button style={{ ...S.primaryBtn, width: "100%", opacity: loading ? 0.5 : 1 }} onClick={onRun} disabled={loading}>
        {loading ? <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}><Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />Analysing...</span> : "Find My Problem"}
      </button>
    </div>
  );
}

// ── Vault empty state ────────────────────────────────────────────
function VaultEmptyState() {
  return (
    <div style={{ textAlign: "center", padding: "24px 20px 8px" }}>
      <div style={{ width: 48, height: 48, borderRadius: 14, background: `${T.gold}12`, border: `1px solid ${T.gold}30`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
        <Trophy size={24} color={T.gold} strokeWidth={1.5} />
      </div>
      <p style={{ color: T.text, fontSize: 14, fontWeight: 600, margin: "0 0 4px" }}>Great Vault opens on Tuesday</p>
      <p style={{ color: T.textSub, fontSize: 13, margin: "0 0 20px", lineHeight: 1.5 }}>Enter the items showing in your vault and Vaultwright will tell you exactly which to take.</p>
    </div>
  );
}

// ── Weekly empty state ───────────────────────────────────────────
function WeeklyEmptyState() {
  return (
    <div style={{ textAlign: "center", padding: "24px 20px 8px" }}>
      <div style={{ width: 48, height: 48, borderRadius: 14, background: "#58a6ff18", border: "1px solid #58a6ff30", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
        <Calendar size={24} color="#58a6ff" strokeWidth={1.5} />
      </div>
      <p style={{ color: T.text, fontSize: 14, fontWeight: 600, margin: "0 0 4px" }}>Plan your reset</p>
      <p style={{ color: T.textSub, fontSize: 13, margin: "0 0 20px", lineHeight: 1.5 }}>Enter your available resources and Vaultwright will build a prioritised weekly checklist.</p>
    </div>
  );
}
// ── Error boundary — prevents white screen on render crash
class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(e) { return { error: e }; }
  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div style={{ minHeight: "100vh", background: T.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ maxWidth: 400, textAlign: "center" }}>
          <p style={{ color: T.gold, fontFamily: "'Cinzel', serif", fontSize: 13, letterSpacing: 2, marginBottom: 12 }}>SOMETHING WENT WRONG</p>
          <p style={{ color: T.textSub, fontSize: 13, marginBottom: 20, lineHeight: 1.5 }}>{this.state.error?.message || "Unexpected error"}</p>
          <button style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 10, padding: "10px 20px", cursor: "pointer", color: T.text, fontSize: 14 }}
            onClick={() => window.location.reload()}>Reload</button>
        </div>
      </div>
    );
  }
}

// ── Main App ─────────────────────────────────────────────────────
export default function Vaultwright() {
  const [step, setStep]         = useState(0);
  const [inputMode, setInputMode] = useState(null);
  const [detectedClass, setDetectedClass] = useState("");
  const [detectedSpec,  setDetectedSpec]  = useState("");

  const [detectedGear, setDetectedGear] = useState([]);
  const [gearSummary,  setGearSummary]  = useState("");

  // Raider.IO — URL-based input (replaces 3-field name/realm/region)
  const [rioUrl,     setRioUrl]     = useState("");
  const [rioLoading, setRioLoading] = useState(false);
  const [rioError,   setRioError]   = useState("");

  // Warcraft Logs
  const [wclUrl,     setWclUrl]     = useState("");
  const [wclData,    setWclData]    = useState(null);
  const [wclLoading, setWclLoading] = useState(false);
  const [wclError,   setWclError]   = useState("");
  const [wclSpecPicked, setWclSpecPicked] = useState(false); // true once user has confirmed their class+spec

  const [simcString, setSimcString] = useState("");
  const [simcParsed, setSimcParsed] = useState(null);

  // Content focus — drives the whole prompt direction
  const [contentFocus, setContentFocus] = useState(null); // "M+" | "Raid" | "Both"

  // Friend comparison
  const [friendUrl,     setFriendUrl]     = useState("");
  const [friendData,    setFriendData]    = useState(null);
  const [friendLoading, setFriendLoading] = useState(false);
  const [friendError,   setFriendError]   = useState("");

  // Benchmark note injected into session bar after first analysis
  const [benchmarkNote,   setBenchmarkNote]   = useState("");
  const [knowledgeUpdates, setKnowledgeUpdates] = useState([]); // live corrections pending review
  const [chatHistory, setChatHistory] = useState([]);
  const [loading,     setLoading]     = useState(false);
  const [followUp,    setFollowUp]    = useState("");
  const chatEndRef = useRef(null);
  const followUpRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        followUpRef.current?.focus();
        followUpRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const [oracleMode,      setOracleMode]      = useState("problem");
  const [vaultItems,      setVaultItems]      = useState(["","","",  "","","",  "","",""]);  // 9 slots: 3 dungeon, 3 raid, 3 world
  const [sparksAvailable, setSparksAvailable] = useState("1");
  const [heroCrestsAvail, setHeroCrestsAvail] = useState("");
  const [mythCrestsAvail, setMythCrestsAvail] = useState("");
  const [dailyCount,      setDailyCount]      = useState(() => getTodayCount());

  // Page title
  useEffect(() => {
    document.title = detectedClass
      ? `${detectedSpec} ${detectedClass} — Vaultwright`
      : "Vaultwright — WoW Midnight Gear Advisor";
  }, [detectedClass, detectedSpec]);

  // Sentry — optional error tracking (set VITE_SENTRY_DSN env var to enable)
  useEffect(() => {
    const dsn = import.meta.env?.VITE_SENTRY_DSN;
    if (!dsn) return;
    const s = document.createElement('script');
    s.src = 'https://browser.sentry-cdn.com/7.119.0/bundle.min.js';
    s.onload = () => window.Sentry?.init({ dsn, tracesSampleRate: 0.1 });
    document.head.appendChild(s);
  }, []);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chatHistory]);

  const activeClass = detectedClass;  // alias — same as detectedClass
  const activeSpec  = detectedSpec;   // alias — same as detectedSpec
  const classData   = CLASSES.find(c => c.name === activeClass);

  // SimC parser
  const parseSimC = useCallback((str) => {
    if (!str.trim()) return null;
    const slotMap = { head:"head", neck:"neck", shoulder:"shoulder", back:"back", chest:"chest", wrist:"wrist", hands:"hands", waist:"waist", legs:"legs", feet:"feet", finger1:"finger1", finger2:"finger2", trinket1:"trinket1", trinket2:"trinket2", main_hand:"mainhand", off_hand:"offhand" };
    const classNameMap = { deathknight:"Death Knight", demonhunter:"Demon Hunter", druid:"Druid", evoker:"Evoker", hunter:"Hunter", mage:"Mage", monk:"Monk", paladin:"Paladin", priest:"Priest", rogue:"Rogue", shaman:"Shaman", warlock:"Warlock", warrior:"Warrior" };
    const found = {}; const ilvls = []; let parsedClass = ""; let parsedSpec = "";
    const rawLines = str.split("\n");

    for (let i = 0; i < rawLines.length; i++) {
      const t = rawLines[i].trim();
      if (!t || !t.includes("=")) continue;
      if (t.startsWith("#")) continue;

      const eqIdx = t.indexOf("=");
      const rawKey = t.slice(0, eqIdx).trim();
      const val = t.slice(eqIdx + 1).trim().replace(/"/g, "");

      if (!parsedClass && classNameMap[rawKey.toLowerCase()]) {
        parsedClass = classNameMap[rawKey.toLowerCase()]; continue;
      }

      if (rawKey === "spec") {
        const specMap = {
          beast_mastery:"Beast Mastery", beastmastery:"Beast Mastery",
          holy:"Holy", protection:"Protection", retribution:"Retribution",
          blood:"Blood", frost:"Frost", unholy:"Unholy",
          havoc:"Havoc", vengeance:"Vengeance", devourer:"Devourer",
          balance:"Balance", feral:"Feral", guardian:"Guardian", restoration:"Restoration",
          devastation:"Devastation", preservation:"Preservation", augmentation:"Augmentation",
          marksmanship:"Marksmanship", survival:"Survival",
          arcane:"Arcane", fire:"Fire",
          brewmaster:"Brewmaster", mistweaver:"Mistweaver", windwalker:"Windwalker",
          discipline:"Discipline", shadow:"Shadow",
          assassination:"Assassination", outlaw:"Outlaw", subtlety:"Subtlety",
          elemental:"Elemental", enhancement:"Enhancement",
          affliction:"Affliction", demonology:"Demonology", destruction:"Destruction",
          arms:"Arms", fury:"Fury",
        };
        const key = val.toLowerCase().replace(/[^a-z_]/g, "");
        parsedSpec = specMap[key] || val.replace(/_/g," ").replace(/\b\w/g,c=>c.toUpperCase());
        continue;
      }

      const slotKey = slotMap[rawKey];
      if (!slotKey) continue;

      // Real SimC 12.x format: item name + ilvl are in the comment line above
      //   # Silvermoon Sunveil (253)
      //   head=,id=266431,enchant_id=7960,bonus_id=...
      let itemName = "";
      let ilvl = null;
      for (let j = i - 1; j >= Math.max(0, i - 4); j--) {
        const prev = rawLines[j].trim();
        const m = prev.match(/^#\s+(.+?)\s+\((\d+)\)\s*$/);
        if (m) { itemName = m[1]; ilvl = parseInt(m[2]); break; }
      }

      // Fallback: inline name (older format head=item_name,id=...)
      if (!itemName) {
        const inline = val.split(",")[0].replace(/_/g, " ").trim();
        if (inline && !inline.startsWith("id=")) itemName = inline;
      }

      // Fallback: ilevel= field (very old SimC versions)
      if (!ilvl) {
        const m2 = val.match(/ilevel=(\d+)/);
        if (m2) ilvl = parseInt(m2[1]);
      }

      if (ilvl) ilvls.push(ilvl);

      if (itemName || ilvl) {
        found[slotKey] = { key: slotKey, name: itemName || slotKey, ilvl };
      }
    }

    const gear = GEAR_SLOTS.map(s => { const h = found[s.key]; return h ? { ...s, name: h.name, ilvl: h.ilvl } : { ...s, name: "", ilvl: null }; });
    const filled = gear.filter(g => g.name && g.name.length > 1);
    if (!filled.length) return null;
    const avgIlvl = ilvls.length ? Math.round(ilvls.reduce((a,b)=>a+b,0)/ilvls.length) : null;
    return { gear, filled: filled.length, avgIlvl, parsedClass, parsedSpec };
  }, []);

  useEffect(() => {
    if (inputMode !== "simc") { setSimcParsed(null); return; }
    if (simcString.length <= 80) { setSimcParsed(null); return; }
    const timer = setTimeout(() => {
      const parsed = parseSimC(simcString);
      setSimcParsed(parsed);
      if (parsed?.parsedClass) setDetectedClass(parsed.parsedClass);
      if (parsed?.parsedSpec)  setDetectedSpec(parsed.parsedSpec);
    }, 400); // 400ms debounce — avoids parsing on every keystroke
    return () => clearTimeout(timer);
  }, [simcString, inputMode, parseSimC]);

  const fetchRaiderIO = async () => {
    const parsed = parseRioUrl(rioUrl);
    if (!parsed) { setRioError("Paste your Raider.IO profile URL — e.g. raider.io/characters/us/stormrage/Arthas"); return; }
    setRioLoading(true); setRioError(""); setDetectedGear([]);
    try {
      const res = await fetchWithRetry(`/api/raiderio?region=${parsed.region}&realm=${encodeURIComponent(toRealmSlug(parsed.realm))}&name=${encodeURIComponent(parsed.name)}`);
      if (!res.ok) {
        const e = await res.json().catch(() => ({}));
        if (res.status === 404) throw new Error(`Character not found. Make sure you log out in-game first so Raider.IO has current data.`);
        if (res.status === 429) throw new Error("Raider.IO rate limit — wait 10 seconds and try again.");
        if (res.status >= 500) throw new Error("Raider.IO is having issues right now. Try again in a moment.");
        throw new Error(e.message || `Lookup failed (${res.status}). Double-check your profile URL.`);
      }
      const data = await res.json();
      if (data.class)            setDetectedClass(data.class);
      if (data.active_spec_name) setDetectedSpec(data.active_spec_name);
      const items = data.gear?.items || {};
      const gearArray = GEAR_SLOTS.map(slot => { const item = items[slot.key]; return { ...slot, name: item?.name || "", ilvl: item?.item_level || null }; });
      setDetectedGear(gearArray);
      const filled = gearArray.filter(g => g.name);
      const filledWithIlvl = filled.filter(g => g.ilvl);
      const avg = filledWithIlvl.length ? Math.round(filledWithIlvl.reduce((a,g)=>a+g.ilvl,0)/filledWithIlvl.length) : 0;
      setGearSummary(`Character: ${data.name} (${data.class} — ${data.active_spec_name}), avg ilvl ${avg}.\nEquipped gear:\n` + filled.map(g=>`${g.label}: ${g.name}${g.ilvl?` (ilvl ${g.ilvl})`:""}`).join("\n"));
    } catch (e) { setRioError(e.message || "Fetch failed. Check name, realm and region."); }
    setRioLoading(false);
  };

  // Warcraft Logs fetch
  const fetchWCL = async () => {
    if (!wclUrl.trim()) return;
    setWclLoading(true); setWclError(""); setWclData(null);
    try {
      const res = await fetchWithRetry("/api/wclogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: wclUrl.trim() }),
      });
      if (!res.ok) {
        const e = await res.json().catch(() => ({}));
        throw new Error(e.error || `WCL fetch failed (${res.status})`);
      }
      const data = await res.json();
      setWclData(data);
      // If WCL pre-matched a player via sourceId, set class/spec and go straight to analysis
      if (data.report?.player) {
        const p = data.report.player;
        const pSpec = p.specs?.[0]?.spec || "";
        if (p.type) setDetectedClass(p.type);
        if (pSpec)  setDetectedSpec(pSpec);
        if (p.type && pSpec) {
          // sourceId matched a specific player — skip the picker entirely
          setWclLoading(false);
          setTimeout(sendInitial, 0);
          return;
        }
      }
      // Placeholder (no WCL API keys) — nothing useful to do, show skip option
      if (data.placeholder) {
        setWclLoading(false);
        return;
      }
    } catch (e) { setWclError(e.message || "Failed to load log. Check the URL."); }
    setWclLoading(false);
  };

  const buildGearContext = () => {
    if (inputMode === "rio" && gearSummary) return gearSummary;
    if (inputMode === "simc" && simcParsed) return `SimC — ${simcParsed.filled} items${simcParsed.avgIlvl ? `, avg ${simcParsed.avgIlvl}` : ""}:\n` + simcParsed.gear.filter(g=>g.name).map(g=>`${g.label}: ${g.name}${g.ilvl?` (ilvl ${g.ilvl})`:""}`).join("\n");
    if (inputMode === "wcl" && wclData) {
      if (wclData.placeholder) return `Warcraft Logs loaded (report: ${wclData.reportId}) — API key not yet configured. Advise on spec mechanics and general gearing without specific gear data.`;
      const p = wclData.report?.player;
      const fights = wclData.report?.fights || [];
      const rankings = wclData.report?.rankings;
      const ilvlFights = fights.filter(f => f.averageItemLevel);
      const avgIlvl = ilvlFights.length
        ? Math.round(ilvlFights.reduce((a, f) => a + f.averageItemLevel, 0) / ilvlFights.length)
        : null;
      const lines = [
        p ? `WCL Player: ${p.name} (${p.type} — ${p.specs?.[0]?.spec || "Unknown"})` : "WCL data loaded",
        avgIlvl ? `Estimated avg ilvl from fights: ${avgIlvl}` : "",
        fights.length ? `Fights: ${fights.slice(0, 5).map(f => [
          f.name,
          f.keystoneLevel ? `+${f.keystoneLevel}` : null,
          f.averageItemLevel ? `(${Math.round(f.averageItemLevel)} ilvl)` : null,
          f.kill === false ? "[wipe]" : null,
        ].filter(Boolean).join(" ")).join(" | ")}` : "",
        rankings?.data?.[0] ? `Latest ranking: ${Math.round(rankings.data[0].percentile ?? 0)}th percentile (${rankings.data[0].spec || ""})` : "",
        "No item-by-item gear list available from WCL. Focus on: performance patterns, cooldown usage, survivability, spec-specific common mistakes.",
      ];
      return lines.filter(Boolean).join("\n");
    }
    return "No gear data — give best general spec advice.";
  };

  // sysPrompt: three blocks with different cache/volatility profiles.
  // Block 1 (cached): stable spec knowledge — Apex Talent mechanics, rotation identity, Runeforge rules.
  // Block 2 (cached): universal rules — gear tracks, Dawncrest math, embellishments.
  //   → Both cached because they rarely change. Claude re-uses tokens across calls.
  // Block 3 (uncached): volatile context — patch state, player gear, rules.
  //   → Uncached because it changes every session. Web search handles the volatile consumable data.
  const sysPrompt = (compactGear = false) => {
    const gear = compactGear
      ? summarizeGearForPrompt(gearSummary, simcParsed, inputMode)
      : buildGearContext();
    return [
      // Block 1 — STABLE (cached): spec-specific mechanics, rotation identity, Runeforge rules
      {
        type: "text",
        text: getSpecKnowledge(activeSpec, activeClass),
        cache_control: { type: "ephemeral" },
      },
      // Block 2 — STABLE (cached): universal Season 1 systems knowledge
      {
        type: "text",
        text: UNIVERSAL_KNOWLEDGE,
        cache_control: { type: "ephemeral" },
      },
      // Block 3 — VOLATILE (uncached): patch state + player context + rules
      {
        type: "text",
        text: `${PATCH_CONTEXT}

You are Vaultwright — a straight-talking WoW gear coach for Midnight Season 1. Your audience is a mid-tier player — someone doing heroic raid or 10-15 keys who feels stuck and doesn't know why. They don't sim. They've skimmed Icy Veins. They need honest, specific, prioritised advice — not a textbook.

Player: ${activeSpec || "Unknown Spec"} ${activeClass || "Unknown Class"}
Content focus: ${contentFocus === "M+" ? "Mythic+ dungeons (short fights, burst AoE, movement)" : contentFocus === "Raid" ? "Raid (longer fights, sustained single-target, positional play)" : "Mix of M+ and Raid"}
${contentFocus === "M+" ? "Prioritise: burst AoE, short CD embellishments, mobility. Downweight: sustained ST, long ramp-up talents." : contentFocus === "Raid" ? "Prioritise: sustained ST/cleave, long CD embellishments, raid utility. Downweight: pure AoE, mobility-only gains." : "Balance advice between M+ and Raid — flag where they differ significantly."}

Gear:
${gear}

VOLATILE ADVICE RULE: For gems, enchants, flasks, and stat weights — use web_search to verify current recommendations from icy-veins.com or method.gg before stating them. If search confirms our knowledge, state confidently. If search finds a discrepancy, lead with the current info.

LIVE CORRECTION PROTOCOL: If web_search reveals information that directly and conclusively contradicts the spec knowledge injected above (Layer B or Layer C), you MUST:
1. Lead your response with the correct current information as normal
2. Append this exact structured block at the very end of your response (after all sections, outside any ## headers):
[KNOWLEDGE_UPDATE: field_name | old_value | new_value | source_url]
field_name: the category being corrected (e.g. stat_priority, hero_talent, gem, flask, enchant, apex_talent)
old_value: brief description of what the injected knowledge says
new_value: brief description of what your search found
source_url: the URL that confirmed the correction (icy-veins.com/wow/... preferred)
Only emit this block if search CONCLUSIVELY contradicts injected knowledge with a clear factual conflict. Do NOT emit it for minor wording differences, build alternatives that are both valid, or corrections already noted in the spec block itself.

Rules:
- Use ## headers, **bold** for stats/items/numbers, bullet points for lists
- NEVER use markdown tables — lists only
- Explain acronyms briefly (e.g. "Dawncrests — the upgrade currency")
- Be direct and honest. If gear is fine and the problem is mechanical, say so
- Name actual items, give exact ilvl numbers, give Dawncrest costs
- 3-5 bullets per section max — no walls of text
- End with: 📖 icy-veins.com/wow/[spec-class-slug]`,
      },
    ];
  };

  const sendInitial = async () => {
    setLoading(true); setStep(2); setOracleMode("problem");
    setDailyCount(incrementRate());
    const contentCtx = contentFocus === "M+" ? "Mythic+ (10-15 key range)" : contentFocus === "Raid" ? "Heroic/early Mythic raid" : "mix of M+ and Raid";
    const msg = `I'm a ${activeSpec} ${activeClass} doing ${contentCtx}. I feel stuck and don't know what's actually holding me back.

## The Problem
What is the single biggest thing holding back my performance right now? Be specific and honest. If my gear is fine and the problem is something else (bad embellishment choice, wrong stat spread, undervalued slot), say so directly.

## Fix This Week
Give me 2-3 ordered actions for THIS WEEK ONLY. Not a wishlist — a real priority order based on impact. Be ruthless about what doesn't matter yet.

## Skip For Now
What looks wrong but isn't actually my priority? What should I stop worrying about?

## Where I Stand
Give me a rough benchmark: where should a ${activeSpec} ${activeClass} doing ${contentCtx} be at, and how far am I from the next performance tier?`;
    setChatHistory([{ role: "user", content: msg, display: "Gear Analysis" }]);
    try {
      const rawText = await callClaude(sysPrompt(), [{ role: "user", content: msg }]);
      const { clean: text, updates } = extractKnowledgeUpdates(rawText);
      queueKnowledgeUpdates(updates);
      setChatHistory([{ role: "user", content: msg, display: "Gear Analysis" }, { role: "assistant", content: text }]);
      // Extract benchmark note from "Where I Stand" section for session bar
      const standIdx = text.indexOf("## Where I Stand");
      if (standIdx !== -1) {
        const afterHeader = text.slice(standIdx + "## Where I Stand".length);
        const nextSection = afterHeader.indexOf("##");
        const section = (nextSection === -1 ? afterHeader : afterHeader.slice(0, nextSection)).trim();
        const firstLine = section.split("\n").find(l => l.trim().length > 10);
        if (firstLine) {
          const clean = firstLine.replace(/^[-*•\s]+/, "").replace(/\*\*/g, "").trim();
          setBenchmarkNote(clean.slice(0, 140));
        }
      }
    } catch (e) {
      setChatHistory([{ role: "user", content: msg, display: "Gear Analysis" }, { role: "assistant", content: `Error: ${e.message}` }]);
    }
    setLoading(false);
  };

  // ── Queue knowledge updates to corrections pipeline ─────────────
  const queueKnowledgeUpdates = async (updates) => {
    if (!updates?.length) return;
    setKnowledgeUpdates(prev => [...prev, ...updates]);
    try {
      await fetch("/api/corrections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          spec: activeSpec, cls: activeClass,
          updates, patch: "12.0.5",
        }),
      });
    } catch { /* non-fatal — corrections are best-effort */ }
  };

  const sendFollowUp = async () => {
    if (!followUp.trim() || loading) return;
    const text = followUp.trim(); setFollowUp(""); setLoading(true);
    const hist = [...chatHistory, { role: "user", content: text }];
    setChatHistory(hist);
    // Use truncated history + compact gear summary to cut token usage on follow-ups
    const truncated = truncateHistory(hist);
    try {
      const rawReply = await callClaude(sysPrompt(true), truncated.map(m => ({ role: m.role, content: m.content })));
      const { clean: reply, updates: fuUpdates } = extractKnowledgeUpdates(rawReply);
      queueKnowledgeUpdates(fuUpdates);
      setChatHistory([...hist, { role: "assistant", content: reply }]);
    } catch (e) { setChatHistory([...hist, { role: "assistant", content: `Error: ${e.message}` }]); }
    setLoading(false);
  };

  const sendVaultAnalysis = async () => {
    const filled = vaultItems.filter(v => v.trim());
    if (!filled.length) return;
    setLoading(true);
    setDailyCount(incrementRate());
    const msg = `I'm looking at my Great Vault. Available picks:\n${filled.map((item,i)=>`${i+1}. ${item}`).join("\n")}\n\nMy gear:\n${buildGearContext()}\n\n## Which pick should I take and why?\nGive a clear #1 recommendation with the mechanical reason. Consider: ilvl upgrade, Tier set progress, stat value for my ${activeSpec} ${activeClass} Apex Talent, and availability from other sources.\n\n## The others\nBrief note on why the other options are lower priority.`;
    const hist = [...chatHistory, { role: "user", content: msg, display: `Vault — ${filled.length} item${filled.length > 1 ? "s" : ""}` }];
    setChatHistory(hist);
    try {
      // ARCH-02: truncate history + compact gear, same as sendFollowUp.
      // Previously sent the full uncompressed chatHistory on every vault call.
      const truncatedVault = truncateHistory(hist);
      const rawVaultReply = await callClaude(sysPrompt(true), truncatedVault.map(m => ({ role: m.role, content: m.content })));
      const { clean: reply, updates: vaultUpdates } = extractKnowledgeUpdates(rawVaultReply);
      queueKnowledgeUpdates(vaultUpdates);
      setChatHistory([...hist, { role: "assistant", content: reply }]);
    } catch (e) { setChatHistory([...hist, { role: "assistant", content: `Error: ${e.message}` }]); }
    setLoading(false);
  };

  const sendCompare = async () => {
    if (!friendUrl.trim() || loading) return;
    setFriendLoading(true); setFriendError("");
    // Fetch friend's RIO data
    const parsed = parseRioUrl(friendUrl);
    if (!parsed) { setFriendError("Paste your friend's Raider.IO profile URL"); setFriendLoading(false); return; }
    try {
      const res = await fetchWithRetry(`/api/raiderio?region=${parsed.region}&realm=${encodeURIComponent(toRealmSlug(parsed.realm))}&name=${encodeURIComponent(parsed.name)}`);
      if (!res.ok) throw new Error("Couldn't find that character. Check the URL.");
      const data = await res.json();
      const items = data.gear?.items || {};
      const gearArray = GEAR_SLOTS.map(slot => { const item = items[slot.key]; return { ...slot, name: item?.name || "", ilvl: item?.item_level || null }; });
      const filled = gearArray.filter(g => g.name && g.ilvl);
      const avg = filled.length ? Math.round(filled.reduce((a,g)=>a+g.ilvl,0)/filled.length) : 0;
      const friendSummary = `Friend: ${data.name} (${data.class} — ${data.active_spec_name}), avg ilvl ${avg}.\nGear:\n` + filled.map(g=>`${g.label}: ${g.name} (ilvl ${g.ilvl})`).join("\n");
      setFriendData({ name: data.name, cls: data.class, spec: data.active_spec_name, avg, summary: friendSummary });

      const msg = `Compare me to my friend.

MY GEAR:
${buildGearContext()}

FRIEND'S GEAR:
${friendSummary}

## The Gap
Where are they actually ahead? Slot by slot, what's different? Is it gear or is it something else?

## What To Focus On
Given this comparison, what's my single highest-leverage action to close the gap?

## What's Already Fine
Where am I actually equal to or ahead of my friend?`;

      const hist = [...chatHistory, { role: "user", content: msg, display: `Compare vs ${data.name}` }];
      setChatHistory(hist);
      setLoading(true);
      const rawCompareReply = await callClaude(sysPrompt(true), hist.map(m => ({ role: m.role, content: m.content })));
      const { clean: reply, updates: compareUpdates } = extractKnowledgeUpdates(rawCompareReply);
      queueKnowledgeUpdates(compareUpdates);
      setChatHistory([...hist, { role: "assistant", content: reply }]);
    } catch (e) { setFriendError(e.message || "Comparison failed."); }
    setFriendLoading(false);
    setLoading(false);
  };

  const sendWeeklyPlan = async () => {
    setLoading(true);
    setDailyCount(incrementRate());
    const msg = `Generate my weekly Vaultwright plan as a ${activeSpec} ${activeClass}.\n\nContent focus: ${contentFocus || "general play"}\nSparks: ${sparksAvailable} | Hero Crests: ${heroCrestsAvail||"unknown"} | Myth Crests: ${mythCrestsAvail||"unknown"}\n\nGear:\n${buildGearContext()}\n\n## Upgrades This Reset\nWhich slots, what track, exact Dawncrest cost. Flag any FREE upgrades.\n\n## Crafting Decision\nSpend Sparks this week? If yes: exactly what item, slot, Embellishment, and reagent.\n\n## Content Priority\nWhat to run and in what order. Which Prey difficulty and Delve tier to target.\n\n## Vault Setup\nWhat to complete before reset to maximise next week's options.\n\n## Don't Forget\nFree upgrades, weekly quests for Sparks, reset-day actions.`;
    const hist = [...chatHistory, { role: "user", content: msg, display: "Weekly Plan" }];
    setChatHistory(hist);
    try {
      // ARCH-02: truncate history + compact gear, same as sendFollowUp.
      const truncatedWeekly = truncateHistory(hist);
      const rawWeeklyReply = await callClaude(sysPrompt(true), truncatedWeekly.map(m => ({ role: m.role, content: m.content })));
      const { clean: reply, updates: weeklyUpdates } = extractKnowledgeUpdates(rawWeeklyReply);
      queueKnowledgeUpdates(weeklyUpdates);
      setChatHistory([...hist, { role: "assistant", content: reply }]);
    } catch (e) { setChatHistory([...hist, { role: "assistant", content: `Error: ${e.message}` }]); }
    setLoading(false);
  };

  const reset = () => {
    if (chatHistory.length > 0 && !window.confirm("Start a new session? Your current analysis will be lost.")) return;
    setStep(0); setInputMode(null); setDetectedClass(""); setDetectedSpec("");
    setDetectedGear([]); setGearSummary(""); setRioUrl(""); setRioError("");
    setWclUrl(""); setWclData(null); setWclError(""); setWclSpecPicked(false);
    setSimcString(""); setSimcParsed(null);
    setContentFocus(null);
    setFriendUrl(""); setFriendData(null); setFriendError("");
    setBenchmarkNote(""); setKnowledgeUpdates([]);
    setChatHistory([]); setFollowUp(""); setOracleMode("problem");
    setVaultItems(["","","","","","","","",""]);
    setSparksAvailable("1"); setHeroCrestsAvail(""); setMythCrestsAvail("");
  };

  // ── Render ────────────────────────────────────────────────────
  return (
    <ErrorBoundary>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Cinzel+Decorative:wght@700&family=DM+Sans:wght@400;500;600&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes runespin { 0%{opacity:0.3;transform:scale(0.8)} 50%{opacity:1;transform:scale(1.2)} 100%{opacity:0.3;transform:scale(0.8)} }
        * { box-sizing: border-box; -webkit-font-smoothing: antialiased; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #1e2d42; border-radius: 4px; }
        input:focus, textarea:focus, select:focus { border-color: #c8973a !important; outline: none; box-shadow: 0 0 0 3px rgba(200,151,58,0.15) !important; }
        select { appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%238b949e'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 12px center; }
        button:active { opacity: 0.75; transform: scale(0.98); }
        .fu { animation: fadeUp 0.25s ease both; }
      `}</style>

      <div style={S.app}>
        <div style={S.wrap}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 32, paddingTop: 16 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(200,151,58,0.08)", border: "1px solid rgba(200,151,58,0.2)", borderRadius: 20, padding: "4px 14px", marginBottom: 16 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.goldBright, boxShadow: `0 0 8px ${T.goldBright}` }} />
              <span style={{ fontSize: 10, letterSpacing: 3, color: T.gold, fontFamily: "'Cinzel', serif", textTransform: "uppercase", fontWeight: 700 }}>WoW Midnight · Season 1</span>
            </div>
            <h1 style={{ fontSize: "clamp(32px,8vw,52px)", fontFamily: "'Cinzel Decorative', serif", background: `linear-gradient(135deg, ${T.goldBright} 0%, ${T.gold} 50%, #a87830 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", letterSpacing: 4, margin: "0 0 8px", lineHeight: 1.1 }}>VAULTWRIGHT</h1>
            <p style={{ color: T.textDim, fontSize: 11, margin: 0, letterSpacing: 3, fontFamily: "'Cinzel', serif" }}>MIDNIGHT GEAR ADVISOR</p>
          </div>

          {/* ── DEV ONLY: skip input ── */}
          {import.meta.env.DEV && (
            <div style={{ marginBottom: 12, display: "flex", justifyContent: "center" }}>
              <button style={{ background: "#2d1a4a", border: "1px solid #8b6fff40", borderRadius: 8, padding: "7px 16px", cursor: "pointer", color: "#8b6fff", fontSize: 12, fontFamily: "'Cinzel', serif", letterSpacing: 1 }}
                onClick={() => {
                  setInputMode("simc");
                  setContentFocus("M+");
                  setDetectedClass("Death Knight");
                  setDetectedSpec("Frost DK");
                  setGearSummary("Character: Testchar (Death Knight — Frost DK), avg ilvl 262.\nEquipped gear:\nHead: Helm of the Voidspire (ilvl 259)\nNeck: Amulet of Fractured Fate (ilvl 266)\nShoulder: Shoulderguards of the Fallen Crusade (ilvl 259)\nBack: Cloak of Enveloping Darkness (ilvl 259)\nChest: Breastplate of the Midnight Vanguard (ilvl 266)\nWrist: Voidforged Bracers (ilvl 259)\nHands: Gauntlets of the Ebon Blade (ilvl 259)\nWaist: Belt of Fractured Souls (ilvl 259)\nLegs: Legguards of the Voidspire (ilvl 259)\nFeet: Boots of the Fallen Crusade (ilvl 259)\nFinger 1: Ring of Cosmic Convergence (ilvl 266)\nFinger 2: Band of the Void Sentinel (ilvl 259)\nTrinket 1: Treacherous Transmitter (ilvl 266)\nTrinket 2: Sigil of Algari Concordance (ilvl 259)\nMainhand: Frostbrood Sapper (ilvl 272)");
                  // setTimeout(0): let React flush state above before sendInitial reads it
                  setTimeout(sendInitial, 0);
                }}>
                ⚡ DEV: Skip to Analysis
              </button>
            </div>
          )}

          {/* ══ Step 0: Input + content focus ══ */}
          {step === 0 && (
            <div style={S.card} className="fu">
              {/* Content focus — first, prominent */}
              <p style={{ color: T.text, fontSize: 15, fontWeight: 600, margin: "0 0 10px" }}>What do you mainly play?</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 24 }}>
                {[
                  { key: "M+",   label: "Mythic+",    sub: "10–15 keys" },
                  { key: "Raid", label: "Raid",        sub: "Heroic / Mythic" },
                  { key: "Both", label: "Both",        sub: "Mixed" },
                ].map(({ key, label, sub }) => (
                  <button key={key} onClick={() => setContentFocus(key)} style={{
                    background: contentFocus === key ? `${T.gold}18` : T.surface,
                    border: `1px solid ${contentFocus === key ? T.gold : T.border}`,
                    borderRadius: 12, padding: "14px 8px", cursor: "pointer",
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                    transition: "all 0.15s", WebkitTapHighlightColor: "transparent",
                  }}>
                    <span style={{ color: contentFocus === key ? T.goldBright : T.text, fontSize: 14, fontWeight: 600 }}>{label}</span>
                    <span style={{ color: T.textSub, fontSize: 11 }}>{sub}</span>
                  </button>
                ))}
              </div>

              {/* Input mode */}
              <p style={{ color: T.text, fontSize: 15, fontWeight: 600, margin: "0 0 10px" }}>How do you want to load your character?</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <ModeCard icon={Link2} title="Raider.IO Profile" badge="Easiest" badgeColor={T.green}
                  description="Paste your profile URL — we pull your live gear automatically."
                  selected={inputMode === "rio"} onClick={() => setInputMode("rio")} />
                <ModeCard icon={BarChart3} title="Warcraft Logs" badge="Performance Focus" badgeColor="#8b6fff"
                  description="Paste a log URL — we'll analyse fight patterns and cooldown usage, not just gear."
                  selected={inputMode === "wcl"} onClick={() => setInputMode("wcl")} />
                <ModeCard icon={FileText} title="SimC String" badge="Most Detail" badgeColor={T.gold}
                  description="Paste your /simc export for full enchant and gem analysis."
                  selected={inputMode === "simc"} onClick={() => setInputMode("simc")} />
              </div>
              {(inputMode && contentFocus) && (
                <div style={{ marginTop: 16, display: "flex", justifyContent: "flex-end" }}>
                  <button style={S.primaryBtn} onClick={() => setStep(1)}>Continue →</button>
                </div>
              )}
              {(inputMode && !contentFocus) && (
                <p style={{ color: T.textSub, fontSize: 13, marginTop: 12, textAlign: "center", fontStyle: "italic" }}>Pick M+, Raid, or Both above to continue</p>
              )}
            </div>
          )}

          {/* ══ Step 1: Data input ══ */}
          {step === 1 && (
            <div style={S.card} className="fu">
              <button style={S.backBtn} onClick={() => setStep(0)}>
                <ChevronLeft size={16} strokeWidth={2} /> Back
              </button>

              {/* Raider.IO — URL paste */}
              {inputMode === "rio" && (
                <>
                  <span style={S.label}>Raider.IO Profile URL</span>
                  <p style={{ color: T.textSub, fontSize: 14, marginBottom: 10, marginTop: 0, lineHeight: 1.5 }}>
                    Log out in-game first so your current gear shows. Then copy your URL from Raider.IO.
                  </p>
                  <p style={{ color: T.textDim, fontSize: 12, marginBottom: 14, fontStyle: "italic", marginTop: 0 }}>
                    e.g. raider.io/characters/us/stormrage/Arthas
                  </p>
                  <input style={S.input} placeholder="raider.io/characters/us/realm/name"
                    value={rioUrl} onChange={e => setRioUrl(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && fetchRaiderIO()} />
                  <button style={{ ...S.primaryBtn, width: "100%", marginTop: 12, opacity: rioLoading || !rioUrl.trim() ? 0.45 : 1 }}
                    onClick={fetchRaiderIO} disabled={rioLoading || !rioUrl.trim()}>
                    {rioLoading
                      ? <span style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:8 }}><Loader2 size={16} style={{animation:"spin 1s linear infinite"}} />Loading...</span>
                      : "Load My Character"}
                  </button>
                  {rioLoading && <SkeletonGearGrid />}
                  {rioError && (
                    <div style={{ marginTop: 12, padding: "12px 14px", background: `${T.red}12`, border: `1px solid ${T.red}40`, borderRadius: 8, display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <AlertCircle size={16} color={T.red} style={{ flexShrink: 0, marginTop: 1 }} />
                      <p style={{ color: T.red, fontSize: 14, margin: 0 }}>{rioError}</p>
                    </div>
                  )}
                  {detectedGear.length > 0 && (
                    <>
                      {detectedClass && (
                        <div style={{ marginTop: 14, padding: "10px 14px", background: `${T.green}12`, border: `1px solid ${T.green}40`, borderRadius: 8, display: "flex", alignItems: "center", gap: 10 }}>
                          <CheckCircle2 size={16} color={T.green} />
                          {classData && <ClassIcon name={classData.name} color={classData.color} size={26} />}
                          <span style={{ color: T.green, fontSize: 14, fontWeight: 600 }}>{detectedSpec} {detectedClass}</span>
                        </div>
                      )}
                      <GearPreviewGrid gear={detectedGear} />
                      <div style={{ marginTop: 16 }}>
                        <button style={{ ...S.primaryBtn, width: "100%" }} onClick={sendInitial}>Find My Problem →</button>
                      </div>
                    </>
                  )}
                </>
              )}

              {/* WCL */}
              {inputMode === "wcl" && (
                <>
                  <span style={S.label}>Warcraft Logs URL</span>
                  <p style={{ color: T.textSub, fontSize: 14, marginBottom: 10, marginTop: 0, lineHeight: 1.5 }}>
                    Paste a log URL from a recent M+ run or raid. Vaultwright will pull the players from the log and let you pick your character.
                  </p>
                  <p style={{ color: T.textDim, fontSize: 12, marginBottom: 14, fontStyle: "italic", marginTop: 0 }}>
                    e.g. warcraftlogs.com/reports/abc123#fight=last
                  </p>
                  <input style={S.input} placeholder="warcraftlogs.com/reports/..."
                    value={wclUrl} onChange={e => { setWclUrl(e.target.value); setWclData(null); setDetectedClass(""); setDetectedSpec(""); }}
                    onKeyDown={e => e.key === "Enter" && fetchWCL()} />
                  <button style={{ ...S.primaryBtn, width: "100%", marginTop: 12, opacity: wclLoading || !wclUrl.trim() ? 0.45 : 1 }}
                    onClick={fetchWCL} disabled={wclLoading || !wclUrl.trim()}>
                    {wclLoading
                      ? <span style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:8 }}><Loader2 size={16} style={{animation:"spin 1s linear infinite"}} />Loading log...</span>
                      : "Load Log"}
                  </button>
                  {wclError && (
                    <div style={{ marginTop: 12, padding: "12px 14px", background: `${T.red}12`, border: `1px solid ${T.red}40`, borderRadius: 8 }}>
                      <p style={{ color: T.red, fontSize: 14, margin: 0 }}>{wclError}</p>
                    </div>
                  )}

                  {/* Player picker — shown once real WCL data loads */}
                  {wclData && !wclData.placeholder && (wclData.report?.players?.length > 0) && (
                    <div style={{ marginTop: 16 }}>
                      <span style={S.label}>Who are you in this log?</span>
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {wclData.report.players.map(p => {
                          const pClassData = CLASSES.find(c => c.name === p.type);
                          const spec       = p.specs?.[0]?.spec || "";
                          const isSelected = detectedClass === p.type && detectedSpec === spec;
                          return (
                            <button key={p.id} onClick={() => { setDetectedClass(p.type); setDetectedSpec(spec); }}
                              style={{
                                display: "flex", alignItems: "center", gap: 12,
                                padding: "12px 14px", borderRadius: 10, cursor: "pointer", textAlign: "left",
                                background: isSelected ? `${T.gold}12` : T.bg,
                                border: `1.5px solid ${isSelected ? T.gold : T.border}`,
                                transition: "all 0.15s", WebkitTapHighlightColor: "transparent",
                              }}>
                              {pClassData && <ClassIcon name={pClassData.name} color={pClassData.color} size={28} />}
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <p style={{ color: isSelected ? T.goldBright : T.text, fontSize: 14, fontWeight: 600, margin: 0 }}>{p.name}</p>
                                <p style={{ color: T.textSub, fontSize: 12, margin: "2px 0 0" }}>
                                  {spec ? `${spec} ` : ""}{p.type}
                                  <span style={{ color: T.textDim, marginLeft: 6 }}>
                                    {p.role === "tank" ? "· Tank" : p.role === "healer" ? "· Healer" : "· DPS"}
                                  </span>
                                </p>
                              </div>
                              {isSelected && <CheckCircle2 size={18} color={T.gold} />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Proceed once a player is selected */}
                  {wclData && !wclData.placeholder && detectedClass && detectedSpec && (
                    <button style={{ ...S.primaryBtn, width: "100%", marginTop: 14 }} onClick={sendInitial}>
                      Analyse as {detectedSpec} {detectedClass} →
                    </button>
                  )}

                  {/* Placeholder: WCL API keys not configured */}
                  {wclData?.placeholder && (
                    <div style={{ marginTop: 12, padding: "12px 14px", background: `${T.gold}0d`, border: `1px solid ${T.gold}30`, borderRadius: 8, display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <AlertCircle size={16} color={T.gold} style={{ flexShrink: 0, marginTop: 1 }} />
                      <div>
                        <p style={{ color: T.gold, fontSize: 13, fontWeight: 600, margin: "0 0 4px" }}>Log loaded — no fight data available</p>
                        <p style={{ color: T.textSub, fontSize: 13, margin: "0 0 10px", lineHeight: 1.5 }}>Vaultwright will give spec advice without performance analysis. Full fight data requires Warcraft Logs API credentials to be configured.</p>
                        <button style={{ ...S.ghostBtn, padding: "8px 16px", fontSize: 13 }} onClick={sendInitial}>Continue anyway →</button>
                      </div>
                    </div>
                  )}

                  {/* Real log but no players (private log) */}
                  {wclData && !wclData.placeholder && !(wclData.report?.players?.length > 0) && (
                    <div style={{ marginTop: 12, padding: "12px 14px", background: `${T.gold}0d`, border: `1px solid ${T.gold}30`, borderRadius: 8, display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <AlertCircle size={16} color={T.gold} style={{ flexShrink: 0, marginTop: 1 }} />
                      <div>
                        <p style={{ color: T.gold, fontSize: 13, fontWeight: 600, margin: "0 0 4px" }}>Log loaded — no player list found</p>
                        <p style={{ color: T.textSub, fontSize: 13, margin: "0 0 10px", lineHeight: 1.5 }}>This log may be private or missing player details. Try adding <code style={{ color: T.gold }}>#source=N</code> to the URL to pin your character.</p>
                        <button style={{ ...S.ghostBtn, padding: "8px 16px", fontSize: 13 }} onClick={sendInitial}>Continue without player data →</button>
                      </div>
                    </div>
                  )}

                  {/* Pre-load skip */}
                  {!wclData && (
                    <div style={{ marginTop: 12, display: "flex", justifyContent: "flex-end" }}>
                      <button style={S.ghostBtn} onClick={sendInitial}>Skip — general advice only</button>
                    </div>
                  )}
                </>
              )}

              {/* SimC */}
              {inputMode === "simc" && (
                <>
                  <span style={S.label}>SimC String</span>
                  <p style={{ color: T.textSub, fontSize: 14, marginBottom: 4, lineHeight: 1.5, marginTop: 0 }}>
                    In-game type <code style={{ background: "#21262d", color: T.gold, padding: "2px 7px", borderRadius: 4, fontSize: 13 }}>/simc</code> and copy everything from the window.
                  </p>
                  <p style={{ color: T.textDim, fontSize: 13, marginBottom: 14, fontStyle: "italic" }}>No addon? Get SimulationCraft free from CurseForge or Wago.io.</p>
                  <textarea style={{ ...S.textarea, minHeight: 140 }}
                    placeholder={"# SimC Addon\nwarrior=\"Yourname\"\nlevel=90\nspec=fury\nhead=,id=123456,..."}
                    value={simcString} onChange={e => setSimcString(e.target.value)} />
                  {simcString.length > 80 && !simcParsed && (
                    <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8 }}>
                      <AlertCircle size={14} color={T.red} />
                      <p style={{ color: T.red, fontSize: 13, margin: 0 }}>No gear detected — paste the full /simc output.</p>
                    </div>
                  )}
                  {simcParsed && (
                    <>
                      <div style={{ marginTop: 12, padding: "10px 14px", background: `${T.green}12`, border: `1px solid ${T.green}40`, borderRadius: 8, display: "flex", alignItems: "center", gap: 10 }}>
                        <CheckCircle2 size={16} color={T.green} />
                        {classData && <ClassIcon name={classData.name} color={classData.color} size={26} />}
                        <span style={{ color: T.green, fontSize: 14, fontWeight: 600 }}>
                          {simcParsed.parsedSpec} {simcParsed.parsedClass} · {simcParsed.filled} items{simcParsed.avgIlvl ? ` · avg ${simcParsed.avgIlvl}` : ""}
                        </span>
                      </div>
                      <GearPreviewGrid gear={simcParsed.gear} />
                      <div style={{ marginTop: 16 }}>
                        <button style={{ ...S.primaryBtn, width: "100%" }} onClick={sendInitial}>Find My Problem →</button>
                      </div>
                    </>
                  )}
                  {!simcParsed && (
                    <div style={{ marginTop: 12, display: "flex", justifyContent: "flex-end" }}>
                      <button style={S.ghostBtn} onClick={sendInitial}>Skip — general advice</button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* ══ Step 2: Oracle ══ */}
          {step === 2 && (
            <div className="fu">
              {/* Session bar */}
              <div style={{ ...S.card, padding: "14px 18px", marginBottom: 12, borderRadius: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    {classData && <ClassIcon name={classData.name} color={classData.color} size={30} />}
                    <div>
                      <p style={{ color: T.text, fontSize: 14, margin: 0, fontWeight: 600 }}>{activeSpec || "—"} {activeClass || "—"}</p>
                      <p style={{ color: T.textSub, fontSize: 12, margin: "2px 0 0" }}>
                        {inputMode === "rio" ? "Raider.IO" : inputMode === "wcl" ? "Warcraft Logs" : "SimC"} · {contentFocus || "All content"}
                      </p>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                    <button style={S.ghostBtn} onClick={reset}>New Session</button>
                    <span style={{ fontSize: 10, color: dailyCount >= 4 ? T.red : T.textDim, fontFamily: "'Cinzel', serif", letterSpacing: 1 }}>
                      {dailyCount}/5 TODAY
                    </span>
                  </div>
                </div>
                {benchmarkNote && (
                  <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 12 }}>📊</span>
                    <p style={{ color: T.textSub, fontSize: 12, margin: 0, lineHeight: 1.4 }}>{benchmarkNote}</p>
                  </div>
                )}
                {knowledgeUpdates.length > 0 && (
                  <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${T.border}`, display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ fontSize: 13, flexShrink: 0 }}>🔄</span>
                    <div style={{ flex: 1 }}>
                      <p style={{ color: T.purple, fontSize: 11, fontFamily: "'Cinzel', serif", letterSpacing: 1, margin: "0 0 4px", fontWeight: 700 }}>KNOWLEDGE UPDATED</p>
                      <p style={{ color: T.textSub, fontSize: 12, margin: 0, lineHeight: 1.4 }}>
                        Vaultwright found {knowledgeUpdates.length} newer recommendation{knowledgeUpdates.length > 1 ? "s" : ""} for {activeSpec} via live search — flagged for review.{" "}
                        {knowledgeUpdates.map((u, i) => (
                          <span key={i} style={{ color: T.textDim, fontSize: 11 }}>
                            {u.field}{i < knowledgeUpdates.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </p>
                    </div>
                    <button onClick={() => setKnowledgeUpdates([])} style={{ background: "none", border: "none", color: T.textDim, cursor: "pointer", fontSize: 16, padding: "0 2px", lineHeight: 1 }}>×</button>
                  </div>
                )}
              </div>

              {/* Tabs */}
              <div role="tablist" aria-label="Oracle modes" style={{ display: "flex", gap: 6, marginBottom: 12, overflowX: "auto" }}>
                <OracleTab label="The Problem" icon={Sword}    active={oracleMode==="problem"}  onClick={() => setOracleMode("problem")} />
                <OracleTab label="Vault"       icon={Trophy}   active={oracleMode==="vault"}    onClick={() => setOracleMode("vault")} />
                <OracleTab label="Weekly"      icon={Calendar} active={oracleMode==="weekly"}   onClick={() => setOracleMode("weekly")} />
                <OracleTab label="Compare"     icon={BarChart3} active={oracleMode==="compare"} onClick={() => setOracleMode("compare")} />
              </div>

              {/* Problem tab */}
              {oracleMode === "problem" && (
                <div style={S.card}>
                  {chatHistory.length === 0 && !loading && (
                    <AnalysisEmptyState specName={activeSpec} className={activeClass} onRun={sendInitial} loading={loading} />
                  )}
                  {loading && chatHistory.length <= 1 && (
                    <div style={{ padding: "8px 0" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                        <span style={{ fontSize: 16, animation: "runespin 2s linear infinite", display: "inline-block" }}>᛫</span>
                        <p style={{ color: T.gold, fontSize: 12, fontFamily: "'Cinzel', serif", letterSpacing: 1.5, margin: 0, fontWeight: 700 }}>
                          DIAGNOSING YOUR {((activeSpec || "") + " " + (activeClass || "")).trim().toUpperCase() || "CHARACTER"}…
                        </p>
                      </div>
                      <SkeletonBlock lines={8} />
                    </div>
                  )}
                  {chatHistory.length > 0 && (
                    <>
                      {chatHistory.map((msg, i) => (
                        <div key={i} style={S.chatMsg(msg.role)}>
                          <p style={{ fontSize: 11, fontFamily: "'Cinzel', serif", letterSpacing: 1.5, marginBottom: 8, color: msg.role === "user" ? T.gold : T.textDim, fontWeight: 700 }}>
                            {msg.role === "user" ? "YOU" : "VAULTWRIGHT"}
                          </p>
                          {msg.role === "user"
                            ? <p style={{ color: T.textSub, fontSize: 14, margin: 0 }}>{msg.display || msg.content}</p>
                            : msg.content.startsWith("Error:") ? (
                              <div>
                                <p style={{ color: T.red, fontSize: 14, margin: "0 0 10px" }}>{msg.content}</p>
                                <div style={{ display: "flex", gap: 8 }}>
                                  <button style={{ ...S.ghostBtn, fontSize: 13, padding: "8px 16px", minHeight: 36, color: T.gold, borderColor: T.gold }}
                                    onClick={msg.display === "Gear Analysis" || i === 1 ? sendInitial : sendFollowUp}>Try again</button>
                                  <button style={{ ...S.ghostBtn, fontSize: 13, padding: "8px 16px", minHeight: 36 }} onClick={reset}>Start over</button>
                                </div>
                              </div>
                            ) : <ResponseBlock content={msg.content} showCopy={i > 0} spec={activeSpec} cls={activeClass} />}
                        </div>
                      ))}
                      {loading && (
                        <div style={S.chatMsg("assistant")}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                            <span style={{ fontSize: 14, animation: "runespin 2s linear infinite", display: "inline-block", color: T.gold }}>᛫</span>
                            <p style={{ fontSize: 11, fontFamily: "'Cinzel', serif", letterSpacing: 1.5, margin: 0, color: T.gold, fontWeight: 700 }}>VAULTWRIGHT IS THINKING…</p>
                          </div>
                          <SkeletonBlock lines={5} />
                        </div>
                      )}
                      <div ref={chatEndRef} />
                    </>
                  )}
                  {chatHistory.length > 0 && !loading && (
                    <div style={{ marginTop: 14, borderTop: `1px solid ${T.border}`, paddingTop: 14 }}>
                      <div style={{ display: "flex", gap: 8 }}>
                        <input ref={followUpRef} style={{ ...S.input, flex: 1 }} placeholder={`Ask a follow-up…  ${/Mac|iPhone|iPad/.test(navigator.platform) ? "⌘K" : "Ctrl+K"}`}
                          value={followUp} onChange={e => setFollowUp(e.target.value)}
                          onKeyDown={e => e.key === "Enter" && sendFollowUp()} />
                        <button style={{ ...S.primaryBtn, padding: "12px 18px", flexShrink: 0, opacity: followUp.trim() ? 1 : 0.45 }} onClick={sendFollowUp} disabled={!followUp.trim()}>Ask</button>
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
                        {["Is my ilvl actually the problem?", "What's my next power spike?", "Am I missing something obvious?", "Why am I lower than the top players in my guild?"].map(q => (
                          <button key={q} style={{ ...S.tag(false), fontSize: 12, padding: "9px 14px", borderRadius: 20 }} onClick={() => setFollowUp(q)}>{q}</button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Vault tab */}
              {oracleMode === "vault" && (
                <div style={S.card}>
                  {!chatHistory.some(m => m.display?.includes("Vault")) && <VaultEmptyState />}
                  {[["Dungeon Slots", [0,1,2]], ["Raid Slots", [3,4,5]], ["World Activity Slots", [6,7,8]]].map(([label, indices]) => (
                    <div key={label}>
                      <p style={{ ...S.label, margin: "14px 0 8px" }}>{label}</p>
                      {indices.map(i => (
                        <div key={i} style={{ marginBottom: 8 }}>
                          <input style={{ ...S.input, fontSize: 15 }}
                            placeholder={`Slot ${i < 3 ? i+1 : i < 6 ? i-2 : i-5} — e.g. "Cloak of the Voidspire 272"`}
                            value={vaultItems[i]}
                            onChange={e => { const v = [...vaultItems]; v[i] = e.target.value; setVaultItems(v); }} />
                        </div>
                      ))}
                    </div>
                  ))}
                  <button style={{ ...S.primaryBtn, width: "100%", marginTop: 8, opacity: vaultItems.some(v=>v.trim()) && !loading ? 1 : 0.45 }}
                    onClick={sendVaultAnalysis} disabled={!vaultItems.some(v=>v.trim()) || loading}>
                    {loading
                      ? <span style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:8 }}><Loader2 size={16} style={{animation:"spin 1s linear infinite"}} />Analysing...</span>
                      : "Which should I pick?"}
                  </button>
                  {loading && <SkeletonBlock lines={6} />}
                  {chatHistory.map((msg, i) => {
                    if (!msg.display?.includes("Vault") || msg.role !== "user") return null;
                    const resp = chatHistory[i + 1];
                    if (!resp || resp.role !== "assistant") return null;
                    return (
                      <div key={i} style={{ ...S.chatMsg("assistant"), marginTop: 14 }}>
                        <p style={{ fontSize: 11, fontFamily: "'Cinzel', serif", letterSpacing: 1.5, marginBottom: 8, color: T.textDim, fontWeight: 700 }}>VAULTWRIGHT</p>
                        <ResponseBlock content={resp.content} showCopy={true} spec={activeSpec} cls={activeClass} />
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Weekly tab */}
              {oracleMode === "weekly" && (
                <div style={S.card}>
                  {!chatHistory.some(m => m.display === "Weekly Plan") && <WeeklyEmptyState />}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
                    <div>
                      <span style={S.label}>Sparks</span>
                      <select style={{ ...S.input, fontSize: 15 }} value={sparksAvailable} onChange={e => setSparksAvailable(e.target.value)}>
                        {["0","1","2","3","4","5+"].map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>
                    <div>
                      <span style={S.label}>Hero Crests</span>
                      <input style={{ ...S.input, fontSize: 15 }} type="number" min="0" max="100" placeholder="0–100" value={heroCrestsAvail} onChange={e => { const v = e.target.value; if (v === "" || (/^\d+$/.test(v) && parseInt(v) <= 100)) setHeroCrestsAvail(v); }} />
                    </div>
                    <div>
                      <span style={S.label}>Myth Crests</span>
                      <input style={{ ...S.input, fontSize: 15 }} type="number" min="0" max="100" placeholder="0–100" value={mythCrestsAvail} onChange={e => { const v = e.target.value; if (v === "" || (/^\d+$/.test(v) && parseInt(v) <= 100)) setMythCrestsAvail(v); }} />
                    </div>
                  </div>
                  <button style={{ ...S.primaryBtn, width: "100%", opacity: loading ? 0.45 : 1 }} onClick={sendWeeklyPlan} disabled={loading}>
                    {loading
                      ? <span style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:8 }}><Loader2 size={16} style={{animation:"spin 1s linear infinite"}} />Building plan...</span>
                      : "Build My Weekly Plan"}
                  </button>
                  {loading && <SkeletonBlock lines={10} />}
                  {chatHistory.map((msg, i) => {
                    if (msg.display !== "Weekly Plan" || msg.role !== "user") return null;
                    const resp = chatHistory[i + 1];
                    if (!resp || resp.role !== "assistant") return null;
                    return (
                      <div key={i} style={{ ...S.chatMsg("assistant"), marginTop: 14 }}>
                        <p style={{ fontSize: 11, fontFamily: "'Cinzel', serif", letterSpacing: 1.5, marginBottom: 8, color: T.textDim, fontWeight: 700 }}>VAULTWRIGHT — WEEK PLAN</p>
                        <ResponseBlock content={resp.content} showCopy={true} spec={activeSpec} cls={activeClass} />
                      </div>
                    );
                  })}
                </div>
              )}
              {/* Compare tab */}
              {oracleMode === "compare" && (
                <div style={S.card}>
                  <p style={{ color: T.text, fontSize: 15, fontWeight: 600, margin: "0 0 6px" }}>Compare to a friend</p>
                  <p style={{ color: T.textSub, fontSize: 13, margin: "0 0 12px", lineHeight: 1.5 }}>
                    Paste their Raider.IO URL and Vaultwright will show you exactly where the gap is — gear, stats, or something else.
                  </p>
                  {!chatHistory.some(m => m.display?.startsWith("Compare")) && (
                    <div style={{ background: T.bg, border: `1px solid ${T.border}`, borderRadius: 10, padding: "12px 14px", marginBottom: 14 }}>
                      <p style={{ color: T.textDim, fontSize: 11, fontFamily: "'Cinzel', serif", letterSpacing: 1, margin: "0 0 8px", fontWeight: 700 }}>EXAMPLE OUTPUT</p>
                      <p style={{ color: T.textSub, fontSize: 13, margin: "0 0 6px", lineHeight: 1.5 }}>
                        <strong style={{ color: T.text }}>The Gap:</strong> Your friend is 8 ilvls ahead in weapon (285 vs 272) and has Arcane Mastery on both rings. That's roughly 4% damage.
                      </p>
                      <p style={{ color: T.textSub, fontSize: 13, margin: "0 0 6px", lineHeight: 1.5 }}>
                        <strong style={{ color: T.text }}>What To Focus On:</strong> Your weapon is the single biggest lever. Two more M+ clears gets you a vault shot at 278+.
                      </p>
                      <p style={{ color: T.textSub, fontSize: 13, margin: 0, lineHeight: 1.5 }}>
                        <strong style={{ color: T.text }}>Already Fine:</strong> Your embellishments and tier set are actually better than theirs.
                      </p>
                    </div>
                  )}
                  <input style={S.input} placeholder="raider.io/characters/us/realm/friend"
                    value={friendUrl} onChange={e => setFriendUrl(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && sendCompare()} />
                  {friendError && (
                    <p style={{ color: T.red, fontSize: 13, margin: "8px 0 0" }}>{friendError}</p>
                  )}
                  {friendData && (
                    <div style={{ marginTop: 10, padding: "10px 14px", background: T.bg, borderRadius: 8, border: `1px solid ${T.border}` }}>
                      <p style={{ color: T.textSub, fontSize: 13, margin: 0 }}>
                        Comparing against <strong style={{ color: T.text }}>{friendData.name}</strong> — {friendData.spec} {friendData.cls}, avg {friendData.avg} ilvl
                      </p>
                    </div>
                  )}
                  {friendLoading && !loading && (
                    <div style={{ marginTop: 10, padding: "10px 14px", background: T.surfaceHi, borderRadius: 8, display: "flex", alignItems: "center", gap: 10 }}>
                      <Loader2 size={14} color={T.textSub} style={{ animation: "spin 1s linear infinite", flexShrink: 0 }} />
                      <span style={{ color: T.textSub, fontSize: 13 }}>Looking up character…</span>
                    </div>
                  )}
                  <button style={{ ...S.primaryBtn, width: "100%", marginTop: 12, opacity: (friendLoading || loading || !friendUrl.trim()) ? 0.45 : 1 }}
                    onClick={sendCompare} disabled={friendLoading || loading || !friendUrl.trim()}>
                    {loading
                      ? <span style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:8 }}><Loader2 size={16} style={{animation:"spin 1s linear infinite"}} />Analysing…</span>
                      : "Show Me the Gap"}
                  </button>
                  {chatHistory.map((msg, i) => {
                    if (!msg.display?.startsWith("Compare") || msg.role !== "user") return null;
                    const resp = chatHistory[i + 1];
                    if (!resp || resp.role !== "assistant") return null;
                    return (
                      <div key={i} style={{ ...S.chatMsg("assistant"), marginTop: 14 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                          <p style={{ fontSize: 11, fontFamily: "'Cinzel', serif", letterSpacing: 1.5, margin: 0, color: T.textDim, fontWeight: 700 }}>VAULTWRIGHT — COMPARISON</p>
                          <ShareButton text={resp.content} label={`${activeSpec} ${activeClass} vs ${friendData?.name || "friend"}`} />
                        </div>
                        <ResponseBlock content={resp.content} showCopy={true} spec={activeSpec} cls={activeClass} />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Footer */}
          <div style={{ textAlign: "center", marginTop: 32, paddingBottom: 16 }}>
            <p style={{ color: T.textDim, fontSize: 10, fontFamily: "'Cinzel', serif", letterSpacing: 1.5, margin: "0 0 4px" }}>
              KNOWLEDGE BASE · {KNOWLEDGE_VERSION} · Updated {KNOWLEDGE_DATE}
            </p>
            <p style={{ color: T.textDim, fontSize: 10, margin: 0, letterSpacing: 1 }}>
              Spec data sourced from Icy Veins & Method.gg · Not affiliated with Blizzard Entertainment
            </p>
          </div>

        </div>
      </div>
    </ErrorBoundary>
  );
}
