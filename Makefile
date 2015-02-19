JS_BIN := node_modules/.bin

src        ?= src
out        ?= dist
static_out ?= $(out)/public

NOTIFY := ./lib/notify

.PHONY: all clean test
all: dist

.PHONY: dist

#
# JavaScript

js_src    := $(shell find $(src)/client -name '*.js')
js_entry  := $(src)/client/app.js
js_bundle := $(static_out)/app.js

$(js_bundle): $(js_src)
	@echo "Compiling $@"
	@mkdir -p $(@D)
	@$(JS_BIN)/jshint $? \
		--reporter node_modules/jshint-stylish/stylish.js
	@$(JS_BIN)/jscs $?
	@$(JS_BIN)/browserify \
		--debug \
		--entry $(js_entry) \
    --transform 'babelify' \
		--transform 'ractivate' \
		--exclude 'ractive' \
		--outfile $@
	@$(NOTIFY) $(@F) ||:

#
# CSS

styles_src    := $(shell find $(src)/client -name '*.scss')
styles_entry  := $(src)/client/styles.scss
styles_bundle := $(static_out)/styles.css

$(styles_bundle): $(styles_src)
	@echo "Compiling $@"
	@mkdir -p $(@D)
	@$(JS_BIN)/node-sass \
		--source-map-embed \
		$(styles_entry) \
    $@
	@$(NOTIFY) $(@F) ||:

#
# Static

.PHONY: assets
assets:
	@echo "Copying assets"
	@mkdir -p $(static_out)
	@rsync \
		-rupE \
		--verbose \
		--exclude '.DS_Store' \
		$(src)/assets/ $(static_out)

#
# Server

.PHONY: server
server:
	@echo "Copying server"
	@mkdir -p $(out)
	@rsync \
		-rupEh \
		--verbose \
		--exclude '.DS_Store' \
		--exclude 'client' \
		--exclude 'assets' \
		$(src)/ $(out)

$(out)/package.json: package.json
	@echo "Copying $@"
	@cp package.json $@
	@npm install --production

dist: \
	$(js_bundle) \
	$(styles_bundle) \
	assets \
	server \
	$(out)/package.json

test:
	karma start

clean:
	@rm -rf $(out)
	@rm -rf $(static_out)
	@echo "Cleaned"
