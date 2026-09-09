import { Stagger, StaggerItem } from "@/app/components/motion";

/**
 * A section's rows, in one column or two.
 *
 * Both index pages - /experience and /projects - are the same object: a
 * heading, then a run of hairline-separated rows whose text is nowhere near as
 * wide as the page. Splitting that run is the same decision on both, so it is
 * one component rather than two that resemble each other, which is how the
 * docks at the top and bottom of those pages are shared too.
 *
 * Two columns from lg, where half the measure still holds a title and a line
 * of prose without either shredding. Below that the halves stack and the
 * section is one run again - which is why they are two lists rather than a
 * column-flowed grid: stacked, the second simply follows the first, and the
 * DOM order is the reading order at every width, so tabbing and a screen
 * reader never disagree with the layout.
 *
 * The rule between the columns is the second one's left border, with symmetric
 * padding either side so it sits down the middle of the channel rather than
 * against one column. It runs the section's full height even where the right
 * column is a row shorter, because grid items stretch: the column's box is the
 * section's height whatever its content does. Without it a short second column
 * leaves its hairlines floating with nothing to say they belong to a column.
 */
export default function SplitRows({ items, split, gap = 0.05, keyOf, row }) {
  /* A Stagger per column, not one across both, so each cascade runs down its
     own column. They start together - the two are at the same height, so they
     come into view on the same frame. */
  const column = (list, key, className) => (
    <Stagger key={key} gap={gap} className={className}>
      {list.map((item) => (
        <StaggerItem key={keyOf(item)}>{row(item)}</StaggerItem>
      ))}
    </Stagger>
  );

  if (!split) return column(items);

  const [left, right] = halves(items);
  return (
    <div className="lg:grid lg:grid-cols-2">
      {column(left, "l", "min-w-0 lg:pr-12")}
      {column(right, "r", "min-w-0 lg:border-l lg:border-line lg:pl-12")}
    </div>
  );
}

/** Split in two, the odd row going to the left column. */
function halves(items) {
  const cut = Math.ceil(items.length / 2);
  return [items.slice(0, cut), items.slice(cut)];
}
