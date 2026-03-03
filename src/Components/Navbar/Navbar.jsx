import { useContext, useState, useEffect } from "react";
import {
  AppBar, Toolbar, Box, Typography, Button, IconButton, Badge,
  Menu, MenuItem, Container, Avatar, Drawer, List, ListItem,
  ListItemButton, ListItemText, Divider, useMediaQuery, useTheme,
} from "@mui/material";
import {
  Search, ShoppingCart, Menu as MenuIcon, Close, RestaurantMenu,
  ShoppingBagOutlined, LogoutOutlined
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";

const NAV_LINKS = [
  { label: "Home", to: "/", href: null },
  { label: "Menu", to: null, href: "#explore-menu" },
  { label: "Mobile App", to: null, href: "#app-download" },
  { label: "Contact Us", to: null, href: "#footer" },
];

const Navbar = ({ setShowlogin }) => {
  const [menu, setMenu] = useState("Home");
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  // Handle scroll for sticky effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
    setAnchorEl(null);
  };

  const handleNavClick = (label) => {
    setMenu(label);
    setDrawerOpen(false);
  };

  const drawerContent = (
    <Box sx={{ width: 280, height: "100%", bgcolor: "#fff", display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 3, py: 2.5 }}>
        <Typography variant="h6" sx={{ color: theme.palette.primary.main, fontWeight: 800 }}>FoodDel</Typography>
        <IconButton onClick={() => setDrawerOpen(false)}><Close /></IconButton>
      </Box>
      <Divider />
      <List sx={{ px: 2, py: 2, flex: 1 }}>
        {NAV_LINKS.map(({ label, to, href }) => (
          <ListItem key={label} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              component={to ? Link : "a"}
              to={to || undefined}
              href={href || undefined}
              onClick={() => handleNavClick(label)}
              sx={{ 
                borderRadius: "12px",
                color: menu === label ? "secondary.main" : "text.secondary",
                bgcolor: menu === label ? "rgba(255,107,53,0.08)" : "transparent"
              }}
            >
              <ListItemText primary={label} primaryTypographyProps={{ fontWeight: 600 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ p: 3 }}>
        {!token ? (
          <Button fullWidth variant="contained" color="secondary" onClick={() => { setShowlogin(true); setDrawerOpen(false); }}>
            Sign In
          </Button>
        ) : (
          <Button fullWidth variant="outlined" color="primary" startIcon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Button>
        )}
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="sticky" 
        elevation={isScrolled ? 2 : 0}
        sx={{ 
          bgcolor: isScrolled ? "rgba(255, 255, 255, 0.95)" : "background.default", 
          backdropFilter: "blur(10px)",
          borderBottom: isScrolled ? "none" : "1px solid rgba(0,0,0,0.05)",
          transition: "all 0.3s ease"
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: "space-between", height: { xs: 64, sm: 80 } }}>
            
            {/* Logo */}
            <Box component={Link} to="/" sx={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 1 }}>
              <Box sx={{ 
                width: 38, height: 38, bgcolor: "secondary.main", borderRadius: "10px", 
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 4px 12px rgba(255, 107, 53, 0.3)"
              }}>
                <RestaurantMenu sx={{ color: "#fff", fontSize: 22 }} />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: "primary.main", display: { xs: "none", sm: "block" } }}>
                FoodDel
              </Typography>
            </Box>

            {/* Desktop Nav */}
            {!isMobile && (
              <Box sx={{ display: "flex", gap: 1 }}>
                {NAV_LINKS.map(({ label, to, href }) => (
                  <Button
                    key={label}
                    component={to ? Link : "a"}
                    to={to || undefined}
                    href={href || undefined}
                    onClick={() => handleNavClick(label)}
                    sx={{
                      color: menu === label ? "secondary.main" : "text.primary",
                      fontWeight: menu === label ? 700 : 500,
                      px: 2,
                      "&:hover": { bgcolor: "rgba(0,0,0,0.03)" }
                    }}
                  >
                    {label}
                  </Button>
                ))}
              </Box>
            )}

            {/* Actions */}
            <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, sm: 2 } }}>
              <IconButton color="primary" sx={{ display: { xs: "none", sm: "flex" } }}><Search /></IconButton>

              <IconButton component={Link} to="/cart" color="primary">
                <Badge 
                  variant="dot" 
                  invisible={getTotalCartAmount() === 0}
                  sx={{ "& .MuiBadge-dot": { bgcolor: "secondary.main" } }}
                >
                  <ShoppingCart />
                </Badge>
              </IconButton>

              {!isMobile && !token && (
                <Button 
                  variant="contained" 
                  color="secondary" 
                  disableElevation
                  onClick={() => setShowlogin(true)}
                  sx={{ borderRadius: "12px", px: 3 }}
                >
                  Sign In
                </Button>
              )}

              {token && !isMobile && (
                <>
                  <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                    <Avatar src={assets.profile_icon} sx={{ width: 36, height: 36, border: "2px solid", borderColor: "secondary.main" }} />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                    PaperProps={{ sx: { mt: 1, minWidth: 180, borderRadius: "16px" } }}
                  >
                    <MenuItem onClick={() => { navigate("/orders"); setAnchorEl(null); }}>
                      <ShoppingBagOutlined sx={{ mr: 1, fontSize: 20 }} /> My Orders
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={logout} sx={{ color: "error.main" }}>
                      <LogoutOutlined sx={{ mr: 1, fontSize: 20 }} /> Logout
                    </MenuItem>
                  </Menu>
                </>
              )}

              {isMobile && (
                <IconButton color="primary" onClick={() => setDrawerOpen(true)}><MenuIcon /></IconButton>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Navbar;