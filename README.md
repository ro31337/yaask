# Yaask

Make your yaml configurable with interactive configurations!

[![asciicast](https://asciinema.org/a/jbcOHi5hLfHHhYK1wR8wBleSN.png)](https://asciinema.org/a/jbcOHi5hLfHHhYK1wR8wBleSN)

## Requirements

* Node.js 4.2+
* npm

## Install

```
npm install yaask -g
```

## Usage

```
yaask settings-sample.yml -o settings.yml
```

Before:

```yaml
# Your yaml file goes here
# These parameters will remain the same:
foo: 1
bar: 2

# Here we ask for the value:
name: # @ask "Your name?"

# The same as above, but with default value:
city: # @ask "City you're from?" (default San Francisco)

# You can select one of the options:
coffee: # @ask "Do you want some coffee?" yes|no

# As many options as you want:
appointment_time: # @ask "Select appointment time" 9am | 11am | 1pm | 3pm | 5pm

# With explanation for each option:
cloud_provider: # @ask "Your cloud provider?" aws (Amazon AWS) | azure (Microsoft Azure) | gloud (Google Cloud)

# Or for some of them:
log_type: # @ask "Select log type" error | warn | info | verbose | none (I don't need any logging)
```

After:

```yaml
# Your yaml file goes here
# These parameters will remain the same:
foo: 1
bar: 2

# Here we ask for the value:
name: Roman # @ask "Your name?"

# The same as above, but with default value:
city: San Francisco # @ask "City you're from?" (default San Francisco)

# You can select one of the options:
coffee: no # @ask "Do you want some coffee?" yes|no

# As many options as you want:
appointment_time: 3pm # @ask "Select appointment time" 9am | 11am | 1pm | 3pm | 5pm

# With explanation for each option:
cloud_provider: azure # @ask "Your cloud provider?" aws (Amazon AWS) | azure (Microsoft Azure) | gloud (Google Cloud)

# Or for some of them:
log_type: none # @ask "Select log type" error | warn | info | verbose | none (I don't need any logging)
```

## Why?

I use it to make my Docker containers configurable.

## License

MIT
