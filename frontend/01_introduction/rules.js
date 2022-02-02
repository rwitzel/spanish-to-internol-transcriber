// BEGIN poor man's solution to keep simple solution for imports in browser
try {
    spanish_no_nouns = require("./spanish_no_nouns");
    spanish_adjectives = require("./spanish_adjectives");
    spanish_nouns = require("./spanish_nouns");
    split_text = require("./text_splitter");
}
catch {
    console.log("cannot import other modules via require. assuming that runtime is browser now.");
}
// END poor man's solution to keep simple solution for imports in browser

const spanish_no_nouns_set = new Set(spanish_no_nouns);
const spanish_nouns_adjectives = new Set(spanish_adjectives);
const spanish_nouns_set_wide = new Set(spanish_nouns.filter(noun => !spanish_no_nouns_set.has(noun)));
const spanish_nouns_set_narrow = new Set(spanish_nouns.filter(noun => !spanish_no_nouns_set.has(noun) && !spanish_nouns_adjectives.has(noun)))

function create_upppercase_rule(nouns_set, id, description) {

    function replace(word) {
        const lookup_word = word.match(/^(.*?)(es|s)?$/)[1]
        if (nouns_set.has(lookup_word)) {
            word = word.substring(0, 1).toUpperCase() + word.substring(1);
        }
        return word
    }

    return {
        "active": true,
        "id": id,
        "description": "Nouns are uppercase, using a dictionary with " + nouns_set.size + " Spanish nouns. " + description,
        "tags": [],
        "status": "INCOMPLETE",
        "applier": replace
    }
}

// BEGIN replacement for missing string.replaceAll() in node 10.x
function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function replaceAll(str, find, replace) {
    if (typeof to_be_replaced === 'string') {
        find = new RegExp(escapeRegExp(find), 'g');
    }
    return str.replace(find, replace);
}
// END replacement for missing string.replaceAll() in node 10.x

function create_replacement_rule(to_be_replaced, replacement, description, status, tags) {
    function replace(word) {
        word = replaceAll(word, to_be_replaced, replacement);
        if (typeof to_be_replaced === 'string') {
	        // preserving case
	        word = replaceAll(word, to_be_replaced.substring(0,1).toUpperCase() + to_be_replaced.substring(1),
	                               replacement.substring(0,1).toUpperCase() + replacement.substring(1));
        }
        return word;
    }

    return {
        "active": true,
        "id": to_be_replaced,
        "description": description + " Replace silaba "+ to_be_replaced + " with " + replacement + ".",
        "tags": tags,
        "status": status,
        "applier": replace
    }
}

const crr = create_replacement_rule

// avoid regular expression to provide the most expressive statistics for specific rules
const rules = [
    //create_upppercase_rule(spanish_nouns_set_wide, "uppercase_wide", "All kind of nouns."),
    create_upppercase_rule(spanish_nouns_set_narrow, "uppercase", "Only unambiguous nouns."), // nouns that are not adjectives
    crr("ch", "ʃ", "No. X(a) Proteja la carta ch.", "AUXILIARY", []),
    crr("va", "ba", "No. 1 Fonema /b/. ", "COMPLETE", []),
    crr("ve", "be", "No. 1 Fonema /b/. ", "COMPLETE", []),
    crr("vi", "bi", "No. 1 Fonema /b/. ", "COMPLETE", []),
    crr("vo", "bo", "No. 1 Fonema /b/. ", "COMPLETE", []),
    crr("vu", "bu", "No. 1 Fonema /b/. ", "COMPLETE", []),
    crr("ca", "ka", "No. 2 Fonema /k/. ", "COMPLETE", []),
    crr("que", "ke", "No. 2 Fonema /k/. ", "COMPLETE", []),
    crr("qui", "ki", "No. 2 Fonema /k/. ", "COMPLETE", []),
    crr("co", "ko", "No. 2 Fonema /k/. ", "COMPLETE", []),
    crr("cu", "ku", "No. 2 Fonema /k/. ", "COMPLETE", []),
    crr("acc", "ajc", "No. 3 Fonema /x/. ", "COMPLETE", []),
    crr("ac", "aj", "No. 3 Fonema /x/. ", "COMPLETE", []), // FIXME
    crr("ecc", "ejc", "No. 3 Fonema /x/. ", "COMPLETE", []),
    crr("ec", "ej", "No. 3 Fonema /x/. ", "COMPLETE", []), // FIXME
    crr("icc", "ijc", "No. 3 Fonema /x/. ", "COMPLETE", []),
    crr("ic", "ij", "No. 3 Fonema /x/. ", "COMPLETE", []),
    crr("occ", "ojc", "No. 3 Fonema /x/. ", "COMPLETE", []),
    crr("oc", "oj", "No. 3 Fonema /x/. ", "COMPLETE", []),
    crr("ucc", "ujc", "No. 3 Fonema /x/. ", "COMPLETE", []),
    crr("uc", "uj", "No. 3 Fonema /x/. ", "COMPLETE", []),
    crr("za", "sa", "No. 4 Fonema /θ/. ", "COMPLETE", []),
    crr("[zc]e", "se", "No. 4 Fonema /θ/. ", "COMPLETE", []),
    crr("[zc]i", "si", "No. 4 Fonema /θ/. ", "COMPLETE", []),
    crr("zo", "so", "No. 4 Fonema /θ/. ", "COMPLETE", []),
    crr("zu", "su", "No. 4 Fonema /θ/. ", "COMPLETE", []),
    crr("ge", "je", "No. 6 Fonema /x/. ", "COMPLETE", []),
    crr("gi", "ji", "No. 6 Fonema /x/. ", "COMPLETE", []),
    crr("gue", "ge", "No. 5 Fonema /g/. ", "COMPLETE", []),
    crr("gui", "gi", "No. 5 Fonema /g/. ", "COMPLETE", []),
    crr("ha", "a", "No. 7 Fonema muda. ", "COMPLETE", []),
    crr("he", "e", "No. 7 Fonema muda. ", "COMPLETE", []),
    crr("hi", "i", "No. 7 Fonema muda. ", "COMPLETE", []),
    crr("ho", "o", "No. 7 Fonema muda. ", "COMPLETE", []),
    crr("hu", "u", "No. 7 Fonema muda. ", "COMPLETE", []),
    crr(/[Aa]y(?![aeiou])/g, "ai", "No. 8 Fonema y vocálica. ", "COMPLETE", []),
    crr(/[Ee]y(?![aeiou])/g, "ei", "No. 8 Fonema y vocálica. ", "COMPLETE", []),
    crr(/[Oo]y(?![aeiou])/g, "oi", "No. 8 Fonema y vocálica. ", "COMPLETE", []),
    crr(/[Uu]y(?![aeiou])/g, "ui", "No. 8 Fonema y vocálica. ", "COMPLETE", []),
    crr(/[Yy](?![aeiou])/g, "i", "No. 8 Fonema y vocálica. ", "COMPLETE", []),
    crr("rra", "ra", "No. 9 Fonema /r/. ", "COMPLETE", []),
    crr("rre", "re", "No. 9 Fonema /r/. ", "COMPLETE", []),
    crr("rri", "ri", "No. 9 Fonema /r/. ", "COMPLETE", []),
    crr("rro", "ro", "No. 9 Fonema /r/. ", "COMPLETE", []),
    crr("rru", "ru", "No. 9 Fonema /r/. ", "COMPLETE", []),
    crr("ʃ", "ch", "No. X(b) Restaura la carta ch.", "AUXILIARY", [])
]

function to_internol_objects(spanish_text, rules) {
    const spanish_text_parts = split_text(spanish_text);
    const applied_rules = {};
    const internol_objects = spanish_text_parts.map((part) => {
        const internol_object = { "original_word": part.part, "applied_rules": []};

        if (!part.is_word) {
            internol_object.new_word = part.part;
            return internol_object;
        }

        let word = part.part;

        for (let i = 0; i < rules.length; i++) {
            const rule = rules[i] ;
            if (rule.active) {
                new_word = rule.applier(word);
                if (new_word !== word) {
                    internol_object.applied_rules.push(rule.id);
                    if (applied_rules[rule.id]) {
                        applied_rules[rule.id].push(word);
                    }
                    else {
                        applied_rules[rule.id] = [word];
                    }

                }
                word = new_word;
            }
        }
        internol_object.new_word = word;
        return internol_object;
    });
    return [internol_objects, applied_rules];
}

function to_internol_html(internol_objects, highlight_transformed_words) {
    const internol_words_as_html = internol_objects.map((internol_object) => {
        if (internol_object.applied_rules.length === 0 || !highlight_transformed_words) {
            return internol_object.new_word.replace(/\n/g, "<br/>");
        }
        else {
            return "<span class='modified' title='" + internol_object.original_word
                      + ": " + internol_object.applied_rules.join(",") + "'>" + internol_object.new_word + "</span>";
        }
    });
    return internol_words_as_html.join("");
}

// for temporary tests:
//console.log(to_internol_objects(spanish_text_example, rules));

module.exports = {
    rules: rules,
    to_internol_objects: to_internol_objects
};