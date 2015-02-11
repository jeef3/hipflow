JS_BIN            := node_modules/.bin/

# Directories
out ?= dist
tmp ?= .tmp
src ?= src
#
# JavaScript
js_src          := $(shell find $(src) -name '*.js')
js_entry        := $(src)/app.js
js_bundle       := $(out)/app.js

# CSS
styles_src      := $(shell find $(src) -name '*.styl')
styles_entry    := $(src)/styles.styl
styles_bundle   := $(out)/styles.css

NOTIFY          := ./lib/notify

.PHONY: all clean test
all: dist vendor

.PHONY: dist
dist: $(js_bundle) $(styles_bundle)

$(js_bundle): $(js_src)
	@echo "Compiling $@"
	@mkdir -p $(@D)
	@jshint $? \
		--reporter node_modules/jshint-stylish/stylish.js
	@jscs $?
	@browserify \
		$(js_entry) \
		--debug \
		--transform 'ractivate' \
		--exclude 'ractive' \
		--outfile $@
	@$(NOTIFY) $(@F) ||:

$(styles_bundle): $(styles_src)
	@echo "Compiling $@"
	@mkdir -p $(@D)
	@stylus \
		--use jeet \
		--sourcemap \
		--out $(out) \
		$(styles_entry)
	@$(NOTIFY) $(@F) ||:
