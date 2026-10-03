# Modern Calculator

A clean, responsive calculator built with plain HTML, CSS and JavaScript. No frameworks, no build step and no dependencies.

## Features

- Addition, subtraction, multiplication and division
- Percentage (%), sign toggle (±), decimal point, backspace (⌫) and clear (AC)
- Expression line above the result (for example `12 × 4 =`)
- Highlight on the currently selected operator
- Divide-by-zero handling with a clear error message
- Full keyboard support
- Automatic light and dark theme based on the device setting
- Responsive layout for desktop and mobile
- Accessible: button labels, visible focus outlines, reduced-motion support

## Project Structure

```
calculator/
├── index.html   # Page structure and calculator keys
├── style.css    # Layout, theme colors and animations
└── script.js    # Calculator logic and keyboard handling
```

## How to Run

1. Keep all three files in the same folder.
2. Open `index.html` in any modern browser.

No installation or server is required.

## Keyboard Shortcuts

| Key | Action |
|---|---|
| `0-9` | Enter digits |
| `.` | Decimal point |
| `+ - * /` | Operators |
| `Enter` or `=` | Calculate result |
| `Backspace` | Delete last digit |
| `Esc` or `Delete` | Clear all |
| `%` | Percentage |

## How It Works

The logic in `script.js` keeps a small state and calculates step by step. It does not use `eval()`.

| Variable | Purpose |
|---|---|
| `cur` | Number currently being typed or shown |
| `prev` | First number, stored when an operator is pressed |
| `op` | Pending operator (`+`, `-`, `*`, `/`) |
| `fresh` | Whether the next digit should start a new number |
| `err` | Error message, such as divide by zero |

Flow: type a number, press an operator (the number is stored in `prev`), type the second number, then press `=`. Chained operations such as `2 + 3 × 4` are evaluated left to right as each operator is pressed, like a standard pocket calculator. Results are rounded to 12 significant digits to avoid floating-point noise such as `0.1 + 0.2 = 0.30000000000000004`.

## Customization

- **Colors and themes:** edit the CSS variables at the top of `style.css` (`--eq` for the equals key, `--op` for operators, and so on). The dark theme variables are in the `prefers-color-scheme: dark` block.
- **Font:** the page loads Manrope from Google Fonts and falls back to the system font if it is unavailable.
- **Digit limit:** the input limit of 12 digits is set in the `digit()` function in `script.js`.

## Deployment

This is a static site. Upload the folder to Netlify Drop, GitHub Pages or Vercel. Make sure `index.html` is at the top level of the uploaded folder.

## Browser Support

Works in current versions of Chrome, Edge, Firefox and Safari.

## Known Limitations and Future Ideas

- Evaluates left to right and does not apply operator precedence on its own
- No calculation history yet
- Possible additions: history panel, scientific functions, theme toggle button, copy-to-clipboard for the result

## Author

Anup Das
