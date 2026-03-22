// ═══════════════════════════════════════════════════════════════
// APEX — WoW Midnight Gear Advisor  |  "Know your next move."
// ═══════════════════════════════════════════════════════════════

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Link2, FileText, ChevronLeft, Sword, Trophy, Calendar,
  Loader2, AlertCircle, CheckCircle2, BarChart3,
} from "lucide-react";

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

const REGIONS = ["us", "eu", "kr", "tw"];

const CONTENT_TYPES = [
  "Mythic+ Dungeons", "Raid (Normal/Heroic)", "Raid (Mythic)",
  "Bountiful Delves", "Prey (Hard/Nightmare)", "PvP", "World Content",
];

const PRIORITIES = [
  "Maximize DPS", "Maximize Survivability", "Balance Both", "Support/Utility",
];

const STEPS = ["Input Method", "Your Gear", "Configure", "Oracle"];

// ── Design tokens ────────────────────────────────────────────────
const T = {
  bg:       "#0d1117",
  surface:  "#161b22",
  surfaceHi:"#1c2128",
  border:   "#30363d",
  borderHi: "#f0b429",
  gold:     "#f0b429",
  goldDim:  "#9a7420",
  text:     "#e6edf3",
  textSub:  "#8b949e",
  textDim:  "#484f58",
  green:    "#3fb950",
  red:      "#f85149",
  purple:   "#bc8cff",
};

