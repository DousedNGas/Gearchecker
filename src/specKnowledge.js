// ═══════════════════════════════════════════════════════════════
// Vaultwright — Spec Knowledge (Recursive / Layered Architecture)
//
// Three-layer knowledge system:
//   Layer A — CLASS_KNOWLEDGE:   shared mechanics for all specs in a class
//             (Runeforges, utility toolkit, positioning rules, group buffs)
//   Layer B — SPEC_KNOWLEDGE:    spec-specific overrides only
//             (Apex talent, hero talent choice, stat priority, gems, craft)
//   Layer C — SPEC_CORRECTIONS:  reviewed live corrections from the
//             verification pipeline (highest authority — overrides A + B)
//
// getSpecKnowledge() merges all three layers in order.
// Claude's live web_search can discover conflicts → emits [KNOWLEDGE_UPDATE]
// blocks → App strips them → api/corrections.js → Discord review →
// developer merges into SPEC_CORRECTIONS → next user gets corrected knowledge.
//
// Sources: icy-veins.com, method.gg, Peak of Serenity (verified 2026-03-28)
// ═══════════════════════════════════════════════════════════════

export const KNOWLEDGE_VERSION = "S1 12.0.5";
export const KNOWLEDGE_DATE    = "2026-03-28";

// ══════════════════════════════════════════════════════════════════
// LAYER A — CLASS KNOWLEDGE
// Shared mechanical rules, utility toolkit, positioning constraints.
// Applied to every spec in the class automatically.
// Update here once → all specs in the class inherit it.
// ══════════════════════════════════════════════════════════════════

export const CLASS_KNOWLEDGE = {

  "Death Knight": `CLASS: Death Knight
RUNEFORGE — ALL DK SPECS: Death Knight weapon enchants are Runeforges ONLY. Standard enchants and weapon oils (including Thalassian Phoenix Oil) MUST NOT be applied to any DK weapon — Runeforge completely replaces them.
  Rune of the Fallen Crusader: Default for Blood and Frost DK (sustained output + survivability proc)
  Rune of Razorice: M+ alternative for Frost DK (adds Frost vulnerability stack, pairs with Frost damage)
  Rune of the Apocalypse: Mandatory for Unholy DK in all content (Disease proc synergy)
CLASS UTILITY: Anti-Magic Shell (personal magic immunity 5s — usable while casting, absorbs incoming magic), Anti-Magic Zone (group 20% magic damage reduction — place reactively on dangerous magic casts or overlapping mechanics), Death Gate (fast class-hall travel), Chains of Ice (strong slow + snare).
DEATH GRIP: Pull any enemy to you — invaluable in M+ for repositioning casters, pulling separated mobs onto the tank, or yanking priority targets to the kill zone. Coordinate with tank before using on non-priority enemies.`,

  "Demon Hunter": `CLASS: Demon Hunter
CHAOS BRAND: Demon Hunters apply a passive debuff increasing magic damage taken by 5%. Always valuable in magic-heavy groups — one of the reasons DHs are always welcome in group content.
MOBILITY: Fel Rush and Vengeful Retreat give DH one of the best gap-closing kits in the game. Double Jump + Glide for vertical movement. Devourer adds mid-range caster positioning (25-35 yards) — unique to that spec.
SPECTRAL SIGHT: Brief true-sight through walls — niche but useful for revealing hidden enemies in M+.
UTILITY: Imprison (CC on non-boss non-player enemies), Consume Magic (magic dispel off enemies on a short CD — use on buffed M+ trash).`,

  "Druid": `CLASS: Druid
MARK OF THE WILD: Group-wide 5% stats buff — always keep active. Refreshes automatically on entering combat if talented (most specs take this).
STAMPEDING ROAR: Group-wide movement speed increase (60% for 8s) — one of the most valuable movement cooldowns in the game. Pre-place it for predictable movement mechanics in raid and M+.
INNERVATE: Grants a friendly healer free casting for 10 seconds — coordinate with healers on mana-intensive fights or after heavy AoE healing phases in M+.
REBIRTH: In-combat resurrection — on a shared 10-minute cooldown with all other combat rezzes. Save for key players (tanks, healers).
TRAVEL FORM: Instant shapeshifting breaks all movement-impairing effects. Use to escape roots and snares — shapeshifting in and out is effectively a root break.`,

  "Evoker": `CLASS: Evoker — CRITICAL POSITIONAL AND MECHANICAL NOTES
MID-RANGE SPEC: All Evoker DPS and support abilities have a minimum 25-yard range. Optimal combat position is 25-35 yards from target. Too close (under 25y) = abilities fail. Too far (over 35y) = some abilities don't reach. Evoker plays in a unique "mid-range" zone — position differently than melee or traditional ranged.
DRACTHYR ONLY: Evoker is exclusively Dracthyr. No race optimization is possible. Racial abilities (Tail Swipe, Wing Buffet, Landslide) are fixed.
HOVER: Enables casting ALL spells while moving. Critical for maintaining uptime during movement-heavy phases. Preserve Hover charges for mandatory movement requirements rather than casual repositioning.
EMPOWER MECHANIC: Hold-to-charge abilities unlock higher ranks at each threshold. Release at the correct rank for your build — most DPS builds prefer Rank 1 (quickest cast); Preservation usually wants max rank. Interrupting an Empower mid-channel wastes the cast entirely.
RESCUE: Physically moves a targeted ally to your position. One of the strongest reactive utilities in the game — plan in advance which player to Rescue for specific dangerous mechanics in each fight.`,

  "Hunter": `CLASS: Hunter
MISDIRECTION: Redirects your next threat-generating ability to a friendly target (usually the tank). Use before pulls to help establish threat, or if you accidentally over-aggro.
BINDING SHOT: AoE stun/root on a 45s CD — excellent M+ CC. Mobs that walk out of the zone get rooted; mobs that stay get stunned after 1.5s.
ASPECT OF THE TURTLE: Personal immunity for 8s — blocks ALL damage and harmful effects. Use on targeted mechanics, not as a panic button when already taking damage.
FEIGN DEATH: Drops combat and resets threat. Useful for mistake recovery and combat resetting in M+. Does not work on some boss abilities that track the player.
TRANQUILIZING SHOT: Removes one enrage effect or magic buff from an enemy. Essential on many M+ packs and some raid mechanics — always check if enemies enrage.`,

  "Mage": `CLASS: Mage
TIME WARP: Mage's Bloodlust equivalent — 30% Haste for 40s on a 5-minute CD. Coordinate with the group: most specs benefit from stacking personal damage cooldowns inside Time Warp. After use, affected players gain Temporal Displacement (prevents re-buffing for 10 minutes).
SPELLSTEAL: Steals a beneficial buff from an enemy and applies it to you. Extremely powerful on many M+ bosses and trash — check which enemies buff themselves.
REMOVE CURSE: Removes curse effects from allies. One of the few classes with this dispel.
INVISIBILITY: Drops combat after 3 seconds, then full stealth. Can skip dangerous packs in M+ but requires pre-planning.
COUNTERSPELL: 24s CD interrupt on a single target — Mage has one of the shortest interrupt CDs in the game. Always kick on cooldown in M+.`,

  "Monk": `CLASS: Monk
ROLL / CHI TORPEDO: Among the strongest short-distance mobility tools in the game. Two charges. Tiger's Lust removes movement-impairing effects from a friendly target — strong external on rooted allies.
PARALYSIS: Single-target CC (30s, 15s in PvP) — works on most M+ enemies including many that resist standard CC. Breaks on damage.
RING OF PEACE: Knockback ring on a 45s CD — excellent interrupt tool: knock mobs away from casts, push them off ledges in M+. Underused by many players.
FORTIFYING BREW: Large personal defensive on a 6-minute CD — use proactively before high-damage phases, not reactively.
TRANSCENDENCE: Place a spirit anchor, return to it instantly — advanced positioning tool for specific encounter mechanics.`,

  "Paladin": `CLASS: Paladin
BLESSING OF PROTECTION: Makes a target immune to physical damage and removes physical debuffs for 10s. Cannot cast physical attacks or be targeted by physical abilities. Applies Forbearance (prevents other immunities for 30s). Invaluable for removing dangerous physical debuffs in raid.
BLESSING OF SACRIFICE: Redirects 30% of incoming damage from an ally to you for 12s. Use on a low-health key player combined with your own defensives.
DEVOTION AURA: Raid-wide 20% magic damage reduction for 8s on a 3-minute CD. Coordinate with the raid for predictable magical damage spikes — one of the best group defensives in the game.
DIVINE SHIELD: Complete immunity for 8s. Clears all debuffs and resets threat. Applies Forbearance. High value — plan usage carefully around Forbearance lockout.
LAY ON HANDS: Full health restore on a target on a 10-minute CD. Save for actual near-death emergencies on key players.`,

  "Priest": `CLASS: Priest
POWER INFUSION: 20% Haste to yourself or an ally for 20s on a 2-minute CD. Coordinate with the highest-output DPS or your healer during throughput-intensive phases. Using it on yourself is often suboptimal if a DPS can benefit more.
MASS DISPEL: AoE magic dispel — removes magic effects from multiple allies AND enemies simultaneously. One of the most powerful utility spells in the game. Works on many otherwise undispellable effects.
FADE: Temporary threat drop + speed increase. Shadow gains additional benefits. Use before threat-sensitive moments.
LEAP OF FAITH (Life Grip): Physically pulls a friendly target to you. Invaluable for saving players from dangerous mechanics — one of the most unique utilities in the game.`,

  "Rogue": `CLASS: Rogue
SHROUD OF CONCEALMENT: Group-wide stealth for 15 seconds — unique to Rogue, and one of the most powerful M+ utilities in the game. Use to bypass dangerous trash packs entirely. Plan your M+ route around Shroud windows.
DUAL WEAPON OILS: Apply Thalassian Phoenix Oil to BOTH weapons (main hand AND off hand). This doubles the proc rate compared to one weapon. Never skip the off-hand application.
COMBO POINTS: All three Rogue specs build to 5+ combo points before using finishers. Energy pooling and combo point management is the core mechanical skill for all Rogue specs.
CC TOOLKIT: Sap (Stealth only — long CC on non-bosses), Blind (breaks on any damage — use on isolated targets or after other CCs run out), Gouge (brief stun requiring you to face the target). Most M+ enemies are susceptible to at least one of these.
CRIMSON VIAL: Strong self-heal on a 30s CD — use proactively during dangerous mechanics rather than waiting until low health.`,

  "Shaman": `CLASS: Shaman
BLOODLUST / HEROISM: 30% Haste for 40s on a 5-minute CD. Coordinate timing with the group — most players should stack personal damage cooldowns inside it. Affected targets gain Exhaustion/Sated (prevents re-buffing for 10 minutes).
WIND RUSH TOTEM: Group-wide 60% movement speed increase for 5s on a 2-minute CD. Invaluable for predictable movement phases in raids and M+. Pre-place it before movement mechanics.
TREMOR TOTEM: Breaks Fear, Charm, and Sleep effects from all nearby allies on a 1-minute CD. Situationally critical — many M+ packs apply fear effects.
EARTH ELEMENTAL: Large personal and nearby-enemy damage reduction cooldown. Underused defensive — strong for surviving dangerous mechanics.
PURGE: Removes one magic buff from an enemy on a 1.5s cast. Check which M+ enemies and bosses buff themselves — Purge is highly valuable on many encounters.
CAPACITOR TOTEM: AoE stun after a 1-second delay. Strong interrupt tool for M+ packs casting dangerous abilities simultaneously.`,

  "Warlock": `CLASS: Warlock
HEALTHSTONES: Create and distribute Healthstones to your group before every M+ pull and before raid boss encounters. Healthstones do NOT share a cooldown with health potions — both can be used in the same fight for significant total healing.
DEMONIC GATEWAY: Creates a two-way teleport between two points. Place proactively on movement-heavy encounters. One of the strongest group utility spells in the game — underutilized by many Warlock players.
SOUL LEECH: Passive absorb shield on all Warlock damage for you and your pet — provides consistent background mitigation across all specs.
DARK PACT: Sacrifice a percentage of your demon's health for a massive personal absorb shield. Best used proactively on known high-damage moments. Demon health regenerates — don't hesitate to use it.
SOULSTONE: Combat resurrection on a 10-minute shared CD. Set on a key player before dangerous phases as a contingency.`,

  "Warrior": `CLASS: Warrior
RALLYING CRY: Group-wide 15% maximum health increase for 10s on a 3-minute CD. One of the strongest group survival cooldowns — coordinate with healers for dangerous AoE damage windows in M+ and raid.
HEROIC LEAP: Instant ground-targeted jump — strong repositioning and gap-closing. Use for positioning, not just as a gap closer.
INTIMIDATING SHOUT: AoE fear on a 1-minute CD — breaks on damage to all targets except the primary focus target. Use to interrupt multiple simultaneous dangerous casts or control large M+ packs.
SPELL REFLECTION: Reflects or reduces magic damage — significantly underused. Strong against many boss targeted magic abilities.`,

};

