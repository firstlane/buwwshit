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

function censor(str, find, replace){
	var esc = find.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    var reg = new RegExp(esc, 'ig');
    return str.replace(reg, replace);
}

export function revealBullshit(text, censored) {
    const bullshitRe = new RegExp(`\\b(${bullshitTerms.join('|')})\\b`, 'gi');
	
	var bsText = findAndReplaceText(
        text,
        bullshitRe,
        revealBullshitInternal
    );
	
	if (censored){
		var censoredText = censor(bsText,"shit","poopoo");
	
		return censoredText;
	}
	else{
		return bsText;
	}
}
