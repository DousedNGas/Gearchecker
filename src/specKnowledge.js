// ═══════════════════════════════════════════════════════════════
// Vaultwright — Spec Knowledge
// Sources: Icy Veins, Method.gg (verified March 2026, Season 1 12.0.1)
// KNOWLEDGE_VERSION: Season 1 patch 12.0.1 — Updated 2026-03-22
// ═══════════════════════════════════════════════════════════════

export const KNOWLEDGE_VERSION = "S1 12.0.1";
export const KNOWLEDGE_DATE    = "2026-03-22";

// ── Universal consumables (same for almost everyone) ─────────────
// Epic gem: 1x Indecipherable Eversong Diamond (socket to Helm/Bracer/Belt via Radiant Jewelbinder from Great Vault)
// Rare gems: fill remaining sockets with your top secondary stat gem
// Weapon enchant: Enchant Weapon - Acuity of the Ren'dorei (best early Season 1 for most specs)
// Weapon oil: Thalassian Phoenix Oil (Crit+Haste) — NOT for DK (use Runeforge) or Enhancement (imbues override)
// Food: Royal Roast (personal) or Silvermoon Parade (group feast) — primary stat
// Tea: Sanguithorn Tea / Azeroot Tea / Argentleaf Tea (50 Speed each, stacks with food — pick cheapest)
// Flask: Flask of the Shattered Sun (Crit) for most | Flask of the Magisters (Mastery) for Mastery-first specs
// Potion: Light's Potential (pre-pot + use with major CDs)
// Augment Rune: Void-Touched Augment Rune (expensive, disappears on death — use in progression)

