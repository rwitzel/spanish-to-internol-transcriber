function create_replacement_rule(to_be_replaced, replacement, description, status, tags) {
    function replace(word, context) {
        // TODO preserve case https://stackoverflow.com/questions/17264639/replace-text-but-keep-case
        return word.replaceAll(to_be_replaced, replacement);
    }

    return {
        "active": true,
        "description": description + " Replace silaba "+ to_be_replaced + " with " + replacement + ".",
        "tags": tags,
        "status": status,
        "applier": replace
    }
}

const rules = [
    create_replacement_rule("va", "ba", "No. 1 Fonema /b/. ", "COMPLETE", []),
    create_replacement_rule("ve", "be", "No. 1 Fonema /b/. ", "COMPLETE", []),
    create_replacement_rule("ca", "ka", "No. 2 Fonema /k/. ", "COMPLETE", [])
]