const S = {
  app: { minHeight: "100vh", background: T.bg, backgroundImage: "radial-gradient(ellipse at 50% 0%, rgba(240,180,41,0.04) 0%, transparent 60%)", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", color: T.text, padding: "16px 16px 100px" },
  wrap: { maxWidth: 680, margin: "0 auto" },
  card: { background: T.surface, border: `1px solid ${T.border}`, borderRadius: 12, padding: "20px 18px", boxShadow: "0 4px 24px rgba(0,0,0,0.4)" },
  label: { fontFamily: "'Cinzel', serif", color: T.gold, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8, display: "block", fontWeight: 600 },
  input: { background: "#0d1117", border: `1px solid ${T.border}`, borderRadius: 8, color: T.text, fontSize: 16, padding: "12px 14px", fontFamily: "inherit", outline: "none", width: "100%", boxSizing: "border-box", transition: "border-color 0.15s", WebkitAppearance: "none" },
  textarea: { background: "#0d1117", border: `1px solid ${T.border}`, borderRadius: 8, color: T.text, fontSize: 13, padding: "12px 14px", fontFamily: "monospace", outline: "none", width: "100%", boxSizing: "border-box", resize: "vertical", lineHeight: 1.6 },
  primaryBtn: { background: T.gold, border: "none", borderRadius: 10, padding: "14px 28px", cursor: "pointer", color: "#0d1117", fontFamily: "'Cinzel', serif", fontSize: 13, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", transition: "opacity 0.15s, transform 0.1s", WebkitTapHighlightColor: "transparent", minHeight: 48 },
  ghostBtn: { background: "transparent", border: `1px solid ${T.border}`, borderRadius: 10, color: T.textSub, cursor: "pointer", fontSize: 14, padding: "12px 18px", fontFamily: "inherit", minHeight: 44, WebkitTapHighlightColor: "transparent" },
  backBtn: { background: "none", border: "none", color: T.textSub, cursor: "pointer", fontSize: 14, padding: "0 0 18px 0", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6, WebkitTapHighlightColor: "transparent" },
  tag: sel => ({ background: sel ? `${T.gold}20` : "transparent", border: `1px solid ${sel ? T.gold : T.border}`, borderRadius: 20, padding: "10px 16px", cursor: "pointer", color: sel ? T.gold : T.textSub, fontSize: 14, fontFamily: "inherit", transition: "all 0.15s", minHeight: 44, WebkitTapHighlightColor: "transparent" }),
  chatMsg: role => ({ marginBottom: 12, padding: "14px 16px", borderRadius: 10, background: role === "user" ? `${T.gold}0d` : T.surface, border: `1px solid ${role === "user" ? `${T.gold}30` : T.border}`, borderLeft: `3px solid ${role === "user" ? T.gold : T.purple}` }),
};


// ── Realm list ───────────────────────────────────────────────────
const WOW_REALMS = {
  us: [
    "Aegwynn","Aerie Peak","Agamaggan","Aggramar","Alexstrasza","Alleria","Altar of Storms",
    "Alterac Mountains","Aman'Thul","Anetheron","Antonidas","Anub'arak","Anvilmar","Arathor",
    "Archimonde","Area 52","Argent Dawn","Arygos","Azgalor","Azjol-Nerub","Azralon","Azuremyst",
    "Baelgun","Barthilas","Black Dragonflight","Blackhand","Blackrock","Blackwater Raiders",
    "Blackwing Lair","Bladefist","Blade's Edge","Bleeding Hollow","Blood Furnace","Bloodhoof",
    "Bloodscalp","Bonechewer","Borean Tundra","Boulderfist","Bronzebeard","Burning Blade",
    "Burning Legion","Caelestrasz","Cairne","Cenarion Circle","Cenarion Expedition","Cenarius",
    "Cho'gall","Chromaggus","Coilfang","Crushridge","Daggerspine","Dalaran","Dalvengyr",
    "Dark Iron","Darkspear","Darrowmere","Dath'Remar","Dawnbringer","Deathwing","Demon Soul",
    "Dentarg","Destromath","Dethecus","Detheroc","Doomhammer","Draenor","Dragonblight",
    "Dragonmaw","Drak'Tharon","Drak'thul","Draka","Drenden","Dunemaul","Durotan","Duskwood",
    "Earthen Ring","Echo Isles","Eitrigg","Eldre'Thalas","Elune","Emerald Dream","Eonar",
    "Eredar","Executus","Exodar","Farstriders","Feathermoon","Fenris","Firetree","Fizzcrank",
    "Frostmane","Frostmourne","Frostwolf","Galakrond","Garithos","Garona","Garrosh","Ghostlands",
    "Gilneas","Gnomeregan","Goldrinn","Gordunni","Gorefiend","Greymane","Grizzly Hills","Gul'dan",
    "Gundrak","Gurubashi","Hakkar","Haomarush","Hellscream","Hydraxis","Hyjal","Icecrown",
    "Illidan","Jaedenar","Kalecgos","Kargath","Kel'Thuzad","Khadgar","Khaz Modan","Khaz'goroth",
    "Kil'jaeden","Kilrogg","Kirin Tor","Korgath","Korialstrasz","Kul Tiras","Laughing Skull",
    "Legionfall","Lightbringer","Lightning's Blade","Lightninghoof","Llane","Loremaster",
    "Lothar","Madoran","Maelstrom","Magtheridon","Maiev","Mal'Ganis","Malfurion","Malorne",
    "Malygos","Mannoroth","Medivh","Misha","Mok'Nathal","Moon Guard","Moonrunner","Muradin",
    "Nagrand","Nathrezim","Nazgrel","Nazjatar","Nemesis","Ner'zhul","Norgannon","Onyxia",
    "Perenolde","Proudmoore","Quel'dorei","Quel'Thalas","Ravencrest","Ravenholdt","Rexxar",
    "Rivendare","Runetotem","Sargeras","Saurfang","Scarlet Crusade","Sen'jin","Sentinels",
    "Shadow Council","Shadowmoon","Shadowsong","Shattered Hand","Shattered Halls","Silver Hand",
    "Silvermoon","Sisters of Elune","Skullcrusher","Skywall","Smolderthorn","Spinebreaker",
    "Spirestone","Staghelm","Steamwheedle Cartel","Stonemaul","Stormrage","Stormreaver",
    "Stormscale","Suramar","Tanaris","Terenas","Terokkar","Thaurissan","The Forgotten Coast",
    "The Scryers","The Underbog","The Venture Co","Thorium Brotherhood","Thrall","Thunderhorn",
    "Thunderlord","Tichondrius","Tol Barad","Trollbane","Turalyon","Twisting Nether","Tyrande",
    "Uldaman","Uldum","Undermine","Ursin","Uther","Vashj","Vek'nilash","Velen","Whisperwind",
    "Wildhammer","Windrunner","Winterhoof","Wyrmrest Accord","Ysera","Ysondre","Zangarmarsh",
    "Zuluhed",
  ],
  eu: [
    "Aegwynn","Aerie Peak","Agamaggan","Aggramar","Alexstrasza","Alleria","Alonsus","Al'Akir",
    "Ambossar","Anachronos","Anetheron","Antonidas","Anub'arak","Arathor","Archimonde",
    "Area 52","Argent Dawn","Aszune","Auchindoun","Azjol-Nerub","Azuremyst","Baelgun",
    "Balnazzar","Black Dragonflight","Blackhand","Blackmoore","Blackrock","Bladefist",
    "Blade's Edge","Bleeding Hollow","Blood Furnace","Bloodfeather","Bloodhoof","Bloodscalp",
    "Boulderfist","Bronze Dragonflight","Bronzebeard","Burning Blade","Burning Legion",
    "Burning Steppes","Chamber of Aspects","Chromaggus","Crushridge","Daggerspine","Darkmoon Faire",
    "Darksorrow","Darkspear","Dawnbringer","Deathwing","Defias Brotherhood","Dentarg","Der Rat von Dalaran",
    "Die Aldor","Die ewige Wacht","Die Nachtwache","Die silberne Hand","Draenor","Dragonblight",
    "Dragonmaw","Drak'thul","Draka","Dun Modr","Dun Morogh","Dunemaul","Durotan","Earthen Ring",
    "Echo Isles","Eitrigg","Eldre'Thalas","Emerald Dream","Eredar","Executus","Exodar","Festung der Stürme",
    "Fordragon","Frostmane","Frostwhisper","Frostwolf","Ghostlands","Gilneas","Grim Batol",
    "Gul'dan","Hellfire","Hellscream","Howling Fjord","Hyjal","Kael'thas","Kargath","Kel'Thuzad",
    "Khadgar","Khaz Modan","Kil'jaeden","Kilrogg","Kirin Tor","Korgath","Lightbringer","Lightning's Blade",
    "Lordaeron","Los Errantes","Magtheridon","Mal'Ganis","Malfurion","Mazrigos","Medivh","Minahonda",
    "Moonglade","Nagrand","Nathrezim","Nazjatar","Nefarian","Nemesis","Ner'zhul","Nordrassil",
    "Norgannon","Outland","Perenolde","Proudmoore","Quel'Thalas","Ragnaros","Ravencrest","Ravenholdt",
    "Rexxar","Runetotem","Sargeras","Shadowmoon","Shadowsong","Shattered Hand","Shattered Halls",
    "Silvermoon","Skullcrusher","Skywall","Spinebreaker","Sporeggar","Steamwheedle Cartel",
    "Stonemaul","Stormrage","Stormreaver","Stormscale","Sunstrider","Sylvanas","Talnivarr",
    "Tarren Mill","Terenas","Terokkar","The Maelstrom","The Sha'tar","The Venture Co","Thunderhorn",
    "Tichondrius","Tirion","Trollbane","Turalyon","Twilight's Hammer","Twisting Nether","Tyrande",
    "Uldaman","Vashj","Vek'lor","Vek'nilash","Wrathbringer","Xavius","Ysera","Zenedar","Zuluhed",
  ],
  kr: ["Azshara","Burning Legion","Cenarius","Durotan","Executus","Hellscream","Hyjal","Norgannon","Stormrage","Windrunner"],
  tw: ["Arthas","Arygos","Bleeding Hollow","Chillwind Point","Crystalpine Stinger","Demon Fall Canyon","Demon Soul","Dragonmaw","Draka","Frostmane","Hellscream","Icecrown","Light's Hope","Mnightmare","Order of the Cloud Serpent","Shadowmoon","Skywall","Stormrage","Sundown Marsh","Wrathbringer"],
};


// ── Knowledge base ──────────────────────────────────────────────
// Per-spec knowledge injected conditionally into the prompt.
// Only the player's spec is sent — never all 40 at once.

const UNIVERSAL_KNOWLEDGE = `
== MIDNIGHT SEASON 1 — UNIVERSAL RULES ==
GEAR TRACKS: Unranked 207-217 | Adventurer 220-230 | Veteran 233-243 | Champion 246-256 | Hero 259-269 | Myth 272-289 (max)
DAWNCRESTS: 20 per upgrade rank | 100/week cap per type | FREE if slot is below its personal highest-ever ilvl | Spend order: Myth > Hero > Champion > Veteran > Adventurer
SPARKS OF RADIANCE: 1/week (2 week 1) | 2 Sparks most items, 4 Sparks 2H/ranged | Base 259 | +80 Hero crests → 272 | +80 Myth crests → 285 | Thalassian Missive = choose your stats
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

const SPEC_KNOWLEDGE = {
  // ── DEATH KNIGHT ─────────────────────────────────────────────
  "Blood":`SPEC: Blood Death Knight (Tank)
APEX TALENT — Dance of Midnight: While Dancing Rune Weapon is active, parrying has a chance to make your next Heart Strike cost no Runes and deal 150% increased damage. Each DRW active increases your damage by 6% and reduces damage taken by 6%. Consuming a Rune has a chance to summon a DRW for 6 seconds. Rotation anchors around maintaining DRW uptime and spamming Heart Strike during parry windows.
STAT PRIORITY: Strength > Versatility (scales damage reduction from DRW stacking) > Haste (more Rune consumption = more DRW procs) > Mastery (Blood Shield) > Crit
BEST CRAFT: 2H Weapon first (largest single throughput gain). Never craft Chest (Tier slot).
KEY TIPS: Parry chance is critical — prioritize Parry secondary on gear if available. More DRWs active = multiplicative damage reduction. Use Keg-... wait, use Death Strike when below 40% health for emergency mitigation.`,

  "Frost DK":`SPEC: Frost Death Knight (DPS)
APEX TALENT — Chosen of Frostbrood: Frostwyrm's Fury deals 100% increased damage to the first enemy hit and grants 15% Haste for 12 seconds. It extends an active Pillar of Frost by 2 seconds. All Frost damage increased by 10%. After the Frostwyrm leaves you can recall it for a second cast at 50% effectiveness. Rotation revolves around maximising Frostwyrm's Fury hits and Pillar of Frost extensions.
STAT PRIORITY: Strength > Haste (Pillar extension from Frostwyrm — more casts = more extensions) > Crit (Killing Machine procs) > Mastery (Frozen Heart % physical) > Versatility
BEST CRAFT: 2H Weapon (Missive: Haste + Crit). 2H required — do NOT craft 1H.
KEY TIPS: Positioning matters — Frostwyrm's Fury bonus applies to the first enemy hit, so aim it at the priority target. The recall mechanic effectively doubles its value. Time Frostwyrm's Fury to land at the start of Pillar of Frost.`,

  "Unholy":`SPEC: Unholy Death Knight (DPS)
APEX TALENT — Forbidden Knowledge: Army of the Dead transforms Death Coil into Necrotic Coil and Epidemic into Graveyard for 15 seconds, increasing Physical and Shadow damage. Putrefy summons a Lesser Ghoul and grants 3% Mastery for 12 seconds (stacking). Each Magus of the Dead increases Necrotic Coil and Graveyard damage by 8%. Dread Plague has a 20% chance to summon a Lesser Ghoul that applies Putrefy at 60% effectiveness.
STAT PRIORITY: Strength > Mastery (scales Putrefy stacks and Necrotic Coil damage) > Haste (faster GCD = more Army window casts) > Crit > Versatility
BEST CRAFT: 2H Weapon (Missive: Mastery + Haste). Neck second.
KEY TIPS: Army of the Dead is now your primary DPS cooldown, not just a setup tool. Stack Putrefy during Army window for compounding Mastery. Top-performing spec in Midnight — Army + Magus + Apex all lining up is exceptional single-target burst.`,

  // ── DEMON HUNTER ─────────────────────────────────────────────
  "Havoc":`SPEC: Havoc Demon Hunter (DPS)
APEX TALENT: The Hunt empowers your next Eye Beam, increasing damage by 100% and affecting enemies in a wider area. The Hunt gains 15 seconds reduced cooldown, deals 15% more damage, and its DoT applies to 2 additional enemies. Blade Dance damage increased by 20%. Fully channeling Eye Beam causes your next Blade Dance to refresh its own cooldown. Core loop: The Hunt → Eye Beam (full channel) → Blade Dance (refreshed) → repeat.
STAT PRIORITY: Agility > Haste (shorter Eye Beam CD, more Hunt windows) > Versatility (flat multiplier during burst) > Crit (Chaos Strike Fury generation) > Mastery
BEST CRAFT: Glaive weapon (Missive: Haste + Versatility). Belt second.
KEY TIPS: Always fully channel Eye Beam — the Blade Dance reset only triggers on full channel. The Hunt → Eye Beam → Blade Dance is a strict priority chain, not optional. One of the easiest rotations in Midnight.`,

  "Vengeance":`SPEC: Vengeance Demon Hunter (Tank)
APEX TALENT — Untethered Rage: Soul Cleave and Spirit Bomb have a chance per Soul Fragment consumed to grant Untethered Rage, allowing Metamorphosis to be cast without its cooldown for 10 seconds. Can consume an extra fragment per cast for +5% damage per fragment. Non-procs build Seething Anger stacks (+1% Agility each, increases Untethered Rage chance).
STAT PRIORITY: Agility > Versatility (damage reduction + scales Metamorphosis uptime value) > Haste (more Soul Fragment generation via Shear) > Mastery (Fel Blood armor) > Crit
BEST CRAFT: Ring or Neck (non-Tier slots). Missive: Versatility + Haste.
KEY TIPS: Maximise Soul Fragment consumption to fish for Untethered Rage procs. More fragments per cast = higher proc chance. Seething Anger is a reliable floor when procs are cold. Avoid crafting Shoulders or Chest (Tier).`,

  "Devourer":`SPEC: Devourer Demon Hunter (NEW — DPS, mid-range like Evoker)
APEX TALENT — Midnight: Collapsing Star always critically strikes. All Cosmic damage increased by 3% (x2 points). Collapsing Star critical strike damage increased by 50% of your critical strike chance. Entering Void Metamorphosis spawns 5 Soul Fragments and grants an immediate Collapsing Star cast.
STAT PRIORITY: Agility > Mastery (scales Cosmic damage amplified by the guaranteed crit) > Haste (shorter Void Metamorphosis windows, more Collapsing Star casts) > Versatility > Crit (Collapsing Star always crits — raw Crit is lower value than usual)
BEST CRAFT: Neck or Weapon (Missive: Mastery + Haste). Strong 4-set — do not craft Tier slots early.
KEY TIPS: Because Collapsing Star always crits, you can largely ignore Crit on gear and instead stack Mastery, which directly amplifies that guaranteed crit damage. Position at 25-35 yards (mid-range spec). One of the most beginner-friendly rotations in the game.`,

  // ── DRUID ─────────────────────────────────────────────────────
  "Balance":`SPEC: Balance Druid (DPS)
APEX TALENT: Activating an Eclipse makes your next Wrath or Starfire instant. The first 3 Starsurges or Starfalls you cast during each Eclipse deal 20% increased damage. Critical strikes during an Eclipse cause victims to languish for 12% additional damage dealt over 6 seconds. Activating an Eclipse launches Solar or Lunar Bolts at enemies within 40 yards that always critically strike — Solar Bolt deals Nature damage, Lunar Bolt deals Arcane damage to multiple enemies.
STAT PRIORITY: Intellect > Haste (more Eclipse activations, faster cast speed) > Crit (Eclipse Bolt procs and languish application) > Mastery (Starlight — % Arcane/Nature bonus) > Versatility
BEST CRAFT: Staff or offhand weapon (Missive: Haste + Crit). Never craft Chest or Shoulders (Tier).
KEY TIPS: You now control your moon phases in Midnight, making Eclipse timing predictable. Pool Starsurge/Starfall charges to spend 3 quickly at each Eclipse activation. The Bolt launches on activation — always activate Eclipse in melee range of your priority target for the guaranteed-crit bolts.`,

  "Feral":`SPEC: Feral Druid (DPS)
APEX TALENT — Unseen Attack: Ferocious Bite has a 15% chance per combo point spent to teleport to an enemy within 30 yards and deal an Unseen Slash (58.4% AP Physical + bleed over 6s) or Unseen Swipe (112.2% AP Physical AoE). Unseen Attacks increase your damage by 8% for 5 seconds (stacking extensions). Tiger's Fury causes an Unseen Attack after your next 2 combo point generators. Rip and Unseen Attack damage increased by 30%.
STAT PRIORITY: Agility > Crit (more CP from Ferocious Bite crits AND higher Unseen proc chance) > Haste (faster energy = more Bites = more Unseen procs) > Mastery (Razor Claws % physical) > Versatility
BEST CRAFT: Agility weapon (Missive: Crit + Haste). Neck second.
KEY TIPS: The random teleport mechanic makes Unseen Attacks great for M+ — it can hit priority targets across the pack. Stack the 8% buff via Tiger's Fury setup before spending combo points. Rip remains mandatory for the 30% Unseen Attack damage bonus.`,

  "Guardian":`SPEC: Guardian Druid (Tank)
APEX TALENT — Wild Guardian: After Berserk or Incarnation ends, your next 2 casts of Ironfur, Maul, and Frenzied Regeneration are echoed at 50% effectiveness. Mastery increased by 3%. Maul is always empowered and deals 20% additional Nature damage over 12 seconds. On Wild Guardian activation, gain 2 Dream Guide charges — Wild Guardian echoes are now cast at 150% effectiveness and repeat twice more over 8 seconds.
STAT PRIORITY: Agility > Versatility (damage reduction) > Mastery (Ursoc's Endurance — bonus Armor, amplified by 3% passive from Apex) > Haste (more Maul/Thrash casts) > Crit
BEST CRAFT: Cloak (non-Tier). Missive: Versatility + Mastery.
KEY TIPS: Timing Berserk into high-damage phases is now even more important — Wild Guardian echoes are strongest immediately after Berserk ends. The empowered Maul with Nature DoT provides meaningful threat and damage. Save Dream Guide charges for when you need emergency Frenzied Regeneration echoes.`,

  "Restoration Druid":`SPEC: Restoration Druid (Healer)
APEX TALENT — Lifebloom Ascendance: Lifebloom stacks every 5 seconds, up to 3 times. 15% of Lifebloom's healing splashes to 2 allies within 30 yards. When you consume Soul of the Forest, Lifebloom bursts into a Blooming Frenzy, blooming 5 times in rapid succession.
STAT PRIORITY: Intellect > Mastery (Harmony — % bonus to direct heals on targets with active HoTs, stacked Lifebloom multiplies this) > Haste (faster HoT ticks, shorter Lifebloom cycle) > Versatility > Crit
BEST CRAFT: Staff (Missive: Mastery + Haste). Bracers or Belt second.
KEY TIPS: Keep Lifebloom stacked to 3 on your most dangerous target at all times — the splash to 2 allies effectively triples its healing output. Time Soul of the Forest consumption with a Lifebloom stack 3 for maximum Blooming Frenzy value.`,

  // ── EVOKER ────────────────────────────────────────────────────
  "Devastation":`SPEC: Devastation Evoker (DPS, mid-range 25-35 yards)
APEX TALENT — Rising Fury: While Dragonrage is active, gain Rising Fury every 6 seconds (+4% Haste per stack, max 5 stacks). At 5 stacks, all damage increased by 15%. When Dragonrage ends, gain Risen Fury for 4 seconds per stack accumulated — Risen Fury grants the stacked Haste and damage bonuses and generates Essence Burst every 4 seconds.
STAT PRIORITY: Intellect > Haste (faster Rising Fury stacking, shorter Dragonrage CD) > Crit (Pyre Essence generation) > Mastery (Giantkiller — % Empower spell bonus) > Versatility
BEST CRAFT: Weapon (Missive: Haste + Crit). Never craft Chest (Tier).
KEY TIPS: Dragonrage lasts 18 seconds — you can reach 3 Rising Fury stacks within it. The Risen Fury window after Dragonrage ends is critical; dump Essence Burst procs aggressively. Position matters: stay at 25-35 yards.`,

  "Preservation":`SPEC: Preservation Evoker (Healer, mid-range)
APEX TALENT — Merithra's Blessing: Essence abilities have a chance to upgrade your next Reversion into Merithra's Blessing, healing the target and up to 5 nearby allies for 250% of Spell Power. Reversion passively protects allies, reversing 1% of all damage taken and healing them. Dream Breath instant healing increased by 125%, and Dream Breath always grants Merithra's Blessing.
STAT PRIORITY: Intellect > Mastery (Golden Hour — HoT healing bonus, amplified by Merithra's burst) > Haste (more Essence ability casts = more Merithra's Blessing chances) > Versatility > Crit
BEST CRAFT: Staff (Missive: Mastery + Haste). Bracers second.
KEY TIPS: The 1% damage reversal passive is meaningful in heavy AoE damage scenarios — coordinate with your co-healer to ensure you're the one on the low-health target cluster when Merithra's procs. Dream Breath is now your highest-priority heal.`,

  "Augmentation":`SPEC: Augmentation Evoker (Support DPS, mid-range)
APEX TALENT — Future Duplicate: Breath of Eons summons a duplicate of you from the future to assist for 20 seconds, casting Eruption, Fire Breath, and Upheaval. Each time you extend Ebon Might, your duplicate is also extended by 50% of the extension duration. While the duplicate is active, Ebon Might grants 100% additional stats, and Upheaval and Eruption deal 25% increased damage.
STAT PRIORITY: Intellect > Haste (more Ebon Might extensions = longer duplicate, faster Essence generation) > Mastery (Timewalker — stats shared to allies scales with Mastery %) > Crit > Versatility
BEST CRAFT: Neck or Weapon (Missive: Haste + Mastery). Coordinate Breath of Eons timing with your group's burst cooldowns.
KEY TIPS: The duplicate is effectively a 20-second damage increase for your entire group. Maximise Ebon Might extension frequency during the duplicate window — each extension gives your duplicate extra time. Haste above all other secondaries.`,

  // ── HUNTER ────────────────────────────────────────────────────
  "Beast Mastery":`SPEC: Beast Mastery Hunter (DPS)
APEX TALENT — Animal Companion: Bestial Wrath summons an Animal Companion from your Stable to fight alongside you for 15 seconds. Pet damage increased by 5%. Bestial Wrath strikes 2 additional targets. Barbed Shot and Cobra Shot damage increased by 15%. Barbed Shot, Cobra Shot, and Black Arrow each increase the damage of your next Kill Command by 30%.
STAT PRIORITY: Agility > Haste (shorter Kill Command CD, faster Barbed Shot refresh) > Crit > Mastery (Master of Beasts — % pet damage, scales Animal Companion) > Versatility
BEST CRAFT: Back piece (cloak — not a Tier slot). Ranged weapon second (4 Sparks, Missive: Haste + Crit).
KEY TIPS: The Animal Companion from Bestial Wrath is a meaningful DPS increase — keep BW on cooldown. Stack Kill Command damage buffs from Barbed Shot, Cobra Shot, and Black Arrow before casting Kill Command.`,

  "Marksmanship":`SPEC: Marksmanship Hunter (DPS)
APEX TALENT — Precision: Rapid Fire damage increased by 25% and each shot reduces the Aimed Shot cooldown by 0.5 seconds. Aimed Shot critical strike damage increased by 25% of your critical strike chance. All other ranged abilities deal 3% more damage. Aimed Shot always critically strikes.
STAT PRIORITY: Agility > Crit (Aimed Shot crit damage scales with 25% of crit chance — extremely high value) > Haste (Rapid Fire CD reduction feeds Aimed Shot) > Versatility > Mastery (Sniper Training — lower value)
BEST CRAFT: Back piece (Windrunner-themed crafted back). Ranged weapon second (4 Sparks, Missive: Crit + Haste).
KEY TIPS: Aimed Shot always critting is transformative for burst windows. Crit is your best secondary because it directly amplifies the Aimed Shot Apex bonus. Rapid Fire into Aimed Shot is your core loop — never delay Aimed Shot after filling a Rapid Fire.`,

  "Survival":`SPEC: Survival Hunter (Melee DPS)
APEX TALENT — Raptor Swipe: Raptor Strike has a 25% chance to upgrade to Raptor Swipe (AoE). Raptor Strike, Wildfire Bomb, and Raptor Swipe damage increased by 20%. Raptor Swipe deals 50% increased damage to its primary target. Raptor Strike always upgrades to Raptor Swipe. Raptor Swipes benefiting from Tip of the Spear trigger Strike as One at 300% effectiveness.
STAT PRIORITY: Agility > Haste (faster energy for more Raptor Strikes) > Crit > Mastery (Spirit Bond — % damage with pet) > Versatility
BEST CRAFT: Melee weapon (Missive: Agility + Haste). Bracers second.
KEY TIPS: Raptor Strike is now your primary filler AND your AoE tool once fully upgraded. Tip of the Spear stacks before Raptor Swipe for the 300% Strike as One proc. Survival is currently strong — the always-upgrade capstone makes the rotation very consistent.`,

  // ── MAGE ──────────────────────────────────────────────────────
  "Arcane":`SPEC: Arcane Mage (DPS)
APEX TALENT — Touch Rune: Touch of the Magi increases the damage your target receives from you by 15%. Arcane Charges further increase Arcane Blast, Arcane Pulse, and Arcane Barrage damage by 30%. Arcane Missiles damage increased by 20%. When Touch of the Magi explodes, it leaves a rune dealing 75% of its explosion damage over 6 seconds to nearby enemies.
STAT PRIORITY: Intellect > Haste (more casts between Touch of the Magi windows, shorter Arcane Surge CD) > Mastery (Savant — % Arcane damage) > Crit > Versatility
BEST CRAFT: Staff or wand (Missive: Haste + Mastery). Belt second.
KEY TIPS: Precast Touch of the Magi, build Arcane Charges, dump them into the explosion window. The rune AoE after explosion is strong in M+ — position enemies over the rune. Straightforward rotation, high ceiling.`,

  "Fire":`SPEC: Fire Mage (DPS)
APEX TALENT — Fired Up: Consuming Hot Streak has a 20% chance to grant a stack of Fired Up (+4% Fire damage for 12 seconds). Combustion increases the chance to gain Fired Up and extends Combustion duration by 1 second. Gaining Fired Up reduces Fire Blast cooldown by 2.5 seconds. All Fire damage increased by 3%.
STAT PRIORITY: Intellect > Crit (Hot Streak requires 2 crits — higher crit = more Fired Up stacks and Combustion extensions) > Haste (shorter Fire Blast and Scorch CDs) > Mastery (Ignite periodic) > Versatility
BEST CRAFT: Staff (Missive: Crit + Haste). Never craft Shoulders or Chest (Tier).
KEY TIPS: RNG-dependent but high ceiling. Combustion extension via Fired Up is the key — a lucky Combustion window can spiral into 15+ seconds. Fire Blast cooldown reduction from Fired Up makes the Hot Streak chain self-sustaining when procs cooperate.`,

  "Frost Mage":`SPEC: Frost Mage (DPS)
APEX TALENT — Hand of Frost: Shattering an enemy has a 10% chance to summon a Hand of Frost dealing 500% Spell Power Frost damage. Each stack of Freezing increases the Hand of Frost chance by 1%. Hand of Frost damage increases your spell damage by 1% for 8 seconds. Ray of Frost summons 4 Hands of Frost, gains an additional charge, and deals 25% increased damage.
STAT PRIORITY: Intellect > Haste (more shatters per minute = more Hand of Frost procs) > Crit (Fingers of Frost and Brain Freeze proc chance) > Mastery (Icicles — feeds Glacial Spike) > Versatility
BEST CRAFT: Ring (rings are never Tier slots). Staff second (Missive: Haste + Crit).
KEY TIPS: Ray of Frost is now your highest-priority cast — it guarantees 4 Hand of Frost summons and gains a bonus charge. Stack Freezing for the Hand of Frost chance increase before major damage windows. Strong cleave and consistent single-target.`,

  // ── MONK ──────────────────────────────────────────────────────
  "Brewmaster":`SPEC: Brewmaster Monk (Tank)
APEX TALENT — Empty Barrel: Drinking a Brew has a 20% chance to leave you with an Empty Barrel that deals 300% Attack Power Physical damage when thrown with Keg Smash. Gaining an Empty Barrel resets Keg Smash cooldown and increases physical damage dealt by 10%. Fortifying Brew or Celestial Brew grants a Refreshing Drink that heals for 3200% Attack Power over 8 seconds.
STAT PRIORITY: Agility > Versatility (Stagger bonus + damage reduction) > Haste (more Brew casts = more Empty Barrel chances, shorter Keg Smash CD) > Mastery (Elusive Brawler — dodge stacking) > Crit
BEST CRAFT: Belt or Weapon (Missive: Versatility + Haste). Never craft Chest or Shoulders.
KEY TIPS: Empty Barrel resets Keg Smash CD — this effectively doubles Keg Smash uptime when procs cooperate. The Refreshing Drink heal is enormous self-sustain. Time Fortifying Brew and Celestial Brew around high-damage phases.`,

  "Mistweaver":`SPEC: Mistweaver Monk (Healer)
APEX TALENT — Spiritfont: Rising Sun Kick and Vivify have a chance to activate Spiritfont, channeling Soothing Mist onto up to 5 allies. Rising Sun Kick damage and Enveloping Mist healing increased by 10%, increased further during Spiritfont. Thunder Focus Tea activates Spiritfont and applies Chi Cocoons at 30% effectiveness.
STAT PRIORITY: Intellect > Haste (shorter RSK CD, more Vivify casts, more Spiritfont chances) > Mastery (Gust of Mists — bonus direct healing on Vivify, amplified during Spiritfont) > Crit > Versatility
BEST CRAFT: Staff (Missive: Haste + Mastery). Bracers second.
KEY TIPS: Thunder Focus Tea is now a guaranteed Spiritfont trigger — save it for burst healing moments. Mistweaver is currently one of the strongest PvP and PvE healers because Spiritfont is essentially a free AoE Soothing Mist channel. Maintain RSK on cooldown.`,

  "Windwalker":`SPEC: Windwalker Monk (DPS)
APEX TALENT — Tigereye Brew: Gain Tigereye Brew every 8 seconds in combat, increasing critical strike chance by 2% during Zenith (max 20 stacks). Critical strike damage increased by 5%. Each hit of Fists of Fury has a chance equal to your critical strike chance to increase its damage by 15%.
STAT PRIORITY: Agility > Crit (Tigereye Brew scales with crit chance, Fists of Fury proc chance is your crit %) > Haste (shorter Fists of Fury CD, more GCDs per Zenith window) > Mastery (Combo Strikes — % bonus per unique ability chain) > Versatility
BEST CRAFT: Weapon (Missive: Agility + Crit). Bracers second.
KEY TIPS: This is a heavy Crit-stacking build in Midnight. Fists of Fury is your primary damage ability and benefits from both Tigereye Brew crit stacks AND the direct proc chance. Use Fists of Fury every time it's available during Zenith windows.`,

  // ── PALADIN ───────────────────────────────────────────────────
  "Holy Paladin":`SPEC: Holy Paladin (Healer)
APEX TALENT — Beacon of the Savior: Applies Beacon of the Savior to the lowest health ally, transferring 10% of your healing to them. Beacon transfers an additional 10% healing and increases healing received by 10%. Every 8 seconds, transfers Beacon to a new target and grants an absorb shield, reducing damage taken by 10% for 15 seconds.
STAT PRIORITY: Intellect > Haste (shorter Holy Shock CD = more Beacon transfers and Holy Power generation) > Mastery (Lightbringer — % bonus to allies within range, scales with Beacon transfers) > Crit (Holy Shock crit = 2 Holy Power) > Versatility
BEST CRAFT: Ring (rings are never Tier). Weapon second (Missive: Haste + Mastery).
KEY TIPS: The automatic Beacon target-switching every 8 seconds removes a cognitive burden — focus on generating Holy Power and spending it efficiently. The 10% absorb shield on Beacon transfer is meaningful raid cooldown value in progression.`,

  "Protection Paladin":`SPEC: Protection Paladin (Tank)
APEX TALENT — Vanguard: Judgment may grant Vanguard, empowering Avenger's Shield to deal 300% Attack Power Holy damage in a line. Judgment damage increased by 10% and grants 1 Holy Power when Vanguard is consumed. Shield of the Righteous deals 50% additional damage and strikes 4 additional enemies.
STAT PRIORITY: Strength > Versatility (damage reduction, scales SotR burst) > Haste (faster Holy Power for more SotR casts and Vanguard fishing) > Mastery (Divine Bulwark — block chance) > Crit
BEST CRAFT: 1H Weapon (Missive: Versatility + Haste). Belt second. Never craft Shoulders, Chest, or Gloves (all Tier).
KEY TIPS: Vanguard makes Judgment → Avenger's Shield a priority chain for both threat and damage. The 4-target SotR splash is significant AoE threat in M+ — use it on large packs. Position Avenger's Shield line through as many enemies as possible when Vanguard procs.`,

  "Retribution":`SPEC: Retribution Paladin (DPS)
APEX TALENT — Holy Wave: Righteous Cause or Art of War increases the damage of your next Blade of Justice by 150%. Avenging Wrath increases Final Verdict, Templar's Verdict, and Divine Storm damage by 10%. Blade of Justice releases a wave of Holy energy dealing double 442% Attack Power to the main target and 442% to nearby enemies.
STAT PRIORITY: Strength > Haste (shorter Judgment CD, faster Holy Power for the Avenging Wrath window) > Crit (Wake of Ashes and Blade of Justice crit) > Versatility > Mastery (Hand of Light — lowest value in Midnight)
BEST CRAFT: 2H Weapon (4 Sparks, Missive: Strength + Haste). Belt second.
KEY TIPS: Mastery is the worst secondary for Ret in Midnight. Blade of Justice into the 150% empowered wave is now your highest-priority single-target ability outside cooldowns. The AoE splash from the wave significantly improves Ret's cleave in M+.`,

  // ── PRIEST ────────────────────────────────────────────────────
  "Discipline":`SPEC: Discipline Priest (Healer)
APEX TALENT — Master the Darkness: Penance has a high chance to upgrade your next Power Word: Shield to a Void Shield, applying the shield and Atonement to 3 allies. Shadow damage and Atonement healing increased by 3% (x2 points). Void Shield reflects 25% of damage taken back to enemies, triggering Atonement healing.
STAT PRIORITY: Intellect > Haste (shorter Penance CD = more Void Shield procs) > Mastery (Grace — Atonement healing %, scales Void Shield reflection healing) > Crit (PW:Shield crit = extra Atonement) > Versatility
BEST CRAFT: Staff (Missive: Haste + Mastery). Belt second.
KEY TIPS: Void Shield applying Atonement to 3 allies simultaneously is enormous for raid output — it effectively triples your Atonement application rate. The 4th Apex point (Void Shield reflects 25% damage) is reportedly bugged at launch — 3 points may be optimal for now. Voidweaver Hero Tree synergises directly with Void Shield.`,

  "Holy Priest":`SPEC: Holy Priest (Healer)
APEX TALENT — Benediction: Prayer of Mending can upgrade Flash Heal into Benediction, healing the target for 30% more. Cosmic Ripple healing increased by 25%. All healing increased by 6%. Divine Hymn pulses emit Cosmic Ripples at 75% effectiveness. During Apotheosis, Flash Heal is upgraded to Benediction.
STAT PRIORITY: Intellect > Haste (shorter Prayer of Mending CD, more Flash Heal casts and Benediction chances) > Mastery (Echo of Light — HoT component) > Crit (Benediction proc rate) > Versatility
BEST CRAFT: Staff (Missive: Haste + Mastery). Belt second.
KEY TIPS: Benediction during Apotheosis is your primary throughput window — every Flash Heal becomes an empowered Benediction. Cosmic Ripple is now a significant portion of your output due to the 25% buff. Holy is considered an easier, entry-level healing spec with this Apex — straightforward to execute.`,

  "Shadow":`SPEC: Shadow Priest (DPS)
APEX TALENT — Void Apparitions: Idol effects summon Shadowy Apparitions that shoot additional Void Bolts. Each apparition spawn generates extra Shadow Techniques stacks. At 5+ Shadow Techniques after a combo point generator, a buff triggers making your next finisher deal bonus damage via a shadow clone and refund combo points. Core identity: maximise Idol procs to spawn more Apparitions, building Shadow Techniques for the finisher buff.
STAT PRIORITY: Intellect > Haste (faster Insanity generation, shorter Voidform ramp, more Idol procs per minute) > Mastery (Shadow Weaving — % shadow damage, scales Apparition Void Bolt damage) > Crit > Versatility
BEST CRAFT: Staff (Missive: Haste + Mastery). Belt second.
KEY TIPS: Voidform is now the main cooldown (Dark Ascension removed). Voidform grants Void Volley with a 15s cooldown (reduced by Haste). Build your talent choices around maximising Shadowy Apparitions generation — this is now the central gameplay loop. Icy Veins and Method recommend Voidweaver as default.`,

  // ── ROGUE ─────────────────────────────────────────────────────
  "Assassination":`SPEC: Assassination Rogue (DPS)
APEX TALENT — Implacable: Grants bonus Energy recharge after your Envenom chain runs out, based on how long you maintained the chain. Increases Bleed and Nature damage (x2 points). Causes additional damage on Kingsbane use, grants 5 Combo Points, and instantly applies 10 poison stacks to ramp Kingsbane fast. Rotation revolves around chaining Envenoms for as long as possible to maximise the Implacable Energy burst.
STAT PRIORITY: Agility > Haste (faster Energy = longer Envenom chains, shorter Kingsbane CD) > Crit (Mutilate crits for CP generation) > Mastery (Potent Assassin — % poison/bleed) > Versatility
BEST CRAFT: Main hand dagger (Missive: Haste + Crit). Off-hand second.
KEY TIPS: Let Envenom intentionally expire after a long chain to trigger Implacable's maximum Energy burst. The Kingsbane Apex point front-loads damage and combo points — use it immediately after Kingsbane application. Top-performing Rogue spec in Midnight.`,

  "Outlaw":`SPEC: Outlaw Rogue (DPS)
APEX TALENT — Gravedigger: Each Between the Eyes (BtE) cast has a chance to apply an extra stack of its damage buff. Dispatch damage increased (x2 points). Slowly builds toward a free BtE cast that incurs no cooldown and costs no resources.
STAT PRIORITY: Agility > Haste (more Sinister Strike procs, shorter Adrenaline Rush CD) > Crit (Sinister Strike extra hit + Opportunity procs) > Versatility > Mastery (Main Gauche — lowest value)
BEST CRAFT: 1H Weapon (Missive: Haste + Crit). Bracers second.
KEY TIPS: Adrenaline Rush uptime has been reduced to ~30-35% in Midnight (down from near-100%). Gravedigger smooths the dead periods between AR windows with consistent free BtE procs. Roll the Bones RNG still matters but Fatebound is the reliable Hero Tree choice. Trickster trails significantly behind.`,

  "Subtlety":`SPEC: Subtlety Rogue (DPS)
APEX TALENT — Ancient Arts: Combo point generators sometimes spawn a shadow clone dealing extra Shadow damage. Each clone spawn generates additional Shadow Techniques stacks. At 5+ Shadow Techniques after a CP generator, your next finisher deals bonus damage via a clone and refunds combo points. Shadow Dance duration now scales with Haste (from Deepening Shadows rework).
STAT PRIORITY: Agility > Haste (Shadow Dance duration now scales with Haste via Deepening Shadows — high value) > Crit (clone damage scales with crit) > Mastery (Executioner — % during finishers) > Versatility
BEST CRAFT: Main hand dagger (Missive: Haste + Crit). Bracers second.
KEY TIPS: Haste is now more valuable than previous expansions due to the Deepening Shadows rework. Shadow Blades now doubles combo points generated (not fills to full). Rupture, Flagellation, and Symbols of Death removed — simpler rotation. Deathstalker is recommended for single-target, Trickster for burst AoE.`,

  // ── SHAMAN ────────────────────────────────────────────────────
  "Elemental":`SPEC: Elemental Shaman (DPS)
APEX TALENT — Feedback Loop: Spell critical strike chance increased by 5% (x2 points: +5% then +10% total). Elemental Fury increases spell critical strike damage by an additional 25% (x2 points: +25% then +50%). Elemental Overloads have a 25% chance to cause an additional Elemental Overload (once per cast).
STAT PRIORITY: Intellect > Crit (Feedback Loop scales Crit chance and crit damage — double-dipping synergy) > Haste (more casts per Stormkeeper window, faster Lava Surge procs) > Mastery (Elemental Overload % chance, amplified by the extra Overload proc) > Versatility
BEST CRAFT: Staff or main hand + off hand (Missive: Crit + Haste). Belt second.
KEY TIPS: Feedback Loop makes Crit unusually high value — each point of Crit gives you more hit chance AND more damage on those hits. The extra Overload proc effectively increases your Overload rate by 25%. Stormbringer Hero Tree is recommended for all group content.`,

  "Enhancement":`SPEC: Enhancement Shaman (DPS)
APEX TALENT — Storm Unleashed: Crash Lightning can reset its own cooldown and deal repeated strikes, building Maelstrom Weapon stacks with each chain. Provides strong burst AoE on short cooldown cycles.
STAT PRIORITY: Agility > Haste (faster Maelstrom stack buildup, shorter Stormstrike CD) > Crit (Lava Lash crit refreshes Flame Shock) > Mastery (Enhanced Elements — % elemental damage) > Versatility
BEST CRAFT: 1H Weapon(s) (Missive: Agility + Haste — craft both eventually). Belt second.
KEY TIPS: Storm Unleashed makes Crash Lightning your primary AoE cooldown — hold it for large M+ packs. The cooldown reset mechanic can chain multiple Crash Lightnings on the same pull. Maelstrom at exactly 5 stacks before spending — always.`,

  "Restoration Shaman":`SPEC: Restoration Shaman (Healer)
APEX TALENT — Stormstream Totem: Riptide can summon a Stormstream Totem that heals more targets than a standard Healing Stream Totem and provides increased healing output. Riptide's role shifts from a single-target HoT to a totem-summoning trigger for group healing.
STAT PRIORITY: Intellect > Mastery (Deep Healing — % bonus to lower health targets, scales with totem throughput) > Haste (more Riptide casts = more totem summons) > Crit (Resurgence mana return on crits) > Versatility
BEST CRAFT: Staff (Missive: Mastery + Haste). Belt second.
KEY TIPS: Riptide placement is now even more important — summon the Stormstream Totem in the center of your group stack for maximum hit count. Healing Stream Totem healing was increased by 50% in Midnight patch notes. Strong in stacked raid scenarios.`,

  // ── WARLOCK ───────────────────────────────────────────────────
  "Affliction":`SPEC: Affliction Warlock (DPS)
APEX TALENT — Shadow of Nathreza: Haunt deals splash damage to nearby enemies and has a chance to summon an ally demon. Haunt damage is buffed. Excellent for multi-target situations where Haunt splash hits multiple enemies simultaneously.
STAT PRIORITY: Intellect > Haste (faster Shard generation, shorter Haunt CD, more Malevolence windows via new talent Devil Fruit Wither) > Mastery (Potent Afflictions — % DoT damage scales Haunt splash) > Crit > Versatility
BEST CRAFT: Staff (Missive: Haste + Mastery). Belt second.
KEY TIPS: Affliction has strong target-swap capability in Midnight via new talents. Shadow of Nathreza's splash makes Haunt a meaningful AoE tool — time Haunt casts when multiple enemies are clustered. The summoned demon provides additional passive damage.`,

  "Demonology":`SPEC: Demonology Warlock (DPS)
APEX TALENT — Dominion of Argus: Chance to summon an additional Dreadstalker. Felguard's Legion Strike and Felstorm receive damage increases. High single-target and multi-target variance from proc-based summons — top-performing spec in Midnight.
STAT PRIORITY: Intellect > Haste (faster Shard generation for more Imps before Tyrant, more pet summons) > Crit (Demonbolt crits for Shard generation) > Mastery (Master Demonologist — scales demon damage including Apex summons) > Versatility
BEST CRAFT: Staff (Missive: Haste + Crit). Belt second.
KEY TIPS: One of the best specs in Midnight. Apex introduces variance via random summon types — some give exceptional AoE, others focus on single-target. Diabolist is old-reliable Hero Tree; Soul Harvester has been nerfed post-launch. Tyrant window timing remains the skill expression. New talents Through the Felvine and Devil Fruit add Malevolence interaction.`,

  "Destruction":`SPEC: Destruction Warlock (DPS)
APEX TALENT — Embers of Nihilam: Chance to evoke the Echo of Sargeras that deals Shadowflame damage, increases critical strike, and increases Haste. The Apex summon is random — variance between exceptional AoE and single-target output depending on which Echo type appears.
STAT PRIORITY: Intellect > Crit (Chaos Bolt and Conflagrate crit scales Echo damage; high crit = more consistent performance floor) > Haste (faster Shard generation, more Chaos Bolts per cooldown) > Mastery (Chaotic Energies — random % bonus) > Versatility
BEST CRAFT: Staff (Missive: Crit + Haste). Belt second.
KEY TIPS: Apex adds meaningful variance — Soul Harvester is still preferred for single-target, Diabolist for multi-target. New Diabolic Oculi talents summon AoE-explosion orbs on Shard spending. Post-launch nerfs targeted splash damage overperformance. Correct Hero Tree choice matters more than in TWW.`,

  // ── WARRIOR ───────────────────────────────────────────────────
  "Arms":`SPEC: Arms Warrior (DPS)
APEX TALENT — Master of Warfare: Charges a second Slam as Heroic Strike, adding bonus damage and Armor Penetration stacks. Good on single-target and cleave burst. Upgrades Overpower and Slam interactions.
STAT PRIORITY: Strength > Haste (faster Rage generation, more Overpower/Slam resets) > Crit (Overpower crit fishing) > Mastery (Deep Wounds — periodic bleed) > Versatility
BEST CRAFT: 2H Weapon (4 Sparks, Missive: Strength + Haste). Belt second.
KEY TIPS: Heroic Strike via Master of Warfare is an additional free-damage proc on top of the regular Slam rotation. Armor Penetration stacks are meaningful on high-armor targets in progression. Arms is solid single-target with good cleave access.`,

  "Fury":`SPEC: Fury Warrior (DPS)
APEX TALENT — Rampaging Berserker: Every Rampage cast triggers a Berserk buff that passively increases Strength (stacking, each with its own duration — treat as a passive). The 2nd and 3rd points increase Rampage damage and reduce its Rage cost during Recklessness. The 4th point increases Recklessness duration and grants 3 Berserk stacks immediately when Recklessness is activated.
STAT PRIORITY: Strength > Haste (faster Rage generation for more Rampages, building Berserk stacks faster) > Crit (Bloodthirst and Raging Blow) > Mastery (Unshackled Fury — % bonus while Enraged) > Versatility
BEST CRAFT: 2H Weapon (4 Sparks — single biggest upgrade, Missive: Strength + Haste). Belt second.
KEY TIPS: Berserk stacks constantly stack and decay — treat them as a passive DPS increase. The Recklessness 4th point extending its duration is the most impactful part of the talent. Mountain Thane (Thunder Clap) is better for M+; Slayer for raid single-target.`,

  "Protection Warrior":`SPEC: Protection Warrior (Tank)
APEX TALENT — Phalanx: Shield Slam critical strikes send defensive shockwaves that enhance group survivability. Judgment (via the Vanguard system) deals improved Holy damage in a line. Shield of the Righteous damage and target count increased, improving group threat and AoE damage.
STAT PRIORITY: Strength > Versatility (damage reduction) > Haste (more Shield Slam casts = more crit shockwave chances) > Mastery (Critical Block — block value) > Crit
BEST CRAFT: 1H Weapon (Missive: Versatility + Haste). Belt second.
KEY TIPS: Phalanx shockwaves provide raid-wide survivability value — coordinate with your healers on high-damage phases. Shield Slam crit fishing is now meaningful beyond just damage. Protection gained improved AoE threat via the 4-target SotR and Vanguard line in Midnight.`,
};

function getSpecKnowledge(activeSpec, activeClass) {
  const spec = (activeSpec || "").toLowerCase();
  const cls  = (activeClass || "").toLowerCase();

  if (spec === "frost" && cls.includes("death")) return SPEC_KNOWLEDGE["Frost DK"] || "";
  if (spec === "frost" && cls.includes("mage"))  return SPEC_KNOWLEDGE["Frost Mage"] || "";
  if (spec === "holy"  && cls.includes("paladin")) return SPEC_KNOWLEDGE["Holy Paladin"] || "";
  if (spec === "holy"  && cls.includes("priest"))  return SPEC_KNOWLEDGE["Holy Priest"] || "";
  if (spec === "restoration" && cls.includes("druid"))  return SPEC_KNOWLEDGE["Restoration Druid"] || "";
  if (spec === "restoration" && cls.includes("shaman")) return SPEC_KNOWLEDGE["Restoration Shaman"] || "";
  if (spec === "protection" && cls.includes("paladin")) return SPEC_KNOWLEDGE["Protection Paladin"] || "";
  if (spec === "protection" && cls.includes("warrior")) return SPEC_KNOWLEDGE["Protection Warrior"] || "";
  if (spec === "beast mastery") return SPEC_KNOWLEDGE["Beast Mastery"] || "";
  if (SPEC_KNOWLEDGE[activeSpec]) return SPEC_KNOWLEDGE[activeSpec];

  const fuzzy = Object.keys(SPEC_KNOWLEDGE).find(k =>
    k.toLowerCase() === spec || k.toLowerCase().startsWith(spec)
  );
  return fuzzy ? SPEC_KNOWLEDGE[fuzzy] : "\nNo spec-specific data — give best general advice for this class.";
}


// ── API helpers ──────────────────────────────────────────────────
// Fetch wrapper with timeout + retry logic

const DEFAULT_TIMEOUT = 15000; // 15s
const MAX_RETRIES = 2;

export async function fetchWithRetry(url, options = {}, retries = MAX_RETRIES, timeout = DEFAULT_TIMEOUT) {
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

export async function callClaude(systemPrompt, messages, maxTokens = 1500) {
  const res = await fetchWithRetry("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: maxTokens,
      system: systemPrompt,
      messages,
    }),
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  const data = await res.json();
  return data.content?.map(b => b.text || "").join("") || "No response.";
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
};
CLASS_ICON_RENDERERS["Devourer"] = CLASS_ICON_RENDERERS["Demon Hunter"];

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
function ResponseBlock({ content }) {
  if (!content) return null;
  return (
    <div style={{ lineHeight: 1.8 }}>
      {content.split("\n").filter(l => l.trim()).map((line, i) => {
        if (line.startsWith("##")) return (
          <h3 key={i} style={{ color: T.gold, fontSize: 14, fontFamily: "'Cinzel', serif", fontWeight: 700, marginTop: 18, marginBottom: 6, letterSpacing: 0.5 }}>
            {line.replace(/^#+\s*/, "")}
          </h3>
        );
        if (line.startsWith("- ") || line.startsWith("• ")) {
          const html = line.replace(/^[-•]\s*/, "").replace(/\*\*(.+?)\*\*/g, `<strong style="color:${T.text}">$1</strong>`);
          return (
            <div key={i} style={{ display: "flex", gap: 10, margin: "5px 0", paddingLeft: 4 }}>
              <span style={{ color: T.gold, flexShrink: 0, marginTop: 6, fontSize: 6 }}>◆</span>
              <span style={{ color: "#c9d1d9", fontSize: 14, lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: html }} />
            </div>
          );
        }
        const html = line.replace(/\*\*(.+?)\*\*/g, `<strong style="color:${T.text}">$1</strong>`);
        return <p key={i} style={{ color: "#c9d1d9", fontSize: 14, margin: "6px 0", lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: html }} />;
      })}
    </div>
  );
}

// ── Step breadcrumb
function Breadcrumb({ steps, current }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 20, overflowX: "auto", paddingBottom: 2 }}>
      {steps.map((s, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
          <span style={{ fontSize: 12, fontFamily: "'Cinzel', serif", color: i < current ? T.green : i === current ? T.gold : T.textDim, fontWeight: i === current ? 700 : 400 }}>
            {i < current ? "✓ " : ""}{s}
          </span>
          {i < steps.length - 1 && <span style={{ color: T.textDim, fontSize: 10 }}>›</span>}
        </div>
      ))}
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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <span style={{ color: T.gold, fontSize: 12, fontFamily: "'Cinzel', serif", letterSpacing: 1 }}>{filled.length} / {gear.length} SLOTS</span>
        {avg > 0 && <span style={{ color: T.textSub, fontSize: 13 }}>Avg ilvl <IlvlBadge ilvl={avg} /></span>}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
        {gear.map((slot, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 10px", borderRadius: 6, background: slot.name ? "rgba(240,180,41,0.06)" : "rgba(255,255,255,0.02)", border: `1px solid ${slot.name ? "rgba(240,180,41,0.18)" : "#21262d"}` }}>
            <span style={{ color: T.textSub, fontSize: 11, fontFamily: "'Cinzel', serif", flexShrink: 0 }}>{slot.label}</span>
            {slot.name
              ? <span style={{ color: "#c9d1d9", fontSize: 11, textAlign: "right", maxWidth: "60%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginLeft: 6 }}>
                  {slot.ilvl && <><IlvlBadge ilvl={slot.ilvl} />{" "}</>}{slot.name}
                </span>
              : <span style={{ color: T.textDim, fontSize: 11 }}>—</span>}
          </div>
        ))}
      </div>
    </div>
  );
}


// ── Main App ─────────────────────────────────────────────────────
// ── Mode card (no emoji) ─────────────────────────────────────────
function ModeCard({ icon: Icon, title, badge, badgeColor = T.gold, description, selected, onClick }) {
  return (
    <button onClick={onClick} style={{
      background: selected ? `${badgeColor}12` : "#0d1117",
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
          {selected && <span style={{ color: "#0d1117", fontSize: 10, fontWeight: 900, lineHeight: 1 }}>✓</span>}
        </div>
      </div>
    </button>
  );
}

// ── Oracle tab button (no emoji) ─────────────────────────────────
function OracleTab({ id, label, icon: Icon, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      flex: 1, padding: "10px 6px", borderRadius: 10, cursor: "pointer",
      background: active ? `${T.gold}18` : T.surface,
      border: `1.5px solid ${active ? T.gold : T.border}`,
      color: active ? T.gold : T.textSub,
      fontSize: 13, fontWeight: active ? 700 : 400,
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
        Apex will break down your stat priorities, weakest slots, crafting plan, and immediate wins.
      </p>
      <button style={{ ...S.primaryBtn, width: "100%", opacity: loading ? 0.5 : 1 }} onClick={onRun} disabled={loading}>
        {loading ? <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}><Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />Analysing...</span> : "Run Gear Analysis"}
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
      <p style={{ color: T.textSub, fontSize: 13, margin: "0 0 20px", lineHeight: 1.5 }}>Enter the items showing in your vault and Apex will tell you exactly which to take.</p>
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
      <p style={{ color: T.textSub, fontSize: 13, margin: "0 0 20px", lineHeight: 1.5 }}>Enter your available resources and Apex will build a prioritised weekly checklist.</p>
    </div>
  );
}

// ── Main App ─────────────────────────────────────────────────────
export default function Apex() {
  const [step, setStep]         = useState(0);
  const [inputMode, setInputMode] = useState(null);
  const [detectedClass, setDetectedClass] = useState("");
  const [detectedSpec,  setDetectedSpec]  = useState("");

  const [detectedGear, setDetectedGear] = useState([]);
  const [gearSummary,  setGearSummary]  = useState("");

  const [rioName,    setRioName]    = useState("");
  const [rioRealm,   setRioRealm]   = useState("");
  const [rioRegion,  setRioRegion]  = useState("us");
  const [rioLoading, setRioLoading] = useState(false);
  const [rioError,   setRioError]   = useState("");
  const [realmSuggestions, setRealmSuggestions] = useState([]);
  const [showRealmDrop,    setShowRealmDrop]    = useState(false);

  const [simcString, setSimcString] = useState("");
  const [simcParsed, setSimcParsed] = useState(null);

  const [content,  setContent]  = useState([]);
  const [priority, setPriority] = useState(PRIORITIES[0]);
  const [chatHistory, setChatHistory] = useState([]);
  const [loading,     setLoading]     = useState(false);
  const [followUp,    setFollowUp]    = useState("");
  const chatEndRef = useRef(null);

  const [oracleMode,      setOracleMode]      = useState("analysis");
  const [vaultItems,      setVaultItems]      = useState(["","","","","","","","",""]);
  const [sparksAvailable, setSparksAvailable] = useState("1");
  const [heroCrestsAvail, setHeroCrestsAvail] = useState("");
  const [mythCrestsAvail, setMythCrestsAvail] = useState("");

  // Page title
  useEffect(() => {
    document.title = detectedClass
      ? `${detectedSpec} ${detectedClass} — Apex`
      : "Apex — WoW Midnight Gear Advisor";
  }, [detectedClass, detectedSpec]);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chatHistory, loading]);

  const activeClass = detectedClass;
  const activeSpec  = detectedSpec;
  const classData   = CLASSES.find(c => c.name === activeClass);

  const toRealmSlug = n => n.trim().toLowerCase().replace(/\s+/g, "-").replace(/'/g, "").replace(/[^a-z0-9-]/g, "");

  // SimC parser
  const parseSimC = useCallback((str) => {
    if (!str.trim()) return null;
    const slotMap = { head:"head", neck:"neck", shoulder:"shoulder", back:"back", chest:"chest", wrist:"wrist", hands:"hands", waist:"waist", legs:"legs", feet:"feet", finger1:"finger1", finger2:"finger2", trinket1:"trinket1", trinket2:"trinket2", main_hand:"mainhand", off_hand:"offhand" };
    const classNameMap = { deathknight:"Death Knight", demonhunter:"Demon Hunter", druid:"Druid", evoker:"Evoker", hunter:"Hunter", mage:"Mage", monk:"Monk", paladin:"Paladin", priest:"Priest", rogue:"Rogue", shaman:"Shaman", warlock:"Warlock", warrior:"Warrior" };
    const found = {}; const ilvls = []; let parsedClass = ""; let parsedSpec = "";
    for (const line of str.split("\n")) {
      const t = line.trim();
      if (t.startsWith("#") || !t.includes("=")) continue;
      const eqIdx = t.indexOf("=");
      const rawKey = t.slice(0, eqIdx).trim();
      const val = t.slice(eqIdx + 1).trim().replace(/"/g, "");
      if (!parsedClass && classNameMap[rawKey.toLowerCase()]) { parsedClass = classNameMap[rawKey.toLowerCase()]; continue; }
      if (rawKey === "spec") { const sv = val.replace(/_/g, " "); parsedSpec = sv.charAt(0).toUpperCase() + sv.slice(1); continue; }
      const slotKey = slotMap[rawKey];
      if (slotKey) {
        const itemName = val.split(",")[0].replace(/_/g, " ").trim();
        const ilvlM = val.match(/ilevel=(\d+)/);
        const ilvl = ilvlM ? parseInt(ilvlM[1]) : null;
        if (ilvl) ilvls.push(ilvl);
        found[slotKey] = { key: slotKey, name: itemName || "", ilvl };
      }
    }
    const gear = GEAR_SLOTS.map(s => { const h = found[s.key]; return h ? { ...s, name: h.name, ilvl: h.ilvl } : { ...s, name: "", ilvl: null }; });
    const filled = gear.filter(g => g.name && g.name.length > 1);
    if (!filled.length) return null;
    const avgIlvl = ilvls.length ? Math.round(ilvls.reduce((a,b)=>a+b,0)/ilvls.length) : null;
    return { gear, filled: filled.length, avgIlvl, parsedClass, parsedSpec };
  }, []);

  useEffect(() => {
    if (inputMode === "simc" && simcString.length > 80) {
      const parsed = parseSimC(simcString);
      setSimcParsed(parsed);
      if (parsed?.parsedClass) setDetectedClass(parsed.parsedClass);
      if (parsed?.parsedSpec)  setDetectedSpec(parsed.parsedSpec);
    } else setSimcParsed(null);
  }, [simcString, inputMode, parseSimC]);

  // Raider.IO fetch
  const fetchRaiderIO = async () => {
    if (!rioName.trim() || !rioRealm.trim()) return;
    setRioLoading(true); setRioError(""); setDetectedGear([]);
    try {
      const res = await fetchWithRetry(`/api/raiderio?region=${rioRegion}&realm=${encodeURIComponent(toRealmSlug(rioRealm))}&name=${encodeURIComponent(rioName.trim())}`);
      if (!res.ok) { const e = await res.json().catch(()=>({})); throw new Error(e.message || `Character not found (${res.status})`); }
      const data = await res.json();
      if (data.class)            setDetectedClass(data.class);
      if (data.active_spec_name) setDetectedSpec(data.active_spec_name);
      const items = data.gear?.items || {};
      const gearArray = GEAR_SLOTS.map(slot => { const item = items[slot.key]; return { ...slot, name: item?.name || "", ilvl: item?.item_level || null }; });
      setDetectedGear(gearArray);
      const filled = gearArray.filter(g => g.name);
      const avg = filled.filter(g=>g.ilvl).length ? Math.round(filled.filter(g=>g.ilvl).reduce((a,g)=>a+g.ilvl,0)/filled.filter(g=>g.ilvl).length) : 0;
      setGearSummary(`Character: ${data.name} (${data.class} — ${data.active_spec_name}), avg ilvl ${avg}.\nEquipped gear:\n` + filled.map(g=>`${g.label}: ${g.name}${g.ilvl?` (ilvl ${g.ilvl})`:""}`).join("\n"));
    } catch (e) { setRioError(e.message || "Fetch failed. Check name, realm and region."); }
    setRioLoading(false);
  };

  const buildGearContext = () => {
    if (inputMode === "rio" && gearSummary) return gearSummary;
    if (inputMode === "simc" && simcParsed) return `SimC — ${simcParsed.filled} items${simcParsed.avgIlvl ? `, avg ${simcParsed.avgIlvl}` : ""}:\n` + simcParsed.gear.filter(g=>g.name).map(g=>`${g.label}: ${g.name}${g.ilvl?` (ilvl ${g.ilvl})`:""}`).join("\n");
    return "No gear data — give best general spec advice.";
  };

  const sysPrompt = () => `You are Apex — a sharp WoW gear advisor for Midnight Season 1. Give direct, specific, actionable advice. Explain the mechanical WHY behind every recommendation. Reference the player's actual gear items and ilvls when available.

Player: ${activeSpec || "Unknown Spec"} ${activeClass || "Unknown Class"}
Content: ${content.join(", ") || "general play"}
Goal: ${priority}

Gear:
${buildGearContext()}
${UNIVERSAL_KNOWLEDGE}
${getSpecKnowledge(activeSpec, activeClass)}

Rules: Use ## for section headers, **bold** for stats/items. Lead with the single most important recommendation. Name actual items, ilvl thresholds, Dawncrest costs. Call out mistakes directly.`;

  const appendMessage = (msg) => setChatHistory(h => [...h, msg]);

  const sendInitial = async () => {
    setLoading(true); setStep(3); setOracleMode("analysis");
    const msg = `Analyse my ${activeSpec} ${activeClass} gear:\n\n## Stat Priority\nWhat stats I should prioritize and why they synergize with my Apex Talent.\n\n## Biggest Upgrades\nMy weakest slots ranked by impact.\n\n## Crafting Plan\nWhat to craft with Sparks, which Embellishments to pair, and which slots are off-limits.\n\n## Immediate Wins\nFree upgrades, wasted Dawncrests, or anything obviously wrong.`;
    setChatHistory([{ role: "user", content: msg, display: "Gear Analysis" }]);
    try {
      const text = await callClaude(sysPrompt(), [{ role: "user", content: msg }]);
      setChatHistory([{ role: "user", content: msg, display: "Gear Analysis" }, { role: "assistant", content: text }]);
    } catch (e) {
      setChatHistory([{ role: "user", content: msg, display: "Gear Analysis" }, { role: "assistant", content: `Error: ${e.message}` }]);
    }
    setLoading(false);
  };

  const sendFollowUp = async () => {
    if (!followUp.trim() || loading) return;
    const text = followUp.trim(); setFollowUp(""); setLoading(true);
    const hist = [...chatHistory, { role: "user", content: text }];
    setChatHistory(hist);
    try {
      const reply = await callClaude(sysPrompt(), hist.map(m => ({ role: m.role, content: m.content })));
      setChatHistory([...hist, { role: "assistant", content: reply }]);
    } catch (e) { setChatHistory([...hist, { role: "assistant", content: `Error: ${e.message}` }]); }
    setLoading(false);
  };

  const sendVaultAnalysis = async () => {
    const filled = vaultItems.filter(v => v.trim());
    if (!filled.length) return;
    setLoading(true);
    const msg = `I'm looking at my Great Vault. Available picks:\n${filled.map((item,i)=>`${i+1}. ${item}`).join("\n")}\n\nMy gear:\n${buildGearContext()}\n\n## Which pick should I take and why?\nGive a clear #1 recommendation with the mechanical reason. Consider: ilvl upgrade, Tier set progress, stat value for my ${activeSpec} ${activeClass} Apex Talent, and availability from other sources.\n\n## The others\nBrief note on why the other options are lower priority.`;
    const hist = [...chatHistory, { role: "user", content: msg, display: `Vault — ${filled.length} item${filled.length > 1 ? "s" : ""}` }];
    setChatHistory(hist);
    try {
      const reply = await callClaude(sysPrompt(), hist.map(m => ({ role: m.role, content: m.content })));
      setChatHistory([...hist, { role: "assistant", content: reply }]);
    } catch (e) { setChatHistory([...hist, { role: "assistant", content: `Error: ${e.message}` }]); }
    setLoading(false);
  };

  const sendWeeklyPlan = async () => {
    setLoading(true);
    const msg = `Generate my weekly Apex plan as a ${activeSpec} ${activeClass}.\n\nGoal: ${priority}\nContent: ${content.join(", ") || "general"}\nSparks: ${sparksAvailable} | Hero Crests: ${heroCrestsAvail||"unknown"} | Myth Crests: ${mythCrestsAvail||"unknown"}\n\nGear:\n${buildGearContext()}\n\n## Upgrades This Reset\nWhich slots, what track, exact Dawncrest cost. Flag any FREE upgrades.\n\n## Crafting Decision\nSpend Sparks this week? If yes: exactly what item, slot, Embellishment, and reagent.\n\n## Content Priority\nWhat to run and in what order. Which Prey difficulty and Delve tier to target.\n\n## Vault Setup\nWhat to complete before reset to maximise next week's options.\n\n## Don't Forget\nFree upgrades, weekly quests for Sparks, reset-day actions.`;
    const hist = [...chatHistory, { role: "user", content: msg, display: "Weekly Plan" }];
    setChatHistory(hist);
    try {
      const reply = await callClaude(sysPrompt(), hist.map(m => ({ role: m.role, content: m.content })));
      setChatHistory([...hist, { role: "assistant", content: reply }]);
    } catch (e) { setChatHistory([...hist, { role: "assistant", content: `Error: ${e.message}` }]); }
    setLoading(false);
  };

  const reset = () => {
    setStep(0); setInputMode(null); setDetectedClass(""); setDetectedSpec("");
    setDetectedGear([]); setGearSummary(""); setRioName(""); setRioRealm(""); setRioRegion("us"); setRioError("");
    setSimcString(""); setSimcParsed(null); setContent([]); setPriority(PRIORITIES[0]);
    setChatHistory([]); setFollowUp(""); setOracleMode("analysis");
    setVaultItems(["","","","","","","","",""]);
    setSparksAvailable("1"); setHeroCrestsAvail(""); setMythCrestsAvail("");
  };

  // ── Render ────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Cinzel+Decorative:wght@700&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        @keyframes spin { to{transform:rotate(360deg)} }
        * { box-sizing: border-box; -webkit-font-smoothing: antialiased; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #30363d; border-radius: 4px; }
        input:focus, textarea:focus, select:focus { border-color: #f0b429 !important; outline: none; box-shadow: 0 0 0 3px rgba(240,180,41,0.12) !important; }
        select { appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%238b949e'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 12px center; }
        button:active { opacity: 0.75; transform: scale(0.98); }
        .fu { animation: fadeUp 0.25s ease both; }
      `}</style>

      <div style={S.app}>
        <div style={S.wrap}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 28, paddingTop: 12 }}>
            <p style={{ fontSize: 10, letterSpacing: 4, color: T.textDim, fontFamily: "'Cinzel', serif", margin: "0 0 10px", textTransform: "uppercase" }}>World of Warcraft · Midnight</p>
            <h1 style={{ fontSize: "clamp(28px,7vw,44px)", fontFamily: "'Cinzel Decorative', serif", color: T.gold, letterSpacing: 3, margin: "0 0 4px", lineHeight: 1.1 }}>APEX</h1>
            <p style={{ color: T.textDim, fontSize: 11, margin: 0, letterSpacing: 2, fontFamily: "'Cinzel', serif" }}>MIDNIGHT SEASON 1 GEAR ADVISOR</p>
          </div>

          {step > 0 && step < 3 && <Breadcrumb steps={STEPS} current={step} />}

          {/* ══ Step 0: Input method ══ */}
          {step === 0 && (
            <div style={S.card} className="fu">
              <p style={{ color: T.textSub, fontSize: 14, margin: "0 0 16px", lineHeight: 1.5 }}>How do you want to share your gear?</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <ModeCard icon={Link2} title="Character Lookup" badge="Easiest" badgeColor={T.green}
                  description="Enter your name and realm — we pull your live gear from Raider.IO."
                  selected={inputMode === "rio"} onClick={() => setInputMode("rio")} />
                <ModeCard icon={FileText} title="SimC String" badge="Most Detail" badgeColor={T.gold}
                  description="Paste your /simc export for the deepest analysis including enchants and gems."
                  selected={inputMode === "simc"} onClick={() => setInputMode("simc")} />
              </div>
              {inputMode && (
                <div style={{ marginTop: 16, display: "flex", justifyContent: "flex-end" }}>
                  <button style={S.primaryBtn} onClick={() => setStep(1)}>Continue →</button>
                </div>
              )}
            </div>
          )}

          {/* ══ Step 1: Gear input ══ */}
          {step === 1 && (
            <div style={S.card} className="fu">
              <button style={S.backBtn} onClick={() => setStep(0)}>
                <ChevronLeft size={16} strokeWidth={2} /> Back
              </button>

              {/* Raider.IO */}
              {inputMode === "rio" && (
                <>
                  <span style={S.label}>Character Lookup</span>
                  <p style={{ color: T.textSub, fontSize: 14, marginBottom: 18, marginTop: 0, lineHeight: 1.5 }}>Log out in your current gear first so Raider.IO has the latest data.</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 14 }}>
                    <div>
                      <span style={S.label}>Character Name</span>
                      <input style={S.input} placeholder="Arthas" value={rioName} onChange={e => setRioName(e.target.value)} onKeyDown={e => e.key === "Enter" && fetchRaiderIO()} />
                    </div>
                    <div style={{ position: "relative" }}>
                      <span style={S.label}>Realm</span>
                      <input style={S.input} placeholder="Start typing..." value={rioRealm} autoComplete="off"
                        onChange={e => {
                          const v = e.target.value; setRioRealm(v);
                          if (v.length >= 2) {
                            const q = v.toLowerCase();
                            const pool = WOW_REALMS[rioRegion] || WOW_REALMS.us;
                            setRealmSuggestions(pool.filter(r => r.toLowerCase().includes(q)).slice(0, 7));
                            setShowRealmDrop(true);
                          } else setShowRealmDrop(false);
                        }}
                        onKeyDown={e => { if (e.key === "Enter") { setShowRealmDrop(false); fetchRaiderIO(); } if (e.key === "Escape") setShowRealmDrop(false); }}
                        onBlur={() => setTimeout(() => setShowRealmDrop(false), 150)} />
                      {showRealmDrop && realmSuggestions.length > 0 && (
                        <div style={{ position: "absolute", top: "100%", left: 0, right: 0, zIndex: 100, background: "#161b22", border: `1px solid ${T.borderHi}`, borderRadius: 8, overflow: "hidden", marginTop: 4, boxShadow: "0 8px 32px rgba(0,0,0,0.6)" }}>
                          {realmSuggestions.map(r => (
                            <div key={r} onMouseDown={() => { setRioRealm(r); setShowRealmDrop(false); }}
                              style={{ padding: "12px 14px", cursor: "pointer", fontSize: 15, color: T.text, borderBottom: `1px solid ${T.border}` }}
                              onMouseEnter={e => e.currentTarget.style.background = "#21262d"}
                              onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                              {r}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div>
                      <span style={S.label}>Region</span>
                      <select style={{ ...S.input, cursor: "pointer" }} value={rioRegion} onChange={e => { setRioRegion(e.target.value); setRioRealm(""); setShowRealmDrop(false); }}>
                        {REGIONS.map(r => <option key={r} value={r}>{r.toUpperCase()}</option>)}
                      </select>
                    </div>
                  </div>
                  <button style={{ ...S.primaryBtn, width: "100%", opacity: rioLoading || !rioName || !rioRealm ? 0.45 : 1 }} onClick={fetchRaiderIO} disabled={rioLoading || !rioName || !rioRealm}>
                    {rioLoading
                      ? <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}><Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />Searching...</span>
                      : "Fetch Gear →"}
                  </button>
                  {rioLoading && <SkeletonGearGrid />}
                  {rioError && (
                    <div style={{ marginTop: 12, padding: "12px 14px", background: `${T.red}12`, border: `1px solid ${T.red}40`, borderRadius: 8, display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <AlertCircle size={16} color={T.red} style={{ flexShrink: 0, marginTop: 1 }} />
                      <div>
                        <p style={{ color: T.red, fontSize: 14, margin: "0 0 3px", fontWeight: 600 }}>{rioError}</p>
                        <p style={{ color: T.textSub, fontSize: 13, margin: 0 }}>Pick your realm from the dropdown and check your region is correct.</p>
                      </div>
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
                        <button style={{ ...S.primaryBtn, width: "100%" }} onClick={() => setStep(2)}>Looks right — continue →</button>
                      </div>
                    </>
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
                        <button style={{ ...S.primaryBtn, width: "100%" }} onClick={() => setStep(2)}>Analyse this gear →</button>
                      </div>
                    </>
                  )}
                  {!simcParsed && (
                    <div style={{ marginTop: 12, display: "flex", justifyContent: "flex-end" }}>
                      <button style={S.ghostBtn} onClick={() => setStep(2)}>Skip — general advice</button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* ══ Step 2: Configure ══ */}
          {step === 2 && (
            <div style={S.card} className="fu">
              <button style={S.backBtn} onClick={() => setStep(1)}><ChevronLeft size={16} strokeWidth={2} /> Back</button>
              {activeClass && (
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, padding: "12px 14px", background: "#0d1117", borderRadius: 8, border: `1px solid ${T.border}` }}>
                  {classData && <ClassIcon name={classData.name} color={classData.color} size={32} />}
                  <div>
                    <p style={{ color: T.text, fontSize: 15, margin: 0, fontWeight: 600 }}>{activeSpec} {activeClass}</p>
                    <p style={{ color: T.textSub, fontSize: 12, margin: "2px 0 0" }}>
                      {inputMode === "rio" ? "Raider.IO" : "SimC"} · {detectedGear.filter(g=>g.name).length || simcParsed?.filled || 0} items
                    </p>
                  </div>
                </div>
              )}
              <span style={S.label}>Content You Play</span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 22 }}>
                {CONTENT_TYPES.map(c => (
                  <button key={c} style={S.tag(content.includes(c))} onClick={() => setContent(p => p.includes(c) ? p.filter(x=>x!==c) : [...p,c])}>{c}</button>
                ))}
              </div>
              <span style={S.label}>Your Goal</span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
                {PRIORITIES.map(p => (
                  <button key={p} style={S.tag(priority === p)} onClick={() => setPriority(p)}>{p}</button>
                ))}
              </div>
              <p style={{ color: T.textDim, fontSize: 13, margin: "0 0 16px", fontStyle: "italic" }}>Both optional — skip and Apex makes sensible assumptions.</p>
              <button style={{ ...S.primaryBtn, width: "100%" }} onClick={sendInitial}>Consult Apex →</button>
            </div>
          )}

          {/* ══ Step 3: Oracle ══ */}
          {step === 3 && (
            <div className="fu">
              {/* Session bar */}
              <div style={{ ...S.card, padding: "12px 16px", marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  {classData && <ClassIcon name={classData.name} color={classData.color} size={30} />}
                  <div>
                    <p style={{ color: T.text, fontSize: 14, margin: 0, fontWeight: 600 }}>{activeSpec || "?"} {activeClass || "Unknown"}</p>
                    <p style={{ color: T.textSub, fontSize: 12, margin: "2px 0 0" }}>
                      {inputMode === "rio" ? "Raider.IO" : "SimC"} · {content.join(", ") || "All content"}
                    </p>
                  </div>
                </div>
                <button style={S.ghostBtn} onClick={reset}>New session</button>
              </div>

              {/* Tabs */}
              <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
                <OracleTab id="analysis" label="Analysis" icon={Sword}    active={oracleMode==="analysis"} onClick={() => setOracleMode("analysis")} />
                <OracleTab id="vault"    label="Vault"    icon={Trophy}   active={oracleMode==="vault"}    onClick={() => setOracleMode("vault")} />
                <OracleTab id="weekly"   label="Weekly"   icon={Calendar} active={oracleMode==="weekly"}   onClick={() => setOracleMode("weekly")} />
              </div>

              {/* Analysis tab */}
              {oracleMode === "analysis" && (
                <div style={S.card}>
                  {chatHistory.length === 0 && !loading && (
                    <AnalysisEmptyState specName={activeSpec} className={activeClass} onRun={sendInitial} loading={loading} />
                  )}
                  {loading && chatHistory.length <= 1 && (
                    <div style={{ padding: "8px 0" }}>
                      <p style={{ color: T.textDim, fontSize: 12, fontFamily: "'Cinzel', serif", letterSpacing: 1.5, margin: "0 0 16px", fontWeight: 700 }}>APEX</p>
                      <SkeletonBlock lines={8} />
                    </div>
                  )}
                  {chatHistory.length > 0 && (
                    <>
                      {chatHistory.map((msg, i) => (
                        <div key={i} style={S.chatMsg(msg.role)}>
                          <p style={{ fontSize: 11, fontFamily: "'Cinzel', serif", letterSpacing: 1.5, marginBottom: 8, color: msg.role === "user" ? T.goldDim : T.textDim, fontWeight: 700 }}>
                            {msg.role === "user" ? "YOU" : "APEX"}
                          </p>
                          {msg.role === "user"
                            ? <p style={{ color: T.textSub, fontSize: 14, margin: 0 }}>{msg.display || msg.content}</p>
                            : <ResponseBlock content={msg.content} />}
                        </div>
                      ))}
                      {loading && (
                        <div style={S.chatMsg("assistant")}>
                          <p style={{ fontSize: 11, fontFamily: "'Cinzel', serif", letterSpacing: 1.5, marginBottom: 12, color: T.textDim, fontWeight: 700 }}>APEX</p>
                          <SkeletonBlock lines={5} />
                        </div>
                      )}
                      <div ref={chatEndRef} />
                    </>
                  )}
                  {chatHistory.length > 0 && !loading && (
                    <div style={{ marginTop: 14, borderTop: `1px solid ${T.border}`, paddingTop: 14 }}>
                      <div style={{ display: "flex", gap: 8 }}>
                        <input style={{ ...S.input, flex: 1 }} placeholder="Ask a follow-up..."
                          value={followUp} onChange={e => setFollowUp(e.target.value)}
                          onKeyDown={e => e.key === "Enter" && sendFollowUp()} />
                        <button style={{ ...S.primaryBtn, padding: "12px 18px", flexShrink: 0, opacity: followUp.trim() ? 1 : 0.45 }} onClick={sendFollowUp} disabled={!followUp.trim()}>Ask</button>
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
                        {["Explain my Apex Talent", "Best Embellishment pair?", "Craft this week?", "ilvl vs stats?"].map(q => (
                          <button key={q} style={{ ...S.tag(false), fontSize: 13, padding: "8px 12px" }} onClick={() => setFollowUp(q)}>{q}</button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Vault tab */}
              {oracleMode === "vault" && (
                <div style={S.card}>
                  <VaultEmptyState />
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
                  <button style={{ ...S.primaryBtn, width: "100%", marginTop: 8, opacity: vaultItems.filter(v=>v.trim()).length < 1 || loading ? 0.45 : 1 }}
                    onClick={sendVaultAnalysis} disabled={vaultItems.filter(v=>v.trim()).length < 1 || loading}>
                    {loading
                      ? <span style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:8 }}><Loader2 size={16} style={{animation:"spin 1s linear infinite"}} />Analysing...</span>
                      : "Tell me which to pick →"}
                  </button>
                  {loading && <SkeletonBlock lines={6} />}
                  {chatHistory.map((msg, i) => {
                    if (!msg.display?.includes("Vault") || msg.role !== "user") return null;
                    const resp = chatHistory[i + 1];
                    if (!resp || resp.role !== "assistant") return null;
                    return (
                      <div key={i} style={{ ...S.chatMsg("assistant"), marginTop: 14 }}>
                        <p style={{ fontSize: 11, fontFamily: "'Cinzel', serif", letterSpacing: 1.5, marginBottom: 8, color: T.textDim, fontWeight: 700 }}>APEX</p>
                        <ResponseBlock content={resp.content} />
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Weekly tab */}
              {oracleMode === "weekly" && (
                <div style={S.card}>
                  <WeeklyEmptyState />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
                    <div>
                      <span style={S.label}>Sparks</span>
                      <select style={{ ...S.input, fontSize: 15 }} value={sparksAvailable} onChange={e => setSparksAvailable(e.target.value)}>
                        {["0","1","2","3","4","5+"].map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>
                    <div>
                      <span style={S.label}>Hero Crests</span>
                      <input style={{ ...S.input, fontSize: 15 }} type="number" min="0" max="100" placeholder="0–100" value={heroCrestsAvail} onChange={e => setHeroCrestsAvail(e.target.value)} />
                    </div>
                    <div>
                      <span style={S.label}>Myth Crests</span>
                      <input style={{ ...S.input, fontSize: 15 }} type="number" min="0" max="100" placeholder="0–100" value={mythCrestsAvail} onChange={e => setMythCrestsAvail(e.target.value)} />
                    </div>
                  </div>
                  <button style={{ ...S.primaryBtn, width: "100%", opacity: loading ? 0.45 : 1 }} onClick={sendWeeklyPlan} disabled={loading}>
                    {loading
                      ? <span style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:8 }}><Loader2 size={16} style={{animation:"spin 1s linear infinite"}} />Building plan...</span>
                      : "Generate this week's plan →"}
                  </button>
                  {loading && <SkeletonBlock lines={10} />}
                  {chatHistory.map((msg, i) => {
                    if (msg.display !== "Weekly Plan" || msg.role !== "user") return null;
                    const resp = chatHistory[i + 1];
                    if (!resp || resp.role !== "assistant") return null;
                    return (
                      <div key={i} style={{ ...S.chatMsg("assistant"), marginTop: 14 }}>
                        <p style={{ fontSize: 11, fontFamily: "'Cinzel', serif", letterSpacing: 1.5, marginBottom: 8, color: T.textDim, fontWeight: 700 }}>APEX — WEEK PLAN</p>
                        <ResponseBlock content={resp.content} />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </>
  );
}
