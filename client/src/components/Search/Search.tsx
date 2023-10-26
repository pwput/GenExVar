import TextField from "@mui/material/TextField";
import React, {SyntheticEvent, useState} from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import "./Search.scss"
import Button from "@mui/material/Button";

export default function Search(
    props: {
        topText: string,
        options: string[],
        label: string,
        buttonText: string,
        parentCallback: (data: string) => void
    }) {

    const [searchValue, setSearchValue] = useState("");

    const handleChange = (event: SyntheticEvent, value: string | null) => {
        if (value != null)
            setSearchValue(value);
    }

    // @ts-ignore
    return (
        <div className="search-container">
            <p>{props.topText}</p>
            <div className="search">
                <Autocomplete
                    disablePortal
                    id="autocomplete-geneiD"
                    options={props.options}
                    sx={{width: 300}}
                    renderInput={(params) => <TextField {...params} label={props.label}/>}
                    onChange={handleChange}
                />
                <Button id="search-button" variant="outlined"
                        onClick={() => props.parentCallback(searchValue)}>{props.buttonText}</Button>
            </div>
        </div>
    )
}
