# Mining Cart Tunnels

This repository is a playground of browser-based sketches that simulate racing through an underground tunnel. Every file is a self‑contained HTML (or JS) experiment that you can open directly in a modern desktop browser—no build step required.

## Project Structure

| File | Description |
| --- | --- |
| `miningCart1.html`, `miningCart2.html`, `miningCart3.html` | Early static experiments that render the tunnel with different lighting / perspective tricks. |
| `asciiMiningCart.html` & `ascii-tunnel.js` | Draws the tunnel using ASCII characters inside a `<pre>` tag for a retro terminal aesthetic. |
| `editableMiningCart.html` | Canvas animation plus a live code editor. Edit the JS on the right-hand side and the tunnel re-renders instantly. Includes the full scenery (walls, supports, lights, etc.). |
| `editableTracksOnlyMiningCart.html` | A simplified variant that just renders the rails and basic cave shell—useful for smaller demos or quickly iterating on track math. |
| `editableTracksSVGMiningCart.html` | Same live-editing workflow as above but renders with SVG elements instead of Canvas, making it easier to inspect shapes in DevTools. |

## Getting Started

1. Clone or download the repo.
2. Open any of the `.html` files directly in Chrome, Edge, or Firefox. Because everything runs client-side, you do **not** need Node, npm, or a dev server.
3. For the editable variants (`editable*.html`):
   - The left pane is the animation.
   - The right pane is an editable `<textarea>` containing the JavaScript that powers the scene.
   - When you stop typing for a moment, the code is re-evaluated automatically (wrapped in an IIFE for isolation) and the animation restarts.

> Tip: If the animation gets heavy, you can reduce `HORIZON_STEPS` or `CART_SPEED` in the editable files to lower the workload.

## Customizing the Scene

Common parameters you can tweak inside the editable files:

- `CURVE_RANGE`, `MAX_SLOPE`, and easing multipliers – control how aggressively the cart weaves and climbs.
- `CAVE_SLICES`, `CAVE_RADIUS_X/Y`, `CAVE_JITTER` – define the density and roughness of the tunnel shell.
- `TRACK_SPACING`, `TIE_STEP` – change the look of the rails.
- `CART_SPEED`, `MIN_FORWARD_SPEED`, `MAX_FORWARD_SPEED` – adjust the apparent velocity.

Because the code is plain JavaScript, you can also add:

- UI overlays (FPS counters, parameter sliders, etc.).
- Keyboard controls for the camera.
- Export hooks that capture frames or dump the procedurally generated segment data.

## ASCII Variant

`asciiMiningCart.html` uses `ascii-tunnel.js` to draw the tunnel inside `<pre>` text. It relies on simple perspective math plus Unicode block characters. Open the HTML file, and the JavaScript will automatically load and animate. This variant is perfect for terminals or low-powered devices because it avoids Canvas entirely.

## SVG Variant

`editableTracksSVGMiningCart.html` replaces the Canvas drawing calls with SVG `<rect>` elements. This makes it easy to debug shapes using browser dev tools (each sleeper/rail is an element in the DOM). It also demonstrates how the same track-generation logic can target different renderers.

## License

No explicit license is provided, so treat this as personal demo code unless the author specifies otherwise. If you adapt it for your own projects, a nod back to the original repository is appreciated.

---

Have fun bending the tunnel and feel free to experiment—every HTML file is isolated, so you can’t break anything you can’t undo by refreshing the page. If you invent a cool variation (e.g., new lighting model, different art style), share it! There are plenty of directions to extend this into a full mini-game or interactive art piece.
