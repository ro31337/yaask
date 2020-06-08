# Yaask

Make your yaml configurable with interactive configurations!

# Requirements

* Node.js 4.2+
* npm

# Install

```
npm install yaask -g
```

# Usage

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

# Formats

There are few formats that can be used after `@ask` keyword.

## Simple

With simple format you'll just ask for input:

```
"How many cups of coffee do you want?"
```

Without quotes:

```
How many cups of coffee do you want?
```

With colon:

```
How many cups of coffee do you want:
```

Yaml file example:

```yaml
cups: # @ask How many cups of coffee do you want?
```

## Default

Default format allows to specify default value:

```
"City you're from?" (default San Francisco)
```

Without quotes:

```
City you're from? (default San Francisco)
```

With colon:

```
City you're from : (default San Francisco)
```

Without anything:

```
City you're from (default San Francisco)
```

Yaml file example (will override value if already specified):

```yaml
city: # @ask City you're from? (default San Francisco)
```

## List

List format allows to specify the list of options:

```
"Do you want some coffee?" yes|no
```

With some spacing:

```
"Do you want some coffee?" yes | no
```

With description (description is visible to the user, but value will be used):

```
"Do you want some coffee?" yes (Yes, please) | no (No, thank you)
```

With optional description:

```
"Do you want some coffee?" yes (Yes, please) | no
```

Without quotes:

```
Do you want some coffee? yes | no
```

Without question mark:

```
Cup size : small | medium | large
```

Yaml file example:

```yaml
coffee: # @ask Do you want some coffee? yes (Yes, please) | no (No, thank you)
cup_size: # @ask Cup size : small | medium | large
```

# Why?

I use it to make my Docker containers configurable.

# License

MIT
