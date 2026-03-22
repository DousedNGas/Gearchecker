// ═══════════════════════════════════════════════════════════════
// THE FORGE ORACLE — Design North Star
// ═══════════════════════════════════════════════════════════════
// Before every decision, ask: "How intuitive is this for the user?"
//
// Principles:
//   1. Zero dead ends     — Every state has one clear next action
//   2. Progressive reveal — Complexity appears only when invited
//   3. Instant feedback   — Every action is immediately acknowledged
//   4. Forgiveness        — Nothing is permanent, everything is reversible
//   5. Self-teaching UI   — Hints & placeholders that actually educate
//   6. 3-second rule      — Any new screen must be understood in 3s
// ═══════════════════════════════════════════════════════════════

import { useState, useRef, useEffect, useCallback } from "react";

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

// WoW realm list — display name → slug (used for Raider.IO API)
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

// ── Fully illustrated class icons matching actual Blizzard designs ──
// Multi-color SVG art, no external images needed
const CLASS_ICON_RENDERERS = {

  // Death Knight: crowned skull with icy blue runes and glowing eyes
  "Death Knight": (p) => (<>
    <defs>
      <radialGradient id={`${p}dk-skull`} cx="45%" cy="40%" r="55%">
        <stop offset="0%" stopColor="#dce8ed"/><stop offset="100%" stopColor="#7a9ba8"/>
      </radialGradient>
    </defs>
    {/* Crown spikes */}
    <polygon points="7,16 9,4 12,15"  fill="#1a4e8a"/>
    <polygon points="13,12 16,2 19,12" fill="#1e63b0"/>
    <polygon points="20,15 23,4 25,16" fill="#1a4e8a"/>
    {/* Crown band */}
    <rect x="7" y="14" width="18" height="3" rx="1" fill="#1a4e8a"/>
    <rect x="7" y="14" width="18" height="1.5" rx="1" fill="#2979cc" opacity="0.6"/>
    {/* Skull dome */}
    <ellipse cx="16" cy="20" rx="10" ry="9" fill={`url(#${p}dk-skull)`}/>
    {/* Skull highlight */}
    <ellipse cx="13" cy="16" rx="4" ry="3" fill="white" opacity="0.18"/>
    {/* Eye sockets */}
    <ellipse cx="12.5" cy="19" rx="3.2" ry="3.5" fill="#0a1825"/>
    <ellipse cx="19.5" cy="19" rx="3.2" ry="3.5" fill="#0a1825"/>
    {/* Eye glow */}
    <ellipse cx="12.5" cy="19" rx="1.6" ry="1.8" fill="#2196f3" opacity="0.85"/>
    <ellipse cx="19.5" cy="19" rx="1.6" ry="1.8" fill="#2196f3" opacity="0.85"/>
    {/* Nose cavity */}
    <path d="M14.5 23.5 L16 21.5 L17.5 23.5 L17 25 L15 25 Z" fill="#0a1825" opacity="0.6"/>
    {/* Jaw */}
    <path d="M8 25 Q8 31 16 31 Q24 31 24 25" fill="#8eaab5"/>
    {/* Teeth */}
    <rect x="11"  y="27" width="2.5" height="3.2" rx="0.6" fill="#ecf4f7"/>
    <rect x="14.7" y="27" width="2.5" height="4"   rx="0.6" fill="#ecf4f7"/>
    <rect x="18.5" y="27" width="2.5" height="3.2" rx="0.6" fill="#ecf4f7"/>
  </>),

  // Demon Hunter: twin Warglaives of Azzinoth (curved crescent blades) + fel eye
  "Demon Hunter": (p) => (<>
    <defs>
      <linearGradient id={`${p}dh-blade`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6a0080"/><stop offset="100%" stopColor="#311244"/>
      </linearGradient>
    </defs>
    {/* Left warglaive – curved crescent blade, handle at bottom-left */}
    <path d="M4 28 C4 28 6 24 10 18 C13 13 12 7 15 5 C16 4 17 4 17 5 C15 8 16 13 13 18 C10 23 8 27 7 30 Z"
          fill={`url(#${p}dh-blade)`} stroke="#9c27b0" strokeWidth="0.5"/>
    {/* Right warglaive – mirrored */}
    <path d="M28 28 C28 28 26 24 22 18 C19 13 20 7 17 5 C16 4 15 4 15 5 C17 8 16 13 19 18 C22 23 24 27 25 30 Z"
          fill={`url(#${p}dh-blade)`} stroke="#9c27b0" strokeWidth="0.5"/>
    {/* Blade edge highlights */}
    <path d="M5 28 C5 28 7.5 23 11.5 17 C14 13 13 8 15.5 5.5" stroke="#ce93d8" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
    <path d="M27 28 C27 28 24.5 23 20.5 17 C18 13 19 8 16.5 5.5" stroke="#ce93d8" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
    {/* Handle pommels */}
    <ellipse cx="5.5"  cy="28.5" rx="2.2" ry="2.2" fill="#7b1fa2"/>
    <ellipse cx="26.5" cy="28.5" rx="2.2" ry="2.2" fill="#7b1fa2"/>
    {/* Central fel eye */}
    <circle cx="16" cy="16" r="5.5" fill="#1a0028"/>
    <circle cx="16" cy="16" r="3.8" fill="#39ff14" opacity="0.9"/>
    <path d="M14.8 9.5 C14.2 11.5 14 14 14 16 C14 18 14.2 20.5 14.8 22.5 L17.2 22.5 C17.8 20.5 18 18 18 16 C18 14 17.8 11.5 17.2 9.5 Z" fill="#0a0018"/>
    <ellipse cx="16" cy="16" rx="0.9" ry="2.2" fill="#b9ff6a" opacity="0.8"/>
    <ellipse cx="14.5" cy="14" rx="0.9" ry="1.3" fill="white" opacity="0.35"/>
  </>),

  // Druid: bear paw – main pad, 4 toes, 4 claws, warm brown
  "Druid": (p) => (<>
    <defs>
      <radialGradient id={`${p}druid-pad`} cx="40%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#a0522d"/><stop offset="100%" stopColor="#5c2a0e"/>
      </radialGradient>
    </defs>
    {/* Main pad */}
    <ellipse cx="16" cy="22" rx="8.5" ry="7" fill={`url(#${p}druid-pad)`}/>
    <ellipse cx="14" cy="20" rx="4" ry="3.5" fill="#c1682e" opacity="0.4"/>
    {/* 4 toe pads */}
    <ellipse cx="8"  cy="14" rx="3.5" ry="4" fill={`url(#${p}druid-pad)`}/>
    <ellipse cx="13" cy="11" rx="3.5" ry="4" fill={`url(#${p}druid-pad)`}/>
    <ellipse cx="19" cy="11" rx="3.5" ry="4" fill={`url(#${p}druid-pad)`}/>
    <ellipse cx="24" cy="14" rx="3.5" ry="4" fill={`url(#${p}druid-pad)`}/>
    {/* Toe highlights */}
    <ellipse cx="7"  cy="12.5" rx="1.5" ry="1.5" fill="#d4844a" opacity="0.45"/>
    <ellipse cx="12" cy="9.5"  rx="1.5" ry="1.5" fill="#d4844a" opacity="0.45"/>
    <ellipse cx="18" cy="9.5"  rx="1.5" ry="1.5" fill="#d4844a" opacity="0.45"/>
    <ellipse cx="23" cy="12.5" rx="1.5" ry="1.5" fill="#d4844a" opacity="0.45"/>
    {/* Claws */}
    <path d="M6 10.5 L4 6  L8 10"   fill="#3a1a06"/>
    <path d="M11 7.5  L10 3 L14 7"  fill="#3a1a06"/>
    <path d="M17 7.5  L18 3 L22 7"  fill="#3a1a06"/>
    <path d="M22 10.5 L24 6 L28 10" fill="#3a1a06"/>
  </>),

  // Evoker: draconic eye – wide horizontal, bronze iris, slit pupil, scaled lids
  "Evoker": (p) => (<>
    <defs>
      <radialGradient id={`${p}ev-iris`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#e8b84b"/><stop offset="100%" stopColor="#9c6e10"/>
      </radialGradient>
    </defs>
    {/* Scale texture around eye - top arc */}
    <path d="M4 16 C6 6 26 6 28 16" fill="#1a5c50" stroke="#0d3d34" strokeWidth="0.5"/>
    {/* Scale texture - bottom arc */}
    <path d="M4 16 C6 26 26 26 28 16" fill="#1a5c50" stroke="#0d3d34" strokeWidth="0.5"/>
    {/* Scale details top */}
    <path d="M8 12 C9 8 13 7 16 8 C19 7 23 8 24 12" fill="#237a68" stroke="#0d3d34" strokeWidth="0.4"/>
    {/* Scale details bottom */}
    <path d="M8 20 C9 24 13 25 16 24 C19 25 23 24 24 20" fill="#237a68" stroke="#0d3d34" strokeWidth="0.4"/>
    {/* Iris */}
    <ellipse cx="16" cy="16" rx="8" ry="7" fill={`url(#${p}ev-iris)`}/>
    {/* Inner iris ring */}
    <ellipse cx="16" cy="16" rx="5" ry="4.5" fill="#c8912a" opacity="0.7"/>
    {/* Slit pupil */}
    <path d="M14.5 9.5 C14 11.5 14 14 14 16 C14 18 14 20.5 14.5 22.5 L17.5 22.5 C18 20.5 18 18 18 16 C18 14 18 11.5 17.5 9.5 Z" fill="#050505"/>
    {/* Pupil inner glow */}
    <ellipse cx="16" cy="16" rx="0.8" ry="2" fill="#e8b84b" opacity="0.5"/>
    {/* Eye corner points */}
    <path d="M4 16 L7 13 L7 19 Z" fill="#0d3d34"/>
    <path d="M28 16 L25 13 L25 19 Z" fill="#0d3d34"/>
    {/* Highlight */}
    <ellipse cx="13.5" cy="13" rx="1.2" ry="1.8" fill="white" opacity="0.3"/>
  </>),

  // Hunter: recurve bow with nocked arrow, warm wood tones
  "Hunter": (p) => (<>
    <defs>
      <linearGradient id={`${p}hun-bow`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#a07828"/><stop offset="100%" stopColor="#5c3a0e"/>
      </linearGradient>
    </defs>
    {/* Bow stave – thick C shape */}
    <path d="M10 3 C4 8 4 24 10 29" stroke={`url(#${p}hun-bow)`} strokeWidth="3.5" fill="none" strokeLinecap="round"/>
    {/* Upper limb */}
    <path d="M10 3  C7 6 7 9 10 9"  stroke="#c89830" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    {/* Lower limb */}
    <path d="M10 23 C7 23 7 26 10 29" stroke="#c89830" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    {/* String */}
    <line x1="10" y1="3" x2="10" y2="29" stroke="#e8d090" strokeWidth="1" strokeOpacity="0.7"/>
    {/* Arrow shaft */}
    <line x1="10" y1="16" x2="27" y2="16" stroke="#9e6a1a" strokeWidth="2" strokeLinecap="round"/>
    {/* Arrowhead */}
    <polygon points="27,13.5 31.5,16 27,18.5" fill="#c0c0c8"/>
    {/* Arrow fletching – green feathers */}
    <path d="M12 16 L10 12 L11.5 16" fill="#558b2f"/>
    <path d="M12 16 L10 20 L11.5 16" fill="#2e7d32"/>
    {/* Arrow nock */}
    <rect x="9.5" y="14.5" width="2" height="3" rx="0.5" fill="#7b3f10"/>
    {/* Grip wrap */}
    <rect x="8.5" y="13" width="3" height="7" rx="0.5" fill="#5c3a0e" opacity="0.6"/>
  </>),

  // Mage: arcane staff with glowing orb – deep purple/blue
  "Mage": (p) => (<>
    <defs>
      <radialGradient id={`${p}mage-orb`} cx="40%" cy="35%" r="60%">
        <stop offset="0%" stopColor="#b39ddb"/><stop offset="60%" stopColor="#7c4dff"/><stop offset="100%" stopColor="#311b92"/>
      </radialGradient>
    </defs>
    {/* Staff shaft */}
    <path d="M7 30 L8.5 31 L22 8 L20.5 7 Z" fill="#5c3a0e"/>
    {/* Grip wrapping */}
    <line x1="9"  y1="27" x2="13" y2="20" stroke="#3a2208" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
    <line x1="10.5" y1="24" x2="14.5" y2="17" stroke="#3a2208" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
    {/* Orb housing/collar */}
    <path d="M17 11 C16 9 17 7 19 7 L22 7 L24 9 L22 11 Z" fill="#7c4dff" opacity="0.7"/>
    {/* Orb glow halo */}
    <circle cx="21" cy="7" r="7.5" fill="#7c4dff" opacity="0.15"/>
    {/* Main orb */}
    <circle cx="21" cy="7" r="5.5" fill={`url(#${p}mage-orb)`}/>
    {/* Orb inner sparkle */}
    <circle cx="21" cy="7" r="3" fill="white" opacity="0.14"/>
    {/* Orb highlight */}
    <ellipse cx="19" cy="5" rx="1.8" ry="2.2" fill="white" opacity="0.42"/>
    {/* Orb depth */}
    <circle cx="22.5" cy="9" r="1.5" fill="#1a0050" opacity="0.35"/>
  </>),

  // Monk: large gourd/jug on a diagonal staff – warm jade and brown
  "Monk": (p) => (<>
    <defs>
      <radialGradient id={`${p}monk-gourd`} cx="35%" cy="30%" r="65%">
        <stop offset="0%" stopColor="#c5e8a0"/><stop offset="60%" stopColor="#7cb342"/><stop offset="100%" stopColor="#33691e"/>
      </radialGradient>
    </defs>
    {/* Staff */}
    <path d="M6 31 L8 31 L26 3 L24 2 Z" fill="#6d3a14"/>
    {/* Grip line */}
    <line x1="7.5" y1="27" x2="11" y2="21" stroke="#3a1a06" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
    {/* Cord hanging gourd */}
    <line x1="18" y1="11" x2="14" y2="15" stroke="#a0720a" strokeWidth="1.5" strokeLinecap="round"/>
    {/* Gourd neck */}
    <ellipse cx="13" cy="16" rx="3" ry="3.5" fill="#8d6e28"/>
    {/* Gourd body */}
    <ellipse cx="12" cy="23" rx="7" ry="8" fill={`url(#${p}monk-gourd)`}/>
    {/* Gourd body shading */}
    <ellipse cx="14.5" cy="24" rx="3" ry="5" fill="#33691e" opacity="0.25"/>
    {/* Gourd highlight */}
    <ellipse cx="9.5" cy="19" rx="2.5" ry="3.5" fill="white" opacity="0.2"/>
    {/* Gourd stopper */}
    <ellipse cx="13" cy="12.5" rx="2.2" ry="1.4" fill="#5c3a0e"/>
    {/* Cork */}
    <ellipse cx="13" cy="11.5" rx="1.5" ry="1" fill="#a07828"/>
  </>),

  // Paladin: warhammer with holy light rays – gold and warm white
  "Paladin": (p) => (<>
    <defs>
      <radialGradient id={`${p}pal-glow`} cx="50%" cy="40%" r="55%">
        <stop offset="0%" stopColor="#fffde7"/><stop offset="100%" stopColor="#f57f17" stopOpacity="0"/>
      </radialGradient>
    </defs>
    {/* Light rays */}
    <line x1="16" y1="2"  x2="16" y2="7"  stroke="#ffe082" strokeWidth="1.8" strokeLinecap="round" opacity="0.7"/>
    <line x1="5"  y1="7"  x2="9"  y2="11" stroke="#ffe082" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
    <line x1="27" y1="7"  x2="23" y2="11" stroke="#ffe082" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
    <line x1="3"  y1="16" x2="8"  y2="16" stroke="#ffe082" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
    <line x1="29" y1="16" x2="24" y2="16" stroke="#ffe082" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
    {/* Glow halo behind head */}
    <ellipse cx="16" cy="13" rx="9" ry="8" fill={`url(#${p}pal-glow)`}/>
    {/* Hammer head */}
    <rect x="7.5" y="6" width="17" height="11" rx="2.5" fill="#d4a843"/>
    {/* Head top bevel */}
    <rect x="8.5" y="6.5" width="15" height="4" rx="1.5" fill="#ffd54f" opacity="0.55"/>
    {/* Head face engraving */}
    <rect x="10" y="10" width="12" height="2" rx="1" fill="#8B6914" opacity="0.4"/>
    {/* Handle */}
    <rect x="14.5" y="17" width="3" height="12" rx="1.5" fill="#8B6914"/>
    {/* Grip band */}
    <rect x="13.2" y="21.5" width="5.6" height="2" rx="1" fill="#c89830" opacity="0.6"/>
    {/* Pommel */}
    <circle cx="16" cy="30.5" r="2.8" fill="#c89830"/>
    <circle cx="16" cy="30.5" r="1.4" fill="#ffd54f" opacity="0.5"/>
  </>),

  // Priest: ankh – silver/white with holy glow
  "Priest": (p) => (<>
    <defs>
      <radialGradient id={`${p}pri-glow`} cx="50%" cy="35%" r="55%">
        <stop offset="0%" stopColor="white" stopOpacity="0.25"/><stop offset="100%" stopColor="white" stopOpacity="0"/>
      </radialGradient>
    </defs>
    {/* Halo glow */}
    <circle cx="16" cy="10" r="10" fill={`url(#${p}pri-glow)`}/>
    {/* The loop – ring (drawn as thick stroke) */}
    <circle cx="16" cy="10" r="6.5" fill="none" stroke="#d0d8e8" strokeWidth="3.8"/>
    {/* Vertical bar */}
    <rect x="14.2" y="16" width="3.6" height="13.5" rx="1.8" fill="#d0d8e8"/>
    {/* Horizontal bar */}
    <rect x="7.5" y="19.5" width="17" height="3.6" rx="1.8" fill="#d0d8e8"/>
    {/* Highlights */}
    <circle cx="16" cy="10" r="6.5" fill="none" stroke="white" strokeWidth="1" opacity="0.45"/>
    <rect x="15.2" y="16" width="1.5" height="6" rx="0.7" fill="white" opacity="0.3"/>
    <rect x="8.5" y="20.5" width="7" height="1.5" rx="0.7" fill="white" opacity="0.3"/>
  </>),

  // Rogue: single ornate dagger – steel blade, dark handle, gold guard
  "Rogue": (p) => (<>
    <defs>
      <linearGradient id={`${p}rog-blade`} x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#b0bec5"/><stop offset="50%" stopColor="#eceff1"/><stop offset="100%" stopColor="#78909c"/>
      </linearGradient>
    </defs>
    {/* Blade – angled, tip upper-right */}
    <path d="M7 27 L9.5 30 L28 8 L25.5 5 Z" fill={`url(#${p}rog-blade)`}/>
    {/* Fuller groove */}
    <path d="M10.5 26.5 L12 28.5 L27.5 9.5 L26 8 Z" fill="#546e7a" opacity="0.35"/>
    {/* Blade edge highlight */}
    <line x1="9" y1="29" x2="27.5" y2="6.5" stroke="white" strokeWidth="0.6" strokeOpacity="0.5"/>
    {/* Crossguard */}
    <path d="M6.5 22.5 L10.5 19 L13.5 22 L9.5 25.5 Z" fill="#d4a843"/>
    {/* Guard highlight */}
    <path d="M7 22.5 L10.5 19.5 L12 21 L8.5 24.5 Z" fill="#ffd54f" opacity="0.45"/>
    {/* Handle */}
    <path d="M4.5 22 L7 24.5 L10 22 L7.5 19.5 Z" fill="#3a1a06"/>
    {/* Wrap lines */}
    <line x1="5.5" y1="22.5" x2="8" y2="25"   stroke="#5c3a0e" strokeWidth="1" opacity="0.6"/>
    <line x1="6"   y1="21"   x2="8.5" y2="23.5" stroke="#5c3a0e" strokeWidth="1" opacity="0.6"/>
    {/* Pommel */}
    <ellipse cx="5" cy="25.5" rx="3" ry="3" fill="#d4a843"/>
    <ellipse cx="5" cy="25.5" rx="1.5" ry="1.5" fill="#ffd54f" opacity="0.55"/>
  </>),

  // Shaman: lightning bolt – bright yellow-white with blue glow
  "Shaman": (p) => (<>
    <defs>
      <filter id={`${p}sha-blur`}><feGaussianBlur stdDeviation="1.5"/></filter>
      <linearGradient id={`${p}sha-bolt`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#fff9c4"/><stop offset="50%" stopColor="#ffeb3b"/><stop offset="100%" stopColor="#f57f17"/>
      </linearGradient>
    </defs>
    {/* Glow blur layer */}
    <path d="M21 2 L10.5 17.5 L18 17.5 L11 30 L23 13.5 L15.5 13.5 Z"
          fill="#2196f3" opacity="0.4" filter={`url(#${p}sha-blur)`}/>
    {/* Blue outer bolt */}
    <path d="M21 2 L10.5 17.5 L18 17.5 L11 30 L23 13.5 L15.5 13.5 Z" fill="#1976d2" opacity="0.5"/>
    {/* Main bright bolt */}
    <path d="M21 2 L10.5 17.5 L18 17.5 L11 30 L23 13.5 L15.5 13.5 Z" fill={`url(#${p}sha-bolt)`}/>
    {/* Hot core */}
    <path d="M20 5 L13 17 L18 17 L14 27 L21 15 L16 15 Z" fill="white" opacity="0.55"/>
  </>),

  // Warlock: demonic hand with fel flame – purple shadow, green fire
  "Warlock": (p) => (<>
    <defs>
      <radialGradient id={`${p}wl-flame`} cx="50%" cy="80%" r="70%">
        <stop offset="0%" stopColor="#76ff03"/><stop offset="60%" stopColor="#00c853"/><stop offset="100%" stopColor="#1b5e20" stopOpacity="0.3"/>
      </radialGradient>
    </defs>
    {/* Flame */}
    <path d="M16 14 C13 9 11 5.5 13.5 3 C14 6 15 7.5 16 5.5 C17 7.5 18 6 18.5 3 C21 5.5 19 9 16 14 Z" fill={`url(#${p}wl-flame)`}/>
    <path d="M13 12 C11 9 10 6.5 11.5 4.5 C12 7 12.5 9 12.5 11 Z" fill="#69f0ae" opacity="0.65"/>
    <path d="M19 12 C21 9 22 6.5 20.5 4.5 C20 7 19.5 9 19.5 11 Z" fill="#69f0ae" opacity="0.65"/>
    {/* Knuckles */}
    <ellipse cx="11.5" cy="13.5" rx="1.5" ry="1" fill="#7b1fa2" opacity="0.5"/>
    <ellipse cx="15.5" cy="12"   rx="1.5" ry="1" fill="#7b1fa2" opacity="0.5"/>
    <ellipse cx="19.5" cy="12"   rx="1.5" ry="1" fill="#7b1fa2" opacity="0.5"/>
    {/* Fingers */}
    <rect x="9.5"  y="13" width="3"   height="7"   rx="1.5" fill="#6a1b9a"/>
    <rect x="13.2" y="11.5" width="3" height="7.5" rx="1.5" fill="#7b1fa2"/>
    <rect x="17"   y="11.5" width="3" height="7.5" rx="1.5" fill="#7b1fa2"/>
    <rect x="20.8" y="13"   width="2.8" height="7" rx="1.4" fill="#6a1b9a"/>
    {/* Thumb */}
    <path d="M7 20 C6.5 17 8 15 9.5 16 L9.5 21 C9.5 22.5 8.5 23.5 8 23 C7.5 22.5 7 21 7 20 Z" fill="#7b1fa2"/>
    {/* Palm */}
    <path d="M9.5 20 C9 16.5 10 15.5 16 15.5 C22 15.5 23 16.5 22.5 20 L21.5 27.5 C20.5 29.5 11.5 29.5 10.5 27.5 Z" fill="#7b1fa2"/>
    {/* Palm vein/highlight */}
    <path d="M13 22 C14 19 18 19 19 22" stroke="#9c27b0" strokeWidth="0.8" fill="none" opacity="0.5"/>
  </>),

  // Warrior: broad sword – steel blade, golden crossguard, wrapped handle
  "Warrior": (p) => (<>
    <defs>
      <linearGradient id={`${p}war-blade`} x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#90a4ae"/><stop offset="45%" stopColor="#eceff1"/><stop offset="100%" stopColor="#607d8b"/>
      </linearGradient>
    </defs>
    {/* Blade */}
    <path d="M7 27 L9.5 30 L28 8.5 L25.5 6 Z" fill={`url(#${p}war-blade)`}/>
    {/* Fuller */}
    <path d="M10.5 26.5 L12 28.5 L27.5 10 L26 8.5 Z" fill="#546e7a" opacity="0.3"/>
    {/* Blade edge */}
    <line x1="9" y1="29.5" x2="27" y2="7" stroke="white" strokeWidth="0.7" strokeOpacity="0.55"/>
    {/* Tip fuller tapers */}
    <path d="M25.5 6 L27.5 4 L29.5 6.5 L28 8.5 Z" fill="#b0bec5"/>
    {/* Crossguard */}
    <path d="M5 21.5 L8 24.5 L16.5 16.5 L13.5 13.5 Z" fill="#d4a843"/>
    <path d="M13.5 13.5 L16.5 16.5 L19.5 13.5 L16.5 10.5 Z" fill="#d4a843"/>
    {/* Guard highlight */}
    <path d="M5.5 21.5 L8 24 L14.5 18 L12 15.5 Z" fill="#ffd54f" opacity="0.4"/>
    {/* Handle */}
    <path d="M4 21.5 L6.5 24 L9.5 21 L7 18.5 Z" fill="#3a1a06"/>
    {/* Wrap */}
    <line x1="4.5" y1="22.5" x2="7.5" y2="25.5" stroke="#5c3a0e" strokeWidth="1" opacity="0.6"/>
    <line x1="5.5" y1="21"   x2="8.5" y2="24"   stroke="#5c3a0e" strokeWidth="1" opacity="0.6"/>
    {/* Pommel */}
    <circle cx="4.5" cy="24.5" r="3.2" fill="#c89830"/>
    <circle cx="4.5" cy="24.5" r="1.6" fill="#ffd54f" opacity="0.5"/>
  </>),
};

CLASS_ICON_RENDERERS["Devourer"] = CLASS_ICON_RENDERERS["Demon Hunter"];

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
const CONTENT_TYPES = ["Mythic+ Dungeons", "Raid (Normal/Heroic)", "Raid (Mythic)", "Bountiful Delves", "Prey (Hard/Nightmare)", "PvP", "World Content"];
const PRIORITIES = ["Maximize DPS", "Maximize Survivability", "Balance Both", "Support/Utility"];

// ── Class Icon ────────────────────────────────────────────────────
function ClassIcon({ name, color, size = 24, style = {} }) {
  const id = (name || "").replace(/\s/g, "");
  const renderer = CLASS_ICON_RENDERERS[name] || CLASS_ICON_RENDERERS["Warrior"];
  return (
    <svg width={size} height={size} viewBox="0 0 32 32"
      style={{ borderRadius: 5, flexShrink: 0, display: "block",
               filter: `drop-shadow(0 0 3px ${color}55)`, ...style }}>
      <defs>
        <linearGradient id={`cbg-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e1610"/><stop offset="100%" stopColor="#0a0808"/>
        </linearGradient>
        <linearGradient id={`cbd-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.9"/>
          <stop offset="100%" stopColor={color} stopOpacity="0.35"/>
        </linearGradient>
        <clipPath id={`cclip-${id}`}><rect width="32" height="32" rx="4"/></clipPath>
      </defs>
      {/* Background */}
      <rect width="32" height="32" fill={`url(#cbg-${id})`} rx="4"/>
      {/* Icon art clipped to bounds */}
      <g clipPath={`url(#cclip-${id})`}>
        {renderer()}
      </g>
      {/* Inner top sheen */}
      <rect x="1" y="1" width="30" height="12" rx="3" fill="white" fillOpacity="0.05"/>
      {/* Colored border */}
      <rect x="0.5" y="0.5" width="31" height="31" rx="4" fill="none"
        stroke={`url(#cbd-${id})`} strokeWidth="1.5"/>
    </svg>
  );
}

// ── Shared UI Components ─────────────────────────────────────────
function RunicDivider({ label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0" }}>
      <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, transparent, #C89B3C35)" }} />
      {label
        ? <span style={{ color: "#C89B3C50", fontSize: 10, fontFamily: "'Cinzel', serif", letterSpacing: 2, whiteSpace: "nowrap" }}>{label}</span>
        : <span style={{ color: "#C89B3C35", fontSize: 14 }}>✦</span>}
      <div style={{ flex: 1, height: 1, background: "linear-gradient(to left, transparent, #C89B3C35)" }} />
    </div>
  );
}

function IlvlBadge({ ilvl }) {
  const n = parseInt(ilvl);
  if (!ilvl || isNaN(n)) return null;
  // Midnight Season 1 gear tracks:
  // Myth: 272–289 | Hero: 259–269 | Champion: 246–256 | Veteran: 233–243 | Adventurer: 220–230 | Unranked: 207–217
  const color = n >= 272 ? "#E6CC80"   // Myth track — gold
               : n >= 259 ? "#A335EE"  // Hero track — purple
               : n >= 246 ? "#0070DD"  // Champion track — blue
               : n >= 233 ? "#1EFF00"  // Veteran track — green
               : n >= 220 ? "#9D9D9D"  // Adventurer track — grey
               : "#7A7A7A";            // Unranked — dim grey
  return <span style={{ color, fontSize: 11, fontWeight: 700, fontFamily: "monospace", textShadow: `0 0 6px ${color}50` }}>{n}</span>;
}

const RUNES = ["ᚠ", "ᚢ", "ᚦ", "ᚨ", "ᚱ", "ᚲ", "ᚷ", "ᚹ", "ᚺ", "ᚾ"];

function LoadingRunes() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % RUNES.length), 120);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: 8, padding: "14px 0" }}>
      {RUNES.map((r, i) => (
        <span key={i} style={{ fontSize: 16, color: i === active ? "#C89B3C" : "#C89B3C20", textShadow: i === active ? "0 0 10px #C89B3C" : "none", transition: "all 0.1s" }}>{r}</span>
      ))}
    </div>
  );
}

