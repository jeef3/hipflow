JS_BIN          := node_modules/.bin

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
all: test dist

.PHONY: dist
dist: $(js_bundle) $(styles_bundle) $(out)/index.html

$(js_bundle): $(js_src)
	@echo "Compiling $@"
	@mkdir -p $(@D)
	@$(JS_BIN)/jshint $? \
		--reporter node_modules/jshint-stylish/stylish.js
	@$(JS_BIN)/jscs $?
	@$(JS_BIN)/browserify \
		--entry $(js_entry) \
		--debug \
    --transform 'babelify' \
		--transform 'ractivate' \
		--exclude 'ractive' \
		--outfile $@
	@$(NOTIFY) $(@F) ||:

$(styles_bundle): $(styles_src)
	@echo "Compiling $@"
	@mkdir -p $(@D)
	@$(JS_BIN)/stylus \
		--sourcemap \
		--out $(out) \
		$(styles_entry)
	@$(NOTIFY) $(@F) ||:

$(out)/index.html: $(src)/index.html
	@echo "Copying $(@F)"
	@cp $? $@

test:
	# karma start

clean:
	@rm -rf $(out)
	@rm -rf $(tmp)
	@echo "Cleaned"
