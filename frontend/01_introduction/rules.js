function create_replacement_rule(to_be_replaced, replacement, description, status, tags) {
    function replace(word, context) {
        // TODO preserve case https://stackoverflow.com/questions/17264639/replace-text-but-keep-case
        // and handle removed first case "h" so that the second case becomes upper case
        return word.replaceAll(to_be_replaced, replacement);
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
    crr("ac", "aj", "No. 3 Fonema /x/. ", "COMPLETE", []),
    crr("ecc", "ejc", "No. 3 Fonema /x/. ", "COMPLETE", []),
    crr("ec", "ej", "No. 3 Fonema /x/. ", "COMPLETE", []),
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
    crr("TODO", "ka", "No. 2 Fonema /k/. ", "COMPLETE", [])
]