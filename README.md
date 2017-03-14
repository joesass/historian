# Historian

Your browsing history is complicated and using the history features that
come built in with your browser doesn't always give you what you want.

What if you wanted to visualize the sites that you visit the most and see how much time you spent there, or what sites you visit first thing in the morning, or find that thing that you saw on someone's facebook feed about walruses but have no idea where to start searching for.

Well, how about a personal historian, someone who can guide you through your browsing history and maybe even resurfacing things that you might have missed or suggesting things that you would like to see in the future?

I will be working on this project solo and using this README as a kind of running log and commentary about my thought processes and goals and stuff. If someone stumbles along this project and thinks they can make a contribution, please send pull requests or reach out to me to suggest new features.

I assume this README will get updated every time I push the repo, eventually I will find another place for these notes. But for now I want to put it in front of my face.

Initial Features and Goals:

- Chrome Extension / Web App / Cross-Platform App for Chrome / PWA
- Research if a web page has access to chrome's history api besides for extensions
- How does history work? Does it go by logged in Google User? Or just by the actual browser itself?
- What useful information would we like to appear to the user
  - top visited sites
  - most time spent
  - categories of videos, interactive, text, etc.
  - detect topics of interest and return stats for that
- How will data be stored? Will we send all history info to a server when a user authorizes/installs or visits page
- What is the MVP of this being useful to someone?
- How will we handle the authorization/permissions?
- How often will I contribute to this project?
- What technologies/libraries should be used?

3/13

- Create the skeleton from scratch
- add whatever I need after
- Determine the mvp or basics of what the extension will do
- for now it will retrieve the history of the previous day/week/year and display the top visited site
- Try to write the js in react, it shouldn't be that much different than writing a regular web app that I've done before

Following the [thoughtbot tutorial](https://robots.thoughtbot.com/how-to-make-a-chrome-extension)
- manifest.json is the only basic requirement and then a webpage that is loaded from that file
- adding a js script to the file is simple, just add it to the manifest file with the key `"content scripts"` which can define a key of matches which will inject the script into all pages that match the value in my case i want to inject the script on `"<all urls>"`, maybe in the future I want to match a certain url that pertains to the history of the browser.
- The content script is only able to access the DOM and not the apis that we really want to work with, so we need to send a message to the higher level extension to get certain information
- For example if the user clicks on the browser action, our content script will not know about it because it is not really happening on our page, it's happening in the browser on a higher level
- Message passing allows our content script to communicate with the rest of the extension
- we can send a message from the extension to the content script by calling `chrome.tabs.sendMessage` from a background script that we define in the `manifest.json`
- we can add a listener by calling `chrome.runtime.onMessage.addListener` and we can then define a callback which will fire when one page receives the message from the other

Following the [smashing magazine tutorial](https://www.smashingmagazine.com/2014/11/creating-save-later-chrome-extension-modern-web-tools/):

- Using Yeoman to generate the chrome extension scaffold
- `npm install -g yo`
- `npm install -g generator-chrome-extension`
- run `yo chrome-extension` and select browser action and content scripts
- add dependencies to bower file and change the scripts directory in the `manifest.json` to scripts.babel
