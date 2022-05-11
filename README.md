# JSWM

[My post on this project](https://jakubkarabula.github.io/mysite/jswm.html)

## Intro

In my day to day job I am working a web developer. In most companies in Berlin that means working on a Mac. Which is not too bad, a lot of the terminal tools are available for macOS as well which is great. What is less great is that it's not so easy to replace window manager on the newer versions of macOS, but I don't want to say good bye to keyboard driven tiling window managers like i3 and bspwm. There are two main options that I have tried:

To install for example bspwm one needs XQuartz, it's possible to set it up but then it works only with X11 apps, not native mac ones. I also could not get X11 apps to render properly on retina screens

[reddit thread on installing bspwm](https://www.reddit.com/r/unixporn/comments/2jkf9z/osx_bspwm_i_cant_get_over_this_integration/clcjjfv/)

An alternative is to use apps that run alongside standard macOS window manager, things like Amethyst and Yabai. They modify the position and size of the windows, but they don't replace the management so it can be clunky and slow sometimes. I can however recommend Yabai as an ok option for daily use.

[amethyst](https://ianyh.com/amethyst/)
[yabai](https://github.com/koekeishiya/yabai)

## This project

I have another idea. It's a bit cursed but it's quite pleasant to work with so far. I spent most of my time working with Firefox, terminal and nvim/vscode, sometimes I need to also take a look at images. And i like keyboard driven flows, tiling window management etc. What if I would be able to have terminal, file management, image viewing etc inside Firefox, just as another tab? This is what I called JSWM, Javascript based window manager that is basically a web app with simple implementations of window management, key bindings and apps like terminal (with ttyd) and image viewing. Most of other things like editing and file browsing I can do via the terminal.

## Screenshots

![screenshot](shot.png)
![screenshot 2](shot2.png)
