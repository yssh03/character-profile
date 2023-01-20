import React, { useEffect, useMemo, useState } from "react";
import { getFilteredData, getProfiles } from "../services/profileServices";
import ProfileCard from "../component/ProfileCard";
import { genderOption, statusOption } from "../common/constant";
import axios from "axios";

const initialState = {
  name: "",
  type: "",
  species: "",
  status: "",
  gender: "",
};
function ProfileList() {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState();
  const [state, setState] = useState(initialState);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const siblingCount = 1;
  const dataPerPage = 20;
  const DOTS = "...";
  const range = (start, end) => {
    let length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
  };

  const fetchData = async (url) => {
    return await axios
      .get(url)
      .then(
        (res) => (
          setTimeout(
            () => (
              setLoading(true),
              setAllData(res.data.info),
              setTotalCount(res.data.info.count),
              setData(res.data.results)
            ),
            500
          ),
          setLoading(false)
        )
      )
      .catch((err) =>
        setTimeout(
          () => (setLoading(true), setError(true), 500),
          setLoading(false),
          setError(false)
        )
      );
  };

  const toSetData = (data, allData, count) => {
    setTimeout(
      () => (
        setLoading(true),
        setError(false),
        setData(data),
        setAllData(allData),
        setTotalCount(count)
      ),
      500
    );
    setLoading(false);
  };

  useEffect(() => {
    getProfiles(currentPage)
      .then((res) =>
        toSetData(res?.data?.results, res?.data?.info, res?.data?.info.count)
      )
      .catch((err) =>
        setTimeout(
          () => (setLoading(true), setError(true), 500),
          setLoading(false),
          setError(false)
        )
      );
  }, []);

  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
    getFilteredData(state)
      .then((res) =>
        toSetData(res?.data?.results, res?.data?.info, res?.data?.info.count)
      )
      .catch((err) =>
        setTimeout(
          () => (setLoading(true), setError(true), 500),
          setLoading(false),
          setError(false)
        )
      );
  }, [state]);

  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / dataPerPage);
    const totalPageNumbers = siblingCount + 5;
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;
    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalCount, dataPerPage, siblingCount, currentPage]);

  const handleChange = (e) => {
    e.preventDefault();
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onNext = (url) => {
    if (url !== null) {
      setCurrentPage(currentPage + 1);
      fetchData(url);
    }
  };

  const onPrevious = (url) => {
    if (url !== null) {
      setCurrentPage((page) => {
        return page - 1;
      });
      fetchData(url);
    }
  };

  return (
    <>
      <div>
        <h1 className="page-title">Character Profiles</h1>

        <div className="toggle-button" onClick={() => setIsOpen(!isOpen)}>
          <span className="text">Search</span>
          <span className="icon">
            <i class="fa fa-search"></i>
          </span>
        </div>
        {isOpen && (
          <form className="form-data">
            <div className="form-raw">
              <div className="form-field">
                <label>Name:</label>
                <input
                  type={"text"}
                  placeholder="Search"
                  value={state.name}
                  name="name"
                  onChange={handleChange}
                />
              </div>
              <div className="form-field">
                <label>Species:</label>
                <input
                  type={"text"}
                  placeholder="Search"
                  value={state.species}
                  name="species"
                  onChange={handleChange}
                />{" "}
              </div>
              <div className="form-field">
                <label>Type:</label>
                <input
                  type={"text"}
                  placeholder="Search"
                  value={state.type}
                  name="type"
                  onChange={handleChange}
                />
              </div>
              <div className="form-field">
                <label>Status:</label>
                <select name="status" id="status" onChange={handleChange}>
                  <option value="">Search</option>
                  {statusOption.map((status) => {
                    return <option value={status.value}>{status.label}</option>;
                  })}
                </select>
              </div>
              <div className="form-field">
                <label>Gender:</label>
                <select
                  name="gender"
                  id="gender"
                  value={state.gender}
                  onChange={handleChange}
                >
                  <option value="">Search</option>
                  {genderOption.map((gender) => {
                    return <option value={gender.value}>{gender.label}</option>;
                  })}
                </select>
              </div>
              <div className="form-field" style={{ justifyContent: "center" }}>
                <button
                  className="back-btn"
                  style={{ fontSize: "15px" }}
                  type="submit"
                  onClick={(e) => (e.preventDefault(), setState(initialState))}
                >
                  Clear
                </button>
              </div>
            </div>{" "}
          </form>
        )}

        <div className="profile-cards">
          {error ? (
            <div style={{ width: "100%" }}>
              <pre
                style={{
                  fontSize: "20px",
                  textAlign: "center",
                  marginTop: "10px",
                }}
              >
                There is nothing here
              </pre>
            </div>
          ) : !loading ? (
            <div style={{ width: "100%" }}>
              <pre style={{ fontSize: "20px", textAlign: "center" }}>
                Loading...
              </pre>
            </div>
          ) : (
            <>{data && <ProfileCard data={data} />}</>
          )}

          <div class="pagination">
            <ul>
              <li onClick={() => onPrevious(allData.prev)}>&lt;</li>
              {paginationRange?.map((range) => {
                if (range === DOTS) {
                  return <li>&#8230;</li>;
                }

                return (
                  <>
                    <li className={currentPage === range ? "is-active" : ""}>
                      {range}
                    </li>
                  </>
                );
              })}
              <li
                onClick={() => onNext(allData.next)}
                disabled={
                  currentPage === Math.ceil(totalCount / dataPerPage)
                    ? true
                    : false
                }
              >
                &gt;
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileList;
