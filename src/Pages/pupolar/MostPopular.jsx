import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./MostPopular.module.css";
import RepositoryTable from "../../components/repositoryTable/RepositoryTable";
import Loading from '../../components/loading/Loading'

function MostPopular() {
  const [allRepos, setAllRepos] = useState(false);
  const [filteredRepo, setFilterRepo] = useState([]);

  const getAllStarsRepos = async () => {
    await axios
      .get(
        "https://api.github.com/search/repositories?q=stars:%3E1&sort=stars",
        {
          headers: {
            Authorization: `Bearer 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`,
          },
        }
      )
      .then((response) => setAllRepos(response.data.items));
  };

  let rowData =
    allRepos.length > 0 &&
    allRepos.map((item) => {
      return {
        repoName: item.name,
        forks: item.forks_count,
        stars: item.stargazers_count,
        update: item.updated_at,
        id: item.id,
      };
    });

  console.log(filteredRepo);

  useEffect(() => {
    getAllStarsRepos();
  }, []);

  const searchHandler = (e) => {
    const searchBarString = e.target.value;
    if (searchBarString.length > 3) {
      let filteredArr = rowData.filter((item) =>
        item.repoName.includes(searchBarString)
      );
      setFilterRepo(filteredArr);
    }
  };

  return (
    <div className={styles.mainContainer}>
      {!allRepos ? (
        <Loading />
      ) : (
        <>
          <div className={styles.inputContainer}>
            <input type="text" className={styles.searchBox} onChange={searchHandler} placeholder="search repository . . ." />
          </div>

          <div className={styles.starsTable}>
            <RepositoryTable
              rows={filteredRepo.length ? filteredRepo : rowData}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default MostPopular;
