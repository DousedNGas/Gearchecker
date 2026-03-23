// ═══════════════════════════════════════════════════════════════
// Vaultwright — Spec Knowledge
// Deep audited against Icy Veins Season 1 guides, March 2026
// Sources: icy-veins.com, method.gg (verified 23 March 2026)
// CRITICAL: Always direct players to sim via Raidbots for final
//           gem/enchant calls — stat weights shift with gear.
// ═══════════════════════════════════════════════════════════════

export const KNOWLEDGE_VERSION = "S1 12.0.5";
export const KNOWLEDGE_DATE    = "2026-03-23";

export const SPEC_KNOWLEDGE = {

  // ══════════════════════════════════════════════════════════════
  // DEATH KNIGHT
  // ══════════════════════════════════════════════════════════════

  "Blood":`SPEC: Blood Death Knight (Tank)
APEX TALENT — Dance of Midnight: Randomly summons additional Dancing Rune Weapons, combining with Blood's Apex passive that grants extra DRW procs from Rune consumption. San'layn builds lean into Vampiric Strike and Blood Beast for higher throughput; Deathbringer brings a more methodical 45-second burst window and is easier to play.
HERO TALENTS: San'layn (recommended — higher throughput, Blood Beast AoE/ST) | Deathbringer (easier, solid)
STAT PRIORITY: Strength > Versatility > Haste > Mastery (Blood Shield) > Crit. All secondaries reasonably close — ilvl beats stat hunting.
GEMS: 1x Indecipherable Eversong Diamond + Flawless Versatile Garnet (Versatility)
ENCHANTS: Weapon — Runeforge ONLY (Rune of the Fallen Crusader sustained / Rune of Razorice M+). Ring — Versatility. Do NOT use Thalassian Phoenix Oil — Runeforge replaces weapon enchants for all DK specs.
FLASK: Flask of the Shattered Sun or Flask of the Magisters
BEST CRAFT: 2H Weapon first (largest throughput gain). Avoid Chest (Tier slot).
KEY TIPS: Death Strike is your core survival tool — use on cooldown for self-healing. San'layn's Vampiric Strike procs during Dark Transformation maintain Essence of the Blood Queen buff — prioritise pressing it.`,

  "Frost DK":`SPEC: Frost Death Knight (DPS)
APEX TALENT — Chosen of Frostbrood: Frostwyrm's Fury deals 100% increased damage to first enemy hit and grants 15% Haste for 12 seconds. Extends active Pillar of Frost by 2 seconds. A second recall cast is available at 50% effectiveness. Frost has two Hero Talent options: Deathbringer (recommended for Raid — 2H Breath of Sindragosa build, 45s windows via Reaper's Mark) and Rider of the Apocalypse (M+ — minion damage, extra Death Charge mobility, stronger 1.5m window).
HERO TALENTS: Deathbringer (Raid — 2H Breath build) | Rider of the Apocalypse (M+)
STAT PRIORITY: Strength > Mastery (PRIMARY secondary — Potion of Recklessness procs your highest stat, want it to be Mastery) > Crit (Killing Machine procs) > Haste > Versatility. WARNING: Our stat priority previously had Haste ranked above Mastery — this was WRONG. Mastery is the top secondary for Frost DK in Midnight.
GEMS: 1x Indecipherable Eversong Diamond + Flawless Masterful Garnet (Mastery) primary
ENCHANTS: Weapon — Runeforge ONLY (Rune of the Fallen Crusader). Ring — Mastery. Do NOT use Thalassian Phoenix Oil.
FLASK: Flask of the Magisters (Mastery — synergises with Potion of Recklessness)
POTION: Potion of Recklessness (procs Mastery = massive value — do NOT use Light's Potential instead)
BEST CRAFT: 2H Weapon (Missive: Mastery + Crit). Frost runs 2H for Breath of Sindragosa builds. Never craft 1H if running Breath.
KEY TIPS: Frostwyrm's Fury hits the FIRST enemy — aim at priority target. The recall doubles its value. Time at Pillar of Frost opening. Potion of Recklessness procs highest secondary — actively manage your stat balance so Mastery stays on top.`,

  "Unholy":`SPEC: Unholy Death Knight (DPS)
APEX TALENT — Forbidden Knowledge: Army of the Dead transforms Death Coil into Necrotic Coil and Epidemic into Graveyard for 15 seconds. Putrefy summons a Lesser Ghoul and grants 3% Mastery for 12s (stacking). Each Magus of the Dead increases Necrotic Coil/Graveyard damage by 8%. Dread Plague has a chance to summon a Lesser Ghoul that applies Putrefy.
HERO TALENTS: Rider of the Apocalypse (recommended, M+ — Reanimation, Menacing Magus) | San'layn (Raid — Vampiric Strike, Blood Beast quadratic scaling)
STAT PRIORITY: Strength > Mastery = Crit (co-equal — example distribution: 1200 Mastery / 1000 Crit / 200 Haste / 0 Versatility) > Versatility > Haste (LOWEST value for Unholy)
GEMS: 1x Indecipherable Eversong Diamond + Flawless Masterful Lapis (Mastery) and Flawless Deadly Lapis (Crit) alternating
ENCHANTS: Weapon — Runeforge ONLY (Rune of the Apocalypse — best for all Unholy content including M+). Ring — Mastery. Do NOT use weapon oils.
FLASK: Flask of the Magisters (Mastery preferred)
BEST CRAFT: 2H Weapon (Missive: Mastery + Crit). Neck second.
KEY TIPS: Mastery and Crit are co-equal top stats — do NOT stack one exclusively. Army of the Dead is your primary DPS cooldown. Pets inherit your stats dynamically (0-5 second delay). Haste is your lowest value secondary — avoid gemming for it. Death from Range: Scourge Strike now 30 yards — you can maintain much of your rotation from range.`,

  // ══════════════════════════════════════════════════════════════
  // DEMON HUNTER
  // ══════════════════════════════════════════════════════════════

  "Havoc":`SPEC: Havoc Demon Hunter (DPS)
APEX TALENT: The Hunt empowers your next Eye Beam (+100% damage, wider AoE). The Hunt gains 15s reduced CD, +15% damage, DoT hits 2 extra enemies. Blade Dance +20% damage. Full Eye Beam channel resets Blade Dance CD.
HERO TALENTS: Aldrachi Reaver (M+ burst, Reaver's Glaive AoE) | Fel-Scarred (Raid ST, persistent demon companion) — verify current tuning as both are close
STAT PRIORITY: Agility > Crit (most valuable) > Haste > Versatility > Mastery (lowest). Both Crit and Mastery close for ring enchants — sim yourself.
GEMS: 1x Indecipherable Eversong Diamond + Flawless Deadly Amethyst (Crit)
ENCHANTS: Weapon — Two Enchant Weapon - Acuity of the Ren'dorei. Ring — Crit or Mastery (sim — both similar value). Helm/Shoulders/Boots — Avoidance
FLASK: Flask of the Shattered Sun (Crit)
WEAPON OIL: Two Thalassian Phoenix Oil
BEST CRAFT: Glaive weapon first (Missive: Crit + Haste). Belt second.
KEY TIPS: Always fully channel Eye Beam — Blade Dance reset ONLY triggers on full channel. Never cut it short.`,

  "Vengeance":`SPEC: Vengeance Demon Hunter (Tank)
APEX TALENT — Untethered Rage: Soul Cleave/Spirit Bomb have a chance per Soul Fragment consumed to allow free Metamorphosis for 10 seconds. Extra fragments per cast = +5% damage/fragment. Non-procs build Seething Anger stacks (+1% Agility, increases proc chance).
HERO TALENTS: Aldrachi Reaver | Fel-Scarred — both viable for tank
STAT PRIORITY: Agility > Versatility > Haste > Mastery (Fel Blood armor) > Crit
GEMS: 1x Indecipherable Eversong Diamond + Flawless Versatile Garnet
ENCHANTS: Weapon — Enchant Weapon - Acuity of the Ren'dorei. Ring — Versatility
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Ring or Neck (non-Tier, Missive: Versatility + Haste). Avoid Shoulders/Chest.
KEY TIPS: More Soul Fragments consumed per cast = higher Untethered Rage chance. Seething Anger is a reliable damage floor between procs.`,

  "Devourer":`SPEC: Devourer Demon Hunter (NEW — INT-based DPS, mid-range 25-35 yards)
APEX TALENT — Midnight: Collapsing Star always critically strikes. All Cosmic damage +3% (x2 points). Collapsing Star crit damage +50% of your Crit chance. Void Metamorphosis spawns 5 Soul Fragments + grants immediate Collapsing Star.
HERO TALENTS: Void-Scarred (recommended — Mastery focus, Void Meta synergy) | Annihilator (Haste focus, faster Meta cycling for single-target)
STAT PRIORITY: Intellect (PRIMARY — Devourer is INT-based, NOT Agility) > Mastery (Void-Scarred — Monster Within, doubles during Void Meta) > Haste (Annihilator wants Haste for ramp speed) > Versatility > Crit (lowest — Collapsing Star always crits so raw Crit less efficient)
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

  "Devastation":`SPEC: Devastation Evoker (DPS, mid-range 25-35 yards)
APEX TALENT — Rising Fury: During Dragonrage, gain Rising Fury every 6s (+4% Haste/stack, max 5). At 5 stacks all damage +15%. After Dragonrage, Risen Fury maintains bonuses and generates Essence Burst every 4s.
HERO TALENTS: Scalecommander (Raid — single-target, consistent damage) | Flameshaper (M+ — AoE burst, Fire Breath empowerment)
STAT PRIORITY: Intellect > Crit (top secondary — Crit and Haste very close, Crit edges ahead) > Haste > Mastery (Giantkiller — % Empower bonus) > Versatility
GEMS: 1x Powerful Eversong Diamond (prefer variety of gem colors for Movement Speed bonus) + Flawless Quick Garnet/Flawless Deadly Peridot spread
ENCHANTS: Weapon — Enchant Weapon - Acuity of the Ren'dorei or Jan'alai's Precision (within margin of error — buy cheapest). Ring — Crit (Eyes of the Eagle)
FLASK: Flask of the Shattered Sun (Crit)
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Weapon (Missive: Crit + Haste). Avoid Chest (Tier).
KEY TIPS: Dragonrage lasts 18s — reach 3+ Rising Fury stacks within it. Risen Fury window after Dragonrage: dump Essence Burst aggressively. Stay at 25-35 yards.`,

  "Preservation":`SPEC: Preservation Evoker (Healer, mid-range)
APEX TALENT — Merithra's Blessing: Essence abilities chance to upgrade next Reversion to heal target + 5 nearby allies for 250% Spell Power. Reversion passively reverses 1% of all damage taken. Dream Breath instant healing +125%, always grants Merithra's Blessing.
HERO TALENTS: Temporal Anomaly (recommended — consistent, mana efficient) | Chronowarden (Chrono Ward shields, more burst)
STAT PRIORITY: Intellect > Mastery (Golden Hour — HoT bonus) > Haste (more Essence casts, more procs) > Versatility > Crit
GEMS: 1x Indecipherable Eversong Diamond + Flawless Masterful Lapis (Mastery)
ENCHANTS: Weapon — Acuity of the Ren'dorei or Jan'alai's Precision. Ring — Mastery
FLASK: Flask of the Magisters (Mastery)
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Staff (Missive: Mastery + Haste).
KEY TIPS: Dream Breath is highest-priority heal. The 1% damage reversal passive is meaningful on AoE damage encounters.`,

  "Augmentation":`SPEC: Augmentation Evoker (Support DPS, mid-range)
APEX TALENT — Future Duplicate: Breath of Eons summons a future-you for 20s. Ebon Might extensions extend duplicate by 50%. While active: Ebon Might grants 100% extra stats, Upheaval/Eruption +25% damage.
HERO TALENTS: Chronowarden (recommended — Temporal Artificer, buffs Breath of Eons) | Scalecommander (Bombardments, AoE focused)
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
HERO TALENTS: Spellslinger (M+ — Spellfrost Bolt, Arcane Splinter burst) | Sunfury (Raid — Burden of Power, Glorious Incandescence ST)
STAT PRIORITY: Intellect > Mastery (Savant — Mana pool, Mana regen, Arcane Charge damage, all spell damage) > Haste > Crit > Versatility. NOTE: All secondary stats are very close for Arcane. Simming yourself is especially important for this spec.
GEMS: 1x Indecipherable Eversong Diamond + Flawless Versatile Amethyst (Versatility — generally best, sim yourself)
ENCHANTS: Weapon — Acuity of the Ren'dorei. Ring — Mastery or your top simmed stat
FLASK: Flask of the Magisters (Mastery — scales Mana which scales Arcane Charge bonus)
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Staff (Missive: Mastery + Haste). Belt second.
KEY TIPS: All secondaries are VERY close for Arcane — this is one of the specs where simming is most important. Precast Touch of the Magi, build charges, dump into explosion.`,

  "Fire":`SPEC: Fire Mage (DPS)
APEX TALENT — Fired Up: Consuming Hot Streak has 20% chance to grant Fired Up (+4% Fire damage, 12s). Combustion increases Fired Up chance and extends Combustion by 1s. Gaining Fired Up reduces Fire Blast CD by 2.5s. All Fire damage +3%.
HERO TALENTS: Sunfury (Raid ST — Burden of Power, strong Pyroblast windows) | Spellslinger (M+ — Spellfrost Bolt AoE chains)
STAT PRIORITY: Intellect > Crit (Hot Streak requires 2 crits — more Crit = more Fired Up + Combustion extensions) > Haste (shorter Fire Blast/Scorch CDs) > Mastery (Ignite periodic) > Versatility
GEMS: 1x Indecipherable Eversong Diamond + Flawless Deadly Amethyst (Crit)
ENCHANTS: Weapon — Acuity of the Ren'dorei. Ring — Crit (Eyes of the Eagle)
FLASK: Flask of the Shattered Sun (Crit)
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Staff (Missive: Crit + Haste). Avoid Shoulders/Chest (Tier).
KEY TIPS: Combustion extension via Fired Up can spiral into 15+ second windows. Fire Blast CD reduction from Fired Up makes Hot Streak chains self-sustaining during lucky windows.`,

  "Frost Mage":`SPEC: Frost Mage (DPS)
APEX TALENT — Hand of Frost: Shattering an enemy has 10% chance to summon a Hand of Frost (500% Spell Power Frost damage). Each Freezing stack +1% Hand of Frost chance. Hand of Frost damage +1% spell damage for 8s. Ray of Frost summons 4 Hands of Frost, gains extra charge, +25% damage.
HERO TALENTS: Frostfire (recommended — Frostfire Bolt weaving, strong sustained) | Spellslinger (alternative — Spellfrost Bolt AoE)
STAT PRIORITY: Intellect > Versatility (HIGHEST secondary for Frost in Midnight — flat damage + damage reduction — this is a Midnight-specific change, do NOT use older guides) > Crit > Mastery (Freeze and Shatter — flat increase) > Haste. NOTE: Ring enchant changed February 2026 — verify with current sim.
GEMS: 1x Indecipherable Eversong Diamond + Flawless Versatile Amethyst (Versatility) or top simmed
ENCHANTS: Weapon — Acuity of the Ren'dorei. Ring — Versatility or Crit (check current guides — changed Feb 2026)
FLASK: Flask of the Shattered Sun (Crit). Potion: Potion of Recklessness with CDs
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Ring (non-Tier). Staff second (Missive: Versatility + Crit).
KEY TIPS: Versatility being #1 is a MIDNIGHT-SPECIFIC CHANGE. Previous expansions prioritised Haste — don't follow older Frost guides. Ray of Frost guarantees 4 Hand of Frost summons — highest-priority cast.`,

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
STAT PRIORITY: Agility > Versatility (TOP secondary for Windwalker — increases all damage and healing done, reduces damage taken; also valuable for self-healing Vivify) > Critical Strike > [varies by gear — sim required]. NOTE: Previous spec listed Crit first — Versatility is the correct top secondary.
GEMS: 1x Indecipherable Eversong Diamond + Flawless Versatile Garnet (Versatility) or top simmed stat
ENCHANTS: Weapon — Acuity of the Ren'dorei. Ring — Versatility or your top simmed stat
FLASK: Flask of the Shattered Sun
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Weapon (Missive: Agility + Versatility). Bracers second.
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
APEX TALENT — Vanguard: Judgment may grant Vanguard, empowering Avenger's Shield to deal Holy damage in a line. Shield of the Righteous +50% damage, hits 4 additional enemies. Judgment +10% damage.
HERO TALENTS: Mountain Thane (M+ — Thunder Clap → Thunder Blast, Rage feedback loop) | Colossus (Raid — Demolish ability, bleed amplification, methodical burst windows). NOTE: Previous spec listed "Phalanx" as hero talent — this does not exist.
STAT PRIORITY: Strength > Versatility (damage reduction, scales SotR burst) > Haste (faster Holy Power = more SotR = more Vanguard fishing) > Mastery (Divine Bulwark — block chance) > Crit. All secondaries very close — ilvl wins.
GEMS: 1x Indecipherable Eversong Diamond + Flawless Versatile Garnet
ENCHANTS: Weapon — Acuity of the Ren'dorei. Ring — Versatility
FLASK: Flask of the Shattered Sun or Flask of the Magisters
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: 1H Weapon (Missive: Versatility + Haste). Belt second. Never craft Shoulders, Chest, or Gloves (all Tier).
KEY TIPS: Mountain Thane creates a Rage feedback loop — more Thunder Blasts = more Shield Slams = more Rage. Colossus requires planning Demolish casts around Rage — more methodical playstyle.`,

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
HERO TALENTS: Deathstalker (recommended — Deathstalker's Mark, Symbolic Victory execute damage) | Trickster (AoE option — Unseen Blade, Fan the Hammer)
STAT PRIORITY: Agility > Haste = Crit (very close — each can be top depending on gear) > Mastery (Potent Assassin — DoT damage %) > Versatility. Use Raidbots — secondary stats are tight and gear-dependent.
GEMS: 1x Powerful Eversong Diamond + Flawless Deadly Amethyst (Crit)
ENCHANTS: Weapon — Acuity of the Ren'dorei. Ring — Crit (Eyes of the Eagle) — but sim, as Haste can beat Crit
FLASK: Flask of the Shattered Sun (Crit — generally best, sim yourself)
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Main hand dagger (Missive: Haste + Crit). Off-hand second.
KEY TIPS: Let Envenom intentionally expire after a long chain to trigger maximum Implacable Energy burst. One of the top DPS specs in Midnight S1.`,

  "Outlaw":`SPEC: Outlaw Rogue (DPS)
APEX TALENT — Gravedigger: Each Between the Eyes cast has a chance for extra damage buff stack. Dispatch damage increased (x2 points). Slowly builds toward a free BtE cast (no CD, no cost).
HERO TALENTS: Fatebound (reliable, consistent — Fatebound Coin flip mechanic, Lucky Break) | Trickster (M+ — Unseen Blade, Sting Like a Bee)
STAT PRIORITY: Agility > Haste (Sinister Strike extra hits, shorter AR CD) > Crit (Sinister Strike extra hit, Opportunity procs) > Versatility > Mastery (Main Gauche — lowest value)
GEMS: 1x Indecipherable Eversong Diamond + Flawless Quick Amethyst (Haste) or Flawless Deadly Amethyst (Crit)
ENCHANTS: Weapon — Acuity of the Ren'dorei. Ring — Haste or Crit (sim)
FLASK: Flask of the Shattered Sun (Crit)
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: 1H Weapon (Missive: Haste + Crit). Bracers second.
KEY TIPS: Fatebound is reliable for all content. Trickster for M+ AoE focus. Adrenaline Rush uptime reduced in Midnight — space cooldown windows more deliberately.`,

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
STAT PRIORITY: Intellect > Crit (double-dips via Feedback Loop — more Crit CHANCE and more Crit DAMAGE both scale from same investment; top secondary by clear margin) > Haste > Mastery (Elemental Overload %) > Versatility
GEMS: 1x Indecipherable Eversong Diamond + Flawless Deadly Amethyst (Crit)
ENCHANTS: Weapon — Acuity of the Ren'dorei. Ring — Crit (Eyes of the Eagle)
FLASK: Flask of the Shattered Sun (Crit — excellent Feedback Loop synergy)
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: Staff or MH+OH (Missive: Crit + Haste). Belt second.
KEY TIPS: Crit is the best secondary by a notable margin — both your chance AND damage scale with Crit investment. Stormbringer is mandatory for M+ and raid competitive play.`,

  "Enhancement":`SPEC: Enhancement Shaman (DPS)
APEX TALENT — Storm Unleashed: Crash Lightning can reset its own CD and deal repeated strikes, building Maelstrom Weapon stacks. Strong burst AoE.
HERO TALENTS: Stormbringer (default for group content — Tempest AoE) | Totemic (Haste focus, Surging Totem, tighter single-target rotation)
STAT PRIORITY: Agility > Haste (faster Maelstrom stack buildup, shorter Stormstrike CD) > Mastery (Enhanced Elements — % Fire/Frost/Nature damage, also increases Windfury/Stormsurge chance) > Crit > Versatility. For Stormbringer builds, sim yourself — Mastery and Haste close. For Totemic, Haste leads more clearly.
GEMS: 1x Indecipherable Eversong Diamond + Flawless Quick Amethyst (Haste) or Flawless Masterful Amethyst (Mastery)
ENCHANTS: Weapon — Two Enchant Weapon - Acuity of the Ren'dorei. Ring — Mastery (Stormbringer) or Haste (Totemic). CRITICAL: DO NOT use Thalassian Phoenix Oil — Windfury Weapon and Flametongue Weapon imbues override weapon enchant consumables. Oils are wasted gold for Enhancement.
FLASK: Flask of the Magisters (Mastery for Stormbringer) or Flask of the Blood Knights (Haste for Totemic)
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
APEX TALENT — Phalanx Strike: Shield Slam critical strikes send defensive shockwaves providing group survivability. Shield of the Righteous +50% damage, hits 4 additional enemies. Vanguard empowers Avenger's Shield on Judgment proc.
HERO TALENTS: Mountain Thane (M+ — Thunder Blast from Thunder Clap, Rage feedback loop, faster Shield Slams, Lightning Strikes synergy) | Colossus (Raid — Demolish truck-hit, bleed amp via Rage of Korroth, methodical playstyle)
STAT PRIORITY: Strength > Haste (more Rage = more Ignore Pain proportional to Haste increase; shorter Anger Management CDs) > Versatility (constant damage reduction including magic, highly valuable on magic-heavy fights) > Critical Strike (increases parry chance for block, also damage) > Mastery (Critical Block — "worst" secondary but all stats close) NOTE: Versatility becomes #1 on magic-heavy encounters.
GEMS: 1x Indecipherable Eversong Diamond + Flawless Versatile Garnet (Versatility)
ENCHANTS: Weapon — Acuity of the Ren'dorei. Ring — Versatility
FLASK: Flask of the Shattered Sun or Flask of the Magisters
WEAPON OIL: Thalassian Phoenix Oil
BEST CRAFT: 1H Weapon (Missive: Versatility + Haste). Belt second.
KEY TIPS: Versatility scales your Ignore Pain healing proportionally. On magic-heavy fights (common in raid), Versatility jumps to #1 value. Mountain Thane creates positive Rage feedback — more Thunder Blasts → more Shield Slams → more Rage. Colossus's Demolish can be cancelled to reapply it — advanced tech.`,
};

