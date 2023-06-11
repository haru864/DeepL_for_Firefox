# DeepL For Firefox
This is an extension available for Mozilla Firefox.  
Subscription to the free plan of DeepL API is required for use.  
You will use an authentication key that you can obtain from your DeepL account.

## How to install
Prepare an appropriate directory and place the following directory/files in it.
- background/
- content/
- icons/
- popup/
- sidebar/
- manifest.json

After deployment, load manifest.json into Firefox by following the steps described in the URL below.  
 - https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension#installing

## How to use
First, display the sidebar and select the source and target languages.
- source language 
  - The language of the text you want to translate
- target language 
  - Translated into the language selected here

Second, click on the icon from the toolbar button to toggle on/off and set the authentication key.  
The authentication key should be the one provided in the DeepL API Free plan.  

Then, drag the mouse over the sentence you want to translate and right-click and select "DeepL" and "translate selection".  
Translation results are displayed in the sidebar.
