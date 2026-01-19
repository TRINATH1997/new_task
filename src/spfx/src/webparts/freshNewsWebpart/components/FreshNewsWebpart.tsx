import * as React from "react";
import type { IFreshNewsWebpartProps } from "./IFreshNewsWebpartProps";
import { SearchBox } from "./SearchBox";
import { FilterDropdown } from "./FilterDropdown";
import { NewsList } from "./NewsList";
import { Pagination } from "./Pagination";
import { NewsService } from "../services/NewsService";

const FreshNewsWebpart: React.FC<IFreshNewsWebpartProps> = (props) => {

  const service = React.useMemo(
    () =>
      new NewsService(
        props.context.spHttpClient,
        props.context.pageContext.web.absoluteUrl
      ),
    []
  );

  const [items, setItems] = React.useState<any[]>([]);
  const [search, setSearch] = React.useState("");
  const [author, setAuthor] = React.useState("All");
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    service
      .getNews(search, page, props.pageSize, author)
      .then(setItems);
  }, [search, page, author, props.pageSize]);

  return (
    <>
      {props.enableSearch && <SearchBox onChange={setSearch} />}
      <FilterDropdown onChange={setAuthor} />
      <NewsList items={items} />
      <Pagination onNext={() => setPage(p => p + 1)} />
    </>
  );
};

export default FreshNewsWebpart;