// ══════════════════════════════════════════════════════════════════
// LAYER B — SPEC KNOWLEDGE
// Spec-specific overrides: Apex talent, hero talent choice, stat
// priority, gems/enchants, craft target, key spec tips.
// Class-level rules (Runeforges, utility toolkit) live in Layer A.
// ══════════════════════════════════════════════════════════════════

export const SPEC_KNOWLEDGE = {

  // ══════════════════════════════════════════════════════════════
  // DEATH KNIGHT
  // ══════════════════════════════════════════════════════════════

  "Blood":`SPEC: Blood Death Knight (Tank)
APEX TALENT — Dance of Midnight: Randomly summons additional Dancing Rune Weapons, combining with Blood's Apex passive that grants extra DRW procs from Rune consumption. San'layn builds lean into Vampiric Strike and Blood Beast for higher throughput; Deathbringer brings a more methodical 45-second burst window and is easier to play.
HERO TALENTS: San'layn (Icy Veins recommended — higher throughput via Vampiric Strike/Blood Beast, currently ~10% ahead on ST and cleave) | Deathbringer (Maxroll recommended — simpler execution, strong passive reduction via Rune Carved Plates, slightly ahead for M+ funnel according to some sources). SOURCE CONFLICT: Icy Veins favors San'layn; Maxroll/Boostmatch favor Deathbringer for all content. Both are fully viable — choose based on your content and complexity preference.
STAT PRIORITY (hero-talent dependent): Deathbringer: Strength > Crit = Versatility = Mastery > Haste. San'layn: Strength > Haste > Crit = Versatility = Mastery (Haste fuels Essence of the Blood Queen during DRW windows). For both: ilvl almost always beats chasing stats — do not sacrifice 10+ ilvl for secondaries. Sim yourself (Method.gg March 2026).
GEMS: 1x Indecipherable Eversong Diamond + Flawless Versatile Garnet (Versatility)
ENCHANTS: Weapon — Runeforge ONLY — choose per content: Rune of the Fallen Crusader (sustained default) | Rune of Razorice (M+). Ring — Versatility.
FLASK: Flask of the Shattered Sun or Flask of the Magisters
BEST CRAFT: 2H Weapon first (largest throughput gain). Avoid Chest (Tier slot).
KEY TIPS: Death Strike is your core survival tool — use on cooldown for self-healing. San'layn's Vampiric Strike procs during Dark Transformation maintain Essence of the Blood Queen buff — prioritise pressing it.`,

  "Frost DK":`SPEC: Frost Death Knight (DPS)
APEX TALENT — Chosen of Frostbrood: Frostwyrm's Fury deals 100% increased damage to first enemy hit and grants 15% Haste for 12 seconds. Extends active Pillar of Frost by 2 seconds. A second recall cast is available at 50% effectiveness. Frost has two Hero Talent options: Deathbringer (recommended for Raid — 2H Breath of Sindragosa build, 45s windows via Reaper's Mark) and Rider of the Apocalypse (M+ — minion damage, extra Death Charge mobility, stronger 1.5m window).
HERO TALENTS: Deathbringer (Raid — 2H Breath build) | Rider of the Apocalypse (M+)
STAT PRIORITY: Strength > Mastery (PRIMARY secondary — Potion of Recklessness procs your highest stat, want it to be Mastery) > Crit (Killing Machine procs) > Haste > Versatility. WARNING: Our stat priority previously had Haste ranked above Mastery — this was WRONG. Mastery is the top secondary for Frost DK in Midnight.
GEMS: 1x Indecipherable Eversong Diamond + Flawless Masterful Garnet (Mastery) primary
ENCHANTS: Weapon — Runeforge ONLY: Rune of the Fallen Crusader (default) | Rune of Razorice (M+ alternative). Ring — Mastery.
FLASK: Flask of the Magisters (Mastery — synergises with Potion of Recklessness)
POTION: Potion of Recklessness (procs Mastery = massive value — do NOT use Light's Potential instead)
BEST CRAFT: 2H Weapon (Missive: Mastery + Crit). Frost runs 2H for Breath of Sindragosa builds. Never craft 1H if running Breath.
KEY TIPS: Frostwyrm's Fury hits the FIRST enemy — aim at priority target. The recall doubles its value. Time at Pillar of Frost opening. Potion of Recklessness procs highest secondary — actively manage your stat balance so Mastery stays on top.`,

  "Unholy":`SPEC: Unholy Death Knight (DPS)
APEX TALENT — Forbidden Knowledge: Army of the Dead transforms Death Coil into Necrotic Coil and Epidemic into Graveyard for 15 seconds. Putrefy summons a Lesser Ghoul and grants 3% Mastery for 12s (stacking). Each Magus of the Dead increases Necrotic Coil/Graveyard damage by 8%. Dread Plague has a chance to summon a Lesser Ghoul that applies Putrefy.
HERO TALENTS: Rider of the Apocalypse (recommended, M+ — Reanimation, Menacing Magus) | San'layn (Raid — Vampiric Strike, Blood Beast quadratic scaling)
STAT PRIORITY: Strength > Mastery = Crit (co-equal — example distribution: 1200 Mastery / 1000 Crit / 200 Haste / 0 Versatility) > Versatility > Haste (LOWEST value for Unholy)
GEMS: 1x Indecipherable Eversong Diamond + Flawless Masterful Lapis (Mastery) and Flawless Deadly Lapis (Crit) alternating
ENCHANTS: Weapon — Runeforge ONLY: Rune of the Apocalypse (mandatory for Unholy — all content). Ring — Mastery.
FLASK: Flask of the Magisters (Mastery preferred)
BEST CRAFT: 2H Weapon (Missive: Mastery + Crit). Neck second.
KEY TIPS: Mastery and Crit are co-equal top stats — do NOT stack one exclusively. Army of the Dead is your primary DPS cooldown. Pets inherit your stats dynamically (0-5 second delay). Haste is your lowest value secondary — avoid gemming for it. Death from Range: Scourge Strike now 30 yards — you can maintain much of your rotation from range.`,

  // ══════════════════════════════════════════════════════════════
  // DEMON HUNTER
  // ══════════════════════════════════════════════════════════════

  "Havoc":`SPEC: Havoc Demon Hunter (DPS)
APEX TALENT — Eternal Hunt (4-point): Rank 1: The Hunt empowers next Eye Beam (doubled damage, larger AoE). Rank 2: The Hunt gets 15/30s reduced CD, +15/30% damage, DoT applies to 2/4 extra targets. Rank 3 (Rank 3+4): Blade Dance +20% damage, guaranteed reset of its own cooldown after fully channeling Eye Beam. ALL 4 points mandatory in every build.
HERO TALENTS: Fel-Scarred (RECOMMENDED for both Raid AND M+ — frequent burst AoE via Eye Beam/Demonic, consistent flexible choice) | Aldrachi Reaver (funnel/priority target focus — only take if you specifically need Reaver's Glaive for funnel damage). Method.gg: Fel-Scarred ahead in almost all profiles.
STAT PRIORITY: Agility > Crit (top — Know Your Enemy interaction, Ragefire scaling) > Mastery (strong — scales all Chaos damage via Demonic Presence; Fel-Scarred leans harder into Mastery) > Haste > Versatility (lowest). Fel-Scarred favors Mastery to a larger extent; Aldrachi favors Crit.
GEMS: 1x Indecipherable Eversong Diamond + Flawless Masterful Garnet (Mastery) in every other slot — Method.gg confirmed. Note: use gems giving 2 stats for better value.
ENCHANTS: Weapon — 1x Jan'alai's Precision + 1x Arcane Mastery (Mastery+Haste preferred). Ring — Mastery or Crit (sim)
FLASK: Flask of the Shattered Sun (Crit)
POTION: Light's Potential (best for Havoc — pair with Bloodlust and major CDs; Potion of Recklessness viable at higher gear)
WEAPON OIL: Two Thalassian Phoenix Oil
BEST CRAFT: Glaive weapon first (Missive: Crit + Haste). Belt second.
KEY TIPS: Always fully channel Eye Beam — Blade Dance reset ONLY triggers on full channel. Never cut it short.`,

  "Vengeance":`SPEC: Vengeance Demon Hunter (Tank)
APEX TALENT — Untethered Rage (4 points): Ranks 1+4: Soul Cleave and Spirit Bomb have a chance per Soul Fragment consumed to grant a free Metamorphosis charge lasting 10 seconds (use within 12s). Ranks 2+3 (passive): increases Soul Cleave and Spirit Bomb damage, AND allows both to consume one additional Soul Fragment per cast — which in turn raises your proc rate. All 4 points mandatory. There are no "Seething Anger" stacks — that was a hallucination.
HERO TALENTS: Aldrachi Reaver | Fel-Scarred — both viable for tank
STAT PRIORITY: Agility > Versatility > Haste > Mastery (Fel Blood armor) > Crit
GEMS: 1x Indecipherable Eversong Diamond + Flawless Versatile Garnet
ENCHANTS: Weapon — Enchant Weapon - Acuity of the Ren'dorei. Ring — Versatility
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Ring or Neck (non-Tier, Missive: Versatility + Haste). Avoid Shoulders/Chest.
KEY TIPS: More Soul Fragments consumed per cast = higher Untethered Rage chance. Seething Anger is a reliable damage floor between procs.`,

  "Devourer":`SPEC: Devourer Demon Hunter (NEW — INT-based DPS, mid-range 25-35 yards)
APEX TALENT — Midnight: Collapsing Star always critically strikes. All Cosmic damage +3% (x2 points). Collapsing Star crit damage +50% of your Crit chance. Void Metamorphosis spawns 5 Soul Fragments + grants immediate Collapsing Star.
HERO TALENTS: Annihilator (RECOMMENDED — slightly ahead in both AoE and ST, easier execution without melee weaving, Voidfall meteor burst, no bugs) | Void-Scarred (alternative — burst Voidsurge windows during Void Meta, currently has bugs affecting some builds; Icy Veins and Maxroll both recommend Annihilator as default due to bugs + cleave flexibility)
STAT PRIORITY (hero-talent dependent): Intellect (PRIMARY — Devourer is INT-based, NOT Agility) > Haste (Annihilator — top secondary, ramps Void Metamorphosis via Emptiness, Icy Veins: "Annihilator strongly prefers Haste") / Mastery (Void-Scarred — Monster Within doubles during Void Meta) > Mastery/Haste (whichever is secondary for your build) > Versatility > Crit (lowest — Collapsing Star always crits, raw Crit less efficient). Both builds share a gear set without significant loss.
GEMS: 1x Indecipherable Eversong Diamond + Flawless Quick Amethyst (Haste)
ENCHANTS: Weapon — Enchant Weapon - Arcane Mastery + Enchant Weapon - Berserker's Rage pair (Mastery+Haste preferred) OR two Acuity of the Ren'dorei at lower gear. Ring — Mastery or Haste (sim). Helm/Shoulders/Boots — Avoidance
FLASK: Flask of the Magisters (Mastery — Void-Scarred preferred)
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Weapon first (Spellbreaker's Warglaive + Darkmoon Sigil: Hunt). Belt/Bracers with Arcanoweave Lining second. NEVER craft Tier slots.
KEY TIPS: DEVOURER USES INTELLECT GEAR — not Agility. Position at 25-35 yards (mid-range). Collapsing Star always crits = raw Crit stat is less efficient, stack Mastery instead.`,

  // ══════════════════════════════════════════════════════════════
  // DRUID
  // ══════════════════════════════════════════════════════════════

  "Balance":`SPEC: Balance Druid (DPS)
APEX TALENT: Activating Eclipse makes next Wrath/Starfire instant. First 3 Starsurges/Starfalls per Eclipse deal +20% damage. Crits during Eclipse apply languish (12% extra damage over 6s). Eclipse activation launches guaranteed-crit Bolts at all enemies within 40 yards.
HERO TALENTS: Keeper of the Grove (burst, short CDs, good priority damage, flexible) | Elune's Chosen (highest simming ST and mass AoE in Midnight — within 1% of KotG, both fully viable). Start with whichever you prefer.
STAT PRIORITY: Intellect > Haste, Crit, and Mastery (ALL ROUGHLY EQUAL — one of the least stat-dependent specs. Rings/necks especially benefit from high secondary stats since they lack Intellect). Use Top Gear on Raidbots to compare pieces at same ilvl.
GEMS: 1x Indecipherable Eversong Diamond + Flawless Deadly Amethyst (Crit) or your top simmed stat
ENCHANTS: Weapon — Enchant Weapon - Acuity of the Ren'dorei. Ring — Crit (Eyes of the Eagle — generally stronger)
FLASK: Flask of the Shattered Sun (Crit)
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Staff (Missive: Haste + Crit). Avoid Chest/Shoulders (Tier).
KEY TIPS: Haste, Crit and Mastery are so close in value that ilvl upgrades almost always beat stat optimization on non-jewelry pieces. For rings/neck — stats matter more since they lack Intellect.`,

  "Feral":`SPEC: Feral Druid (DPS)
APEX TALENT — Unseen Predator: Ferocious Bite has a chance per combo point to teleport to an enemy and deal Unseen Slash (ST) or Unseen Swipe (AoE). Builds Unseen Attack stacks (+8% damage/stack). Tiger's Fury triggers Unseen Attack after next 2 CP generators. Rip + Unseen Attack damage +30%.
HERO TALENTS: Wildstalker (Raid — ST DoT focus, Bloodseeker Vines amplify bleeds) | Druid of the Claw (M+ — AoE burst via Ravage auto-attack procs, better defensives via Bear Form synergy)
STAT PRIORITY: Agility > Mastery (TOP secondary — Razor Claws amplifies both bleeds AND finishers, critical for Druid of the Claw and Wildstalker) > Crit (Primal Fury extra CP on crit) > Haste > Versatility. NOTE: Mastery is the clear #1 secondary for Feral in Midnight.
GEMS: 1x Indecipherable Eversong Diamond + Flawless Masterful Peridot (Mastery) primary
ENCHANTS: Weapon — Enchant Weapon - Acuity of the Ren'dorei. Ring — Crit (Eyes of the Eagle)
FLASK: Flask of the Shattered Sun (Crit) or Flask of the Magisters (Mastery)
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Agility weapon (Missive: Mastery + Crit). Neck second.
KEY TIPS: Rip is mandatory — it gives the 30% Unseen Attack damage bonus. Never let Rip fall off. Mastery is your best secondary by a clear margin in Midnight.`,

  "Guardian":`SPEC: Guardian Druid (Tank)
APEX TALENT — Wild Guardian: After Berserk/Incarnation ends, next 2 Ironfur/Maul/Frenzied Regen echoed at 50% effectiveness. Mastery +3%. Maul always empowered (+20% Nature DoT). Dream Guide charges upgrade echoes to 150% repeated twice.
HERO TALENTS: Druid of the Claw (Raid — single target boss damage, 3-5 target M+ pulls, strong Bear Form synergy) | Elune's Chosen (M+ scaling — Lunar Beam on short CD, Moonfire spread, excellent self-healing ramp)
STAT PRIORITY: Agility > Versatility > Mastery (Ursoc's Endurance — bonus Armor, +3% from Apex passive) > Haste > Crit. All secondaries close — ilvl generally wins.
GEMS: 1x Indecipherable Eversong Diamond + Flawless Versatile Garnet
ENCHANTS: Weapon — Enchant Weapon - Acuity of the Ren'dorei. Ring — Versatility
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Cloak (non-Tier, Missive: Versatility + Mastery)
KEY TIPS: Time Berserk into high-damage phases — Wild Guardian echoes are strongest immediately after Berserk ends. Elune's Chosen scales much better on larger M+ pulls due to Moonfire spread.`,

  "Restoration Druid":`SPEC: Restoration Druid (Healer)
APEX TALENT — Lifebloom Ascendance: Lifebloom stacks every 5s up to 3. 15% of Lifebloom healing splashes to 2 allies within 30 yards. Soul of the Forest consumption triggers Blooming Frenzy (5 rapid blooms).
HERO TALENTS: Keeper of the Grove (burst healing, Grove Guardians mechanic — cast Swiftmend/Wild Growth to summon multiple Guardians, great with Convoke) | Living Seed (passive, consistent — recommended for Mythic+)
STAT PRIORITY: Intellect > Mastery (Harmony — bonus to direct heals on HoT targets; Lifebloom stacking multiplies this) > Haste (faster HoT ticks, shorter Lifebloom cycle) > Versatility > Crit
GEMS: 1x Indecipherable Eversong Diamond + Flawless Masterful Lapis (Mastery)
ENCHANTS: Weapon — Enchant Weapon - Acuity of the Ren'dorei. Ring — Mastery
FLASK: Flask of the Magisters (Mastery)
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Staff (Missive: Mastery + Haste). Bracers or Belt second.
KEY TIPS: Keeper of the Grove stacks multiple Grove Guardians — saving Convoke the Spirits for burst healing windows multiplies their effectiveness dramatically. Keep Lifebloom stacked to 3 on most dangerous target.`,

  // ══════════════════════════════════════════════════════════════
  // EVOKER
  // ══════════════════════════════════════════════════════════════

  "Devastation":`SPEC: Devastation Evoker (DPS)
APEX TALENT — Rising Fury: During Dragonrage, gain Rising Fury every 6s (+4% Haste/stack, max 5). At 5 stacks all damage +15%. After Dragonrage, Risen Fury maintains bonuses and generates Essence Burst every 4s.
HERO TALENTS: Scalecommander (RECOMMENDED for both Raid AND M+ — outperforms Flameshaper in almost all scenarios; Mass Disintegrate cleave, steerable Deep Breath, spread cleave) | Flameshaper (niche — only ahead in very long sustained AoE situations). Both Method.gg and Maxroll confirm Scalecommander as default.
STAT PRIORITY: Intellect > Crit (top secondary — Crit and Haste very close, Crit edges ahead) > Haste > Mastery (Giantkiller — % Empower bonus) > Versatility
GEMS: 1x Powerful Eversong Diamond (prefer variety of gem colors for Movement Speed bonus) + Flawless Quick Garnet/Flawless Deadly Peridot spread
ENCHANTS: Weapon — Enchant Weapon - Acuity of the Ren'dorei or Jan'alai's Precision (within margin of error — buy cheapest). Ring — Crit (Eyes of the Eagle)
FLASK: Flask of the Shattered Sun (Crit)
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Weapon (Missive: Crit + Haste). Avoid Chest (Tier).
KEY TIPS: Dragonrage lasts 18s — reach 3+ Rising Fury stacks within it. Risen Fury window after Dragonrage: dump Essence Burst aggressively.`,

  "Preservation":`SPEC: Preservation Evoker (Healer)
APEX TALENT — Merithra's Blessing: Essence abilities chance to upgrade next Reversion to heal target + 5 nearby allies for 250% Spell Power. Reversion passively reverses 1% of all damage taken. Dream Breath instant healing +125%, always grants Merithra's Blessing.
HERO TALENTS: Temporal Anomaly (recommended — consistent, mana efficient) | Chronowarden (Chrono Ward shields, more burst)
STAT PRIORITY: Intellect > Mastery (Golden Hour — HoT bonus) > Haste (more Essence casts, more procs) > Versatility > Crit
GEMS: 1x Indecipherable Eversong Diamond + Flawless Masterful Lapis (Mastery)
ENCHANTS: Weapon — Acuity of the Ren'dorei or Jan'alai's Precision. Ring — Mastery
FLASK: Flask of the Magisters (Mastery)
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Staff (Missive: Mastery + Haste).
KEY TIPS: Dream Breath is highest-priority heal. The 1% damage reversal passive is meaningful on AoE damage encounters.`,

  "Augmentation":`SPEC: Augmentation Evoker (Support DPS)
APEX TALENT — Future Duplicate: Breath of Eons summons a future-you for 20s. Ebon Might extensions extend duplicate by 50%. While active: Ebon Might grants 100% extra stats, Upheaval/Eruption +25% damage.
HERO TALENTS: Scalecommander (RECOMMENDED as default — less dependent on ally performance, notably ahead in M+, competitive in Raid) | Chronowarden (viable in Raid if allies coordinate burst; slightly ahead in Raid pure ST but reliant on ally skill). Icy Veins: "We recommend Scalecommander for the default raiding choice."
STAT PRIORITY: Intellect > Crit (top secondary — scales Eruption and shared stats) = Haste (more Ebon Might extensions) > Mastery (Timewalker — shared stats) > Versatility
GEMS: 1x Indecipherable Eversong Diamond + Flawless Deadly Peridot (Crit+Haste)
ENCHANTS: Weapon — Jan'alai's Precision or Acuity of the Ren'dorei (buy cheapest). Ring — Crit (Eyes of the Eagle)
FLASK: Flask of the Shattered Sun (Crit — top stat for Augmentation in S1)
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Neck or Weapon (Missive: Crit + Haste).
KEY TIPS: Coordinate Breath of Eons with group's burst CDs. Maximise Ebon Might extension frequency during duplicate window — each extension also extends the duplicate.`,

  // ══════════════════════════════════════════════════════════════
  // HUNTER
  // ══════════════════════════════════════════════════════════════

  "Beast Mastery":`SPEC: Beast Mastery Hunter (DPS)
APEX TALENT — Animal Companion: Bestial Wrath summons an Animal Companion from your Stable for 15s. Pet damage +5%. Bestial Wrath strikes 2 additional targets. Barbed Shot/Cobra Shot +15% damage, each increases next Kill Command by 30%.
HERO TALENTS: Pack Leader (M+ — pet damage burst, strong pack synergy) | Dark Ranger (Raid — Black Arrow, shadowy pet buffs)
STAT PRIORITY: Agility > Crit (stronger than Haste for all-around play; Haste better on pure single target) > Haste > Mastery (Master of Beasts — pet damage %) > Versatility
GEMS: 1x Indecipherable Eversong Diamond + Flawless Deadly Amethyst (Crit)
ENCHANTS: Weapon — Enchant Weapon - Acuity of the Ren'dorei. Ring — Haste or Crit (sim)
FLASK: Flask of the Shattered Sun (Crit)
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Back/Cloak first (non-Tier, Missive: Agility + Crit). Ranged weapon second (4 Sparks).
KEY TIPS: Stack Kill Command buffs from Barbed Shot + Cobra Shot + Black Arrow before casting. Keep Bestial Wrath on cooldown. Crit is better than Haste for most content despite Haste being slightly better ST.`,

  "Marksmanship":`SPEC: Marksmanship Hunter (DPS)
APEX TALENT — Precision: Rapid Fire +25% damage, each shot reduces Aimed Shot CD by 0.5s. Aimed Shot crit damage +25% of your Crit chance. All ranged abilities +3% damage. Aimed Shot always critically strikes.
HERO TALENTS: Dark Ranger (recommended — Black Arrow, shadow DoTs) | Sentinel (M+ — Lunar Storm burst AoE)
STAT PRIORITY: Agility > Crit = Mastery (CO-EQUAL top secondaries in Midnight — both roughly the same value) > Versatility ≈ Haste (both significantly behind Crit/Mastery). Haste M+ BREAKPOINT: 8.34% to fit two back-to-back Aimed Shots into Volley. NOTE: Previous spec listed only Crit as premier — Mastery is equally important.
GEMS: 1x Powerful Eversong Diamond (if 5+ sockets) or Indecipherable Eversong Diamond + Flawless Deadly Amethyst (Crit) or Flawless Masterful Amethyst (Mastery)
ENCHANTS: Weapon — Enchant Weapon - Acuity of the Ren'dorei. Ring — Crit (Eyes of the Eagle) or Mastery (both good)
FLASK: Flask of the Shattered Sun (Crit)
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Back/Cloak first (Missive: Crit + Mastery). Ranged weapon second (4 Sparks).
KEY TIPS: Crit AND Mastery are co-top stats — don't stack just one. If doing M+, hit the 8.34% Haste breakpoint before investing in other secondaries. Aimed Shot always crits AND Crit chance amplifies Apex Talent — makes Crit feel stronger than raw numbers show.`,

  "Survival":`SPEC: Survival Hunter (Melee DPS)
APEX TALENT — Raptor Swipe: Raptor Strike 25% chance to upgrade to Raptor Swipe (AoE). RS/Wildfire Bomb/Raptor Swipe +20% damage. Raptor Swipe +50% damage to primary target. Tip of the Spear-buffed Raptor Swipes trigger Strike as One at 300%.
HERO TALENTS: Pack Leader (recommended — pet synergy, Kill Command buff chains) | Sentinel (Lunar Storm AoE option)
STAT PRIORITY: Agility > Mastery (Spirit Bond — % damage bonus to you AND pet, doubled within 25 yards; also reduces damage taken) > Haste (energy regen for more Raptor Strikes) > Crit > Versatility. NOTE: Mastery is the top secondary for Survival, not Haste as previously listed.
GEMS: 1x Indecipherable Eversong Diamond + Flawless Masterful Amethyst (Mastery)
ENCHANTS: Weapon — Enchant Weapon - Acuity of the Ren'dorei. Ring — Mastery or Haste
FLASK: Flask of the Magisters (Mastery) or Flask of the Shattered Sun
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Melee weapon (Missive: Agility + Mastery). Bracers second.
KEY TIPS: Stay within 25 yards of your pet to double the Mastery bonus from Spirit Bond. Raptor Strike into Tip of the Spear-buffed Raptor Swipe for the 300% Strike as One proc is your ST skill expression.`,

  // ══════════════════════════════════════════════════════════════
  // MAGE
  // ══════════════════════════════════════════════════════════════

  "Arcane":`SPEC: Arcane Mage (DPS)
APEX TALENT — Touch Rune: Touch of the Magi increases damage target receives from you by 15%. Arcane Charges further increase Arcane Blast/Pulse/Barrage by 30%. Arcane Missiles +20% damage. Touch explosion leaves a rune dealing 75% of explosion damage over 6s to nearby enemies.
HERO TALENTS: Sunfury (recommended — Arcane Phoenix pet, Arcane Soul burst window, Memory of Al'ar; strongest overall) | Spellslinger (M+ alternative — Arcane Splinter generation, Polished Focus Barrage loop). NOTE: Both are Arcane-only hero trees. Spellfrost Bolt is NOT an Arcane mechanic — that belongs to Frost Mage Frostfire hero talent.
STAT PRIORITY: Intellect > Mastery (Savant — Mana pool, Mana regen, Arcane Charge damage, all spell damage) > Haste > Crit > Versatility. NOTE: All secondary stats are very close for Arcane. Simming yourself is especially important for this spec.
GEMS: 1x Telluric Eversong Diamond (not Indecipherable — Arcane benefits from the mana/Mastery bonus) + one gem of EACH color (e.g. Flawless Quick Amethyst + Flawless Quick Garnet + Flawless Deadly Peridot + Flawless Deadly Lapis) to maximize the Telluric Movement Speed bonus. Method.gg confirmed.
ENCHANTS: Weapon — Acuity of the Ren'dorei. Ring — Eyes of the Eagle (updated March 16 2026 — Icy Veins says slightly better than stat enchants in almost all situations)
FLASK: Flask of the Magisters (Mastery — scales Mana which scales Arcane Charge bonus)
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Staff (Missive: Mastery + Haste). Belt second.
KEY TIPS: All secondaries are VERY close for Arcane — this is one of the specs where simming is most important. Precast Touch of the Magi, build charges, dump into explosion.`,

  "Fire":`SPEC: Fire Mage (DPS)
APEX TALENT — Fired Up: Consuming Hot Streak has 20% chance to grant Fired Up (+4% Fire damage, 12s). Combustion increases Fired Up chance and extends Combustion by 1s. Gaining Fired Up reduces Fire Blast CD by 2.5s. All Fire damage +3%.
HERO TALENTS: Sunfury (RECOMMENDED for all content — Arcane Phoenix, Pyroblast windows, Meteorites) | Frostfire (undertuned at Season 1 launch — not recommended). NOTE: Spellslinger is NOT a Fire Mage hero talent. Fire options are Sunfury and Frostfire only.
STAT PRIORITY: Intellect > Crit (Hot Streak requires 2 crits — more Crit = more Fired Up + Combustion extensions) > Haste (shorter Fire Blast/Scorch CDs) > Mastery (Ignite periodic) > Versatility
GEMS: 1x Indecipherable Eversong Diamond + Flawless Deadly Amethyst (Crit)
ENCHANTS: Weapon — Acuity of the Ren'dorei. Ring — Crit (Eyes of the Eagle)
FLASK: Flask of the Shattered Sun (Crit)
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Staff (Missive: Crit + Haste). Avoid Shoulders/Chest (Tier).
KEY TIPS: Combustion extension via Fired Up can spiral into 15+ second windows. Fire Blast CD reduction from Fired Up makes Hot Streak chains self-sustaining during lucky windows.`,

  "Frost Mage":`SPEC: Frost Mage (DPS)
APEX TALENT — Hand of Frost: Shattering an enemy has 10% chance to summon a Hand of Frost (500% Spell Power Frost damage). Each Freezing stack +1% Hand of Frost chance. Hand of Frost damage +1% spell damage for 8s. Ray of Frost summons 4 Hands of Frost, gains extra charge, +25% damage.
HERO TALENTS: Spellslinger (RECOMMENDED — Frost Splinter generation, Frozen Orb synergy, best for Raid and M+) | Frostfire (underperforming at launch, avoid unless specifically tuned up)
STAT PRIORITY: Intellect > Mastery = Crit (CO-EQUAL top secondaries — Mastery scales Freeze/Shatter damage; Crit multiplies Shatter hits) > Haste > Versatility (LOWEST — avoid stacking). NOTE: Previous session had Versatility as #1 which was WRONG — verified Method.gg March 2026.
GEMS: 1x Indecipherable Eversong Diamond + Flawless Masterful Amethyst (Mastery) or Flawless Deadly Amethyst (Crit) — sim your character
ENCHANTS: Weapon — Acuity of the Ren'dorei. Ring — Mastery or Crit (sim)
FLASK: Flask of the Shattered Sun (Crit). Potion: Potion of Recklessness with CDs
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Ring (non-Tier). Staff second (Missive: Mastery + Crit).
KEY TIPS: Mastery and Crit are CO-EQUAL top stats — do NOT stack Versatility (it is the lowest value secondary for Frost). Ray of Frost guarantees 4 Hand of Frost summons and is your highest-priority cast — never cut the channel short.`,

  // ══════════════════════════════════════════════════════════════
  // MONK
  // ══════════════════════════════════════════════════════════════

  "Brewmaster":`SPEC: Brewmaster Monk (Tank)
APEX TALENT — Empty Barrel: Drinking a Brew has 20% chance to create an Empty Barrel — thrown with Keg Smash for 300% AP Physical damage. Gaining Empty Barrel resets Keg Smash CD and +10% physical damage dealt. Fortifying Brew or Celestial Brew grants Refreshing Drink (heals 3200% AP over 8s).
HERO TALENTS: Shado-Pan (recommended — One vs Many, Flurry Strikes, consistent pressure) | Master of Harmony (healing focus, Jade Ignition)
STAT PRIORITY: Agility > Crit = Mastery = Versatility > Haste (ALL close — ilvl beats stat hunting). Brewmaster stat priority barely changes between Hero Talents. Just wear highest ilvl gear.
GEMS: 1x Indecipherable Eversong Diamond + Flawless Versatile Garnet (Versatility) and Flawless Deadly Lapis (Crit) mix
ENCHANTS: Weapon — Acuity of the Ren'dorei. Ring — Versatility or Crit
FLASK: Flask of the Shattered Sun (Crit — useful for both damage and defense)
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Belt or Weapon (Missive: Versatility + Haste). Avoid Chest/Shoulders.
KEY TIPS: Empty Barrel resets Keg Smash CD — doubles uptime on procs. Refreshing Drink is enormous self-sustain — time Fortifying/Celestial Brew around damage phases. ALL secondary stats are nearly equal — don't overthink gearing.`,

  "Mistweaver":`SPEC: Mistweaver Monk (Healer)
APEX TALENT — Spirit Font (Spiritfont): Vivify and Rising Sun Kick grant a buff causing your next Enveloping Mist to channel Soothing Mist onto up to 5 targets at 20% effectiveness. Higher ranks increase the effectiveness. Rising Sun Kick damage and Enveloping Mist healing +10% during Spiritfont channel. Thunder Focus Tea activates Spiritfont and applies Chi Cocoons.
HERO TALENTS: Ancient Teachings (recommended — Fistweaving hybrid, melee generates healing) | Shado-Pan (pure healing focused, Shadowed Abyss for absorb shields)
STAT PRIORITY: Intellect > Haste (shorter RSK CD, more Vivify casts = more Spiritfont chances) > Critical Strike (Mana Tea also has a chance equal to Crit to generate extra stacks) > Mastery (Gust of Mists — bonus direct healing via Vivify) > Versatility
GEMS: 1x Indecipherable Eversong Diamond + Flawless Quick Amethyst (Haste)
ENCHANTS: Weapon — Acuity of the Ren'dorei. Ring — Haste or Mastery
FLASK: Flask of the Blood Knights (Haste)
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Staff (Missive: Haste + Mastery). Bracers second.
KEY TIPS: Thunder Focus Tea is a guaranteed Spiritfont trigger — save for burst healing moments. Maintain RSK on cooldown — it's both damage and a Spiritfont trigger. Fistweaving (Ancient Teachings) is competitive with pure healing builds in M+.`,

  "Windwalker":`SPEC: Windwalker Monk (DPS)
APEX TALENT — Tigereye Brew: During combat you generate stacks that are spent when you cast Zenith to increase your chance to Crit. Outside combat stacks back to 10+ quickly. Primary gameplay note: spread out Zenith charges rather than using back-to-back, as the second use will have far fewer stacks.
HERO TALENTS: Shado-Pan (RECOMMENDED for M+ — Flurry Strikes, Shado Over the Battlefield AoE, simpler to play, higher AoE) | Conduit of the Celestials (Raid boss damage — Invoke Xuen, Heart of the Jade Serpent, more complex)
STAT PRIORITY: Agility > Haste (top secondary — energy regen, Fists of Fury/RSK CD, rotation pace) > Critical Strike >= Mastery (Combo Strikes — never repeat same ability; all four stats very close and gear-dependent, always sim) >>> Versatility (LOWEST value for PvE Windwalker — does not benefit Touch of Death/Karma). NOTE: Previous session incorrectly placed Versatility as #1. Sim yourself — gear shifts rankings.
GEMS: 1x Indecipherable Eversong Diamond + Flawless Quick Amethyst (Haste) or sim to find your current best
ENCHANTS: Weapon — Acuity of the Ren'dorei. Ring — Haste or Crit (sim — varies by gear)
FLASK: Flask of the Blood Knights (Haste — confirmed Peak of Serenity March 2026)
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Weapon (Missive: Agility + Haste). Bracers second.
KEY TIPS: Mastery: Combo Strikes — NEVER repeat the same ability back-to-back. This is the #1 Windwalker rule. Shado-Pan removes all tracking requirements for Energy spent. Zenith (replaces Storm, Earth, and Fire) is your primary cooldown.`,

  // ══════════════════════════════════════════════════════════════
  // PALADIN
  // ══════════════════════════════════════════════════════════════

  "Holy Paladin":`SPEC: Holy Paladin (Healer)
APEX TALENT — Beacon of the Savior: While in combat, an additional Beacon is automatically placed on the lowest health ally, transferring healing. Transfers to new target if healed above 50% or another drops below. Higher ranks increase transfer amount and add absorb shields.
HERO TALENTS: Lightsmith (Craft Armor of Light for absorb shields, consistent healing) | Herald of the Sun (Dawnlights DoT, burst healing via Sun's Avatar)
STAT PRIORITY: Intellect > Mastery (Lightbringer — % bonus based on proximity, especially with Beacon of the Lightbringer talent placing Beacons on ranged players) > Haste (shorter Holy Shock CD, more Holy Power, more Beacon transfers) > Crit (Holy Shock crit = 2 Holy Power, but diminished value due to high passive Crit from talents) > Versatility (least useful for Holy)
GEMS: 1x Indecipherable Eversong Diamond + Flawless Masterful Lapis (Mastery)
ENCHANTS: Weapon — Acuity of the Ren'dorei. Ring — Mastery or Haste
FLASK: Flask of the Blood Knights (Haste) or Flask of the Magisters (Mastery)
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Ring (non-Tier, Missive: Haste + Mastery). Weapon second.
KEY TIPS: Spread Beacons to ranged players — they are often further away, increasing your Mastery effectiveness via Beacon of the Lightbringer. You already gain a LOT of Crit from talents — avoid stacking it on gear.`,

  "Protection Paladin":`SPEC: Protection Paladin (Tank)
APEX TALENT — Glory of the Vanguard (all 4 points): Rank 1: Judgment has a chance to grant Vanguard — next Avenger's Shield deals Holy damage to all enemies between you and target. Rank 2/3: Consuming Vanguard grants Holy Power; Judgment +10%/+20% damage. Rank 4: Every Avenger's Shield during Avenging Wrath auto-applies Vanguard; Shield of the Righteous +20% damage to primary target + AoE splash. Note: "Vanguard" is the proc buff name; the apex itself is called "Glory of the Vanguard."
HERO TALENTS: Templar (recommended for most content — Hammer of Light burst via Divine Toll, Divine Resonance Avenger's Shield chain, higher damage) | Lightsmith (M+ beginners / utility focus — Holy Bulwark group absorb shield, Sacred Weapon buff, Rite of Sanctification replaces weapon oil). NOTE: Both are Paladin hero talents. Mountain Thane and Colossus are Warrior hero talents — do not confuse them.
STAT PRIORITY: Strength > Versatility (damage reduction, scales SotR burst) > Haste (faster Holy Power = more SotR = more Vanguard fishing) > Mastery (Divine Bulwark — block chance) > Crit. All secondaries very close — ilvl wins.
GEMS: 1x Indecipherable Eversong Diamond + Flawless Versatile Garnet
ENCHANTS: Weapon — Acuity of the Ren'dorei. Ring — Versatility
FLASK: Flask of the Shattered Sun or Flask of the Magisters
WEAPON OIL: Thalassian Phoenix Oil (Templar) | Rite of Sanctification (Lightsmith ONLY — this replaces weapon oil entirely, do not use Phoenix Oil as Lightsmith)
BEST CRAFT: 1H Weapon (Missive: Versatility + Haste). Belt second. Never craft Shoulders, Chest, or Gloves (all Tier).
KEY TIPS: Templar activates Hammer of Light via Divine Toll — align Divine Toll with Avenging Wrath every 60s. Lightsmith: Holy Bulwark is a group absorb — time it before predictable high-damage moments.`,

  "Retribution":`SPEC: Retribution Paladin (DPS)
APEX TALENT — Light Within: Focused on Art of War and Righteous Cause procs, providing larger damage increases and extra effects when they proc. Prioritize using Blade of Justice when procs occur for significant damage increase. Bonus can mostly be treated as passive but don't waste proc windows.
HERO TALENTS: Templar (M+/cleave — Hammer of Light after Wake of Ashes, AoE via Divine Hammer/Empyrean Hammer) | Herald of the Sun (ST Raid — Dawnlight DoTs from Wake of Ashes, burst every minute via Dawnlights). Both competitive; Templar prefers Crusading Strikes, Herald prefers Templar Strikes.
STAT PRIORITY: Strength > Haste (Crusading Strikes Holy Power generation, shorter Judgment CD, compresses rotation) > Versatility > Critical Strike > Mastery (WORST secondary for Retribution — avoid)
GEMS: 1x Indecipherable Eversong Diamond + Flawless Quick Garnet (Haste) or Flawless Versatile Garnet
ENCHANTS: Weapon — Acuity of the Ren'dorei. Ring — Haste or Versatility
FLASK: Flask of the Blood Knights (Haste) or Flask of the Shattered Sun
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: 2H Weapon (4 Sparks, Missive: Strength + Haste). Belt second.
KEY TIPS: MASTERY IS YOUR WORST STAT — do not gem or enchant for it. Light Within (Apex) largely plays passively but prioritize Blade of Justice when it procs. Radiant Glory can replace Execution Sentence for more consistent AoE at cost of ST funnel.`,

  // ══════════════════════════════════════════════════════════════
  // PRIEST
  // ══════════════════════════════════════════════════════════════

  "Discipline":`SPEC: Discipline Priest (Healer)
APEX TALENT — Master the Darkness: Penance has high chance to upgrade next Power Word: Shield to Void Shield, applying shield and Atonement to 3 allies simultaneously. Shadow damage and Atonement healing +3% (x2 points). Void Shield reflects 25% of damage taken → Atonement healing.
HERO TALENTS: Voidweaver (recommended — Void Blast empowerment, Entropic Rift, good Atonement synergy) | Oracle (future sight, Fate — alternative healing style with premonition)
STAT PRIORITY: Intellect > Haste (shorter Penance CD = more Void Shield procs, faster Atonement application) > Mastery (Grace — Atonement healing %) > Crit (PW:Shield crit = extra Atonement) > Versatility
GEMS: 1x Indecipherable Eversong Diamond + Flawless Quick Amethyst (Haste)
ENCHANTS: Weapon — Acuity of the Ren'dorei. Ring — Haste or Mastery
FLASK: Flask of the Blood Knights (Haste)
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Staff (Missive: Haste + Mastery). Belt second.
KEY TIPS: Void Shield applying Atonement to 3 allies simultaneously is the key mechanic — triples your Atonement application rate. Voidweaver synergizes directly with this via Void Blast empowerment.`,

  "Holy Priest":`SPEC: Holy Priest (Healer)
APEX TALENT — Benediction: Prayer of Mending can upgrade Flash Heal into Benediction (+30% healing). Cosmic Ripple healing +25%. All healing +6%. Divine Hymn pulses emit Cosmic Ripples at 75% effectiveness. During Apotheosis, Flash Heal is always upgraded to Benediction. IMPORTANT: Benediction triggers at a normalised rate — both Hero Talents should cast Prayer of Mending frequently to maximise proc rate.
HERO TALENTS: Archon (burst healing — empowered Halo casts, extra Surge of Light procs for triage, good burst) | Oracle (consistent — personal defense, sustained healing, Fate premonition)
STAT PRIORITY: Intellect > Haste (shorter Prayer of Mending CD, more Benediction chances) > Mastery (Echo of Light — HoT component on direct heals) > Critical Strike > Versatility
GEMS: 1x Indecipherable Eversong Diamond + Flawless Quick Amethyst (Haste)
ENCHANTS: Weapon — Acuity of the Ren'dorei. Ring — Haste or Mastery
FLASK: Flask of the Blood Knights (Haste)
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Staff (Missive: Haste + Mastery). Belt second.
KEY TIPS: Apotheosis + Benediction is your primary throughput window. Cast Prayer of Mending as frequently as possible regardless of Hero Talent — Benediction proc rate normalises across both. Notable: Renew, Heal, Lightwell, Shadowfiend removed in Midnight — adjust from older muscle memory.`,

  "Shadow":`SPEC: Shadow Priest (DPS)
APEX TALENT — Void Apparitions: Idol effects summon Shadowy Apparitions that shoot Void Bolts, generating Shadow Techniques stacks. At 5+ Shadow Techniques after casting an ability, your next cast deals bonus Shadow damage via a shadow clone.
HERO TALENTS: Voidweaver (RECOMMENDED to start — Void Torrent creates Entropic Rift, Void Blast while active, burst damage, stronger Raid with Devour Matter, better utility via Void Leech) | Archon (sustained — Halo exclusive to Archon in Midnight, Mind Flay: Insanity proc chain, extra stop via Incessant Screams for M+). IMPORTANT: Halo is now Archon-EXCLUSIVE in Midnight.
STAT PRIORITY: Intellect > Haste (faster Insanity, more Voidform ramp) > Mastery (Shadow Weaving — % per active DoT) [CLOSE — whether Haste or Mastery leads depends on build and gear]. Crit and Versatility trail behind.
GEMS: 1x Indecipherable Eversong Diamond + Flawless Quick Amethyst (Haste) or Flawless Masterful Lapis (Mastery) — sim current balance
ENCHANTS: Weapon — Acuity of the Ren'dorei. Ring — Haste or Mastery (sim)
FLASK: Flask of the Blood Knights (Haste) or Flask of the Magisters (Mastery)
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Staff (Missive: Haste + Mastery). Belt second.
KEY TIPS: Voidform is now the main cooldown (Dark Ascension removed). Halo is Archon-exclusive — if you want Halo, you must play Archon. Voidweaver recommended for new players and Raid progression. Mind Flay: Insanity procs are also Archon-exclusive.`,

  // ══════════════════════════════════════════════════════════════
  // ROGUE
  // ══════════════════════════════════════════════════════════════

  "Assassination":`SPEC: Assassination Rogue (DPS)
APEX TALENT — Implacable: Grants bonus Energy recharge after Envenom chain runs out (scaled to chain length). Increases Bleed and Nature damage (x2 points). Causes additional damage on Kingsbane, grants 5 Combo Points, instantly applies 10 poison stacks.
HERO TALENTS: Fatebound (RECOMMENDED — completely passive coin-flip mechanic, no tracking required, competitive in all content) | Deathstalker (higher QoL cost — tracking Deathstalker's Mark is difficult especially on AoE and target swaps; can be ahead in pure ST funnel if willing to deal with complexity). Method.gg: "Fatebound is the recommendation." NOTE: Trickster is NOT an Assassination hero talent — it belongs to Subtlety/Outlaw.
STAT PRIORITY: Agility > Haste = Crit (very close — each can be top depending on gear) > Mastery (Potent Assassin — DoT damage %) > Versatility. Use Raidbots — secondary stats are tight and gear-dependent.
GEMS: 1x Powerful Eversong Diamond + Flawless Deadly Amethyst (Crit)
ENCHANTS: Weapon — Acuity of the Ren'dorei. Ring — Crit (Eyes of the Eagle) — but sim, as Haste can beat Crit
FLASK: Flask of the Shattered Sun (Crit — generally best, sim yourself)
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Main hand dagger (Missive: Haste + Crit). Off-hand second.
KEY TIPS: Let Envenom intentionally expire after a long chain to trigger maximum Implacable Energy burst. One of the top DPS specs in Midnight S1.`,

  "Outlaw":`SPEC: Outlaw Rogue (DPS)
APEX TALENT — Gravedigger: Each Between the Eyes cast has a chance for extra damage buff stack. Dispatch damage increased (x2 points). Slowly builds toward a free BtE cast (no CD, no cost).
HERO TALENTS: Fatebound (RECOMMENDED for all content — consistent coin-flip mechanic, fewer buttons, higher ceiling in M+ AoE with Nimble Flurry, easier to execute) | Trickster (AoE alternative — Unseen Blade/Coup de Grace; Icy Veins: "trails behind Fatebound quite dramatically in every content" in Midnight. Only consider Trickster if you specifically enjoy the playstyle.)
STAT PRIORITY: Agility > Haste (Sinister Strike extra hits, shorter AR CD) > Crit (Sinister Strike extra hit, Opportunity procs) > Versatility > Mastery (Main Gauche — lowest value)
GEMS: 1x Indecipherable Eversong Diamond + Flawless Quick Amethyst (Haste) or Flawless Deadly Amethyst (Crit)
ENCHANTS: Weapon — Acuity of the Ren'dorei. Ring — Haste or Crit (sim)
FLASK: Flask of the Shattered Sun (Crit)
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: 1H Weapon (Missive: Haste + Crit). Bracers second.
KEY TIPS: Fatebound is the default for all content — use it. Trickster is a playable alternative if you like the theme, but it underperforms Fatebound in every scenario in Midnight. Adrenaline Rush uptime reduced in Midnight — space cooldown windows more deliberately.`,

  "Subtlety":`SPEC: Subtlety Rogue (DPS)
APEX TALENT — Ancient Arts: CP generators sometimes spawn a shadow clone. Clone spawns generate Shadow Techniques stacks. At 5+ Shadow Techniques after a CP generator, next finisher deals bonus Shadow damage via clone + refunds CPs. Shadow Dance duration scales with Haste via Deepening Shadows.
HERO TALENTS: Deathstalker (recommended for ST — Deathstalker's Mark, cleaner damage profile) | Trickster (M+ AoE — Unseen Blade, burst). Trickster has a ~0.2s GCD bug on Coup de Grace requiring slightly more Haste (~700) vs Deathstalker (~600).
STAT PRIORITY: Agility > Mastery (Executioner — % during finishers) > Crit (clone damage scales with Crit) > Haste (Shadow Dance duration via Deepening Shadows — hit your breakpoint first). HASTE BREAKPOINTS: Trickster ~700, Deathstalker ~600. Prioritise Haste UNTIL breakpoint, then shift to Mastery/Crit.
GEMS: 1x Indecipherable Eversong Diamond + Flawless Masterful Peridot (Mastery) or Flawless Deadly Peridot (Crit+Haste) until breakpoint
ENCHANTS: Weapon — Acuity of the Ren'dorei. Ring — Mastery or Haste (depends on breakpoint status)
FLASK: Flask of the Shattered Sun or Flask of the Blood Knights (Haste — if still reaching breakpoint)
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Main hand dagger (Missive: Mastery + Crit after breakpoint). Bracers second.
KEY TIPS: Meet your Haste breakpoint (600 Deathstalker / 700 Trickster) before investing elsewhere. Shadow Blades doubles CP generation (not fills to full) in Midnight. Deathstalker recommended for learning the spec.`,

  // ══════════════════════════════════════════════════════════════
  // SHAMAN
  // ══════════════════════════════════════════════════════════════

  "Elemental":`SPEC: Elemental Shaman (DPS)
APEX TALENT — Feedback Loop: Spell Crit chance +5%/+10% (2 points). Elemental Fury increases spell Crit damage +25%/+50% (2 points). Elemental Overloads have 25% chance to cause an additional Overload (once per cast).
HERO TALENTS: Stormbringer (MANDATORY for all group content — Tempest, superior AoE, complex but high reward) | Farseer (easier, better mobility, significantly behind Stormbringer on sustained AoE in stationary situations, use for open world or if you need mobility)
STAT PRIORITY: Intellect > Mastery (TOP secondary — Feedback Loop makes Elemental Overloads far more valuable; hard cap at 100% Mastery, soft cap 86% with Elemental Blast) > Haste > Crit (Feedback Loop also boosts Crit damage via Elemental Fury, still solid) > Versatility. NOTE: Crit is NOT the top stat despite Feedback Loop — Mastery is. Icy Veins confirms.
GEMS: 1x Indecipherable Eversong Diamond + Flawless Masterful Amethyst (Mastery) primary
ENCHANTS: Weapon — Acuity of the Ren'dorei. Ring — Mastery or Eyes of the Eagle (sim)
FLASK: Flask of the Magisters (Mastery — top secondary for Elemental)
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Staff or MH+OH (Missive: Crit + Haste). Belt second.
KEY TIPS: Mastery is your top secondary — Feedback Loop makes Elemental Overloads far more valuable, and Mastery scales all of them. Do NOT prioritise Crit over Mastery despite the Feedback Loop Crit bonuses — Mastery still wins. Stormbringer is mandatory for M+ and raid competitive play.`,

  "Enhancement":`SPEC: Enhancement Shaman (DPS)
APEX TALENT — Storm Unleashed: Crash Lightning can reset its own CD and deal repeated strikes, building Maelstrom Weapon stacks. Strong burst AoE.
HERO TALENTS: Totemic (RECOMMENDED at Season 1 launch — Mastery top, Surging Totem burst, Doom Winds synergy with Hot Hand) | Stormbringer (Haste top, Tempest nuke, higher complexity). Method.gg: "Totemic has the edge in all situations." Icy Veins updated to Totemic as M+ default Feb 10, 2026.
STAT PRIORITY: For Totemic (recommended): Agility > Mastery (top — scales all magic damage + Windfury, Supportive Imbuements amplification) > Haste > Crit > Versatility. For Stormbringer: Agility > Haste (top — rotation pace, Tempest generation) > Mastery = Crit > Versatility. NOTE: Previous spec had Totemic/Stormbringer backwards. Sim yourself to confirm — both hero trees can share a gear set without significant loss.
GEMS: 1x Indecipherable Eversong Diamond + Flawless Masterful Amethyst (Mastery — Totemic default) or Flawless Quick Amethyst (Haste — Stormbringer)
ENCHANTS: Weapon — Two Enchant Weapon - Acuity of the Ren'dorei. Ring — Mastery (Totemic default) or Haste (Stormbringer). CRITICAL: DO NOT use Thalassian Phoenix Oil — Windfury Weapon and Flametongue Weapon imbues override weapon enchant consumables. Oils are wasted gold for Enhancement.
FLASK: Flask of the Magisters (Mastery — Totemic default) or Flask of the Blood Knights (Haste — Stormbringer)
BEST CRAFT: 1H Weapons (Missive: Agility + Haste — craft both eventually). Belt second.
KEY TIPS: NEVER use Thalassian Phoenix Oil — Enhancement's imbues override weapon oils completely. Maelstrom at 5 stacks before spending is the core loop. Two Acuity of the Ren'dorei weapon enchants are permanent enchants (not oils).`,

  "Restoration Shaman":`SPEC: Restoration Shaman (Healer)
APEX TALENT — Stormstream Totem: Riptide can summon a Stormstream Totem that heals more targets than standard Healing Stream Totem with increased output. Healing Stream Totem healing increased 50% in Midnight patch notes.
HERO TALENTS: Totemic (recommended Raid — Surging Totem, consistent healing) | Farseer (M+ mobility — easier, Ancestral Swiftness movement, good for chaotic environments)
STAT PRIORITY: Intellect > Mastery (Deep Healing — % bonus to lower health targets, scales totem throughput) > Haste (more Riptide = more totem summons) > Crit (Resurgence — mana return on crits) > Versatility
GEMS: 1x Indecipherable Eversong Diamond + Flawless Masterful Lapis (Mastery)
ENCHANTS: Weapon — Acuity of the Ren'dorei. Ring — Mastery
FLASK: Flask of the Magisters (Mastery)
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Staff (Missive: Mastery + Haste). Belt second.
KEY TIPS: Place Stormstream Totem in center of group stack. Healing Stream Totem healing was significantly buffed (+50%) in Midnight — it's now a high-priority use. Strong in stacked raid scenarios.`,

  // ══════════════════════════════════════════════════════════════
  // WARLOCK
  // ══════════════════════════════════════════════════════════════

  "Affliction":`SPEC: Affliction Warlock (DPS)
APEX TALENT — Haunt empowers itself via Shadow of Nathreza interactions, dealing stronger splash damage to nearby enemies and summoning ally demons. Strong multi-target spec with flexible swap capabilities.
HERO TALENTS: Hellcaller (Shadowflame — Wither replaces Corruption, generates Blackened Soul, burst via Malevolence every minute, superior AoE in M+) | Soul Harvester (aggressive Shard spending, faster Dark Harvest casts, better ST flexibility). Hellcaller recommended for M+, Soul Harvester for ST.
STAT PRIORITY: Intellect > Haste (DoT tick rate, Shard generation from more ticks) = Mastery (Potent Afflictions — DoT damage %) [close — sim required] > Crit > Versatility. All secondaries relatively close — ilvl wins.
GEMS: 1x Indecipherable Eversong Diamond + Flawless Quick Amethyst (Haste) or Flawless Masterful Lapis (Mastery)
ENCHANTS: Weapon — Acuity of the Ren'dorei. Ring — Haste or Mastery (sim)
FLASK: Flask of the Blood Knights (Haste) or Flask of the Magisters (Mastery)
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Staff (Missive: Haste + Mastery). Belt second.
KEY TIPS: Affliction has strong target-swap and execute capabilities in Midnight. Time Haunt casts when enemies are clustered for splash damage. Hellcaller's Wither is effectively a replacement for Corruption — treat it as your primary DoT.`,

  "Demonology":`SPEC: Demonology Warlock (DPS)
APEX TALENT — Dominion of Argus: Chance to summon an additional Dreadstalker. Felguard's Legion Strike and Felstorm receive damage increases. High variance proc-based spec, top-performing in Midnight.
HERO TALENTS: Diabolist (recommended — Diabolic Ritual summons Overlord/Mother of Chaos/Pit Lord with predictable burst cadence, better ST, utility via Annihilan's Bellow 25s Howl of Terror) | Soul Harvester (flexible AoE/M+ — aggressive Shard spending, Sataiel's Volition Demonic Core procs). NOTE: Previous spec incorrectly mentioned "Trickster" — that is a Rogue talent. Diabolist and Soul Harvester are the correct Demonology Hero Talents.
STAT PRIORITY: Intellect > Haste (faster Shard generation for more Imps before Tyrant) > Crit (Demonbolt Shard generation) > Mastery (Master Demonologist — demon damage, higher value in multi-target) > Versatility
GEMS: 1x Indecipherable Eversong Diamond + Flawless Quick Amethyst (Haste) or Flawless Deadly Amethyst (Crit)
ENCHANTS: Weapon — Acuity of the Ren'dorei. Ring — Haste or Crit (sim)
FLASK: Flask of the Shattered Sun (Crit) or Flask of the Blood Knights (Haste)
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Staff (Missive: Haste + Crit). Belt second.
KEY TIPS: One of the best specs in Midnight. Tyrant window timing is the skill expression. Macro: Nether Portal → spam Hand of Gul'dan → Tyrant. Diabolist brings a 25s Howl of Terror option via Annihilan's Bellow — strong M+ utility.`,

  "Destruction":`SPEC: Destruction Warlock (DPS)
APEX TALENT — Embers of Nihilam: Chance to evoke Echo of Sargeras dealing Shadowflame damage, granting Crit and Haste. Chaos Bolt always critically hits — its damage is increased by Crit at 1% damage per 1% Crit. Immolate crits double the chance to produce a Soul Shard.
HERO TALENTS: Diabolist (M+ — Diabolic Ritual AoE + burst, Annihilan utility) | Soul Harvester (Raid — consistent damage via DoT effects from Shard spending). Season launch aimed to balance between the two — verify current tuning.
STAT PRIORITY: Intellect > Crit (Chaos Bolt ALWAYS crits and damage scales directly with Crit; Immolate crits generate Shards) > Haste (Immolate tick rate, Conflagrate CD reduction, Shard generation) > Mastery (Chaotic Energies — random % bonus) > Versatility. All secondaries relatively close — prioritise ilvl.
GEMS: 1x Indecipherable Eversong Diamond + Flawless Deadly Amethyst (Crit)
ENCHANTS: Weapon — Acuity of the Ren'dorei. Ring — Crit (Eyes of the Eagle)
FLASK: Flask of the Shattered Sun (Crit)
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Staff (Missive: Crit + Haste). Belt second.
KEY TIPS: Chaos Bolt always crits — Crit rating directly amplifies its damage. Less ramp-up than Affliction/Demo, strong for progression fights with cleave. New Diabolic Oculi talents summon AoE orbs on Shard spending.`,

  // ══════════════════════════════════════════════════════════════
  // WARRIOR
  // ══════════════════════════════════════════════════════════════

  "Arms":`SPEC: Arms Warrior (DPS)
APEX TALENT — Master of Warfare: Charges a second Slam as Heroic Strike, adding bonus damage and Armor Penetration stacks. Upgrades Overpower and Slam interactions.
HERO TALENTS: Colossus (versatile — Demolish high-damage ability, bleed amplification, good ST and AoE) | Slayer (Raid ST — Execute/Bladestorm focus, higher priority damage via Sudden Death procs, Bladestorm cleave). Slayer generally better for raid, Colossus more flexible.
STAT PRIORITY: Strength > Critical Strike (TOP secondary — scales the proc-and-bleed ecosystem; crits increase Deep Wounds frequency, amplify Apex interactions; bonus: increases Rage from auto-attack crits by 10%) > Haste (compresses rotation, Bladestorm/Rend/Deep Wounds speed, fits more GCDs inside damage buffs) > Mastery (Deep Wounds periodic bleed) = Versatility. Stats shift with gear due to diminishing returns — at high gear all four secondaries converge.
GEMS: 1x Indecipherable Eversong Diamond + Flawless Deadly Garnet (Crit)
ENCHANTS: Weapon — Acuity of the Ren'dorei. Ring — Crit (Eyes of the Eagle)
FLASK: Flask of the Shattered Sun (Crit)
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: 2H Weapon (4 Sparks, Missive: Strength + Crit). Belt second.
KEY TIPS: Crit is your top secondary, confirmed for Midnight. New changes: Judgment now upgrades to Hammer of Wrath during Avenging Wrath (no longer auto-procs). Crusade redesigned as stacking Haste effect instead of flat damage. Divine Resonance now double-casts Judgment instead of auto-procs.`,

  "Fury":`SPEC: Fury Warrior (DPS)
APEX TALENT — Rampaging Berserker: Rampage casts stack Berserk buff (+Strength, stacking). 2nd+3rd points: Rampage damage +, Rage cost reduced during Recklessness. 4th point: Recklessness duration increased + 3 stacks on activation.
HERO TALENTS: Slayer (Raid ST — Execute/Bladestorm focus, Sudden Death procs, stronger single target via Reap the Storm) | Mountain Thane (M+ — Thunder Clap → Thunder Blast, Bloodthirst Rage feedback loop, better sustained multi-target). Slayer for progression raid, Mountain Thane for M+.
STAT PRIORITY: Strength > Mastery (Unshackled Fury — % bonus while Enraged, consistent) = Haste (compresses rotation, reduces rotational CDs, auto-attack speed) > Versatility > Critical Strike (LOWEST value — Fury does NOT generate extra Rage on Crit unlike Arms, making Crit notably weak). Gem/enchant for Mastery+Haste primarily.
GEMS: 1x Indecipherable Eversong Diamond + Flawless Quick Amethyst (Haste) or Flawless Masterful Peridot (Mastery) — sim to find balance. NOTE: Previous spec listed "Garnet" colored gems — correct gems are Amethyst/Peridot.
ENCHANTS: Weapon — Acuity of the Ren'dorei. Ring — Mastery or Haste (sim)
FLASK: Flask of the Magisters (Mastery) or Flask of the Blood Knights (Haste)
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: 2H Weapon (4 Sparks, Missive: Strength + Mastery). Belt second.
KEY TIPS: CRIT IS YOUR WORST SECONDARY — do not gem or enchant for it. Mastery + Haste are co-equal priorities. Mountain Thane for M+, Slayer for raid. Rampaging Ruin (multi-target Rampage cleave talent) only valuable on 5+ targets due to single-target damage penalty.`,

  "Protection Warrior":`SPEC: Protection Warrior (Tank)
APEX TALENT — Phalanx (all 4 points mandatory): Rank 1: Thunder Clap buffs next Shield Slam to deal AoE cone damage and reduce target damage by 5% for 8s. Rank 2: Increases Thunder Clap and Phalanx wave damage by 10% per rank. Rank 3/4: Increases Shield Slam damage and Crit chance by 10% while Shield Block is active. Purely offensive — no required gameplay changes, just press your rotation correctly.
HERO TALENTS: Mountain Thane (M+ — Thunder Blast from Thunder Clap, Rage feedback loop, faster Shield Slams, Lightning Strikes synergy) | Colossus (Raid — Demolish truck-hit, bleed amp via Rage of Korroth, methodical playstyle)
STAT PRIORITY: Strength > Haste (more Rage = more Ignore Pain proportional to Haste increase; shorter Anger Management CDs) > Versatility (constant damage reduction including magic, highly valuable on magic-heavy fights) > Critical Strike (increases parry chance for block, also damage) > Mastery (Critical Block — "worst" secondary but all stats close) NOTE: Versatility becomes #1 on magic-heavy encounters.
GEMS: 1x Indecipherable Eversong Diamond + Flawless Versatile Garnet (Versatility)
ENCHANTS: Weapon — Acuity of the Ren'dorei. Ring — Versatility
FLASK: Flask of the Shattered Sun or Flask of the Magisters
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: 1H Weapon (Missive: Versatility + Haste). Belt second.
KEY TIPS: Versatility scales your Ignore Pain healing proportionally. On magic-heavy fights (common in raid), Versatility jumps to #1 value. Mountain Thane creates positive Rage feedback — more Thunder Blasts → more Shield Slams → more Rage. Colossus's Demolish can be cancelled to reapply it — advanced tech.`,
};


