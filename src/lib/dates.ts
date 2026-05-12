// Effective-date helper. Posts ingested from historical archives have two
// dates: `date` (when published on this site) and `original_date` (when
// originally written). For sorting, displaying in indexes/feeds, and
// grouping the archive by year, we want the *original* date when present
// so historical material doesn't all cluster on its ingestion day.
//
// Individual post pages render BOTH dates side-by-side (see ContentLayout).
type DateLike = {
  data: {
    date: Date;
    original_date?: Date;
  };
};

export function effectiveDate(entry: DateLike): Date {
  return entry.data.original_date ?? entry.data.date;
}
