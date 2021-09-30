import { useMemo, forwardRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";

function ListItemLink(props) {
  const { icon, primary, to } = props;

  const renderLink = useMemo(
      () =>
          forwardRef(function Link(itemProps, ref) {
              return <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />;
          }),
      [to],
  );

  return (
      <li>
          <ListItem button component={renderLink}>
              {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
              <ListItemText primary={primary} />
          </ListItem>
      </li>
  );
}
export default ListItemLink;