import bullshitTerms from './terms';

function revealBullshitInternal(text) {
    const c = text.charAt(0);
    const last = text.length - 1;
    let bullshit = `${c === c.toUpperCase() ? 'B' : 'b'}ullshit`;

    if (text.substr(last - 2) === 'ing') {
        bullshit += 'ting';
    } else if (text.charAt(last - 1) !== 's' && text.charAt(last) === 's') {
        bullshit += 's';
    } else if (text.charAt(last - 2) !== 'e' && text.substr(last - 1) === 'ed') {
        bullshit += 'ted';
    } else if (text.charAt(last - 2) !== ('o' || 'e') && text.substr(last - 1) === ('or' || 'er')) {
        bullshit += 'ter';
    }

    return bullshit;
}

function findAndReplaceText(text, regex, replaceFunc) {
    return text.replace(regex, replaceFunc);
}

export function revealBullshit(text) {
    const bullshitRe = new RegExp(`\\b(${bullshitTerms.join('|')})\\b`, 'gi');

    return findAndReplaceText(
        text,
        bullshitRe,
        revealBullshitInternal
    );
}
