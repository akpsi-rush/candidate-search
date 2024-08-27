import { get, getDatabase, ref } from "firebase/database";
import { initFirebase } from "@/lib/firebase";
import { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import { useMobile } from "@/hooks/mobile";
import MobileSearchBar from "@/components/MobileSearchBar";

export interface Candidate {
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  netId: string;
}

function parseRawCandidates(data: any[]): Candidate[] {
  let candidates: Candidate[] = [];
  data.forEach((item, idx: number) => {
    const newCand: Candidate = {
      email: item["email"],
      firstName: item["firstName"],
      lastName: item["lastName"],
      fullName: `${item["firstName"]} ${item["lastName"]}`,
      netId: item["netId"].toLowerCase(),
    };
    candidates.push(newCand);
  });
  const withoutDuplicates = removeDuplicates(candidates);
  console.log(withoutDuplicates.length, candidates.length);
  return withoutDuplicates;
}

function removeDuplicates(candidates: Candidate[]) {
  let newList: Candidate[] = [];
  let visited = new Set();
  candidates.forEach((item, idx: number) => {
    if (!visited.has(item.netId)) {
      newList.push(item);
      visited.add(item.netId);
    }
  });
  return newList;
}

const Search = () => {
  initFirebase();
  const db = getDatabase();
  // CHANGE THIS WHENEVER SWITCHING ROUNDS
  const candidatesRef = ref(db, "info-night");
  const [candidateData, setCandidateData] = useState<Candidate[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  const [copiedIndexes, setCopiedIndexes] = useState<number[]>([]);
  const { isMobile } = useMobile();

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await get(candidatesRef);
      const parsedData = parseRawCandidates(snapshot.val());
      setCandidateData(parsedData);
      setFilteredCandidates(parsedData);
    };
    fetchData();
  }, []);

  const headers = ["Name", "Last Name", "NetId", "Email"];
  const mobileHeaders = ["Full Name", "NetId"];

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Unable to copy to clipboard:", err);
    }
  };

  const handleCopyClick = (netId: string, index: number) => {
    // Perform copy logic here (you may need to implement the copyToClipboard function)
    copyToClipboard(netId);

    // Update the state to mark the button as copied
    setCopiedIndexes((prevIndexes: number[]) => [...prevIndexes, index]);

    // Set a timeout to reset the copied index after 3 seconds
    setTimeout(() => {
      setCopiedIndexes((prevIndexes) => prevIndexes.filter((i) => i !== index));
    }, 3000);
  };

  return (
    <div className="pb-[100px]">
      {!isMobile ? (
        <SearchBar
          setFilteredCandidates={setFilteredCandidates}
          candidateData={candidateData}
        />
      ) : (
        <MobileSearchBar
          setFilteredCandidates={setFilteredCandidates}
          candidateData={candidateData}
        />
      )}
      {!isMobile ? (
        <div className="border rounded-[10px] overflow-hidden overlay mt-[80px] w-[800px]">
          <table className="w-[800px] table-fixed">
            <caption className="bg-white text-center h-[67px]">
              <span className="flex flex-col justify-center h-[67px] ml-[20px] text-[30px] text-[#101828]">
                Results
              </span>
            </caption>
            <thead>
              <tr className="h-[44px] bg-[#EAECF0] text-[12px] text-[#667085] text-left">
                {headers.map((header: string, idx: number) => (
                  <th key={idx}>
                    <div className="ml-[20px] flex flex-row">
                      <div>{header}</div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white w-[615px]">
              {filteredCandidates.length !== 0 ? (
                filteredCandidates.map((candidate: Candidate, key: number) => (
                  <tr
                    key={key}
                    className="h-[60px] border-gray-300 border-[.5px] hover:bg-gray-300 hover:cursor-pointer"
                  >
                    <td className="font-chivo text-[14px] text-[#667085]">
                      <div className="ml-[20px]">{candidate.firstName}</div>
                    </td>
                    <td className="font-chivo text-[14px] text-[#667085]">
                      <div className="ml-[20px]">{candidate.lastName}</div>
                    </td>
                    <td className="font-chivo text-[14px] text-[#667085]">
                      <div className="flex flex-row gap-[20px] ml-[20px] justify-between">
                        {candidate.netId}
                        {!copiedIndexes.includes(key) ? (
                          <button
                            onClick={() =>
                              handleCopyClick(candidate.netId, key)
                            }
                            className="h-[30px] rounded-[5px] text-white bg-blue-300 w-[50px]"
                          >
                            Copy
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              handleCopyClick(candidate.netId, key)
                            }
                            className="h-[30px] rounded-[5px] text-white bg-green-400 w-[70px]"
                          >
                            Copied
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="font-chivo text-[14px] text-[#667085]">
                      <div className="ml-[20px]">{candidate.email}</div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="h-[50px]">
                  <td
                    className="w-[800px] text-center text-black"
                    colSpan={headers.length}
                  >
                    No people found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="border rounded-[10px] overflow-hidden overlay mt-[80px] w-[300px]">
          <table className="w-[300px]">
            <caption className="bg-white text-center h-[67px]">
              <span className="flex flex-col justify-center h-[67px] ml-[20px] text-[30px] text-[#101828]">
                Results
              </span>
            </caption>
            <thead>
              <tr className="h-[44px] bg-[#EAECF0] text-[12px] text-[#667085] text-left">
                {mobileHeaders.map((header: string, idx: number) => (
                  <th key={idx}>
                    <div className="ml-[5px] flex flex-row">
                      <div>{header}</div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white w-[615px]">
              {filteredCandidates.length !== 0 ? (
                filteredCandidates.map((candidate: Candidate, key: number) => (
                  <tr
                    key={key}
                    className="h-[60px] border-gray-300 border-[.5px] hover:bg-gray-300 hover:cursor-pointer"
                  >
                    <td className="font-chivo text-[14px] text-[#667085] ml-[5px]">
                      {candidate.fullName}
                    </td>
                    <td className="font-chivo text-[14px] text-[#667085]">
                      <div className="w-[90%] flex flex-row justify-between">
                        <div className="text-left ml-[5px] mt-[5px]">
                          {candidate.netId}
                        </div>
                        {!copiedIndexes.includes(key) ? (
                          <button
                            onClick={() =>
                              handleCopyClick(candidate.netId, key)
                            }
                            className="h-[30px] w-[50px] mr-[20px] rounded-[5px] text-white bg-blue-300"
                          >
                            Copy
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              handleCopyClick(candidate.netId, key)
                            }
                            className="h-[30px] rounded-[5px] text-white bg-green-400 w-[70px] mr-[20px]"
                          >
                            Copied
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="h-[50px]">
                  <td
                    className="w-[300px] text-center text-black"
                    colSpan={headers.length}
                  >
                    No people found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Search;