export const SPEC_KNOWLEDGE = {
  // ── DEATH KNIGHT ─────────────────────────────────────────────
  "Blood":`SPEC: Blood Death Knight (Tank)
APEX TALENT — Dance of Midnight: While Dancing Rune Weapon is active, parrying has a chance to make your next Heart Strike cost no Runes and deal 150% increased damage. Each DRW active increases your damage by 6% and reduces damage taken by 6%. Consuming a Rune has a chance to summon a DRW for 6 seconds.
STAT PRIORITY: Strength > Versatility > Haste > Mastery (Blood Shield) > Crit
GEMS: 1x Indecipherable Eversong Diamond + Flawless Versatile Garnet (Versatility) in remaining sockets
ENCHANTS: Weapon: Runeforge — Rune of the Fallen Crusader (sustained) or Rune of Razorice (M+). Ring: Versatility. Chest: Haste or Versatility secondary stat enchant
FLASK: Flask of the Magisters (Mastery for shield scaling) or Flask of the Shattered Sun (Crit)
BEST CRAFT: 2H Weapon first (largest throughput gain). Never craft Chest (Tier slot).
KEY TIPS: Death Knights use Runeforges NOT weapon oils — applying Thalassian Phoenix Oil over a Runeforge is a big mistake. More DRWs active = multiplicative damage reduction. Death Strike on cooldown for self-healing — this is your core survival tool.`,

  "Frost DK":`SPEC: Frost Death Knight (DPS)
APEX TALENT — Chosen of Frostbrood: Frostwyrm's Fury deals 100% increased damage to the first enemy hit and grants 15% Haste for 12 seconds. Extends active Pillar of Frost by 2 seconds. All Frost damage increased by 10%. After Frostwyrm leaves, recall it for a second cast at 50% effectiveness.
STAT PRIORITY: Strength > Haste > Crit (Killing Machine procs) > Mastery (Frozen Heart % physical) > Versatility
GEMS: 1x Indecipherable Eversong Diamond + Flawless Quick Garnet (Haste) in remaining sockets
ENCHANTS: Weapon: Runeforge — Rune of the Fallen Crusader. Ring: Haste. DO NOT use Thalassian Phoenix Oil — Runeforge replaces weapon enchants for all DKs
FLASK: Flask of the Shattered Sun (Crit) or Flask of the Blood Knights (Haste)
BEST CRAFT: 2H Weapon (Missive: Haste + Crit). 2H required — never craft 1H for Frost.
KEY TIPS: Frostwyrm's Fury first enemy hit bonus — aim at your priority target. The recall cast effectively doubles its value. Time Frostwyrm's Fury at the start of Pillar of Frost for maximum window overlap.`,

  "Unholy":`SPEC: Unholy Death Knight (DPS)
APEX TALENT — Forbidden Knowledge: Army of the Dead transforms Death Coil into Necrotic Coil and Epidemic into Graveyard for 15 seconds. Putrefy summons a Lesser Ghoul and grants 3% Mastery for 12 seconds (stacking). Each Magus of the Dead increases Necrotic Coil/Graveyard damage by 8%.
STAT PRIORITY: Strength > Mastery (primary goal — Putrefy stacks, pet damage) = Crit (equally valued, sim to find your balance) > Versatility > Haste (lowest value for Unholy)
GEMS: 1x Indecipherable Eversong Diamond + Flawless Masterful Lapis (Mastery) + Flawless Deadly Lapis (Crit) alternating
ENCHANTS: Weapon: Runeforge — Rune of the Apocalypse (best for all Unholy content). Ring: Mastery. DO NOT use weapon oils — Runeforge replaces them
FLASK: Flask of the Magisters (Mastery preferred)
BEST CRAFT: 2H Weapon (Missive: Mastery + Crit). Note: Unholy stat priority is Mastery+Crit equally, NOT Mastery+Haste
KEY TIPS: Mastery and Crit are co-equal top stats — do not stack one exclusively. Army of the Dead is now your primary DPS cooldown. Pets inherit your stats dynamically (0-5 second delay). Haste is your lowest value secondary — avoid gemming/enchanting for it.`,

  // ── DEMON HUNTER ─────────────────────────────────────────────
  "Havoc":`SPEC: Havoc Demon Hunter (DPS)
APEX TALENT — The Hunt empowers your next Eye Beam (+100% damage, wider AoE). The Hunt gains 15s reduced CD, +15% damage, DoT hits 2 extra enemies. Blade Dance +20% damage. Full Eye Beam channel resets Blade Dance CD. Core loop: The Hunt → Eye Beam (full channel) → Blade Dance → repeat.
STAT PRIORITY: Agility > Crit (most valuable — sim shows Crit and Haste close but Crit edges out) > Haste > Versatility > Mastery (lowest value)
GEMS: 1x Indecipherable Eversong Diamond + Flawless Deadly Amethyst (Crit) in remaining sockets
ENCHANTS: Weapon: Two Enchant Weapon - Acuity of the Ren'dorei. Ring: Crit or Mastery (sim yourself — both close in value). Helm/Shoulders/Boots: Avoidance recommended
FLASK: Flask of the Shattered Sun (Crit — most common choice)
WEAPON OIL: Two Thalassian Phoenix Oil (Crit+Haste)
BEST CRAFT: Glaive weapon first (Missive: Crit + Haste). Belt second.
KEY TIPS: Always fully channel Eye Beam — Blade Dance reset ONLY triggers on full channel. Never cut it short. One of the simplest rotations in Midnight.`,

  "Vengeance":`SPEC: Vengeance Demon Hunter (Tank)
APEX TALENT — Untethered Rage: Soul Cleave/Spirit Bomb have a chance per Soul Fragment consumed to allow free Metamorphosis for 10 seconds. Extra fragment per cast = +5% damage/fragment. Non-procs build Seething Anger (+1% Agility, increases proc chance).
STAT PRIORITY: Agility > Versatility (damage reduction + scales Meta value) > Haste (Soul Fragment generation) > Mastery (Fel Blood armor) > Crit
GEMS: 1x Indecipherable Eversong Diamond + Flawless Versatile Garnet (Versatility)
ENCHANTS: Weapon: Enchant Weapon - Acuity of the Ren'dorei. Ring: Versatility
FLASK: Flask of the Shattered Sun or Flask of the Magisters
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Ring or Neck (non-Tier slots, Missive: Versatility + Haste). Avoid crafting Shoulders or Chest (Tier).
KEY TIPS: More fragments consumed per cast = higher Untethered Rage chance. Seething Anger provides a reliable damage floor when procs are cold.`,

  "Devourer":`SPEC: Devourer Demon Hunter (NEW — INT-based DPS, mid-range 25-35 yards like Evoker)
APEX TALENT — Midnight: Collapsing Star always critically strikes. All Cosmic damage +3% (x2 points). Collapsing Star crit damage +50% of your Crit chance. Void Metamorphosis spawns 5 Soul Fragments + grants immediate Collapsing Star.
STAT PRIORITY: Intellect (PRIMARY STAT — Devourer is INT-based, NOT Agility) > Mastery (Monster Within — scales all Cosmic damage, doubles during Void Meta) > Haste (more Void Meta windows) > Versatility > Crit (lowest value — Collapsing Star always crits so raw Crit provides less benefit)
GEMS: 1x Indecipherable Eversong Diamond + Flawless Quick Amethyst (Haste) in remaining sockets
ENCHANTS: Weapon: Enchant Weapon - Arcane Mastery + Enchant Weapon - Berserker's Rage (Mastery+Haste pair preferred) OR two Acuity of the Ren'dorei at lower gear. Ring: Mastery or Haste (sim yourself). Helm/Shoulders/Boots: Avoidance
FLASK: Flask of the Magisters (Mastery preferred for Void-Scarred)
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Weapon first (Spellbreaker's Warglaive, 2 Sparks + Darkmoon Sigil: Hunt). Second craft: Belt or Bracers with Arcanoweave Lining. Never craft Tier slots.
KEY TIPS: IMPORTANT — Devourer uses INTELLECT gear (cloth/leather INT pieces), not Agility. Collapsing Star always crits means raw Crit stat is less efficient — stack Mastery instead. Position at 25-35 yards (mid-range spec).`,

  // ── DRUID ─────────────────────────────────────────────────────
  "Balance":`SPEC: Balance Druid (DPS)
APEX TALENT: Activating Eclipse makes next Wrath/Starfire instant. First 3 Starsurges/Starfalls per Eclipse deal +20% damage. Crits during Eclipse apply languish (12% extra damage over 6s). Eclipse activation launches guaranteed-crit Solar/Lunar Bolts at all enemies within 40 yards.
STAT PRIORITY: Intellect > Haste (more Eclipse activations) > Crit (Bolt procs + languish) > Mastery (Starlight — % Arcane/Nature bonus) > Versatility
GEMS: 1x Indecipherable Eversong Diamond + Flawless Quick Amethyst (Haste) or Flawless Deadly Amethyst (Crit)
ENCHANTS: Weapon: Enchant Weapon - Acuity of the Ren'dorei. Ring: Crit (Eyes of the Eagle — generally stronger). Helm/Shoulders/Boots: Avoidance
FLASK: Flask of the Shattered Sun (Crit)
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Staff (Missive: Haste + Crit). Never craft Chest or Shoulders (Tier).
KEY TIPS: Pool Starsurge/Starfall charges to spend 3 quickly at each Eclipse activation. Eclipse Bolt launches on activation — position near priority target.`,

  "Feral":`SPEC: Feral Druid (DPS)
APEX TALENT — Unseen Attack: Ferocious Bite has 15% chance per combo point to teleport to an enemy within 30 yards and deal Unseen Slash (bleed) or Unseen Swipe (AoE). Unseen Attacks increase damage by 8% for 5s (stacking). Tiger's Fury causes Unseen Attack after next 2 CP generators. Rip + Unseen Attack damage +30%.
STAT PRIORITY: Agility > Crit (Ferocious Bite crits + higher Unseen proc chance) > Haste (more energy = more Bites = more procs) > Mastery (Razor Claws % physical) > Versatility
GEMS: 1x Indecipherable Eversong Diamond + Flawless Masterful Peridot (Mastery) or Flawless Quick Amethyst (Haste) — sim your character
ENCHANTS: Weapon: Enchant Weapon - Acuity of the Ren'dorei. Ring: Crit (Eyes of the Eagle). Helm/Shoulders/Boots: Avoidance
FLASK: Flask of the Shattered Sun (Crit)
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Agility weapon (Missive: Crit + Haste). Neck second.
KEY TIPS: Rip is mandatory — it gives the 30% Unseen Attack damage bonus. Maintain Rip at all times.`,

  "Guardian":`SPEC: Guardian Druid (Tank)
APEX TALENT — Wild Guardian: After Berserk/Incarnation ends, next 2 Ironfur/Maul/Frenzied Regen are echoed at 50% effectiveness. Mastery +3%. Maul always empowered (+20% Nature DoT). Dream Guide charges upgrade echoes to 150% effectiveness repeated twice over 8s.
STAT PRIORITY: Agility > Versatility > Mastery (Ursoc's Endurance — bonus Armor, +3% from Apex passive) > Haste > Crit
GEMS: 1x Indecipherable Eversong Diamond + Flawless Versatile Garnet (Versatility)
ENCHANTS: Weapon: Enchant Weapon - Acuity of the Ren'dorei. Ring: Versatility
FLASK: Flask of the Shattered Sun or Flask of the Magisters
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Cloak (non-Tier, Missive: Versatility + Mastery).
KEY TIPS: Time Berserk into high-damage phases — Wild Guardian echoes are strongest immediately after Berserk ends. Save Dream Guide charges for emergency Frenzied Regeneration echoes.`,

  "Restoration Druid":`SPEC: Restoration Druid (Healer)
APEX TALENT — Lifebloom Ascendance: Lifebloom stacks every 5s up to 3 times. 15% of Lifebloom healing splashes to 2 allies within 30 yards. Soul of the Forest consumption triggers Blooming Frenzy (5 rapid blooms).
STAT PRIORITY: Intellect > Mastery (Harmony — bonus to direct heals on HoT targets; stacked Lifebloom multiplies this) > Haste (faster HoT ticks, shorter Lifebloom cycle) > Versatility > Crit
GEMS: 1x Indecipherable Eversong Diamond + Flawless Masterful Lapis (Mastery)
ENCHANTS: Weapon: Enchant Weapon - Acuity of the Ren'dorei. Ring: Mastery
FLASK: Flask of the Magisters (Mastery)
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Staff (Missive: Mastery + Haste). Bracers or Belt second.
KEY TIPS: Keep Lifebloom stacked to 3 on most dangerous target — the splash to 2 allies triples its effective output.`,

  // ── EVOKER ────────────────────────────────────────────────────
  "Devastation":`SPEC: Devastation Evoker (DPS, mid-range 25-35 yards)
APEX TALENT — Rising Fury: During Dragonrage, gain Rising Fury every 6s (+4% Haste/stack, max 5). At 5 stacks all damage +15%. After Dragonrage ends, gain Risen Fury (4s per stack) — maintains bonuses and generates Essence Burst every 4s.
STAT PRIORITY: Intellect > Crit (top secondary — sim shows Crit and Haste tightly close, Crit edges ahead) > Haste > Mastery (Giantkiller — % Empower bonus) > Versatility
GEMS: 1x Powerful Eversong Diamond + variety for Movement Speed bonus (Flawless Quick Garnet/Flawless Deadly Peridot/etc — one of each type)
ENCHANTS: Weapon: Enchant Weapon - Acuity of the Ren'dorei or Jan'alai's Precision (within margin of error — buy cheapest). Ring: Crit (Eyes of the Eagle)
FLASK: Flask of the Shattered Sun (Crit)
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Weapon (Missive: Crit + Haste). Never craft Chest (Tier).
KEY TIPS: Dragonrage lasts 18s — reach 3 Rising Fury stacks within it. Risen Fury window after Dragonrage ends is critical — dump Essence Burst aggressively. Stay at 25-35 yards.`,

  "Preservation":`SPEC: Preservation Evoker (Healer, mid-range)
APEX TALENT — Merithra's Blessing: Essence abilities chance to upgrade next Reversion to heal target + 5 nearby allies for 250% Spell Power. Reversion passively reverses 1% of all damage taken. Dream Breath instant healing +125%, always grants Merithra's Blessing.
STAT PRIORITY: Intellect > Mastery (Golden Hour — HoT healing bonus) > Haste (more Essence casts = more Merithra's procs) > Versatility > Crit
GEMS: 1x Indecipherable Eversong Diamond + Flawless Masterful Lapis (Mastery)
ENCHANTS: Weapon: Enchant Weapon - Acuity of the Ren'dorei or Jan'alai's Precision. Ring: Mastery
FLASK: Flask of the Magisters (Mastery)
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Staff (Missive: Mastery + Haste). Bracers second.
KEY TIPS: Dream Breath is your highest-priority heal. The 1% damage reversal passive is meaningful on heavy AoE damage encounters.`,

  "Augmentation":`SPEC: Augmentation Evoker (Support DPS, mid-range)
APEX TALENT — Future Duplicate: Breath of Eons summons a future-you for 20s, casting Eruption/Fire Breath/Upheaval. Each Ebon Might extension also extends duplicate by 50%. While active: Ebon Might grants 100% additional stats, Upheaval/Eruption +25% damage.
STAT PRIORITY: Intellect > Crit (top secondary — directly scales Eruption and shared stats) = Haste (more Ebon Might extensions = longer duplicate) > Mastery (Timewalker — shared stats scale with Mastery) > Versatility
GEMS: 1x Indecipherable Eversong Diamond + Flawless Deadly Peridot (Crit+Haste) in remaining sockets
ENCHANTS: Weapon: Enchant Weapon - Jan'alai's Precision or Acuity of the Ren'dorei (within error margin — buy cheapest). Ring: Crit (Eyes of the Eagle)
FLASK: Flask of the Shattered Sun (Crit — Augmentation's best stat in Season 1)
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Neck or Weapon (Missive: Crit + Haste).
KEY TIPS: Coordinate Breath of Eons with your group's burst CDs. Maximize Ebon Might extension frequency during duplicate window.`,

  // ── HUNTER ────────────────────────────────────────────────────
  "Beast Mastery":`SPEC: Beast Mastery Hunter (DPS)
APEX TALENT — Animal Companion: Bestial Wrath summons an Animal Companion from your Stable for 15s. Pet damage +5%. Bestial Wrath strikes 2 additional targets. Barbed Shot/Cobra Shot +15% damage. Barbed Shot/Cobra Shot/Black Arrow each increase next Kill Command by 30%.
STAT PRIORITY: Agility > Haste (shorter Kill Command CD, faster Barbed Shot refresh) > Crit > Mastery (Master of Beasts — % pet damage) > Versatility
GEMS: 1x Indecipherable Eversong Diamond + Flawless Quick Amethyst (Haste) in remaining sockets
ENCHANTS: Weapon: Enchant Weapon - Acuity of the Ren'dorei. Ring: Haste or Crit (sim yourself). Helm/Shoulders/Boots: Avoidance
FLASK: Flask of the Shattered Sun (Crit) or Flask of the Blood Knights (Haste)
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Back piece/Cloak first (non-Tier slot, Missive: Haste + Crit). Ranged weapon second (4 Sparks).
KEY TIPS: Stack Kill Command damage buffs from Barbed Shot + Cobra Shot + Black Arrow before casting Kill Command. Keep Bestial Wrath on cooldown.`,

  "Marksmanship":`SPEC: Marksmanship Hunter (DPS)
APEX TALENT — Precision: Rapid Fire +25% damage, each shot reduces Aimed Shot CD by 0.5s. Aimed Shot crit damage +25% of your Crit chance. Other ranged abilities +3% damage. Aimed Shot always critically strikes.
STAT PRIORITY: Agility > Crit (Aimed Shot crit damage scales with 25% of crit chance — VERY high value) > Haste (Rapid Fire CD reduction feeds Aimed Shot) > Versatility > Mastery (lowest value)
GEMS: 1x Powerful Eversong Diamond (if 5+ sockets) or Indecipherable Eversong Diamond + Flawless Deadly Amethyst (Crit) in remaining sockets
ENCHANTS: Weapon: Enchant Weapon - Acuity of the Ren'dorei. Ring: Crit (Eyes of the Eagle). Helm/Shoulders/Boots: Avoidance
FLASK: Flask of the Shattered Sun (Crit — essential given Apex scaling)
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Back piece/Cloak first (Missive: Crit + Haste). Ranged weapon second (4 Sparks, Missive: Crit + Haste).
KEY TIPS: Crit is unusually high value because Aimed Shot always crits AND crit chance directly amplifies the Apex Talent bonus. Never delay Aimed Shot after completing a Rapid Fire.`,

  "Survival":`SPEC: Survival Hunter (Melee DPS)
APEX TALENT — Raptor Swipe: Raptor Strike 25% chance to upgrade to Raptor Swipe (AoE). RS/Wildfire Bomb/Raptor Swipe +20% damage. Raptor Swipe +50% damage to primary target. Raptor Strike always upgrades to Raptor Swipe (capstone). Tip of the Spear-buffed Raptor Swipes trigger Strike as One at 300% effectiveness.
STAT PRIORITY: Agility > Haste (faster energy regeneration for more Raptor Strikes) > Crit > Mastery (Spirit Bond — % damage with pet) > Versatility
GEMS: 1x Indecipherable Eversong Diamond + Flawless Deadly Amethyst (Crit) in remaining sockets
ENCHANTS: Weapon: Enchant Weapon - Acuity of the Ren'dorei. Ring: Haste or Crit (sim). Helm/Shoulders/Boots: Avoidance
FLASK: Flask of the Shattered Sun (Crit)
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Melee weapon (Missive: Agility + Haste). Bracers second.
KEY TIPS: Raptor Strike is now your primary filler AND AoE tool. Stack Tip of the Spear before Raptor Swipe for the 300% Strike as One proc.`,

  // ── MAGE ──────────────────────────────────────────────────────
  "Arcane":`SPEC: Arcane Mage (DPS)
APEX TALENT — Touch Rune: Touch of the Magi increases damage target receives from you by 15%. Arcane Charges further increase Arcane Blast/Pulse/Barrage by 30%. Arcane Missiles +20% damage. Touch of the Magi explosion leaves a rune dealing 75% of explosion damage over 6s to nearby enemies.
STAT PRIORITY: Intellect > Mastery (Savant — increases Mana pool, Mana regen, Arcane Charge damage, AND all spell damage) > Haste > Crit > Versatility. NOTE: All secondary stats are very close — sim yourself.
GEMS: 1x Indecipherable Eversong Diamond + Flawless Versatile Amethyst (Versatility — generally best, sim yourself)
ENCHANTS: Weapon: Enchant Weapon - Acuity of the Ren'dorei. Ring: stat that sims highest (Mastery or Crit)
FLASK: Flask of the Magisters (Mastery — scales Mana which scales Arcane Charge bonus)
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Staff (Missive: Mastery + Haste). Belt second.
KEY TIPS: All secondary stats are close in value — simming yourself is especially important for Arcane. Precast Touch of the Magi, build charges, dump into explosion.`,

  "Fire":`SPEC: Fire Mage (DPS)
APEX TALENT — Fired Up: Consuming Hot Streak has 20% chance to grant Fired Up (+4% Fire damage, 12s). Combustion increases Fired Up chance and extends Combustion by 1s. Gaining Fired Up reduces Fire Blast CD by 2.5s. All Fire damage +3%.
STAT PRIORITY: Intellect > Crit (Hot Streak requires 2 crits — more Crit = more Fired Up stacks + Combustion extensions) > Haste (shorter Fire Blast/Scorch CDs) > Mastery (Ignite periodic) > Versatility
GEMS: 1x Indecipherable Eversong Diamond + Flawless Deadly Amethyst (Crit) in remaining sockets
ENCHANTS: Weapon: Enchant Weapon - Acuity of the Ren'dorei. Ring: Crit (Eyes of the Eagle). Helm/Shoulders/Boots: Avoidance or Speed
FLASK: Flask of the Shattered Sun (Crit)
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Staff (Missive: Crit + Haste). Never craft Shoulders or Chest (Tier).
KEY TIPS: Combustion extension via Fired Up is the key mechanic — a lucky window can spiral into 15+ seconds. Fire Blast CD reduction from Fired Up makes Hot Streak chains self-sustaining when procs cooperate.`,

  "Frost Mage":`SPEC: Frost Mage (DPS)
APEX TALENT — Hand of Frost: Shattering an enemy has 10% chance to summon a Hand of Frost (500% Spell Power Frost damage). Each Freezing stack increases Hand of Frost chance by 1%. Hand of Frost damage +1% spell damage for 8s. Ray of Frost summons 4 Hands of Frost, gains an extra charge, +25% damage.
STAT PRIORITY: Intellect > Versatility (HIGHEST value secondary for Frost in Midnight — flat damage + damage reduction) > Crit > Mastery (Freeze and Shatter — flat increase to shattering/freezing spells) > Haste. NOTE: Versatility being #1 is a Midnight-specific change — do not follow older guides.
GEMS: 1x Indecipherable Eversong Diamond + Flawless Versatile Amethyst (Versatility) or stat that sims highest
ENCHANTS: Weapon: Enchant Weapon - Acuity of the Ren'dorei. Ring: Versatility or Crit (changed Feb 2026 — sim yourself)
FLASK: Flask of the Shattered Sun (Crit) — use Potion of Recklessness with CDs
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Ring (non-Tier slot). Staff second (Missive: Versatility + Crit).
KEY TIPS: Versatility being #1 is a Midnight change — don't stack Haste like in previous expansions. Ray of Frost is your highest-priority cast — guarantees 4 Hand of Frost summons.`,

  // ── MONK ──────────────────────────────────────────────────────
  "Brewmaster":`SPEC: Brewmaster Monk (Tank)
APEX TALENT — Empty Barrel: Drinking a Brew has 20% chance to create an Empty Barrel — thrown with Keg Smash for 300% AP Physical damage. Gaining Empty Barrel resets Keg Smash CD and +10% physical damage dealt. Fortifying Brew or Celestial Brew grants Refreshing Drink (heals 3200% AP over 8s).
STAT PRIORITY: Agility > Versatility (Stagger bonus + damage reduction) > Crit = Mastery (Elusive Brawler — dodge stacking) > Haste. NOTE: Crit and Mastery are close — sim or balance them (Flawless Versatile Garnet + Flawless Deadly Lapis).
GEMS: 1x Indecipherable Eversong Diamond + balance of Flawless Versatile Garnet (Versatility) and Flawless Deadly Lapis (Crit)
ENCHANTS: Weapon: Enchant Weapon - Acuity of the Ren'dorei. Ring: Versatility or Crit
FLASK: Flask of the Shattered Sun (Crit — generally useful for both damage and defense) or Flask of the Magisters if high Crit already
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Belt or Weapon (Missive: Versatility + Haste). Never craft Chest or Shoulders.
KEY TIPS: Empty Barrel resets Keg Smash CD — doubles uptime when procs cooperate. Refreshing Drink is enormous self-sustain. Time Fortifying/Celestial Brew around high-damage phases.`,

  "Mistweaver":`SPEC: Mistweaver Monk (Healer)
APEX TALENT — Spiritfont: Rising Sun Kick and Vivify have a chance to activate Spiritfont, channeling Soothing Mist onto up to 5 allies. RSK damage and Enveloping Mist healing +10% (more during Spiritfont). Thunder Focus Tea activates Spiritfont and applies Chi Cocoons (30% effectiveness).
STAT PRIORITY: Intellect > Haste (shorter RSK CD, more Vivify casts, more Spiritfont chances) > Mastery (Gust of Mists — bonus direct healing on Vivify) > Crit > Versatility
GEMS: 1x Indecipherable Eversong Diamond + Flawless Quick Amethyst (Haste)
ENCHANTS: Weapon: Enchant Weapon - Acuity of the Ren'dorei. Ring: Haste or Mastery
FLASK: Flask of the Blood Knights (Haste)
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Staff (Missive: Haste + Mastery). Bracers second.
KEY TIPS: Thunder Focus Tea is a guaranteed Spiritfont trigger — save for burst healing moments. Maintain RSK on cooldown — it's both damage and a Spiritfont trigger.`,

  "Windwalker":`SPEC: Windwalker Monk (DPS)
APEX TALENT — Tigereye Brew: Gain Tigereye Brew every 8s in combat (+2% Crit chance during Zenith, max 20 stacks). Crit damage +5%. Each Fists of Fury hit has a chance equal to your Crit % to increase its damage by 15%.
STAT PRIORITY: Agility > Crit (Tigereye Brew scales with Crit %, Fists of Fury proc chance equals your Crit %) > Haste (shorter Fists of Fury CD) > Mastery (Combo Strikes — % per unique ability chain) > Versatility
GEMS: 1x Indecipherable Eversong Diamond + Flawless Deadly Amethyst (Crit)
ENCHANTS: Weapon: Enchant Weapon - Acuity of the Ren'dorei. Ring: Crit (Eyes of the Eagle)
FLASK: Flask of the Shattered Sun (Crit)
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Weapon (Missive: Agility + Crit). Bracers second.
KEY TIPS: Heavy Crit build in Midnight. Use Fists of Fury every time available during Zenith windows.`,

  // ── PALADIN ───────────────────────────────────────────────────
  "Holy Paladin":`SPEC: Holy Paladin (Healer)
APEX TALENT — Beacon of the Savior: Auto-applies Beacon to lowest health ally, transferring 10% of your healing. Beacon transfers additional 10% + increases healing received by 10%. Every 8s transfers to new target + grants absorb shield (10% DR for 15s).
STAT PRIORITY: Intellect > Haste (shorter Holy Shock CD, more Beacon transfers, more Holy Power) > Mastery (Lightbringer — % bonus to allies within range) > Crit (Holy Shock crit = 2 Holy Power) > Versatility
GEMS: 1x Indecipherable Eversong Diamond + Flawless Quick Amethyst (Haste)
ENCHANTS: Weapon: Enchant Weapon - Acuity of the Ren'dorei. Ring: Haste or Mastery
FLASK: Flask of the Blood Knights (Haste)
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Ring (non-Tier slot, Missive: Haste + Mastery). Weapon second.
KEY TIPS: Automatic Beacon target-switching every 8s removes cognitive burden — focus on Holy Power generation and spending. The absorb shield on Beacon transfer is meaningful raid CD value.`,

  "Protection Paladin":`SPEC: Protection Paladin (Tank)
APEX TALENT — Vanguard: Judgment may grant Vanguard, empowering Avenger's Shield to deal 300% AP Holy damage in a line. Judgment +10% damage + 1 Holy Power on Vanguard consume. Shield of the Righteous +50% damage and hits 4 additional enemies.
STAT PRIORITY: Strength > Versatility (damage reduction, scales SotR burst) > Haste (faster Holy Power, more SotR + Vanguard fishing) > Mastery (Divine Bulwark — block chance) > Crit
GEMS: 1x Indecipherable Eversong Diamond + Flawless Versatile Garnet (Versatility)
ENCHANTS: Weapon: Enchant Weapon - Acuity of the Ren'dorei. Ring: Versatility
FLASK: Flask of the Shattered Sun or Flask of the Magisters
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: 1H Weapon (Missive: Versatility + Haste). Belt second. Never craft Shoulders, Chest, or Gloves (all Tier).
KEY TIPS: The 4-target SotR splash is significant AoE threat in M+. Position Avenger's Shield line through as many enemies as possible when Vanguard procs.`,

  "Retribution":`SPEC: Retribution Paladin (DPS)
APEX TALENT — Holy Wave: Righteous Cause/Art of War increases next Blade of Justice damage by 150%. Avenging Wrath increases Final Verdict/Templar's Verdict/Divine Storm by 10%. Blade of Justice releases Holy wave dealing 442% AP to main target and 442% AP to nearby enemies.
STAT PRIORITY: Strength > Haste (shorter Judgment CD, faster Holy Power for AW window) > Crit (Wake of Ashes, Blade of Justice) > Versatility > Mastery (Hand of Light — LOWEST value in Midnight, avoid)
GEMS: 1x Indecipherable Eversong Diamond + Flawless Quick Garnet (Haste) or Flawless Deadly Garnet (Crit)
ENCHANTS: Weapon: Enchant Weapon - Acuity of the Ren'dorei. Ring: Haste or Crit (sim). Helm/Shoulders/Boots: Avoidance
FLASK: Flask of the Shattered Sun (Crit) or Flask of the Blood Knights (Haste)
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: 2H Weapon (4 Sparks, Missive: Strength + Haste). Belt second.
KEY TIPS: IMPORTANT — Mastery is your WORST secondary in Midnight. Do not gem/enchant for it. Blade of Justice into the 150% wave is now your highest-priority single-target button outside cooldowns.`,

  // ── PRIEST ────────────────────────────────────────────────────
  "Discipline":`SPEC: Discipline Priest (Healer)
APEX TALENT — Master the Darkness: Penance has a high chance to upgrade your next Power Word: Shield to Void Shield, applying the shield and Atonement to 3 allies simultaneously. Shadow damage and Atonement healing +3% (x2 points). Void Shield reflects 25% of damage taken → Atonement healing.
STAT PRIORITY: Intellect > Haste (shorter Penance CD = more Void Shield procs) > Mastery (Grace — Atonement healing %) > Crit (PW:Shield crit = extra Atonement) > Versatility
GEMS: 1x Indecipherable Eversong Diamond + Flawless Quick Amethyst (Haste)
ENCHANTS: Weapon: Enchant Weapon - Acuity of the Ren'dorei. Ring: Haste or Mastery
FLASK: Flask of the Blood Knights (Haste)
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Staff (Missive: Haste + Mastery). Belt second.
KEY TIPS: Void Shield applying Atonement to 3 allies simultaneously triples your Atonement application rate. The 4th Apex point (Void Shield reflects 25% damage) was reportedly bugged at launch — check current patch notes. Voidweaver Hero Tree synergizes directly with Void Shield.`,

  "Holy Priest":`SPEC: Holy Priest (Healer)
APEX TALENT — Benediction: Prayer of Mending can upgrade Flash Heal into Benediction (+30% healing). Cosmic Ripple healing +25%. All healing +6%. Divine Hymn pulses emit Cosmic Ripples at 75% effectiveness. During Apotheosis, Flash Heal is always upgraded to Benediction.
STAT PRIORITY: Intellect > Haste (shorter Prayer of Mending CD, more Benediction chances) > Mastery (Echo of Light — HoT component) > Crit (Benediction proc rate) > Versatility
GEMS: 1x Indecipherable Eversong Diamond + Flawless Quick Amethyst (Haste)
ENCHANTS: Weapon: Enchant Weapon - Acuity of the Ren'dorei. Ring: Haste or Mastery
FLASK: Flask of the Blood Knights (Haste)
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Staff (Missive: Haste + Mastery). Belt second.
KEY TIPS: Apotheosis + Benediction is your primary throughput window — every Flash Heal becomes empowered. Cosmic Ripple is now a significant chunk of your output due to the 25% buff.`,

  "Shadow":`SPEC: Shadow Priest (DPS)
APEX TALENT — Void Apparitions: Idol effects summon Shadowy Apparitions that shoot Void Bolts, generating Shadow Techniques stacks. At 5+ Shadow Techniques after casting an ability, your next cast deals bonus Shadow damage via a shadow clone. Core loop: Idol procs → Apparitions → Void Bolts → Shadow Techniques → empowered cast.
STAT PRIORITY: Intellect > Haste (faster Insanity generation, shorter Voidform ramp, more Idol procs) > Mastery (Shadow Weaving — % shadow damage per active DoT) > Crit > Versatility. NOTE: Haste and Mastery are close — whether Haste or Mastery edges ahead depends on your Hero Talent (Voidweaver favors Haste, Archon slightly different).
GEMS: 1x Indecipherable Eversong Diamond + Flawless Quick Amethyst (Haste) or Flawless Masterful Lapis (Mastery) depending on current balance
ENCHANTS: Weapon: Enchant Weapon - Acuity of the Ren'dorei. Ring: Haste or Mastery (sim yourself)
FLASK: Flask of the Blood Knights (Haste) or Flask of the Magisters (Mastery) — spec and sim dependent
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Staff (Missive: Haste + Mastery). Belt second.
KEY TIPS: Voidform is now the main cooldown (Dark Ascension removed). Voidform grants Void Volley on 15s CD reduced by Haste. Maximize Shadowy Apparitions generation — this is the central gameplay loop. Voidweaver recommended as default Hero Tree.`,

  // ── ROGUE ─────────────────────────────────────────────────────
  "Assassination":`SPEC: Assassination Rogue (DPS)
APEX TALENT — Implacable: Grants bonus Energy recharge after Envenom chain runs out (scaled to chain length). Increases Bleed and Nature damage (x2 points). Causes additional damage on Kingsbane, grants 5 Combo Points, instantly applies 10 poison stacks.
STAT PRIORITY: Agility > Haste (faster Energy = longer Envenom chains) > Crit (Mutilate crits for CP generation) > Mastery (Potent Assassin — % poison/bleed) > Versatility. NOTE: All secondary stats are close — Critical Strike can easily be your top stat depending on gear. Sim yourself.
GEMS: 1x Powerful Eversong Diamond + Flawless Deadly Amethyst (Crit) in remaining sockets
ENCHANTS: Weapon: Enchant Weapon - Acuity of the Ren'dorei. Ring: Crit (Eyes of the Eagle). Helm/Shoulders/Boots: Avoidance or Speed
FLASK: Flask of the Shattered Sun (Crit — generally best, sim yourself)
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Main hand dagger (Missive: Haste + Crit). Off-hand second.
KEY TIPS: Let Envenom intentionally expire after a long chain to trigger maximum Implacable Energy burst. Chain Envenom is the core skill expression. Top-performing Rogue spec in Midnight.`,

  "Outlaw":`SPEC: Outlaw Rogue (DPS)
APEX TALENT — Gravedigger: Each Between the Eyes cast has a chance for extra damage buff stack. Dispatch damage increased (x2 points). Slowly builds toward a free BtE cast (no CD, no cost).
STAT PRIORITY: Agility > Haste (more Sinister Strike procs, shorter AR CD) > Crit (Sinister Strike extra hit + Opportunity procs) > Versatility > Mastery (Main Gauche — lowest value)
GEMS: 1x Indecipherable Eversong Diamond + Flawless Quick Amethyst (Haste) or Flawless Deadly Amethyst (Crit)
ENCHANTS: Weapon: Enchant Weapon - Acuity of the Ren'dorei. Ring: Haste or Crit (sim). Helm/Shoulders/Boots: Avoidance
FLASK: Flask of the Shattered Sun (Crit)
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: 1H Weapon (Missive: Haste + Crit). Bracers second.
KEY TIPS: Adrenaline Rush uptime ~30-35% in Midnight (down from near-100%). Fatebound is the reliable Hero Tree — Trickster trails significantly. Gravedigger smooths dead periods between AR windows.`,

  "Subtlety":`SPEC: Subtlety Rogue (DPS)
APEX TALENT — Ancient Arts: CP generators sometimes spawn a shadow clone (Shadow damage). Clone spawns generate Shadow Techniques stacks. At 5+ Shadow Techniques after a CP generator, next finisher deals bonus Shadow damage via clone + refunds CPs. Shadow Dance duration now scales with Haste via Deepening Shadows rework.
STAT PRIORITY: Agility > Mastery (Executioner — % during finishers) > Crit (clone damage scales with Crit) > Haste (Shadow Dance duration scales with Haste — higher value than previous expansions) > Versatility. NOTE: Haste breakpoints matter — Trickster wants ~700 Haste, Deathstalker wants ~600 Haste.
GEMS: 1x Indecipherable Eversong Diamond + Flawless Masterful Peridot (Mastery) or Flawless Deadly Peridot (Crit+Haste) until Haste breakpoint
ENCHANTS: Weapon: Enchant Weapon - Acuity of the Ren'dorei. Ring: Mastery or Haste (depends on breakpoint). Helm/Shoulders/Boots: Avoidance or Speed
FLASK: Flask of the Shattered Sun (Crit) or Flask of the Blood Knights (Haste — depends on if you need Haste breakpoint)
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Main hand dagger (Missive: Mastery + Crit or Haste + Mastery — sim after hitting Haste breakpoint). Bracers second.
KEY TIPS: Haste has breakpoints (600 for Deathstalker, 700 for Trickster) — prioritize Haste until breakpoint, then shift to Mastery. Shadow Blades now doubles CP generation (not fills to full). Deathstalker recommended for single-target.`,

  // ── SHAMAN ────────────────────────────────────────────────────
  "Elemental":`SPEC: Elemental Shaman (DPS)
APEX TALENT — Feedback Loop: Spell Crit chance +5%/+10% (2 points). Elemental Fury increases spell Crit damage +25%/+50% (2 points). Elemental Overloads have 25% chance to cause an additional Overload (once per cast).
STAT PRIORITY: Intellect > Crit (Feedback Loop makes Crit double-dip — more Crit chance AND more Crit damage) > Haste (more casts per Stormkeeper window) > Mastery (Elemental Overload %, amplified by extra Overload proc) > Versatility
GEMS: 1x Indecipherable Eversong Diamond + Flawless Deadly Amethyst (Crit) in remaining sockets
ENCHANTS: Weapon: Enchant Weapon - Acuity of the Ren'dorei. Ring: Crit (Eyes of the Eagle). Helm/Shoulders/Boots: Avoidance
FLASK: Flask of the Shattered Sun (Crit — excellent synergy with Feedback Loop double-dip)
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Staff or MH+OH (Missive: Crit + Haste). Belt second.
KEY TIPS: Crit is the best secondary by a notable margin due to Feedback Loop double-dipping both chance AND damage. Stormbringer Hero Tree is mandatory for all group content.`,

  "Enhancement":`SPEC: Enhancement Shaman (DPS)
APEX TALENT — Storm Unleashed: Crash Lightning can reset its own CD and deal repeated strikes, building Maelstrom Weapon stacks with each chain. Strong burst AoE on short CD cycles.
STAT PRIORITY: Agility > Haste (faster Maelstrom stack buildup, shorter Stormstrike CD) > Mastery (Enhanced Elements — % Fire/Frost/Nature damage, also increases Windfury/Stormsurge chance) > Crit (Lava Lash crit refreshes Flame Shock) > Versatility
GEMS: 1x Indecipherable Eversong Diamond + Flawless Quick Amethyst (Haste) or Flawless Masterful Amethyst (Mastery) depending on sim
ENCHANTS: Weapon: Two Enchant Weapon - Acuity of the Ren'dorei. Ring: Mastery (generally preferred). Helm/Shoulders/Boots: Avoidance. CRITICAL: Enhancement uses Windfury Weapon + Flametongue Weapon imbues — DO NOT use Thalassian Phoenix Oil, it will be overwritten by imbues
FLASK: Flask of the Magisters (Mastery for Totemic) or Flask of the Blood Knights (Haste for Stormbringer)
BEST CRAFT: 1H Weapons (Missive: Agility + Haste — craft both eventually). Belt second.
KEY TIPS: IMPORTANT — Do NOT use weapon oils (Thalassian Phoenix Oil). Enhancement's Windfury and Flametongue imbues replace weapon enchant slots — oils are wasted gold. Maelstrom at exactly 5 stacks before spending.`,

  "Restoration Shaman":`SPEC: Restoration Shaman (Healer)
APEX TALENT — Stormstream Totem: Riptide can summon a Stormstream Totem that heals more targets than standard Healing Stream Totem with increased output. Riptide shifts from single-target HoT to group healing trigger.
STAT PRIORITY: Intellect > Mastery (Deep Healing — % bonus to lower health targets, scales totem throughput) > Haste (more Riptide casts = more totem summons) > Crit (Resurgence — mana return on crits) > Versatility
GEMS: 1x Indecipherable Eversong Diamond + Flawless Masterful Lapis (Mastery)
ENCHANTS: Weapon: Enchant Weapon - Acuity of the Ren'dorei. Ring: Mastery (generally preferred)
FLASK: Flask of the Magisters (Mastery)
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Staff (Missive: Mastery + Haste). Belt second.
KEY TIPS: Riptide placement matters — summon Stormstream Totem in the center of your group stack. Healing Stream Totem healing was increased by 50% in Midnight patch notes. Strong in stacked raid scenarios.`,

  // ── WARLOCK ───────────────────────────────────────────────────
  "Affliction":`SPEC: Affliction Warlock (DPS)
APEX TALENT — Shadow of Nathreza: Haunt deals splash damage to nearby enemies and has a chance to summon an ally demon. Haunt damage buffed. Strong in multi-target situations.
STAT PRIORITY: Intellect > Haste (faster Shard generation, shorter Haunt CD, more Malevolence windows) > Mastery (Potent Afflictions — % DoT damage scales Haunt splash) > Crit > Versatility
GEMS: 1x Indecipherable Eversong Diamond + Flawless Quick Amethyst (Haste) or Flawless Masterful Lapis (Mastery)
ENCHANTS: Weapon: Enchant Weapon - Acuity of the Ren'dorei. Ring: Haste or Mastery (sim). Helm/Shoulders/Boots: Avoidance
FLASK: Flask of the Blood Knights (Haste) or Flask of the Magisters (Mastery)
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Staff (Missive: Haste + Mastery). Belt second.
KEY TIPS: Affliction has strong target-swap capability in Midnight. Time Haunt casts when multiple enemies are clustered to maximize splash damage. Strong multi-target spec.`,

  "Demonology":`SPEC: Demonology Warlock (DPS)
APEX TALENT — Dominion of Argus: Chance to summon an additional Dreadstalker. Felguard's Legion Strike and Felstorm receive damage increases. High variance from proc-based summons — top-performing spec in Midnight.
STAT PRIORITY: Intellect > Haste (faster Shard generation for more Imps before Tyrant) > Crit (Demonbolt crits for Shard generation) > Mastery (Master Demonologist — scales demon damage including Apex summons) > Versatility
GEMS: 1x Indecipherable Eversong Diamond + Flawless Quick Amethyst (Haste) or Flawless Deadly Amethyst (Crit)
ENCHANTS: Weapon: Enchant Weapon - Acuity of the Ren'dorei. Ring: Haste or Crit (sim). Helm/Shoulders/Boots: Avoidance
FLASK: Flask of the Shattered Sun (Crit) or Flask of the Blood Knights (Haste)
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Staff (Missive: Haste + Crit). Belt second.
KEY TIPS: One of the best specs in Midnight. Apex introduces summon variance — Diabolist is reliable Hero Tree, Soul Harvester nerfed post-launch. Tyrant window timing remains the skill expression. Macro: Nether Portal → spam Hand of Gul'dan → Tyrant.`,

  "Destruction":`SPEC: Destruction Warlock (DPS)
APEX TALENT — Embers of Nihilam: Chance to evoke the Echo of Sargeras dealing Shadowflame damage, increasing Crit, and increasing Haste. Random summon type creates variance between AoE and single-target output.
STAT PRIORITY: Intellect > Crit (Chaos Bolt and Conflagrate crit scales Echo damage; provides consistent performance floor) > Haste (faster Shard generation, more Chaos Bolts per CD) > Mastery (Chaotic Energies — random % bonus) > Versatility
GEMS: 1x Indecipherable Eversong Diamond + Flawless Deadly Amethyst (Crit)
ENCHANTS: Weapon: Enchant Weapon - Acuity of the Ren'dorei. Ring: Crit (Eyes of the Eagle). Helm/Shoulders/Boots: Avoidance
FLASK: Flask of the Shattered Sun (Crit)
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Staff (Missive: Crit + Haste). Belt second.
KEY TIPS: Soul Harvester for single-target, Diabolist for multi-target. Apex summon type is random — variance is real. New Diabolic Oculi talents summon AoE-explosion orbs on Shard spending.`,

  // ── WARRIOR ───────────────────────────────────────────────────
  "Arms":`SPEC: Arms Warrior (DPS)
APEX TALENT — Master of Warfare: Charges a second Slam as Heroic Strike, adding bonus damage and Armor Penetration stacks. Upgrades Overpower and Slam interactions.
STAT PRIORITY: Strength > Crit (PREMIER stat — directly scales the Arms proc-and-bleed ecosystem; crits increase Deep Wounds frequency and amplify Apex interactions) > Haste (stabilizes rotation, improves Rage flow, makes Enrage maintenance less punishing) > Mastery (Deep Wounds — periodic bleed) > Versatility
GEMS: 1x Indecipherable Eversong Diamond + Flawless Deadly Garnet (Crit) in remaining sockets
ENCHANTS: Weapon: Enchant Weapon - Acuity of the Ren'dorei. Ring: Crit (Eyes of the Eagle). Helm/Shoulders/Boots: Avoidance
FLASK: Flask of the Shattered Sun (Crit)
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: 2H Weapon (4 Sparks, Missive: Strength + Crit). Belt second.
KEY TIPS: IMPORTANT — Crit is your top secondary, not Haste. This is a Midnight-specific change. Crit directly scales the proc-and-bleed ecosystem. Heroic Strike via Master of Warfare is additional free damage on top of regular Slam.`,

  "Fury":`SPEC: Fury Warrior (DPS)
APEX TALENT — Rampaging Berserker: Every Rampage cast triggers a Berserk buff (+Strength, stacking with own duration — treat as passive). 2nd+3rd points: Rampage damage +, Rage cost reduced during Recklessness. 4th point: Recklessness duration increased + grants 3 Berserk stacks on activation.
STAT PRIORITY: Strength > Mastery (Unshackled Fury — % bonus while Enraged; consistently strong value) = Haste (compresses rotation, reduces rotational CDs, auto-attack speed) > Versatility > Crit (LOWEST value — Fury does not generate extra Rage on Crit, unlike Arms). NOTE: Mastery + Haste are co-top stats; Crit is notably weak for Fury.
GEMS: 1x Indecipherable Eversong Diamond + Flawless Masterful Garnet (Mastery) or Flawless Quick Garnet (Haste) — sim to find your balance
ENCHANTS: Weapon: Enchant Weapon - Acuity of the Ren'dorei. Ring: Mastery or Haste (sim). Helm/Shoulders/Boots: Avoidance
FLASK: Flask of the Magisters (Mastery) or Flask of the Blood Knights (Haste)
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: 2H Weapon (4 Sparks, Missive: Strength + Mastery). Belt second.
KEY TIPS: CRITICAL — Crit is your LOWEST secondary value for Fury. Do not gem or enchant for Crit. Mastery + Haste are co-equal top secondaries. Mountain Thane (Thunder Clap focus) is better for M+; Slayer for raid single-target. Recklessness 4th point extending duration is the most impactful Apex talent node.`,

  "Protection Warrior":`SPEC: Protection Warrior (Tank)
APEX TALENT — Phalanx: Shield Slam critical strikes send defensive shockwaves enhancing group survivability. Shield of the Righteous +50% damage, hits 4 additional enemies. Vanguard empowers Avenger's Shield to deal Holy damage in a line on Judgment proc.
STAT PRIORITY: Strength > Versatility (damage reduction) > Haste (more Shield Slam casts = more crit shockwave chances, faster Shield Block uptime) > Mastery (Critical Block — block value) > Crit
GEMS: 1x Indecipherable Eversong Diamond + Flawless Versatile Garnet (Versatility)
ENCHANTS: Weapon: Enchant Weapon - Acuity of the Ren'dorei. Ring: Versatility
FLASK: Flask of the Shattered Sun or Flask of the Magisters
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: 1H Weapon (Missive: Versatility + Haste). Belt second.
KEY TIPS: Phalanx shockwaves provide raid-wide survivability — coordinate with healers on high-damage phases. The 4-target SotR splash is significant AoE threat in M+.`,
};

