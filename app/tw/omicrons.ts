import { ParsedPlayer } from "./get-players";

// https://wiki.swgoh.help/wiki/Omicron_List#Territory_War
export const TWOmicrons = [{
    baseId: 'BOBAFETTSCION',
    shortName: 'OLD BOBA',
    twOmicrons: [
        { ability: "specialskill_BOBAFETTSCION01", key: 'S' },
        { ability: "leaderskill_BOBAFETTSCION", key: 'L' },
        { ability: "uniqueskill_BOBAFETTSCION01", key: 'U' },
    ]
}, {
    baseId: 'PHASMA',
    shortName: 'PHA',
    twOmicrons: [
        { ability: "leaderskill_PHASMA", key: 'L' },
    ]
}, {
    baseId: 'CHIEFNEBIT',
    shortName: 'NEB',
    twOmicrons: [
        { ability: "leaderskill_CHIEFNEBIT", key: 'L' },
    ]
}, {
    baseId: 'DARTHSIDIOUS',
    shortName: 'SID',
    twOmicrons: [
        { ability: "uniqueskill_DARTHSIDIOUS01", key: 'U' },
    ]
}, {
    baseId: 'EIGHTHBROTHER',
    shortName: '8th',
    twOmicrons: [
        { ability: "leaderskill_EIGHTHBROTHER", key: 'L' },
    ]
}, {
    baseId: 'EMBO',
    shortName: 'EMB',
    twOmicrons: [
        { ability: "uniqueskill_EMBO01", key: 'U' },
    ]
}, {
    baseId: 'FIFTHBROTHER',
    shortName: '5th',
    twOmicrons: [
        { ability: "leaderskill_FIFTHBROTHER", key: 'L' },
    ]
}, {
    baseId: 'GRANDINQUISITOR',
    shortName: 'Grd Inq',
    twOmicrons: [
        { ability: "specialskill_GRANDINQUISITOR02", key: 'S' },
        { ability: "leaderskill_GRANDINQUISITOR", key: 'L' },
        { ability: "uniqueskill_GRANDINQUISITOR01", key: 'U' },
    ]
}, {
    baseId: 'HERASYNDULLAS3',
    shortName: 'HERA',
    twOmicrons: [
        { ability: "leaderskill_HERASYNDULLAS3", key: 'L' },
    ]
}, {
    baseId: 'JYNERSO',
    shortName: 'JYN',
    twOmicrons: [
        { ability: "uniqueskill_JYNERSO01", key: 'U' },
    ]
}, {
    baseId: 'LUKESKYWALKER',
    shortName: 'FARM',
    twOmicrons: [
        { ability: "uniqueskill_LUKESKYWALKER01", key: 'U' },
    ]
}, {
    baseId: 'MACEWINDU',
    shortName: 'MACE',
    twOmicrons: [
        { ability: "uniqueskill_MACEWINDU02", key: 'U' },
    ]
}, {
    baseId: 'MARAJADE',
    shortName: 'MJ',
    twOmicrons: [
        { ability: "uniqueskill_MARAJADE01", key: 'U' },
    ]
}, {
    baseId: 'NINTHSISTER',
    shortName: '9th',
    twOmicrons: [
        { ability: "leaderskill_NINTHSISTER", key: 'L' },
    ]
}, {
    baseId: 'SECONDSISTER',
    shortName: '2nd',
    twOmicrons: [
        { ability: "leaderskill_SECONDSISTER", key: 'L' },
    ]
}, {
    baseId: 'SEVENTHSISTER',
    shortName: '7th',
    twOmicrons: [
        { ability: "leaderskill_SEVENTHSISTER", key: 'L' },
    ]
}, {
    baseId: 'UNDERCOVERLANDO',
    shortName: 'SKIF',
    twOmicrons: [
        { ability: "uniqueskill_UNDERCOVERLANDO01", key: 'U' },
    ]
}, {
    baseId: 'T3_M4',
    shortName: 'T3M4',
    twOmicrons: [
        { ability: "uniqueskill_t3_m4_02", key: 'U' },
    ]
}];


export function getTWOmicronCount(player: ParsedPlayer): number {
    return TWOmicrons.reduce((count, { baseId, twOmicrons }) => {
        const unit = player.units.find(({ base_id }) => baseId === base_id);
        if (!unit) return count;
        const possibleAbilities = twOmicrons.map(({ ability }) => ability);
        return count + unit.omicron_abilities.filter((ability) => possibleAbilities.includes(ability)).length;
    }, 0);
}
