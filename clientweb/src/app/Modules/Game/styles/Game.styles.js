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
    paper: {
        width: '100%',
        height: 400,
        borderWidth: 'medium',
        // backgroundColor: "#bfff00",
        borderColor: '#03A9F4',
    },
    box: {
        marginTop: 10,
        width: '100%',
        height: 400,
        borderWidth: 'medium',
        borderColor: '#03A9F4',
    },
    chatbox: {
        padding: 10,
        marginTop: 0,
        maxHeight: 340,
        minHeight: 340,
        overflowY: 'auto',
        index: 1
    },
    message: {
        padding: 13,
        borderRadius: 15,
        borderWidth: 'medium',
        backgroundColor: "#bfff00",
        borderColor: '#03A9F4',
        height: 50
    },
    input: {
        index: 0,
        paddingTop: 20,
        paddingLeft: 10,
        paddingRigth: 10,
    }
});
export default styles;