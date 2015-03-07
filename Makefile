JS_BIN := node_modules/.bin

src        ?= src
out        ?= dist
static_out ?= $(out)/public

NOTIFY   := ./lib/notify
POST_CSS := ./lib/post-css.js

.PHONY: all clean dist test
all: dist

#
# JavaScript

js_src    := $(shell find $(src)/client -name '*.js*')
js_entry  := $(src)/client/app.js
js_bundle := $(static_out)/app.js

browserify_options := \
	--entry $(js_entry) \
	--transform 'reactify' \
	--transform 'babelify' \
	--outfile $(js_bundle)


$(js_bundle): $(js_src)
	@echo "\033[0;90mCompiling \033[0;34m$@\033[0m"
	@mkdir -p $(@D)
	@$(JS_BIN)/browserify $(browserify_options)
	@$(NOTIFY) $(@F) ||:

.PHONY: watch_js
watch_js:
	@echo "\033[0;90mStarting Watchify\033[0m"
	@mkdir -p $(@D)
	@$(JS_BIN)/watchify $(browserify_options) --verbose

#
# CSS

styles_src    := $(shell find $(src)/client/styles -name '*.css')
styles_entry  := $(src)/client/styles/main.css
styles_bundle := $(static_out)/main.css

$(styles_bundle): $(styles_src)
	@echo "\033[0;90mCompiling \033[0;34m$@\033[0m"
	@mkdir -p $(@D)
	@$(POST_CSS) $(styles_entry) $(styles_bundle)
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
