import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";

import PropTypes from "prop-types";

// const useStyles = makeStyles((theme) => ({
//    typography: {
//       padding: theme.spacing(2)
//    }
// }));

function SimplePopover(props) {
   // const classes = useStyles();

   const { anchorOrigin, style, transformOrigin, content, keepMounted, menuItems, closeOnClick } = props;
   const [anchorEl, setAnchorEl] = React.useState(null);

   function handleClick(event) {
      setAnchorEl(event.currentTarget);
   }

   function handleClose() {
      setAnchorEl(null);
   }

   const open = Boolean(anchorEl);
   const id = open ? `simple-popover-${new Date().getTime() + Math.random(1000)}` : undefined;

   return (
      <>
         <div style={{ margin: 0, padding: 0, ...style }} aria-describedby={id} onClick={handleClick}>
            {props.children}
         </div>
         {content && content === "menu" ? (
            <Menu id={id} anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
               {Array.isArray(menuItems) &&
                  menuItems.map((item, index) => {
                     return (
                        !item.hidden && (
                           <MenuItem
                              key={index}
                              onClick={() => {
                                 if (item.onClick) item.onClick();
                                 if (closeOnClick) {
                                    handleClose();
                                 }
                              }}
                           >
                              {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                              {item.title}
                           </MenuItem>
                        )
                     );
                  })}
            </Menu>
         ) : (
            content && (
               <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={anchorOrigin}
                  transformOrigin={transformOrigin}
                  keepMounted={keepMounted || false}
                  onClick={(e) => {
                     if (closeOnClick) handleClose();
                  }}
               >
                  {closeOnClick ? (
                     <div style={{ margin: 0, padding: 0, ...style }} onClick={handleClose}>
                        {content}
                     </div>
                  ) : (
                     content
                  )}
               </Popover>
            )
         )}
      </>
   );
}

SimplePopover.propTypes = {
   anchorOrigin: PropTypes.object,
   transformOrigin: PropTypes.object
};

SimplePopover.defaultProps = {
   anchorOrigin: {
      vertical: "bottom",
      horizontal: "center"
   },
   transformOrigin: {
      vertical: "top",
      horizontal: "center"
   }
};

export default React.memo(SimplePopover);
