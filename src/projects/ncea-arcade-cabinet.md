---
title : NCEA scholarship Project
description: My sumbission to the 2024 NCEA scolarship was to build a game cabinet to advertise the Cashmere high school digitech department
id: ncea-arcade-cabinet
img: src\cabinet.jpeg
date: 2/12/2024
tags: "C#, Hardware, completed"
...

# Hidden Projects to Hallway Arcade

Digital Technology has a weird problem at school.

In textiles, food tech, hard materials, and most of the other technology subjects, the work naturally ends up somewhere physical. You can put a dress on a mannequin, a cake on a table, or a chair in a display cabinet. Digital Technology does not get that luxury. A student can spend weeks making a genuinely impressive game, website, or program, and then it lives in a folder somewhere, never really seen by anyone outside the class.

So for my Year 13 NCEA Scholarship Technology project, I tried to solve that problem in the most obvious way possible: I built an arcade cabinet.

![The completed arcade cabinet](src/projects/ncea-arcade-cabinet/completed-cabinet.png)

The goal was not just to make something that looked cool, although that definitely helped. The goal was to create a physical, interactive way for Cashmere High School to show off student-made digital work, especially games, while also making it easy for the department to keep the content up to date.

## The problem

The Digital Technologies department had no good way to display student work.

That matters for two reasons:

1. Students doing good work were not really being recognised outside the subject.
2. A lot of the school community did not actually know what Digital Technology involved.

One of the teachers mentioned that parents and students would ask questions like, “do you teach typing skills?” which is probably the least exciting possible interpretation of the subject. Meanwhile, students were making games, writing Python programs, building websites, modelling in 3D, and generally doing much more interesting things than typing practice.

The brief became:

> Build a product that displays the work of CHS Digital Technology students, promotes the department within the school, and recognises student excellence.

There were two big constraints:

| Constraint | Why it mattered |
| --- | --- |
| Under $500 | This had to be a realistic school project, not a “buy a commercial arcade machine and call it a day” project. |
| Finished before the Scholarship deadline | No infinite rewrite. No “I’ll just refactor the whole thing again”. It had to be done. |

## Asking the people who would actually use it

Before building anything, I talked to the department staff and surveyed a Year 10 Digital Technology class.

The teachers all had slightly different priorities, but the theme was pretty consistent: it needed to be physical, interactive, eye-catching, and easy to update. The previous attempt had been a TV screen near the Digital Technology office, but the only people who saw it were already Digital Technology students, and updating it required manual slideshow wrangling. Unsurprisingly, it fell out of use.

The Year 10 survey was also useful. Half the class said they would consider having their own work displayed, and most students said they would be interested in seeing what other Digital Technology students had made.

![Survey results: whether students would consider having their work displayed](src/projects/ncea-arcade-cabinet/survey-work-displayed.png)

![Survey results: whether students wanted to see what other Digital Technology students had made](src/projects/ncea-arcade-cabinet/survey-interest.png)

The main reason students were hesitant about displaying their own work was embarrassment. That was a useful reminder that this could not just be a random dumping ground of unfinished projects. If this was going to recognise student work, the work displayed needed to be chosen and presented properly.

## What should it display?

The department creates a fairly chaotic range of digital outcomes. I had to decide what types of work mattered most, because supporting everything perfectly would have turned the project into a forever project.

The main possible outcomes were:

| Outcome type | Priority | Reason |
| --- | ---: | --- |
| GDevelop games | 1 | Easy for juniors to make, visually engaging, and instantly understandable. |
| Godot / Unity games | 2 | More advanced, still highly interactive, and likely to be visually impressive. |
| Python programs | 3 | Technically impressive, but often less immediately eye-catching. |
| Websites | 4 | Interactive and accessible, but less “arcade cabinet” friendly. |
| 3D models | 5 | Good to show, but usually less interactive. |

The obvious answer was games. They are visual, interactive, and they make sense on an arcade cabinet. That does not mean the other work is not valuable, but for promotion, games are just better bait.

That led to the first major technical decision: what platform should the games run on?

