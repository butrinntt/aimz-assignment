import Papa from "papaparse";

interface UseFetch {
  fetchCsvData: <T>(filepath: string) => Promise<T[]>;
}

const useFetch = (): UseFetch => {
  const fetchCsvData = async <T>(filepath: string): Promise<T[]> => {
    try {
      const response = await fetch(filepath);
      if (!response.ok) {
        throw new Error(`Failed to fetch CSV: ${response.statusText}`);
      }
      const reader = response.body!.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder("utf-8");
      const csvString = decoder.decode(result.value!);
      const { data, errors } = Papa.parse(csvString, {
        skipEmptyLines: true,
        header: true,
        dynamicTyping: true,
      });
      if (errors.length > 0) {
        console.warn("CSV parsing errors:", errors);
      }
      return data as T[];
    } catch (error) {
      console.error("Error fetching CSV data:", error);
      throw error;
    }
  };
  return {
    fetchCsvData,
  };
};

export default useFetch;
