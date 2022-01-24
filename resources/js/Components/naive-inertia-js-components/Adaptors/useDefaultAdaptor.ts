import {
  GetQueryFunction,
  RouteAdaptorComposition,
  VisitFunction,
} from "./interface";

export const useDefaultAdaptor: RouteAdaptorComposition = () => {
  const visit: VisitFunction = (
    path,
    query,
    options = { resetPage: true, preserveState: true }
  ) => {
    console.log(path, query, options);
  };

  const getQuery: GetQueryFunction = () => {
    console.log("GET QUERY");
    return { filter: "hello" };
  };

  return {
    visit,
    getQuery,
  };
};