| Platform | Pros | Cons |
| --- | --- | --- |
| Web / HTML5 | Easy to access from anywhere. Works well for GDevelop, Godot, Unity, and websites. | Slower, browser dependent, and not ideal for Python programs. |
| Windows `.exe` | Fast, works well on school PCs, and supports the highest-priority game formats. | Less accessible outside the cabinet unless installed or distributed. |
| Mobile | Supported by many engines. | Phones were banned in schools, so this was basically dead on arrival. |

I went with Windows executables. It was the most practical choice for a physical cabinet running on school hardware.

## The software side

The cabinet needed a front-end launcher: something that displayed student games, let users pick one, showed some information about it, and then launched the executable.

I tested a few options for building the Windows app:

| Tool | Good | Bad |
| --- | --- | --- |
| Python + Tkinter | Very quick to prototype. I already knew Python well. | Bigger bundled app size and not the nicest native UI. |
| C++ + WinAPI | Tiny and fast. | Building a full GUI this way would have been self-inflicted pain. |
| C# + WinForms | Fast to develop, good Visual Studio tooling, and very Windows-native. | I did not know C# as well at the start. |
| Tauri | Nice modern web-style UI with Rust backend potential. | More moving parts, and I did not need that complexity. |

I chose C# and WinForms. It was not the flashiest option, but it was absolutely the right one for the timeline. Visual Studio’s GUI tools let me build and iterate quickly, which mattered more than pretending this needed to be some perfect modern framework showcase.

### Version one: technically working, aesthetically tragic

The first version worked. It could display games, open a popup with information, and launch the selected game.

![Version one of the launcher](src/projects/ncea-arcade-cabinet/version-one.png)

The problem was that it looked like something you would find hiding inside Windows 95 Calculator.

Functionally, it proved the idea. A game could be packaged with:

```txt
GameName.zip
├── GameName.exe
├── other game files / assets / dlls
├── info.json
└── cover.png
```

The `info.json` stored metadata about the game and the student who made it. The cover image gave the launcher something visual to display, because a wall of filenames would have been miserable.

### Using S3 as the backend

The next problem was distribution. If new games were added, how would they get onto the cabinet?

I considered S3, FTP, a network drive, and physically moving files around on a USB stick. The USB stick option was technically simple but operationally awful. Every update would require someone to manually touch the machine. That is exactly the kind of maintenance burden that kills school projects.

I ended up using an AWS S3 bucket. A system admin could upload or remove game ZIP files, and the cabinet could sync against the bucket.

| Option | Maintenance | Security | Fit |
| --- | --- | --- | --- |
| AWS S3 | Easy to manage remotely. | Strong permissions through IAM. | Best fit. |
| FTP / SFTP | Possible, but more server management. | Easy to get wrong. | Fine, but not ideal. |
| Network drive | Good inside school. | Depends on school network setup. | Less flexible. |
| USB stick | Simple. | Physically secure. | Painful to maintain. |

The app compared the games on the server with the games on the local machine, downloaded missing or updated ones, and removed old ones.

The important design idea was that the cabinet should not become another thing a teacher has to babysit.

### Version two: making it look like it belonged in an arcade

After stakeholder feedback, I overhauled the UI.

The app moved to a dark theme, used a retro pixel-style font, added a department branding block, and showed game information as an overlay instead of opening a separate awkward popup.

![Version two of the launcher](src/projects/ncea-arcade-cabinet/version-two.png)

This was also where I added a glowing animated logo. The basic idea was very over-engineered, which means I enjoyed it a lot.

Instead of using a pre-rendered GIF, I modified the pixel data of the logo at runtime. Three sine functions controlled the red, green, and blue values over time, producing a smooth RGB-style glow. To keep it fast, I precomputed the non-transparent pixels and updated the image on a separate thread.

Was this strictly necessary? No.

Did it make the UI look much more like something from a retro-modern arcade machine? Yes.

### Version three: making it maintainable

Version three was mostly about fixing the things that would annoy people later.

