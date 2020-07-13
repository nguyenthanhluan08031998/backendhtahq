import { fade } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
const styles = theme => ({
    root: {
        flexGrow: 1,
        marginLeft: 500,
        marginRight: 500,
        marginTop: 30,
        marginBottom: 30,
    },
    rootSearch: {
        flexGrow: 1,
        // marginLeft: 400,
        marginRight: 0,
        // marginTop: 30,
        marginBottom: 30,
    },
    rootCard: {
        width: 200,
        height: 200,
        borderRadius: 10,
        borderWidth: 'medium',
        borderColor: "#03A9F4",
        alignItems: 'center',
    },
    search: {
        border: 1,
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.25),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        flexGrow: 1,
        marginLeft: 0,
        marginTop: -5,
        // marginBottom: 30,
    },
    autoCompleteLanguage: {
        flexGrow: 1,
        marginRight: 0,
        // marginTop: 30,
        // width: 150,
        //marginBottom:30,
        // marginLeft: 350
    },
    icon: {
        fontSize: 30,
    },

    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
        alignItems: 'center',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
});
export default styles;