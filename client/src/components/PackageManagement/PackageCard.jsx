import React from "react";
import { Card, CardContent, CardActions, CardHeader } from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const getServiceColor = (service) => {
  const colorMap = {
    caregiver: "primary",
    nurse: "secondary",
    doctor: "error",
    therapy: "success",
    medication: "warning",
    meals: "info"
  };
  return colorMap[service] || "default";
};

const PackageCard = ({ packageItem, onEdit, onDelete }) => {
  const { _id, packageId, name, description, services, duration, price } = packageItem;

  return (
    <Card sx={{ display: "flex", flexDirection: "column", height: "100%", transition: "0.3s", ":hover": { boxShadow: 6 } }}>
      {/* Card Header */}
      <CardHeader
        title={name}
        subheader={packageId}
        sx={{ pb: 1, "& .MuiCardHeader-title": { fontSize: "1.25rem", fontWeight: 600 } }}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        {/* Price Display */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="subtitle2" color="textSecondary">
            Price
          </Typography>
          <Typography variant="h5" fontWeight={700}>
            ${price.toFixed(2)}
          </Typography>
        </Box>

        {/* Description */}
        <Typography variant="body2" color="textSecondary" mb={2}>
          {description}
        </Typography>

        {/* Services List */}
        <Box mb={2}>
          <Typography variant="subtitle2" color="textSecondary" mb={1}>
            Services Included
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={1}>
            {services.map((service) => (
              <Chip key={service} label={service} color={getServiceColor(service)} size="small" />
            ))}
          </Box>
        </Box>

        {/* Duration */}
        <Typography variant="subtitle2" color="textSecondary">
          Duration
        </Typography>
        <Typography variant="body2">{duration}</Typography>
      </CardContent>

      <Divider />

      {/* Card Actions */}
      <CardActions sx={{ justifyContent: "flex-end", p: 2 }}>
        <Button
          variant="outlined"
          size="small"
          startIcon={<EditIcon />}
          onClick={() => onEdit(packageItem)}
        >
          Edit
        </Button>
        <IconButton color="error" onClick={() => onDelete(_id)}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default PackageCard;
