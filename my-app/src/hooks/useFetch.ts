import Papa from "papaparse";

interface UseFetch {
  fetchCsvData: <T>(filepath: string, callback: (data: T[]) => void) => Promise<void>;
}
const useFetch = (): UseFetch => {
  const fetchCsvData = async <T>(filepath: string, callback: (data: T[]) => void): Promise<void> => {
    const response = await fetch(filepath);
    const reader = response.body!.getReader();
    const result = await reader.read();
    const decoder = new TextDecoder("utf-8");
    const csvString = decoder.decode(result.value!);
    
    const { data } = Papa.parse(csvString, {
      skipEmptyLines: true,
      header: true,
      dynamicTyping: true,
    });
    
    callback(data as T[]);
  };

  return {
    fetchCsvData,
  };
};

export default useFetch;