// import blue from "@material-ui/core/colors/blue";
// import green from "@material-ui/core/colors/green";
// import yellow from "@material-ui/core/colors/yellow";
// import pink from "@material-ui/core/colors/pink";
import cyan from "@material-ui/core/colors/cyan";
import lightBlue from "@material-ui/core/colors/lightBlue";
import teal from "@material-ui/core/colors/teal";
import lime from "@material-ui/core/colors/lime";
import purple from "@material-ui/core/colors/purple";

export default {
   overrides: {
      MuiIconButton: {
         root: {
            "&:hover": {
               backgroundColor: "transparent"
            }
         }
      },
      MuiButton: {
         containedPrimary: {
            backgroundColor: "#0a6ed1",
            borderColor: "#0a6ed1"
         }
      }
   },
   typography: {
      // Tell Material-UI what's the font-size on the html element is.
      htmlFontSize: 16,
      fontSize: 13
   },
   palette: {
      //type: "dark",
      //primary: { light: blue[300], main: blue[600] },
      // primary: { main: "#0a6ed1" },
      secondary: { main: "#FF0000" },
      success: {
         light: "#1aca64",
         main: "#15a04f",
         dark: "#107e3e"
      },
      warning: {
         light: "#fb9b47",
         main: "#f58320",
         dark: "#e9730c"
      },
      cyan: {
         light: cyan[400],
         main: cyan[500],
         dark: cyan[600]
      },
      lightBlue: {
         light: lightBlue[300],
         main: lightBlue[400],
         dark: lightBlue[500]
      },
      teal: {
         light: teal[400],
         main: teal[500],
         dark: teal[600]
      },
      lime: {
         light: lime[400],
         main: lime[500],
         dark: lime[600]
      },
      purple: {
         light: purple[400],
         main: purple[500],
         dark: purple[600]
      },
      contrastThreshold: 3,
      tonalOffset: 0.2
   }
};
