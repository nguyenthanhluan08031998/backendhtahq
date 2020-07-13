const styles = theme => ({
  button: {
    marginRight: theme.spacing(1)
  },
  columnHover: {
    "&:hover": {
      cursor: "pointer",
      backgroundColor: theme.palette.type === "dark" ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.04)"
    }
  },
});
export default styles;