![Version three of the launcher](src/projects/ncea-arcade-cabinet/version-three.png)

The main changes were:

| Change | Why |
| --- | --- |
| Version-aware syncing | So updated games replaced old local copies automatically. |
| Maximum visible games | The app only displayed the first 10 games cleanly instead of breaking when too many were uploaded. |
| Auto refresh for the cabinet | So the cabinet could update without restarting the app. |
| Server-configurable title and logo | So the department could update branding without rebuilding the app. |
| Better credential handling | So AWS keys were not committed into source code like an idiot. |
| Escape-to-close | Because removing the window title bar also removed the close button. Oops. |

The auto-refresh was only enabled for authorised machines. I used the cabinet Wi-Fi card’s MAC address as an identifier, hashed with SHA-256 and stored in a server-side CSV file. The app hashed the local MAC address and compared it with the list. If it matched, the cabinet refreshed itself every hour.

This is one of those solutions that is not perfect security, because MAC addresses can be spoofed, but it was fit for purpose. The goal was not to defend a nuclear launch system. The goal was to stop every random installed copy from hammering S3 forever.

### The helper app

The whole system depended on game files being packaged correctly. That is a dangerous thing to leave to humans.

So I made a helper app.

![The helper app for packaging games](src/projects/ncea-arcade-cabinet/helper-app.png)

The helper app takes the game folder, cover image, and metadata, validates the fields, creates the `info.json`, renames the cover image, checks that the expected executable exists, and packages everything into the correct ZIP format.

This was not the glamorous part of the project, but it was one of the most important. A good system should make the correct thing easy and the incorrect thing harder.

## The physical side

The physical cabinet had to do a few things at once:

- look like an arcade cabinet
- survive school corridor abuse
- fit through doors
- be movable
- be safe to use
- be repairable
- not cost a fortune

The aesthetic direction was a retro arcade cabinet with some more modern digital styling. I wanted it to be instantly recognisable as something you could play, but not look like the department was stuck in the 1980s.

### Designing the cabinet

The ergonomics mattered more than I expected. The screen and controls had to be comfortable for a wide range of users, and I wanted to avoid awkward neck angles.

![Ergonomic sketch for the cabinet](src/projects/ncea-arcade-cabinet/ergonomic-sketch.png)

![Technical drawing for the cabinet](src/projects/ncea-arcade-cabinet/technical-drawing.png)

The original plan was a single freestanding cabinet. Then the workshop constraint appeared: I could not build anything over about one metre tall in one piece because of storage limitations.

This is the kind of annoying constraint that makes projects better in hindsight.

The solution was to build the cabinet in two halves and screw them together later. Each half was small enough for the workshop, but the final product still had the freestanding cabinet form my stakeholder wanted.

### Materials and joins

I chose plywood for the faces and pine for the internal framing.

| Material | Why I used it |
| --- | --- |
| WBP plywood | Strong, relatively light, cheaper than marine ply, and water-resistant enough for an indoor school environment. |
| Pine | Cheap, easy to work with, light, and good enough for internal framing. |
| Acrylic | Used to protect the screen while still letting it be visible. |

I tested a few joining methods and ended up using a rebate cut into the thicker side pieces, with the thinner front panels sitting into that rebate and being screwed into pine corner blocks.

![Testing a wood joint](src/projects/ncea-arcade-cabinet/test-joint.png)

This gave the cabinet decent strength, used less plastic hardware, and was still repairable. Repairability mattered because this thing was going to live around teenagers, which is basically a durability test with legs.

### The curved front

The curved section below the controls was the fiddliest woodworking part.

I considered laminating, using many smaller pieces, and steam bending. Laminating would have looked great but taken too long. Small pieces would have been easier but would not give the smooth arcade shape I wanted. Steam bending was the best compromise.

![Dry fitting the curved front section](src/projects/ncea-arcade-cabinet/curved-front-dry-fit.png)

It took some trial and error, but the curve gave the cabinet much more of that proper arcade silhouette.

## Electronics and controls

