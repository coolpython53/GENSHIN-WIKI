### Syntax
#### Markdown
This wiki uses markdown for most of its formatting. You can view [a guide to using markdown](https://www.markdownguide.org/basic-syntax/)
#### Custom Syntax
This wiki also has some custom syntax. Here is the custom syntax we have:
##### image:\:
The image:\: syntax is used for inserting images. To use this, the image should be in the same directory as the page.md or folder.md
Also, you can use image:\:URL_HERE:::50,50 (height and width)
or
image:\:URL_HERE::::50 (50% of max size)
Please use the raw github url. We have a converter [here](https://coolpython53.github.io/GitHub-to-Pages/).
###### Example usage:
image::https://raw.githubusercontent.com/coolpython53/GENSHIN-WIKI/main/pages/Usage/Syntax/example.jpg
##### mp3:\:
The mp3:\: syntax is used for inserting mp3 files into a page. Please only use the file format .mp3 for this. If you have a .ogg file, we have a converter [here](https://coolpython53.github.io/OGG-to-MP3/).
###### Example:
mp3::https://raw.githubusercontent.com/coolpython53/GENSHIN-WIKI/main/pages/Usage/Syntax/Hello.mp3
##### Page linking
For page linking, use the syntax {[YOUR_TEXT_HERE]page:\:LINK_PAGE_HERE\}
During page linking, ensure that if you are linking to a page, you include page.md (For this page it would be GENSHIN-WIKI/pages/Usage/Syntax/page.md)
###### Example:
{[This will link to the Usage folder.]page::GENSHIN-WIKI/pages/Usage/folder.md}
