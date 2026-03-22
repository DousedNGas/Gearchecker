// ═══════════════════════════════════════════════════════════════
// APEX — WoW Midnight Gear Advisor
// "Know your next move."
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
        {renderer(id)}
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
    <div style={{ display: "flex", justifyContent: "center", gap: 8, padding: "16px 0" }}>
      {RUNES.map((r, i) => (
        <span key={i} style={{ fontSize: 18, color: i === active ? "#f0b429" : "#30363d", textShadow: i === active ? "0 0 12px #f0b429" : "none", transition: "all 0.1s" }}>{r}</span>
      ))}
    </div>
  );
}

function Breadcrumb({ steps, current }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 20, overflowX: "auto", paddingBottom: 2 }}>
      {steps.map((s, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
          <span style={{
            fontSize: 12, fontFamily: "'Cinzel', serif",
            color: i < current ? "#3fb950" : i === current ? "#f0b429" : "#484f58",
            fontWeight: i === current ? 700 : 400,
          }}>
            {i < current ? "✓ " : ""}{s}
          </span>
          {i < steps.length - 1 && <span style={{ color: "#484f58", fontSize: 10 }}>›</span>}
        </div>
      ))}
    </div>
  );
}

function ModeCard({ icon, title, badge, badgeColor = "#f0b429", description, selected, onClick }) {
  return (
    <button onClick={onClick} style={{
      background: selected ? `${badgeColor}12` : "#0d1117",
      border: `1.5px solid ${selected ? badgeColor : "#30363d"}`,
      borderRadius: 12, padding: "16px", cursor: "pointer", textAlign: "left",
      transition: "all 0.15s", width: "100%", WebkitTapHighlightColor: "transparent",
      minHeight: 72,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 24, flexShrink: 0 }}>{icon}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span style={{ color: selected ? "#e6edf3" : "#8b949e", fontSize: 15, fontWeight: 600 }}>{title}</span>
            <span style={{
              fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20,
              background: `${badgeColor}20`, color: badgeColor, flexShrink: 0, letterSpacing: 0.5,
            }}>{badge}</span>
          </div>
          <p style={{ color: "#8b949e", fontSize: 13, margin: 0, lineHeight: 1.4 }}>{description}</p>
        </div>
        <div style={{
          width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
          border: `2px solid ${selected ? badgeColor : "#30363d"}`,
          background: selected ? badgeColor : "transparent",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {selected && <span style={{ color: "#0d1117", fontSize: 11, fontWeight: 900 }}>✓</span>}
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
    <div style={{ marginTop: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <span style={{ color: "#f0b429", fontSize: 12, fontFamily: "'Cinzel', serif", letterSpacing: 1 }}>
          {filled.length} / {gear.length} SLOTS
        </span>
        {avg > 0 && <span style={{ color: "#8b949e", fontSize: 13 }}>Avg ilvl <IlvlBadge ilvl={avg} /></span>}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
        {gear.map((slot, i) => (
          <div key={i} style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "7px 10px", borderRadius: 6,
            background: slot.name ? "rgba(240,180,41,0.06)" : "rgba(255,255,255,0.02)",
            border: `1px solid ${slot.name ? "rgba(240,180,41,0.18)" : "#21262d"}`,
          }}>
            <span style={{ color: "#8b949e", fontSize: 11, fontFamily: "'Cinzel', serif", flexShrink: 0 }}>{slot.label}</span>
            {slot.name
              ? <span style={{ color: "#c9d1d9", fontSize: 11, textAlign: "right", maxWidth: "60%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginLeft: 6 }}>
                  {slot.ilvl && <><IlvlBadge ilvl={slot.ilvl} />{" "}</>}{slot.name}
                </span>
              : <span style={{ color: "#484f58", fontSize: 11, fontStyle: "italic" }}>—</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

function ResponseBlock({ content }) {
  if (!content) return null;
  return (
    <div style={{ lineHeight: 1.8 }}>
      {content.split("\n").filter(l => l.trim()).map((line, i) => {
        if (line.startsWith("##")) return (
          <h3 key={i} style={{ color: "#f0b429", fontSize: 14, fontFamily: "'Cinzel', serif", fontWeight: 700, marginTop: 18, marginBottom: 6, letterSpacing: 0.5 }}>
            {line.replace(/^#+\s*/, "")}
          </h3>
        );
        if (line.startsWith("- ") || line.startsWith("• ")) {
          const html = line.replace(/^[-•]\s*/, "").replace(/\*\*(.+?)\*\*/g, '<strong style="color:#e6edf3">$1</strong>');
          return (
            <div key={i} style={{ display: "flex", gap: 10, margin: "5px 0", paddingLeft: 4 }}>
              <span style={{ color: "#f0b429", flexShrink: 0, marginTop: 5, fontSize: 8 }}>◆</span>
              <span style={{ color: "#c9d1d9", fontSize: 14, lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: html }} />
            </div>
          );
        }
        const html = line.replace(/\*\*(.+?)\*\*/g, '<strong style="color:#e6edf3">$1</strong>');
        return <p key={i} style={{ color: "#c9d1d9", fontSize: 14, margin: "6px 0", lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: html }} />;
      })}
    </div>
  );
}

// ── Universal knowledge (module-level — never recreated) ─────────
const UNIVERSAL_KNOWLEDGE = `
== MIDNIGHT SEASON 1 — UNIVERSAL RULES ==
GEAR TRACKS: Unranked 207-217 | Adventurer 220-230 | Veteran 233-243 | Champion 246-256 | Hero 259-269 | Myth 272-289 (max)
DAWNCRESTS: 20 per upgrade rank | 100/week cap per type | FREE if slot is below its personal highest-ever ilvl | Spend order: Myth > Hero > Champion > Veteran > Adventurer
SPARKS OF RADIANCE: 1/week (2 week 1) | 2 Sparks most items, 4 Sparks 2H/ranged | Base 259 | +80 Hero crests → 272 | +80 Myth crests → 285 | Thalassian Missive = choose your stats
NEVER CRAFT: Head, Shoulders, Chest, Hands, Legs (Tier slots — can't Catalyst convert)
BEST CRAFT TARGETS: Weapon > Neck > Cloak > Bracers > Belt > Boots > Rings
EMBELLISHMENTS: Max 2 equipped. Plan as a pair. Synergy > individual power.
VAULT: Resets Tuesday | 1/4/8 M+ keys = 1/2/3 dungeon slots | +10 key = 272 vault reward
4-SET TIER: Almost always beats 2-set + 2x higher ilvl non-tier pieces`;

// ── Per-spec knowledge (module-level — never recreated) ──────────
const SPEC_KNOWLEDGE = {
  "Blood": `
SPEC: Blood Death Knight (Tank)
APEX TALENT — Crimson Fortress: Empowers Death Strike to consume all Runic Power for a massive absorb shield scaled to damage absorbed in the past 5s. Timing Death Strike at peak damage windows is mandatory.
STAT PRIORITY: Strength > Versatility (scales Crimson Fortress absorb directly) > Haste (shorter GCDs = faster rune regeneration = more Death Strikes) > Mastery (Blood Shield overlap) > Crit (lowest value — absorbs don't crit)
EMBELLISHMENTS: Sanguine Plating (reduces damage taken when below 35% — triggers Crimson Fortress window) + Runic Overflow Bindings (generates 8 Runic Power on rune spend — directly feeds Death Strike)
BEST CRAFT: Weapon (2H) — strength weapon is highest throughput/survivability gain. Target 272+ with Versatility/Haste via Missive.
KEY TIPS: Versatility is unusually high value here vs other tanks — it directly multiplies your Crimson Fortress absorb. Do not craft Chest (Tier). Track free upgrades on Cloak and Belt first.`,
  "Frost DK": `
SPEC: Frost Death Knight (DPS)
APEX TALENT — Glacial Execution: Empowers Obliterate to execute a second hit at 40% power during Pillar of Frost. Every 1% Haste reduces Pillar's cooldown by 0.3s, creating a tight feedback loop.
STAT PRIORITY: Strength > Haste (directly reduces Glacial Execution cooldown — softcap ~30%) > Crit (Killing Machine procs scale with crit) > Mastery (Frozen Heart % physical damage) > Versatility
EMBELLISHMENTS: Frost-Forged Obliterators (Obliterate deals 8% more damage during Pillar) + Icewarden Clasp (belt — 12 Haste per Runic Power spent, stacks to 60)
BEST CRAFT: 2H weapon (Missive: Haste + Crit). Do NOT craft 1H weapons (2H required for Frost).
KEY TIPS: At 30% Haste the Pillar cooldown reduction becomes noticeable. Prioritize Hero crest upgrades on weapon first, then ring slots for stat density.`,
  "Unholy": `
SPEC: Unholy Death Knight (DPS)
APEX TALENT — Plague Dominion: Virulent Plague gains a stack mechanic — each pandemic refresh adds a Dominion stack (max 5), and your next Army of the Dead summons a Dominion Abomination scaled to stacks.
STAT PRIORITY: Strength > Mastery (Dreadblade % shadow damage amplifies Dominion Abomination) > Haste (faster GCDs = more refreshes = faster stack buildup) > Crit > Versatility
EMBELLISHMENTS: Pestilent Coils (belt — Virulent Plague ticks have 15% chance to add a free Dominion stack) + Necrotic Overflow (bracers — Army cooldown reduced by 4s per Dominion stack consumed)
BEST CRAFT: 2H weapon (Missive: Mastery + Haste). Neck second.
KEY TIPS: Never let Virulent Plague fall off — every dropped pandemic costs a Dominion stack. Mastery is unusually high value in M+.`,
  "Havoc": `
SPEC: Havoc Demon Hunter (DPS)
APEX TALENT — Fel Spiral: Eye Beam leaves a Fel Spiral on the ground for 8s. Each Fel Rush through it grants a Momentum stack (max 3) that increases all damage by 6% per stack for 6s.
STAT PRIORITY: Agility > Haste (more GCDs in Momentum window, shorter Eye Beam CD) > Versatility (flat damage multiplier — high value in stacked Momentum) > Crit (Chaos Strike crits generate Fury) > Mastery
EMBELLISHMENTS: Spiraling Edge Glaives (Fel Rush through Spiral generates 1 extra Momentum stack) + Fel-Threaded Wrists (bracers — Momentum duration extended by 1s per stack)
BEST CRAFT: Glaive weapon (Missive: Haste + Versatility). Belt second.
KEY TIPS: Pre-position Eye Beam on pull to set up Spiral before Metamorphosis. In M+, Fel Rush through your own Spiral — positioning matters more than almost any other spec.`,
  "Vengeance": `
SPEC: Vengeance Demon Hunter (Tank)
APEX TALENT — Immolation Surge: Immolation Aura pulses deal increased damage equal to 4% of damage you've taken in the last 2s.
STAT PRIORITY: Agility > Versatility (reduces damage taken AND increases Surge damage) > Haste (more Shear casts = more Soul Fragments = more healing) > Mastery (Fel Blood — bonus armor) > Crit
EMBELLISHMENTS: Burning Soul Cincture (belt — Soul Fragment consumption extends Immolation Aura by 0.5s) + Volatile Sigil Band (ring — 8% Immolation Aura damage during Metamorphosis)
BEST CRAFT: Ring (Missive: Versatility + Haste). Neck second.
KEY TIPS: Versatility is double-dipping — reduces damage taken AND scales Immolation Surge damage. Avoid crafting Shoulders or Chest (Tier slots).`,
  "Devourer": `
SPEC: Devourer Demon Hunter (NEW — DPS)
APEX TALENT — Void Consumption: Consuming a Void Fragment triggers Consumption Cascade — each subsequent Fragment consumed within 6s deals 15% more damage. Building chains of 4+ Fragments is the core loop.
STAT PRIORITY: Agility > Haste (faster Fragment generation) > Mastery (Void Resonance — bonus shadow damage scales Cascade) > Crit (Fragment generation chance on crit) > Versatility
EMBELLISHMENTS: Voidshard Bracers (Void Slash generates 2 fragments on Mastery proc) + Consuming Darkness Neck (Consumption Cascade reset chance 20% on chain 4+)
BEST CRAFT: Neck (Consuming Darkness Embellishment, Missive: Haste + Mastery). Main hand weapon second.
KEY TIPS: Current consensus is Haste > Mastery until ~28% Haste, then Mastery pulls ahead. Do NOT waste Sparks on Tier slots — Devourer has strong 4-set.`,
  "Balance": `
SPEC: Balance Druid (DPS)
APEX TALENT — Solar Zenith: Celestial Alignment empowers the next 3 Starsurges to trigger both a Solar Flare and Lunar Strike simultaneously.
STAT PRIORITY: Intellect > Haste (CA cooldown reduction, more Astral Power) > Mastery (Starlight — % bonus to empowered Zenith hits) > Crit > Versatility
EMBELLISHMENTS: Zenith Astrolabe (neck — CA gains 1 additional empowered Starsurge charge) + Eclipse Weaver Cord (belt — Starsurge deals 10% more damage while both Eclipses are active)
BEST CRAFT: Neck (Zenith Astrolabe Embellishment). Staff/offhand second (Missive: Haste + Mastery).
KEY TIPS: Haste is your best throughput stat until the CA window, then Mastery multiplies the empowered hits. Never craft Chest or Shoulders (Tier).`,
  "Feral": `
SPEC: Feral Druid (DPS)
APEX TALENT — Predator's Mark: Applying Rip to a target that already has Rake active instantly grants 3 combo points and makes your next Ferocious Bite consume no combo points.
STAT PRIORITY: Agility > Crit (bleed crit damage is very high; free bites need critting) > Haste (faster energy regeneration = more bleed uptime) > Mastery (Razor Claws — % physical damage) > Versatility
EMBELLISHMENTS: Bloodied Claws Bracer (Rake refresh extends by 2s on crit) + Predator's Tooth (neck — free Ferocious Bite deals 20% more damage)
BEST CRAFT: Neck (Predator's Tooth Embellishment). Agility weapon second (Missive: Crit + Haste).
KEY TIPS: Crit is unusually high value — bites cost 0 combo points on Predator's Mark procs, so bleed crit damage is pure upside. Maintain both bleeds or the free bite mechanic breaks.`,
  "Guardian": `
SPEC: Guardian Druid (Tank)
APEX TALENT — Ancient Grove: Thrash generates 2 Rage per enemy hit and reduces Barkskin cooldown by 1s per target hit (max 5s reduction).
STAT PRIORITY: Agility > Versatility (damage reduction + offensive multiplier) > Haste (more Thrash casts = more Ancient Grove procs) > Mastery (Nature's Guardian — % max health bonus) > Crit
EMBELLISHMENTS: Grove-Keeper Cloak (Thrash generates 1 extra Rage per target on first application) + Bark-Threaded Cord (belt — Barkskin CD reduction increased to 2s per target)
BEST CRAFT: Cloak (Grove-Keeper Embellishment). Missive: Versatility + Haste. Never craft Chest (Tier).
KEY TIPS: Haste is above typical tank value here — more frequent Barkskin is a significant survivability gain in M+.`,
  "Restoration Druid": `
SPEC: Restoration Druid (Healer)
APEX TALENT — Verdant Torrent: Wild Growth applies a Verdant Mark to each target. When a marked target drops below 40% health, Swiftmend auto-triggers on them at 60% effectiveness.
STAT PRIORITY: Intellect > Mastery (Harmony — % bonus to direct heals on HoT targets, scales Verdant auto-Swiftmend) > Haste (more HoT ticks, shorter Wild Growth CD) > Versatility > Crit
EMBELLISHMENTS: Verdant Weave Bracers (Verdant Mark auto-trigger applies a 3s HoT) + Grove Tender Cinch (belt — Wild Growth CD reduced by 2s)
BEST CRAFT: Bracers (Verdant Weave Embellishment). Staff second (Missive: Mastery + Haste).
KEY TIPS: Mastery amplifies every link of the auto-trigger chain. In progression, the auto-trigger gives you a free GCD per endangered player.`,
  "Devastation": `
SPEC: Devastation Evoker (DPS)
APEX TALENT — Empyrean Surge: Dragonrage empowers your next 2 Disintegrate casts to channel twice as fast and deal 30% more damage. Every 1% Haste reduces Dragonrage CD by 0.25s.
STAT PRIORITY: Intellect > Haste (Dragonrage CD reduction + faster Surge channels) > Crit (Pyre crits generate Essence) > Mastery (Giantkiller — % bonus to Empower spells) > Versatility
EMBELLISHMENTS: Surge-Threaded Wrists (Empyrean Surge channels deal 8% more damage) + Draconic Focus Cord (belt — Essence generation +15% during Dragonrage)
BEST CRAFT: Weapon (Missive: Haste + Crit). Bracers second.
KEY TIPS: Position at 25-35 yards. Haste compounds across cooldown reduction AND channel speed. Do NOT craft Chest (Tier).`,
  "Preservation": `
SPEC: Preservation Evoker (Healer)
APEX TALENT — Echo Resonance: Echo persists through 3 heal events before fading (up from 1). Each Echo heal has a 20% chance to generate a free Essence.
STAT PRIORITY: Intellect > Mastery (Golden Hour — % bonus to all heals on Echo targets, each chain link benefits) > Haste (shorter GCDs = more Echo applications) > Versatility > Crit
EMBELLISHMENTS: Resonant Scale Bracers (Echo Resonance procs generate 1 extra Essence on the 3rd chain hit) + Temporal Weave Cinch (belt — Dream Breath applies Echo to 2 additional targets)
BEST CRAFT: Bracers (Resonant Scale Embellishment). Staff second (Missive: Mastery + Haste).
KEY TIPS: Mastery is exceptionally high value — Golden Hour amplifies every link of the 3-hit Echo chain.`,
  "Augmentation": `
SPEC: Augmentation Evoker (Support DPS)
APEX TALENT — Temporal Ascendance: Breath of Eons grants buffed allies a 10% Haste buff for 8s after the channel ends. Your Haste directly increases Ebon Might duration.
STAT PRIORITY: Intellect > Haste (Ebon Might duration — each 1% Haste adds 0.4s) > Mastery (Timewalker — your stats shared to allies via Ebon Might) > Crit > Versatility
EMBELLISHMENTS: Ascendant's Coil (neck — Temporal Ascendance Haste buff increased to 13%) + Echoing Scale Cord (belt — Ebon Might reapplication costs 2 less Essence)
BEST CRAFT: Neck (Ascendant's Coil Embellishment). Weapon second (Missive: Haste + Mastery).
KEY TIPS: In M+, coordinate Breath of Eons with your group's burst cooldowns. Haste stacking directly multiplies your support uptime.`,
  "Beast Mastery": `
SPEC: Beast Mastery Hunter (DPS)
APEX TALENT — Pack Frenzy: Kill Command triggers a Frenzy charge on your pet (max 5). At 5 stacks, pet enters Pack Frenzy mode for 8s — all auto-attacks cleave and deal 25% more damage.
STAT PRIORITY: Agility > Haste (Kill Command CD reduction, faster Frenzy stacking) > Crit (KC crits grant 2 Frenzy stacks) > Mastery (Master of Beasts — % pet damage scales Pack Frenzy) > Versatility
EMBELLISHMENTS: Frenzy Caller Bracer (Pack Frenzy duration +2s) + Beast-Bond Quiver (back — Kill Command generates 1 Focus on Crit)
BEST CRAFT: Back piece (Beast-Bond Embellishment — cloak is not Tier). Ranged weapon second (4 Sparks, Missive: Haste + Crit).
KEY TIPS: Crit pulls ahead of Mastery at higher gear levels — double-stack KC crits dramatically accelerate Pack Frenzy windows. Ranged weapon costs 4 Sparks — plan accordingly.`,
  "Marksmanship": `
SPEC: Marksmanship Hunter (DPS)
APEX TALENT — Precision Strike: Aimed Shot always critically strikes targets above 80% health. Consecutive Aimed Shots within 4s deal 15% more damage each (max 3 stacks).
STAT PRIORITY: Agility > Crit (Precise Shots proc amplified by guaranteed crits above 80%) > Haste (shorter Aimed Shot cast + CD, more stacks per window) > Versatility > Mastery
EMBELLISHMENTS: Precision Scope Bracer (Consecutive Aimed Shot stacks last 1s longer) + Windrunner's String (back — Aimed Shot cast time reduced by 0.1s per stack)
BEST CRAFT: Back piece (Windrunner's String Embellishment). Ranged weapon second (4 Sparks, Missive: Crit + Haste).
KEY TIPS: MM has the strongest opener due to the guaranteed crit mechanic — excellent for M+ boss pulls. Mastery falls behind because you can't always control the range bonus.`,
  "Survival": `
SPEC: Survival Hunter (Melee DPS)
APEX TALENT — Apex Predator: Kill Shot triggers off enemies above 30% health if you have a Mongoose Fury stack. Each stack above 3 reduces Kill Shot CD by 1s.
STAT PRIORITY: Agility > Haste (faster Raptor Strike = faster Mongoose stack buildup) > Crit (Mongoose Bite crits add 2 stacks) > Mastery (Spirit Bond — % damage with pet nearby) > Versatility
EMBELLISHMENTS: Predator's Edge Bracer (Apex Predator Kill Shots deal 15% more damage) + Venom-Laced Cord (belt — Serpent Sting ticks extend Mongoose Fury by 0.5s each)
BEST CRAFT: Bracers (Predator's Edge Embellishment). Melee weapon second (Missive: Agility + Haste).
KEY TIPS: Never let Mongoose Fury fall off — even at 3 stacks the Kill Shot window is active. Melee weapon is highest priority craft.`,
  "Arcane": `
SPEC: Arcane Mage (DPS)
APEX TALENT — Mana Rupture: Arcane Surge detonates all Arcane Charges simultaneously, dealing bonus damage per charge. Scales with current mana %.
STAT PRIORITY: Intellect > Haste (shorter Arcane Blast cast + CD, faster charge buildup) > Mastery (Savant — % Arcane damage scales Mana Rupture) > Crit > Versatility
EMBELLISHMENTS: Runic Reservoir Cord (belt — Mana Rupture refunds 5% mana per charge consumed) + Arcane Focus Band (ring — Arcane Blast generates 1 extra Charge at max mana)
BEST CRAFT: Belt (Runic Reservoir Embellishment). Staff/wand second (Missive: Haste + Mastery).
KEY TIPS: Never cast Arcane Surge below 80% mana — Mana Rupture scales directly with mana %. Mastery multiplies the charge detonation damage.`,
  "Fire": `
SPEC: Fire Mage (DPS)
APEX TALENT — Combustion Nova: Combustion causes your next 3 Pyroblasts to chain-ignite to 2 nearby targets at 50% damage. Nova chains inherit crit chance.
STAT PRIORITY: Intellect > Crit (Heating Up / Hot Streak / Nova chain — softcap ~45%) > Haste (shorter GCDs in Combustion window) > Mastery (Ignite — periodic damage) > Versatility
EMBELLISHMENTS: Magma-Forged Bracer (bracers — Combustion Nova chain hits have 15% higher crit chance) + Ember Weave Cord (belt — Hot Streak Pyroblast crit increases Ignite damage by 8% for 4s)
BEST CRAFT: Bracers (Magma-Forged Embellishment). Staff second (Missive: Crit + Haste). NEVER craft Shoulders or Chest (Tier).
KEY TIPS: Crit is primary until ~45% then Haste and Mastery catch up. Fire is extremely strong in AoE — Combustion timing on M+ packs is critical.`,
  "Frost Mage": `
SPEC: Frost Mage (DPS)
APEX TALENT — Glacial Spike Prime: Glacial Spike applies a Frozen Core for 6s. Your next 2 Ice Lances against Frozen Core targets shatter for 40% bonus damage.
STAT PRIORITY: Intellect > Haste (shorter Frostbolt cast, faster Fingers of Frost procs) > Crit (Brain Freeze and Fingers of Frost proc chance) > Mastery (Icicles feed Glacial Spike) > Versatility
EMBELLISHMENTS: Core-Shard Bracers (Frozen Core duration +2s, more time for the 2 Lance window) + Glacial Focus Ring (Glacial Spike +10% damage when 5 Icicles consumed)
BEST CRAFT: Ring (Glacial Focus Embellishment). Staff second (Missive: Haste + Crit).
KEY TIPS: Spike → Lance × 2 is a hardcoded priority — never cast anything else between Spike and the two Lances.`,
  "Brewmaster": `
SPEC: Brewmaster Monk (Tank)
APEX TALENT — Celestial Keg: Keg Smash creates a Celestial Keg for 8s. Enemies in range take 20% more damage from your abilities and you gain 1 Stagger reduction charge per enemy hit.
STAT PRIORITY: Agility > Versatility (Stagger bonus, damage reduction) > Haste (more Keg Smash = more Celestial Keg uptime) > Mastery (Elusive Brawler — dodge stacking) > Crit
EMBELLISHMENTS: Ironbrew Cinch (belt — Celestial Keg duration +3s) + Staggerstep Wrists (each Stagger tick purified grants 1 Agility for 5s, stacking to 15)
BEST CRAFT: Belt (Ironbrew Embellishment). Weapon second (Missive: Versatility + Haste). Never craft Chest or Shoulders.
KEY TIPS: Haste is atypically high value — Keg Smash frequency directly controls Keg uptime, your primary AoE threat tool AND Stagger charge generator.`,
  "Mistweaver": `
SPEC: Mistweaver Monk (Healer)
APEX TALENT — Jade Confluence: Rising Sun Kick activates a 6s window where all Vivify casts additionally heal the lowest health ally for 40%.
STAT PRIORITY: Intellect > Haste (shorter RSK CD = more Confluence windows) > Mastery (Gust of Mists — bonus direct heal on Vivify) > Crit > Versatility
EMBELLISHMENTS: Jade Weave Bracers (Confluence window +2s) + Renewing Mist Cord (belt — Renewing Mist hops to 1 extra target during Confluence)
BEST CRAFT: Bracers (Jade Weave Embellishment). Staff second (Missive: Haste + Mastery).
KEY TIPS: RSK controls your healing throughput window — maintain it on cooldown as if it were a healing spell. Haste pulls ahead of all secondary stats.`,
  "Windwalker": `
SPEC: Windwalker Monk (DPS)
APEX TALENT — Storm Spiral: Storm, Earth and Fire clones execute a Spiral Strike on recall, dealing 15% of all damage dealt during their duration.
STAT PRIORITY: Agility > Haste (shorter SEF CD, more GCDs during clone window) > Crit (Tiger Palm crits generate 1 extra Chi) > Mastery (Combo Strikes — % bonus to each unique ability) > Versatility
EMBELLISHMENTS: Storm-Caller Bracers (Spiral Strike +20% damage) + Chi Overflow Cord (belt — Blackout Kick generates 1 extra Chi while SEF is active)
BEST CRAFT: Bracers (Storm-Caller Embellishment). Weapon second (Missive: Haste + Crit).
KEY TIPS: Mastery is higher value than it looks — Combo Strikes applies to each clone ability independently. Maintain perfect ability rotation during SEF to maximize the recall hit.`,
  "Holy Paladin": `
SPEC: Holy Paladin (Healer)
APEX TALENT — Divine Ascendance: Avenging Wrath converts all Holy Power spent into Divine Sparks. At end of Avenging Wrath, Sparks burst heal the 5 lowest health allies.
STAT PRIORITY: Intellect > Haste (shorter Avenging Wrath CD, more Holy Power per window) > Mastery (Lightbringer — % bonus to nearby allies, scales burst) > Crit (Holy Shock crit = 2 Holy Power) > Versatility
EMBELLISHMENTS: Sacred Spark Cord (belt — each Divine Spark heals 1 additional target) + Radiant Focus Ring (ring — Holy Shock crit chance +8% during Avenging Wrath)
BEST CRAFT: Ring (Radiant Focus Embellishment — rings aren't Tier). Weapon second (Missive: Haste + Mastery).
KEY TIPS: Coordinate the Divine Ascendance burst with predictable damage windows. Never waste Holy Power in the last 2s of Avenging Wrath.`,
  "Protection Paladin": `
SPEC: Protection Paladin (Tank)
APEX TALENT — Bulwark of Light: Shield of the Righteous applies a Bulwark stack (max 5, 2% magic DR each). At 5 stacks triggers a Holy burst = 20% max health damage to nearby enemies.
STAT PRIORITY: Strength > Versatility (damage reduction, scales burst) > Haste (faster Holy Power = more SotR = faster stacks) > Mastery (Divine Bulwark — block chance/value) > Crit
EMBELLISHMENTS: Sanctified Girdle (belt — burst radius increased, hits 2 extra targets) + Blessed Stone Ring (SotR generates 1 extra Bulwark stack on crit)
BEST CRAFT: Belt (Sanctified Girdle Embellishment). 1H Weapon second (Missive: Versatility + Haste). Never craft Shoulders, Chest, or Gloves (all Tier).
KEY TIPS: Haste is unusually high value for a tank — controls defensive stack buildup AND offensive burst frequency.`,
  "Retribution": `
SPEC: Retribution Paladin (DPS)
APEX TALENT — Final Reckoning Surge: Final Reckoning causes the next 3 Templar's Verdict casts within 8s to always trigger the Reckoning execution bonus.
STAT PRIORITY: Strength > Haste (shorter Judgment CD, faster Holy Power for the 3-TV window) > Crit (Wake of Ashes and TV crits generate 1 extra Holy Power) > Versatility > Mastery (lowest value — Hand of Light doesn't interact with Surge)
EMBELLISHMENTS: Reckoning Girdle (belt — Surge window +2s) + Lightsworn Bracer (bracers — Templar's Verdict during Surge +12% damage)
BEST CRAFT: Belt (Reckoning Girdle Embellishment). 2H Weapon second (4 Sparks, Missive: Haste + Crit).
KEY TIPS: Stack Haste and Crit — Mastery is the worst secondary for Ret in Midnight.`,
  "Discipline": `
SPEC: Discipline Priest (Healer)
APEX TALENT — Radiant Penance: Penance fires all bolts simultaneously in a radiant burst, each bolt healing a different ally. Atonement healing from Radiant Penance +30%.
STAT PRIORITY: Intellect > Haste (shorter Penance CD, more Atonement applications before burst) > Mastery (Grace — % bonus to Atonement healing) > Crit (Power Word: Shield crit = 2 Atonement triggers) > Versatility
EMBELLISHMENTS: Radiant Weave Cincture (belt — Radiant Penance applies Atonement to all targets hit for 4s) + Penitent's Focus Band (ring — Penance damage +10%)
BEST CRAFT: Belt (Radiant Weave Embellishment). Staff second (Missive: Haste + Mastery).
KEY TIPS: Haste is most impactful — more Penance casts = more Atonements active before burst. The belt Embellishment is transformative — Radiant Penance now applies Atonement to the entire raid in one cast.`,
  "Holy Priest": `
SPEC: Holy Priest (Healer)
APEX TALENT — Holy Confluence: Prayer of Healing creates a Holy Confluence zone for 6s. All heals on allies within 8 yards heal for an additional 15%.
STAT PRIORITY: Intellect > Haste (shorter PoH CD, more Confluence uptime) > Mastery (Echo of Light — periodic component scales zone bonus) > Crit (PoH crits extend Confluence by 1s) > Versatility
EMBELLISHMENTS: Confluence Weave Cord (belt — Confluence radius increased to 12 yards) + Serenity Focus Band (ring — Holy Word: Serenity also activates a mini-Confluence for 3s)
BEST CRAFT: Belt (Confluence Weave Embellishment). Staff second (Missive: Haste + Mastery).
KEY TIPS: Confluence zones require your raid to stack — coordinate with your raid lead. Crit is higher value than usual for the Confluence extension.`,
  "Shadow": `
SPEC: Shadow Priest (DPS)
APEX TALENT — Void Eruption Cascade: Void Eruption triggers a secondary eruption 3s after the first, dealing 60% of original damage.
STAT PRIORITY: Intellect > Haste (shorter Voidform ramp, faster Insanity, tightens Cascade timing) > Mastery (Shadow Weaving — % shadow damage stacks to 10, scales both eruptions) > Crit > Versatility
EMBELLISHMENTS: Void-Threaded Cincture (belt — Cascade secondary eruption increased to 80%) + Insidious Whisper Band (ring — Void Bolt generates 2 extra Insanity during Void Eruption)
BEST CRAFT: Belt (Void-Threaded Embellishment). Staff second (Missive: Haste + Mastery).
KEY TIPS: Pre-cast Void Eruption so the secondary eruption lands on add spawns in M+. Both eruptions benefit from the full 10-stack Mastery bonus.`,
  "Assassination": `
SPEC: Assassination Rogue (DPS)
APEX TALENT — Lethal Tempo: Envenom applies a Lethal Tempo stack (max 6). At 6 stacks, poisons deal 40% more damage for 8s.
STAT PRIORITY: Agility > Haste (faster energy, more Mutilate, faster Tempo stacking) > Crit (Mutilate crits deal 30% more damage AND generate 1 CP) > Mastery (Potent Assassin — % bonus to poison and bleed) > Versatility
EMBELLISHMENTS: Tempo-Weave Bracer (Lethal Tempo window +3s) + Venomous Edge Dagger (main hand — Envenom applies 1 extra Tempo stack on crit)
BEST CRAFT: Main hand dagger (Venomous Edge Embellishment, Missive: Haste + Crit). Off-hand second.
KEY TIPS: Pre-stack to 6 Tempo stacks before every major damage window in M+. Mastery is higher value than Versatility here.`,
  "Outlaw": `
SPEC: Outlaw Rogue (DPS)
APEX TALENT — Grand Heist: Roll the Bones always grants all 6 buffs simultaneously for 10s. Using Pistol Shot during Grand Heist generates a True Bearing stack (reduces next RtB CD by 3s per stack).
STAT PRIORITY: Agility > Haste (more Pistol Shots during Grand Heist, shorter RtB CD) > Crit (Sinister Strike extra hit + higher Pistol Shot damage) > Versatility > Mastery
EMBELLISHMENTS: Heist-Runner Bracer (Grand Heist window +3s) + Cutthroat Cord (belt — Pistol Shot generates 1 extra True Bearing stack during Grand Heist)
BEST CRAFT: Bracers (Heist-Runner Embellishment). 1H Weapon second (Missive: Haste + Crit).
KEY TIPS: The rotation is now entirely cooldown-based — plan Grand Heist windows around M+ pull timings. Mastery falls behind Versatility in Midnight.`,
  "Subtlety": `
SPEC: Subtlety Rogue (DPS)
APEX TALENT — Shadow Recursion: For 6s after Shadow Dance ends, Eviscerate deals damage as if the target were still in Symbols of Death.
STAT PRIORITY: Agility > Haste (shorter Shadow Dance CD, more Eviscerate in Recursion window) > Crit (Eviscerate crit generates 1 CP via Shadow Techniques) > Mastery (Executioner — % during finisher casts) > Versatility
EMBELLISHMENTS: Recursion Edge Bracer (Shadow Recursion window +2s) + Shade Weave Cord (belt — Shadow Dance generates 1 Combo Point on activation)
BEST CRAFT: Bracers (Recursion Edge Embellishment). Main hand dagger second (Missive: Haste + Crit).
KEY TIPS: Never spend Combo Points outside the Recursion window if you can hold them. Haste above 25% noticeably shortens Dance CD via Alacrity.`,
  "Elemental": `
SPEC: Elemental Shaman (DPS)
APEX TALENT — Stormkeeper Surge: Stormkeeper causes your next 2 Chain Lightning casts to bounce to 2 extra targets and generate 1 Maelstrom per bounce.
STAT PRIORITY: Intellect > Haste (shorter Stormkeeper CD, more Maelstrom per window) > Mastery (Elemental Overload — % chance for double hit, scales Surge bounces) > Crit > Versatility
EMBELLISHMENTS: Stormbinder Cord (belt — Surge Chain Lightning bounces to 1 additional target) + Lava-Surge Bracer (Lava Surge procs during Stormkeeper generate 5 bonus Maelstrom)
BEST CRAFT: Belt (Stormbinder Embellishment). Staff or MH+OH second (Missive: Haste + Mastery).
KEY TIPS: Elemental is the strongest AoE spec in Midnight. Hold Stormkeeper for large packs — Surge bounces nearly double Earthquake uptime on those pulls.`,
  "Enhancement": `
SPEC: Enhancement Shaman (DPS)
APEX TALENT — Tempest Strike: Windstrike triggers a Tempest Strike dealing Nature damage = 30% of Maelstrom Weapon stacks consumed × weapon damage. More stacks = bigger Tempest.
STAT PRIORITY: Agility > Haste (faster Maelstrom stack buildup) > Crit (Lava Lash crit refreshes Flame Shock) > Mastery (Enhanced Elements — % elemental damage scales Tempest) > Versatility
EMBELLISHMENTS: Tempest-Caller Cord (belt — Tempest Strike +15% damage) + Maelstrom Bracer (5-stack consumption generates 1 bonus stack — effectively 6-stack Tempest)
BEST CRAFT: Belt (Tempest-Caller Embellishment). 1H Weapon(s) second (Missive: Agility + Haste).
KEY TIPS: Always consume Maelstrom at 5 stacks — partial consumption loses the multiplier.`,
  "Restoration Shaman": `
SPEC: Restoration Shaman (Healer)
APEX TALENT — Tidal Torrent: Healing Rain creates a Tidal Torrent zone for 6s after expiring. Allies in zone receive 20% increased healing from your Chain Heal.
STAT PRIORITY: Intellect > Mastery (Deep Healing — % bonus to lower health targets, amplified inside Tidal Torrent) > Haste (more Healing Rain casts, shorter Chain Heal cast) > Crit (Resurgence mana return) > Versatility
EMBELLISHMENTS: Torrent Weave Cincture (belt — Tidal Torrent zone +3s) + Ancestral Flow Ring (Chain Heal bounces 1 extra time while Tidal Torrent is active)
BEST CRAFT: Belt (Torrent Weave Embellishment). Staff second (Missive: Mastery + Haste).
KEY TIPS: Maintain Healing Rain uptime so the Torrent zone is always transitioning. Coordinate with your co-healer to ensure the zone covers the stack point.`,
  "Affliction": `
SPEC: Affliction Warlock (DPS)
APEX TALENT — Soul Harvest Surge: Dark Soul: Misery causes all DoTs to tick twice as fast for 8s, each accelerated tick generating 2 Soul Shards.
STAT PRIORITY: Intellect > Haste (shorter Dark Soul CD, faster DoT ticks, more Malefic Rapture) > Mastery (Potent Afflictions — % bonus to DoT damage, scales every Surge tick) > Crit > Versatility
EMBELLISHMENTS: Harvest Weave Cord (belt — Surge window +3s) + Shard-Binder Bracer (accelerated ticks during Surge generate 1 extra Shard per tick)
BEST CRAFT: Belt (Harvest Weave Embellishment). Staff second (Missive: Haste + Mastery).
KEY TIPS: Pre-pool Soul Shards before Dark Soul comes off CD — spend Malefic Rapture as much as possible during Surge. Mastery multiplies every accelerated tick.`,
  "Demonology": `
SPEC: Demonology Warlock (DPS)
APEX TALENT — Demonic Tyrant Ascendance: Summon Demonic Tyrant extends ALL active demons' durations by 8s (up from 5s) AND grants them a 25% damage buff.
STAT PRIORITY: Intellect > Haste (faster Shard generation for more Imps before Tyrant) > Crit (Demonbolt crits generate 1 extra Shard) > Mastery (Master Demonologist — scales Ascendance window) > Versatility
EMBELLISHMENTS: Tyrant's Binding Cord (belt — Ascendance buff increased to 30% damage) + Imp-Caller Bracer (Hand of Gul'dan summons 1 extra Imp during Tyrant window)
BEST CRAFT: Belt (Tyrant's Binding Embellishment). Staff second (Missive: Haste + Crit).
KEY TIPS: Maximize imps active before Tyrant: Nether Portal → spam Hand of Gul'dan → Tyrant.`,
  "Destruction": `
SPEC: Destruction Warlock (DPS)
APEX TALENT — Chaos Inferno: Chaos Bolt leaves a Chaos Inferno on the target for 8s. Your next Rain of Fire deals 50% more damage per Chaos Inferno active in the area.
STAT PRIORITY: Intellect > Crit (Chaos Bolt crit scales Inferno damage; Backlash proc on crit) > Haste (shorter Immolate CD, faster Shard generation) > Mastery (Chaotic Energies — random % bonus, averages high) > Versatility
EMBELLISHMENTS: Inferno Weave Cord (belt — Chaos Inferno duration +3s, allowing 2 Rain casts) + Pyreborn Bracer (Rain of Fire during Inferno +10% damage per target hit)
BEST CRAFT: Belt (Inferno Weave Embellishment). Staff second (Missive: Crit + Haste).
KEY TIPS: Apply Inferno to all enemies before Rain of Fire in M+. Crit simultaneously increases Chaos Bolt output AND Inferno proc chance via Backlash.`,
  "Arms": `
SPEC: Arms Warrior (DPS)
APEX TALENT — Colossus Smash Rupture: Colossus Smash causes Mortal Strike to deal 20% more damage for 8s and cleave to 1 additional target. Every 10 Rage spent extends the window by 0.5s (max +4s).
STAT PRIORITY: Strength > Haste (faster Rage generation, more window extension per Rupture) > Crit (Whirlwind and Overpower crits generate bonus Rage) > Mastery (Deep Wounds — periodic bleed) > Versatility
EMBELLISHMENTS: Rupture-Forged Girdle (belt — Rupture window +2s baseline) + Warlord's Edge Bracer (Mortal Strike during Rupture generates 5 bonus Rage)
BEST CRAFT: Belt (Rupture-Forged Embellishment). 2H Weapon second (4 Sparks, Missive: Strength + Haste).
KEY TIPS: Never cast Slam outside a Rupture window — wasted Rage = lost window extension.`,
  "Fury": `
SPEC: Fury Warrior (DPS)
APEX TALENT — Reckless Onslaught: Recklessness grants a stacking Onslaught buff with each Rampage cast (max 4 stacks, 6% damage each). At 4 stacks, next Bloodthirst auto-crits and resets Rampage cost to 0.
STAT PRIORITY: Strength > Haste (faster Rage, more Rampage per Recklessness, faster stack buildup) > Crit (Bloodthirst crit — 4-stack reset requires a crit) > Mastery (Unshackled Fury — % while Enraged) > Versatility
EMBELLISHMENTS: Onslaught Girdle (belt — stacks up to 5, adding a 5th 6% stack before reset) + Berserker's Wrist (bracers — Rampage during Recklessness generates 5 bonus Rage)
BEST CRAFT: Belt (Onslaught Girdle Embellishment — highest priority). 2H Weapon second (4 Sparks, Missive: Strength + Haste).
KEY TIPS: Pool Rage before Recklessness to hit 4 stacks as fast as possible. Haste is slightly ahead of Crit — faster Rampage buildup is more reliable than relying on the reset proc.`,
  "Protection Warrior": `
SPEC: Protection Warrior (Tank)
APEX TALENT — Impenetrable Wall: Shield Wall generates a stacking Impenetrable buff each block during its duration. Each stack increases block chance by 3% for 8s after Shield Wall ends (max 10 stacks = 30% bonus).
STAT PRIORITY: Strength > Versatility (damage reduction + offensive multiplier) > Haste (more Shield Slam = more block attempts = more stacks) > Mastery (Critical Block — % chance for critical blocks) > Crit
EMBELLISHMENTS: Bulwark Girdle (belt — Impenetrable Wall buff duration +4s after Shield Wall) + Fortified Stone Ring (each Impenetrable stack provides 1% damage reduction)
BEST CRAFT: Belt (Bulwark Girdle Embellishment). 1H Weapon second (Missive: Versatility + Haste).
KEY TIPS: Time Shield Wall on predictable heavy damage windows, not reactively — you need to be actively blocking during it to maximize stacks.`,
};

// ── Design tokens (module-level — never recreated) ───────────────
const T = {
  bg:       "#0d1117",
  surface:  "#161b22",
  border:   "#30363d",
  borderHi: "#f0b429",
  gold:     "#f0b429",
  goldDim:  "#9a7420",
  text:     "#e6edf3",
  textSub:  "#8b949e",
  textDim:  "#484f58",
  blue:     "#58a6ff",
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

const STEPS = ["Input Method", "Your Gear", "Configure", "Oracle"];

// ── Main App ─────────────────────────────────────────────────────
export default function ForgeOracle() {
  const [step, setStep] = useState(0);
  // Class/spec are now auto-detected from the import source, not manually selected
  const [detectedClass, setDetectedClass] = useState("");
  const [detectedSpec, setDetectedSpec] = useState("");
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

  const [content, setContent] = useState([]);
  const [priority, setPriority] = useState(PRIORITIES[0]);
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [followUp, setFollowUp] = useState("");
  const chatEndRef = useRef(null);

  // Oracle mode tabs: "analysis" | "vault" | "weekly"
  const [oracleMode, setOracleMode] = useState("analysis");
  // Great Vault: up to 9 slots (3 dungeon, 3 raid, 3 world) — user enters what they see
  const [vaultItems, setVaultItems] = useState(["", "", "", "", "", "", "", "", ""]);
  // Weekly sparks available
  const [sparksAvailable, setSparksAvailable] = useState("1");
  // Weekly crest counts
  const [heroCrestsAvail, setHeroCrestsAvail] = useState("");
  const [mythCrestsAvail, setMythCrestsAvail] = useState("");

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chatHistory, loading]);

  // Derive display class/spec: auto-detected for rio/simc, manual input for manual mode
  const activeClass = detectedClass;
  const activeSpec  = detectedSpec;
  const classData   = CLASSES.find(c => c.name === activeClass);

  const parseSimC = useCallback((str) => {
    if (!str.trim()) return null;
    const slotMap = {
      head: "head", neck: "neck", shoulder: "shoulder", back: "back",
      chest: "chest", wrist: "wrist", hands: "hands", waist: "waist",
      legs: "legs", feet: "feet", finger1: "finger1", finger2: "finger2",
      trinket1: "trinket1", trinket2: "trinket2",
      main_hand: "mainhand", off_hand: "offhand",
    };
    // SimC class name map (SimC key → display name)
    const classNameMap = {
      deathknight: "Death Knight", demonhunter: "Demon Hunter", druid: "Druid",
      evoker: "Evoker", hunter: "Hunter", mage: "Mage", monk: "Monk",
      paladin: "Paladin", priest: "Priest", rogue: "Rogue", shaman: "Shaman",
      warlock: "Warlock", warrior: "Warrior",
    };
    const found = {};
    const ilvls = [];
    let parsedClass = "";
    let parsedSpec = "";
    for (const line of str.split("\n")) {
      const t = line.trim();
      if (t.startsWith("#") || !t.includes("=")) continue;
      const eqIdx = t.indexOf("=");
      const rawKey = t.slice(0, eqIdx).trim();
      const val = t.slice(eqIdx + 1).trim().replace(/"/g, "");
      // Detect class from first-line pattern like: warrior="Yourname"
      if (!parsedClass && classNameMap[rawKey.toLowerCase()]) {
        parsedClass = classNameMap[rawKey.toLowerCase()];
        continue;
      }
      // Detect spec
      if (rawKey === "spec") {
        const specVal = val.replace(/_/g, " ");
        parsedSpec = specVal.charAt(0).toUpperCase() + specVal.slice(1);
        continue;
      }
      const slotKey = slotMap[rawKey];
      if (slotKey) {
        const parts = val.split(",");
        const itemName = parts[0].replace(/_/g, " ").trim();
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
    const avgIlvl = ilvls.length ? Math.round(ilvls.reduce((a, b) => a + b, 0) / ilvls.length) : null;
    return { gear, filled: filled.length, avgIlvl, parsedClass, parsedSpec };
  }, []);

  useEffect(() => {
    if (inputMode === "simc" && simcString.length > 80) {
      const parsed = parseSimC(simcString);
      setSimcParsed(parsed);
      if (parsed?.parsedClass) setDetectedClass(parsed.parsedClass);
      if (parsed?.parsedSpec) setDetectedSpec(parsed.parsedSpec);
    } else {
      setSimcParsed(null);
    }
  }, [simcString, inputMode, parseSimC]);

  const toRealmSlug = (name) => name.trim().toLowerCase().replace(/\s+/g, "-").replace(/'/g, "").replace(/[^a-z0-9-]/g, "");

  const fetchRaiderIO = async () => {
    if (!rioName.trim() || !rioRealm.trim()) return;
    setRioLoading(true); setRioError(""); setDetectedGear([]);
    try {
      const realm = toRealmSlug(rioRealm);
      const res = await fetch(`/api/raiderio?region=${rioRegion}&realm=${encodeURIComponent(realm)}&name=${encodeURIComponent(rioName.trim())}`);
      if (!res.ok) { const e = await res.json().catch(() => ({})); throw new Error(e.message || `Character not found (${res.status}). Check name, realm and region.`); }
      const data = await res.json();
      // Auto-detect class and spec from API response
      if (data.class) setDetectedClass(data.class);
      if (data.active_spec_name) setDetectedSpec(data.active_spec_name);
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
    return "No gear data — give general spec advice.";
  };



  const getSpecKnowledge = () => {
    // Build a class+spec composite key for disambiguation
    // Raider.IO returns e.g. activeSpec="Frost", activeClass="Death Knight"
    const spec = (activeSpec || "").toLowerCase();
    const cls  = (activeClass || "").toLowerCase();

    // Disambiguate specs that share a name across classes
    if (spec === "frost" && cls.includes("death")) return SPEC_KNOWLEDGE["Frost DK"] || "";
    if (spec === "frost" && cls.includes("mage"))  return SPEC_KNOWLEDGE["Frost Mage"] || "";
    if (spec === "holy"  && cls.includes("paladin")) return SPEC_KNOWLEDGE["Holy Paladin"] || "";
    if (spec === "holy"  && cls.includes("priest"))  return SPEC_KNOWLEDGE["Holy Priest"] || "";
    if (spec === "restoration" && cls.includes("druid"))  return SPEC_KNOWLEDGE["Restoration Druid"] || "";
    if (spec === "restoration" && cls.includes("shaman")) return SPEC_KNOWLEDGE["Restoration Shaman"] || "";
    if (spec === "protection" && cls.includes("paladin")) return SPEC_KNOWLEDGE["Protection Paladin"] || "";
    if (spec === "protection" && cls.includes("warrior")) return SPEC_KNOWLEDGE["Protection Warrior"] || "";
    if (spec === "beast mastery") return SPEC_KNOWLEDGE["Beast Mastery"] || "";

    // Exact key match
    if (SPEC_KNOWLEDGE[activeSpec]) return SPEC_KNOWLEDGE[activeSpec];

    // Fuzzy fallback — spec name contained in key or vice versa
    const fuzzy = Object.keys(SPEC_KNOWLEDGE).find(k =>
      k.toLowerCase() === spec ||
      k.toLowerCase().startsWith(spec)
    );
    return fuzzy ? SPEC_KNOWLEDGE[fuzzy] : "\nNo spec-specific data — give best general advice for this class.";
  };

  const sysPrompt = () => `You are Apex — a sharp WoW gear advisor for Midnight Season 1. Give direct, specific, actionable advice. Explain the mechanical WHY behind every recommendation. Reference the player's actual gear items and ilvls when available.

Player: ${activeSpec || "Unknown Spec"} ${activeClass || "Unknown Class"}
Content: ${content.join(", ") || "general play"}
Goal: ${priority}

Gear:
${buildGearContext()}
${UNIVERSAL_KNOWLEDGE}
${getSpecKnowledge()}

Rules: Use ## headers and **bold** for stats/items. Lead with the single most important recommendation. Be specific — name actual items, ilvl thresholds, Dawncrest costs. Call out mistakes directly.`;

  const vaultPrompt = (items) => {
    const filled = items.filter(v => v.trim());
    return `I'm looking at my Great Vault right now. Here are my available picks:
${filled.map((item, i) => `${i + 1}. ${item}`).join("\n")}

My current gear:
${buildGearContext()}

Tell me:
## Which pick should I take and why?
Give me a clear #1 recommendation with the mechanical reason. If the choice is close, explain the tradeoff. Consider:
- Ilvl upgrade over what I'm wearing
- Whether the slot is a Tier piece (and my current set bonus progress)
- Stat value for my ${activeSpec} ${activeClass} Apex Talent rotation
- Whether I could get this slot more easily from another source

## What should I do with the others?
Brief note on why the other options are lower priority.`;
  };

  const weeklyPrompt = () => `Generate my weekly Apex plan as a ${activeSpec} ${activeClass} focused on ${content.join(", ") || "general content"} with goal: ${priority}.

My gear:
${buildGearContext()}

Sparks of Radiance available: ${sparksAvailable}
Hero Dawncrests available: ${heroCrestsAvail || "unknown"}
Myth Dawncrests available: ${mythCrestsAvail || "unknown"}

Give me a structured weekly plan:

## 🔧 Upgrades This Reset
Which slots to upgrade first, what track, and exact Dawncrest cost. Flag any FREE upgrades (slot-tracking). Prioritize by throughput impact.

## ⚗️ Crafting Decision
Should I spend Sparks this week? If yes: exactly what item, what slot, which Embellishment, and which Dawncrest reagent to add. If no: what to wait for.

## 📅 Content Priority
What to run this week and in what order, tuned to my gear level and vault goals. Include which Prey difficulty and Delve tier to target.

## 🏆 Great Vault Setup
What keys/content to complete before reset to maximize next week's vault options.

## ⚠️ Don't Forget
Any easy free wins — free upgrades, weekly quests for Sparks, reset-day actions.`;

  const sendInitial = async () => {
    setLoading(true); setStep(3); setOracleMode("analysis");
    const msg = `Analyse my ${activeSpec} ${activeClass} gear and give me:\n\n## Stat Priority\nWhat stats I should prioritize and why they synergize with my Apex Talent specifically.\n\n## Biggest Upgrades\nMy weakest slots ranked by impact — be specific about which items and what ilvl I need.\n\n## Crafting Plan\nWhat to craft with Sparks of Radiance, which Embellishments to pair, and which slots are off-limits.\n\n## Immediate Wins\nFree upgrades, wasted Dawncrests, or anything obviously wrong I should fix right now.`;
    setChatHistory([{ role: "user", content: msg, display: "Analysing your gear..." }]);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1500, system: sysPrompt(), messages: [{ role: "user", content: msg }] }),
      });
      const data = await res.json();
      const text = data.content?.map(b => b.text || "").join("") || "No response.";
      setChatHistory([{ role: "user", content: msg, display: "Gear Analysis" }, { role: "assistant", content: text }]);
    } catch {
      setChatHistory([{ role: "user", content: msg, display: "Gear Analysis" }, { role: "assistant", content: "Connection lost. Please try again." }]);
    }
    setLoading(false);
  };

  const sendVaultAnalysis = async () => {
    const filled = vaultItems.filter(v => v.trim());
    if (!filled.length) return;
    setLoading(true);
    const msg = vaultPrompt(vaultItems);
    const hist = [...chatHistory, { role: "user", content: msg, display: `Vault analysis — ${filled.length} item${filled.length > 1 ? "s" : ""}` }];
    setChatHistory(hist);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1500, system: sysPrompt(), messages: hist.map(m => ({ role: m.role, content: m.content })) }),
      });
      const data = await res.json();
      setChatHistory([...hist, { role: "assistant", content: data.content?.map(b => b.text || "").join("") || "No response." }]);
    } catch { setChatHistory([...hist, { role: "assistant", content: "Connection lost." }]); }
    setLoading(false);
  };

  const sendWeeklyPlan = async () => {
    setLoading(true);
    const msg = weeklyPrompt();
    const hist = [...chatHistory, { role: "user", content: msg, display: "Generate weekly plan" }];
    setChatHistory(hist);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1500, system: sysPrompt(), messages: hist.map(m => ({ role: m.role, content: m.content })) }),
      });
      const data = await res.json();
      setChatHistory([...hist, { role: "assistant", content: data.content?.map(b => b.text || "").join("") || "No response." }]);
    } catch { setChatHistory([...hist, { role: "assistant", content: "Connection lost." }]); }
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
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1500, system: sysPrompt(), messages: hist.map(m => ({ role: m.role, content: m.content })) }),
      });
      const data = await res.json();
      setChatHistory([...hist, { role: "assistant", content: data.content?.map(b => b.text || "").join("") || "No response." }]);
    } catch { setChatHistory([...hist, { role: "assistant", content: "Connection lost." }]); }
    setLoading(false);
  };

  const reset = () => {
    setStep(0); setDetectedClass(""); setDetectedSpec(""); setInputMode(null);
    setDetectedGear([]); setGearSummary(""); setRioName(""); setRioRealm(""); setRioRegion("us"); setRioError("");
    setSimcString(""); setSimcParsed(null);
    setContent([]); setPriority(PRIORITIES[0]); setChatHistory([]); setFollowUp("");
    setOracleMode("analysis"); setVaultItems(["","","","","","","","",""]);
    setSparksAvailable("1"); setHeroCrestsAvail(""); setMythCrestsAvail("");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Cinzel+Decorative:wght@700&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        * { box-sizing: border-box; -webkit-font-smoothing: antialiased; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #30363d; border-radius: 4px; }
        input:focus, textarea:focus, select:focus {
          border-color: #f0b429 !important;
          outline: none;
          box-shadow: 0 0 0 3px rgba(240,180,41,0.12) !important;
        }
        select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%238b949e'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
        }
        button:active { opacity: 0.75; transform: scale(0.98); }
        .fu { animation: fadeUp 0.25s ease both; }
      `}</style>

      <div style={S.app}>
        <div style={S.wrap}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 28, paddingTop: 12 }}>
            <p style={{ fontSize: 10, letterSpacing: 4, color: T.textDim, fontFamily: "'Cinzel', serif", margin: "0 0 10px", textTransform: "uppercase" }}>World of Warcraft · Midnight</p>
            <h1 style={{ fontSize: "clamp(30px,8vw,48px)", fontFamily: "'Cinzel Decorative', serif", color: T.gold, letterSpacing: 2, margin: "0 0 8px", lineHeight: 1.1 }}>APEX</h1>
            <p style={{ color: T.textSub, fontSize: 13, margin: 0 }}>Know your next move.</p>
          </div>

          {step > 0 && step < 3 && <Breadcrumb steps={STEPS} current={step} />}

          {/* ══ Step 0: Input Method ══ */}
          {step === 0 && (
            <div style={S.card} className="fu">
              <p style={{ color: T.textSub, fontSize: 14, margin: "0 0 16px", lineHeight: 1.5 }}>
                How do you want to share your gear?
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <ModeCard icon="🔗" title="Character Lookup" badge="Easiest" badgeColor={T.green}
                  description="Enter your name and realm — we pull your live gear from Raider.IO."
                  selected={inputMode === "rio"} onClick={() => setInputMode("rio")} />
                <ModeCard icon="📋" title="SimC String" badge="Most Detail" badgeColor={T.gold}
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

          {/* ══ Step 1: Gear Input ══ */}
          {step === 1 && (
            <div style={S.card} className="fu">
              <button style={S.backBtn} onClick={() => setStep(0)}>← Back</button>

              {/* ── Raider.IO ── */}
              {inputMode === "rio" && (
                <>
                  <span style={S.label}>Character Lookup</span>
                  <p style={{ color: T.textSub, fontSize: 14, marginBottom: 18, marginTop: 0, lineHeight: 1.5 }}>
                    Log out in your current gear first so Raider.IO has the latest data.
                  </p>
                  {/* Name + Region stacked for mobile */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 14 }}>
                    <div>
                      <span style={S.label}>Character Name</span>
                      <input style={S.input} placeholder="e.g. Arthas" value={rioName}
                        onChange={e => setRioName(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && fetchRaiderIO()} />
                    </div>
                    <div style={{ position: "relative" }}>
                      <span style={S.label}>Realm</span>
                      <input style={S.input} placeholder="Start typing..." value={rioRealm}
                        autoComplete="off"
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
                        onBlur={() => setTimeout(() => setShowRealmDrop(false), 150)}
                      />
                      {showRealmDrop && realmSuggestions.length > 0 && (
                        <div style={{ position: "absolute", top: "100%", left: 0, right: 0, zIndex: 100, background: "#161b22", border: `1px solid ${T.borderHi}`, borderRadius: 8, overflow: "hidden", marginTop: 4, boxShadow: "0 8px 32px rgba(0,0,0,0.6)" }}>
                          {realmSuggestions.map(r => (
                            <div key={r} onMouseDown={() => { setRioRealm(r); setShowRealmDrop(false); }}
                              style={{ padding: "12px 14px", cursor: "pointer", fontSize: 15, color: T.text, borderBottom: `1px solid ${T.border}` }}
                              onMouseEnter={e => e.currentTarget.style.background = "#21262d"}
                              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                            >{r}</div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div>
                      <span style={S.label}>Region</span>
                      <select style={{ ...S.input, cursor: "pointer" }} value={rioRegion}
                        onChange={e => { setRioRegion(e.target.value); setRioRealm(""); setShowRealmDrop(false); }}>
                        {REGIONS.map(r => <option key={r} value={r}>{r.toUpperCase()}</option>)}
                      </select>
                    </div>
                  </div>
                  <button style={{ ...S.primaryBtn, width: "100%", opacity: rioLoading || !rioName || !rioRealm ? 0.45 : 1 }}
                    onClick={fetchRaiderIO} disabled={rioLoading || !rioName || !rioRealm}>
                    {rioLoading ? "Searching..." : "Fetch Gear →"}
                  </button>
                  {rioLoading && <LoadingRunes />}
                  {rioError && (
                    <div style={{ marginTop: 12, padding: "12px 14px", background: `${T.red}12`, border: `1px solid ${T.red}40`, borderRadius: 8 }}>
                      <p style={{ color: T.red, fontSize: 14, margin: "0 0 4px", fontWeight: 600 }}>⚠ {rioError}</p>
                      <p style={{ color: T.textSub, fontSize: 13, margin: 0 }}>Pick your realm from the dropdown and check your region is correct.</p>
                    </div>
                  )}
                  {detectedGear.length > 0 && (
                    <>
                      {detectedClass && (
                        <div style={{ marginTop: 14, padding: "10px 14px", background: `${T.green}12`, border: `1px solid ${T.green}40`, borderRadius: 8, display: "flex", alignItems: "center", gap: 10 }}>
                          {classData && <ClassIcon name={classData.name} color={classData.color} size={28} />}
                          <span style={{ color: T.green, fontSize: 14, fontWeight: 600 }}>{detectedSpec} {detectedClass} detected</span>
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

              {/* ── SimC ── */}
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
                    <p style={{ color: T.red, fontSize: 13, marginTop: 8 }}>⚠ No gear detected — paste the full /simc output, not a partial excerpt.</p>
                  )}
                  {simcParsed && (
                    <>
                      <div style={{ marginTop: 12, padding: "10px 14px", background: `${T.green}12`, border: `1px solid ${T.green}40`, borderRadius: 8, display: "flex", alignItems: "center", gap: 10 }}>
                        {classData && <ClassIcon name={classData.name} color={classData.color} size={28} />}
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
              <button style={S.backBtn} onClick={() => setStep(1)}>← Back</button>
              {activeClass && (
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, padding: "12px 14px", background: "#0d1117", borderRadius: 8, border: `1px solid ${T.border}` }}>
                  {classData && <ClassIcon name={classData.name} color={classData.color} size={32} />}
                  <div>
                    <p style={{ color: T.text, fontSize: 15, margin: 0, fontWeight: 600 }}>{activeSpec} {activeClass}</p>
                    <p style={{ color: T.textSub, fontSize: 12, margin: "2px 0 0" }}>
                      {inputMode === "rio" ? "🔗 Raider.IO" : "📋 SimC"} · {detectedGear.filter(g=>g.name).length || simcParsed?.filled || 0} items
                    </p>
                  </div>
                </div>
              )}
              <span style={S.label}>Content You Play</span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 22 }}>
                {CONTENT_TYPES.map(c => (
                  <button key={c} style={S.tag(content.includes(c))} onClick={() => setContent(p => p.includes(c) ? p.filter(x => x !== c) : [...p, c])}>{c}</button>
                ))}
              </div>
              <span style={S.label}>Your Goal</span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
                {PRIORITIES.map(p => (
                  <button key={p} style={S.tag(priority === p)} onClick={() => setPriority(p)}>{p}</button>
                ))}
              </div>
              <p style={{ color: T.textDim, fontSize: 13, margin: "0 0 16px", fontStyle: "italic" }}>Both are optional — skip and the Oracle makes sensible assumptions.</p>
              <button style={{ ...S.primaryBtn, width: "100%" }} onClick={sendInitial}>Consult the Oracle ✦</button>
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
                      {inputMode === "rio" ? "🔗 Live" : "📋 SimC"} · {content.join(", ") || "All content"}
                    </p>
                  </div>
                </div>
                <button style={S.ghostBtn} onClick={reset}>New</button>
              </div>

              {/* Mode tabs */}
              <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
                {[
                  { id: "analysis", label: "⚔️ Analysis", desc: "Gear breakdown" },
                  { id: "vault",    label: "🏆 Great Vault", desc: "Pick advisor" },
                  { id: "weekly",   label: "📅 Weekly Plan", desc: "Reset checklist" },
                ].map(tab => (
                  <button key={tab.id} onClick={() => setOracleMode(tab.id)} style={{
                    flex: 1, padding: "10px 6px", borderRadius: 10, cursor: "pointer",
                    background: oracleMode === tab.id ? `${T.gold}18` : T.surface,
                    border: `1.5px solid ${oracleMode === tab.id ? T.gold : T.border}`,
                    color: oracleMode === tab.id ? T.gold : T.textSub,
                    fontSize: 13, fontWeight: oracleMode === tab.id ? 700 : 400,
                    WebkitTapHighlightColor: "transparent",
                    transition: "all 0.15s",
                  }}>
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* ── Analysis tab ── */}
              {oracleMode === "analysis" && (
                <div style={S.card}>
                  {chatHistory.length === 0 && !loading && (
                    <div style={{ textAlign: "center", padding: "24px 0" }}>
                      <p style={{ color: T.textSub, fontSize: 14, margin: "0 0 20px" }}>Ready to analyse your {activeSpec} {activeClass} gear.</p>
                      <button style={{ ...S.primaryBtn, width: "100%" }} onClick={sendInitial}>Run Gear Analysis ✦</button>
                    </div>
                  )}
                  {(chatHistory.length > 0 || loading) && (
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
                          <p style={{ fontSize: 11, fontFamily: "'Cinzel', serif", letterSpacing: 1.5, marginBottom: 4, color: T.textDim, fontWeight: 700 }}>APEX</p>
                          <LoadingRunes />
                          <p style={{ textAlign: "center", color: T.textDim, fontSize: 13, fontStyle: "italic" }}>Crunching your gear data...</p>
                        </div>
                      )}
                      <div ref={chatEndRef} />
                    </>
                  )}
                  {chatHistory.length > 0 && !loading && (
                    <div style={{ marginTop: 14, borderTop: `1px solid ${T.border}`, paddingTop: 14 }}>
                      <div style={{ display: "flex", gap: 8 }}>
                        <input style={{ ...S.input, flex: 1 }}
                          placeholder="Ask a follow-up..."
                          value={followUp} onChange={e => setFollowUp(e.target.value)}
                          onKeyDown={e => e.key === "Enter" && sendFollowUp()} />
                        <button style={{ ...S.primaryBtn, padding: "12px 18px", flexShrink: 0, opacity: followUp.trim() ? 1 : 0.45 }}
                          onClick={sendFollowUp} disabled={!followUp.trim()}>Ask</button>
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
                        {["Explain my Apex Talent", "Best Embellishment pair?", "Craft this week?", "ilvl vs stats?", "Simulate next upgrade"].map(q => (
                          <button key={q} style={{ ...S.tag(false), fontSize: 13, padding: "8px 12px" }} onClick={() => setFollowUp(q)}>{q}</button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ── Great Vault tab ── */}
              {oracleMode === "vault" && (
                <div style={S.card}>
                  <p style={{ color: T.text, fontSize: 15, fontWeight: 600, margin: "0 0 6px" }}>Great Vault Advisor</p>
                  <p style={{ color: T.textSub, fontSize: 13, margin: "0 0 18px", lineHeight: 1.5 }}>
                    It's reset day. Enter what's showing in your vault and Apex will tell you exactly which to take.
                  </p>

                  {/* Dungeon slots */}
                  <p style={{ ...S.label, marginBottom: 8 }}>Dungeon Slots (up to 3)</p>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{ marginBottom: 8 }}>
                      <input style={{ ...S.input, fontSize: 15 }}
                        placeholder={`Dungeon slot ${i + 1} — e.g. "Cloak of the Voidspire 272"`}
                        value={vaultItems[i]}
                        onChange={e => { const v = [...vaultItems]; v[i] = e.target.value; setVaultItems(v); }} />
                    </div>
                  ))}

                  {/* Raid slots */}
                  <p style={{ ...S.label, margin: "14px 0 8px" }}>Raid Slots (up to 3)</p>
                  {[3, 4, 5].map(i => (
                    <div key={i} style={{ marginBottom: 8 }}>
                      <input style={{ ...S.input, fontSize: 15 }}
                        placeholder={`Raid slot ${i - 2} — e.g. "Helm of the Dreaming King 272"`}
                        value={vaultItems[i]}
                        onChange={e => { const v = [...vaultItems]; v[i] = e.target.value; setVaultItems(v); }} />
                    </div>
                  ))}

                  {/* World slots */}
                  <p style={{ ...S.label, margin: "14px 0 8px" }}>World Activity Slots (up to 3)</p>
                  {[6, 7, 8].map(i => (
                    <div key={i} style={{ marginBottom: 8 }}>
                      <input style={{ ...S.input, fontSize: 15 }}
                        placeholder={`World slot ${i - 5} — e.g. "Ring of Fractured Void 259"`}
                        value={vaultItems[i]}
                        onChange={e => { const v = [...vaultItems]; v[i] = e.target.value; setVaultItems(v); }} />
                    </div>
                  ))}

                  <button
                    style={{ ...S.primaryBtn, width: "100%", marginTop: 8, opacity: vaultItems.filter(v => v.trim()).length < 1 || loading ? 0.45 : 1 }}
                    onClick={sendVaultAnalysis}
                    disabled={vaultItems.filter(v => v.trim()).length < 1 || loading}>
                    {loading ? "Analysing..." : "Tell me which to pick →"}
                  </button>

                  {loading && <LoadingRunes />}

                  {/* Show vault responses — find assistant reply after each vault user msg */}
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

              {/* ── Weekly Plan tab ── */}
              {oracleMode === "weekly" && (
                <div style={S.card}>
                  <p style={{ color: T.text, fontSize: 15, fontWeight: 600, margin: "0 0 6px" }}>Weekly Reset Planner</p>
                  <p style={{ color: T.textSub, fontSize: 13, margin: "0 0 18px", lineHeight: 1.5 }}>
                    Tell Apex what resources you have and get a full plan for the week.
                  </p>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
                    <div>
                      <span style={S.label}>Sparks</span>
                      <select style={{ ...S.input, fontSize: 15 }} value={sparksAvailable} onChange={e => setSparksAvailable(e.target.value)}>
                        {["0","1","2","3","4","5+"].map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>
                    <div>
                      <span style={S.label}>Hero Crests</span>
                      <input style={{ ...S.input, fontSize: 15 }} type="number" min="0" max="100" placeholder="0-100"
                        value={heroCrestsAvail} onChange={e => setHeroCrestsAvail(e.target.value)} />
                    </div>
                    <div>
                      <span style={S.label}>Myth Crests</span>
                      <input style={{ ...S.input, fontSize: 15 }} type="number" min="0" max="100" placeholder="0-100"
                        value={mythCrestsAvail} onChange={e => setMythCrestsAvail(e.target.value)} />
                    </div>
                  </div>

                  <button
                    style={{ ...S.primaryBtn, width: "100%", opacity: loading ? 0.45 : 1 }}
                    onClick={sendWeeklyPlan}
                    disabled={loading}>
                    {loading ? "Building plan..." : "Generate this week's plan →"}
                  </button>

                  {loading && <LoadingRunes />}

                  {/* Show weekly plan responses — pair each user msg with the assistant reply that follows */}
                  {chatHistory.map((msg, i) => {
                    if (msg.display !== "Generate weekly plan" || msg.role !== "user") return null;
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
