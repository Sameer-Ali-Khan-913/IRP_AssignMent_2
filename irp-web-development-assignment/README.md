# IRP Web Development Assignment

Part A: responsive IRP LMS Home Page (HTML5 + CSS3). Part B: JavaScript Bank Account Simulator.

## Structure
```
part-a-responsive-ui/  index.html, style.css
part-b-javascript/     bank.js
README.md
```

## Part A: run and test
1. Open `part-a-responsive-ui/index.html` in Google Chrome (no build step needed).
2. Scroll the page: the navbar stays fixed at the top (`position: sticky; top: 0; z-index: 1000`).
3. Press F12, toggle the Device Toolbar and check:
   - 1200px+: nav links visible, 2-column hero, 5-column step cards.
   - 769-1023px: 3-column step cards.
   - 375px / 390px: nav links hidden, logo + Sign In only, stacked hero, 1-column cards, no horizontal scroll.

## Part B: run
Requires Node.js.
```
node part-b-javascript/bank.js
```
Part 1 runs `parseAmount` on 7 test inputs. Part 2 shows const/let, the hoisting demo, and the `var` vs `let` loop bug.
