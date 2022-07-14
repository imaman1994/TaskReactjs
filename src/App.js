import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { Pagination } from "@mui/material";
import usePagination from "./Pagination";
import axios from "axios";
import { AppBar, debounce, Typography } from "@mui/material";

export default function App() {
  let [page, setPage] = useState(1);
  const [apiData, setApiData] = useState();
  const [search, setSearch] = useState("");
  const PER_PAGE = 1;
  const fetchData = () => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts`)
      .then((res) => setApiData(res.data));
  };
  useEffect(() => {
    fetchData();
  }, []);
  // console.log(apiData);
  const count = Math.ceil(apiData?.length / PER_PAGE);
  const _DATA = usePagination(apiData, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
  // search function using debounce
  const onSearch = debounce((e) => {
    setSearch(e);
  }, 400);

  return (
    <div>
      <AppBar style={{ backgroundColor: "#D2691E", padding: "15px" }}>
        <Grid style={{ display: "flex" }}>
          <Typography>Search</Typography>
          <input
            onChange={(e) => onSearch(e.target.value)}
            style={{ width: "200px", color: "black", padding: "2px" }}
          />
        </Grid>
      </AppBar>
      <Grid
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1474&q=80")',
          height: "110vh",
          display: "flex",
          alignContent: "center",
          flexDirection: "column",
          alignItems: "center",
          color: "white",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center"
        }}
      >
        <Grid
          style={{
            width: "40rem",
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            flexDirection: "column",
            borderRadius: "1px solid black",
            marginTop: "40vh",
            fontSize: "1.5rem",
            position: "fixed",
            color: "black"
          }}
        >
          {_DATA
            ?.currentData()
            ?.filter((post) => {
              if (search === " ") {
                return post;
              } else if (
                post.title.toLowerCase().includes(search.toLowerCase()) ||
                post.body.toLowerCase().includes(search.toLowerCase())
              ) {
                return post;
              }
            })
            ?.map((data, index) => {
              console.log(data);
              return (
                <div key={index}>
                  <p>Title:- {data.title}</p>
                  <p>Body:- {data.body}</p>
                </div>
              );
            })}
        </Grid>
        <Grid
          style={{
            display: "flex",
            flexDirection: "left",
            alignItems: "center",
            marginTop: "33rem",
            position: "fixed"
          }}
        >
          <Pagination
            count={count}
            size="large"
            page={page}
            variant="outlined"
            shape="rounded"
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </div>
  );
}
