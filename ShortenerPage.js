import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { addURL, findByCode } from "../store/urlData";
import { isValidURL, generateCode } from "../utils/helpers";

function ShortenerPage() {
  const [inputs, setInputs] = useState([{ url: "", code: "", time: "" }]);
  const [results, setResults] = useState([]);

  const updateInput = (i, key, value) => {
    const newInputs = [...inputs];
    newInputs[i][key] = value;
    setInputs(newInputs);
  };

  const addMore = () => {
    if (inputs.length < 5) {
      setInputs([...inputs, { url: "", code: "", time: "" }]);
    }
  };

  const shorten = () => {
    const newResults = [];

    inputs.forEach((item) => {
      if (!isValidURL(item.url)) return;

      const code = item.code || generateCode();
      if (findByCode(code)) return;

      const validTime = item.time ? parseInt(item.time) : 30;
      const expiry = new Date(Date.now() + validTime * 60000);

      const shortURL = `${window.location.origin}/${code}`;
      const entry = {
        original: item.url,
        shortCode: code,
        shortURL,
        expiry,
      };

      addURL(entry);
      customLog("Shortened", entry);
      newResults.push(entry);
    });

    setResults(newResults);
  };

  return (
    <Box p={3}>
      <Typography variant="h4">URL Shortener</Typography>
      {inputs.map((input, i) => (
        <Box key={i} my={2}>
          <TextField
            label="Long URL"
            fullWidth
            value={input.url}
            onChange={(e) => updateInput(i, "url", e.target.value)}
            sx={{ mb: 1 }}
          />
          <TextField
            label="Custom Code (optional)"
            fullWidth
            value={input.code}
            onChange={(e) => updateInput(i, "code", e.target.value)}
            sx={{ mb: 1 }}
          />
          <TextField
            label="Validity (minutes)"
            fullWidth
            type="number"
            value={input.time}
            onChange={(e) => updateInput(i, "time", e.target.value)}
          />
        </Box>
      ))}
      <Button onClick={addMore} variant="outlined" sx={{ mt: 2, mr: 2 }}>
        Add More
      </Button>
      <Button onClick={shorten} variant="contained" sx={{ mt: 2 }}>
        Shorten URLs
      </Button>

      <Box mt={4}>
        {results.map((r, i) => (
          <Box key={i}>
            🔗 <a href={r.shortURL}>{r.shortURL}</a> (expires at {r.expiry.toLocaleTimeString()})
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default ShortenerPage;
