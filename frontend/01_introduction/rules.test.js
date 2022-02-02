m = require("./rules");
const to_internol_objects = m.to_internol_objects;
const rules = m.rules;

function transform(spanish_word) {
    result = to_internol_objects(spanish_word, rules);
    return result[0][0].new_word
}

test("first test (no specific meaning", () => {
    expect(transform("naranja")).toBe("Naranja");
});
