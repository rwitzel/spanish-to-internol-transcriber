m = require("./rules");
const to_internol_objects = m.to_internol_objects;
const rules = m.rules;

function transform(spanish_word) {
    result = to_internol_objects(spanish_word, rules);
    return result[0][0].new_word
}

let spec_2021_10_24 = [
    ["acción", "Ajsión"],
    ["sección", "Sejsión"],
    ["dicción", "Dijsión"],
    ["occidente", "Ojsidente"],
    ["producción", "Produjsión"],
    ["zinc", "Sink"],
    ["zoología", "Soolojía"],
    ["hélice", "Élise"], // "Elise" would be also good
    ["híbrido", "íbrido"] // stays lower-case because it is an adjective as well
];

spec_2021_10_24.forEach((params) => {
    test("test " + params[0], () => {
        expect(transform(params[0])).toBe(params[1]);
    });
});