The computer was an old school desktop that I stripped down to the motherboard, power supply, and SSD. Because the cabinet needed to be movable, Ethernet was not a good option, so I salvaged a Wi-Fi card and antenna from an old school laptop that would otherwise have gone to landfill.

That was a nice little sustainability win: free part, less waste, problem solved.

For controls, I used the classic joystick-and-buttons setup.

![Controls installed in the cabinet](src/projects/ncea-arcade-cabinet/controls-installed.png)

The joystick mapped to the arrow keys. The main button mapped to Enter. The other buttons mapped to keys like Space, Q, and E so student games could use them if needed.

An Arduino handled the input mapping and presented the controls to the computer over USB. This also helped with security: users only had access to arcade controls, not a full keyboard and mouse.

For admin access, I added a small service hatch at the back of the cabinet with access to the computer’s ports and power button. It could be physically locked so random students could not just start messing with the machine.

The monitor was an LCD panel provided by the department. I wanted a CRT because it would have looked amazing, but CRTs are heavy, hard to mount, and I did not have one the right size. Sometimes the cool answer is not the right answer.

## Finishing

I tested a few finishes: varnished paint, paint, varnished stain, stain, and plain varnish.

Paint won. Plain varnish clashed with the look, and the varnished options marked too easily with fingerprints. The painted finish gave the richest colour and fit the arcade look best.

![Painting the cabinet](src/projects/ncea-arcade-cabinet/painting-process.png)

After painting, I installed the electronics, attached the two halves, added a roof to stop debris or liquids getting inside, and delivered it to the department.

![The cabinet after the electronics were installed](src/projects/ncea-arcade-cabinet/electronics-installed.png)

## The final result

The cabinet was delivered on the 19th of October, 11 days before the deadline.

The final cost was about **$330**, well under the $500 budget.

| Requirement | Result |
| --- | --- |
| Display student games | Yes, through the C# launcher. |
| Be interactive | Yes, with arcade controls. |
| Be physical and eye-catching | Yes, full arcade cabinet form. |
| Be easy to update | Mostly yes, through S3 syncing and the helper app. |
| Be movable | Yes, built as a freestanding cabinet. |
| Be durable | Plywood, pine framing, acrylic screen protection, lockable service hatch. |
| Stay under budget | Yes, about $330. |
| Meet the deadline | Yes, 11 days early. |

The best sign that it worked was that it attracted attention before it was even finished. People asked about it in the workshop. Students noticed it when I carried it across the courtyard. It did exactly what it was supposed to do: create interest.

That interest is the whole point. The cabinet is not just a box that plays games. It is a physical excuse for people to ask, “what is that?”, and then accidentally learn what Digital Technology students actually make.

## What I would change

There are a few things I would improve if I rebuilt it.

The launcher should probably support a variable number of games instead of being built around a fixed grid. I considered adding this, but it would have required a restructure late in the project, and that was not worth the risk before the deadline.

The cabinet also needs more decoration. My stakeholder wanted more department branding and visual flair, but I am not an artist, and the deadline was getting close. The better solution was to let more artistic students decorate it later, which also gives the department another way to involve students.

I would also probably move away from WinForms if I was building the software again today. It was the right tool for this project at the time because it let me move quickly, but a more modern UI framework would be nicer to maintain long term.

## Final thoughts

This project was a nice mix of everything I enjoy: software, hardware, design, woodworking, electronics, security, and a lot of practical problem solving.

It also reinforced something I think is easy to forget in software projects: sometimes the best interface is not another website. Sometimes the best way to show off digital work is to make something physical, wheel it into a hallway, and let people play with it.

That is exactly what this cabinet was designed to do.

This project and the relevant documentation was awarded a 2024 technology scholarship, an honor only awarded to the top [2.21%](https://www2.nzqa.govt.nz/ncea/understanding-secondary-quals/nz-scholarship/nz-scholarship-results/2024) of technology students nation wide. The full documentation can be found [here](src/projects/ncea-arcade-cabinet/scolarship.docx). Special thanks to Mr Thomson and the CHS digitech department for their support and help with this project.
