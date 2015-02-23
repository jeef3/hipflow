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

js_src    := $(shell find $(src)/client -name '*.js')
js_entry  := $(src)/client/app.js
js_bundle := $(static_out)/app.js

$(js_bundle): $(js_src)
	@echo "\033[0;90mCompiling \033[0;34m$@\033[0m"
	@mkdir -p $(@D)
	@$(JS_BIN)/jshint $? \
		--reporter node_modules/jshint-stylish/stylish.js
	@$(JS_BIN)/jscs $?
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
assets += $(patsubst $(src)/assets/images/%.png,$(static_out)/images/%.png,$(wildcard $(src)/assets/images/*.png))
assets += $(patsubst $(src)/assets/images/jira/%.png,$(static_out)/images/jira/%.png,$(wildcard $(src)/assets/images/jira/*.png))
assets += $(patsubst $(src)/assets/images/github/%.png,$(static_out)/images/github/%.png,$(wildcard $(src)/assets/images/github/*.png))
assets += $(patsubst $(src)/assets/images/trello/%.png,$(static_out)/images/trello/%.png,$(wildcard $(src)/assets/images/trello/*.png))
assets += $(patsubst $(src)/assets/images/emojis/%.png,$(static_out)/images/emojis/%.png,$(wildcard $(src)/assets/images/emojis/*.png))

$(static_out)/%: $(src)/assets/%
	@mkdir -p $(@D)
	cp $< $@
	@$(NOTIFY) $(@F) ||:

$(static_out)/index.html: $(src)/assets/index.html
	@mkdir -p $(@D)
	cp $< $@
	@$(NOTIFY) $(@F) ||:

#
# Server

.PHONY: server
server:
	@echo "\033[0;90mCopying server\033[0m"
	@mkdir -p $(out)
	@rsync \
		-rupEh \
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
	$(assets) \
	server

test:
	karma start

clean:
	@rm -rf $(out)
	@rm -rf $(static_out)
	@echo "Cleaned"