// ══════════════════════════════════════════════════════════════════
// LAYER C — SPEC CORRECTIONS
// Reviewed overrides from the live verification pipeline.
// These carry the HIGHEST authority — they override Class and Spec
// knowledge above when conflicting.
//
// HOW TO ADD A CORRECTION:
//   1. Discord alert arrives from api/corrections.js (live pipeline)
//   2. Developer verifies the cited source
//   3. Add an entry below with source URL + date
//   4. Deploy → all future users get the corrected knowledge
//
// Format: "Spec Key": "CORRECTION (source, date): override text"
// ══════════════════════════════════════════════════════════════════

export const SPEC_CORRECTIONS = {
  // Empty at launch — all known corrections already incorporated
  // into SPEC_KNOWLEDGE above during the 2026-03-28 audit.
  //
  // Example of how entries look once live:
  // "Frost DK": "CORRECTION (icy-veins.com, 2026-04-15): After 12.0.5 tuning, Crit now slightly edges Mastery for Frost DK in AoE builds. Mastery still recommended for Breath of Sindragosa ST builds.",
};

export function getSpecKnowledge(activeSpec, activeClass) {
  const spec = (activeSpec || "").toLowerCase().trim();
  const cls  = (activeClass || "").toLowerCase().trim();

  // ── Step 1: Resolve canonical spec key ─────────────────────────
  let specKey = null;
  if      (spec === "frost"        && cls.includes("death"))    specKey = "Frost DK";
  else if (spec === "frost"        && cls.includes("mage"))     specKey = "Frost Mage";
  else if (spec === "frost dk"                             )     specKey = "Frost DK";
  else if (spec === "frost mage"                           )     specKey = "Frost Mage";
  else if (spec === "frost"        && !cls                 )     specKey = "Frost DK";
  else if (spec === "holy"         && cls.includes("paladin"))   specKey = "Holy Paladin";
  else if (spec === "holy"         && cls.includes("priest") )   specKey = "Holy Priest";
  else if (spec === "restoration"  && cls.includes("druid")  )   specKey = "Restoration Druid";
  else if (spec === "restoration"  && cls.includes("shaman") )   specKey = "Restoration Shaman";
  else if (spec === "protection"   && cls.includes("paladin"))   specKey = "Protection Paladin";
  else if (spec === "protection"   && cls.includes("warrior"))   specKey = "Protection Warrior";
  else if (spec === "beast mastery"                        )     specKey = "Beast Mastery";
  else if (SPEC_KNOWLEDGE[activeSpec]                      )     specKey = activeSpec;
  else {
    specKey = Object.keys(SPEC_KNOWLEDGE).find(k =>
      k.toLowerCase() === spec || k.toLowerCase().startsWith(spec)
    ) || null;
  }

  // ── Step 2: Assemble layered knowledge ─────────────────────────
  // Layer A: shared class mechanics (utility, rules that apply to all specs)
  // Layer B: spec-specific overrides (stat priority, apex, hero talents, gems)
  // Layer C: active corrections (reviewed overrides from live verification pipeline)
  const classBlock      = CLASS_KNOWLEDGE[activeClass] || "";
  const specBlock       = specKey ? (SPEC_KNOWLEDGE[specKey] || "") : "";
  const correctionBlock = specKey ? (SPEC_CORRECTIONS[specKey] || "") : "";

  if (!classBlock && !specBlock) {
    return "\nNo spec-specific data — give best general advice for this class based on the gear data provided.";
  }

  const parts = [];
  if (classBlock)      parts.push(`=== CLASS KNOWLEDGE: ${activeClass} ===\n${classBlock}`);
  if (specBlock)       parts.push(`=== SPEC KNOWLEDGE: ${specKey || activeSpec} ===\n${specBlock}`);
  if (correctionBlock) parts.push(`=== ACTIVE CORRECTIONS (highest authority — override class/spec above if conflicting) ===\n${correctionBlock}`);

  return parts.join("\n\n");
}
