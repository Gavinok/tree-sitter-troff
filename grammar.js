// Based on http://doc.cat-v.org/plan_9/4th_edition/papers/troff.pdf
module.exports = grammar({
  name: "troff",

  rules: {
    // TODO: add the actual grammar rules
    source_file: ($) =>
      repeat(choice($.macro_definition, $.macro_call, $.text, "\n")),

    text: ($) => /([a-z]|[A-Z]|\d|\?| )+/,

    request_char: ($) => seq(choice(".", "'"), repeat(choice(" ", "\t"))),

    identifier: ($) => /([a-z]|[A-Z]|\d)+/,

    macro_definition: ($) =>
      seq($.request_char, "de", "", $.identifier, $.macro_body),
    macro_body: ($) =>
      seq("\n", repeat(seq(choice($.macro_call, $.text), "\n")), $.end_block),
    end_block: ($) => "..",

    macro_call: ($) => seq($.request_char, $.identifier),
    macro_arg: ($) => seq(" ", $.identifier),
    macro_args: ($) => repeat1($.macro_arg),
    escape_seq: ($) =>
      choice(
        seq("(", $.identifier),
        seq("*", $.identifier), // TODO make only work for one char
        seq("(*", $.identifier), // TODO make only work for two char
        seq("$", "[1-9]"),
        "a",
        // TODO seq("b", "'", "'"),
        "c",
        // TODO seq("C", "'", "'")
        "d",
        // TODO drawing with "D"
        // TODO f for fonts
        // TODO g for format of number register
        // TODO h for horizontal motion
        // TODO H for hieght of current font
        // TODO kx for marking in a register
        // TODO l for horizontal drawing of lines
        // TODO L for vertical lines
        // TODO nx n(xx for inserting registers
        // TODO ox for inserting registers
        // TODO N'N' forcharecter number of current font
        // TODO o'...' for overstrike ...
        // TODO p for break and spread out input
        // TODO r reverse 1em vertical motion
        // TODO sN and s+-N for changing pointsize
        // TODO S'N' for slanting output
        // TODO \t for insterting tab
        // TODO \u for moving vertical by 1/2 em
        // TODO v'N' move N up
        // TODO w'string' get the width of string
        // TODO x'N' extra line space function
        // TODO X'string' output string as a device control function
        // TODO zc print c with zero width (without spacing)
        // TODO { begin conditional input
        // TODO } end conditional input
        // TODO \n ignore newline
        // TODO Z any character not in this above list
        "\\",
        "e",
        "'",
        ",",
        "~",
        ".",
        " ",
        "|",
        "^",
        "&",
        "!",
        '"',
        "%"
      ),
  },
});
