import React, { useCallback, useEffect, useState } from "react";
import styles from "./username.module.css";
import axios from "axios";
import RepositoryTable from "../../components/repositoryTable/RepositoryTable";
import Loading from "../../components/loading/Loading";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Username() {
  const [data, setData] = useState([]);
  const [repoList, setRepoList] = useState(false);
  const [search, setSearch] = useState("");
  const [userName, setUserName] = useState("erfanmoghadasi");

  const notifySuccess = () => toast.success('Successful search', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });

    const notifyError = () => {
      toast.error('username was incorrect, please try again', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }


  const getData = async () => {
    await axios
      .get(`https://api.github.com/users/${userName}/repos`, {
        headers: {
          Authorization: `Bearer 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`,
        },
      })
      .then((response) => setRepoList(response.data))
      .then(res => notifySuccess())
      .catch(err => notifyError())
  };

  const getRepos = async () => {
    await axios
      .get(`https://api.github.com/users/${userName}`, {
        headers: {
          Authorization: `Bearer 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`,
        },
      })
      .then((response) => setData(response.data))
      
  };


  useEffect(() => {
    getData();
    getRepos();
  }, [userName]);

  let rowData =
    repoList.length > 0 &&
    repoList.map((item) => {
      return {
        repoName: item.name,
        forks: item.forks_count,
        stars: item.stargazers_count,
        update: item.updated_at,
        id: item.id,
      };
    });

  const clickHandler = () => {
    setData([]);
    setUserName(search);
  };

  return (
    <div className={styles.usernameContainer}>
      <div className={styles.searchBox}>
        <input
          type="text"
          value={search}
          placeholder="search profile . . ."
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className={styles.searchBtn} onClick={clickHandler}>
          search
        </button>
      </div>

      {data.length === 0 ? (
        <Loading />
      ) : (
        <>
          <div className={styles.profile}>
            <div className={styles.leftSide}>
              <div className={styles.avatar}>
                <img
                  src={data.avatar_url}
                  alt="avatar"
                  className={styles.img}
                />
              </div>
            </div>
            <div className={styles.rightSide}>
              <div className={styles.name}>
                <span> name: {data.login} </span>
              </div>
              <div className={styles.address}>
                <span>
                  {" "}
                  address: <a href={data.url}>{data.url}</a>{" "}
                </span>
              </div>
              <div className={styles.repoCount}>
                <span> Counts of Repo : {data.public_repos}</span>
              </div>
            </div>
          </div>
          <div className={styles.tableContainer}></div>
          <RepositoryTable rows={rowData} />
        </>
      )}

      <ToastContainer />
    </div>
  );
}

export default Username;
