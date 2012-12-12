/*!
 * Pretty Format CSS mixin for Chocolat
 * Copyright(c) 2012 Nicholas Penree <nick@penree.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var prettycss = require('PrettyCSS');

/**
 * Hook up menu items.
 */

Hooks.addMenuItem('Actions/CSS/Pretty Format CSS', 'control-shift-l', function() {
  var type = Document.current().rootScope();
  
  if ([ 'css.source', 'plain.text' ].indexOf(type) !== -1) {
    Recipe.run(function(recipe) {
      var sel = (!recipe.selection.length)? new Range(0, recipe.length) : recipe.selection
        , output = ''
        , text = recipe.textInRange(sel);
      
      try {
        output = prettycss.parse(text, { indent: '  ' }).toString(); 
      } catch (e) {
        output = null;
      } finally {
        if (output) {
          recipe.replaceTextInRange(sel, output);
        }
      }
    });
  }
});