export function getSpecKnowledge(activeSpec, activeClass) {
  const spec = (activeSpec || "").toLowerCase().trim();
  const cls  = (activeClass || "").toLowerCase().trim();

  // Disambiguation: specs that share names across classes
  if (spec === "frost"        && cls.includes("death"))   return SPEC_KNOWLEDGE["Frost DK"]           || "";
  if (spec === "frost"        && cls.includes("mage"))    return SPEC_KNOWLEDGE["Frost Mage"]         || "";
  if (spec === "frost dk"                              )   return SPEC_KNOWLEDGE["Frost DK"]           || "";
  if (spec === "holy"         && cls.includes("paladin")) return SPEC_KNOWLEDGE["Holy Paladin"]       || "";
  if (spec === "holy"         && cls.includes("priest"))  return SPEC_KNOWLEDGE["Holy Priest"]        || "";
  if (spec === "restoration"  && cls.includes("druid"))   return SPEC_KNOWLEDGE["Restoration Druid"]  || "";
  if (spec === "restoration"  && cls.includes("shaman"))  return SPEC_KNOWLEDGE["Restoration Shaman"] || "";
  if (spec === "protection"   && cls.includes("paladin")) return SPEC_KNOWLEDGE["Protection Paladin"] || "";
  if (spec === "protection"   && cls.includes("warrior")) return SPEC_KNOWLEDGE["Protection Warrior"] || "";
  if (spec === "beast mastery"                         )   return SPEC_KNOWLEDGE["Beast Mastery"]     || "";

  // Direct match
  if (SPEC_KNOWLEDGE[activeSpec]) return SPEC_KNOWLEDGE[activeSpec];

  // Fuzzy match
  const fuzzy = Object.keys(SPEC_KNOWLEDGE).find(k =>
    k.toLowerCase() === spec || k.toLowerCase().startsWith(spec)
  );
  return fuzzy
    ? SPEC_KNOWLEDGE[fuzzy]
    : "\nNo spec-specific data — give best general advice for this class based on the gear data provided.";
}
