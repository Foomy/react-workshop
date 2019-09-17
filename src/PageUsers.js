import React from "react";
import { useFetch } from "react-async";

import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { Icon } from "antd";

const Pagination = styled.ul({
  listStyle: "none"
});

const PaginationItem = styled.li({
  float: "left"
});

const Clearer = styled.div({
  clear: "both"
});

/*
function useGetApiManually(page) {
  const [apiResults, setApiResults] = React.useState({});

  React.useEffect(() => {
    fetch("https://reqres.in/api/users/?page=" + page)
      .then(result => result.json())
      .then(jsonResult => setApiResults(jsonResult));
  });

  return apiResults;
}
*/

export function PageUsers(props) {
  const page = props.match.params.page || 1;
  //const apiResults = useGetApiManually(page);

  const results = useFetch(
    "https://reqres.in/api/users/?per_page=4&page=" + page,
    { headers: { accept: "application/json" } },
    {}
  );

  if (results.isLoading) {
    return "Loading ... please wait.";
  }

  const apiResults = results.data;
  const lastPage = apiResults.total_pages;

  return (
    <>
      <Pagination>
        <PaginationItem>
          <Link to="/users/1">
            <Icon type="fast-backward" />
          </Link>
        </PaginationItem>
        <PaginationItem>
          <Link to={`/users/${page - 1}`}>
            <Icon type="step-backward" />
          </Link>
        </PaginationItem>
        {Array(lastPage)
          .fill(0)
          .map((_, pagenum) => (
            <PaginationItem>
              <Link to={`/users/${pagenum + 1}`}>{pagenum + 1}</Link>
            </PaginationItem>
          ))}
        <PaginationItem>
          <Link to={`/users/${page + 1}`}>
            <Icon type="step-forward" />
          </Link>
        </PaginationItem>
        <PaginationItem>
          <Link to={`/users/${lastPage}`}>
            <Icon type="fast-forward" />
          </Link>
        </PaginationItem>
      </Pagination>
      <Clearer />

      {apiResults.data &&
        apiResults.data.map(user => (
          <>
            <table>
              <tbody>
                <tr key={user.id}>
                  <td>
                    <img
                      src={user.avatar}
                      alt={`Avatar of ${user.first_name}.`}
                      title={`Avatar of ${user.first_name}.`}
                    />
                  </td>
                  <td>
                    <div>
                      Name: {user.first_name} {user.last_name}
                    </div>
                    <div>eMail: {user.email}</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        ))}
    </>
  );
}
