Remote programming in Amber from Pharo
========================

Tools for amber, that provide remote access from Pharo to Amber. User can evaluate expressions and view result with AmberRemoteWorkspace, inspect Amber objects with AmberRemoteInspector and view Amber packages and classes with AmberRemoteBrowser 

Running this project
====================

1. Download this project
2. Download amber 0.12.3 and save it somewhere
3. Follow instructions from amber-lang.net Wiki (getting depencies and so on...)
4. Go to "this project"/client folder
5. Create symbolic link to amber directory, name it, for example, "vendor" (this name is on .gitignore file)
6. Run file server using 'vendor/bin/amber serve' command (like in instructions on amber wiki)
7. Run server image with Pharo.
8. Open your browser and go to 'localhost:4000/index.html'
9. If all will be alright, browser said you that connection was made successfuly.
10. Check screencast to learn more: http://www.youtube.com/watch?v=MuGDWG0bF7I

If you ave suggestions or want to help improove this project - please let me know: hubbatov@mail.ru
Good luck!
