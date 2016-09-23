# dtla-dash-food
Yums along the Downtown DASH


## Config

These config settings were defined to make Jekyll work with GitHub Pages and TravisCI.

### .travis.yml

```
# Define Ruby version because Travis defaults to 1.9
language: ruby
rvm:
  - 2.2.2

# No error, but faster builds with caching
cache: bundler

# Modify permisions on script file
before_install:
 - chmod +x ciscript/cibuild

# Use custom build script file
script: ciscript/cibuild
```

### Gemfile

```
ruby '>=2.2.2'

gem "jekyll", "3.2.1"
gem "minima"

# Include rake for TravisCI build
gem 'rake'
# html-proofer used by the TravisCI build script
gem 'html-proofer'
```

### _config.yml

```
# avoids some errors I think
exclude:
  - ciscript
  - vendor/bundle
```

### ciscript/cibuild

```
# Pulled from the GitHub Universe TravisCI workshop repo (renamed jekyll destination folder to _site).
#!/bin/bash

# exit script if any command fails
set -e

bundle install
bundle exec jekyll build
bundle exec htmlproofer ./_site
```
