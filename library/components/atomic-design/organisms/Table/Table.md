# Orch UI Component Library - Table

This table allows us to control what was once the Spark Table which is driven by the underlying `react-table` v7 [package](https://react-table-v7-docs.netlify.app/docs/api/usetable). Additionally this serves as an upgrade to our `OrchTable` which served as a middle-man to the Spark Table. In this manner we have full control over how the table works and looks. More memoization is in place which should translate into fewer renders of the component.

## How to use

### Column definitions

In the case of server side sorting the setup of columns can use the optional `apiName` attribute to correctly indicate what column to sort on. For example, in the below code, we display "GUID" in the UI but the api understands this as "uuid" for sorting on the server side. Attempting to do server side sorting and a column that doesn't define it's `apiName` will trigger an exception.

```ts
const guid: TableColumn<HostRead> = {
  Header: "GUID",
  apiName: "uuid",
  accessor: (host) => host.uuid,
};
```

Additionally there is a `columnApiNameToDisplayName` method to help translate back and forth when necessary

Note: When `accessor` is a function, the internal react-table works with sorting via `Header` otherwise `accessor` is used to identify the column to sort with.

### Pagination

When pagination is required use the `canPaginate` attribute which itself carries a few other requirements

- `isServerSidePagination` (`true` or `false`) needs to be specified so the table will enable the correct pagination/sorting capabilities
- when `isServerSidePagination=true` is specified `totalOverallRowsCount` must be specified as well so that the pagination control renders the correct visible page numbers

### URL Params

URL Params have been separated from the internals of the table to decouple dependencies. Instead URL param values need to be determined before being sent in

```ts
const sortColumn =
  columnApiNameToDisplayName(columns, searchParams.get("column")) ?? "Name";
const sortDirection = searchParams.get("direction") as SortDirection;
const pageSize = parseInt(searchParams.get("pageSize") ?? "10");
const offset = parseInt(searchParams.get("offset") ?? "0");
const searchTerm = searchParams.get("searchTerm") ?? undefined;

//TODO: this could be a utility function in @orch-utils
```

## Search Ribbon

The searching ribbon has been simplified to enablement via a `canSearch` attribute. If addtional actions need to be added in the ribbon use the `actionsJSX` attribute do define any extra elements that need to be added

```jsx
<Table
  data={data}
  columns={columns}
  canSearch
  onSearch={(searchTerm: string) => {
    /* search actions */
  }}
  actionsJSX={<button>Add</button>}
/>
```

## Row Selection

The row selection feature on the table can be enabled via `canSelectRows` attribute. This feature
displays checkboxes on the first column of each table row. By this one can click on the row data for
any subsequent action containing group of table row. The table row selection feature, in addition to `canSelectRows`, requires attributes `onSelect` handler returning the row that was last clicked and `selectedId` for list of `rowIds` in form of an array of string values. By default `rowIds` of each table row are indicated by the row index. This behavior can be modified `getRowIds` handler taking in the `row` which should return a key or `rowId` of a string form.

```jsx
export interface TableProps<T extends object> extends TableRibbonProps {
  ...
  columns: Array<TableColumn<T>>;
  data?: Array<T>;
  canSelectRows?: boolean;
  selectedIds?: string[];
  onSelect?: (selectedRowData: T, isSelected: boolean, rowIndex?:number) => void;
  getRowId?: (
    originalRow: T,
    relativeIndex?: number,
    parent?: Row<T>
  ) => string;
  ...
}

...

// case: if getIdFromRow is not present
const getIdFromRow = undefined;
// case: say T is having primary key identity by a `deployId:string`
const getIdFromRow = (row: T) => row.deployId;
// case: say T is having primary key identity by a name & version column
const getIdFromRow = (row: T) => `${row.name},${row.ver}`;

...

// case: say preselected row for primary key identity row index,
//       when getRowId is not supplied! (Note: this case is not pagination friendly!)
const selectedIds = [
  "0",
  "2",
  "4",
]
// case: say preselected row for primary key identity by a name & version column
const selectedIds = [
  "Data 1,1.0.0",
  "Data 3,1.0.0",
  "Data 5,1.0.0",
  "Data 11,1.0.0",
  "Data 11,1.0.1",
  "Data 14,1.0.0"
]

...

<Table
  data={data}
  columns={columns}
  getRowId={getIdFromRow}
  canSelectRows
  // Say page 1 contains `Data 1` to `Data 10` (10 rows) and page 2 contains the rest
  selectIds={selectedIds}
  onSelect={(row: CustomRow, isSelected: boolean, rowIndex?: number) => {
    const rowId = getIdFromRow(row); // you can also use the unused var `rowIndex` here...
    setSelectedIds((prev) => {
      if (isSelected) {
        return prev.concat(rowId);
      }
      return prev.filter((id) => id !== rowId);
    });
  }}
/>
```

Note: An issue is seen in onSelect when setting the parent state handler for selectedIds.

```jsx
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // In the `onSelect`...

  // This works!!
  setSelectedIds((prev) => prev.concat(rowId)); // This will update next state for selectedIds!

  // This doesn't work!
  setSelectedIds(selectedIds.concat(rowId)); // next state for selectedIds is not updated!
```

## Table Actions

These are the supported callback actions from the table.

```ts
  onSort?: (column: string, direction: SortDirection) => void;
  onSelect?: (selectedRowData: T, isSelected: boolean, rowIndex?:number) => void;
  onSearch?: (searchTerm: string) => void;
  onChangePage?: (page: number) => void;
  onChangePageSize?: (pageSize: number) => void;
```

## Examples

Server side supported table

```jsx
<Table
  columns={columns}
  data={sites}
  totalOverallRowsCount={totalElements}
  canPaginate
  canSearch
  isServerSidePaginated
  initialState={{ pageSize, pageIndex: Math.floor(offset / pageSize) }}
  initialSort={{
    column: sortColumn,
    direction: sortDirection,
  }}
  searchTerm={searchTerm}
  sortColumns={[0, 1, 2, 4]}
  onSort={(column: string, direction: SortDirection) => {
    //logic to handle url params updates, etc
  }}
  onChangePage={(index: number) => {
    //logic to handle url params updates, etc
  }}
  onSearch={(searchTerm: string) => {
    //logic to handle url params updates, etc
  }}
  onChangePageSize={(pageSize: number) => {
    //logic to handle url params updates, etc
  }}
/>
```

## Tips

- When doing an initial sort from the server side , ensure the related API call itself is also called with the initial sort values in its URL params. It will not be sufficient to set the tables `initialSort` object

- Pay attention to the was the `accessor` of a column is defined. The internals of react-table work differently based on whether or not this is a function
