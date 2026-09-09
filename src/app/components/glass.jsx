/**
 * The two decorative layers every pane of dock glass carries: the lens that
 * tints and grades it, and the catch light across its top face. Neither is
 * information, so both are out of the accessibility tree.
 *
 * A component rather than five copies of the same two spans - the wordmark,
 * the résumé circle and the contact pill in Nav, the site index, the section
 * index - because a pane that grows a third layer has to grow it everywhere,
 * and glass that merely resembles the glass beside it drifts the first time
 * either is touched. It renders a fragment, so each pane keeps its own
 * element and its own modifier classes; see `.dock-glass` in globals.css.
 */
export function GlassSheen() {
  return (
    <>
      <span className="dock-glass__lens" aria-hidden="true" />
      <span className="dock-glass__light" aria-hidden="true" />
    </>
  );
}
