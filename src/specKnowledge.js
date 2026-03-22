// ═══════════════════════════════════════════════════════════════
// Vaultwright — Spec Knowledge
// KNOWLEDGE_VERSION: Season 1 patch 12.0.1 — Updated 2026-03-22
// To update: edit SPEC_KNOWLEDGE entries below, bump KNOWLEDGE_VERSION
// ═══════════════════════════════════════════════════════════════

export const KNOWLEDGE_VERSION = "S1 12.0.1";
export const KNOWLEDGE_DATE    = "2026-03-22";

const SPEC_KNOWLEDGE = {
  // ── DEATH KNIGHT ─────────────────────────────────────────────
  "Blood":`SPEC: Blood Death Knight (Tank)
APEX TALENT — Dance of Midnight: While Dancing Rune Weapon is active, parrying has a chance to make your next Heart Strike cost no Runes and deal 150% increased damage. Each DRW active increases your damage by 6% and reduces damage taken by 6%. Consuming a Rune has a chance to summon a DRW for 6 seconds. Rotation anchors around maintaining DRW uptime and spamming Heart Strike during parry windows.
STAT PRIORITY: Strength > Versatility (scales damage reduction from DRW stacking) > Haste (more Rune consumption = more DRW procs) > Mastery (Blood Shield) > Crit
BEST CRAFT: 2H Weapon first (largest single throughput gain). Never craft Chest (Tier slot).
KEY TIPS: Parry chance is critical — prioritize Parry secondary on gear if available. More DRWs active = multiplicative damage reduction. Use Death Strike when below 40% health for emergency mitigation.`,

  "Frost DK":`SPEC: Frost Death Knight (DPS)
APEX TALENT — Chosen of Frostbrood: Frostwyrm's Fury deals 100% increased damage to the first enemy hit and grants 15% Haste for 12 seconds. It extends an active Pillar of Frost by 2 seconds. All Frost damage increased by 10%. After the Frostwyrm leaves you can recall it for a second cast at 50% effectiveness. Rotation revolves around maximising Frostwyrm's Fury hits and Pillar of Frost extensions.
STAT PRIORITY: Strength > Haste (Pillar extension from Frostwyrm — more casts = more extensions) > Crit (Killing Machine procs) > Mastery (Frozen Heart % physical) > Versatility
BEST CRAFT: 2H Weapon (Missive: Haste + Crit). 2H required — do NOT craft 1H.
KEY TIPS: Positioning matters — Frostwyrm's Fury bonus applies to the first enemy hit, so aim it at the priority target. The recall mechanic effectively doubles its value. Time Frostwyrm's Fury to land at the start of Pillar of Frost.`,

  "Unholy":`SPEC: Unholy Death Knight (DPS)
APEX TALENT — Forbidden Knowledge: Army of the Dead transforms Death Coil into Necrotic Coil and Epidemic into Graveyard for 15 seconds, increasing Physical and Shadow damage. Putrefy summons a Lesser Ghoul and grants 3% Mastery for 12 seconds (stacking). Each Magus of the Dead increases Necrotic Coil and Graveyard damage by 8%. Dread Plague has a 20% chance to summon a Lesser Ghoul that applies Putrefy at 60% effectiveness.
STAT PRIORITY: Strength > Mastery (scales Putrefy stacks and Necrotic Coil damage) > Haste (faster GCD = more Army window casts) > Crit > Versatility
BEST CRAFT: 2H Weapon (Missive: Mastery + Haste). Neck second.
KEY TIPS: Army of the Dead is now your primary DPS cooldown, not just a setup tool. Stack Putrefy during Army window for compounding Mastery. Top-performing spec in Midnight — Army + Magus + Apex Talent all lining up is exceptional single-target burst.`,

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
BEST CRAFT: Weapon first (Spellbreaker's Warglaive, 2 Sparks + Darkmoon Sigil: Hunt embellishment). Second craft: Belt or Bracers with Arcanoweave Lining. NEVER craft Neck before weapon — weapon is your biggest DPS gain. Never craft Tier slots (Head/Shoulders/Chest/Hands/Legs).
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
STAT PRIORITY: Agility > Versatility (damage reduction) > Mastery (Ursoc's Endurance — bonus Armor, amplified by 3% passive from the Apex Talent) > Haste (more Maul/Thrash casts) > Crit
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
KEY TIPS: Aimed Shot always critting is transformative for burst windows. Crit is your best secondary because it directly amplifies the Aimed Shot Apex Talent bonus. Rapid Fire into Aimed Shot is your core loop — never delay Aimed Shot after filling a Rapid Fire.`,

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
KEY TIPS: Benediction during Apotheosis is your primary throughput window — every Flash Heal becomes an empowered Benediction. Cosmic Ripple is now a significant portion of your output due to the 25% buff. Holy is considered an easier, entry-level healing spec with this Apex Talent — straightforward to execute.`,

  "Shadow":`SPEC: Shadow Priest (DPS)
APEX TALENT — Void Apparitions: Idol effects summon Shadowy Apparitions that shoot additional Void Bolts, generating extra Shadow Techniques stacks per spawn. At 5+ Shadow Techniques after casting an ability, a buff triggers that empowers your next cast — dealing bonus Shadow damage via a clone and granting efficient follow-up casts. Core identity: maximize Idol procs → more Apparitions → more Void Bolts → Shadow Techniques buff uptime.
STAT PRIORITY: Intellect > Haste (faster Insanity generation, shorter Voidform ramp, more Idol procs per minute) > Mastery (Shadow Weaving — % shadow damage, scales Apparition Void Bolt damage) > Crit > Versatility
BEST CRAFT: Staff (Missive: Haste + Mastery). Belt second.
KEY TIPS: Voidform is now the main cooldown (Dark Ascension removed). Voidform grants Void Volley on a 15s cooldown reduced by Haste — use it on cooldown. Maximize Idol procs to spawn more Shadowy Apparitions (your Apex Talent's core loop). Each Apparition shoots a Void Bolt, stacking Shadow Techniques. At 5+ stacks after an ability, your next cast deals bonus damage and resets efficiently. Voidweaver Hero Tree recommended.`,

  // ── ROGUE ─────────────────────────────────────────────────────
  "Assassination":`SPEC: Assassination Rogue (DPS)
APEX TALENT — Implacable: Grants bonus Energy recharge after your Envenom chain runs out, based on how long you maintained the chain. Increases Bleed and Nature damage (x2 points). Causes additional damage on Kingsbane use, grants 5 Combo Points, and instantly applies 10 poison stacks to ramp Kingsbane fast. Rotation revolves around chaining Envenoms for as long as possible to maximise the Implacable Energy burst.
STAT PRIORITY: Agility > Haste (faster Energy = longer Envenom chains, shorter Kingsbane CD) > Crit (Mutilate crits for CP generation) > Mastery (Potent Assassin — % poison/bleed) > Versatility
BEST CRAFT: Main hand dagger (Missive: Haste + Crit). Off-hand second.
KEY TIPS: Let Envenom intentionally expire after a long chain to trigger Implacable's maximum Energy burst. The Kingsbane Apex Talent point front-loads damage and combo points — use it immediately after Kingsbane application. Top-performing Rogue spec in Midnight.`,

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
KEY TIPS: One of the best specs in Midnight. Apex Talent introduces variance via random summon types — some give exceptional AoE, others focus on single-target. Diabolist is old-reliable Hero Tree; Soul Harvester has been nerfed post-launch. Tyrant window timing remains the skill expression. New talents Through the Felvine and Devil Fruit add Malevolence interaction.`,

  "Destruction":`SPEC: Destruction Warlock (DPS)
APEX TALENT — Embers of Nihilam: Chance to evoke the Echo of Sargeras that deals Shadowflame damage, increases critical strike, and increases Haste. The Apex summon is random — variance between exceptional AoE and single-target output depending on which Echo type appears.
STAT PRIORITY: Intellect > Crit (Chaos Bolt and Conflagrate crit scales Echo damage; high crit = more consistent performance floor) > Haste (faster Shard generation, more Chaos Bolts per cooldown) > Mastery (Chaotic Energies — random % bonus) > Versatility
BEST CRAFT: Staff (Missive: Crit + Haste). Belt second.
KEY TIPS: Apex Talent adds meaningful variance — Soul Harvester is still preferred for single-target, Diabolist for multi-target. New Diabolic Oculi talents summon AoE-explosion orbs on Shard spending. Post-launch nerfs targeted splash damage overperformance. Correct Hero Tree choice matters more than in TWW.`,

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
