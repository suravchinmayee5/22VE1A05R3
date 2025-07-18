import React from "react";
import { Box, Typography } from "@mui/material";
import { getAllURLs } from "../store/urlData";

function StatsPage() {
  const data = getAllURLs();

  return (
    <Box p={3}>
      <Typography variant="h4">Shortened Links</Typography>
      {data.map((item, i) => (
        <Box key={i} my={2}>
          🔗 {item.shortURL} → {item.original} (Expires: {item.expiry.toLocaleTimeString()})
        </Box>
      ))}
    </Box>
  );
}

export default StatsPage;
 