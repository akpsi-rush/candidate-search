import { Candidate } from "@/pages/search";
import SearchIcon from "./icons/SearchIcon";
import React, { Dispatch, FC, SetStateAction, useState } from "react";

const filterOptions = ["Name", "NetID"];

interface SearchBarProps {
  candidateData: any;
  setFilteredCandidates: Dispatch<SetStateAction<any>>;
}

const SearchBar: FC<SearchBarProps> = ({
  candidateData,
  setFilteredCandidates,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [filterOption, setFilterOption] = useState(filterOptions[0]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterOption(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const lowerCaseSearchTerm = searchValue.toLowerCase();

    if (filterOption === filterOptions[0]) {
      // filter by name
      const filteredList = candidateData.filter((candidate: Candidate) =>
        candidate.fullName.toLowerCase().includes(lowerCaseSearchTerm)
      );
      setFilteredCandidates(filteredList);
    } else {
      // filter by NetId
      const filteredList = candidateData.filter((candidate: Candidate) =>
        candidate.netId.toLowerCase().includes(lowerCaseSearchTerm)
      );
      setFilteredCandidates(filteredList);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-[800px] mt-[100px] flex flex-row border-black border-[1px]">
        <select
          className="bg-blue-400 w-[150px] text-white text-[20px] border-black border-[1px]"
          value={filterOption}
          onChange={handleFilterChange}
        >
          {filterOptions.map((text: string, key: number) => (
            <option key={key} value={text}>
              {text}
            </option>
          ))}
        </select>
        <input
          className="w-full h-[40px] border-black border-[1px] text-black"
          type="text"
          placeholder="Search For"
          value={searchValue}
          onChange={handleSearchChange}
        />
        <button
          className="bg-blue-400 w-[50px] flex flex-row justify-center border-black border-[1px]"
          type="submit"
        >
          <div className="mt-[6px]">
            <SearchIcon />
          </div>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