function Breadcrumb({ steps, current }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 20, flexWrap: "wrap" }}>
      {steps.map((s, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ fontSize: 10, fontFamily: "'Cinzel', serif", letterSpacing: 1, color: i < current ? "#C89B3C70" : i === current ? "#C89B3C" : "#2A1A0A", transition: "color 0.3s" }}>
            {i < current ? "✓ " : ""}{s}
          </span>
          {i < steps.length - 1 && <span style={{ color: "#2A1A0A", fontSize: 9 }}>›</span>}
        </div>
      ))}
    </div>
  );
}

function ModeCard({ icon, title, badge, badgeColor = "#C89B3C", description, hint, selected, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        background: selected ? "linear-gradient(135deg, rgba(200,155,60,0.1), rgba(200,155,60,0.04))" : hovered ? "rgba(255,255,255,0.025)" : "rgba(255,255,255,0.01)",
        border: `1px solid ${selected ? "rgba(200,155,60,0.45)" : hovered ? "rgba(200,155,60,0.18)" : "rgba(255,255,255,0.05)"}`,
        borderRadius: 10, padding: "16px 18px", cursor: "pointer", textAlign: "left",
        transition: "all 0.2s", width: "100%", position: "relative", overflow: "hidden",
        boxShadow: selected ? "0 0 20px rgba(200,155,60,0.1)" : "none",
      }}>
      {selected && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(to right, transparent, #C89B3C80, transparent)" }} />}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
        <span style={{ fontSize: 20, lineHeight: 1, marginTop: 1, flexShrink: 0 }}>{icon}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
            <span style={{ color: selected ? "#E8D5A3" : "#8A7A6A", fontFamily: "'Cinzel', serif", fontSize: 13, fontWeight: 600 }}>{title}</span>
            <span style={{ fontSize: 9, fontFamily: "'Cinzel', serif", letterSpacing: 1, padding: "2px 7px", borderRadius: 20, background: `${badgeColor}18`, color: badgeColor, border: `1px solid ${badgeColor}35`, flexShrink: 0 }}>{badge}</span>
          </div>
          <p style={{ color: "#4A3A2A", fontSize: 12, margin: "0 0 4px", lineHeight: 1.5 }}>{description}</p>
          <p style={{ color: "#2A1A0A", fontSize: 11, margin: 0, fontStyle: "italic" }}>{hint}</p>
        </div>
        <div style={{ width: 18, height: 18, borderRadius: "50%", flexShrink: 0, marginTop: 2, border: `2px solid ${selected ? "#C89B3C" : "#2A1A0A"}`, background: selected ? "#C89B3C" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
          {selected && <span style={{ color: "#1A0E00", fontSize: 9, fontWeight: 900 }}>✓</span>}
        </div>
      </div>
    </button>
  );
}

function GearPreviewGrid({ gear }) {
  const filled = gear.filter(g => g.name);
  const withIlvl = filled.filter(g => g.ilvl && !isNaN(parseInt(g.ilvl)));
  const avg = withIlvl.length > 0
    ? Math.round(withIlvl.reduce((a, g) => a + parseInt(g.ilvl), 0) / withIlvl.length)
    : 0;
  return (
    <div style={{ marginTop: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ color: "#C89B3C", fontSize: 11, fontFamily: "'Cinzel', serif", letterSpacing: 1 }}>
          {filled.length} / {gear.length} SLOTS DETECTED
        </span>
        {avg > 0 && <span style={{ color: "#5A4A3A", fontSize: 11 }}>Avg ilvl <IlvlBadge ilvl={avg} /></span>}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}>
        {gear.map((slot, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 10px", borderRadius: 4, background: slot.name ? "rgba(200,155,60,0.04)" : "rgba(0,0,0,0.15)", border: `1px solid ${slot.name ? "rgba(200,155,60,0.12)" : "rgba(255,255,255,0.02)"}` }}>
            <span style={{ color: "#3A2A1A", fontSize: 10, fontFamily: "'Cinzel', serif", flexShrink: 0 }}>{slot.label}</span>
            {slot.name
              ? <span style={{ color: "#6A5A4A", fontSize: 10, textAlign: "right", maxWidth: "62%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginLeft: 6 }}>
                  {slot.ilvl && <><IlvlBadge ilvl={slot.ilvl} />{" "}</>}{slot.name}
                </span>
              : <span style={{ color: "#1A0A00", fontSize: 10, fontStyle: "italic" }}>—</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

function ResponseBlock({ content }) {
  if (!content) return null;
  return (
    <div style={{ lineHeight: 1.85 }}>
      {content.split("\n").filter(l => l.trim()).map((line, i) => {
        if (line.startsWith("##")) return (
          <h3 key={i} style={{ color: "#C89B3C", fontSize: 13, fontFamily: "'Cinzel', serif", fontWeight: 700, marginTop: 16, marginBottom: 5, textShadow: "0 0 8px #C89B3C30", letterSpacing: 1 }}>
            {line.replace(/^#+\s*/, "")}
          </h3>
        );
        if (line.startsWith("- ") || line.startsWith("• ")) {
          const html = line.replace(/^[-•]\s*/, "").replace(/\*\*(.+?)\*\*/g, '<strong style="color:#D8C090">$1</strong>');
          return (
            <div key={i} style={{ display: "flex", gap: 8, margin: "4px 0", paddingLeft: 4 }}>
              <span style={{ color: "#C89B3C35", flexShrink: 0, marginTop: 4, fontSize: 8 }}>◆</span>
              <span style={{ color: "#9A8A78", fontSize: 13 }} dangerouslySetInnerHTML={{ __html: html }} />
            </div>
          );
        }
        const html = line.replace(/\*\*(.+?)\*\*/g, '<strong style="color:#C8A870">$1</strong>');
        return <p key={i} style={{ color: "#7A6A5A", fontSize: 13, margin: "5px 0" }} dangerouslySetInnerHTML={{ __html: html }} />;
      })}
    </div>
  );
}

// ── Main App ─────────────────────────────────────────────────────
export default function ForgeOracle() {
  const [step, setStep] = useState(0);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSpec, setSelectedSpec] = useState(null);
  const [inputMode, setInputMode] = useState(null);

  const [detectedGear, setDetectedGear] = useState([]);
  const [gearSummary, setGearSummary] = useState("");

  const [rioName, setRioName] = useState("");
  const [rioRealm, setRioRealm] = useState("");
  const [rioRegion, setRioRegion] = useState("us");
  const [rioLoading, setRioLoading] = useState(false);
  const [rioError, setRioError] = useState("");
  const [realmSuggestions, setRealmSuggestions] = useState([]);
  const [showRealmDrop, setShowRealmDrop] = useState(false);

  const [simcString, setSimcString] = useState("");
  const [simcParsed, setSimcParsed] = useState(null);

  const [manualGear, setManualGear] = useState(() =>
    Object.fromEntries(GEAR_SLOTS.map(s => [s.key, { name: "", ilvl: "" }]))
  );

  const [content, setContent] = useState([]);
  const [priority, setPriority] = useState(PRIORITIES[0]);
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [followUp, setFollowUp] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chatHistory, loading]);

  const classData = CLASSES.find(c => c.name === selectedClass);

  const parseSimC = useCallback((str) => {
    if (!str.trim()) return null;
    // Maps SimC line keys → GEAR_SLOTS keys (note: SimC uses main_hand/off_hand, we normalise to mainhand/offhand)
    const slotMap = {
      head: "head", neck: "neck", shoulder: "shoulder", back: "back",
      chest: "chest", wrist: "wrist", hands: "hands", waist: "waist",
      legs: "legs", feet: "feet", finger1: "finger1", finger2: "finger2",
      trinket1: "trinket1", trinket2: "trinket2",
      main_hand: "mainhand", off_hand: "offhand",   // normalise SimC keys → GEAR_SLOTS keys
    };
    const found = {};
    const ilvls = [];
    for (const line of str.split("\n")) {
      const t = line.trim();
      if (t.startsWith("#") || !t.includes("=")) continue;
      const eqIdx = t.indexOf("=");
      const rawKey = t.slice(0, eqIdx).trim();
      const val = t.slice(eqIdx + 1).trim();
      const slotKey = slotMap[rawKey];
      if (slotKey) {
        const parts = val.split(",");
        const itemName = parts[0].replace(/_/g, " ").replace(/"/g, "").trim();
        const ilvlM = val.match(/ilevel=(\d+)/);
        const ilvl = ilvlM ? parseInt(ilvlM[1]) : null;
        if (ilvl) ilvls.push(ilvl);
        found[slotKey] = { key: slotKey, name: itemName || "", ilvl };
      }
    }
    const gear = GEAR_SLOTS.map(s => {
      const hit = found[s.key];
      return hit ? { ...s, name: hit.name, ilvl: hit.ilvl } : { ...s, name: "", ilvl: null };
    });
    const filled = gear.filter(g => g.name && g.name.length > 1);
    if (filled.length === 0) return null;
    const avgIlvl = ilvls.length
      ? Math.round(ilvls.reduce((a, b) => a + b, 0) / ilvls.length)
      : null;
    return { gear, filled: filled.length, avgIlvl };
  }, []);

  useEffect(() => {
    if (inputMode === "simc" && simcString.length > 80) setSimcParsed(parseSimC(simcString));
    else setSimcParsed(null);
  }, [simcString, inputMode, parseSimC]);

  const toRealmSlug = (name) => name.trim().toLowerCase().replace(/\s+/g, "-").replace(/'/g, "").replace(/[^a-z0-9-]/g, "");

  const fetchRaiderIO = async () => {
    if (!rioName.trim() || !rioRealm.trim()) return;
    setRioLoading(true); setRioError(""); setDetectedGear([]);
    try {
      const realm = toRealmSlug(rioRealm);
      const apiUrl = `https://raider.io/api/v1/characters/profile?region=${rioRegion}&realm=${realm}&name=${encodeURIComponent(rioName.trim())}&fields=gear`;
      // Use CORS proxy to bypass sandbox restrictions
      const res = await fetch(`https://corsproxy.io/?${encodeURIComponent(apiUrl)}`);
      if (!res.ok) { const e = await res.json().catch(() => ({})); throw new Error(e.message || `Character not found (${res.status}). Check name, realm and region.`); }
      const data = await res.json();
      const items = data.gear?.items || {};
      const gearArray = GEAR_SLOTS.map(slot => {
        const item = items[slot.key];
        return { ...slot, name: item?.name || "", ilvl: item?.item_level || null };
      });
      setDetectedGear(gearArray);
      const filled = gearArray.filter(g => g.name);
      const avg = filled.filter(g => g.ilvl).length
        ? Math.round(filled.filter(g => g.ilvl).reduce((a, g) => a + g.ilvl, 0) / filled.filter(g => g.ilvl).length)
        : 0;
      setGearSummary(`Character: ${data.name} (${data.class} — ${data.active_spec_name}), avg ilvl ${avg}.\nEquipped gear:\n` + filled.map(g => `${g.label}: ${g.name}${g.ilvl ? ` (ilvl ${g.ilvl})` : ""}`).join("\n"));
    } catch (e) { setRioError(e.message || "Fetch failed. Check name/realm spelling."); }
    setRioLoading(false);
  };

  const buildGearContext = () => {
    if (inputMode === "rio" && gearSummary) return gearSummary;
    if (inputMode === "simc" && simcParsed) {
      return `SimC string — ${simcParsed.filled} items${simcParsed.avgIlvl ? `, avg ilvl ${simcParsed.avgIlvl}` : ""}:\n` +
        simcParsed.gear.filter(g => g.name).map(g => `${g.label}: ${g.name}${g.ilvl ? ` (ilvl ${g.ilvl})` : ""}`).join("\n");
    }
    if (inputMode === "manual") {
      const filled = GEAR_SLOTS.filter(s => manualGear[s.key]?.name?.trim());
      return filled.length === 0 ? "No gear specified — give general spec advice." :
        "Manually entered gear:\n" + filled.map(s => `${s.label}: ${manualGear[s.key].name}${manualGear[s.key].ilvl ? ` (ilvl ${manualGear[s.key].ilvl})` : ""}`).join("\n");
    }
    return "No gear data — give general spec advice.";
  };

  const sysPrompt = () => `You are The Forge Oracle — a WoW expert for the current expansion, World of Warcraft: Midnight (Season 1, launched March 2026). You teach the WHY behind gear decisions, not just the what. You are the antidote to sites that output answers without explanation.

Player: ${selectedSpec} ${selectedClass}
Content: ${content.join(", ") || "general"}
Priority: ${priority}

Gear:
${buildGearContext()}

== MIDNIGHT SEASON 1 KNOWLEDGE BASE (as of March 2026) ==

GEAR TRACKS & ITEM LEVELS:
- Unranked: 207–217 (quest/Normal dungeon drops, cannot be upgraded)
- Adventurer: 220–230 (4 upgrade tiers, world content, Heroic dungeons, Tier 1-4 Delves)
- Veteran: 233–243 (4 upgrade tiers, Pinnacle Cache, Tier 5-6 Delves, M0, LFR)
- Champion: 246–256 (4 upgrade tiers, world bosses, Tier 7-11 Delves, M+1-5, Normal raid)
- Hero: 259–269 (4 upgrade tiers, Tier 8-11 Bountiful Delves, M+6+, Heroic raid)
- Myth: 272–289 (6 upgrade tiers — max 289, M+10+, Mythic raid)

UPGRADE CURRENCY — DAWNCRESTS (Valorstones are GONE):
- Each upgrade rank costs 20 Dawncrests of the matching track type
- Weekly cap: 100 Dawncrests per type (5 upgrades per track per week)
- Upgrading below your slot's highest recorded ilvl costs 0 Dawncrests (FREE — huge alt benefit)
- Five types: Adventurer, Veteran, Champion, Hero, Myth Dawncrests
- Crests drop from raids, M+, Bountiful Delves, Prey (Hard/Nightmare), and flying sparks in open world

CRAFTING — SPARK OF RADIANCE:
- 1 Spark per week from weekly quests (Lady Liadrin + Lor'themar World Tour = 2 sparks Week 1)
- Most crafted items cost 2 Sparks; 2-handed/ranged weapons cost 4 Sparks
- Base crafted epic: up to 259 ilvl
- +80 Hero Dawncrests as optional reagent: up to 272 ilvl
- +80 Myth Dawncrests as optional reagent: up to 285 ilvl (5/6 Myth equivalent)
- Embellishments: powerful optional effects on crafted gear, max 2 equipped simultaneously — these are often the primary reason to craft, not just the ilvl
- CRITICAL: NEVER craft into Tier Set slots (Head, Shoulders, Chest, Hands, Legs) — crafted gear CANNOT be converted at the Catalyst. Non-Tier slots only.
- Crafting orders go through Mar'nah in The Bazaar, Silvermoon City
- Thalassian Missive = stat customization (choose your secondary stats)
- Bracers, Cloak, Belt, Boots, Neck, Rings are safe craft targets

CONTENT SOURCES:
- M+: Season 1 started March 24, 2026. M0 on daily lockout. Great Vault scales to M+18.
- Raids: The Voidspire (6-boss progression raid), The Dreamrift (1-boss), March on Quel'Danas (2-boss)
- Tier Set pieces drop from Voidspire raid. Tier slots: Head, Shoulders, Chest, Hands, Legs.
- Bountiful Delves (solo, with Valeera companion): require Restored Coffer Key, drop Hero-track gear at Tier 8-11
- Prey System (NEW in Midnight): open-world hunting, Normal/Hard/Nightmare. Hard/Nightmare give Dawncrest income and gear rewards
- Great Vault: fill 1/4/8 M+ keys per week for 1/2/3 dungeon slots; fill raid/world activity slots separately

CLASS CHANGES IN MIDNIGHT:
- Level cap is now 90 (+10 talent points from TWW)
- Apex Talents: each spec has a new 4th talent lane with a defining empowered ability — rotations anchor around this
- All specs redesigned for addon-free play — rotations simplified, button bloat reduced
- Burst normalization: extreme cooldown stacking flattened. Consistent uptime specs gain value.
- Devourer Demon Hunter: NEW 3rd DH spec — Void-powered mid-range DPS, fragment consumption and empowered void states
- Stat squish happened January 20, 2026 (pre-patch). Old TWW gear ilvl numbers no longer apply.

GEARING STRATEGY RULES TO CITE:
- Weapons first: highest throughput per ilvl point of any slot
- Don't craft Tier slots — use Sparks on non-Tier armor, weapons, or jewelry
- Two Embellishments should be planned as a pair before first craft
- Spending all lower-track crests before M+ opens each week — they lose value fast once Hero gear flows
- Free upgrades from highest-slot tracking — use this aggressively on alts
- 4 Preys + 4 Delves per week efficiently fills all three Great Vault World Activity slots

Rules for your responses:
- Always reference the Midnight system accurately (Dawncrests, not Valor; Sparks of Radiance, not Progenitor Embers etc.)
- Explain MECHANICAL REASONS for every recommendation (Apex Talent synergy, Embellishment interactions, stat breakpoints)
- Reference their actual gear when you have it — no generic advice when specific is possible
- Flag crafting mistakes (Tier slot waste, wrong Embellishment pairing, hoarding lower crests)
- Format: ## headers, **bold** for item/stat names, bullets for lists. Thorough but scannable.`;

  const sendInitial = async () => {
    setLoading(true); setStep(5);
    const msg = `Analyse my gear and give me:\n1. My stat priority with the mechanical reason each stat matters for my Midnight rotation and Apex Talent\n2. My biggest upgrade opportunities based on my actual current items and the Midnight gear tracks\n3. What I should craft with my Sparks of Radiance (and which slots to avoid because they're Tier slots)\n4. My optimal Embellishment pairing and why\n5. Anything immediately wrong with my setup — Dawncrests being wasted, wrong upgrade priority, or easy free wins I'm missing`;
    setChatHistory([{ role: "user", content: msg, display: "Analysing your gear loadout..." }]);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system: sysPrompt(), messages: [{ role: "user", content: msg }] }),
      });
      const data = await res.json();
      const text = data.content?.map(b => b.text || "").join("") || "No response.";
      setChatHistory([{ role: "user", content: msg, display: "Initial gear analysis" }, { role: "assistant", content: text }]);
    } catch {
      setChatHistory([{ role: "user", content: msg, display: "Initial gear analysis" }, { role: "assistant", content: "Connection lost. Please try again." }]);
    }
    setLoading(false);
  };

  const sendFollowUp = async () => {
    if (!followUp.trim() || loading) return;
    const text = followUp.trim(); setFollowUp(""); setLoading(true);
    const hist = [...chatHistory, { role: "user", content: text }];
    setChatHistory(hist);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system: sysPrompt(), messages: hist.map(m => ({ role: m.role, content: m.content })) }),
      });
      const data = await res.json();
      setChatHistory([...hist, { role: "assistant", content: data.content?.map(b => b.text || "").join("") || "No response." }]);
    } catch { setChatHistory([...hist, { role: "assistant", content: "Connection lost." }]); }
    setLoading(false);
  };

  const reset = () => {
    setStep(0); setSelectedClass(null); setSelectedSpec(null); setInputMode(null);
    setDetectedGear([]); setGearSummary(""); setRioName(""); setRioRealm(""); setRioRegion("us"); setRioError("");
    setSimcString(""); setSimcParsed(null);
    setManualGear(Object.fromEntries(GEAR_SLOTS.map(s => [s.key, { name: "", ilvl: "" }])));
    setContent([]); setPriority(PRIORITIES[0]); setChatHistory([]); setFollowUp("");
  };

  const manualFilled = GEAR_SLOTS.filter(s => manualGear[s.key]?.name?.trim()).length;

  // ── Styles (design tokens) ───────────────────────────────────
  const gold = "#C89B3C";
  const S = {
    app: { minHeight: "100vh", background: "#070508", backgroundImage: "radial-gradient(ellipse at 20% 20%, rgba(139,90,43,0.07) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(60,30,80,0.06) 0%, transparent 50%)", fontFamily: "'IM Fell English', serif", color: "#B8A88A", padding: "20px 16px 80px" },
    wrap: { maxWidth: 720, margin: "0 auto" },
    panel: { background: "linear-gradient(150deg, rgba(20,15,11,0.98), rgba(13,10,17,0.98))", border: "1px solid rgba(200,155,60,0.16)", borderRadius: 10, padding: 24, boxShadow: "0 8px 48px rgba(0,0,0,0.6), inset 0 1px 0 rgba(200,155,60,0.07)" },
    label: { fontFamily: "'Cinzel', serif", color: gold, fontSize: 10, letterSpacing: 3, textTransform: "uppercase", marginBottom: 10, display: "block" },
    input: { background: "rgba(0,0,0,0.45)", border: "1px solid rgba(200,155,60,0.18)", borderRadius: 6, color: gold, fontSize: 13, padding: "10px 12px", fontFamily: "'IM Fell English', serif", outline: "none", width: "100%", boxSizing: "border-box", transition: "border-color 0.2s, box-shadow 0.2s" },
    textarea: { background: "rgba(0,0,0,0.45)", border: "1px solid rgba(200,155,60,0.18)", borderRadius: 6, color: "#8A7A5A", fontSize: 11, padding: "12px 14px", fontFamily: "monospace", outline: "none", width: "100%", boxSizing: "border-box", resize: "vertical", lineHeight: 1.6 },
    primaryBtn: { background: `linear-gradient(135deg, #6A4A0A, ${gold}, #6A4A0A)`, border: "none", borderRadius: 7, padding: "12px 28px", cursor: "pointer", color: "#150C00", fontFamily: "'Cinzel', serif", fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", boxShadow: "0 4px 18px rgba(200,155,60,0.22)", transition: "opacity 0.2s" },
    ghostBtn: { background: "none", border: `1px solid rgba(200,155,60,0.18)`, borderRadius: 6, color: "#5A4A3A", cursor: "pointer", fontSize: 11, padding: "8px 16px", fontFamily: "'Cinzel', serif", letterSpacing: 1 },
    backBtn: { background: "none", border: "none", color: "#3A2A1A", cursor: "pointer", fontSize: 11, padding: "0 0 16px 0", fontFamily: "'Cinzel', serif", letterSpacing: 1, display: "block" },
    classGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(145px, 1fr))", gap: 5 },
    classBtn: (cls, sel) => ({ background: sel ? `linear-gradient(135deg, ${cls.color}15, ${cls.color}07)` : "rgba(255,255,255,0.01)", border: `1px solid ${sel ? cls.color + "70" : "rgba(255,255,255,0.05)"}`, borderRadius: 7, padding: "9px 11px", cursor: "pointer", color: sel ? cls.color : "#4A3A2A", fontSize: 11, fontFamily: "'Cinzel', serif", textAlign: "left", transition: "all 0.15s", display: "flex", alignItems: "center", gap: 8, boxShadow: sel ? `0 0 14px ${cls.color}18` : "none" }),
    tag: sel => ({ background: sel ? "rgba(200,155,60,0.15)" : "rgba(255,255,255,0.015)", border: `1px solid ${sel ? "rgba(200,155,60,0.4)" : "rgba(255,255,255,0.05)"}`, borderRadius: 20, padding: "6px 13px", cursor: "pointer", color: sel ? gold : "#4A3A2A", fontSize: 11, fontFamily: "'Cinzel', serif", letterSpacing: 0.5, transition: "all 0.15s" }),
    chatMsg: role => ({ marginBottom: 14, padding: "13px 16px", borderRadius: 7, background: role === "user" ? "rgba(200,155,60,0.03)" : "rgba(255,255,255,0.01)", border: `1px solid ${role === "user" ? "rgba(200,155,60,0.12)" : "rgba(255,255,255,0.035)"}`, borderLeft: `3px solid ${role === "user" ? "rgba(200,155,60,0.5)" : "#3A2A5A"}` }),
  };

  const STEPS = ["Class", "Spec", "Input Method", "Your Gear", "Configure", "Oracle"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cinzel+Decorative:wght@700&family=IM+Fell+English:ital@0;1&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: rgba(200,155,60,0.2); border-radius: 4px; }
        input:focus, textarea:focus { border-color: rgba(200,155,60,0.4) !important; box-shadow: 0 0 0 3px rgba(200,155,60,0.05) !important; }
        select { appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23C89B3C50'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 10px center; }
        .fu { animation: fadeUp 0.3s ease both; }
      `}</style>

      <div style={S.app}>
        <div style={S.wrap}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 24, paddingTop: 8 }}>
            <p style={{ fontSize: 9, letterSpacing: 5, color: "#2A1A0A", fontFamily: "'Cinzel', serif", margin: "0 0 8px", textTransform: "uppercase" }}>World of Warcraft</p>
            <h1 style={{ fontSize: "clamp(22px,5vw,36px)", fontFamily: "'Cinzel Decorative', serif", color: gold, textShadow: "0 0 36px rgba(200,155,60,0.38)", letterSpacing: 2, margin: "0 0 6px" }}>The Forge Oracle</h1>
            <p style={{ color: "#2A1A0A", fontSize: 11, letterSpacing: 2, fontFamily: "'Cinzel', serif", margin: 0 }}>Not just what to equip — but why it makes you stronger</p>
          </div>

          {step > 0 && step < 5 && <Breadcrumb steps={STEPS} current={step} />}

          {/* ══ Step 0: Class ══ */}
          {step === 0 && (
            <div style={S.panel} className="fu">
              <span style={S.label}>Choose Your Class</span>
              <div style={S.classGrid}>
                {CLASSES.map(cls => (
                  <button key={cls.name} style={S.classBtn(cls, false)} onClick={() => { setSelectedClass(cls.name); setStep(1); }}>
                    <ClassIcon name={cls.name} color={cls.color} size={20} />
                    <span>{cls.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ══ Step 1: Spec ══ */}
          {step === 1 && classData && (
            <div style={S.panel} className="fu">
              <button style={S.backBtn} onClick={() => setStep(0)}>← Back</button>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                <ClassIcon name={classData.name} color={classData.color} size={32} />
                <div>
                  <span style={{ color: classData.color, fontFamily: "'Cinzel', serif", fontSize: 15 }}>{classData.name}</span>
                  <p style={{ color: "#2A1A0A", fontSize: 10, margin: "2px 0 0", fontFamily: "'Cinzel', serif", letterSpacing: 2 }}>SELECT SPECIALIZATION</p>
                </div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {classData.specs.map(spec => (
                  <button key={spec} style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(200,155,60,0.12)", borderRadius: 8, padding: "13px 20px", cursor: "pointer", color: "#7A6A5A", fontSize: 13, fontFamily: "'Cinzel', serif", letterSpacing: 1, transition: "all 0.15s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = classData.color + "55"; e.currentTarget.style.color = classData.color; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(200,155,60,0.12)"; e.currentTarget.style.color = "#7A6A5A"; }}
                    onClick={() => { setSelectedSpec(spec); setStep(2); }}>
                    {spec}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ══ Step 2: Input Mode ══ */}
          {step === 2 && (
            <div style={S.panel} className="fu">
              <button style={S.backBtn} onClick={() => setStep(1)}>← Back</button>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <ClassIcon name={classData?.name} color={classData?.color} size={28} />
                <div>
                  <span style={{ color: classData?.color, fontFamily: "'Cinzel', serif", fontSize: 14 }}>{selectedSpec} {selectedClass}</span>
                  <p style={{ color: "#2A1A0A", fontSize: 10, margin: "2px 0 0", fontFamily: "'Cinzel', serif", letterSpacing: 2 }}>HOW SHOULD WE READ YOUR GEAR?</p>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                <ModeCard icon="🔗" title="Character Lookup" badge="Easiest" badgeColor="#1EFF00"
                  description="Type your character name and realm — we fetch your live gear from Raider.IO automatically. No addons needed."
                  hint="Best for: players who want fast, accurate results with zero setup"
                  selected={inputMode === "rio"} onClick={() => setInputMode("rio")} />
                <ModeCard icon="📋" title="SimC String" badge="Most Accurate" badgeColor={gold}
                  description="Paste your /simc export from the SimulationCraft addon. Includes gems, enchants, bonus IDs, and bag items."
                  hint="Best for: serious optimisers who want the deepest analysis possible"
                  selected={inputMode === "simc"} onClick={() => setInputMode("simc")} />
                <ModeCard icon="✏️" title="Describe Manually" badge="Theory Mode" badgeColor="#A335EE"
                  description="Enter your gear slot-by-slot. Perfect for planning vault picks or asking 'what if I had this item?'"
                  hint="Best for: theorycrafters comparing hypothetical gear sets"
                  selected={inputMode === "manual"} onClick={() => setInputMode("manual")} />
              </div>
              {inputMode && (
                <div style={{ marginTop: 16, display: "flex", justifyContent: "flex-end" }}>
                  <button style={S.primaryBtn} onClick={() => setStep(3)}>Continue →</button>
                </div>
              )}
            </div>
          )}

          {/* ══ Step 3: Gear Input ══ */}
          {step === 3 && (
            <div style={S.panel} className="fu">
              <button style={S.backBtn} onClick={() => setStep(2)}>← Back to Input Method</button>

              {/* ── Raider.IO ── */}
              {inputMode === "rio" && (
                <>
                  <span style={S.label}>🔗 Character Lookup</span>
                  <p style={{ color: "#3A2A1A", fontSize: 12, marginBottom: 16, lineHeight: 1.6, marginTop: 0 }}>
                    Enter your character info. Make sure you logged out in your current gear so Raider.IO has fresh data.
                  </p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 80px", gap: 8, marginBottom: 14, alignItems: "end" }}>
                    <div>
                      <span style={S.label}>Character Name</span>
                      <input style={S.input} placeholder="e.g. Arthas" value={rioName}
                        onChange={e => setRioName(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && fetchRaiderIO()} />
                    </div>
                    <div style={{ position: "relative" }}>
                      <span style={S.label}>Realm</span>
                      <input
                        style={S.input}
                        placeholder="e.g. Stormrage"
                        value={rioRealm}
                        autoComplete="off"
                        onChange={e => {
                          const v = e.target.value;
                          setRioRealm(v);
                          if (v.length >= 2) {
                            const q = v.toLowerCase();
                            const pool = WOW_REALMS[rioRegion] || WOW_REALMS.us;
                            setRealmSuggestions(pool.filter(r => r.toLowerCase().includes(q)).slice(0, 8));
                            setShowRealmDrop(true);
                          } else {
                            setShowRealmDrop(false);
                          }
                        }}
                        onKeyDown={e => {
                          if (e.key === "Enter") { setShowRealmDrop(false); fetchRaiderIO(); }
                          if (e.key === "Escape") setShowRealmDrop(false);
                        }}
                        onBlur={() => setTimeout(() => setShowRealmDrop(false), 150)}
                      />
                      {showRealmDrop && realmSuggestions.length > 0 && (
                        <div style={{
                          position: "absolute", top: "100%", left: 0, right: 0, zIndex: 100,
                          background: "#1a120a", border: "1px solid rgba(200,155,60,0.35)",
                          borderRadius: 6, overflow: "hidden", marginTop: 2,
                          boxShadow: "0 8px 24px rgba(0,0,0,0.7)"
                        }}>
                          {realmSuggestions.map(r => (
                            <div key={r}
                              onMouseDown={() => { setRioRealm(r); setShowRealmDrop(false); }}
                              style={{
                                padding: "8px 12px", cursor: "pointer", fontSize: 13,
                                color: "#C89B3C", fontFamily: "Cinzel, serif",
                                borderBottom: "1px solid rgba(200,155,60,0.1)",
                                transition: "background 0.1s",
                              }}
                              onMouseEnter={e => e.currentTarget.style.background = "rgba(200,155,60,0.12)"}
                              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                            >{r}</div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div>
                      <span style={S.label}>Region</span>
                      <select style={{ ...S.input, cursor: "pointer", paddingRight: 28 }} value={rioRegion}
                        onChange={e => { setRioRegion(e.target.value); setRioRealm(""); setShowRealmDrop(false); }}>
                        {REGIONS.map(r => <option key={r} value={r}>{r.toUpperCase()}</option>)}
                      </select>
                    </div>
                  </div>
                  <button style={{ ...S.primaryBtn, opacity: rioLoading || !rioName || !rioRealm ? 0.5 : 1 }} onClick={fetchRaiderIO} disabled={rioLoading || !rioName || !rioRealm}>
                    {rioLoading ? "Searching..." : "Fetch Gear →"}
                  </button>
                  {rioLoading && <LoadingRunes />}
                  {rioError && (
                    <div style={{ marginTop: 12, padding: "10px 14px", background: "rgba(160,40,40,0.08)", border: "1px solid rgba(160,40,40,0.25)", borderRadius: 6 }}>
                      <p style={{ color: "#B05050", fontSize: 12, margin: "0 0 4px" }}>⚠ {rioError}</p>
                      <p style={{ color: "#5A3030", fontSize: 11, margin: 0, fontStyle: "italic" }}>Select your realm from the autocomplete dropdown. Make sure your region is correct.</p>
                    </div>
                  )}
                  {detectedGear.length > 0 && (
                    <>
                      <GearPreviewGrid gear={detectedGear} />
                      <div style={{ marginTop: 14, display: "flex", justifyContent: "flex-end" }}>
                        <button style={S.primaryBtn} onClick={() => setStep(4)}>Looks right — continue →</button>
                      </div>
                    </>
                  )}
                </>
              )}

              {/* ── SimC ── */}
              {inputMode === "simc" && (
                <>
                  <span style={S.label}>📋 SimC String</span>
                  <p style={{ color: "#3A2A1A", fontSize: 12, marginBottom: 4, lineHeight: 1.6, marginTop: 0 }}>
                    In-game, type <code style={{ background: "rgba(200,155,60,0.1)", color: gold, padding: "1px 6px", borderRadius: 3, fontSize: 11 }}>/simc</code> and copy everything in the window that appears.
                  </p>
                  <p style={{ color: "#2A1A0A", fontSize: 11, marginBottom: 12, fontStyle: "italic" }}>No addon? Get SimulationCraft free from CurseForge or Wago.io — takes 30 seconds to install.</p>
                  <textarea style={{ ...S.textarea, minHeight: 130 }}
                    placeholder={"# SimC Addon 10.x\nwarrior=\"Yourname\"\nlevel=80\nspec=fury\nhead=,id=123456,bonus_id=...\n..."}
                    value={simcString} onChange={e => setSimcString(e.target.value)} />
                  {simcString.length > 80 && !simcParsed && (
                    <p style={{ color: "#7A3A1A", fontSize: 11, marginTop: 8, fontStyle: "italic" }}>⚠ No gear detected. Paste the complete /simc output, not a partial excerpt.</p>
                  )}
                  {simcParsed && (
                    <>
                      <div style={{ marginTop: 10, padding: "8px 14px", background: "rgba(30,180,30,0.05)", border: "1px solid rgba(30,180,30,0.18)", borderRadius: 6, display: "flex", gap: 8, alignItems: "center" }}>
                        <span style={{ color: "#1EFF00" }}>✓</span>
                        <span style={{ color: "#3A6A3A", fontSize: 12 }}>Detected {simcParsed.filled} items{simcParsed.avgIlvl ? ` · avg ilvl ${simcParsed.avgIlvl}` : ""}</span>
                      </div>
                      <GearPreviewGrid gear={simcParsed.gear} />
                      <div style={{ marginTop: 14, display: "flex", justifyContent: "flex-end" }}>
                        <button style={S.primaryBtn} onClick={() => setStep(4)}>Analyse this gear →</button>
                      </div>
                    </>
                  )}
                  {!simcParsed && (
                    <div style={{ marginTop: 10, display: "flex", justifyContent: "flex-end" }}>
                      <button style={S.ghostBtn} onClick={() => setStep(4)}>Skip — use general advice</button>
                    </div>
                  )}
                </>
              )}

              {/* ── Manual ── */}
              {inputMode === "manual" && (
                <>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <span style={S.label}>✏️ Your Gear</span>
                    <span style={{ color: manualFilled > 8 ? "#1EFF00" : gold, fontSize: 11, fontFamily: "'Cinzel', serif" }}>{manualFilled} / {GEAR_SLOTS.length} slots</span>
                  </div>
                  <p style={{ color: "#2A1A0A", fontSize: 11, marginTop: 0, marginBottom: 12, fontStyle: "italic" }}>
                    Leave slots blank — the Oracle will give general advice for anything you skip.
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    {GEAR_SLOTS.map(slot => (
                      <div key={slot.key} style={{ display: "grid", gridTemplateColumns: "82px 1fr 64px", gap: 5, alignItems: "center" }}>
                        <span style={{ color: "#3A2A1A", fontSize: 10, fontFamily: "'Cinzel', serif", letterSpacing: 0.5 }}>{slot.label}</span>
                        <input style={{ ...S.input, fontSize: 11, padding: "7px 10px" }}
                          placeholder="Item name" value={manualGear[slot.key]?.name || ""}
                          onChange={e => setManualGear(p => ({ ...p, [slot.key]: { ...p[slot.key], name: e.target.value } }))} />
                        <input style={{ ...S.input, fontSize: 11, padding: "7px 8px", textAlign: "center" }}
                          type="number" placeholder="ilvl" min={1} max={700}
                          value={manualGear[slot.key]?.ilvl || ""}
                          onChange={e => setManualGear(p => ({ ...p, [slot.key]: { ...p[slot.key], ilvl: e.target.value } }))} />
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <button style={S.ghostBtn} onClick={() => setStep(4)}>Skip — general advice only</button>
                    <button style={{ ...S.primaryBtn, opacity: manualFilled === 0 ? 0.45 : 1 }} onClick={() => setStep(4)} disabled={manualFilled === 0}>
                      {manualFilled > 0 ? `Analyse ${manualFilled} item${manualFilled === 1 ? "" : "s"} →` : "Fill at least one slot"}
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* ══ Step 4: Configure ══ */}
          {step === 4 && (
            <div style={S.panel} className="fu">
              <button style={S.backBtn} onClick={() => setStep(3)}>← Back</button>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <ClassIcon name={classData?.name} color={classData?.color} size={28} />
                <span style={{ color: classData?.color, fontFamily: "'Cinzel', serif", fontSize: 14 }}>{selectedSpec} {selectedClass}</span>
              </div>
              <span style={S.label}>Content You Play</span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
                {CONTENT_TYPES.map(c => (
                  <button key={c} style={S.tag(content.includes(c))} onClick={() => setContent(p => p.includes(c) ? p.filter(x => x !== c) : [...p, c])}>{c}</button>
                ))}
              </div>
              <span style={S.label}>Your Priority</span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 22 }}>
                {PRIORITIES.map(p => (
                  <button key={p} style={S.tag(priority === p)} onClick={() => setPriority(p)}>{p}</button>
                ))}
              </div>
              <RunicDivider label="READY" />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p style={{ color: "#2A1A0A", fontSize: 11, margin: 0, fontStyle: "italic" }}>Both fields are optional — skip them and the Oracle makes sensible assumptions.</p>
                <button style={S.primaryBtn} onClick={sendInitial}>Consult the Oracle ✦</button>
              </div>
            </div>
          )}

          {/* ══ Step 5: Results ══ */}
          {step === 5 && (
            <div className="fu">
              <div style={{ ...S.panel, padding: "11px 16px", marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  <ClassIcon name={classData?.name} color={classData?.color} size={30} style={{ boxShadow: `0 0 12px ${classData?.color}30` }} />
                  <div>
                    <span style={{ color: classData?.color, fontFamily: "'Cinzel', serif", fontSize: 13 }}>{selectedSpec} {selectedClass}</span>
                    <p style={{ color: "#2A1A0A", fontSize: 10, margin: "2px 0 0", fontFamily: "'Cinzel', serif" }}>
                      {inputMode === "rio" ? "🔗 Live data" : inputMode === "simc" ? "📋 SimC import" : "✏️ Manual"} · {content.join(", ") || "All content"}
                    </p>
                  </div>
                </div>
                <button style={S.ghostBtn} onClick={reset}>New Session</button>
              </div>

              <div style={{ ...S.panel, minHeight: 260 }}>
                {chatHistory.map((msg, i) => (
                  <div key={i} style={S.chatMsg(msg.role)}>
                    <p style={{ fontSize: 9, fontFamily: "'Cinzel', serif", letterSpacing: 2, marginBottom: 7, color: msg.role === "user" ? "rgba(200,155,60,0.45)" : "#3A2A5A" }}>
                      {msg.role === "user" ? "▸ YOU" : "✦ THE ORACLE"}
                    </p>
                    {msg.role === "user"
                      ? <p style={{ color: "#4A3A2A", fontSize: 12, margin: 0 }}>{msg.display || msg.content}</p>
                      : <ResponseBlock content={msg.content} />}
                  </div>
                ))}
                {loading && (
                  <div style={S.chatMsg("assistant")}>
                    <p style={{ fontSize: 9, fontFamily: "'Cinzel', serif", letterSpacing: 2, marginBottom: 4, color: "#3A2A5A" }}>✦ THE ORACLE</p>
                    <LoadingRunes />
                    <p style={{ textAlign: "center", color: "#2A1A0A", fontSize: 11, fontStyle: "italic" }}>Reading the theorycrafting scrolls...</p>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {chatHistory.length > 0 && !loading && (
                <div style={{ ...S.panel, marginTop: 8, padding: "13px 16px" }}>
                  <div style={{ display: "flex", gap: 7 }}>
                    <input style={{ ...S.input, flex: 1 }}
                      placeholder={`Ask anything — "Why is Haste better than Crit for me?" or "Should I equip my vault piece?"`}
                      value={followUp} onChange={e => setFollowUp(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && sendFollowUp()} />
                    <button style={{ ...S.primaryBtn, padding: "10px 16px", flexShrink: 0, opacity: followUp.trim() ? 1 : 0.45 }} onClick={sendFollowUp} disabled={!followUp.trim()}>Ask ✦</button>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 8 }}>
                    {["What should I craft with my Sparks?", "Explain my Apex Talent", "Best Embellishments for me?", "When does ilvl beat stats?"].map(q => (
                      <button key={q} style={{ ...S.tag(false), fontSize: 10 }} onClick={() => setFollowUp(q)}>{q}</button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </>
  );
}
