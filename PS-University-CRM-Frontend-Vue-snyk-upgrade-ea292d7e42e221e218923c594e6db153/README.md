# university_crm

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

# Padding and Margin Utility Classes

This CSS file contains utility classes for easily managing padding and margin in your web projects. It offers fixed classes for specific padding and margin values, as well as responsive classes for various screen breakpoints.

## Usage

### Padding Classes:

#### Fixed Padding Values:

- `.pp-1` to `.pp-5`: Set fixed padding values from small to large.

##### Example:
```html
<!-- Apply fixed padding of 0.25rem -->
<div class="pp-1">
  Your content here
</div>
```

Absolutely, here's the markdown content with the examples and usage for the padding and margin utility classes in raw markdown format:

markdown
Copy code
# Padding and Margin Utility Classes

This CSS file contains utility classes for easily managing padding and margin in your web projects. It offers fixed classes for specific padding and margin values, as well as responsive classes for various screen breakpoints.

## Usage

### Padding Classes:

#### Fixed Padding Values:

- `.pp-1` to `.pp-5`: Set fixed padding values from small to large.

##### Example:
```html
<!-- Apply fixed padding of 0.25rem -->
<div class="pp-1">
  Your content here
</div>
```

### Custom Padding Value:
.pp: Use a custom padding value with inline styles.

##### Example:
```html
<!-- Apply custom padding of 2rem -->
<div class="pp" style="--pp: 2rem;">
  Your content here
</div>
```

### Responsive Padding Classes:
Small Screens (576px and above): .sm\:pp
Medium Screens (768px and above): .md\:pp
Large Screens (992px and above): .lg\:pp
Extra-Large Screens (1200px and above): .xl\:pp

##### Example (Responsive Usage):

```html
<!-- Responsive padding for large screens -->
<div class="lg:pp" style="--lg-pp: 3rem;">
  Your content here
</div>

```

### Margin Classes:
#### Fixed Padding Values:

- `.mm-1` to `.mm-5`: Set fixed padding values from small to large.

##### Example:
```html
<!-- Apply fixed margin of 1rem -->
<div class="mm-3">
  Your content here
</div>
```

### Custom Margin Value:
.mm: Use a custom margin value with inline styles.
Example:
```html
<!-- Apply custom margin of 4rem -->
<div class="mm" style="--mm: 4rem;">
  Your content here
</div>

```

#### Responsive Margin Classes:
Small Screens (576px and above): .sm\:mm
Medium Screens (768px and above): .md\:mm
Large Screens (992px and above): .lg\:mm
Extra-Large Screens (1200px and above): .xl\:mm

Example (Responsive Usage):

```html
<!-- Responsive margin for medium screens -->
<div class="md:mm" style="--md-mm: 2rem;">
  Your content here
</div>

```