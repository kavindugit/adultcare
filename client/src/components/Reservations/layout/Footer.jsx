// @ts-nocheck
import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  TextField,
  Button,
  Divider,
  List,
  ListItem,
} from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Box component="footer" bgcolor="#f5f5f5" borderTop={1} borderColor="divider" py={6}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <Typography variant="h6" fontWeight={700} color="primary">
                Elder<span style={{ fontWeight: 400 }}>Bliss</span>
              </Typography>
            </Link>
            <Typography variant="body2" color="textSecondary" mt={2}>
              Providing compassionate and efficient care services for adults, with a seamless reservation system.
            </Typography>
            <Box mt={2} display="flex" gap={1}>
              <SocialLink Icon={Facebook} label="Facebook" href="#" />
              <SocialLink Icon={Twitter} label="Twitter" href="#" />
              <SocialLink Icon={Instagram} label="Instagram" href="#" />
              <SocialLink Icon={Linkedin} label="LinkedIn" href="#" />
            </Box>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="subtitle2">Services</Typography>
            <List>
              <FooterLink href="/services" label="Doctor Consultations" />
              <FooterLink href="/services" label="Therapy Sessions" />
              <FooterLink href="/services" label="Inpatient Care" />
              <FooterLink href="/services" label="Daily Support Services" />
            </List>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="subtitle2">Contact Information</Typography>
            <List>
              <ListItem>
                <MapPin fontSize="small" style={{ marginRight: 8 }} />
                <Typography variant="body2" color="textSecondary">
                  123 Care Avenue, Suite 500, Healthcare City, HC 10001
                </Typography>
              </ListItem>
              <ListItem>
                <Phone fontSize="small" style={{ marginRight: 8 }} />
                <Typography variant="body2" color="textSecondary">
                  (555) 123-4567
                </Typography>
              </ListItem>
              <ListItem>
                <Mail fontSize="small" style={{ marginRight: 8 }} />
                <Typography variant="body2" color="textSecondary">
                  contact@elderbliss.com
                </Typography>
              </ListItem>
            </List>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="subtitle2">Newsletter</Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Subscribe to receive updates on our services and health tips.
            </Typography>
            <TextField
              type="email"
              placeholder="Your email address"
              variant="outlined"
              size="small"
              fullWidth
              sx={{ bgcolor: "background.paper", mb: 1 }}
            />
            <Button variant="contained" color="primary" fullWidth>
              Subscribe
            </Button>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center">
          <Typography variant="caption" color="textSecondary">
            © {new Date().getFullYear()} ElderBliss. All rights reserved.
          </Typography>
          <Box display="flex" gap={3}>
            <FooterLink href="/privacy" label="Privacy Policy" small />
            <FooterLink href="/terms" label="Terms of Service" small />
            <FooterLink href="/accessibility" label="Accessibility" small />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

const SocialLink = ({ Icon, label, href }) => (
  <IconButton
    href={href}
    aria-label={label}
    size="small"
    sx={{ bgcolor: "background.paper", color: "text.secondary", '&:hover': { color: 'primary.main' } }}
  >
    <Icon fontSize="small" />
  </IconButton>
);

const FooterLink = ({ href, label, small = false }) => (
  <ListItem disableGutters>
    <Link
      to={href}
      style={{
        fontSize: small ? 12 : 14,
        color: 'rgba(0,0,0,0.6)',
        textDecoration: 'none',
        transition: 'color 0.3s',
      }}
      onMouseOver={(e) => (e.target.style.color = '#1976d2')}
      onMouseOut={(e) => (e.target.style.color = 'rgba(0,0,0,0.6)')}
    >
      {label}
    </Link>
  </ListItem>
);

export default Footer;
