// https://github.com/cerberus-ab/human-readable-numbers
// known SI prefixes, multiple of 3
const PREFIXES: Record<string, string> = {
    '24': 'Y',
    '21': 'Z',
    '18': 'E',
    '15': 'P',
    '12': 'T',
    '9': 'G',
    '6': 'M',
    '3': 'k',
    '0': '',
    '-3': 'm',
    '-6': 'µ',
    '-9': 'n',
    '-12': 'p',
    '-15': 'f',
    '-18': 'a',
    '-21': 'z',
    '-24': 'y'
};

function getExponent(n: number) {
    if (n === 0) return 0;
    return Math.floor(Math.log10(Math.abs(n)));
}

function precise(n: number, precision: number) {
    return Number.parseFloat(n.toPrecision(precision));
}

function readable(stringNumber: string, precision = 3) {
    const asNumber = precise(Number.parseFloat(stringNumber), 3);
    const magnitude = Math.max(Math.min(3 * Math.floor(getExponent(asNumber) / 3), 24), -24);
    return precise(asNumber / Math.pow(10, magnitude), precision).toString() + PREFIXES[magnitude];
}

export default readable;