export function getSpecKnowledge(activeSpec, activeClass) {
  const spec = (activeSpec || "").toLowerCase();
  const cls  = (activeClass || "").toLowerCase();

  // Disambiguation: specs that share names across classes
  if (spec === "frost"        && cls.includes("death"))  return SPEC_KNOWLEDGE["Frost DK"]             || "";
  if (spec === "frost"        && cls.includes("mage"))   return SPEC_KNOWLEDGE["Frost Mage"]           || "";
  if (spec === "holy"         && cls.includes("paladin")) return SPEC_KNOWLEDGE["Holy Paladin"]        || "";
  if (spec === "holy"         && cls.includes("priest")) return SPEC_KNOWLEDGE["Holy Priest"]          || "";
  if (spec === "restoration"  && cls.includes("druid"))  return SPEC_KNOWLEDGE["Restoration Druid"]    || "";
  if (spec === "restoration"  && cls.includes("shaman")) return SPEC_KNOWLEDGE["Restoration Shaman"]   || "";
  if (spec === "protection"   && cls.includes("paladin")) return SPEC_KNOWLEDGE["Protection Paladin"]  || "";
  if (spec === "protection"   && cls.includes("warrior")) return SPEC_KNOWLEDGE["Protection Warrior"]  || "";
  if (spec === "beast mastery") return SPEC_KNOWLEDGE["Beast Mastery"] || "";
  if (SPEC_KNOWLEDGE[activeSpec]) return SPEC_KNOWLEDGE[activeSpec];

  const fuzzy = Object.keys(SPEC_KNOWLEDGE).find(k =>
    k.toLowerCase() === spec || k.toLowerCase().startsWith(spec)
  );
  return fuzzy
    ? SPEC_KNOWLEDGE[fuzzy]
    : "\nNo spec-specific data — give best general advice for this class.";
}
