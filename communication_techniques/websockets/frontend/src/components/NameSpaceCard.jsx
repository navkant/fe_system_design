import { useState } from "react";
import Typography from "@mui/material/Typography";

const NameSpaceCard = (props) => {
  const { namespaceId } = props.nspInfo;

  return (
    <div>
      <Typography variant="h5" align="center" color="#1976d2" gutterBottom>
        /{namespaceId}
      </Typography>
    </div>
  );
};

export default NameSpaceCard;
