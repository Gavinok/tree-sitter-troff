all: parser test
parser: grammar.js
	tree-sitter generate
test: parser
	tree-sitter test
