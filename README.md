# Hugo Shortcode Syntax Highlighting  

## Features  
Hugo Shortcodes can get complicated when there's more than one or two parameters.  
This extension add some syntax highlighting for Shortcodes, making visual identification of individual pieces easier.  
For example, some shortcodes are below.  


#### Before  
![Original](Hugo_Original.png)

#### After  
![New](Hugo_Demo.png)

## Shortcode suggestions!  
After typing `%`, `<`, `-`, user created Shortcodes are suggested.  
These are from Themes or user created, specifically `**/layouts/shortcodes/*.html`  

![test](Hugo_ShortcodeSuggestion.gif)

## Goto definition support  
You can F12 on your custom shortcodes like `{{% collapsible %}}`

## Notes  
Positional parameters are not really supported. They just get highlighted like the Shortcode name.

## Publishing (cos I always forget)  
- `npm install -g @vscode/vsce` 
- `vcse package`  
- `vcse publish`