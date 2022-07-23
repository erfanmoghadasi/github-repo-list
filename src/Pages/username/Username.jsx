import React, { useEffect, useState } from "react";
import styles from "./username.module.css";
import axios from "axios";
import RepositoryTable from "../../components/repositoryTable/RepositoryTable";

function Username() {
  const [data, setData] = useState({});
  const [repoList, setRepoList] = useState([]);
  const [search, setSearch] = useState("");
  const [userName, setUserName] = useState("erfanmoghadasi");

  const rowData = repoList.map((item) => {
    return {
      repoName: item.name,
      forks: item.forks_count,
      stars: item.stargazers_count,
      update: item.updated_at,
      id: item.id,
    };
  });

  const mostPopular = rowData.sort((a, b) => {
    return a.stars - b.stars;
  });

  const getData = async () => {
    await axios
      .get(`https://api.github.com/users/${userName}/repos`, {
        headers: {
          Authorization: `Bearer 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`,
        },
      })
      .then((response) => setRepoList(response.data));
  };

  const getRepos = async () => {
    await axios
      .get(`https://api.github.com/users/${userName}`, {
        headers: {
          Authorization: `Bearer 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`,
        },
      })
      .then((response) => setData(response.data));
  };

  useEffect(() => {
    getData();
    getRepos();
  }, [userName]);

  return (
    <div className={styles.usernameContainer}>
      <div className={styles.searchBox}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={() => setUserName(search)}>search</button>
      </div>

      <div className={styles.profile}>
        <div className={styles.leftSide}>
          <div className={styles.avatar}>
            <img src={data.avatar_url} alt="avatar" className={styles.img} />
          </div>
        </div>
        <div className={styles.rightSide}>
          <div className={styles.name}>
            name: <p>{data.login}</p>
          </div>
          <div className={styles.address}>
            address: <a href={data.url}>{data.url}</a>
          </div>
          <div className={styles.repoCount}>
            Count of Repo: <p>{data.public_repos}</p>
          </div>
        </div>
      </div>
      <RepositoryTable rows={rowData} />
    </div>
  );
}

export default Username;
