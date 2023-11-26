import axios from "axios"

const baseUrl: string = 'http://localhost:5005'


const geneIds = [
    "AT1G01010",
    "AT1G01020",
];

const wgcnaGroups = [
    "1",
    "2",
];

export const getGene = async (geneId: string): Promise<any> => {
    try {
        const response = await axios.get(`${baseUrl}/gene?id=${geneId}`);
        return response.data; // Zakładając, że odpowiedź serwera jest w `response.data`.
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const getGeneIdList = async (): Promise<any> => {
    try {
        const response = await axios.get(`${baseUrl}/gene-ids`);
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const getWGCNAGroupList = async (): Promise<any> => {
    try {
        //const response = await axios.get(`${baseUrl}/genes?id=${geneId}`);
        let response : {data: string[]} = {data: wgcnaGroups};
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};