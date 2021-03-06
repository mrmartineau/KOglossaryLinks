# KOglossaryLinks jQuery plugin

This is a jQuery plugin that shows glossary-style tooltips when hovered (or tapped on touchscreen devices). You provide a json feed and add data attributes to any HTML element and it will do the rest.

The plugin handles different screen dimensions with ease; it repositions the tooltip horizintally so that it can keep it in view. It does not reposition the tooltip vertically if there is not enough vertical height.

A slightly older version of this plugin was used on http://www.goenergyshopping.co.uk/en-gb/why-shop

## Getting the Library
### Direct downloads
- [Minified](https://raw.githubusercontent.com/mrmartineau/KOglossaryLinks/master/dist/jquery-KOglossaryLinks.min.js) (1.31 kB gzipped)
- [Unminified](https://raw.githubusercontent.com/mrmartineau/KOglossaryLinks/master/dist/jquery-KOglossaryLinks.js) (5.15 kB gzipped)

### Bower
`bower install KOglossaryLinks`

### NPM
`npm install koglossarylinks --save`

## Usage
Include **KOglossaryLinks** in your JavaScript bundle or add it to your HTML page like this:

```html
<script type='application/javascript' src='/path/to/KOglossaryLinks.js'></script>
```

### Example HTML usage:
```html
<a href="" data-koglossarylink='Glossary term'>Glossary term</a>
```

### Example JS usage:

```js
	$(document.body).KOglossaryLinks({
		sourceURL    : 'glossary.json',
		tooltipwidth : 260,
		debug        : true
	});
```

## Default options:

```
sourceURL    : ''               [string]  - URL of the JSON file with format {"term": "", "description": ""}
tooltipwidth : 260,             [integer] - Width of tooltip. This should correspond to the CSS you are using for the tooltip
debug        : false            [boolean] - Show debug messages in the console
```

## JSON feed
The json feed should look like this:

```json
[
	{
		"term": "Glossary Term 1",
		"description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit."
	},
	{
		"term": "Glossary Term 2",
		"description": "Non nemo totam a voluptatibus modi sunt earum."
	}
]
```

### CSS Styling
As well as the bundled CSS there is a `.scss` file included which can be edited. If you use Sass, include it in your build and modify the styles.

## Demo
View a demo at http://codepen.io/mrmartineau/pen/KweMqr
