JS_BIN := node_modules/.bin

src        ?= src
out        ?= dist
static_out ?= $(out)/public

NOTIFY          := ./lib/notify
COPY_AND_NOTIFY := ./lib/copy-and-notify

.PHONY: all clean test
all: dist

.PHONY: dist

#
# JavaScript

html_src  := $(shell find $(src)/client -name '*.html')
js_src    := $(shell find $(src)/client -name '*.js')
js_entry  := $(src)/client/app.js
js_bundle := $(static_out)/app.js

$(js_bundle): $(js_src) $(html_src)
	@echo "\033[0;90mCompiling \033[0;34m$@\033[0m"
	@mkdir -p $(@D)
	@-$(JS_BIN)/jscs $?
	@-$(JS_BIN)/jshint $? \
		--reporter node_modules/jshint-stylish/stylish.js
	@$(JS_BIN)/browserify \
		--debug \
		--entry $(js_entry) \
		--transform 'babelify' \
		--transform 'ractivate' \
		--outfile $@
	@$(NOTIFY) $(@F) ||:

#
# CSS

styles_src    := $(shell find $(src)/client -name '*.scss')
styles_entry  := $(src)/client/styles.scss
styles_bundle := $(static_out)/styles.css

$(styles_bundle): $(styles_src)
	@echo "\033[0;90mCompiling \033[0;34m$@\033[0m"
	@mkdir -p $(@D)
	@$(JS_BIN)/node-sass \
		--source-map-embed \
		$(styles_entry) \
		$@
	@$(NOTIFY) $(@F) ||:

#
# Static assets

assets := $(static_out)/index.html
assets += $(patsubst $(src)/assets/images/%,\
					$(static_out)/images/%,\
					$(shell find $(src)/assets/images -name '*.png'))

$(static_out)/%: $(src)/assets/%
	@mkdir -p $(@D)
	cp $< $@
	@$(NOTIFY) $(@F) ||:

#
# Server

server := $(out)/Procfile
server += $(out)/package.json
server += $(patsubst $(src)/server/%,\
					$(out)/%,\
					$(shell find $(src)/server -name '*.js'))

$(out)/%: $(src)/server/%
	@mkdir -p $(@D)
	cp $< $@

$(out)/package.json: package.json
	@mkdir -p $(@D)
	cp $< $@

dist: \
	$(js_bundle) \
	$(styles_bundle) \
	$(assets) \
	$(server)

test:
	karma start

clean:
	@rm -rf $(out)
	@rm -rf $(static_out)
	@echo "Cleaned"
